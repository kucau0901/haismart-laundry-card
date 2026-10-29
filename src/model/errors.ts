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
  // _recheck_laundry_push: the flag dropped between the gate and the send (door opened, panel).
  ["remote control was switched off", "err.remote_off"],
  ["no fresh report", "err.no_report"],
  ["laundry controls are off", "err.controls_off"],
  ["is running or its state is unknown", "err.running"],
  ["has not read", "err.no_status"],
];

interface WsError {
  message?: unknown;
  code?: unknown;
  error?: unknown;
  translation_domain?: unknown;
  translation_key?: unknown;
  translation_placeholders?: { error?: unknown } | null;
}

function ruleFor(text: string): ErrorKey | undefined {
  const lower = text.toLowerCase();
  for (const [needle, key] of RULES) if (lower.includes(needle)) return key;
  return undefined;
}

export function humaniseError(err: unknown): HumanError {
  const e = (err ?? {}) as WsError;
  const message = typeof e.message === "string" ? e.message : typeof err === "string" ? err : "";
  const code = e.code;

  // Structured path: a HomeAssistantError raised with translation_key/placeholders reaches the
  // frontend with those fields intact. Prefer them over parsing the English sentence.
  const tkey = typeof e.translation_key === "string" ? e.translation_key : undefined;
  if (tkey && (e.translation_domain === undefined || e.translation_domain === "haismart")) {
    const reason = typeof e.translation_placeholders?.error === "string" ? e.translation_placeholders.error : "";
    if (tkey === "no_status") return { key: "err.no_status", detail: tidy(reason || message) };
    if (tkey === "control_rejected")
      return { key: ruleFor(reason || message) ?? "err.generic", detail: tidy(reason || stripPrefix(message).rest) };
    if (tkey === "control_failed")
      return { key: ruleFor(reason) ?? "err.unreachable", detail: tidy(reason || stripPrefix(message).rest) };
  }

  if (!message || code === 3 || code === "connection_lost" || e.error === "connection_lost")
    return { key: "err.ha_unreachable", detail: tidy(message) };

  // Fallback: older cores without the translation fields. Parse the component's English text.
  const { rest, failed } = stripPrefix(message);
  const rule = ruleFor(rest);
  if (rule) return { key: rule, detail: tidy(rest) };
  // "has not read" also appears in the un-prefixed no_status message.
  if (message.toLowerCase().includes("has not read")) return { key: "err.no_status", detail: tidy(rest) };
  if (failed) return { key: "err.unreachable", detail: tidy(rest) };
  return { key: "err.generic", detail: tidy(rest) };
}

function stripPrefix(message: string): { rest: string; failed: boolean } {
  const ri = message.indexOf(REJECTED);
  if (ri >= 0) return { rest: message.slice(ri + REJECTED.length), failed: false };
  if (message.startsWith(FAILED_PREFIX)) {
    const ci = message.indexOf(": ", FAILED_PREFIX.length);
    return { rest: ci >= 0 ? message.slice(ci + 2) : message.slice(FAILED_PREFIX.length), failed: true };
  }
  return { rest: message, failed: false };
}

function tidy(s: string): string {
  const v = s.trim().replace(/\s--\s/g, " — ").replace(/--/g, "—");
  return v ? v.charAt(0).toUpperCase() + v.slice(1) : "";
}
