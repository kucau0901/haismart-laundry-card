// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "../src/haismart-laundry-card";
import type { HaismartLaundryCard } from "../src/haismart-laundry-card";
import { HaismartLaundryCard as CardClass, layoutForWidth, validateConfig } from "../src/haismart-laundry-card";
import { clearIndexCache } from "../src/model";
import { MOCK_DEVICE_ID } from "../src/mock/build-hass";
import { SCENARIOS, airConditioner, scenario } from "./fixtures/scenarios";
import type { HomeAssistant, LaundryCardConfig } from "../src/types";

async function mount(hass: HomeAssistant, config: Partial<LaundryCardConfig> = {}, layout = "full") {
  const el = document.createElement("haismart-laundry-card") as HaismartLaundryCard;
  el.setConfig({ type: "custom:haismart-laundry-card", layout: layout as never, ...config });
  el.hass = hass;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

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
    expect(s).toContain("Dryer done ~5:05 PM");
    expect(s).toContain("Ready");
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
    expect(call).toHaveBeenCalledWith("button", "press", { entity_id: "button.laundry_centre_washer_pause" });
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
    expect(notify).toHaveBeenCalled();
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
    (root(el).querySelector("dialog [data-confirm]") as HTMLButtonElement).click();
    await el.updateComplete;
    expect(call).toHaveBeenCalledWith("button", "press", { entity_id: "button.laundry_centre_washer_cancel" });
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
    expect(s).toContain("Drain pump blocked");
    expect(s).toContain("Code E21, E30");
    expect(root(el).querySelector('.banner [role="alert"]')).not.toBeNull();
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
    expect(s).toContain("Sedia");
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
    expect(layoutForWidth(520)).toBe("full");
    expect(layoutForWidth(400)).toBe("stacked");
    expect(layoutForWidth(200)).toBe("compact");
    expect(layoutForWidth(455, "full")).toBe("full");
    expect(layoutForWidth(450, "full")).toBe("stacked");
    expect(layoutForWidth(465, "stacked")).toBe("stacked");
    expect(layoutForWidth(276, "stacked")).toBe("stacked");
  });

  it("getGridOptions and getCardSize", async () => {
    const el = await mount(SCENARIOS["01_real_snapshot"]());
    expect(el.getGridOptions()).toEqual({ columns: 12, rows: "auto", min_columns: 3, min_rows: 2 });
    expect(el.getCardSize()).toBe(6);
  });
});
