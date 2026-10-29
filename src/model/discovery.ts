// Discovery: find the haismart laundry device and index its entities by Haier attribute.
// Pure apart from the module-level index cache and its localStorage mirror (§3.3).

import type { EntityRegistryDisplayEntry, HomeAssistant, LaundryCardConfig } from "../types";
import { CONTRACT } from "./contract";

export const PLATFORM = "haismart";
export const PHASE_ATTRS = ["laundryCyclePhase", "dryerCyclePhase"] as const;
export const BUTTON_KEYS = [
  "washer_start",
  "washer_pause",
  "washer_cancel",
  "dryer_start",
  "dryer_pause",
  "dryer_cancel",
] as const;
export type ButtonKey = (typeof BUTTON_KEYS)[number];

const PHASE_SLUGS = ["_laundry_cycle_phase", "_dryer_cycle_phase"];
const DOMAIN_RANK: Record<string, number> = {
  select: 0,
  switch: 1,
  number: 2,
  sensor: 3,
  binary_sensor: 4,
};

export interface DeviceIndex {
  deviceId: string;
  /** Haier attribute -> entity_id. */
  attrs: Record<string, string>;
  buttons: Partial<Record<ButtonKey, string>>;
  fault?: string;
  /** Domain of each drum's programme entity ("select" when controls are on, else "sensor"). */
  programDomain: { washer?: string; dryer?: string };
  /** True when at least one attribute came from live state attributes on this build. */
  live: boolean;
  /** Attributes whose entity was found only through the entity-id slug fallback. */
  slugOnly: string[];
}

export type Resolution =
  | { kind: "loading" }
  | { kind: "none" }
  | { kind: "removed" }
  | { kind: "not_laundry"; deviceId: string; name: string }
  | { kind: "ok"; deviceId: string; candidates: string[] };

const domainOf = (eid: string): string => eid.slice(0, eid.indexOf("."));
const objectIdOf = (eid: string): string => eid.slice(eid.indexOf(".") + 1);

export const slugify = (name: string): string =>
  name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

/** All haismart registry rows of a device. */
export function deviceEntities(hass: HomeAssistant, deviceId: string): EntityRegistryDisplayEntry[] {
  const out: EntityRegistryDisplayEntry[] = [];
  for (const row of Object.values(hass.entities ?? {})) {
    if (row.device_id === deviceId && row.platform === PLATFORM) out.push(row);
  }
  return out;
}

export function isLaundryDevice(hass: HomeAssistant, deviceId: string): boolean {
  const rows = deviceEntities(hass, deviceId);
  if (!rows.length) return false;
  for (const row of rows) {
    const attr = hass.states?.[row.entity_id]?.attributes?.haier_attribute;
    if (attr === "laundryCyclePhase" || attr === "dryerCyclePhase") return true; // (a)
    if (row.translation_key && (BUTTON_KEYS as readonly string[]).includes(row.translation_key))
      return true; // (b)
  }
  if (getCachedIndex(deviceId)) return true; // (c)
  const oid = (eid: string) => objectIdOf(eid);
  return rows.some((r) => PHASE_SLUGS.some((s) => oid(r.entity_id).endsWith(s))); // (d)
}

export function findLaundryDevices(hass: HomeAssistant): string[] {
  return Object.keys(hass.devices ?? {}).filter((id) => isLaundryDevice(hass, id));
}

export function isRegistryLoaded(hass: HomeAssistant | undefined): hass is HomeAssistant {
  return !!hass && !!hass.entities && !!hass.devices && !!hass.states;
}

export function resolveDevice(hass: HomeAssistant | undefined, config: Pick<LaundryCardConfig, "device_id">): Resolution {
  if (!isRegistryLoaded(hass)) return { kind: "loading" };
  const candidates = findLaundryDevices(hass);
  if (config.device_id) {
    if (!hass.devices[config.device_id]) return { kind: "removed" };
    if (!candidates.includes(config.device_id))
      return {
        kind: "not_laundry",
        deviceId: config.device_id,
        name: deviceDisplayName(hass, config.device_id, undefined),
      };
    return { kind: "ok", deviceId: config.device_id, candidates };
  }
  if (!candidates.length) return { kind: "none" };
  return { kind: "ok", deviceId: candidates[0], candidates };
}

export function deviceDisplayName(hass: HomeAssistant, deviceId: string, fallback = "Laundry Centre"): string {
  const d = hass.devices?.[deviceId];
  return d?.name_by_user || d?.name || fallback;
}

// ---------------------------------------------------------------------------------------------
// Index cache (§3.3): attributes vanish while the machine is off, so remember the mapping.

const memCache = new Map<string, DeviceIndex>();
const LS_PREFIX = "haismart-laundry-card:index:v1:";

function lsGet(key: string): string | null {
  try {
    return globalThis.localStorage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}
function lsSet(key: string, value: string): void {
  try {
    globalThis.localStorage?.setItem(key, value);
  } catch {
    /* private mode, quota, blocked storage: the card works without it */
  }
}

export function getCachedIndex(deviceId: string): DeviceIndex | undefined {
  const mem = memCache.get(deviceId);
  if (mem) return mem;
  const raw = lsGet(LS_PREFIX + deviceId);
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as DeviceIndex;
    if (parsed && parsed.deviceId === deviceId && parsed.attrs) {
      memCache.set(deviceId, parsed);
      return parsed;
    }
  } catch {
    /* corrupt entry: ignore */
  }
  return undefined;
}

function storeCachedIndex(index: DeviceIndex): void {
  memCache.set(index.deviceId, index);
  lsSet(LS_PREFIX + index.deviceId, JSON.stringify(index));
}

/** Test hook. */
export function clearIndexCache(): void {
  memCache.clear();
  memo = new WeakMap();
}

// ---------------------------------------------------------------------------------------------
// Index build (§3.2), memoised on hass.entities / hass.devices identity.

type MemoEntry = { devices: unknown; index: DeviceIndex; known: Set<string> };
let memo = new WeakMap<object, Map<string, MemoEntry>>();

/** Slug -> attribute for every bundled contract attribute (last-resort fallback). */
const SLUG_TO_ATTR: Array<[string, string]> = Object.entries(CONTRACT).map(([attr, a]) => [
  "_" + slugify(a.name),
  attr,
]);

export function buildIndex(hass: HomeAssistant, deviceId: string): DeviceIndex {
  const rows = deviceEntities(hass, deviceId);
  let perEntities = memo.get(hass.entities);
  const hit = perEntities?.get(deviceId);
  if (hit && hit.devices === hass.devices) {
    // Rebuild only when an entity of the device that was not indexed now carries an attribute.
    const stale = rows.some((r) => {
      const a = hass.states?.[r.entity_id]?.attributes?.haier_attribute;
      return typeof a === "string" && !hit.known.has(r.entity_id);
    });
    if (!stale) return hit.index;
  }

  const rowIds = new Set(rows.map((r) => r.entity_id));
  const attrs: Record<string, string> = {};
  const known = new Set<string>();
  const buttons: Partial<Record<ButtonKey, string>> = {};
  let fault: string | undefined;
  let live = false;

  for (const row of rows) {
    const eid = row.entity_id;
    const domain = domainOf(eid);
    const st = hass.states?.[eid];
    if (domain === "button") {
      if (row.translation_key && (BUTTON_KEYS as readonly string[]).includes(row.translation_key))
        buttons[row.translation_key as ButtonKey] = eid;
      continue;
    }
    if (domain === "binary_sensor" && row.translation_key === "fault") fault = eid;
    if (!st) continue; // disabled entity
    const attr = st.attributes?.haier_attribute;
    if (typeof attr !== "string") continue;
    known.add(eid);
    // Composite entities (several sources, no single published value) are ignored.
    if (Array.isArray(st.attributes.haier_attributes) && !("haier_value" in st.attributes)) continue;
    live = true;
    const prev = attrs[attr];
    if (!prev || (DOMAIN_RANK[domain] ?? 9) < (DOMAIN_RANK[domainOf(prev)] ?? 9)) attrs[attr] = eid;
  }
  if (!fault) fault = rows.find((r) => domainOf(r.entity_id) === "binary_sensor" && r.entity_id.endsWith("_fault"))?.entity_id;

  // Cache: fill attributes the live states could not name (machine off), dropping stale rows.
  const cached = getCachedIndex(deviceId);
  if (cached) {
    for (const [attr, eid] of Object.entries(cached.attrs)) {
      if (!attrs[attr] && rowIds.has(eid)) attrs[attr] = eid;
    }
  }

  // Slug fallback, only for attributes still unknown.
  const slugOnly: string[] = [];
  for (const row of rows) {
    const eid = row.entity_id;
    const domain = domainOf(eid);
    if (domain === "button") continue;
    const oid = objectIdOf(eid);
    for (const [slug, attr] of SLUG_TO_ATTR) {
      if (attrs[attr] || !oid.endsWith(slug)) continue;
      attrs[attr] = eid;
      slugOnly.push(attr);
    }
  }

  const programDomain = {
    washer: attrs.washerUnifiedProgramSettings ? domainOf(attrs.washerUnifiedProgramSettings) : undefined,
    dryer: attrs.dryerUnifiedProgramSettings ? domainOf(attrs.dryerUnifiedProgramSettings) : undefined,
  };

  const index: DeviceIndex = { deviceId, attrs, buttons, fault, programDomain, live, slugOnly };
  if (live) {
    // Live attributes always win; refresh the cache with what is confirmed (not slug guesses).
    const confirmed: Record<string, string> = {};
    for (const [attr, eid] of Object.entries(attrs)) if (!slugOnly.includes(attr)) confirmed[attr] = eid;
    storeCachedIndex({ ...index, attrs: confirmed, slugOnly: [] });
  }
  if (!perEntities) {
    perEntities = new Map();
    memo.set(hass.entities, perEntities);
  }
  perEntities.set(deviceId, { devices: hass.devices, index, known });
  return index;
}

/** Every entity id the card renders from: used by shouldUpdate. */
export function trackedEntityIds(index: DeviceIndex, hass: HomeAssistant): string[] {
  const ids = new Set<string>(Object.values(index.attrs));
  for (const b of Object.values(index.buttons)) if (b) ids.add(b);
  if (index.fault) ids.add(index.fault);
  // When nothing is indexed, availability falls back to the whole device (§3.5).
  if (!index.attrs.laundryCyclePhase && !index.attrs.dryerCyclePhase)
    for (const r of deviceEntities(hass, index.deviceId)) ids.add(r.entity_id);
  return [...ids];
}
