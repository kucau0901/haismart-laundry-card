// Demo-only mock of the Home Assistant frontend object: hass.entities / hass.states /
// hass.devices / hass.locale / hass.callService. Nothing here talks to a real Home Assistant.

import snapshot from "../test/fixtures/snapshot_dryer_running_washer_idle.json";
import { buildHass, type MockOptions } from "../src/mock/build-hass";
import type { HomeAssistant } from "../src/types";

const SNAP = snapshot as Record<string, unknown>;
const minutesAgo = (n: number) => new Date(Date.now() - n * 60_000).toISOString();

export interface Scenario {
  id: string;
  title: string;
  note: string;
  build: () => HomeAssistant;
  config?: Record<string, unknown>;
}

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
      const next = buildHass(values, { ...baseOpts, controls: true, callService: hass.callService });
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

const baseOpts: MockOptions = { timeFormat: "12" };

export function scenarios(setHass: (id: string, h: HomeAssistant) => void, getHass: (id: string) => HomeAssistant): Scenario[] {
  return [
    {
      id: "off",
      title: "Machine off",
      note: "Every entity unavailable: the normal idle state.",
      build: () => buildHass(SNAP, { ...baseOpts, controls: true, off: true, at: minutesAgo(42) }),
    },
    {
      id: "snapshot",
      title: "Real snapshot",
      note: "Dryer sensing load (470 min, AI Dry), washer idle with Softener empty; remote off on both drums.",
      build: () => buildHass(SNAP, { ...baseOpts, controls: true }),
    },
    {
      id: "running",
      title: "Both running, remote on",
      note: "Try Pause and Cancel: the mock machine confirms after ~3 s.",
      build: () =>
        buildHass(
          {
            ...SNAP,
            laundryCyclePhase: 9,
            washerRunningMode: 1,
            remainingTimeHH: 0,
            remainingTimeMM: 34,
            dryerCyclePhase: 3,
            dryerRemainingDryTime: 85,
            washerRemoteCtrValid: true,
            dryerRemoteCtrValid: true,
            washerDoorLockStatus: true,
            currentWaterUsed: 38,
            washerCurrentElectricityUsed: 0.4,
          },
          {
            ...baseOpts,
            controls: true,
            callService: liveCallService(
              () => getHass("running"),
              (h) => setHass("running", h),
            ),
          },
        ),
      config: { show_totals: true },
    },
    {
      id: "done",
      title: "Washer finished with a notice",
      note: "Done 12 minutes ago, door still locked, clean-filter reminder.",
      build: () =>
        buildHass(
          { ...SNAP, laundryCyclePhase: 14, washerMessage: 14, remainingTimeHH: 0, remainingTimeMM: 0, washerDoorLockStatus: true, dryerCyclePhase: 0, dryerRunningMode: 2 },
          { ...baseOpts, controls: true, at: minutesAgo(95), changedAt: { laundryCyclePhase: minutesAgo(12) } },
        ),
    },
    {
      id: "fault",
      title: "Fault",
      note: "The fault binary_sensor is on with two named faults.",
      build: () =>
        buildHass(
          { ...SNAP, washerRemoteCtrValid: true, dryerRemoteCtrValid: true },
          { ...baseOpts, controls: true, fault: { on: true, faults: ["Drain pump blocked", "Door lock fault"], fault_codes: ["E21", "E30"] } },
        ),
    },
    {
      id: "refused",
      title: "A refused command",
      note: "Remote flag on, but the integration refuses: press Pause to see the error strip.",
      build: () =>
        buildHass(
          { ...SNAP, dryerRemoteCtrValid: true, washerRemoteCtrValid: true },
          {
            ...baseOpts,
            controls: true,
            callService: async () => {
              await new Promise((r) => setTimeout(r, 600));
              throw {
                code: "home_assistant_error",
                message:
                  "Laundry Centre does not accept that setting: remote control is not enabled for the dryer -- turn it on at the machine's panel first",
              };
            },
          },
        ),
    },
  ];
}
