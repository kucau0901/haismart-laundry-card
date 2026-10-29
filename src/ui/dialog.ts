import { html, nothing, type TemplateResult } from "lit";
import type { Command, DrumModel } from "../model/derive";
import { drumVars, t, type Lang } from "../localize";
import { fmtDuration } from "../time";

export interface DialogState {
  drum: DrumModel["key"];
  cmd: Command;
  trigger?: HTMLElement;
  /** Status, gate and programme captured at open (§6.4 live re-check). */
  signature: string;
}

export interface DialogCopy {
  title: string;
  body?: string;
  rows?: Array<{ icon?: string; text: string }>;
  safe: string;
  confirm: string;
  confirmStyle: "destructive" | "warn" | "filled";
}

export function dialogCopy(lang: Lang, d: DrumModel, cmd: Command): DialogCopy {
  const vars = drumVars(lang, d.key);
  const programme = d.programme.value && d.programme.label ? d.programme.label : t(lang, "dlg.this_cycle");
  switch (cmd) {
    case "cancel":
      return d.key === "washer"
        ? {
            title: t(lang, "dlg.cancel_w_title"),
            body: t(lang, "dlg.cancel_w_body", { programme }),
            safe: t(lang, "dlg.keep_washing"),
            confirm: t(lang, "dlg.cancel_cycle"),
            confirmStyle: "destructive",
          }
        : {
            title: t(lang, "dlg.cancel_d_title"),
            body: t(lang, "dlg.cancel_d_body", { programme }),
            safe: t(lang, "dlg.keep_drying"),
            confirm: t(lang, "dlg.cancel_cycle"),
            confirmStyle: "destructive",
          };
    case "cancel_scheduled":
      return {
        title: t(lang, "dlg.sched_title", vars),
        body: t(lang, "dlg.sched_body", vars),
        safe: t(lang, "dlg.keep_scheduled"),
        confirm: t(lang, "dlg.cancel_cycle"),
        confirmStyle: "destructive",
      };
    case "stop":
      return {
        title: t(lang, "dlg.tumble_title"),
        body: t(lang, "dlg.tumble_body"),
        safe: t(lang, "dlg.keep_tumbling"),
        confirm: t(lang, "ctl.stop_tumbling"),
        confirmStyle: "warn",
      };
    default: {
      const rows: Array<{ icon?: string; text: string }> = [{ text: programme }];
      if (d.idleDuration) rows.push({ text: t(lang, "dlg.takes_about", { d: fmtDuration(d.idleDuration, lang) }) });
      if (d.doorOpen === false) rows.push({ icon: "mdi:check", text: t(lang, "dlg.door_closed") });
      return {
        title: t(lang, "dlg.start_title", vars),
        rows,
        safe: t(lang, "dlg.not_now"),
        confirm: t(lang, "dlg.start_confirm", vars),
        confirmStyle: "filled",
      };
    }
  }
}

export function renderDialogContent(
  lang: Lang,
  d: DrumModel,
  state: DialogState,
  changed: boolean,
  onSafe: () => void,
  onConfirm: () => void,
): TemplateResult {
  const c = dialogCopy(lang, d, state.cmd);
  const vars = drumVars(lang, d.key);
  // The role=status region is always present and only filled when the state changes, so the
  // change is announced. Buttons are in visual order (safe first, confirm last); initial focus
  // goes to [data-safe] whatever its position.
  return html`<h2 id="dlg-title">${c.title}</h2>
    ${c.body ? html`<p id="dlg-body">${c.body}</p>` : nothing}
    ${c.rows
      ? html`<ul class="rows" id="dlg-body">
          ${c.rows.map(
            (r) => html`<li>${r.icon ? html`<ha-icon .icon=${r.icon} aria-hidden="true"></ha-icon>` : nothing}${r.text}</li>`,
          )}
        </ul>`
      : nothing}
    <div class="changed ${changed ? "" : "empty"}" role="status" id="dlg-changed">
      ${changed
        ? html`<ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon><span>${t(lang, "dlg.changed", vars)}</span>`
        : nothing}
    </div>
    <div class="dlg-actions">
      <button class="btn ${c.confirmStyle === "filled" ? "tonal" : "filled"}" type="button" data-safe autofocus @click=${onSafe}>
        ${c.safe}
      </button>
      <button
        class="btn ${c.confirmStyle}"
        type="button"
        data-confirm
        aria-disabled=${changed ? "true" : "false"}
        aria-describedby=${changed ? "dlg-changed" : nothing}
        @click=${() => (changed ? undefined : onConfirm())}
      >
        ${c.confirm}
      </button>
    </div>`;
}
