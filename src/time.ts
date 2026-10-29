// Time and duration formatting (§4.5). Pure; no DOM.

import type { HomeAssistant } from "./types";
import type { Lang } from "./localize";
import { t } from "./localize";

const NBSP = " ";
export const MIN = 60_000;

export interface TimeCtx {
  lang: Lang;
  /** BCP 47 locale passed to Intl. */
  fmtLocale: string;
  hour12: boolean | undefined;
  timeZone: string | undefined;
}

export function timeCtx(hass: Pick<HomeAssistant, "locale" | "config" | "language"> | undefined, lang: Lang): TimeCtx {
  const locale = hass?.locale;
  const haLang = locale?.language || hass?.language || "";
  const base = haLang.split("-")[0].toLowerCase();
  const fmtLocale = base === lang ? haLang : lang === "ms" ? "ms-MY" : "en";
  const tf = locale?.time_format;
  const hour12 = tf === "12" ? true : tf === "24" ? false : undefined;
  const timeZone = locale?.time_zone === "server" ? hass?.config?.time_zone || undefined : undefined;
  return { lang, fmtLocale, hour12, timeZone };
}

const fmtCache = new Map<string, Intl.DateTimeFormat>();
function dtf(locale: string, opts: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const key = locale + JSON.stringify(opts);
  let f = fmtCache.get(key);
  if (!f) {
    try {
      f = new Intl.DateTimeFormat(locale, opts);
    } catch {
      // Unknown time zone or locale: fall back to the runtime default rather than throw.
      const rest: Intl.DateTimeFormatOptions = { ...opts };
      delete rest.timeZone;
      f = new Intl.DateTimeFormat("en", rest);
    }
    fmtCache.set(key, f);
  }
  return f;
}

/** Calendar day number (days since epoch) of `ms` in the context's time zone. */
export function dayNumber(ms: number, ctx: Pick<TimeCtx, "timeZone">): number {
  const parts = dtf("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: ctx.timeZone,
  }).formatToParts(new Date(ms));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return Math.round(Date.UTC(get("year"), get("month") - 1, get("day")) / 86_400_000);
}

/** "3:45 pm", "6:30 am tomorrow", "Sat 9:10 am". */
export function fmtClock(ms: number, now: number, ctx: TimeCtx, opts: { relativeDay?: boolean } = {}): string {
  const clock = dtf(ctx.fmtLocale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: ctx.hour12,
    timeZone: ctx.timeZone,
  }).format(new Date(ms));
  if (opts.relativeDay === false) return clock;
  const diff = dayNumber(ms, ctx) - dayNumber(now, ctx);
  if (diff === 1) return `${clock} ${t(ctx.lang, "time.tomorrow")}`;
  if (diff >= 2 || diff <= -1) return `${fmtWeekday(ms, ctx)} ${clock}`;
  return clock;
}

export function fmtWeekday(ms: number, ctx: TimeCtx): string {
  return dtf(ctx.fmtLocale, { weekday: "short", timeZone: ctx.timeZone }).format(new Date(ms));
}

/** Clock for a past instant ("since 9:12 pm", "since Tue 9:12 pm"). */
export function fmtPastClock(ms: number, now: number, ctx: TimeCtx): string {
  const clock = fmtClock(ms, now, ctx, { relativeDay: false });
  return dayNumber(ms, ctx) === dayNumber(now, ctx) ? clock : `${fmtWeekday(ms, ctx)} ${clock}`;
}

/** "42 min", "2 h", "2 h 10 min" (EN) / "2 j 10 min" (MS), with non-breaking spaces. */
export function fmtDuration(minutes: number, lang: Lang): string {
  const m = Math.max(0, Math.round(minutes));
  const h = Math.floor(m / 60);
  const r = m % 60;
  const H = t(lang, "dur.h");
  const M = t(lang, "dur.min");
  if (h === 0) return `${r}${NBSP}${M}`;
  if (r === 0) return `${h}${NBSP}${H}`;
  return `${h}${NBSP}${H}${NBSP}${r}${NBSP}${M}`;
}

/** Long-unit duration for screen readers: "7 hours 50 minutes". */
export function fmtDurationLong(minutes: number, lang: Lang): string {
  const m = Math.max(0, Math.round(minutes));
  const h = Math.floor(m / 60);
  const r = m % 60;
  const hours = (n: number) => `${n} ${t(lang, n === 1 ? "a11y.hour" : "a11y.hours")}`;
  const mins = (n: number) => `${n} ${t(lang, n === 1 ? "a11y.minute" : "a11y.minutes")}`;
  if (h === 0) return mins(r);
  if (r === 0) return hours(h);
  return `${hours(h)} ${mins(r)}`;
}

/** Whole minutes from now until `ms`, rounded up, never negative. */
export function minutesUntil(ms: number, now: number): number {
  return Math.max(0, Math.ceil((ms - now) / MIN));
}

export function roundTo5Min(ms: number): number {
  const step = 5 * MIN;
  return Math.round(ms / step) * step;
}

export function parseTime(s: string | undefined): number | undefined {
  if (!s) return undefined;
  const v = Date.parse(s);
  return Number.isFinite(v) ? v : undefined;
}
