// Presentation layer: LaundryModel -> display strings (§5, §5.3, §11). Pure; no DOM.

import type { DrumKey, LaundryCardConfig, TimeDisplay } from "./types";
import type { DrumModel, LaundryModel, Notice } from "./model/derive";
import { drumVars, t, type Lang } from "./localize";
import { fmtClock, fmtDuration, fmtDurationLong, fmtPastClock, minutesUntil, type TimeCtx } from "./time";

export type Tint = "running" | "paused" | "done" | "scheduled" | null;

export interface DrumView {
  key: DrumKey;
  name: string;
  tint: Tint;
  icon: string;
  iconMuted: boolean;
  pulse: boolean;
  doneAnim: boolean;
  eyebrow: string;
  hero: string;
  heroMuted: boolean;
  /** Render a breathing "~" before the hero. */
  heroApprox: boolean;
  support?: string;
  /** Icon before the support line (blocking notice while done). */
  supportIcon?: string;
  /** Programme name for the interactive chip (idle, select, remote on). */
  programmeChip?: { label: string; entity: string };
  /** Short text for compact rows and collapsed rows ("~5:07 pm", "Ready"). */
  short: string;
  /** Full sentence for the summary's aria-label. */
  aria: string;
  attention: "error" | "warning" | null;
}

export interface ViewCtx {
  lang: Lang;
  time: TimeCtx;
  now: number;
  timeDisplay: TimeDisplay;
  /** Controls row would be visible (config allows, not compact, controls exist). */
  controlsVisible: boolean;
}

const DRUM_ICON: Record<DrumKey, string> = { washer: "mdi:washing-machine", dryer: "mdi:tumble-dryer" };

export function phaseLabel(lang: Lang, d: DrumModel): string {
  if (d.phase === undefined || !d.phaseKnown) return t(lang, "phase.working");
  const key = `phase.${d.key === "washer" ? "w" : "d"}.${d.phase}`;
  const v = t(lang, key);
  return v === key ? t(lang, "phase.working") : v;
}

export function noticeText(lang: Lang, n: Notice): string {
  return n.key ? t(lang, n.key) : n.text || String(n.value);
}

function programmeName(lang: Lang, d: DrumModel): string {
  if (!d.programme.value) return t(lang, "support.no_programme");
  return d.programme.label || String(d.programme.value);
}

export function drumView(m: LaundryModel, d: DrumModel, ctx: ViewCtx): DrumView {
  const { lang, now } = ctx;
  const tr = (key: string, extra?: Record<string, string | number | undefined>) =>
    t(lang, key, { ...drumVars(lang, d.key), ...extra });
  const name = t(lang, `drum.${d.key}`);
  const dur = (min: number) => fmtDuration(min, lang);
  const clock = (ms: number) => fmtClock(ms, now, ctx.time);
  const countdown = d.finishRaw !== undefined ? minutesUntil(d.finishRaw, now) : d.remaining;
  const ariaParts: string[] = [];
  const v: DrumView = {
    key: d.key,
    name,
    tint: null,
    icon: DRUM_ICON[d.key],
    iconMuted: true,
    pulse: false,
    doneAnim: false,
    eyebrow: name,
    hero: "",
    heroMuted: false,
    heroApprox: false,
    short: "",
    aria: "",
    attention: null,
  };

  switch (d.status) {
    case "off":
      v.icon = "mdi:power-sleep";
      v.hero = t(lang, "status.off");
      v.heroMuted = true;
      ariaParts.push(t(lang, "a11y.off"));
      break;
    case "stale":
      v.icon = "mdi:timer-sand-empty";
      v.hero = t(lang, "status.waiting");
      v.heroMuted = true;
      v.support = tr("status.stale_support");
      ariaParts.push(t(lang, "a11y.waiting"));
      break;
    case "idle": {
      v.hero = t(lang, "status.ready");
      const prog = programmeName(lang, d);
      const chip =
        !d.generic &&
        ctx.controlsVisible &&
        d.programme.domain === "select" &&
        d.remote === true &&
        !!d.programme.entity &&
        !m.machineOff;
      const about = d.idleDuration ? dur(d.idleDuration) : undefined;
      if (d.generic) v.support = prog;
      else if (chip) {
        v.programmeChip = { label: prog, entity: d.programme.entity! };
        v.support = about ? tr("support.about", { d: about }) : undefined;
      } else v.support = about && d.programme.value ? tr("support.idle", { programme: prog, d: about }) : prog;
      ariaParts.push(t(lang, "a11y.ready"));
      if (d.programme.value) ariaParts.push(t(lang, "a11y.programme", { programme: prog }));
      break;
    }
    case "delayed": {
      v.tint = "scheduled";
      v.icon = "mdi:clock-start";
      v.iconMuted = false;
      v.eyebrow = tr("eyebrow.scheduled");
      ariaParts.push(t(lang, "a11y.scheduled"));
      if (d.key === "dryer" && d.finishAt !== undefined && d.startsAt !== undefined) {
        v.hero = clock(d.finishAt);
        v.heroApprox = true;
        v.support = tr("support.starts_in", { d: dur(minutesUntil(d.startsAt, now)) });
        ariaParts.push(
          t(lang, "a11y.starts_in", { d: fmtDurationLong(minutesUntil(d.startsAt, now), lang) }),
          t(lang, "a11y.finishes_around", { time: clock(d.finishAt) }),
        );
      } else {
        v.hero = t(lang, "status.scheduled");
        if (d.remaining) {
          v.support = tr("support.finishes_about", { d: dur(d.remaining) });
          ariaParts.push(t(lang, "a11y.in_about", { d: fmtDurationLong(d.remaining, lang) }));
        }
      }
      break;
    }
    case "estimating": {
      v.tint = "running";
      v.icon = d.key === "dryer" ? "mdi:radar" : "mdi:scale-balance";
      v.iconMuted = false;
      v.pulse = true;
      v.eyebrow = tr("eyebrow.estimating");
      v.heroMuted = true;
      ariaParts.push(t(lang, "a11y.estimating"));
      if (d.finishAt !== undefined) {
        v.hero = clock(d.finishAt);
        v.heroApprox = true;
        ariaParts.push(t(lang, "a11y.finishes_around", { time: clock(d.finishAt) }));
      } else v.hero = t(lang, "status.running");
      if (countdown !== undefined) {
        v.support = tr(d.key === "dryer" ? "support.est_dryer" : "support.est_washer", { d: dur(countdown) });
        ariaParts.push(t(lang, "a11y.in_about", { d: fmtDurationLong(countdown, lang) }));
      }
      break;
    }
    case "running": {
      v.tint = d.sub === "maintenance" ? "scheduled" : "running";
      v.iconMuted = false;
      v.pulse = true;
      v.icon = d.sub === "maintenance" ? "mdi:wrench-clock" : d.sub === "care" ? "mdi:hanger" : DRUM_ICON[d.key];
      const phase = phaseLabel(lang, d);
      v.eyebrow =
        d.sub === "maintenance"
          ? tr("eyebrow.maintenance")
          : d.sub === "care"
            ? tr("eyebrow.care")
            : tr("eyebrow.phase", { phase });
      ariaParts.push(t(lang, "a11y.running"), phase.toLocaleLowerCase());
      const finishing = d.remaining === 0 || (d.finishAt !== undefined && countdown === 0);
      const hasClock = d.finishAt !== undefined;
      if (finishing) {
        v.hero = t(lang, "status.finishing");
      } else if (!hasClock) {
        v.hero = t(lang, "status.running");
      } else if (ctx.timeDisplay === "remaining" && !d.sub) {
        v.hero = dur(countdown ?? 0);
        v.support = tr("support.done_at", { time: clock(d.finishAt!) });
      } else {
        v.hero = clock(d.finishAt!);
        v.heroApprox = d.approximate;
        const inD = countdown !== undefined ? dur(countdown) : undefined;
        if (d.sub === "maintenance")
          v.support = inD ? tr("support.maintenance", { d: inD }) : tr("support.maintenance_short");
        else if (d.sub === "care") v.support = inD ? tr("support.care", { d: inD }) : tr("support.care_short");
        else if (ctx.timeDisplay !== "finish" && inD) v.support = tr("support.in", { d: inD });
      }
      if (hasClock && !finishing) {
        ariaParts.push(t(lang, "a11y.finishes_around", { time: clock(d.finishAt!) }));
        if (countdown !== undefined)
          ariaParts.push(t(lang, "a11y.in_about", { d: fmtDurationLong(countdown, lang) }));
      }
      break;
    }
    case "paused": {
      v.tint = "paused";
      v.icon = "mdi:pause-circle";
      v.iconMuted = false;
      v.eyebrow = tr("eyebrow.paused", { phase: phaseLabel(lang, d).toLocaleLowerCase() });
      v.hero = t(lang, "status.paused");
      if (d.remaining !== undefined) {
        v.support = tr("support.paused", { d: dur(d.remaining) });
        ariaParts.push(t(lang, "a11y.paused"), t(lang, "a11y.left", { d: fmtDurationLong(d.remaining, lang) }));
      } else ariaParts.push(t(lang, "a11y.paused"));
      v.attention = "warning";
      break;
    }
    case "done": {
      v.tint = "done";
      v.icon = "mdi:check-circle";
      v.iconMuted = false;
      v.doneAnim = true;
      v.eyebrow = tr("eyebrow.finished");
      v.hero = t(lang, "status.done");
      ariaParts.push(t(lang, "a11y.done"));
      if (d.blockingNotice) {
        v.support = noticeText(lang, d.blockingNotice);
        v.supportIcon = "mdi:alert";
        ariaParts.push(v.support.toLocaleLowerCase());
      } else {
        let s =
          d.finishedAt !== undefined
            ? tr("support.finished_at", { time: fmtPastClock(d.finishedAt, now, ctx.time) })
            : t(lang, "support.ready_unload");
        if (d.doorLocked === true) s += ` · ${t(lang, "support.door_locked")}`;
        v.support = s;
        if (d.finishedAt !== undefined)
          ariaParts.push(t(lang, "a11y.finished_at", { time: fmtPastClock(d.finishedAt, now, ctx.time) }));
      }
      break;
    }
    case "tumbling": {
      v.tint = "done";
      v.icon = "mdi:hanger";
      v.iconMuted = false;
      v.hero = t(lang, "status.done");
      ariaParts.push(t(lang, "a11y.tumbling"));
      if (d.key === "dryer") {
        v.eyebrow = tr("eyebrow.anticrease");
        v.support =
          d.antiCrease && d.antiCrease > 0
            ? tr("support.anticrease", { n: d.antiCrease })
            : t(lang, "support.anticrease_short");
      } else {
        v.eyebrow = tr("eyebrow.tumbling");
        v.support = t(lang, "support.tumble_washer");
      }
      break;
    }
  }

  // Notices in the sentence (idle and done mostly; harmless elsewhere).
  for (const n of d.notices) ariaParts.push(noticeText(lang, n).toLocaleLowerCase());
  if (m.fault.on) ariaParts.push(t(lang, "a11y.fault"));

  if (m.fault.on) v.attention = "error";
  else if (!v.attention && d.notices.length) v.attention = "warning";

  v.short = (v.heroApprox ? "~" : "") + v.hero;
  v.aria = t(lang, "a11y.sentence", { Drum: name, parts: ariaParts.filter(Boolean).join(", ") });
  return v;
}

/** Clock text used inside headlines ("~5:07 pm"). */
function headClock(d: DrumModel, ctx: ViewCtx): string | undefined {
  if (d.status === "paused") return t(ctx.lang, "status.paused").toLocaleLowerCase();
  if (d.finishAt === undefined) return undefined;
  return (d.approximate ? "~" : "") + fmtClock(d.finishAt, ctx.now, ctx.time);
}

/** Header headline (§5.3), over the visible drums only. */
export function headline(m: LaundryModel, drums: DrumModel[], ctx: ViewCtx): string {
  const { lang } = ctx;
  const vars = (d: DrumModel) => drumVars(lang, d.key);
  if (m.fault.on) return t(lang, "head.attention");
  if (m.machineOff)
    return m.offSince !== undefined
      ? t(lang, "head.off", { time: fmtPastClock(m.offSince, ctx.now, ctx.time) })
      : t(lang, "off.title");
  const doneLike = drums.filter((d) => d.isDoneLike);
  const active = drums.filter((d) => d.isActive);
  if (drums.length > 1 && doneLike.length === drums.length) return t(lang, "head.all_ready");
  if (doneLike.length === 1 && active.length === 1) {
    const time = headClock(active[0], ctx);
    if (time)
      return t(lang, "head.drum_ready_other", {
        ...vars(doneLike[0]),
        other: t(lang, `drum.${active[0].key}`),
        time,
      });
  }
  if (doneLike.length >= 1) return t(lang, "head.drum_ready", vars(doneLike[0]));
  if (active.length === 2 && active.every((d) => d.status !== "paused" && d.finishAt !== undefined)) {
    const later = active[0].finishAt! >= active[1].finishAt! ? active[0] : active[1];
    const approx = active.some((d) => d.approximate);
    return t(lang, "head.all_done_by", {
      time: (approx ? "~" : "") + fmtClock(later.finishAt!, ctx.now, ctx.time),
    });
  }
  const runningish = active.filter((d) => d.status !== "paused" && d.finishAt !== undefined);
  if (runningish.length) {
    const d = runningish.sort((a, b) => a.finishAt! - b.finishAt!)[0];
    return t(lang, "head.drum_done", { ...vars(d), time: headClock(d, ctx) });
  }
  const paused = drums.find((d) => d.status === "paused");
  if (paused) return t(lang, "head.drum_paused", vars(paused));
  const running = drums.find((d) => d.status === "running" || d.status === "estimating");
  if (running) return t(lang, "head.drum_running", vars(running));
  const delayed = drums.find((d) => d.status === "delayed");
  if (delayed) return t(lang, "head.drum_scheduled", vars(delayed));
  if (drums.some((d) => d.status === "stale")) return t(lang, "head.waiting");
  return t(lang, "head.ready");
}

export interface TotalsView {
  icon: string;
  text: string;
  entity?: string;
}

export function totalsLine(m: LaundryModel, lang: Lang): { water?: TotalsView; energy?: TotalsView; text: string } | null {
  const T = m.totals;
  const cycleMode =
    m.washer.isActive || m.washer.isDoneLike || (T.cycleWater.value ?? 0) > 0 || (T.cycleEnergy.value ?? 0) > 0;
  const fmtNum = (n: number | undefined) =>
    n === undefined ? "–" : new Intl.NumberFormat(lang === "ms" ? "ms-MY" : "en", { maximumFractionDigits: 2 }).format(n);
  const energy = (e: typeof T.energy) => (e.unit ? `${fmtNum(e.value)} ${e.unit}` : fmtNum(e.value));
  if (cycleMode) {
    if (T.cycleWater.value === undefined && T.cycleEnergy.value === undefined) return null;
    return {
      text: t(lang, "tot.cycle", { water: fmtNum(T.cycleWater.value), energy: energy(T.cycleEnergy) }),
      water: { icon: "mdi:water", text: `${fmtNum(T.cycleWater.value)} L`, entity: T.cycleWater.entity },
      energy: { icon: "mdi:lightning-bolt", text: energy(T.cycleEnergy), entity: T.cycleEnergy.entity },
    };
  }
  if (T.water.value === undefined && T.energy.value === undefined && T.cycles.value === undefined) return null;
  const n = T.cycles.value ?? 0;
  return {
    text: t(lang, "tot.total", {
      water: fmtNum(T.water.value),
      energy: energy(T.energy),
      n: fmtNum(T.cycles.value),
      washes: t(lang, n === 1 ? "tot.wash_one" : "tot.wash_other"),
    }),
    water: { icon: "mdi:water", text: `${fmtNum(T.water.value)} L`, entity: T.water.entity },
    energy: { icon: "mdi:lightning-bolt", text: energy(T.energy), entity: T.energy.entity },
  };
}

export function resolvedTimeDisplay(c: LaundryCardConfig): TimeDisplay {
  return c.time_display === "finish" || c.time_display === "remaining" ? c.time_display : "both";
}
