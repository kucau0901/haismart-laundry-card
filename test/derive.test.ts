import { beforeEach, describe, expect, it } from "vitest";
import contract from "./fixtures/entity_contract.json";
import { AT, AT_MS, SCENARIOS, SNAPSHOT, TZ, airConditioner, scenario } from "./fixtures/scenarios";
import {
  CONTRACT,
  buildIndex,
  clearIndexCache,
  commandConfirmed,
  derive,
  drumActions,
  dryerStepOf,
  findLaundryDevices,
  gateFor,
  humaniseError,
  isLaundryDevice,
  legacyValue,
  resolveDevice,
  roundTo5,
  washerStepOf,
  type LaundryModel,
  type ModelMemory,
} from "../src/model";
import { buildHass, MOCK_DEVICE_ID } from "../src/mock/build-hass";
import { drumView, headline, type ViewCtx } from "../src/view";
import { fmtClock, fmtDuration, timeCtx } from "../src/time";
import type { HomeAssistant } from "../src/types";

const MIN = 60_000;

function modelOf(hass: HomeAssistant, opts: { now?: number; memory?: ModelMemory; device?: string } = {}): LaundryModel {
  const res = resolveDevice(hass, { device_id: opts.device });
  if (res.kind !== "ok") throw new Error(`no device: ${res.kind}`);
  return derive(hass, buildIndex(hass, res.deviceId), { now: opts.now ?? AT_MS, memory: opts.memory });
}

function vctx(hass: HomeAssistant, lang: "en" | "ms" = "en", now = AT_MS): ViewCtx {
  return { lang, time: timeCtx(hass, lang), now, timeDisplay: "both", controlsVisible: true };
}

beforeEach(() => clearIndexCache());

describe("contract", () => {
  it("bundles the attribute tables generated from entity_contract.json", () => {
    const full = (contract as { attributes: Record<string, { options: unknown }> }).attributes;
    for (const attr of ["laundryCyclePhase", "dryerCyclePhase", "washerMessage", "washerUnifiedProgramSettings"])
      expect(CONTRACT[attr].options).toEqual(full[attr].options);
    // Washer and dryer programme tables differ for the same value.
    expect(CONTRACT.washerUnifiedProgramSettings.options!["56"]).toBe("AI Wash");
    expect(CONTRACT.dryerUnifiedProgramSettings.options!["56"]).toBe("AI Dry");
  });
});

describe("discovery", () => {
  it("auto-picks the laundry device and indexes by haier_attribute", () => {
    const hass = SCENARIOS["01_real_snapshot"]();
    const res = resolveDevice(hass, {});
    expect(res).toMatchObject({ kind: "ok", deviceId: MOCK_DEVICE_ID });
    const idx = buildIndex(hass, MOCK_DEVICE_ID);
    expect(idx.attrs.dryerCyclePhase).toBe("sensor.laundry_centre_dryer_cycle_phase");
    expect(idx.attrs.washerUnifiedProgramSettings).toBe("select.laundry_centre_washer_unified_program_settings");
    expect(idx.programDomain).toEqual({ washer: "select", dryer: "select" });
    expect(idx.buttons.washer_start).toBe("button.laundry_centre_washer_start");
    expect(idx.fault).toBe("binary_sensor.laundry_centre_fault");
  });

  it("records the programme domain as sensor when controls are off", () => {
    const hass = SCENARIOS["16_no_buttons"]();
    const idx = buildIndex(hass, MOCK_DEVICE_ID);
    expect(idx.programDomain.washer).toBe("sensor");
    expect(Object.keys(idx.buttons)).toHaveLength(0);
  });

  it("memoises on registry identity and rebuilds when a new attribute appears", () => {
    const hass = SCENARIOS["01_real_snapshot"]();
    const a = buildIndex(hass, MOCK_DEVICE_ID);
    expect(buildIndex({ ...hass, states: { ...hass.states } }, MOCK_DEVICE_ID)).toBe(a);
  });

  it("two devices: uses the first and reports both", () => {
    const hass = SCENARIOS["19_two_devices"]();
    expect(findLaundryDevices(hass)).toEqual([MOCK_DEVICE_ID, "second-laundry"]);
    const res = resolveDevice(hass, {});
    expect(res).toMatchObject({ kind: "ok", deviceId: MOCK_DEVICE_ID, candidates: [MOCK_DEVICE_ID, "second-laundry"] });
    expect(resolveDevice(hass, { device_id: "second-laundry" })).toMatchObject({ kind: "ok", deviceId: "second-laundry" });
  });

  it("a non-laundry haismart device is not picked (S1 / S3)", () => {
    const ac = airConditioner();
    expect(isLaundryDevice(ac, "haier-ac")).toBe(false);
    expect(resolveDevice(ac, {})).toEqual({ kind: "none" });
    expect(resolveDevice(ac, { device_id: "haier-ac" })).toMatchObject({ kind: "not_laundry", name: "Bedroom AC" });
    expect(resolveDevice(ac, { device_id: "gone" })).toEqual({ kind: "removed" });
  });

  it("loading until the registries are present (C9)", () => {
    expect(resolveDevice(undefined, {})).toEqual({ kind: "loading" });
    const h = SCENARIOS["01_real_snapshot"]();
    expect(resolveDevice({ ...h, entities: undefined as never }, {})).toEqual({ kind: "loading" });
  });

  it("finds a switched-off machine by entity-id slug with no cache", () => {
    const hass = SCENARIOS["02_machine_off"]();
    expect(resolveDevice(hass, {})).toMatchObject({ kind: "ok" });
    const idx = buildIndex(hass, MOCK_DEVICE_ID);
    expect(idx.live).toBe(false);
    expect(idx.attrs.laundryCyclePhase).toBe("sensor.laundry_centre_laundry_cycle_phase");
  });

  it("uses the cache for a switched-off machine and drops removed entities", () => {
    const on = SCENARIOS["01_real_snapshot"]();
    buildIndex(on, MOCK_DEVICE_ID);
    const off = buildHass(
      { ...SNAPSHOT },
      { at: AT, timeZone: TZ, controls: true, off: true, deviceName: "Renamed Machine" },
    );
    // Entity ids differ from the cached ones, so cached rows not in the registry are dropped.
    off.entities = { ...off.entities, "sensor.laundry_centre_dryer_cycle_phase": on.entities["sensor.laundry_centre_dryer_cycle_phase"] };
    const idx = buildIndex(off, MOCK_DEVICE_ID);
    expect(idx.attrs.dryerCyclePhase).toBe("sensor.laundry_centre_dryer_cycle_phase");
    expect(idx.slugOnly).not.toContain("dryerCyclePhase");
    expect(idx.attrs.washerMessage).toBe("sensor.renamed_machine_washer_message");
  });
});

describe("fixture 1: the real snapshot", () => {
  const hass = SCENARIOS["01_real_snapshot"]();
  const m = modelOf(hass);

  it("washer idle with running mode 2 is idle, not paused", () => {
    expect(m.washer.mode).toBe(2);
    expect(m.washer.status).toBe("idle");
    expect(m.washer.idleDuration).toBe(68);
    expect(m.washer.programme).toMatchObject({ value: 56, label: "AI Wash", domain: "select" });
    expect(drumActions(m.washer)).toEqual({ primary: "start" });
  });

  it("dryer estimating with 470 min remaining, rounded to 5 min", () => {
    expect(m.dryer.status).toBe("estimating");
    expect(m.dryer.remaining).toBe(470);
    expect(m.dryer.approximate).toBe(true);
    expect(m.dryer.finishAt).toBe(roundTo5(AT_MS + 470 * MIN));
    expect(m.dryer.steps).toEqual([
      { key: "sense", state: "current" },
      { key: "dry", state: "upcoming" },
      { key: "cool", state: "upcoming" },
    ]);
  });

  it("softener notice comes from message 4 and the derived one is deduplicated", () => {
    expect(m.washer.notices).toHaveLength(1);
    expect(m.washer.notices[0]).toMatchObject({ key: "notice.w.4", category: "supply", source: "message" });
  });

  it("remote is off on both drums, so every control is gated", () => {
    expect(m.washer.remote).toBe(false);
    expect(gateFor(m, m.washer, "start", { now: AT_MS })).toBe("remote");
    expect(gateFor(m, m.dryer, "pause", { now: AT_MS })).toBe("remote");
    expect(m.controlsExist).toBe(true);
    expect(m.legacy).toBe(false);
  });

  it("renders the acceptance strings", () => {
    const ctx = vctx(hass);
    const w = drumView(m, m.washer, ctx);
    const d = drumView(m, m.dryer, ctx);
    expect(w.hero).toBe("Idle");
    expect(w.support).toBe("AI Wash · about 1 h 8 min");
    expect(w.programmeChip).toBeUndefined(); // remote is off
    expect(d.eyebrow).toBe("Dryer · Estimating time…");
    expect(d.hero).toBe(fmtClock(m.dryer.finishAt!, AT_MS, ctx.time));
    expect(d.hero).toBe("5:05 PM");
    expect(d.heroApprox).toBe(true);
    expect(d.support).toBe("about 7 h 50 min · estimate improves once drying starts");
    expect(headline(m, [m.washer, m.dryer], ctx)).toBe("Dryer finishes ~5:05 PM");
    expect(d.aria).toBe(
      "Dryer: running, estimating time, finishes around 5:05 PM, in about 7 hours 50 minutes, estimate improves once drying starts",
    );
    expect(w.aria).toBe("Washer: idle, programme AI Wash, takes about 1 hour 8 minutes, softener empty");
  });
});

describe("availability", () => {
  it("machine off with no attributes and no cache", () => {
    const hass = SCENARIOS["02_machine_off"]();
    const m = modelOf(hass);
    expect(m.machineOff).toBe(true);
    expect(m.offReason).toBe("unavailable");
    expect(m.offSince).toBe(AT_MS);
    expect(m.washer.status).toBe("off");
    expect(m.dryer.status).toBe("off");
    expect(headline(m, [m.washer, m.dryer], vctx(hass))).toBe("Machine is off · since 9:17 AM");
  });

  it("machine off detected from the whole device when nothing is indexed", () => {
    const hass = SCENARIOS["02_machine_off"]();
    // Strip the phase entities so neither slug nor cache can name them.
    for (const eid of Object.keys(hass.entities)) if (eid.includes("cycle_phase")) delete hass.entities[eid];
    const m = derive(hass, buildIndex(hass, MOCK_DEVICE_ID), { now: AT_MS });
    expect(m.machineOff).toBe(true);
  });

  it("machine off because onOffStatus is false while connected", () => {
    const m = modelOf(scenario({ onOffStatus: false }));
    expect(m.machineOff).toBe(true);
    expect(m.offReason).toBe("power");
  });

  it("one drum stale; the other is unaffected", () => {
    const m = modelOf(SCENARIOS["04_one_drum_stale"]());
    expect(m.washer.status).toBe("stale");
    expect(m.dryer.status).toBe("estimating");
    expect(m.machineOff).toBe(false);
  });

  it("phase unavailable while the other drum reports is stale", () => {
    const m = modelOf(scenario({}, { stateOverride: { dryerCyclePhase: "unavailable" } }));
    expect(m.dryer.status).toBe("stale");
    expect(m.washer.status).toBe("idle");
  });

  it("drum off when its power status is false", () => {
    const m = modelOf(scenario({ washerPowerStatus: false }));
    expect(m.washer.status).toBe("off");
    expect(m.dryer.status).toBe("estimating");
  });
});

describe("statuses", () => {
  it("paused: no clock, frozen stepper, Resume and Cancel", () => {
    const hass = SCENARIOS["05_paused"]();
    const m = modelOf(hass);
    expect(m.dryer.status).toBe("paused");
    expect(m.dryer.finishAt).toBeUndefined();
    expect(m.dryer.steps?.map((s) => s.state)).toEqual(["complete", "current", "upcoming"]);
    expect(drumActions(m.dryer)).toEqual({ primary: "resume", secondary: "cancel" });
    const v = drumView(m, m.dryer, vctx(hass));
    expect(v.hero).toBe("Paused");
    expect(v.eyebrow).toBe("Dryer · Paused during drying");
    expect(v.support).toBe("1 h 35 min left when resumed");
  });

  it("delayed dryer with resn: approximate clock and starts-in", () => {
    const hass = SCENARIOS["06_delayed_dryer"]();
    const m = modelOf(hass);
    expect(m.dryer.status).toBe("delayed");
    expect(m.dryer.approximate).toBe(true);
    expect(m.dryer.startsAt).toBe(AT_MS + 120 * MIN);
    expect(m.dryer.finishAt).toBe(roundTo5(AT_MS + 210 * MIN));
    const v = drumView(m, m.dryer, vctx(hass));
    // Same hero as the scheduled washer; both clocks are labelled.
    expect(v.hero).toBe("Scheduled");
    expect(v.heroApprox).toBe(false);
    expect(v.support).toBe("Starts 11:17 AM · done ~12:45 PM");
    expect(v.aria).toContain("starts in 2 hours, finishes around 12:45 PM");
    expect(drumActions(m.dryer)).toEqual({ secondary: "cancel_scheduled" });
    expect(commandConfirmed("cancel_scheduled", m.dryer)).toBe(false);
    expect(commandConfirmed("cancel_scheduled", { ...m.dryer, status: "idle", phase: 0 })).toBe(true);
    expect(commandConfirmed("cancel_scheduled", { ...m.dryer, status: "stale", phase: undefined })).toBe(false);
  });

  it("delayed washer: no clock is claimed", () => {
    const hass = SCENARIOS["07_delayed_washer"]();
    const m = modelOf(hass);
    expect(m.washer.status).toBe("delayed");
    expect(m.washer.finishAt).toBeUndefined();
    const v = drumView(m, m.washer, vctx(hass));
    expect(v.hero).toBe("Scheduled");
    expect(v.support).toBe("Finishes in about 1 h 30 min");
  });

  it("dryer anti-crease is done-like with Stop tumbling", () => {
    const hass = SCENARIOS["08_anti_crease"]();
    const m = modelOf(hass);
    expect(m.dryer.status).toBe("tumbling");
    expect(m.dryer.isDoneLike).toBe(true);
    expect(drumActions(m.dryer)).toEqual({ secondary: "stop" });
    const v = drumView(m, m.dryer, vctx(hass));
    expect(v.hero).toBe("Done");
    expect(v.support).toBe("Unload any time · 25 min of anti-crease left");
    expect(v.aria).toContain("unload any time, 25 minutes of anti-crease left");
    expect(commandConfirmed("stop", { ...m.dryer, phase: 0 })).toBe(true);
    // Unverified landing phase after anti-crease: Finished also confirms; still tumbling does not.
    expect(commandConfirmed("stop", { ...m.dryer, status: "done", phase: 6 })).toBe(true);
    expect(commandConfirmed("stop", m.dryer)).toBe(false);
    expect(commandConfirmed("stop", { ...m.dryer, status: "stale", phase: undefined })).toBe(false);
  });

  it("washer phase 16 is tumbling with no controls", () => {
    const hass = SCENARIOS["09_washer_tumbling"]();
    const m = modelOf(hass);
    expect(m.washer.status).toBe("tumbling");
    expect(drumActions(m.washer)).toEqual({});
    expect(drumView(m, m.washer, vctx(hass)).support).toBe("Unload any time · tumbling to loosen clothes");
  });

  it("done with message 14: finished time, maintenance chip, door locked", () => {
    const hass = SCENARIOS["10_done_msg14"]();
    const m = modelOf(hass);
    expect(m.washer.status).toBe("done");
    expect(m.washer.finishedAt).toBe(AT_MS - 12 * MIN);
    // The snapshot's softener is still empty, so the derived supply notice sorts first.
    expect(m.washer.notices.map((n) => n.key)).toEqual(["notice.w.4", "notice.w.14"]);
    expect(m.washer.steps?.every((s) => s.state === "complete")).toBe(true);
    const v = drumView(m, m.washer, vctx(hass));
    // Locked door: the safety detail first, and never "ready to unload" beside it.
    expect(v.support).toBe("Door still locked · finished 9:05 AM");
    expect(v.aria).toContain("door still locked, finished 9:05 AM");
    expect(headline(m, [m.washer, m.dryer], vctx(hass))).toBe("Washer is ready · Dryer finishes ~3:35 PM"); // dryer anchored 90 min earlier
    const unlocked = { ...m.washer, doorLocked: false };
    expect(drumView(m, unlocked, vctx(hass)).support).toBe("Finished 9:05 AM · ready to unload");
  });

  it("finished time is hidden when everything changed at once (restart)", () => {
    const hass = scenario({ laundryCyclePhase: 14 });
    expect(modelOf(hass).washer.finishedAt).toBeUndefined();
  });

  it("done with message 8: blocking text replaces the support line", () => {
    const hass = SCENARIOS["11_done_msg8"]();
    const m = modelOf(hass);
    expect(m.washer.blockingNotice?.key).toBe("notice.w.8");
    expect(m.washer.notices.find((n) => n.value === 8)).toBeUndefined();
    const v = drumView(m, m.washer, vctx(hass));
    expect(v.support).toBe("Drum too hot to open");
    expect(v.supportIcon).toBe("mdi:alert");
  });

  it("fault with two faults: banner data, start gated, pause allowed", () => {
    const hass = SCENARIOS["12_fault"]();
    const base = modelOf(hass);
    expect(base.fault).toMatchObject({ on: true, faults: ["Drain pump blocked", "Door lock fault"], codes: "E21, E30" });
    const m: LaundryModel = {
      ...base,
      washer: { ...base.washer, remote: true },
      dryer: { ...base.dryer, remote: true },
    };
    expect(gateFor(m, m.washer, "start", { now: AT_MS })).toBe("fault");
    expect(gateFor(m, m.dryer, "pause", { now: AT_MS })).toBeNull();
    expect(headline(m, [m.washer, m.dryer], vctx(hass))).toBe("Needs attention");
  });

  it("fault code falls back to error_code", () => {
    const m = modelOf(scenario({}, { fault: { on: true, faults: [], error_code: 7 } }));
    expect(m.fault.codes).toBe("7");
    expect(modelOf(scenario({}, { fault: { on: true, error_code: 0 } })).fault.codes).toBeUndefined();
  });

  it("unknown phase 30 is generic running, 'Working'", () => {
    const hass = SCENARIOS["15_unknown_phase"]();
    const m = modelOf(hass);
    expect(m.dryer.status).toBe("running");
    expect(m.dryer.generic).toBe(true);
    expect(m.dryer.steps).toBeNull();
    expect(drumView(m, m.dryer, vctx(hass)).eyebrow).toBe("Dryer · Working");
  });

  it("maintenance and care sub-kinds", () => {
    const hass = scenario({ dryerCyclePhase: 11, dryerRemainingDryTime: 30 });
    const m = modelOf(hass);
    expect(m.dryer.sub).toBe("maintenance");
    expect(m.dryer.steps).toBeNull();
    expect(drumView(m, m.dryer, vctx(hass)).support).toBe("Self-maintenance cycle · in 30 min");
    const care = modelOf(scenario({ laundryCyclePhase: 20, washerRunningMode: 1, remainingTimeHH: 0, remainingTimeMM: 40 }));
    expect(care.washer.sub).toBe("care");
    expect(care.washer.steps?.at(-1)).toEqual({ key: "care", state: "current" });
  });

  it("running: clock hero and 'in' support, Pause and Cancel", () => {
    const hass = SCENARIOS["21_both_running"]();
    const m = modelOf(hass);
    expect(m.washer.status).toBe("running");
    expect(m.washer.steps?.map((s) => s.state)).toEqual(["current", "upcoming", "upcoming"]);
    const v = drumView(m, m.washer, vctx(hass));
    expect(v.hero).toBe("10:05 AM");
    expect(v.support).toBe("in 48 min");
    expect(v.eyebrow).toBe("Washer · Washing");
    expect(headline(m, [m.washer, m.dryer], vctx(hass))).toBe("All done by 10:32 AM");
    expect(drumActions(m.washer)).toEqual({ primary: "pause", secondary: "cancel" });
    const remaining = drumView(m, m.washer, { ...vctx(hass), timeDisplay: "remaining" });
    expect(remaining.hero).toBe("48 min");
    expect(remaining.support).toBe("done 10:05 AM");
  });

  it("finishing at zero", () => {
    const hass = scenario({ laundryCyclePhase: 11, washerRunningMode: 1, remainingTimeHH: 0, remainingTimeMM: 0 });
    const m = modelOf(hass);
    expect(drumView(m, m.washer, vctx(hass)).hero).toBe("Finishing…");
  });
});

describe("legacy component", () => {
  it("maps labels through each attribute's own table", () => {
    const hass = SCENARIOS["13_legacy_labels"]();
    const m = modelOf(hass);
    expect(m.legacy).toBe(true);
    expect(m.legacyUnmapped).toBe(false);
    expect(m.washer.status).toBe("idle");
    expect(m.washer.programme.value).toBe(56);
    expect(m.dryer.programme.value).toBe(56);
    expect(m.dryer.status).toBe("estimating");
    expect(m.washer.remote).toBe(false);
    expect(m.dryer.remaining).toBe(470);
    expect(m.washer.notices[0].key).toBe("notice.w.4");
  });

  it("reverse-maps case-insensitively after trimming, per attribute", () => {
    expect(legacyValue("dryerUnifiedProgramSettings", "select.x", "  ai dry ")).toBe(56);
    expect(legacyValue("washerUnifiedProgramSettings", "select.x", "AI Wash")).toBe(56);
    expect(legacyValue("washerUnifiedProgramSettings", "select.x", "AI Dry")).toBeUndefined();
    expect(legacyValue("washerDoorStatus", "binary_sensor.x", "on")).toBe(true);
    expect(legacyValue("dryerRemainingDryTime", "sensor.x", "12.0")).toBe(12);
  });

  it("an unmapped phase label is generic", () => {
    const hass = SCENARIOS["14_legacy_unmapped"]();
    const m = modelOf(hass);
    expect(m.legacyUnmapped).toBe(true);
    expect(m.dryer.generic).toBe(true);
    expect(m.dryer.status).toBe("running"); // dryerRunningMode 1
    expect(m.dryer.steps).toBeNull();
  });
});

describe("controls", () => {
  it("no buttons: no actions available", () => {
    const m = modelOf(SCENARIOS["16_no_buttons"]());
    expect(m.controlsExist).toBe(false);
    expect(m.washer.buttons).toEqual({ start: undefined, pause: undefined, cancel: undefined });
  });

  it("remote on: gates by door, programme and settle time", () => {
    const m = modelOf(SCENARIOS["17_remote_on"]());
    expect(gateFor(m, m.washer, "start", { now: AT_MS + 10_000 })).toBeNull();
    // A fresh last_changed alone (machine woke up, HA restarted) is not a programme change.
    expect(gateFor(m, m.washer, "start", { now: AT_MS + 1_000 })).toBeNull();
    expect(gateFor(m, { ...m.washer, doorOpen: true }, "start", { now: AT_MS + 10_000 })).toBe("door");
    expect(gateFor(m, { ...m.washer, programme: { value: 0 } }, "start", { now: AT_MS + 10_000 })).toBe("programme");
    expect(gateFor(m, m.washer, "start", { now: AT_MS + 10_000, sending: "dryer" })).toBe("busy");
    expect(gateFor(m, m.washer, "start", { now: AT_MS + 10_000, pending: ["washer"] })).toBe("pending");
    expect(gateFor(m, m.dryer, "pause", { now: AT_MS })).toBeNull();
  });

  it("remote on shows the programme chip on the idle washer", () => {
    const hass = SCENARIOS["17_remote_on"]();
    const m = modelOf(hass);
    const v = drumView(m, m.washer, vctx(hass));
    expect(v.programmeChip).toEqual({
      label: "AI Wash",
      entity: "select.laundry_centre_washer_unified_program_settings",
      meta: "about 1 h 8 min",
      empty: false,
    });
    expect(v.support).toBeUndefined();
    expect(v.aria).toBe("Washer: idle, programme AI Wash, takes about 1 hour 8 minutes, softener empty, remote control on");
  });

  it("message 18 is hidden as a notice", () => {
    const m = modelOf(SCENARIOS["18_message_18"]());
    expect(m.washer.message).toBe(18);
    expect(m.washer.notices.map((n) => n.value)).toEqual([4]); // only the derived softener notice
    expect(m.washer.notices[0].source).toBe("supply");
  });

  it("expected-value predicates", () => {
    const m = modelOf(SCENARIOS["21_both_running"]());
    expect(commandConfirmed("start", m.washer)).toBe(true);
    expect(commandConfirmed("pause", m.washer)).toBe(false);
    expect(commandConfirmed("pause", { ...m.washer, status: "paused", mode: 2 })).toBe(true);
    expect(commandConfirmed("resume", m.washer)).toBe(true);
    expect(commandConfirmed("cancel", m.washer)).toBe(false);
    expect(commandConfirmed("cancel", { ...m.washer, phase: 0 })).toBe(true);
  });
});

describe("notices", () => {
  it("orders blocking, supply, maintenance, info and caps nothing in the model", () => {
    const m = modelOf(scenario({ washerMessage: 6, remainingDetergentStatus: 2 }));
    expect(m.washer.notices.map((n) => [n.category, n.value])).toEqual([
      ["blocking", 6],
      ["supply", 3],
      ["supply", 4],
    ]);
  });

  it("13 deduplicates both derived supply notices; unknown values are neutral", () => {
    const m = modelOf(scenario({ washerMessage: 13, remainingDetergentStatus: 2 }));
    expect(m.washer.notices.map((n) => n.value)).toEqual([13]);
    const u = modelOf(scenario({ dryerMessage: 42 }));
    expect(u.dryer.notices[0]).toMatchObject({ category: "unknown", text: "42" });
    const hidden = modelOf(scenario({ dryerMessage: 6 }));
    expect(hidden.dryer.notices).toEqual([]);
    const absorbed = modelOf(scenario({ dryerMessage: 2 }));
    expect(absorbed.dryer.notices).toEqual([]);
  });
});

describe("phase mappings", () => {
  const washerExpect: Record<number, string> = {
    0: "idle", 1: "estimating", 2: "estimating", 26: "estimating", 15: "delayed", 14: "done", 18: "done", 19: "done", 16: "tumbling",
  };
  for (let p = 0; p <= 26; p++) {
    it(`washer phase ${p}`, () => {
      const m = modelOf(scenario({ laundryCyclePhase: p, washerRunningMode: 1 }));
      expect(m.washer.status).toBe(washerExpect[p] ?? "running");
      expect(m.washer.phaseKnown).toBe(true);
    });
  }
  const dryerExpect: Record<number, string> = {
    0: "idle", 1: "delayed", 6: "done", 7: "tumbling", 8: "estimating", 10: "estimating",
  };
  for (let p = 0; p <= 11; p++) {
    it(`dryer phase ${p}`, () => {
      const m = modelOf(scenario({ dryerCyclePhase: p }));
      expect(m.dryer.status).toBe(dryerExpect[p] ?? "running");
    });
  }

  it("stepper is monotonic across washer phases 21→3→6→7→8→10→7→11", () => {
    const order = ["wash", "rinse", "spin", "dry", "care"];
    const seq = [21, 3, 6, 7, 8, 10, 7, 11].map((p) => order.indexOf(washerStepOf(p)!));
    expect(seq.every((v, i) => i === 0 || v >= seq[i - 1])).toBe(true);
    expect(seq).toEqual([0, 0, 0, 1, 1, 1, 1, 2]);
  });

  it("stepper is monotonic across dryer phases 8→2→3→4→5", () => {
    const order = ["sense", "dry", "cool", "care"];
    const seq = [8, 2, 3, 4, 5].map((p) => order.indexOf(dryerStepOf(p)!));
    expect(seq).toEqual([0, 1, 1, 1, 2]);
  });

  it("wash-and-dry programmes show a Dry step; dry-only shows only Dry", () => {
    const wd = modelOf(scenario({ laundryCyclePhase: 5, washerRunningMode: 1, washerUnifiedProgramSettings: 88 }));
    expect(wd.washer.steps?.map((s) => s.key)).toEqual(["wash", "rinse", "spin", "dry"]);
    const dry = modelOf(scenario({ laundryCyclePhase: 12, washerRunningMode: 1, washerUnifiedProgramSettings: 29 }));
    expect(dry.washer.steps).toEqual([{ key: "dry", state: "current" }]);
  });

  it("a dry phase seen since leaving standby keeps the Dry step", () => {
    const memory: ModelMemory = {};
    modelOf(scenario({ laundryCyclePhase: 12, washerRunningMode: 1 }), { memory });
    const later = modelOf(scenario({ laundryCyclePhase: 14 }), { memory });
    expect(later.washer.steps?.map((s) => s.key)).toContain("dry");
    modelOf(scenario({ laundryCyclePhase: 0 }), { memory });
    const reset = modelOf(scenario({ laundryCyclePhase: 14 }), { memory });
    expect(reset.washer.steps?.map((s) => s.key)).not.toContain("dry");
  });
});

describe("time", () => {
  it("hysteresis keeps the finish time for changes under 2 minutes", () => {
    const memory: ModelMemory = {};
    const base = { laundryCyclePhase: 5, washerRunningMode: 1, remainingTimeHH: 0, remainingTimeMM: 48 };
    const a = modelOf(scenario(base), { memory });
    const jitter = buildHass({ ...SNAPSHOT, ...base, remainingTimeMM: 47 }, {
      at: new Date(AT_MS + 30_000).toISOString(),
      timeZone: TZ,
      controls: true,
    });
    expect(modelOf(jitter, { memory }).washer.finishAt).toBe(a.washer.finishAt);
    const jump = buildHass({ ...SNAPSHOT, ...base, remainingTimeMM: 55 }, { at: AT, timeZone: TZ, controls: true });
    expect(modelOf(jump, { memory }).washer.finishAt).toBe(AT_MS + 55 * MIN);
  });

  it("rounds finish times only above 2 hours", () => {
    const short = modelOf(scenario({ dryerCyclePhase: 3, dryerRemainingDryTime: 119 }));
    expect(short.dryer.finishAt).toBe(AT_MS + 119 * MIN);
    const long = modelOf(scenario({ dryerCyclePhase: 3, dryerRemainingDryTime: 121 }));
    expect(long.dryer.finishAt! % (5 * MIN)).toBe(0);
  });

  it("appends 'tomorrow' and a weekday further out", () => {
    const hass = scenario();
    const ctx = timeCtx(hass, "en");
    expect(fmtClock(AT_MS + 15 * 60 * MIN, AT_MS, ctx)).toBe("12:17 AM tomorrow");
    expect(fmtClock(AT_MS + 40 * 60 * MIN, AT_MS, ctx)).toMatch(/^Sat 1:17 AM$/);
    const ms = timeCtx(hass, "ms");
    expect(fmtClock(AT_MS + 15 * 60 * MIN, AT_MS, ms)).toMatch(/ esok$/);
  });

  it("12h and 24h formats", () => {
    const h12 = timeCtx(scenario({}, { timeFormat: "12" }), "en");
    const h24 = timeCtx(scenario({}, { timeFormat: "24" }), "en");
    expect(fmtClock(AT_MS + 8 * 60 * MIN, AT_MS, h12)).toBe("5:17 PM");
    expect(fmtClock(AT_MS + 8 * 60 * MIN, AT_MS, h24)).toBe("17:17");
    expect(timeCtx(scenario({}, { timeFormat: "language" }), "en").hour12).toBeUndefined();
  });

  it("ms formatting", () => {
    expect(fmtDuration(42, "ms")).toBe("42 min");
    expect(fmtDuration(120, "ms")).toBe("2 j");
    expect(fmtDuration(130, "ms")).toBe("2 j 10 min");
    expect(fmtDuration(130, "en")).toBe("2 h 10 min");
    const hass = scenario({}, { language: "ms" });
    const ctx = timeCtx(hass, "ms");
    expect(ctx.fmtLocale).toBe("ms");
    expect(timeCtx(scenario({}, { language: "en-GB" }), "ms").fmtLocale).toBe("ms-MY");
    const m = modelOf(hass);
    const v = drumView(m, m.washer, { ...vctx(hass, "ms") });
    expect(v.hero).toBe("Tidak aktif");
    expect(v.support).toBe("AI Wash · kira-kira 1 j 8 min");
    expect(headline(m, [m.washer, m.dryer], vctx(hass, "ms"))).toMatch(/^Pengering dijangka siap ~5:05 PTG$/);
  });
});

describe("error humanisation", () => {
  const rejected = (reason: string) => ({ message: `Laundry Centre does not accept that setting: ${reason}` });
  it.each([
    [rejected("remote control is not enabled for the washer -- turn it on at the machine's panel first"), "err.remote_off"],
    [rejected("no fresh report from the dryer; try again in a moment"), "err.no_report"],
    [rejected("laundry controls are off for this appliance (Configure → enable controls)"), "err.controls_off"],
    [rejected("the washer is running or its state is unknown; pause or cancel it first"), "err.running"],
    [{ message: "Home Assistant has not read Laundry Centre's current state yet" }, "err.no_status"],
    [{ message: "Could not send the command to Laundry Centre: timed out" }, "err.unreachable"],
    [{ code: 3, message: "Connection lost" }, "err.ha_unreachable"],
    [{ error: "connection_lost" }, "err.ha_unreachable"],
    [{}, "err.ha_unreachable"],
    [{ message: "something else" }, "err.generic"],
  ])("%j → %s", (err, key) => {
    expect(humaniseError(err).key).toBe(key);
  });

  it("keeps the stripped raw text with an em dash and a capital", () => {
    const h = humaniseError(rejected("remote control is not enabled for the washer -- turn it on at the machine's panel first"));
    expect(h.detail).toBe("Remote control is not enabled for the washer — turn it on at the machine's panel first");
    expect(humaniseError({ message: "Could not send the command to Laundry Centre: timed out" }).detail).toBe("Timed out");
  });
});

describe("review follow-ups: model", () => {
  it("humanises the structured websocket error before parsing English", () => {
    const err = {
      code: "home_assistant_error",
      message: "Laundry Centre does not accept that setting: remote control was switched off for the dryer; nothing was sent",
      translation_domain: "haismart",
      translation_key: "control_rejected",
      translation_placeholders: {
        name: "Laundry Centre",
        error: "remote control was switched off for the dryer; nothing was sent",
      },
    };
    expect(humaniseError(err)).toEqual({
      key: "err.remote_off",
      detail: "Remote control was switched off for the dryer; nothing was sent",
    });
    expect(humaniseError({ message: "x", translation_key: "no_status", translation_domain: "haismart" }).key).toBe(
      "err.no_status",
    );
    expect(
      humaniseError({ message: "y", translation_key: "control_failed", translation_placeholders: { error: "timed out" } }),
    ).toEqual({ key: "err.unreachable", detail: "Timed out" });
  });

  it("the exact _recheck_laundry_push wording maps to remote-off (string fallback)", () => {
    const msg =
      "Laundry Centre does not accept that setting: remote control was switched off for the washer; nothing was sent";
    expect(humaniseError({ message: msg }).key).toBe("err.remote_off");
  });

  it("remote flag missing or unknown gates every command, and is told apart from 'off'", () => {
    const hass = SCENARIOS["21_both_running"]();
    for (const eid of Object.keys(hass.states)) if (eid.includes("dryer_remote")) delete hass.states[eid];
    const m = modelOf(hass);
    expect(m.dryer.remote).toBeUndefined();
    expect(m.dryer.remoteState).toBe("missing");
    for (const cmd of ["start", "resume", "pause", "cancel", "cancel_scheduled", "stop"] as const)
      expect(gateFor(m, m.dryer, cmd, { now: AT_MS })).toBe("remote");
    const unknown = modelOf(remoteOnScenario({}, { stateOverride: { dryerRemoteCtrValid: "unavailable" } }));
    expect(unknown.dryer.remoteState).toBe("unknown");
    expect(gateFor(unknown, unknown.dryer, "pause", { now: AT_MS })).toBe("remote");
    expect(modelOf(SCENARIOS["01_real_snapshot"]()).dryer.remoteState).toBe("off");
    expect(modelOf(SCENARIOS["21_both_running"]()).dryer.remoteState).toBe("on");
  });

  it("gate results for every command against each status", () => {
    const now = AT_MS + 60_000;
    const cases: Array<[string, () => HomeAssistant, "washer" | "dryer"]> = [
      ["idle", () => remoteOnScenario(), "washer"],
      ["estimating", () => remoteOnScenario(), "dryer"],
      ["running", () => SCENARIOS["21_both_running"](), "washer"],
      ["paused", () => remoteOnScenario({ dryerCyclePhase: 3, dryerRunningMode: 2, dryerRemainingDryTime: 95 }), "dryer"],
      ["delayed", () => remoteOnScenario({ dryerCyclePhase: 1, dryerRunningMode: 1, dryerRemainingResnTime: 60 }), "dryer"],
      ["tumbling", () => remoteOnScenario({ dryerCyclePhase: 7, remainingAntiCreaseTime: 25 }), "dryer"],
    ];
    for (const [status, build, key] of cases) {
      const m = modelOf(build());
      const d = m[key];
      expect(d.status).toBe(status);
      for (const cmd of ["start", "resume", "pause", "cancel", "cancel_scheduled", "stop"] as const) {
        // Remote on, nothing pending, no fault, door closed, programme chosen: every command passes.
        expect(gateFor(m, d, cmd, { now })).toBeNull();
        expect(gateFor(m, d, cmd, { now, pending: [key] })).toBe("pending");
        expect(gateFor(m, d, cmd, { now, sending: key === "washer" ? "dryer" : "washer" })).toBe("busy");
        expect(gateFor(m, { ...d, remote: undefined }, cmd, { now })).toBe("remote");
      }
      const faulty = { ...m, fault: { ...m.fault, on: true } };
      expect(gateFor(faulty, d, "start", { now })).toBe("fault");
      expect(gateFor(faulty, d, "resume", { now })).toBe("fault");
      expect(gateFor(faulty, d, "pause", { now })).toBeNull();
      expect(gateFor(faulty, d, "cancel", { now })).toBeNull();
    }
  });

  it("'Applying programme' follows a real change of value, not last_changed alone", () => {
    const memory: ModelMemory = {};
    const first = modelOf(remoteOnScenario(), { memory });
    expect(first.washer.programme.lastChanged).toBeUndefined();
    // Machine off and back on with the same programme: no gate.
    modelOf(remoteOnScenario({}, { off: true }), { memory });
    const woke = modelOf(remoteOnScenario({}, { at: new Date(AT_MS + 60_000).toISOString() }), { memory, now: AT_MS + 61_000 });
    expect(gateFor(woke, woke.washer, "start", { now: AT_MS + 61_000 })).toBeNull();
    // The owner picks another programme: Start waits 5 s.
    const changedAt = new Date(AT_MS + 120_000).toISOString();
    const changed = modelOf(remoteOnScenario({ washerUnifiedProgramSettings: 1 }, { at: changedAt }), {
      memory,
      now: AT_MS + 121_000,
    });
    expect(changed.washer.programme.lastChanged).toBe(AT_MS + 120_000);
    expect(gateFor(changed, changed.washer, "start", { now: AT_MS + 121_000 })).toBe("applying");
    expect(gateFor(changed, changed.washer, "start", { now: AT_MS + 126_000 })).toBeNull();
  });

  it("every support clause is also in the spoken sentence", () => {
    for (const [name, build] of Object.entries(SCENARIOS)) {
      const hass = build();
      const res = resolveDevice(hass, {});
      if (res.kind !== "ok") continue;
      const m = derive(hass, buildIndex(hass, res.deviceId), { now: AT_MS });
      for (const d of [m.washer, m.dryer]) {
        for (const lang of ["en", "ms"] as const) {
          const v = drumView(m, d, vctx(hass, lang));
          for (const p of v.supportParts) {
            const spoken = (p.spoken ?? p.text).toLocaleLowerCase();
            expect(v.aria.toLocaleLowerCase(), `${name}/${d.key}/${lang}`).toContain(spoken);
          }
          if (v.support) expect(v.support).toBe(v.supportParts.map((p) => p.text).join(" · "));
        }
      }
    }
  });

  it("resolveDevice stays fast on a large registry", () => {
    const hass = SCENARIOS["01_real_snapshot"]();
    // 400 other devices with 10 entities each (other integrations and other haismart devices).
    for (let i = 0; i < 400; i++) {
      const dev = `dev-${i}`;
      hass.devices[dev] = { id: dev, name: `Device ${i}`, name_by_user: null };
      for (let j = 0; j < 10; j++) {
        const eid = `sensor.device_${i}_${j}`;
        hass.entities[eid] = { entity_id: eid, device_id: dev, platform: i % 20 === 0 ? "haismart" : "other" };
        hass.states[eid] = { entity_id: eid, state: "1", attributes: {}, last_changed: AT, last_updated: AT };
      }
    }
    expect(Object.keys(hass.entities).length).toBeGreaterThan(4000);
    resolveDevice(hass, {}); // builds the per-registry row map once
    const runs = 200;
    const t0 = performance.now();
    for (let i = 0; i < runs; i++) {
      resolveDevice({ ...hass, states: { ...hass.states } }, {});
      resolveDevice(hass, { device_id: MOCK_DEVICE_ID });
    }
    const per = (performance.now() - t0) / runs;
    expect(per).toBeLessThan(2); // was ~85-118 ms before the row map
    expect(resolveDevice(hass, {})).toMatchObject({ kind: "ok", deviceId: MOCK_DEVICE_ID });
    expect(resolveDevice(hass, { device_id: MOCK_DEVICE_ID })).toMatchObject({ kind: "ok", candidates: [MOCK_DEVICE_ID] });
    expect(resolveDevice(hass, { device_id: "dev-0" })).toMatchObject({ kind: "not_laundry" });
  });

  it("clearIndexCache also clears the localStorage mirror", () => {
    const store = new Map<string, string>();
    const ls = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
      key: (i: number) => [...store.keys()][i] ?? null,
      get length() {
        return store.size;
      },
    };
    const g = globalThis as { localStorage?: unknown };
    const prev = g.localStorage;
    g.localStorage = ls;
    try {
      store.set("unrelated", "1");
      buildIndex(SCENARIOS["01_real_snapshot"](), MOCK_DEVICE_ID);
      expect([...store.keys()].some((k) => k.startsWith("haismart-laundry-card:index:v1:"))).toBe(true);
      clearIndexCache();
      expect([...store.keys()]).toEqual(["unrelated"]);
    } finally {
      g.localStorage = prev;
    }
  });
});

function remoteOnScenario(o: Record<string, unknown> = {}, opts: Parameters<typeof scenario>[1] = {}): HomeAssistant {
  return scenario({ washerRemoteCtrValid: true, dryerRemoteCtrValid: true, ...o }, opts);
}
