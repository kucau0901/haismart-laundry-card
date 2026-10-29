// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "../src/haismart-laundry-card";
import type { HaismartLaundryCard } from "../src/haismart-laundry-card";
import { HaismartLaundryCard as CardClass, layoutForWidth, validateConfig } from "../src/haismart-laundry-card";
import { clearIndexCache } from "../src/model";
import { MOCK_DEVICE_ID } from "../src/mock/build-hass";
import { SCENARIOS, airConditioner, scenario } from "./fixtures/scenarios";
import { CONFIRM_TIMEOUT_MS, CONFIRMED_DISPLAY_MS } from "../src/controls";
import type { HomeAssistant, LaundryCardConfig } from "../src/types";

async function mount(hass: HomeAssistant, config: Partial<LaundryCardConfig> = {}, layout = "full") {
  const el = document.createElement("haismart-laundry-card") as HaismartLaundryCard;
  el.setConfig({ type: "custom:haismart-laundry-card", layout: layout as never, ...config });
  el.hass = hass;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

/** Let pending service-call promises settle and Lit finish every queued update. */
async function flush(el: HaismartLaundryCard) {
  for (let i = 0; i < 5; i++) {
    await Promise.resolve();
    await el.updateComplete;
  }
}

/** Next machine state, same registries (a plain state update as HA delivers it). */
function push(el: HaismartLaundryCard, next: HomeAssistant) {
  next.entities = el.hass!.entities;
  next.devices = el.hass!.devices;
  next.callService = el.hass!.callService;
  el.hass = next;
}

const remoteOn = (o: Record<string, unknown> = {}) =>
  scenario({ washerRemoteCtrValid: true, dryerRemoteCtrValid: true, ...o });

const root = (el: HTMLElement) => el.shadowRoot!;
const text = (el: HTMLElement) => (root(el).textContent ?? "").replace(/\s+/g, " ");
const btn = (el: HTMLElement, drum: string, cmd: string) =>
  root(el).querySelector<HTMLButtonElement>(`button[data-drum="${drum}"][data-cmd="${cmd}"]`);

beforeEach(() => {
  clearIndexCache();
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
  vi.setSystemTime(new Date("2026-10-29T01:17:30.000Z"));
});
afterEach(() => {
  document.body.innerHTML = "";
  vi.useRealTimers();
});

describe("haismart-laundry-card", () => {
  it("registers with the card picker", () => {
    expect(customElements.get("haismart-laundry-card")).toBeDefined();
    expect(customElements.get("haismart-laundry-card-editor")).toBeDefined();
    expect(window.customCards?.find((c) => c.type === "haismart-laundry-card")).toMatchObject({
      name: "Haier Laundry Centre",
      preview: true,
    });
  });

  it("renders the real snapshot with remote-off gating", async () => {
    const el = await mount(SCENARIOS["01_real_snapshot"]());
    const s = text(el);
    expect(s).toContain("Laundry Centre");
    expect(s).toContain("Dryer finishes ~5:05 PM");
    expect(s).toContain("Idle");
    expect(s).toContain("AI Wash · about 1 h 8 min");
    expect(s).toContain("Softener empty");
    expect(s).toContain("Estimating time…");
    expect(s).toContain("Remote control is off at the washer panel");
    expect(s).toContain("Remote control is off at the dryer panel");
    expect(s).not.toContain("Paused");
    expect(s).not.toContain("Resume");
    const start = btn(el, "washer", "start")!;
    expect(start.getAttribute("aria-disabled")).toBe("true");
    expect(start.hasAttribute("disabled")).toBe(false);
    expect(start.getAttribute("aria-describedby")).toBe("remote-washer");
    expect(start.getAttribute("aria-label")).toBe("Start AI Wash");
    expect(btn(el, "dryer", "pause")!.getAttribute("aria-disabled")).toBe("true");
    expect(btn(el, "dryer", "cancel")!.getAttribute("aria-disabled")).toBe("true");
    expect(root(el).querySelector("ha-card")!.getAttribute("lang")).toBe("en");
    expect(root(el).querySelectorAll('[role="group"]').length).toBe(2);
    expect(root(el).querySelector(".stepper")!.getAttribute("aria-label")).toBe("Progress");
  });

  it("never sends while remote is off", async () => {
    const call = vi.fn(async () => undefined);
    const el = await mount(scenario({}, { callService: call }));
    btn(el, "dryer", "pause")!.click();
    await el.updateComplete;
    expect(call).not.toHaveBeenCalled();
  });

  it("machine off looks calm and intentional", async () => {
    const el = await mount(SCENARIOS["02_machine_off"]());
    const s = text(el);
    expect(s).toContain("Machine is off · since 9:17 AM");
    expect(s).toContain("It turns off Wi-Fi after each cycle.");
    expect(s.toLowerCase()).not.toContain("unavailable");
    expect(root(el).querySelector("button[data-cmd]")).toBeNull();
    const stacked = await mount(SCENARIOS["02_machine_off"](), {}, "stacked");
    expect(root(stacked).querySelector(".off-block")).not.toBeNull();
  });

  it("pause sends, then waits for the machine to confirm", async () => {
    const call = vi.fn(async () => undefined);
    const hass = SCENARIOS["21_both_running"]();
    hass.callService = call;
    const el = await mount(hass);
    btn(el, "washer", "pause")!.click();
    await el.updateComplete;
    // notifyOnError=false: no raw HA toast on failure.
    expect(call).toHaveBeenCalledWith("button", "press", { entity_id: "button.laundry_centre_washer_pause" }, undefined, false);
    await Promise.resolve();
    await el.updateComplete;
    expect(text(el)).toContain("Waiting for the washer to confirm…");
    // The hero never changes optimistically.
    expect(text(el)).not.toContain("Paused");
    // The machine reports paused: confirmed.
    const paused = scenario(
      {
        laundryCyclePhase: 5,
        washerRunningMode: 2,
        remainingTimeHH: 0,
        remainingTimeMM: 48,
        dryerCyclePhase: 3,
        dryerRemainingDryTime: 75,
        washerRemoteCtrValid: true,
        dryerRemoteCtrValid: true,
      },
      { callService: call },
    );
    paused.entities = hass.entities;
    paused.devices = hass.devices;
    el.hass = paused;
    await el.updateComplete;
    await el.updateComplete;
    expect(text(el)).toContain("Washer paused");
    // The confirmation clears on its own.
    vi.advanceTimersByTime(CONFIRMED_DISPLAY_MS + 10);
    await flush(el);
    expect(root(el).querySelector(".status-line")).toBeNull();
  });

  it("a refused command shows a friendly error strip with details", async () => {
    const call = vi.fn(async () => {
      throw {
        code: "home_assistant_error",
        message:
          "Laundry Centre does not accept that setting: remote control is not enabled for the dryer -- turn it on at the machine's panel first",
      };
    });
    const hass = SCENARIOS["21_both_running"]();
    hass.callService = call;
    const notify = vi.fn();
    const el = await mount(hass);
    el.addEventListener("hass-notification", notify);
    btn(el, "dryer", "pause")!.click();
    await Promise.resolve();
    await Promise.resolve();
    await el.updateComplete;
    const strip = root(el).querySelector('.strip[role="alert"]')!;
    expect(strip).not.toBeNull();
    expect(strip.textContent).toContain("The dryer didn't accept that");
    expect(strip.textContent).toContain("Remote control is off at the dryer panel. Turn it on there, then try again.");
    // One channel only: the inline strip, no toast on top of it.
    expect(notify).not.toHaveBeenCalled();
    (strip.querySelector('button[aria-expanded="false"]') as HTMLButtonElement).click();
    await el.updateComplete;
    expect(root(el).querySelector(".strip .raw")!.textContent).toBe(
      "Remote control is not enabled for the dryer — turn it on at the machine's panel first",
    );
    // Buttons are back to normal.
    expect(btn(el, "dryer", "pause")!.getAttribute("aria-disabled")).toBe("false");
  });

  it("cancel always asks first, focusing the safe action", async () => {
    const call = vi.fn(async () => undefined);
    const hass = SCENARIOS["21_both_running"]();
    hass.callService = call;
    const el = await mount(hass);
    btn(el, "washer", "cancel")!.click();
    await el.updateComplete;
    const dlg = root(el).querySelector("dialog")!;
    expect(dlg).not.toBeNull();
    expect(dlg.textContent).toContain("Cancel the washer cycle?");
    expect(dlg.textContent).toContain("Keep washing");
    expect(call).not.toHaveBeenCalled();
    (dlg.querySelector("[data-safe]") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(root(el).querySelector("dialog")).toBeNull();
    expect(call).not.toHaveBeenCalled();
    btn(el, "washer", "cancel")!.click();
    await el.updateComplete;
    // Visual order is DOM order: the safe choice first, the destructive confirm last.
    const actions = [...root(el).querySelectorAll("dialog .dlg-actions button")];
    expect(actions[0].hasAttribute("data-safe")).toBe(true);
    expect(actions[1].hasAttribute("data-confirm")).toBe(true);
    // The status region is always present (filled only on a change).
    expect(root(el).querySelector('dialog [role="status"]')!.textContent!.trim()).toBe("");
    (root(el).querySelector("dialog [data-confirm]") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(call).toHaveBeenCalledWith("button", "press", { entity_id: "button.laundry_centre_washer_cancel" }, undefined, false);
  });

  it("controls are hidden when the integration has no buttons", async () => {
    const el = await mount(SCENARIOS["16_no_buttons"]());
    expect(root(el).querySelector(".controls")).toBeNull();
    expect(text(el)).not.toContain("Remote control");
  });

  it("fault banner and start gating", async () => {
    const el = await mount(SCENARIOS["12_fault"]());
    const s = text(el);
    expect(s).toContain("Needs attention");
    expect(s).toContain("Machine reports a problem");
    // Each code next to its own fault.
    expect(s).toContain("Drain pump blocked · code E21");
    const banner = root(el).querySelector(".banner")!;
    // A plain container: no role=button swallowing the alert and the list.
    expect(banner.getAttribute("role")).toBeNull();
    expect(banner.querySelector('[role="alert"]')).toBeNull();
    expect(banner.querySelector("button")!.textContent!.trim()).toBe("Fault details");
    expect(banner.querySelector('[aria-controls="fault-more"]')!.getAttribute("aria-label")).toBe("Show 1 more fault");
    // Below the header: the card still starts with its title.
    const header = root(el).querySelector(".header")!;
    expect(header.compareDocumentPosition(banner) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // Machine-wide: no per-drum fault marker, and the drum sentences don't claim it.
    expect(root(el).querySelector(".adot, .aicon.error")).toBeNull();
    for (const sum of root(el).querySelectorAll(".summary"))
      expect(sum.getAttribute("aria-label")).not.toContain("problem");
  });

  it("announces a fault through the persistent alert region when it appears", async () => {
    const el = await mount(SCENARIOS["01_real_snapshot"]());
    const region = root(el).querySelector('.sr-only[role="alert"]')!;
    expect(region.textContent!.trim()).toBe("");
    push(el, SCENARIOS["12_fault"]());
    await flush(el);
    expect(root(el).querySelector('.sr-only[role="alert"]')!.textContent).toContain(
      "Machine reports a problem: Drain pump blocked · code E21; Door lock fault · code E30",
    );
  });

  it("message 18 rewrites the remote line", async () => {
    const el = await mount(SCENARIOS["18_message_18"]());
    expect(text(el)).toContain("Remote control turned off when the door was opened.");
  });

  it("setup alerts instead of errors", async () => {
    const none = await mount(airConditioner());
    expect(text(none)).toContain("No Haier laundry centre found");
    const removed = await mount(SCENARIOS["01_real_snapshot"](), { device_id: "gone" });
    expect(text(removed)).toContain("The selected laundry centre was removed");
    const notLaundry = await mount(airConditioner(), { device_id: "haier-ac" });
    expect(text(notLaundry)).toContain("Bedroom AC isn't a washer or dryer");
  });

  it("card-picker preview renders the sample with inert controls", async () => {
    const el = document.createElement("haismart-laundry-card") as HaismartLaundryCard;
    el.setConfig({ type: "custom:haismart-laundry-card", layout: "full" });
    el.preview = true;
    el.hass = airConditioner();
    document.body.appendChild(el);
    await el.updateComplete;
    expect(text(el)).toContain("Sample");
    expect(btn(el, "washer", "start")!.getAttribute("aria-disabled")).toBe("true");
  });

  it("compact layout shows one row per drum and no controls", async () => {
    const el = await mount(SCENARIOS["01_real_snapshot"](), {}, "compact");
    expect(root(el).querySelectorAll(".crow").length).toBe(2);
    expect(root(el).querySelector(".controls")).toBeNull();
  });

  it("Bahasa Melayu", async () => {
    const el = await mount(SCENARIOS["01_real_snapshot"](), { language: "ms" });
    const s = text(el);
    expect(s).toContain("Tidak aktif");
    expect(s).toContain("Pelembut fabrik habis");
    expect(root(el).querySelector("ha-card")!.getAttribute("lang")).toBe("ms");
  });

  it("tap on a drum fires hass-action for its phase entity", async () => {
    const el = await mount(SCENARIOS["01_real_snapshot"]());
    const spy = vi.fn();
    el.addEventListener("hass-action", (e) => spy((e as CustomEvent).detail));
    (root(el).querySelector(".summary") as HTMLElement).click();
    expect(spy).toHaveBeenCalledWith({
      config: { entity: "sensor.laundry_centre_laundry_cycle_phase", tap_action: { action: "more-info" } },
      action: "tap",
    });
  });

  it("stub config auto-picks the device", () => {
    expect(CardClass.getStubConfig(SCENARIOS["01_real_snapshot"]())).toEqual({
      type: "custom:haismart-laundry-card",
      device_id: MOCK_DEVICE_ID,
    });
    expect(CardClass.getStubConfig(airConditioner())).toEqual({ type: "custom:haismart-laundry-card" });
  });

  it("validates types and keeps unknown keys", () => {
    expect(() => validateConfig({ type: "x", layout: "huge" as never })).toThrow(/"layout"/);
    expect(() => validateConfig({ type: "x", show_totals: "yes" as never })).toThrow(/"show_totals"/);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    expect(validateConfig({ type: "x", sparkle: 1 }).sparkle).toBe(1);
    expect(warn).toHaveBeenCalledOnce();
  });

  it("layout breakpoints with hysteresis", () => {
    expect(layoutForWidth(640)).toBe("full");
    expect(layoutForWidth(520)).toBe("stacked"); // side by side only from 600px
    expect(layoutForWidth(400)).toBe("stacked");
    expect(layoutForWidth(200)).toBe("compact");
    expect(layoutForWidth(595, "full")).toBe("full");
    expect(layoutForWidth(590, "full")).toBe("stacked");
    expect(layoutForWidth(605, "stacked")).toBe("stacked");
    expect(layoutForWidth(276, "stacked")).toBe("stacked");
  });

  it("getGridOptions and getCardSize", async () => {
    const el = await mount(SCENARIOS["01_real_snapshot"]());
    expect(el.getGridOptions()).toEqual({ columns: 12, rows: "auto", min_columns: 3, min_rows: 2 });
    expect(el.getCardSize()).toBe(6);
    // Compact must not be clipped to a fixed 2 rows (it carries a title, and the off text).
    const compact = await mount(SCENARIOS["02_machine_off"](), {}, "compact");
    expect(compact.getGridOptions().rows).toBe("auto");
  });

  // ------------------------------------------------------------------ command lifecycle

  it("an unconfirmed command times out after 45 s and the buttons work again", async () => {
    const call = vi.fn(async () => undefined);
    const hass = SCENARIOS["21_both_running"]();
    hass.callService = call;
    const el = await mount(hass);
    btn(el, "washer", "pause")!.click();
    await flush(el);
    expect(text(el)).toContain("Waiting for the washer to confirm…");
    expect(btn(el, "washer", "pause")!.getAttribute("aria-disabled")).toBe("true");
    vi.advanceTimersByTime(CONFIRM_TIMEOUT_MS + 10);
    await flush(el);
    expect(text(el)).toContain("The washer hasn't confirmed the change yet.");
    expect(btn(el, "washer", "pause")!.getAttribute("aria-disabled")).toBe("false");
    expect(btn(el, "washer", "cancel")!.getAttribute("aria-disabled")).toBe("false");
  });

  it("a waiting command still times out after the card is detached and re-attached", async () => {
    const call = vi.fn(async () => undefined);
    const hass = SCENARIOS["21_both_running"]();
    hass.callService = call;
    const el = await mount(hass);
    btn(el, "washer", "pause")!.click();
    await flush(el);
    el.remove();
    vi.advanceTimersByTime(10_000);
    document.body.appendChild(el);
    await flush(el);
    expect(text(el)).toContain("Waiting for the washer to confirm…");
    vi.advanceTimersByTime(CONFIRM_TIMEOUT_MS);
    await flush(el);
    expect(text(el)).toContain("hasn't confirmed");
    expect(btn(el, "washer", "pause")!.getAttribute("aria-disabled")).toBe("false");
  });

  it("a deadline that passed while detached expires on re-attach", async () => {
    const call = vi.fn(async () => undefined);
    const hass = SCENARIOS["21_both_running"]();
    hass.callService = call;
    const el = await mount(hass);
    btn(el, "washer", "pause")!.click();
    await flush(el);
    el.remove();
    vi.advanceTimersByTime(10 * 60_000);
    document.body.appendChild(el);
    vi.advanceTimersByTime(1);
    await flush(el);
    expect(text(el)).toContain("hasn't confirmed");
  });

  it("a double click sends once", async () => {
    let release!: () => void;
    const call = vi.fn(() => new Promise<void>((r) => (release = r)));
    const hass = SCENARIOS["21_both_running"]();
    hass.callService = call;
    const el = await mount(hass);
    const b = btn(el, "washer", "pause")!;
    b.click();
    b.click();
    await flush(el);
    btn(el, "washer", "pause")!.click();
    expect(call).toHaveBeenCalledTimes(1);
    release();
    await flush(el);
  });

  it("a gated button does nothing even if aria-disabled is stripped", async () => {
    const call = vi.fn(async () => undefined);
    const el = await mount(scenario({}, { callService: call })); // remote off on both drums
    const b = btn(el, "dryer", "pause")!;
    b.removeAttribute("aria-disabled");
    b.click();
    await flush(el);
    expect(call).not.toHaveBeenCalled();
  });

  it("a disabled press says why and opens the remote help", async () => {
    const el = await mount(SCENARIOS["01_real_snapshot"]());
    btn(el, "dryer", "pause")!.click();
    await flush(el);
    expect(root(el).querySelector('[aria-live="polite"]')!.textContent).toContain(
      "Remote control is off at the dryer panel",
    );
    expect(root(el).querySelector("#remote-help-dryer")).not.toBeNull();
    expect(root(el).querySelector("#remote-help-dryer")!.textContent).toContain("the machine's manual shows how");
  });

  it("the busy gate's reason is in the card, not only a tooltip", async () => {
    const call = vi.fn(() => new Promise<void>(() => undefined)); // never settles: dryer stays "sending"
    const hass = SCENARIOS["21_both_running"]();
    hass.callService = call;
    const el = await mount(hass);
    btn(el, "dryer", "pause")!.click();
    await flush(el);
    const w = btn(el, "washer", "pause")!;
    expect(w.getAttribute("aria-disabled")).toBe("true");
    expect(w.getAttribute("aria-describedby")).toBe("reason-washer");
    expect(root(el).querySelector("#reason-washer")!.textContent).toContain("Busy: sending to the dryer");
  });

  it("scheduled and anti-crease drums: the only action is labelled and asks first", async () => {
    const call = vi.fn(async () => undefined);
    const sched = await mount(
      remoteOn({ dryerCyclePhase: 1, dryerRunningMode: 1, dryerRemainingResnTime: 120, dryerRemainingDryTime: 90 }),
    );
    sched.hass!.callService = call;
    const c = btn(sched, "dryer", "cancel_scheduled")!;
    expect(c.getAttribute("aria-label")).toBe("Cancel the scheduled dryer cycle");
    expect(c.getAttribute("title")).toBe("Cancel the scheduled dryer cycle");
    expect(c.classList.contains("collapsible")).toBe(false);
    c.click();
    await sched.updateComplete;
    expect(root(sched).querySelector("dialog")!.textContent).toContain("Cancel the scheduled dryer cycle?");
    expect(call).not.toHaveBeenCalled();
    document.body.innerHTML = ""; // close the modal before mounting the next card

    const tumble = await mount(remoteOn({ dryerCyclePhase: 7, remainingAntiCreaseTime: 25, dryerRemainingDryTime: 0 }));
    const st = btn(tumble, "dryer", "stop")!;
    expect(st.getAttribute("aria-label")).toBe("Stop tumbling");
    expect(st.classList.contains("collapsible")).toBe(false);
    st.click();
    await tumble.updateComplete;
    expect(root(tumble).querySelector("dialog")!.textContent).toContain("Stop anti-crease tumbling?");
    document.body.innerHTML = "";

    // With a labelled primary beside it, Cancel may go icon-only and keeps its name.
    const run = await mount(SCENARIOS["21_both_running"]());
    expect(btn(run, "washer", "cancel")!.classList.contains("collapsible")).toBe(true);
    expect(btn(run, "washer", "cancel")!.getAttribute("aria-label")).toBe("Cancel the washer cycle");
  });

  it("the dialog refuses to confirm once the drum's state changed", async () => {
    const call = vi.fn(async () => undefined);
    const hass = SCENARIOS["21_both_running"]();
    hass.callService = call;
    const el = await mount(hass);
    btn(el, "washer", "cancel")!.click();
    await el.updateComplete;
    // The washer finishes while the dialog is open.
    push(el, remoteOn({ laundryCyclePhase: 14, dryerCyclePhase: 3, dryerRemainingDryTime: 75 }));
    await flush(el);
    const confirm = root(el).querySelector<HTMLButtonElement>("dialog [data-confirm]")!;
    expect(confirm.getAttribute("aria-disabled")).toBe("true");
    expect(root(el).querySelector('dialog [role="status"]')!.textContent).toContain("The washer's state changed.");
    confirm.click();
    await flush(el);
    expect(call).not.toHaveBeenCalled();
  });

  it("the dialog closes with an announcement when the machine turns off", async () => {
    const el = await mount(SCENARIOS["21_both_running"]());
    btn(el, "washer", "cancel")!.click();
    await el.updateComplete;
    push(el, scenario({}, { off: true }));
    await flush(el);
    expect(root(el).querySelector("dialog")).toBeNull();
    expect(root(el).querySelector('[aria-live="polite"]')!.textContent).toContain("The machine turned off.");
  });

  // ------------------------------------------------------------------ focus recovery

  it("focus stays on the toggle when a drum expands and collapses", async () => {
    const el = await mount(remoteOn(), {}, "stacked");
    const toggle = () => root(el).querySelector<HTMLButtonElement>('[data-focus-key="expand-washer"]')!;
    expect(toggle().getAttribute("aria-label")).toBe("Show washer");
    toggle().focus();
    toggle().click();
    await flush(el);
    expect(root(el).activeElement).toBe(toggle());
    expect(toggle().getAttribute("aria-expanded")).toBe("true");
    expect(toggle().getAttribute("aria-label")).toBe("Hide washer");
    toggle().click();
    await flush(el);
    expect(root(el).activeElement).toBe(toggle());
    expect(toggle().getAttribute("aria-label")).toBe("Show washer");
  });

  it("dismissing the error strip sends focus to the drum's control", async () => {
    const call = vi.fn(async () => {
      throw { message: "Laundry Centre does not accept that setting: no fresh report from the dryer; try again" };
    });
    const hass = SCENARIOS["21_both_running"]();
    hass.callService = call;
    const el = await mount(hass);
    btn(el, "dryer", "pause")!.click();
    await flush(el);
    const dismiss = root(el).querySelector<HTMLButtonElement>('.strip button[aria-label="Dismiss"]')!;
    dismiss.focus();
    dismiss.click();
    await flush(el);
    expect(root(el).querySelector(".strip")).toBeNull();
    expect(root(el).activeElement).toBe(btn(el, "dryer", "pause"));
  });

  it("focus moves to the drum summary when its focused Cancel disappears", async () => {
    const el = await mount(SCENARIOS["21_both_running"]());
    btn(el, "washer", "cancel")!.focus();
    push(el, remoteOn({ laundryCyclePhase: 0, dryerCyclePhase: 3, dryerRemainingDryTime: 75 }));
    await flush(el);
    expect(btn(el, "washer", "cancel")).toBeNull();
    expect(root(el).activeElement).toBe(root(el).querySelector('[data-summary="washer"]'));
  });

  // ------------------------------------------------------------------ layout details

  it("the collapsed idle drum has no Start and names its notice", async () => {
    const el = await mount(remoteOn(), {}, "stacked");
    const row = root(el).querySelector(".collapsed")!;
    expect(row.querySelector("button[data-cmd]")).toBeNull();
    expect(row.textContent!.replace(/\s+/g, " ")).toContain("Washer · Idle · Softener empty");
    expect(row.querySelector(".adot")).toBeNull();
    expect(row.querySelector("ha-icon.aicon")).not.toBeNull();
  });

  it("compact rows always show which drum is which", async () => {
    const el = await mount(SCENARIOS["10_done_msg14"](), {}, "compact");
    const icons = [...root(el).querySelectorAll(".crow .drum-icon")].map((i) => (i as HTMLElement & { icon: string }).icon);
    expect(icons).toEqual(["mdi:washing-machine", "mdi:tumble-dryer"]);
    expect(root(el).querySelector(".adot")).toBeNull();
    const fault = await mount(SCENARIOS["12_fault"](), {}, "compact");
    expect(text(fault)).toContain("Needs attention");
  });

  it("the idle tile shows the chip first, then its duration; the hint only without a programme", async () => {
    const el = await mount(remoteOn());
    const line = root(el).querySelector(".prog-line")!;
    expect(line.firstElementChild!.classList.contains("prog-chip")).toBe(true);
    expect(line.querySelector(".prog-meta")!.textContent).toBe("about 1 h 8 min");
    expect(line.querySelector(".hint")).toBeNull();
    const chip = line.querySelector(".prog-chip")!;
    expect(chip.getAttribute("aria-label")).toBe("Programme: AI Wash. Change programme");
    expect(chip.getAttribute("aria-haspopup")).toBe("dialog");
    const none = await mount(remoteOn({ washerUnifiedProgramSettings: 0 }));
    const hint = root(none).querySelector(".prog-line .hint")!;
    expect(hint.textContent).toBe("Choose a programme, then Start");
    expect(root(none).querySelector(".prog-chip")!.getAttribute("aria-describedby")).toBe(hint.id);
  });

  it("the stepper marks the current step and keeps every label", async () => {
    const el = await mount(SCENARIOS["21_both_running"]());
    const cur = root(el).querySelector('.step[aria-current="step"]')!;
    expect(cur.textContent!.replace(/\s+/g, " ").trim()).toBe("Wash, current");
  });

  it("the title is a heading; an emptied title falls back to the device name", async () => {
    const el = await mount(SCENARIOS["01_real_snapshot"](), { title: "" });
    const h2 = root(el).querySelector("h2.title")!;
    expect(h2.textContent!.trim()).toBe("Laundry Centre");
    const link = root(el).querySelector<HTMLAnchorElement>("a.dev-link")!;
    expect(link.getAttribute("aria-label")).toBe("Open device page for Laundry Centre");
    expect(link.getAttribute("href")).toBe(`/config/devices/device/${MOCK_DEVICE_ID}`);
    const lock = await mount(scenario({ childLockStatus: true }));
    const icon = root(lock).querySelector(".status-icon")!;
    expect(icon.getAttribute("role")).toBe("img");
    expect(icon.getAttribute("aria-label")).toBe("Child lock on");
  });

  it("an unreadable remote flag is not reported as 'off'", async () => {
    const hass = SCENARIOS["21_both_running"]();
    for (const eid of Object.keys(hass.entities)) if (eid.includes("dryer_remote")) delete hass.states[eid];
    const el = await mount(hass);
    expect(text(el)).toContain("Can't read the remote-control status for the dryer");
    expect(text(el)).not.toContain("Remote control is off at the dryer panel");
    expect(btn(el, "dryer", "pause")!.getAttribute("aria-disabled")).toBe("true");
  });

  // ------------------------------------------------------------------ discovery

  it("finds the device once it comes online, with no cache and renamed entity ids", async () => {
    // Renamed entity ids (no slug match) and controls off (no button translation keys).
    const rename = (h: HomeAssistant) => {
      const map = new Map(Object.keys(h.entities).map((eid, i) => [eid, `${eid.split(".")[0]}.renamed_${i}`]));
      const re = <T,>(o: Record<string, T>, fix: (v: T, id: string) => T) =>
        Object.fromEntries(Object.entries(o).map(([k, v]) => [map.get(k) ?? k, fix(v, map.get(k) ?? k)]));
      h.entities = re(h.entities, (v, id) => ({ ...v, entity_id: id }));
      h.states = re(h.states, (v, id) => ({ ...v, entity_id: id }));
      return h;
    };
    const off = rename(scenario({}, { off: true, controls: false }));
    const el = await mount(off);
    expect(text(el)).toContain("No Haier laundry centre found");
    const live = rename(scenario({}, { controls: false }));
    live.entities = off.entities; // same registry object: only states change
    live.devices = off.devices;
    el.hass = live;
    await flush(el);
    expect(text(el)).not.toContain("No Haier laundry centre found");
    expect(text(el)).toContain("Dryer finishes ~5:05 PM");
  });

  it("Retry re-sends the refused command once", async () => {
    let fail = true;
    const call = vi.fn(async () => {
      if (fail) throw { message: "Laundry Centre does not accept that setting: no fresh report from the dryer" };
    });
    const hass = SCENARIOS["21_both_running"]();
    hass.callService = call;
    const el = await mount(hass);
    btn(el, "dryer", "pause")!.click();
    await flush(el);
    fail = false;
    const retry = root(el).querySelector<HTMLButtonElement>('.strip [data-focus-key="strip-dryer"].btn')!;
    expect(retry.textContent!.trim()).toBe("Try again");
    retry.focus();
    retry.click();
    await flush(el);
    expect(call).toHaveBeenCalledTimes(2);
    expect(text(el)).toContain("Waiting for the dryer to confirm…");
    expect(root(el).activeElement).not.toBeNull(); // focus did not fall to <body>
  });

  it("confirm_start asks before starting", async () => {
    const call = vi.fn(async () => undefined);
    const hass = remoteOn();
    hass.callService = call;
    const el = await mount(hass, { confirm_start: true });
    vi.advanceTimersByTime(10_000);
    btn(el, "washer", "start")!.click();
    await el.updateComplete;
    const dlg = root(el).querySelector("dialog")!;
    expect(dlg.textContent).toContain("Start the washer?");
    expect(call).not.toHaveBeenCalled();
    (dlg.querySelector("[data-confirm]") as HTMLButtonElement).click();
    await flush(el);
    expect(call).toHaveBeenCalledWith("button", "press", { entity_id: "button.laundry_centre_washer_start" }, undefined, false);
  });

  it("the minute tick re-derives countdowns", async () => {
    const el = await mount(SCENARIOS["21_both_running"]());
    const before = text(el);
    expect(before).toContain("in 48 min"); // text() folds the non-breaking spaces
    vi.advanceTimersByTime(61_000);
    await flush(el);
    expect(text(el)).toContain("in 47 min");
  });
});
