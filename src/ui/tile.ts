import { html, nothing, type TemplateResult } from "lit";
import { keyed } from "lit/directives/keyed.js";
import { ifDefined } from "lit/directives/if-defined.js";
import {
  type Command,
  type DrumModel,
  type GateReason,
  buttonFor,
  drumActions,
  gateFor,
} from "../model/derive";
import { drumVars, t } from "../localize";
import type { DrumView } from "../view";
import type { RenderCtx } from "./context";
import { keyActivate, renderErrorStrip, renderNotices, renderStepper } from "./parts";

const CMD_ICON: Record<Command, string> = {
  start: "mdi:play",
  resume: "mdi:play",
  pause: "mdi:pause",
  cancel: "mdi:stop",
  cancel_scheduled: "mdi:stop",
  stop: "mdi:stop",
};
const CMD_LABEL: Record<Command, string> = {
  start: "ctl.start",
  resume: "ctl.resume",
  pause: "ctl.pause",
  cancel: "ctl.cancel",
  cancel_scheduled: "ctl.cancel_scheduled",
  stop: "ctl.stop_tumbling",
};
const CMD_VERB: Record<Command, string> = {
  start: "ctl.starting",
  resume: "ctl.resuming",
  pause: "ctl.pausing",
  cancel: "ctl.cancelling",
  cancel_scheduled: "ctl.cancelling",
  stop: "ctl.stopping",
};
const OK_KEY: Record<Command, string> = {
  start: "ctl.ok_started",
  resume: "ctl.ok_resumed",
  pause: "ctl.ok_paused",
  cancel: "ctl.ok_cancelled",
  cancel_scheduled: "ctl.ok_cancelled",
  stop: "ctl.ok_stopped",
};
const GATE_TEXT: Partial<Record<GateReason, string>> = {
  fault: "gate.fault",
  door: "gate.door",
  programme: "gate.programme",
  applying: "gate.applying",
};

export const okText = (ctx: Pick<RenderCtx, "lang">, d: DrumModel["key"], cmd: Command) =>
  t(ctx.lang, OK_KEY[cmd], drumVars(ctx.lang, d));

/** Controls row visible for this drum (§6.1)? Returns the commands it would show. */
export function visibleCommands(ctx: RenderCtx, d: DrumModel): { primary?: Command; secondary?: Command } {
  if (ctx.config.show_controls === "never" || ctx.layout === "compact" || ctx.model.machineOff) return {};
  const acts = drumActions(d);
  return {
    primary: acts.primary && buttonFor(d, acts.primary) ? acts.primary : undefined,
    secondary: acts.secondary && buttonFor(d, acts.secondary) ? acts.secondary : undefined,
  };
}

export function gateOf(ctx: RenderCtx, d: DrumModel, cmd: Command): GateReason | null {
  if (ctx.sample) return "remote";
  return gateFor(ctx.model, d, cmd, {
    now: ctx.now,
    sending: ctx.controller.sending,
    pending: ctx.controller.pending,
  });
}

function renderButton(
  ctx: RenderCtx,
  d: DrumModel,
  cmd: Command,
  role: "primary" | "secondary",
): TemplateResult {
  const { lang } = ctx;
  const vars = drumVars(lang, d.key);
  const st = ctx.controller.get(d.key);
  const sendingThis = st?.phase === "sending" && st.cmd === cmd;
  const gate = gateOf(ctx, d, cmd);
  const disabled = gate !== null || sendingThis;
  const describedBy =
    gate === "remote"
      ? `remote-${d.key}`
      : gate === "pending"
        ? `status-${d.key}`
        : gate && GATE_TEXT[gate]
          ? `reason-${d.key}`
          : undefined;
  const busyTitle = gate === "busy" ? t(lang, "gate.busy", vars) : undefined;
  const label = t(lang, CMD_LABEL[cmd]);
  let aria: string | undefined;
  if (cmd === "start" && d.programme.value && d.programme.label)
    aria = t(lang, "ctl.start_prog", { programme: d.programme.label });
  else if (cmd === "cancel") aria = t(lang, "ctl.cancel_drum", vars);
  const style =
    cmd === "start" || cmd === "resume"
      ? "filled"
      : cmd === "pause"
        ? "tonal"
        : cmd === "stop"
          ? "warn"
          : "destructive";
  return html`<button
    class="btn ${style} ${role}"
    type="button"
    data-role=${role}
    data-drum=${d.key}
    data-cmd=${cmd}
    aria-disabled=${disabled ? "true" : "false"}
    aria-busy=${sendingThis ? "true" : "false"}
    aria-describedby=${ifDefined(describedBy)}
    aria-label=${ifDefined(sendingThis ? undefined : aria)}
    title=${ifDefined(busyTitle ?? aria)}
    @click=${(e: Event) =>
      disabled ? ctx.on.disabledPress() : ctx.on.command(d, cmd, e.currentTarget as HTMLElement)}
  >
    ${sendingThis
      ? html`<span class="spinner" aria-hidden="true"></span
          ><span class="lbl">${t(lang, CMD_VERB[cmd])}<span class="dots" aria-hidden="true">···</span></span>`
      : html`<ha-icon .icon=${CMD_ICON[cmd]} aria-hidden="true"></ha-icon><span class="lbl">${label}</span>`}
  </button>`;
}

export function renderControls(ctx: RenderCtx, d: DrumModel): TemplateResult | typeof nothing {
  const { primary, secondary } = visibleCommands(ctx, d);
  if (!primary && !secondary) return nothing;
  const { lang } = ctx;
  const vars = drumVars(lang, d.key);
  const st = ctx.controller.get(d.key);
  const remoteOff = ctx.sample || d.remote !== true;
  const primaryGate = primary ? gateOf(ctx, d, primary) : null;
  const reasonKey = primaryGate && GATE_TEXT[primaryGate];
  const helpOpen = ctx.ui.remoteHelp.has(d.key);
  const remoteMsg =
    d.key === "washer" && d.message === 18 ? t(lang, "remote.door", vars) : t(lang, "remote.off", vars);

  let statusLine: TemplateResult | typeof nothing = nothing;
  if (st?.phase === "waiting")
    statusLine = html`<div class="status-line" id="status-${d.key}">
      <ha-icon icon="mdi:timer-sand" aria-hidden="true"></ha-icon><span>${t(lang, "ctl.waiting", vars)}</span>
    </div>`;
  else if (st?.phase === "sending")
    statusLine = html`<div class="status-line sr-only" id="status-${d.key}">${t(lang, CMD_VERB[st.cmd])}</div>`;
  else if (st?.phase === "confirmed")
    statusLine = html`<div class="status-line ok" id="status-${d.key}">
      <ha-icon icon="mdi:check" aria-hidden="true"></ha-icon><span>${okText(ctx, d.key, st.cmd)}</span>
    </div>`;
  else if (st?.phase === "unconfirmed")
    statusLine = html`<div class="status-line warn" id="status-${d.key}">
      <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon>
      <span class="grow">${t(lang, "ctl.unconfirmed", vars)}</span>
      <button class="link-btn" type="button" @click=${() => ctx.on.dismiss(d.key)}>${t(lang, "ctl.dismiss")}</button>
    </div>`;

  return html`${renderErrorStrip(ctx, d.key)}
    <div class="controls">
      <div class="btn-row">
        ${primary ? renderButton(ctx, d, primary, "primary") : nothing}
        ${secondary ? renderButton(ctx, d, secondary, "secondary") : nothing}
      </div>
      ${remoteOff
        ? html`<div class="remote-line">
              <ha-icon icon="mdi:remote-off" aria-hidden="true"></ha-icon>
              <span class="full" id="remote-${d.key}">${remoteMsg}</span>
              <span class="short" aria-hidden="true">${t(lang, "remote.off_short")}</span>
              <button
                class="info-btn"
                type="button"
                aria-label=${t(lang, "remote.help_label")}
                title=${t(lang, "remote.help_label")}
                aria-expanded=${helpOpen ? "true" : "false"}
                aria-controls="remote-help-${d.key}"
                @click=${() => ctx.on.toggle("remoteHelp", d.key)}
              >
                <ha-icon icon="mdi:information-outline" aria-hidden="true"></ha-icon>
              </button>
            </div>
            ${helpOpen
              ? html`<p class="remote-help" id="remote-help-${d.key}">${t(lang, "remote.help", vars)}</p>`
              : nothing}`
        : reasonKey
          ? html`<div class="reason" id="reason-${d.key}">
              <ha-icon icon="mdi:information-outline" aria-hidden="true"></ha-icon><span>${t(lang, reasonKey)}</span>
            </div>`
          : nothing}
      ${statusLine}
    </div>`;
}

function labelRow(ctx: RenderCtx, d: DrumModel, v: DrumView): TemplateResult {
  const rest = v.eyebrow.startsWith(v.name) ? v.eyebrow.slice(v.name.length) : v.eyebrow === v.name ? "" : ` · ${v.eyebrow}`;
  const showRemoteOn =
    ctx.model.controlsExist && ctx.config.show_controls !== "never" && d.remote === true && !ctx.model.machineOff;
  return html`<div class="label-row">
    <ha-icon
      class="drum-icon ${v.iconMuted ? "muted" : ""} ${v.doneAnim ? "done-anim" : ""}"
      .icon=${v.icon}
      aria-hidden="true"
    ></ha-icon>
    ${v.pulse ? html`<span class="dot pulse" aria-hidden="true"></span>` : nothing}
    <span class="eyebrow ellipsis"><span id="name-${d.key}">${v.name}</span>${rest}</span>
    <span class="label-icons">
      ${showRemoteOn
        ? html`<ha-icon icon="mdi:remote" title=${t(ctx.lang, "remote.on")} aria-label=${t(ctx.lang, "remote.on")}></ha-icon>`
        : nothing}
    </span>
  </div>`;
}

export function renderTile(ctx: RenderCtx, d: DrumModel): TemplateResult {
  const v = ctx.views[d.key];
  const tinted = v.tint !== null;
  const tintCls = v.tint ? `t-${v.tint}` : "";
  const showHint = !!v.programmeChip && d.status === "idle";
  return html`<section class="tile ${tintCls} ${tinted ? "tinted" : ""}" role="group" aria-labelledby="name-${d.key}">
    <div
      class="summary"
      role="button"
      tabindex="0"
      aria-label=${v.aria}
      @click=${() => ctx.on.tap(d)}
      @keydown=${keyActivate(() => ctx.on.tap(d))}
    >
      ${labelRow(ctx, d, v)}
      ${keyed(
        v.hero,
        html`<div class="hero ${v.heroMuted ? "muted" : ""}" aria-hidden="true">
          ${v.heroApprox ? html`<span class="tilde">~</span>` : nothing}${v.hero}
        </div>`,
      )}
      ${v.support
        ? html`<div class="support ${v.supportIcon ? "blocking" : ""}" aria-hidden="true">
            ${v.supportIcon ? html`<ha-icon .icon=${v.supportIcon}></ha-icon>` : nothing}
            <span class="ellipsis" title=${v.support}>${v.support}</span>
          </div>`
        : nothing}
    </div>
    ${v.programmeChip
      ? html`<div class="prog-line">
          <button
            class="chip prog-chip"
            type="button"
            title=${v.programmeChip.label}
            @click=${() => ctx.on.moreInfo(v.programmeChip!.entity)}
          >
            <span>${v.programmeChip.label}</span><ha-icon icon="mdi:chevron-down" aria-hidden="true"></ha-icon>
          </button>
          ${showHint ? html`<span class="hint">${t(ctx.lang, "support.pick_hint")}</span>` : nothing}
        </div>`
      : nothing}
    ${ctx.config.show_stepper ? renderStepper(ctx.lang, d.steps) : nothing}
    ${renderNotices(ctx, d)}
    ${renderControls(ctx, d)}
  </section>`;
}

/** Compact layout: one 40px row per drum. */
export function renderCompactRow(ctx: RenderCtx, d: DrumModel | null, text: string, aria: string, icon: string, attention: string | null): TemplateResult {
  return html`<div
    class="crow"
    role="button"
    tabindex="0"
    aria-label=${aria}
    @click=${() => d && ctx.on.tap(d)}
    @keydown=${keyActivate(() => d && ctx.on.tap(d))}
  >
    <ha-icon .icon=${icon} class="drum-icon muted" aria-hidden="true"></ha-icon>
    <span class="chero ellipsis" aria-hidden="true">${text}</span>
    ${attention ? html`<span class="adot ${attention}" aria-hidden="true"></span>` : nothing}
  </div>`;
}

/** Stacked layout: the idle drum collapsed to a 56px row. */
export function renderCollapsedRow(ctx: RenderCtx, d: DrumModel): TemplateResult {
  const v = ctx.views[d.key];
  const { primary } = visibleCommands(ctx, d);
  const canStart = primary === "start" && gateOf(ctx, d, "start") === null;
  return html`<div class="collapsed" role="group" aria-labelledby="name-${d.key}">
    <div
      class="summary"
      role="button"
      tabindex="0"
      aria-label=${v.aria}
      @click=${() => ctx.on.tap(d)}
      @keydown=${keyActivate(() => ctx.on.tap(d))}
    >
      <ha-icon class="drum-icon" .icon=${v.icon} aria-hidden="true"></ha-icon>
      <span class="ellipsis" aria-hidden="true"><span id="name-${d.key}">${v.name}</span> · ${v.short}</span>
      ${v.attention ? html`<span class="adot ${v.attention}" aria-hidden="true"></span>` : nothing}
    </div>
    ${canStart
      ? html`<button
          class="btn tonal icon-only"
          type="button"
          data-role="primary"
          data-drum=${d.key}
          data-cmd="start"
          aria-label=${d.programme.label ? t(ctx.lang, "ctl.start_prog", { programme: d.programme.label }) : t(ctx.lang, "ctl.start")}
          title=${t(ctx.lang, "ctl.start")}
          @click=${(e: Event) => ctx.on.command(d, "start", e.currentTarget as HTMLElement)}
        >
          <ha-icon icon="mdi:play" aria-hidden="true"></ha-icon>
        </button>`
      : nothing}
    <button
      class="btn icon-only"
      type="button"
      aria-expanded="false"
      aria-label=${t(ctx.lang, "a11y.show_drum", drumVars(ctx.lang, d.key))}
      @click=${() => ctx.on.toggle("expanded", d.key)}
    >
      <ha-icon icon="mdi:chevron-down" aria-hidden="true"></ha-icon>
    </button>
  </div>`;
}
