// Pure derivation: hass + index -> LaundryModel (§3.4, §3.5, §4, §7, §6.2).
// No DOM, no strings for display (those live in src/view.ts). The only state is the optional
// per-drum DrumMemory the caller passes in (finish-time hysteresis and "dry phase seen").

import type { DrumKey, HassEntity, HomeAssistant } from "../types";
import { CONTRACT } from "./contract";
import { type ButtonKey, type DeviceIndex, deviceEntities } from "./discovery";

export const MIN = 60_000;

export type DrumStatus =
  | "off"
  | "stale"
  | "idle"
  | "delayed"
  | "estimating"
  | "running"
  | "paused"
  | "done"
  | "tumbling";

export type DrumSub = "maintenance" | "care" | undefined;
export type Command = "start" | "resume" | "pause" | "cancel" | "cancel_scheduled" | "stop";
export type StepKey = "wash" | "rinse" | "spin" | "dry" | "sense" | "cool" | "care";
export type StepState = "complete" | "current" | "upcoming";
export type NoticeCategory = "blocking" | "supply" | "maintenance" | "info" | "unknown";

export interface StepView {
  key: StepKey;
  state: StepState;
}

export interface Notice {
  /** i18n key ("notice.w.4") or undefined for an unknown value, which shows `text`. */
  key?: string;
  text?: string;
  value: number;
  category: NoticeCategory;
  icon: string;
  entity?: string;
  source: "message" | "supply";
}

export interface ProgrammeInfo {
  value?: number;
  /** As the entity provides it (English); falls back to the contract label. */
  label?: string;
  entity?: string;
  domain?: string;
  lastChanged?: number;
}

export interface DrumModel {
  key: DrumKey;
  status: DrumStatus;
  sub: DrumSub;
  /** Unmapped/legacy or unknown phase: no stepper, no estimate wording. */
  generic: boolean;
  phase?: number;
  /** Phase value present in the drum's option table. */
  phaseKnown: boolean;
  mode?: number;
  phaseEntity?: string;
  /** Minutes, as published. */
  remaining?: number;
  /** Minutes the dryer's delayed start still has to wait. */
  resn?: number;
  antiCrease?: number;
  /** last_updated of the remaining-time entity (ms). */
  anchor?: number;
  /** Rounded finish time shown as a clock. */
  finishAt?: number;
  /** Unrounded (hysteresis-filtered) finish time; countdowns use this. */
  finishRaw?: number;
  startsAt?: number;
  approximate: boolean;
  /** Minutes the idle drum's selected programme takes. */
  idleDuration?: number;
  programme: ProgrammeInfo;
  message?: number;
  messageEntity?: string;
  remote?: boolean;
  doorOpen?: boolean;
  doorLocked?: boolean;
  power?: boolean;
  notices: Notice[];
  /** Washer 8/9 while done-like: replaces the support line. */
  blockingNotice?: Notice;
  steps: StepView[] | null;
  finishedAt?: number;
  /** Button entity ids that exist and are not unavailable. */
  buttons: { start?: string; pause?: string; cancel?: string };
  isActive: boolean;
  isDoneLike: boolean;
}

export interface FaultInfo {
  on: boolean;
  entity?: string;
  faults: string[];
  codes?: string;
}

export interface TotalValue {
  value?: number;
  unit?: string;
  entity?: string;
}

export interface LaundryModel {
  deviceId: string;
  machineOff: boolean;
  offReason?: "unavailable" | "power";
  offSince?: number;
  washer: DrumModel;
  dryer: DrumModel;
  fault: FaultInfo;
  childLock?: boolean;
  /** Any laundry button entity exists (controls are enabled in the integration). */
  controlsExist: boolean;
  legacy: boolean;
  legacyUnmapped: boolean;
  totals: {
    water: TotalValue;
    energy: TotalValue;
    cycles: TotalValue;
    cycleWater: TotalValue;
    cycleEnergy: TotalValue;
  };
  now: number;
}

export interface DrumMemory {
  finishRaw?: number;
  status?: DrumStatus;
  seenDry?: boolean;
}

export type ModelMemory = Partial<Record<DrumKey, DrumMemory>>;

// ---------------------------------------------------------------------------------------------
// Static tables

const W_PROG_WASH_DRY = new Set([65, 69, 88, 91]);
const W_PROG_DRY_ONLY = new Set([29, 34, 43, 44]);
const W_DRY_PHASES = new Set([12, 13, 17, 25]);

const W_STEP: Record<number, StepKey> = {};
for (const p of [21, 22, 23, 24, 3, 4, 5, 6]) W_STEP[p] = "wash";
for (const p of [7, 8, 9, 10]) W_STEP[p] = "rinse";
W_STEP[11] = "spin";
for (const p of [12, 13, 17, 25]) W_STEP[p] = "dry";
W_STEP[20] = "care";

const D_STEP: Record<number, StepKey> = { 8: "sense", 10: "sense", 2: "dry", 3: "dry", 4: "dry", 5: "cool", 9: "care" };

interface DrumAttrs {
  phase: string;
  mode: string;
  programme: string;
  message: string;
  remote: string;
  door: string;
  doorLock: string;
  power: string;
  remaining: string[];
  buttons: Record<"start" | "pause" | "cancel", ButtonKey>;
}

export const DRUM_ATTRS: Record<DrumKey, DrumAttrs> = {
  washer: {
    phase: "laundryCyclePhase",
    mode: "washerRunningMode",
    programme: "washerUnifiedProgramSettings",
    message: "washerMessage",
    remote: "washerRemoteCtrValid",
    door: "washerDoorStatus",
    doorLock: "washerDoorLockStatus",
    power: "washerPowerStatus",
    remaining: ["remainingTimeHH", "remainingTimeMM"],
    buttons: { start: "washer_start", pause: "washer_pause", cancel: "washer_cancel" },
  },
  dryer: {
    phase: "dryerCyclePhase",
    mode: "dryerRunningMode",
    programme: "dryerUnifiedProgramSettings",
    message: "dryerMessage",
    remote: "dryerRemoteCtrValid",
    door: "dryerDoorStatus",
    doorLock: "dryerDoorLockStatus",
    power: "dryerPowerStatus",
    remaining: ["dryerRemainingDryTime", "dryerRemainingResnTime", "remainingAntiCreaseTime"],
    buttons: { start: "dryer_start", pause: "dryer_pause", cancel: "dryer_cancel" },
  },
};

/** Attributes whose entities "belong" to a drum (for the restart heuristic, §4.5). */
const DRUM_ENTITY_ATTRS: Record<DrumKey, string[]> = {
  washer: Object.values(DRUM_ATTRS.washer).flat().filter((v): v is string => typeof v === "string"),
  dryer: Object.values(DRUM_ATTRS.dryer).flat().filter((v): v is string => typeof v === "string"),
};

interface NoticeDef {
  category: NoticeCategory | "absorbed" | "hidden";
  icon?: string;
}
const INFO_ICON = "mdi:information-outline";
const W_NOTICES: Record<number, NoticeDef> = {
  1: { category: "absorbed" },
  2: { category: "absorbed" },
  6: { category: "blocking", icon: "mdi:tray-alert" },
  7: { category: "blocking", icon: "mdi:spoon-sugar" },
  8: { category: "blocking", icon: "mdi:thermometer-alert" },
  9: { category: "blocking", icon: "mdi:waves-arrow-up" },
  3: { category: "supply", icon: "mdi:spray-bottle" },
  4: { category: "supply", icon: "mdi:bottle-tonic-outline" },
  11: { category: "supply", icon: "mdi:bottle-tonic-plus-outline" },
  13: { category: "supply", icon: "mdi:bottle-tonic-outline" },
  14: { category: "maintenance", icon: "mdi:air-filter" },
  15: { category: "maintenance", icon: "mdi:air-filter" },
  17: { category: "maintenance", icon: "mdi:washing-machine-alert" },
  19: { category: "maintenance", icon: "mdi:air-filter" },
  5: { category: "info", icon: INFO_ICON },
  10: { category: "info", icon: "mdi:chart-bubble" },
  12: { category: "info", icon: INFO_ICON },
  20: { category: "info", icon: INFO_ICON },
  21: { category: "info", icon: INFO_ICON },
  22: { category: "info", icon: INFO_ICON },
  18: { category: "hidden" },
};
const D_NOTICES: Record<number, NoticeDef> = {
  2: { category: "absorbed" },
  3: { category: "maintenance", icon: "mdi:air-filter" },
  4: { category: "maintenance", icon: "mdi:cup-water" },
  1: { category: "info", icon: "mdi:iron-outline" },
  5: { category: "info", icon: "mdi:shield-check-outline" },
  6: { category: "hidden" },
  7: { category: "hidden" },
};
const NOTICE_ORDER: NoticeCategory[] = ["blocking", "supply", "maintenance", "info", "unknown"];

// ---------------------------------------------------------------------------------------------
// Value reader (§3.4)

export interface Reading {
  value: unknown;
  state?: string;
  entity?: HassEntity;
  eid?: string;
  /** Value came from the legacy label fallback. */
  fromLabel: boolean;
}

const UNAVAILABLE = new Set(["unavailable", "unknown"]);
const domainOf = (eid: string) => eid.slice(0, eid.indexOf("."));

export class Reader {
  legacy = false;
  legacyUnmapped = false;
  constructor(
    private readonly hass: HomeAssistant,
    private readonly index: DeviceIndex,
  ) {}

  read(attr: string): Reading {
    const eid = this.index.attrs[attr];
    const entity = eid ? this.hass.states?.[eid] : undefined;
    if (!entity) return { value: undefined, fromLabel: false, eid };
    const base = { state: entity.state, entity, eid };
    if (UNAVAILABLE.has(entity.state)) return { ...base, value: undefined, fromLabel: false };
    const attrs = entity.attributes ?? {};
    if ("haier_value" in attrs) {
      const v = attrs.haier_value;
      return { ...base, value: v === null ? undefined : v, fromLabel: false };
    }
    this.legacy = true;
    const v = legacyValue(attr, eid!, entity.state);
    if (v === undefined) this.legacyUnmapped = true;
    return { ...base, value: v, fromLabel: v !== undefined };
  }

  num(attr: string): number | undefined {
    const v = this.read(attr).value;
    return typeof v === "number" && Number.isFinite(v) ? v : typeof v === "boolean" ? Number(v) : undefined;
  }

  bool(attr: string): boolean | undefined {
    const v = this.read(attr).value;
    return typeof v === "boolean" ? v : typeof v === "number" ? v !== 0 : undefined;
  }
}

/** Reverse-map a state label through that attribute's own option table. */
export function legacyValue(attr: string, eid: string, state: string): unknown {
  const domain = domainOf(eid);
  const s = state.trim().toLowerCase();
  if (domain === "binary_sensor" || domain === "switch") {
    if (s === "on") return true;
    if (s === "off") return false;
    return undefined;
  }
  const options = CONTRACT[attr]?.options;
  if (options) {
    for (const [k, label] of Object.entries(options)) if (label.trim().toLowerCase() === s) return Number(k);
    return undefined;
  }
  const n = parseFloat(state);
  return Number.isFinite(n) ? n : undefined;
}

const ts = (s: string | undefined): number | undefined => {
  if (!s) return undefined;
  const v = Date.parse(s);
  return Number.isFinite(v) ? v : undefined;
};

// ---------------------------------------------------------------------------------------------
// Steps (§4.4)

export function washerStepOf(phase: number): StepKey | undefined {
  return W_STEP[phase];
}
export function dryerStepOf(phase: number): StepKey | undefined {
  return D_STEP[phase];
}

function computeSteps(d: DrumModel, hasDry: boolean): StepView[] | null {
  if (d.generic || d.sub === "maintenance") return null;
  const done = d.isDoneLike;
  if (!done && d.status !== "running" && d.status !== "estimating" && d.status !== "paused") return null;
  let keys: StepKey[];
  let current: StepKey | undefined;
  if (d.key === "washer") {
    keys = W_PROG_DRY_ONLY.has(d.programme.value ?? -1)
      ? ["dry"]
      : hasDry
        ? ["wash", "rinse", "spin", "dry"]
        : ["wash", "rinse", "spin"];
    if (d.phase === 20) keys = [...keys, "care"];
    current = d.status === "estimating" ? undefined : washerStepOf(d.phase ?? -1);
  } else {
    keys = ["sense", "dry", "cool"];
    if (d.phase === 9) keys = [...keys, "care"];
    current = d.status === "estimating" ? "sense" : dryerStepOf(d.phase ?? -1);
  }
  if (done) return keys.map((key) => ({ key, state: "complete" }));
  const ci = current ? keys.indexOf(current) : -1;
  return keys.map((key, i) => ({
    key,
    state: ci < 0 ? "upcoming" : i < ci ? "complete" : i === ci ? "current" : "upcoming",
  }));
}

// ---------------------------------------------------------------------------------------------
// Derivation

export interface DeriveOptions {
  now?: number;
  memory?: ModelMemory;
}

export function derive(hass: HomeAssistant, index: DeviceIndex, opts: DeriveOptions = {}): LaundryModel {
  const now = opts.now ?? Date.now();
  const memory = opts.memory ?? {};
  const r = new Reader(hass, index);

  // --- availability (§3.5)
  const phaseW = r.read("laundryCyclePhase");
  const phaseD = r.read("dryerCyclePhase");
  const isUnavail = (rd: Reading) => !rd.entity || rd.entity.state === "unavailable";
  let machineOff = false;
  let offReason: LaundryModel["offReason"];
  let offSince: number | undefined;
  if (phaseW.entity || phaseD.entity) {
    machineOff = isUnavail(phaseW) && isUnavail(phaseD);
    if (machineOff)
      offSince = maxTime([phaseW.entity?.last_changed, phaseD.entity?.last_changed]);
  } else {
    const checked = deviceEntities(hass, index.deviceId)
      .filter(
        (row) =>
          row.entity_category !== "diagnostic" &&
          row.translation_key !== "cloud_connection" &&
          domainOf(row.entity_id) !== "button",
      )
      .map((row) => hass.states?.[row.entity_id])
      .filter((s): s is HassEntity => !!s);
    machineOff = checked.every((s) => s.state === "unavailable");
    if (machineOff) offSince = maxTime(checked.map((s) => s.last_changed));
  }
  if (machineOff) offReason = "unavailable";
  else if (r.bool("onOffStatus") === false) {
    machineOff = true;
    offReason = "power";
    offSince = maxTime([r.read("onOffStatus").entity?.last_changed]);
  }

  // --- fault
  const faultEntity = index.fault ? hass.states?.[index.fault] : undefined;
  const fault: FaultInfo = { on: false, faults: [], entity: index.fault };
  if (faultEntity && faultEntity.state === "on") {
    fault.on = true;
    const fa = faultEntity.attributes ?? {};
    fault.faults = Array.isArray(fa.faults) ? fa.faults.map((f) => String(f)) : [];
    const codes = Array.isArray(fa.fault_codes) ? fa.fault_codes.map((c) => String(c)).filter(Boolean) : [];
    if (codes.length) fault.codes = codes.join(", ");
    else if (fa.error_code !== null && fa.error_code !== undefined && fa.error_code !== 0 && fa.error_code !== "0")
      fault.codes = String(fa.error_code);
  }

  const supply = {
    detergent: r.read("remainingDetergentStatus"),
    softener: r.read("remainingSoftenerStatus"),
  };
  const washerDryStatus = r.bool("washerDryStatus");
  const laundryCycleStatus = r.bool("laundryCycleStatus");

  const drum = (key: DrumKey, phaseR: Reading, otherPhase: Reading): DrumModel => {
    const A = DRUM_ATTRS[key];
    const mem = (memory[key] ??= {});
    const power = r.bool(A.power);
    const mode = r.num(A.mode);
    const remote = r.bool(A.remote);
    const doorOpen = r.bool(A.door);
    const doorLocked = r.bool(A.doorLock);
    const options = CONTRACT[A.phase]?.options ?? {};

    // remaining time and its anchor
    let remaining: number | undefined;
    let anchor: number | undefined;
    let resn: number | undefined;
    let antiCrease: number | undefined;
    let idleDuration: number | undefined;
    if (key === "washer") {
      const hh = r.read("remainingTimeHH");
      const mm = r.read("remainingTimeMM");
      if (typeof hh.value === "number" && typeof mm.value === "number") {
        remaining = hh.value * 60 + mm.value;
        anchor = maxTime([hh.entity?.last_updated, mm.entity?.last_updated]);
      }
    } else {
      const rd = r.read("dryerRemainingDryTime");
      if (typeof rd.value === "number") {
        remaining = rd.value;
        anchor = ts(rd.entity?.last_updated);
      }
      resn = r.num("dryerRemainingResnTime");
      antiCrease = r.num("remainingAntiCreaseTime");
    }
    idleDuration = remaining && remaining > 0 ? remaining : undefined;

    // programme
    const pr = r.read(A.programme);
    const pValue = typeof pr.value === "number" ? pr.value : undefined;
    const progOptions = CONTRACT[A.programme]?.options ?? {};
    const programme: ProgrammeInfo = {
      value: pValue,
      label:
        pValue === undefined
          ? undefined
          : pr.entity && !UNAVAILABLE.has(pr.entity.state) && "haier_value" in (pr.entity.attributes ?? {})
            ? pr.entity.state
            : (progOptions[String(pValue)] ?? pr.entity?.state),
      entity: pr.eid,
      domain: pr.eid ? domainOf(pr.eid) : undefined,
      lastChanged: ts(pr.entity?.last_changed),
    };

    // status (§4.2)
    const p = typeof phaseR.value === "number" ? phaseR.value : undefined;
    const pState = phaseR.entity?.state;
    const otherAvailable = !!otherPhase.entity && !UNAVAILABLE.has(otherPhase.entity.state);
    let status: DrumStatus;
    let sub: DrumSub;
    let generic = false;
    const phaseKnown = p !== undefined && String(p) in options;
    if (machineOff || power === false) status = "off";
    else if (pState === "unknown" || (pState === "unavailable" && otherAvailable) || !phaseR.entity)
      status = "stale";
    else if (p === undefined) {
      generic = true;
      status = mode === 1 || (key === "washer" && laundryCycleStatus === true) ? "running" : "idle";
    } else if (p === 0) status = "idle";
    else if ((key === "washer" && p === 15) || (key === "dryer" && p === 1)) status = "delayed";
    else if ((key === "washer" && (p === 14 || p === 18 || p === 19)) || (key === "dryer" && p === 6))
      status = "done";
    else if ((key === "dryer" && p === 7) || (key === "washer" && p === 16)) status = "tumbling";
    else if (!phaseKnown) {
      generic = true;
      status = "running";
    } else if (mode === 2) status = "paused";
    else if ((key === "washer" && (p === 1 || p === 2 || p === 26)) || (key === "dryer" && (p === 8 || p === 10)))
      status = "estimating";
    else status = "running";
    if (!generic && (status === "running" || status === "paused" || status === "estimating")) {
      if (key === "dryer" && p === 11) sub = "maintenance";
      else if ((key === "washer" && p === 20) || (key === "dryer" && p === 9)) sub = "care";
    }

    const isActive = status === "running" || status === "estimating" || status === "paused";
    const isDoneLike = status === "done" || status === "tumbling";

    // dry phase memory (§4.4)
    if (key === "washer") {
      if (p === 0) mem.seenDry = false;
      else if (p !== undefined && W_DRY_PHASES.has(p)) mem.seenDry = true;
    }
    const hasDry =
      key === "washer" &&
      (W_PROG_WASH_DRY.has(pValue ?? -1) || washerDryStatus === true || mem.seenDry === true);

    // time (§4.5)
    let raw: number | undefined;
    let startsAt: number | undefined;
    let approximate = status === "estimating" || (phaseR.fromLabel && r.legacy);
    if ((status === "running" || status === "estimating") && remaining !== undefined && anchor !== undefined)
      raw = anchor + remaining * MIN;
    let total = remaining ?? 0;
    if (status === "delayed") {
      if (key === "washer") approximate = true;
      else if (resn !== undefined && resn > 0 && anchor !== undefined) {
        total = resn + (remaining ?? 0);
        raw = anchor + total * MIN;
        startsAt = anchor + resn * MIN;
        approximate = true;
      }
    }
    if (raw !== undefined && mem.finishRaw !== undefined && mem.status === status && Math.abs(raw - mem.finishRaw) < 2 * MIN)
      raw = mem.finishRaw;
    mem.finishRaw = raw;
    mem.status = status;
    const finishAt = raw === undefined ? undefined : total > 120 ? roundTo5(raw) : raw;

    // finished at (§4.5)
    let finishedAt: number | undefined;
    if (isDoneLike && phaseR.entity) {
      const lc = ts(phaseR.entity.last_changed);
      const others = DRUM_ENTITY_ATTRS[key]
        .map((a) => index.attrs[a])
        .map((eid) => (eid ? hass.states?.[eid] : undefined))
        .filter((s): s is HassEntity => !!s && !UNAVAILABLE.has(s.state))
        .map((s) => ts(s.last_changed))
        .filter((v): v is number => v !== undefined);
      const earliest = others.length ? Math.min(...others) : lc;
      if (lc !== undefined && earliest !== undefined && lc - earliest >= 5000 && now - lc <= 24 * 60 * MIN)
        finishedAt = lc;
    }

    // notices (§7)
    const msg = r.read(A.message);
    const message = typeof msg.value === "number" ? msg.value : undefined;
    const notices: Notice[] = [];
    let blockingNotice: Notice | undefined;
    if (message !== undefined && message !== 0) {
      const def = (key === "washer" ? W_NOTICES : D_NOTICES)[message];
      if (!def)
        notices.push({
          value: message,
          text: msg.entity?.state,
          category: "unknown",
          icon: INFO_ICON,
          entity: msg.eid,
          source: "message",
        });
      else if (def.category !== "absorbed" && def.category !== "hidden") {
        const n: Notice = {
          key: `notice.${key === "washer" ? "w" : "d"}.${message}`,
          value: message,
          category: def.category,
          icon: def.icon ?? INFO_ICON,
          entity: msg.eid,
          source: "message",
        };
        if (key === "washer" && (message === 8 || message === 9) && isDoneLike) blockingNotice = n;
        else notices.push(n);
      }
    }
    if (key === "washer") {
      if (supply.detergent.value === 2 && message !== 3 && message !== 13)
        notices.push({
          key: "notice.w.3",
          value: 3,
          category: "supply",
          icon: W_NOTICES[3].icon!,
          entity: supply.detergent.eid,
          source: "supply",
        });
      if (supply.softener.value === 2 && message !== 4 && message !== 13)
        notices.push({
          key: "notice.w.4",
          value: 4,
          category: "supply",
          icon: W_NOTICES[4].icon!,
          entity: supply.softener.eid,
          source: "supply",
        });
    }
    notices.sort((a, b) => NOTICE_ORDER.indexOf(a.category) - NOTICE_ORDER.indexOf(b.category));

    // buttons
    const btn = (k: ButtonKey) => {
      const eid = index.buttons[k];
      const st = eid ? hass.states?.[eid] : undefined;
      return st && st.state !== "unavailable" ? eid : undefined;
    };

    const model: DrumModel = {
      key,
      status,
      sub,
      generic,
      phase: p,
      phaseKnown,
      mode,
      phaseEntity: phaseR.eid,
      remaining,
      resn,
      antiCrease,
      anchor,
      finishAt,
      finishRaw: raw,
      startsAt,
      approximate,
      idleDuration,
      programme,
      message,
      messageEntity: msg.eid,
      remote,
      doorOpen,
      doorLocked,
      power,
      notices,
      blockingNotice,
      steps: null,
      finishedAt,
      buttons: { start: btn(A.buttons.start), pause: btn(A.buttons.pause), cancel: btn(A.buttons.cancel) },
      isActive,
      isDoneLike,
    };
    model.steps = computeSteps(model, hasDry);
    return model;
  };

  const washer = drum("washer", phaseW, phaseD);
  const dryer = drum("dryer", phaseD, phaseW);

  const total = (attr: string): TotalValue => {
    const rd = r.read(attr);
    const unit = rd.entity?.attributes?.unit_of_measurement;
    return {
      value: typeof rd.value === "number" ? rd.value : undefined,
      unit: typeof unit === "string" && unit ? unit : undefined,
      entity: rd.eid,
    };
  };

  const controlsExist = Object.values(index.buttons).some((eid) => !!eid && !!hass.states?.[eid]);

  return {
    deviceId: index.deviceId,
    machineOff,
    offReason,
    offSince,
    washer,
    dryer,
    fault,
    childLock: r.bool("childLockStatus"),
    controlsExist,
    legacy: r.legacy,
    legacyUnmapped: r.legacyUnmapped,
    totals: {
      water: total("totalWaterUsed"),
      energy: total("washerTotalElectricityUsed"),
      cycles: total("totalWashCycle"),
      cycleWater: total("currentWaterUsed"),
      cycleEnergy: total("washerCurrentElectricityUsed"),
    },
    now,
  };
}

function maxTime(values: Array<string | undefined>): number | undefined {
  let best: number | undefined;
  for (const v of values) {
    const n = ts(v);
    if (n !== undefined && (best === undefined || n > best)) best = n;
  }
  return best;
}

export function roundTo5(ms: number): number {
  const step = 5 * MIN;
  return Math.round(ms / step) * step;
}

// ---------------------------------------------------------------------------------------------
// Actions, gates and confirmation (§6.1, §6.2, §6.5)

export interface DrumActions {
  primary?: Command;
  secondary?: Command;
}

/** Commands the drum's status allows (before button availability). */
export function drumActions(d: DrumModel): DrumActions {
  switch (d.status) {
    case "idle":
      return d.generic ? {} : { primary: "start" };
    case "running":
    case "estimating":
      return { primary: "pause", secondary: "cancel" };
    case "paused":
      return { primary: "resume", secondary: "cancel" };
    case "delayed":
      return { secondary: "cancel_scheduled" };
    case "tumbling":
      return d.key === "dryer" ? { secondary: "stop" } : {};
    default:
      return {};
  }
}

export function buttonSlot(cmd: Command): "start" | "pause" | "cancel" {
  return cmd === "start" || cmd === "resume" ? "start" : cmd === "pause" ? "pause" : "cancel";
}

export function buttonFor(d: DrumModel, cmd: Command): string | undefined {
  return d.buttons[buttonSlot(cmd)];
}

export type GateReason = "remote" | "busy" | "pending" | "fault" | "door" | "programme" | "applying";

export interface GateContext {
  now: number;
  /** Drum whose command is currently in the "sending" phase, if any. */
  sending?: DrumKey;
  /** Drums with any pending (sending or waiting) command. */
  pending?: ReadonlySet<DrumKey> | DrumKey[];
}

/** First failing gate for a command, or null when it may be sent. */
export function gateFor(m: LaundryModel, d: DrumModel, cmd: Command, ctx: GateContext): GateReason | null {
  if (d.remote !== true) return "remote";
  if (ctx.sending && ctx.sending !== d.key) return "busy";
  const pending = ctx.pending ? new Set(ctx.pending) : new Set<DrumKey>();
  if (pending.has(d.key)) return "pending";
  const starting = cmd === "start" || cmd === "resume";
  if (starting && m.fault.on) return "fault";
  if (cmd === "start") {
    if (d.doorOpen === true) return "door";
    if (!d.programme.value) return "programme";
    if (d.programme.lastChanged !== undefined && ctx.now - d.programme.lastChanged < 5000) return "applying";
  }
  return null;
}

/** Expected-value predicate for a sent command (§6.5). */
export function commandConfirmed(cmd: Command, d: DrumModel): boolean {
  switch (cmd) {
    case "start":
      return d.status === "running" || d.status === "estimating" || d.status === "delayed";
    case "resume":
      return (d.status === "running" || d.status === "estimating") && d.mode === 1;
    case "pause":
      return d.mode === 2 || d.status === "paused";
    default:
      return d.phase === 0;
  }
}

/** True when any drum needs the per-minute tick. */
export function needsTick(m: LaundryModel): boolean {
  return [m.washer, m.dryer].some(
    (d) => d.status === "running" || d.status === "estimating" || d.status === "delayed",
  );
}
