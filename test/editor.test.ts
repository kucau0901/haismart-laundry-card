// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from "vitest";
import "../src/haismart-laundry-card";
import { detectedRows, editorSchema, type HaismartLaundryCardEditor } from "../src/editor";
import { clearIndexCache } from "../src/model";
import { MOCK_DEVICE_ID } from "../src/mock/build-hass";
import { SCENARIOS } from "./fixtures/scenarios";
import type { LaundryCardConfig } from "../src/types";

beforeEach(() => {
  clearIndexCache();
  document.body.innerHTML = "";
});

async function mountEditor(config: LaundryCardConfig) {
  const el = document.createElement("haismart-laundry-card-editor") as HaismartLaundryCardEditor;
  el.hass = SCENARIOS["01_real_snapshot"]();
  el.setConfig(config);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

/** Simulates ha-form reporting a new value; returns the config the editor emitted. */
async function change(el: HaismartLaundryCardEditor, value: Record<string, unknown>) {
  const spy = vi.fn();
  el.addEventListener("config-changed", (e) => spy((e as CustomEvent).detail.config));
  el.shadowRoot!.querySelector("ha-form")!.dispatchEvent(new CustomEvent("value-changed", { detail: { value } }));
  await el.updateComplete;
  expect(spy).toHaveBeenCalledOnce();
  return spy.mock.calls[0][0] as LaundryCardConfig;
}

describe("editor", () => {
  it("uses the current device-selector filter form", () => {
    const device = editorSchema("en").find((s) => s.name === "device_id") as { selector: unknown };
    expect(device.selector).toEqual({ device: { filter: [{ integration: "haismart" }] } });
  });

  it("detected rows for the real snapshot", () => {
    const rows = detectedRows(SCENARIOS["01_real_snapshot"](), { type: "custom:haismart-laundry-card" }, "en");
    const texts = rows.map((r) => r.text);
    expect(texts[0]).toMatch(/^Device: Laundry Centre · \d+ entities$/);
    expect(texts).toContain("Washer: found");
    expect(texts).toContain("Dryer: found");
    expect(texts).toContain("Controls: on");
    expect(texts).toContain("Remote control: washer off, dryer off");
    expect(texts).toContain("Component: full support");
    expect(texts).toContain("Buttons stay disabled until remote control is on at the machine.");
    const two = detectedRows(SCENARIOS["19_two_devices"](), { type: "x" }, "en");
    expect(two.some((r) => r.level === "warning" && r.text.startsWith("More than one laundry centre"))).toBe(true);
  });

  it("renders the Detected panel and names the laundry centres in the device helper", async () => {
    const el = await mountEditor({ type: "custom:haismart-laundry-card" });
    expect(el.shadowRoot!.querySelector(".detected")!.textContent).toContain("Washer: found");
    const form = el.shadowRoot!.querySelector("ha-form") as HTMLElement & {
      computeHelper: (s: { name: string }) => string | undefined;
    };
    expect(form.computeHelper({ name: "device_id" })).toBe(
      "Leave empty to pick automatically. Laundry centres found: Laundry Centre",
    );
  });

  it("strips defaults and empty fields, keeps unknown keys", async () => {
    const el = await mountEditor({ type: "custom:haismart-laundry-card", title: "Laundry", card_mod: { style: "x" } });
    const next = await change(el, {
      device_id: MOCK_DEVICE_ID,
      title: "",
      layout: "auto",
      show_totals: true,
      tap_action: { action: "more-info" },
    });
    expect(next).toEqual({
      type: "custom:haismart-laundry-card",
      device_id: MOCK_DEVICE_ID,
      show_totals: true,
      card_mod: { style: "x" },
    });
  });

  it("a known key the form dropped is not resurrected from the old config", async () => {
    const el = await mountEditor({ type: "custom:haismart-laundry-card", title: "Laundry", layout: "stacked" });
    const next = await change(el, { layout: "stacked" });
    expect(next).toEqual({ type: "custom:haismart-laundry-card", layout: "stacked" });
  });
});
