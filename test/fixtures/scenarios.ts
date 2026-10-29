// Fixture scenarios, one per row of the spec's §5 matrix and §15 list. Each is a hass object built
// from the real decoded snapshot (fixture 1) with the overrides that scenario needs.

import snapshot from "./snapshot_dryer_running_washer_idle.json";
import { buildHass, mergeHass, type MockOptions } from "../../src/mock/build-hass";
import type { HomeAssistant } from "../../src/types";

/** 09:17 in Kuala Lumpur. */
export const AT = "2026-10-29T01:17:00.000Z";
export const AT_MS = Date.parse(AT);
export const TZ = "Asia/Kuala_Lumpur";
export const SNAPSHOT = snapshot as Record<string, unknown>;

const minutesBefore = (min: number) => new Date(AT_MS - min * 60_000).toISOString();

export function scenario(overrides: Record<string, unknown> = {}, opts: MockOptions = {}): HomeAssistant {
  return buildHass({ ...SNAPSHOT, ...overrides }, { at: AT, timeZone: TZ, controls: true, ...opts });
}

export const SCENARIOS: Record<string, () => HomeAssistant> = {
  "01_real_snapshot": () => scenario(),
  "02_machine_off": () => scenario({}, { off: true }),
  "04_one_drum_stale": () => scenario({}, { stateOverride: { laundryCyclePhase: "unknown" } }),
  "05_paused": () => scenario({ dryerCyclePhase: 3, dryerRunningMode: 2, dryerRemainingDryTime: 95 }),
  "06_delayed_dryer": () =>
    scenario({ dryerCyclePhase: 1, dryerRunningMode: 1, dryerRemainingResnTime: 120, dryerRemainingDryTime: 90 }),
  "07_delayed_washer": () => scenario({ laundryCyclePhase: 15, washerRunningMode: 1, remainingTimeHH: 1, remainingTimeMM: 30 }),
  "08_anti_crease": () => scenario({ dryerCyclePhase: 7, remainingAntiCreaseTime: 25, dryerRemainingDryTime: 0 }),
  "09_washer_tumbling": () => scenario({ laundryCyclePhase: 16 }),
  "10_done_msg14": () =>
    scenario(
      { laundryCyclePhase: 14, washerMessage: 14, remainingTimeHH: 0, remainingTimeMM: 0, washerDoorLockStatus: true },
      { at: minutesBefore(90), changedAt: { laundryCyclePhase: minutesBefore(12) } },
    ),
  "11_done_msg8": () => scenario({ laundryCyclePhase: 14, washerMessage: 8 }),
  "12_fault": () =>
    scenario({}, { fault: { on: true, faults: ["Drain pump blocked", "Door lock fault"], fault_codes: ["E21", "E30"] } }),
  "13_legacy_labels": () => scenario({}, { legacy: true }),
  "14_legacy_unmapped": () => scenario({}, { legacy: true, stateOverride: { dryerCyclePhase: "Some new phase" } }),
  "15_unknown_phase": () => scenario({ dryerCyclePhase: 30 }),
  "16_no_buttons": () => scenario({}, { controls: false }),
  "17_remote_on": () => scenario({ washerRemoteCtrValid: true, dryerRemoteCtrValid: true }),
  "18_message_18": () => scenario({ washerMessage: 18 }),
  "19_two_devices": () =>
    mergeHass(scenario(), scenario({}, { deviceId: "second-laundry", deviceName: "Laundry Upstairs" })),
  "20_non_laundry": () => airConditioner(),
  "21_both_running": () =>
    scenario({
      laundryCyclePhase: 5,
      washerRunningMode: 1,
      remainingTimeHH: 0,
      remainingTimeMM: 48,
      dryerCyclePhase: 3,
      dryerRemainingDryTime: 75,
      washerRemoteCtrValid: true,
      dryerRemoteCtrValid: true,
    }),
};

/** A haismart air conditioner: same platform, no laundry attributes. */
export function airConditioner(): HomeAssistant {
  const id = "haier-ac";
  const at = AT;
  return {
    states: {
      "climate.bedroom_ac": {
        entity_id: "climate.bedroom_ac",
        state: "cool",
        attributes: { temperature: 24 },
        last_changed: at,
        last_updated: at,
      },
      "sensor.bedroom_ac_indoor_temperature": {
        entity_id: "sensor.bedroom_ac_indoor_temperature",
        state: "26",
        attributes: { unit_of_measurement: "°C" },
        last_changed: at,
        last_updated: at,
      },
    },
    entities: {
      "climate.bedroom_ac": { entity_id: "climate.bedroom_ac", device_id: id, platform: "haismart" },
      "sensor.bedroom_ac_indoor_temperature": {
        entity_id: "sensor.bedroom_ac_indoor_temperature",
        device_id: id,
        platform: "haismart",
        translation_key: "indoor_temperature",
      },
    },
    devices: { [id]: { id, name: "Bedroom AC", name_by_user: null } },
    locale: { language: "en", time_format: "12", time_zone: "server" },
    language: "en",
    config: { time_zone: TZ },
    user: { is_admin: true },
    callService: async () => undefined,
  };
}
