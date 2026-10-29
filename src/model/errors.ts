// Error humanisation (§6.8). The component's wording is free text, so the raw reason is always
// kept for the Details disclosure.

export type ErrorKey =
  | "err.remote_off"
  | "err.no_report"
  | "err.controls_off"
  | "err.running"
  | "err.no_status"
  | "err.unreachable"
  | "err.ha_unreachable"
  | "err.generic";

export interface HumanError {
  key: ErrorKey;
  /** Stripped component reason, first letter capitalised, "--" as an em dash. "" when none. */
  detail: string;
}

const REJECTED = " does not accept that setting: ";
const FAILED_PREFIX = "Could not send the command to ";

const RULES: Array<[string, ErrorKey]> = [
  ["remote control is not enabled", "err.remote_off"],
  ["no fresh report", "err.no_report"],
  ["laundry controls are off", "err.controls_off"],
  ["is running or its state is unknown", "err.running"],
  ["has not read", "err.no_status"],
];

export function humaniseError(err: unknown): HumanError {
  const e = (err ?? {}) as { message?: unknown; code?: unknown; error?: unknown };
  const message = typeof e.message === "string" ? e.message : typeof err === "string" ? err : "";
  const code = e.code;
  if (!message || code === 3 || code === "connection_lost" || e.error === "connection_lost")
    return { key: "err.ha_unreachable", detail: tidy(message) };

  let rest = message;
  let failed = false;
  const ri = message.indexOf(REJECTED);
  if (ri >= 0) rest = message.slice(ri + REJECTED.length);
  else if (message.startsWith(FAILED_PREFIX)) {
    failed = true;
    const ci = message.indexOf(": ", FAILED_PREFIX.length);
    rest = ci >= 0 ? message.slice(ci + 2) : message.slice(FAILED_PREFIX.length);
  }
  const lower = rest.toLowerCase();
  for (const [needle, key] of RULES) if (lower.includes(needle)) return { key, detail: tidy(rest) };
  // "has not read" also appears in the un-prefixed no_status message.
  if (message.toLowerCase().includes("has not read")) return { key: "err.no_status", detail: tidy(rest) };
  if (failed) return { key: "err.unreachable", detail: tidy(rest) };
  return { key: "err.generic", detail: tidy(rest) };
}

function tidy(s: string): string {
  const v = s.trim().replace(/\s--\s/g, " — ").replace(/--/g, "—");
  return v ? v.charAt(0).toUpperCase() + v.slice(1) : "";
}
