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
import { noticeText, type DrumView } from "../view";
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
  busy: "gate.busy",
  fault: "gate.fault",
  door: "gate.door",
  programme: "gate.programme",
  applying: "gate.applying",
};

export const okText = (ctx: Pick<RenderCtx, "lang">, d: DrumModel["key"], cmd: Command) =>
  t(ctx.lang, OK_KEY[cmd], drumVars(ctx.lang, d));

/** Remote-control line text for a drum whose flag is not "on". */
export function remoteText(ctx: Pick<RenderCtx, "lang" | "sample">, d: DrumModel): string {
  const vars = drumVars(ctx.lang, d.key);
  if (!ctx.sample && d.remoteState === "missing") return t(ctx.lang, "remote.missing", vars);
  if (!ctx.sample && d.remoteState === "unknown") return t(ctx.lang, "remote.unknown", vars);
  return d.key === "washer" && d.message === 18 ? t(ctx.lang, "remote.door", vars) : t(ctx.lang, "remote.off", vars);
}

/** Why a gated control can't be used, in words (announced on a disabled press). */
export function gateText(ctx: RenderCtx, d: DrumModel, gate: GateReason): string {
  const vars = drumVars(ctx.lang, d.key);
  if (gate === "remote") return remoteText(ctx, d);
  if (gate === "pending") return t(ctx.lang, "ctl.waiting", vars);
  const key = GATE_TEXT[gate];
  return key ? t(ctx.lang, key, vars) : "";
}

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

/** Accessible name for a command button; set whenever the visible label can be hidden. */
function commandName(ctx: RenderCtx, d: DrumModel, cmd: Command): string | undefined {
  const vars = drumVars(ctx.lang, d.key);
  if (cmd === "start" && d.programme.value && d.programme.label)
    return t(ctx.lang, "ctl.start_prog", { programme: d.programme.label });
  if (cmd === "cancel") return t(ctx.lang, "ctl.cancel_drum", vars);
  if (cmd === "cancel_scheduled") return t(ctx.lang, "ctl.cancel_scheduled_drum", vars);
  if (cmd === "stop") return t(ctx.lang, "ctl.stop_drum", vars);
  return undefined;
}

function renderButton(
  ctx: RenderCtx,
  d: DrumModel,
  cmd: Command,
  role: "primary" | "secondary",
  /** Icon-only below 320px tile width: only when a labelled primary sits next to it. */
  collapsible: boolean,
): TemplateResult {
  const { lang } = ctx;
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
  const label = t(lang, CMD_LABEL[cmd]);
  const name = commandName(ctx, d, cmd);
  const style =
    cmd === "start" || cmd === "resume"
      ? "filled"
      : cmd === "pause"
        ? "tonal"
        : cmd === "stop"
          ? "warn"
          : "destructive";
  return html`<button
    class="btn ${style} ${role} ${collapsible ? "collapsible" : ""}"
    type="button"
    data-role=${role}
    data-drum=${d.key}
    data-cmd=${cmd}
    data-focus-key="cmd-${d.key}-${cmd}"
    aria-disabled=${disabled ? "true" : "false"}
    aria-busy=${sendingThis ? "true" : "false"}
    aria-describedby=${ifDefined(describedBy)}
    aria-label=${ifDefined(sendingThis ? undefined : name)}
    title=${ifDefined(name)}
    @click=${(e: Event) =>
      disabled
        ? ctx.on.disabledPress(d, cmd, gate)
        : ctx.on.command(d, cmd, e.currentTarget as HTMLElement)}
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
  // The reason line explains the first gated control (primary first, then the secondary).
  const gated = [primary, secondary]
    .filter((c): c is Command => !!c)
    .map((c) => gateOf(ctx, d, c))
    .find((g) => g !== null && !!GATE_TEXT[g]);
  const reasonKey = gated ? GATE_TEXT[gated] : undefined;
  const helpOpen = ctx.ui.remoteHelp.has(d.key);
  const unreadable = !ctx.sample && (d.remoteState === "missing" || d.remoteState === "unknown");

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
      <button class="link-btn" type="button" data-focus-key="status-${d.key}" @click=${() => ctx.on.dismiss(d.key)}>
        ${t(lang, "ctl.dismiss")}
      </button>
    </div>`;

  return html`${renderErrorStrip(ctx, d.key)}
    <div class="controls">
      <div class="btn-row">
        ${primary ? renderButton(ctx, d, primary, "primary", false) : nothing}
        ${secondary ? renderButton(ctx, d, secondary, "secondary", !!primary) : nothing}
      </div>
      ${remoteOff
        ? html`<div class="remote-line">
              <ha-icon icon=${unreadable ? "mdi:help-circle-outline" : "mdi:remote-off"} aria-hidden="true"></ha-icon>
              <span class="full" id="remote-${d.key}">${remoteText(ctx, d)}</span>
              ${unreadable
                ? d.remoteState === "missing" && ctx.isAdmin
                  ? html`<button class="link-btn" type="button" @click=${() => ctx.on.openDevice()}>
                      ${t(lang, "remote.open_device")}
                    </button>`
                  : nothing
                : html`<button
                    class="info-btn"
                    type="button"
                    aria-label=${t(lang, "remote.help_label")}
                    title=${t(lang, "remote.help_label")}
                    aria-expanded=${helpOpen ? "true" : "false"}
                    aria-controls="remote-help-${d.key}"
                    @click=${() => ctx.on.toggle("remoteHelp", d.key)}
                  >
                    <ha-icon icon="mdi:information-outline" aria-hidden="true"></ha-icon>
                  </button>`}
            </div>
            ${helpOpen && !unreadable
              ? html`<p class="remote-help" id="remote-help-${d.key}">${t(lang, "remote.help", vars)}</p>`
              : nothing}`
        : reasonKey
          ? html`<div class="reason" id="reason-${d.key}">
              <ha-icon icon="mdi:information-outline" aria-hidden="true"></ha-icon><span>${t(lang, reasonKey, vars)}</span>
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
    ${v.pulse
      ? // Keyed on the phase: the pulse runs a few times per phase change, not for hours.
        keyed(`${d.status}-${d.phase}`, html`<span class="dot pulse" aria-hidden="true"></span>`)
      : nothing}
    <span class="eyebrow ellipsis"><span id="name-${d.key}">${v.name}</span>${rest}</span>
    <span class="label-icons">
      ${d.doorLocked === true && (d.isActive || d.isDoneLike) && !ctx.model.machineOff
        ? // The summary's sentence says the door is locked (view.ts, same condition); visual only.
          html`<ha-icon icon="mdi:lock" title=${t(ctx.lang, "door.locked")} aria-hidden="true"></ha-icon>`
        : nothing}
      ${showRemoteOn
        ? // The state is in the summary's sentence ("remote control on"); the icon is visual only.
          html`<ha-icon icon="mdi:remote" title=${t(ctx.lang, "remote.on")} aria-hidden="true"></ha-icon>`
        : nothing}
    </span>
  </div>`;
}

/** The expand/collapse toggle of a foldable drum; same focus key in both states. */
export function renderDrumToggle(ctx: RenderCtx, d: DrumModel, expanded: boolean): TemplateResult {
  const vars = drumVars(ctx.lang, d.key);
  const label = t(ctx.lang, expanded ? "a11y.hide_drum" : "a11y.show_drum", vars);
  return html`<button
    class="btn icon-only drum-toggle"
    type="button"
    data-focus-key="expand-${d.key}"
    aria-expanded=${expanded ? "true" : "false"}
    aria-label=${label}
    title=${label}
    @click=${() => ctx.on.toggle("expanded", d.key)}
  >
    <ha-icon icon=${expanded ? "mdi:chevron-up" : "mdi:chevron-down"} aria-hidden="true"></ha-icon>
  </button>`;
}

export function renderTile(ctx: RenderCtx, d: DrumModel, opts: { collapsible?: boolean } = {}): TemplateResult {
  const v = ctx.views[d.key];
  const tinted = v.tint !== null;
  const tintCls = v.tint ? `t-${v.tint}` : "";
  const chip = v.programmeChip;
  const showHint = !!chip && chip.empty && d.status === "idle";
  return html`<section
    class="tile ${tintCls} ${tinted ? "tinted" : ""} ${opts.collapsible ? "has-toggle" : ""}"
    role="group"
    aria-labelledby="name-${d.key}"
  >
    <div
      class="summary"
      role="button"
      tabindex="0"
      data-focus-key="summary-${d.key}"
      data-summary=${d.key}
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
            <span class="clamp2">${v.support}</span>
          </div>`
        : nothing}
    </div>
    ${opts.collapsible ? renderDrumToggle(ctx, d, true) : nothing}
    ${chip
      ? html`<div class="prog-line">
          <button
            class="chip prog-chip"
            type="button"
            data-focus-key="prog-${d.key}"
            aria-haspopup="dialog"
            aria-label=${chip.empty
              ? t(ctx.lang, "prog.chip_label_none")
              : t(ctx.lang, "prog.chip_label", { programme: chip.label })}
            aria-describedby=${ifDefined(showHint ? `hint-${d.key}` : undefined)}
            @click=${() => ctx.on.moreInfo(chip.entity)}
          >
            <span>${chip.label}</span><ha-icon icon="mdi:pencil-outline" aria-hidden="true"></ha-icon>
          </button>
          ${chip.meta ? html`<span class="prog-meta" aria-hidden="true">${chip.meta}</span>` : nothing}
          ${showHint ? html`<span class="hint" id="hint-${d.key}">${t(ctx.lang, "support.pick_hint")}</span>` : nothing}
        </div>`
      : nothing}
    ${renderDetails(ctx, d)}
    ${ctx.config.show_stepper ? renderStepper(ctx.lang, d.steps) : nothing}
    ${renderNotices(ctx, d)}
    ${renderControls(ctx, d)}
  </section>`;
}

/** What the drum is running with: one small chip per setting, each opening its entity. */
export function renderDetails(ctx: RenderCtx, d: DrumModel): TemplateResult | typeof nothing {
  const items = ctx.views[d.key].details;
  if (!items.length) return nothing;
  const vars = drumVars(ctx.lang, d.key);
  const editing = items.some((x) => x.editable);
  return html`<ul class="details ${editing ? "editing" : ""}" aria-label=${t(ctx.lang, "detail.list", vars)}>
    ${items.map(
      (x) => html`<li>
        <button
          class="detail ${x.editable ? "editable" : ""}"
          type="button"
          data-detail=${x.key}
          data-focus-key="detail-${d.key}-${x.key}"
          aria-label=${x.spoken}
          aria-haspopup=${ifDefined(x.editable ? "dialog" : undefined)}
          title=${x.spoken}
          ?disabled=${!x.entity}
          @click=${() => ctx.on.moreInfo(x.entity)}
        >
          <ha-icon .icon=${x.icon} aria-hidden="true"></ha-icon><span>${x.text}</span>
          ${x.editable ? html`<ha-icon class="edit" icon="mdi:pencil-outline" aria-hidden="true"></ha-icon>` : nothing}
        </button>
      </li>`,
    )}
  </ul>`;
}

const DRUM_ICON: Record<DrumModel["key"], string> = { washer: "mdi:washing-machine", dryer: "mdi:tumble-dryer" };

/** Small notice marker: shape (not only colour) says "something to look at". */
const noticeMark = (show: boolean) =>
  show ? html`<ha-icon class="aicon" icon="mdi:alert-circle-outline" aria-hidden="true"></ha-icon>` : nothing;

/** Compact layout: one 40px row per drum. The drum icon always says which drum it is. */
export function renderCompactRow(
  ctx: RenderCtx,
  d: DrumModel | null,
  text: string,
  aria: string,
  opts: { icon?: string; tint?: string | null; notice?: boolean; onTap?: () => void } = {},
): TemplateResult {
  const icon = opts.icon ?? (d ? DRUM_ICON[d.key] : "mdi:washing-machine");
  const tap = opts.onTap ?? (() => d && ctx.on.tap(d));
  return html`<div
    class="crow ${opts.tint ? `t-${opts.tint}` : ""}"
    role="button"
    tabindex="0"
    data-focus-key="crow-${d?.key ?? "all"}"
    aria-label=${aria}
    @click=${tap}
    @keydown=${keyActivate(tap)}
  >
    <ha-icon .icon=${icon} class="drum-icon ${opts.tint ? "" : "muted"}" aria-hidden="true"></ha-icon>
    <span class="chero ellipsis" aria-hidden="true">${text}</span>
    ${noticeMark(!!opts.notice)}
  </div>`;
}

/** Stacked layout: the resting drum folded to a 56px row. Start is reached by expanding it. */
export function renderCollapsedRow(ctx: RenderCtx, d: DrumModel): TemplateResult {
  const v = ctx.views[d.key];
  const first = ctx.config.show_notices ? d.notices[0] : undefined;
  return html`<div class="collapsed" role="group" aria-labelledby="name-${d.key}">
    <div
      class="summary"
      role="button"
      tabindex="0"
      data-focus-key="summary-${d.key}"
      data-summary=${d.key}
      aria-label=${v.aria}
      @click=${() => ctx.on.tap(d)}
      @keydown=${keyActivate(() => ctx.on.tap(d))}
    >
      <ha-icon class="drum-icon" .icon=${DRUM_ICON[d.key]} aria-hidden="true"></ha-icon>
      <span class="clamp2" aria-hidden="true"
        ><span id="name-${d.key}">${v.name}</span> · ${v.short}${first
          ? html` · <span class="cnotice">${noticeText(ctx.lang, first)}</span>`
          : nothing}</span
      >
      ${noticeMark(!!first)}
    </div>
    ${renderDrumToggle(ctx, d, false)}
  </div>`;
}
