// Demo-only mock of the Home Assistant frontend object: hass.entities / hass.states /
// hass.devices / hass.locale / hass.callService. Nothing here talks to a real Home Assistant.
// Every fixture in test/fixtures/scenarios.ts is shown, plus remote-on variants of the states
// whose controls differ, and two interactive scenarios.

import { SCENARIOS, scenario, washingScenario } from "../test/fixtures/scenarios";
import { buildHass } from "../src/mock/build-hass";
import type { HomeAssistant } from "../src/types";

export interface Scenario {
  id: string;
  title: string;
  note: string;
  build: () => HomeAssistant;
  config?: Record<string, unknown>;
}

const NOTES: Record<string, string> = {
  "01_real_snapshot": "Dryer sensing load (470 min, AI Dry), washer idle with Softener empty; remote off on both drums.",
  "02_machine_off": "Every entity unavailable: the normal idle state.",
  "04_one_drum_stale": "The washer's phase is unknown while the dryer reports.",
  "05_paused": "Dryer paused during drying, remote off.",
  "06_delayed_dryer": "Dryer delayed start, 2 h wait, remote off.",
  "07_delayed_washer": "Washer delayed start, remote off.",
  "08_anti_crease": "Dryer anti-crease tumbling, 25 min left.",
  "09_washer_tumbling": "Washer tumbling after wash.",
  "10_done_msg14": "Washer finished 12 minutes ago, door still locked, clean-filter reminder.",
  "11_done_msg8": "Washer finished, drum too hot to open.",
  "12_fault": "The fault binary_sensor is on with two named faults.",
  "13_legacy_labels": "Older component: labels only, no haier_value.",
  "14_legacy_unmapped": "Older component with a label the card cannot map.",
  "15_unknown_phase": "Dryer phase 30 is not in the contract: generic running.",
  "16_no_buttons": "Controls are off in the integration options: status only.",
  "17_remote_on": "Remote on: programme chip, duration and Start.",
  "18_message_18": "Remote turned off by opening the washer door.",
  "19_two_devices": "Two laundry centres: the first is used.",
  "20_non_laundry": "Only an air conditioner: setup alert.",
  "21_both_running": "Both drums running, remote on.",
};

const remoteOn = (o: Record<string, unknown>) =>
  scenario({ washerRemoteCtrValid: true, dryerRemoteCtrValid: true, ...o });

const EXTRA: Array<[string, string, () => HomeAssistant]> = [
  ["05r_paused_remote_on", "Paused with remote on: Resume and Cancel.", () =>
    remoteOn({ dryerCyclePhase: 3, dryerRunningMode: 2, dryerRemainingDryTime: 95 })],
  ["06r_delayed_dryer_remote_on", "Scheduled dryer with remote on: the only action is Cancel scheduled cycle.", () =>
    remoteOn({ dryerCyclePhase: 1, dryerRunningMode: 1, dryerRemainingResnTime: 120, dryerRemainingDryTime: 90 })],
  ["08r_anti_crease_remote_on", "Anti-crease with remote on: the only action is Stop tumbling.", () =>
    remoteOn({ dryerCyclePhase: 7, remainingAntiCreaseTime: 25, dryerRemainingDryTime: 0 })],
  ["22_no_programme", "Remote on, no programme selected: the hint shows.", () =>
    remoteOn({ washerUnifiedProgramSettings: 0 })],
  ["23_ready_to_start", "Both idle, remote on, doors closed: the settings are pills you can change before Start.", () =>
    washingScenario({
      laundryCyclePhase: 0,
      washerRunningMode: 2,
      washerDoorLockStatus: false,
      dryerDoorStatus: false,
      washerRemoteCtrValid: true,
      dryerRemoteCtrValid: true,
    })],
];

/** A callService that behaves like the haismart integration with remote control on. */
function liveCallService(getHass: () => HomeAssistant, setHass: (h: HomeAssistant) => void): HomeAssistant["callService"] {
  return async (domain, service, data) => {
    console.info("[demo] callService", domain, service, data);
    await new Promise((r) => setTimeout(r, 700));
    const eid = String(data?.entity_id ?? "");
    const hass = getHass();
    // Simulate the machine reporting the change a moment later.
    setTimeout(() => {
      const values = { ...currentValues(hass) };
      const washer = eid.includes("washer");
      if (eid.endsWith("_pause")) values[washer ? "washerRunningMode" : "dryerRunningMode"] = 2;
      if (eid.endsWith("_start")) values[washer ? "washerRunningMode" : "dryerRunningMode"] = 1;
      if (eid.endsWith("_cancel")) values[washer ? "laundryCyclePhase" : "dryerCyclePhase"] = 0;
      const next = buildHass(values, { timeFormat: "12", controls: true, callService: hass.callService });
      next.entities = hass.entities;
      next.devices = hass.devices;
      setHass(next);
    }, 2500);
    return undefined;
  };
}

function currentValues(hass: HomeAssistant): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const s of Object.values(hass.states)) {
    const a = s.attributes?.haier_attribute;
    if (typeof a === "string" && "haier_value" in s.attributes) out[a] = s.attributes.haier_value;
  }
  return out;
}

export function scenarios(setHass: (id: string, h: HomeAssistant) => void, getHass: (id: string) => HomeAssistant): Scenario[] {
  const list: Scenario[] = Object.entries(SCENARIOS).map(([id, build]) => ({
    id,
    title: id,
    note: NOTES[id] ?? "",
    build,
  }));
  for (const [id, note, build] of EXTRA) list.push({ id, title: id, note, build });
  list.push(
    {
      id: "live_running",
      title: "Interactive: both running, remote on",
      note: "Try Pause and Cancel: the mock machine confirms after about 3 s.",
      build: () => {
        const h = SCENARIOS["21_both_running"]();
        h.callService = liveCallService(
          () => getHass("live_running"),
          (n) => setHass("live_running", n),
        );
        return h;
      },
      config: { show_totals: true },
    },
    {
      id: "refused",
      title: "Interactive: a refused command",
      note: "Remote flag on, but the integration refuses: press Pause to see the error strip.",
      build: () => {
        const h = SCENARIOS["21_both_running"]();
        h.callService = async () => {
          await new Promise((r) => setTimeout(r, 600));
          throw {
            code: "home_assistant_error",
            message:
              "Laundry Centre does not accept that setting: remote control was switched off for the dryer; nothing was sent",
            translation_domain: "haismart",
            translation_key: "control_rejected",
            translation_placeholders: { error: "remote control was switched off for the dryer; nothing was sent" },
          };
        };
        return h;
      },
    },
  );
  return list;
}
