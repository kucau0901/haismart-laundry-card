// Builds a Home Assistant-shaped object from decoded Haier attribute values, the way the haismart
// integration would publish them. Used by the card-picker preview (bundled), the demo page and
// the tests. Never used against a real Home Assistant.

import type {
  DeviceRegistryEntry,
  EntityRegistryDisplayEntry,
  HassEntity,
  HomeAssistant,
} from "../types";
import { CONTRACT } from "../model/contract";
import { BUTTON_KEYS, slugify } from "../model/discovery";

export interface MockOptions {
  deviceId?: string;
  deviceName?: string;
  /** Controls enabled in the integration options: button entities exist, programmes are selects. */
  controls?: boolean;
  /** Machine off: every entity unavailable and attributes absent. */
  off?: boolean;
  /** Older component: no haier_value attribute. */
  legacy?: boolean;
  /** ISO time used for last_changed/last_updated (default: now). */
  at?: string;
  /** Per-attribute last_changed overrides. */
  changedAt?: Record<string, string>;
  /** Per-attribute state overrides (e.g. "unknown", "unavailable", or a label). */
  stateOverride?: Record<string, string>;
  fault?: { on: boolean; faults?: string[]; fault_codes?: Array<string | number>; error_code?: number | null };
  language?: string;
  timeFormat?: "language" | "system" | "12" | "24";
  timeZone?: string;
  isAdmin?: boolean;
  callService?: HomeAssistant["callService"];
}

export const MOCK_DEVICE_ID = "mock-laundry-centre";

function stateFor(attr: string, value: unknown): string {
  const c = CONTRACT[attr];
  if (typeof value === "boolean") return value ? "on" : "off";
  if (c?.options && typeof value === "number") return c.options[String(value)] ?? String(value);
  return String(value);
}

export function entityIdFor(attr: string, deviceName: string, controls: boolean): string {
  const c = CONTRACT[attr];
  let domain: string = c?.control ?? "sensor";
  if (!controls && (domain === "select" || domain === "number" || domain === "switch")) {
    // Without controls, writable attributes are published read-only.
    domain = domain === "switch" ? "binary_sensor" : "sensor";
  }
  return `${domain}.${slugify(deviceName)}_${slugify(c?.name ?? attr)}`;
}

export function buildHass(values: Record<string, unknown>, opts: MockOptions = {}): HomeAssistant {
  const deviceId = opts.deviceId ?? MOCK_DEVICE_ID;
  const deviceName = opts.deviceName ?? "Laundry Centre";
  const at = opts.at ?? new Date().toISOString();
  const controls = opts.controls ?? false;
  const states: Record<string, HassEntity> = {};
  const entities: Record<string, EntityRegistryDisplayEntry> = {};

  const add = (eid: string, st: Omit<HassEntity, "entity_id">, row: Partial<EntityRegistryDisplayEntry> = {}) => {
    states[eid] = { entity_id: eid, ...st };
    entities[eid] = { entity_id: eid, device_id: deviceId, platform: "haismart", ...row };
  };

  for (const [attr, value] of Object.entries(values)) {
    const c = CONTRACT[attr];
    if (!c) continue; // only the attributes the card reads are modelled
    const eid = entityIdFor(attr, deviceName, controls);
    const changed = opts.changedAt?.[attr] ?? at;
    const override = opts.stateOverride?.[attr];
    const unavailable = opts.off || override === "unavailable" || override === "unknown";
    const attributes: Record<string, unknown> = unavailable
      ? {}
      : {
          haier_attribute: attr,
          ...(opts.legacy ? {} : { haier_value: value }),
          friendly_name: `${deviceName} ${c.name}`,
          ...(c.unit ? { unit_of_measurement: c.unit } : {}),
        };
    add(eid, {
      state: opts.off ? "unavailable" : (override ?? stateFor(attr, value)),
      attributes,
      last_changed: changed,
      last_updated: changed,
    });
  }

  if (controls) {
    for (const key of BUTTON_KEYS) {
      const eid = `button.${slugify(deviceName)}_${key}`;
      add(
        eid,
        { state: opts.off ? "unavailable" : "unknown", attributes: {}, last_changed: at, last_updated: at },
        { translation_key: key },
      );
    }
  }

  const faultEid = `binary_sensor.${slugify(deviceName)}_fault`;
  const f = opts.fault;
  add(
    faultEid,
    {
      state: opts.off ? "unavailable" : f?.on ? "on" : "off",
      attributes:
        opts.off || !f
          ? { device_class: "problem" }
          : {
              device_class: "problem",
              faults: f.faults ?? [],
              fault_codes: f.fault_codes ?? [],
              error_code: f.error_code ?? null,
            },
      last_changed: at,
      last_updated: at,
    },
    { translation_key: "fault" },
  );
  add(
    `binary_sensor.${slugify(deviceName)}_cloud_connection`,
    { state: "on", attributes: {}, last_changed: at, last_updated: at },
    { translation_key: "cloud_connection", entity_category: "diagnostic" },
  );

  const devices: Record<string, DeviceRegistryEntry> = {
    [deviceId]: { id: deviceId, name: deviceName, name_by_user: null, manufacturer: "Haier", model: "HWD140-BD14LCGNU1" },
  };

  return {
    states,
    entities,
    devices,
    locale: {
      language: opts.language ?? "en",
      time_format: opts.timeFormat ?? "12",
      time_zone: opts.timeZone ? "server" : "local",
    },
    language: opts.language ?? "en",
    config: { time_zone: opts.timeZone ?? "Asia/Kuala_Lumpur" },
    user: { is_admin: opts.isAdmin ?? true },
    callService: opts.callService ?? (async () => undefined),
  };
}

/** Merge a second device into a hass object (two-device and non-laundry fixtures). */
export function mergeHass(a: HomeAssistant, b: HomeAssistant): HomeAssistant {
  return {
    ...a,
    states: { ...a.states, ...b.states },
    entities: { ...a.entities, ...b.entities },
    devices: { ...a.devices, ...b.devices },
  };
}
