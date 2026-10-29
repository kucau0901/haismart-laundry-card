import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import type { DrumKey, HomeAssistant, Layout, LaundryCardConfig } from "./types";
import {
  type Command,
  type DeviceIndex,
  type DrumModel,
  type LaundryModel,
  type ModelMemory,
  type Resolution,
  allHaismartEntityIds,
  buildIndex,
  buttonFor,
  derive,
  deviceDisplayName,
  gateFor,
  needsTick,
  resolveDevice,
  trackedEntityIds,
} from "./model";
import { CommandController } from "./controls";
import { drumVars, resolveLang, t, type Lang } from "./localize";
import { timeCtx } from "./time";
import { type DrumView, drumView, headline, resolvedTimeDisplay, totalsLine, type ViewCtx } from "./view";
import { cardStyles } from "./styles";
import type { Handlers, RenderCtx, ResolvedConfig, UiState } from "./ui/context";
import { faultLines, renderFaultBanner, renderOffBlock, renderSetupAlert } from "./ui/parts";
import { gateText, okText, renderCollapsedRow, renderCompactRow, renderTile, visibleCommands } from "./ui/tile";
import { type DialogState, renderDialogContent } from "./ui/dialog";
import { buildHass } from "./mock/build-hass";
import { SAMPLE_VALUES } from "./sample";
import "./editor";

export const CARD_TYPE = "haismart-laundry-card";
export const EDITOR_TYPE = "haismart-laundry-card-editor";
const VERSION = typeof __CARD_VERSION__ === "string" ? __CARD_VERSION__ : "dev";
const DOCS_URL = "https://github.com/kucau0901/haismart-laundry-card#readme";

export const DEFAULTS: Omit<ResolvedConfig, "type"> = {
  layout: "auto",
  time_display: "both",
  drums: "both",
  order: "washer_first",
  collapse_idle: true,
  show_notices: true,
  show_stepper: true,
  show_details: true,
  show_totals: false,
  show_controls: "auto",
  confirm_start: false,
  off_style: "keep",
  language: "auto",
  tap_action: { action: "more-info" },
};

const ENUMS: Record<string, readonly string[]> = {
  layout: ["auto", "full", "stacked", "compact"],
  time_display: ["finish", "remaining", "both"],
  drums: ["both", "washer", "dryer"],
  order: ["washer_first", "dryer_first"],
  show_controls: ["auto", "never"],
  off_style: ["keep", "collapse"],
  language: ["auto", "en", "ms"],
};
const BOOLS = ["collapse_idle", "show_notices", "show_stepper", "show_details", "show_totals", "confirm_start"];
const STRINGS = ["device_id", "title"];
const KNOWN = new Set(["type", "tap_action", "grid_options", "view_layout", "visibility", "card_mod", ...Object.keys(ENUMS), ...BOOLS, ...STRINGS]);
const warnedKeys = new Set<string>();

/** Validates types only; unknown keys are kept and warned about once. */
export function validateConfig(config: LaundryCardConfig): ResolvedConfig {
  if (!config || typeof config !== "object") throw new Error("haismart-laundry-card: invalid configuration");
  for (const [key, allowed] of Object.entries(ENUMS)) {
    const v = config[key];
    if (v !== undefined && !allowed.includes(v as string))
      throw new Error(`haismart-laundry-card: "${key}" must be one of ${allowed.join(", ")}`);
  }
  for (const key of BOOLS) {
    const v = config[key];
    if (v !== undefined && typeof v !== "boolean") throw new Error(`haismart-laundry-card: "${key}" must be true or false`);
  }
  for (const key of STRINGS) {
    const v = config[key];
    if (v !== undefined && v !== null && typeof v !== "string") throw new Error(`haismart-laundry-card: "${key}" must be text`);
  }
  if (config.tap_action !== undefined && (typeof config.tap_action !== "object" || config.tap_action === null))
    throw new Error('haismart-laundry-card: "tap_action" must be an action object');
  for (const key of Object.keys(config)) {
    if (!KNOWN.has(key) && !warnedKeys.has(key)) {
      warnedKeys.add(key);
      console.warn(`haismart-laundry-card: unknown option "${key}" (kept, ignored)`);
    }
  }
  return { ...DEFAULTS, ...config } as ResolvedConfig;
}

/**
 * Side by side from 600px: below that each tile would be under ~290px and its stepper, remote
 * line and support text get cramped. Stacked from 280px, compact below.
 */
export const FULL_MIN_WIDTH = 600;
export const STACKED_MIN_WIDTH = 280;

/** Width -> layout with 8px hysteresis around the breakpoints. */
export function layoutForWidth(width: number, prev?: Layout): Layout {
  const target: Layout = width >= FULL_MIN_WIDTH ? "full" : width >= STACKED_MIN_WIDTH ? "stacked" : "compact";
  if (!prev || prev === target) return target;
  const H = 8;
  if ((prev === "full" && target === "stacked") || (prev === "stacked" && target === "full"))
    return Math.abs(width - FULL_MIN_WIDTH) < H ? prev : target;
  if ((prev === "stacked" && target === "compact") || (prev === "compact" && target === "stacked"))
    return Math.abs(width - STACKED_MIN_WIDTH) < H ? prev : target;
  return target;
}

const fire = (node: EventTarget, type: string, detail?: unknown) =>
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
const haptic = (type: "warning" | "selection" | "light") => fire(window, "haptic", type);

export class HaismartLaundryCard extends LitElement {
  static override styles = cardStyles;
  static override properties = {
    hass: { attribute: false },
    preview: { type: Boolean },
    editMode: { attribute: false },
    _config: { state: true },
    _layout: { state: true },
    _tick: { state: true },
    _dialog: { state: true },
    _announce: { state: true },
    _rev: { state: true },
  };

  hass?: HomeAssistant;
  preview = false;
  editMode = false;
  private _config?: ResolvedConfig;
  private _layout?: Layout;
  private _tick = 0;
  private _dialog?: DialogState;
  private _announce = "";
  private _rev = 0;

  private _memory: ModelMemory = {};
  private _ui: UiState = {
    remoteHelp: new Set(),
    noticesOpen: new Set(),
    detailsOpen: new Set(),
    expanded: new Set(),
    faultMore: false,
    hintSeen: new Set(),
  };
  private _resolution: Resolution = { kind: "loading" };
  private _index?: DeviceIndex;
  private _model?: LaundryModel;
  private _views?: Record<DrumKey, DrumView>;
  private _tracked: string[] = [];
  private _sampleHass?: HomeAssistant;
  private _sampleActive = false;
  private _now = Date.now();
  private _prevDone: Partial<Record<DrumKey, boolean>> = {};
  private _prevRemote: Partial<Record<DrumKey, boolean>> = {};
  /** Fault set last seen (undefined before the first model): announcements follow changes. */
  private _faultSig?: string;
  /** Text of the persistent role=alert region. */
  private _alert = "";
  /** data-focus-key of the element focused before this render (focus recovery). */
  private _focusKey?: string;
  private _ro?: ResizeObserver;
  private _tickTimer?: ReturnType<typeof setTimeout>;
  private _gateTimer?: ReturnType<typeof setTimeout>;
  private _focusPrimary?: { drum: string; cmd: string };
  private _collapsedNow = false;

  private _controller = new CommandController({
    requestUpdate: () => {
      this._rev++;
    },
    onConfirmed: (drum, cmd) => this._say(okText({ lang: this._lang }, drum, cmd)),
    onUnconfirmed: (drum) => this._say(t(this._lang, "ctl.unconfirmed", drumVars(this._lang, drum))),
    // Errors: the inline role=alert strip next to the control (with Retry and Details) is the only
    // channel. No toast: it would repeat the strip and cover the bottom sheet on phones.
  });

  // ------------------------------------------------------------------ Lovelace API

  setConfig(config: LaundryCardConfig): void {
    this._config = validateConfig(config);
  }

  static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TYPE);
  }

  static getStubConfig(hass?: HomeAssistant): LaundryCardConfig {
    const res = resolveDevice(hass, {});
    return res.kind === "ok" ? { type: `custom:${CARD_TYPE}`, device_id: res.deviceId } : { type: `custom:${CARD_TYPE}` };
  }

  getCardSize(): number {
    const layout = this._effLayout();
    if (layout === "compact") return 3;
    if (this._model?.machineOff) return this._config?.off_style === "collapse" ? 1 : 5;
    if (layout === "stacked") return this._collapsedNow ? 6 : 9;
    return 6;
  }

  getGridOptions() {
    // Compact is ~145px with its title and ~180px while the machine is off: a fixed 2 rows
    // (120px) would clip it, so its height follows the content too.
    return this._config?.layout === "compact"
      ? { columns: 6, rows: "auto", min_columns: 3, min_rows: 2 }
      : { columns: 12, rows: "auto", min_columns: 3, min_rows: 2 };
  }

  // ------------------------------------------------------------------ lifecycle

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof ResizeObserver !== "undefined" && !this._ro) {
      this._ro = new ResizeObserver((entries) => {
        const w = entries[0]?.contentRect.width;
        if (!w) return;
        const next = layoutForWidth(w, this._layout);
        if (next !== this._layout) this._layout = next;
      });
      this._ro.observe(this);
    }
    // Re-attached (view switch, edit mode, app foregrounded): re-arm the command timers from their
    // deadlines and re-run _scheduleTimers so countdowns tick again.
    this._controller.resume();
    if (this._config) this.requestUpdate();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._ro?.disconnect();
    this._ro = undefined;
    clearTimeout(this._tickTimer);
    clearTimeout(this._gateTimer);
    this._tickTimer = undefined;
    this._gateTimer = undefined;
    this._controller.dispose();
  }

  private get _lang(): Lang {
    return resolveLang(this._config?.language, this.hass?.locale?.language ?? this.hass?.language);
  }

  private _effLayout(): Layout {
    const forced = this._config?.layout;
    if (forced && forced !== "auto") return forced;
    return this._layout ?? "full";
  }

  protected override shouldUpdate(changed: PropertyValues): boolean {
    if (!this._config) return false;
    if (!changed.has("hass") || changed.size > 1) return true;
    const old = changed.get("hass") as HomeAssistant | undefined;
    const h = this.hass;
    if (!old || !h) return true;
    if (
      old.entities !== h.entities ||
      old.devices !== h.devices ||
      old.locale !== h.locale ||
      old.language !== h.language
    )
      return true;
    if (this._sampleActive) return false;
    // Not resolved yet (no device found, not a laundry device): discovery depends on live state
    // attributes, so watch every haismart entity until it resolves.
    const ids = this._tracked.length ? this._tracked : allHaismartEntityIds(h);
    return ids.some((eid) => old.states?.[eid] !== h.states?.[eid]);
  }

  protected override willUpdate(): void {
    this._now = Date.now();
    const active = this.shadowRoot?.activeElement as HTMLElement | null | undefined;
    this._focusKey = active?.dataset?.focusKey;
    this._focusPrimary =
      active?.dataset?.role === "primary" ? { drum: active.dataset.drum ?? "", cmd: active.dataset.cmd ?? "" } : undefined;

    const cfg = this._config!;
    let hass = this.hass;
    this._resolution = resolveDevice(hass, cfg);
    this._sampleActive = false;
    if (this.preview && (this._resolution.kind === "none" || (this._resolution.kind === "loading" && !hass?.entities))) {
      this._sampleHass ??= buildHass(SAMPLE_VALUES, {
        controls: true,
        language: hass?.locale?.language,
        timeFormat: hass?.locale?.time_format ?? "language",
        isAdmin: false,
      });
      hass = this._sampleHass;
      this._resolution = resolveDevice(hass, {});
      this._sampleActive = true;
    }
    if (this._resolution.kind !== "ok" || !hass) {
      this._model = undefined;
      this._tracked = [];
      return;
    }
    this._index = buildIndex(hass, this._resolution.deviceId);
    this._tracked = trackedEntityIds(this._index, hass);
    this._model = derive(hass, this._index, { now: this._now, memory: this._memory });
    this._updateFaultAlert(this._model);
    const vc = this._viewCtx();
    this._views = {
      washer: drumView(this._model, this._model.washer, vc),
      dryer: drumView(this._model, this._model.dryer, vc),
    };
  }

  private _viewCtx(): ViewCtx {
    const lang = this._lang;
    const hass = this._sampleActive ? this._sampleHass : this.hass;
    return {
      lang,
      time: timeCtx(hass, lang),
      now: this._now,
      timeDisplay: resolvedTimeDisplay(this._config!),
      controlsVisible:
        this._config!.show_controls !== "never" && this._effLayout() !== "compact" && !!this._model?.controlsExist,
      showDetails: this._config!.show_details,
    };
  }

  /** Fills the persistent alert region when the set of active faults changes (not on first render). */
  private _updateFaultAlert(m: LaundryModel): void {
    const f = m.fault;
    const sig = f.on && !m.machineOff ? JSON.stringify([f.faults, f.codeList]) : "";
    if (this._faultSig !== undefined && sig !== this._faultSig) {
      const lang = this._lang;
      this._alert = sig ? `${t(lang, "fault.title")}: ${faultLines(lang, f).lines.join("; ")}` : "";
    }
    this._faultSig = sig;
  }

  /** Where focus goes when the focused element was removed by a re-render. */
  private _focusFallback(key: string | undefined, drum?: DrumKey): HTMLElement | null {
    const root = this.shadowRoot;
    if (!root) return null;
    const q = (sel: string) => root.querySelector<HTMLElement>(sel);
    if (key) {
      const same = q(`[data-focus-key="${key}"]`);
      if (same) return same;
      const m = /^(cmd|strip|status|notices-more|prog|expand|summary|crow)-(washer|dryer)/.exec(key);
      if (m) drum = m[2] as DrumKey;
      if (m && (m[1] === "strip" || m[1] === "status")) {
        const ctl = q(`[data-role="primary"][data-drum="${drum}"]`) ?? q(`[data-role="secondary"][data-drum="${drum}"]`);
        if (ctl) return ctl;
      }
    }
    if (drum) {
      const summary = q(`[data-summary="${drum}"]`) ?? q(`[data-focus-key="crow-${drum}"]`);
      if (summary) return summary;
    }
    return q('[data-focus-key="title"]') ?? q('[data-focus-key="off"]');
  }

  protected override updated(): void {
    const m = this._model;
    // Dialog: open/close and the live re-check.
    const dlg = this.shadowRoot?.querySelector("dialog");
    if (dlg) {
      if (this._dialog && !dlg.open) {
        try {
          dlg.showModal();
        } catch {
          dlg.setAttribute("open", "");
        }
        haptic("warning");
        (dlg.querySelector("[data-safe]") as HTMLElement | null)?.focus();
      }
    }
    if (this._dialog && (!m || m.machineOff)) {
      this._closeDialog(true);
      this._say(t(this._lang, "a11y.dialog_closed_off"));
    }

    if (!m) return;
    this._controller.observe([m.washer, m.dryer]);

    // Focus follows the primary control when a re-render swaps it (Start -> Pause).
    if (this._focusPrimary) {
      const { drum, cmd } = this._focusPrimary;
      const next = this.shadowRoot?.querySelector<HTMLElement>(`[data-role="primary"][data-drum="${drum}"]`);
      if (next && next.dataset.cmd !== cmd && this.shadowRoot?.activeElement !== next) next.focus();
      this._focusPrimary = undefined;
    }
    // Focus recovery: the focused control was removed (expand/collapse swap, error strip
    // dismissed, Cancel gone once the drum went idle). Send focus to a defined neighbour instead
    // of letting it fall to <body>.
    if (this._focusKey && !this._dialog && this.shadowRoot && !this.shadowRoot.activeElement)
      this._focusFallback(this._focusKey)?.focus();
    this._focusKey = undefined;

    // Polite announcements: done transitions and remote becoming available.
    for (const d of [m.washer, m.dryer]) {
      const wasDone = this._prevDone[d.key];
      if (wasDone === false && d.isDoneLike) this._say(t(this._lang, "a11y.drum_done", drumVars(this._lang, d.key)));
      this._prevDone[d.key] = d.isDoneLike;
      const wasRemote = this._prevRemote[d.key];
      if (wasRemote === false && d.remote === true && this._controlsShown(d))
        this._say(t(this._lang, "ctl.available", drumVars(this._lang, d.key)));
      if (d.remote !== undefined) this._prevRemote[d.key] = d.remote;
      if (d.status === "idle") this._ui.hintSeen.add(d.key);
    }

    this._scheduleTimers(m);
  }

  private _controlsShown(d: DrumModel): boolean {
    const ctx = this._renderCtx();
    if (!ctx) return false;
    const v = visibleCommands(ctx, d);
    return !!(v.primary || v.secondary);
  }

  private _scheduleTimers(m: LaundryModel): void {
    if (needsTick(m) && this.isConnected) {
      if (!this._tickTimer) {
        const ms = 60_000 - (Date.now() % 60_000) + 50;
        this._tickTimer = setTimeout(() => {
          this._tickTimer = undefined;
          this._tick++; // minute tick: re-derive countdowns
        }, ms);
      }
    } else if (this._tickTimer) {
      clearTimeout(this._tickTimer);
      this._tickTimer = undefined;
    }
    // Gate 7 ("Applying programme…") re-evaluates 5 s after the programme changed.
    const pending = [m.washer, m.dryer]
      .map((d) => d.programme.lastChanged)
      .filter((v): v is number => v !== undefined && this._now - v < 5000)
      .map((v) => v + 5000 - this._now);
    if (pending.length && !this._gateTimer && this.isConnected) {
      this._gateTimer = setTimeout(() => {
        this._gateTimer = undefined;
        this._rev++;
      }, Math.max(50, Math.min(...pending) + 50));
    }
  }

  private _say(text: string): void {
    // Toggle a zero-width suffix so a repeated message is announced again.
    this._announce = this._announce.endsWith("​") ? text : `${text}​`;
  }

  // ------------------------------------------------------------------ actions

  private _handlers: Handlers = {
    tap: (d) => {
      if (!d.phaseEntity || this._sampleActive) return;
      const tap_action = this._config?.tap_action ?? { action: "more-info" };
      fire(this, "hass-action", { config: { entity: d.phaseEntity, tap_action }, action: "tap" });
    },
    moreInfo: (entityId) => {
      if (!entityId || this._sampleActive) return;
      fire(this, "hass-more-info", { entityId });
    },
    command: (d, cmd, trigger) => this._activate(d.key, cmd, trigger),
    disabledPress: (d, _cmd, gate) => {
      haptic("light");
      const ctx = this._renderCtx();
      if (!ctx || !gate) return;
      // Say why, for keyboard and screen-reader users; open the remote help where it applies.
      if (gate === "remote" && !ctx.sample && (d.remoteState === "off" || d.remoteState === "on") && !this._ui.remoteHelp.has(d.key)) {
        this._ui.remoteHelp.add(d.key);
        this._rev++;
      }
      this._say(gateText(ctx, d, gate));
    },
    dismiss: (drum) => this._controller.dismiss(drum),
    retry: (drum, trigger) => {
      const st = this._controller.get(drum);
      if (!st) return;
      this._controller.dismiss(drum);
      this._activate(drum, st.cmd, trigger);
    },
    toggle: (set, drum) => {
      const s = this._ui[set];
      if (s.has(drum)) s.delete(drum);
      else s.add(drum);
      this._rev++;
    },
    toggleFaultMore: () => {
      this._ui.faultMore = !this._ui.faultMore;
      this._rev++;
    },
    openDevice: () => {
      const id = this._model?.deviceId;
      if (!id || this._sampleActive || !this.hass?.user?.is_admin) return;
      history.pushState(null, "", `/config/devices/device/${id}`);
      window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
    },
  };

  private _drum(key: DrumKey): DrumModel | undefined {
    return this._model?.[key];
  }

  private _gate(d: DrumModel, cmd: Command) {
    if (!this._model) return "remote" as const;
    return gateFor(this._model, d, cmd, {
      now: Date.now(),
      sending: this._controller.sending,
      pending: this._controller.pending,
    });
  }

  private _activate(drum: DrumKey, cmd: Command, trigger?: HTMLElement): void {
    const d = this._drum(drum);
    if (!d || this._sampleActive) return;
    if (this._gate(d, cmd)) {
      haptic("light");
      return;
    }
    const confirm = cmd === "cancel" || cmd === "cancel_scheduled" || cmd === "stop" || (cmd === "start" && this._config!.confirm_start);
    if (confirm) {
      this._dialog = { drum, cmd, trigger, signature: this._signature(d, cmd) };
      return;
    }
    this._send(drum, cmd);
  }

  private _signature(d: DrumModel, cmd: Command): string {
    return `${d.status}|${this._gate(d, cmd) ?? ""}|${d.programme.value ?? ""}`;
  }

  private _send(drum: DrumKey, cmd: Command): void {
    const d = this._drum(drum);
    const hass = this.hass;
    if (!d || !hass) return;
    if (this._gate(d, cmd)) return; // re-check every gate at activation
    const entity = buttonFor(d, cmd);
    if (!entity) return;
    haptic("selection");
    void this._controller.run(hass, drum, cmd, entity);
  }

  private _closeDialog(machineOff = false): void {
    const trigger = this._dialog?.trigger;
    const drum = this._dialog?.drum;
    this._dialog = undefined;
    const dlg = this.shadowRoot?.querySelector("dialog");
    if (dlg?.open) {
      try {
        dlg.close();
      } catch {
        dlg.removeAttribute("open");
      }
    }
    // Back to the trigger; if a re-render replaced it (Retry's strip, the machine turning off),
    // to the drum's summary, or the off block / card title.
    requestAnimationFrame(() => {
      if (!machineOff && trigger?.isConnected) trigger.focus();
      else this._focusFallback(undefined, machineOff ? undefined : drum)?.focus();
    });
  }

  private _confirmDialog(): void {
    const st = this._dialog;
    if (!st) return;
    const d = this._drum(st.drum);
    if (!d || this._signature(d, st.cmd) !== st.signature) return;
    this._closeDialog();
    this._send(st.drum, st.cmd);
  }

  private _onDialogClick(ev: MouseEvent): void {
    const dlg = ev.currentTarget as HTMLDialogElement;
    if (ev.target !== dlg) return;
    const r = dlg.getBoundingClientRect();
    const inside = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
    if (!inside) this._closeDialog();
  }

  // ------------------------------------------------------------------ render

  private _renderCtx(): RenderCtx | undefined {
    if (!this._model || !this._views || !this._config) return undefined;
    return {
      lang: this._lang,
      model: this._model,
      config: this._config,
      layout: this._effLayout(),
      now: this._now,
      viewCtx: this._viewCtx(),
      views: this._views,
      controller: this._controller,
      ui: this._ui,
      on: this._handlers,
      sample: this._sampleActive,
      isAdmin: !!this.hass?.user?.is_admin && !this._sampleActive,
    };
  }

  private _drumsShown(m: LaundryModel): DrumModel[] {
    const c = this._config!;
    if (c.drums === "washer") return [m.washer];
    if (c.drums === "dryer") return [m.dryer];
    return c.order === "dryer_first" ? [m.dryer, m.washer] : [m.washer, m.dryer];
  }

  private _title(): string {
    const c = this._config!;
    // An emptied title field means "use the default", not a blank header.
    if (typeof c.title === "string" && c.title.trim()) return c.title;
    const hass = this._sampleActive ? this._sampleHass : this.hass;
    if (this._resolution.kind === "ok" && hass)
      return deviceDisplayName(hass, this._resolution.deviceId, t(this._lang, "card.default_title"));
    return t(this._lang, "card.default_title");
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this._config) return nothing;
    const lang = this._lang;
    const res = this._resolution;
    if (res.kind === "loading") return html`<ha-card class="loading" lang=${lang}></ha-card>`;
    if (res.kind !== "ok") {
      const [title, body] =
        res.kind === "none"
          ? [t(lang, "setup.none_title"), t(lang, "setup.none_body")]
          : res.kind === "removed"
            ? [t(lang, "setup.removed_title"), t(lang, "setup.removed_body")]
            : [t(lang, "setup.not_laundry", { name: res.name }), t(lang, "setup.not_laundry_body")];
      return html`<ha-card lang=${lang}>${renderSetupAlert(lang, title, body, this.editMode)}</ha-card>`;
    }
    const ctx = this._renderCtx();
    if (!ctx) return html`<ha-card class="loading" lang=${lang}></ha-card>`;
    const m = ctx.model;
    const layout = ctx.layout;
    const drums = this._drumsShown(m);
    const live = html`<div class="sr-only" aria-live="polite" aria-atomic="true">${this._announce}</div>
      <div class="sr-only" role="alert" aria-atomic="true">${this._alert}</div>`;
    this._collapsedNow = false;

    // C1: machine off, condensed variants.
    if (m.machineOff && (layout !== "full" || this._config.off_style === "collapse")) {
      const variant = this._config.off_style === "collapse" ? "collapse" : layout === "compact" ? "compact" : "stacked";
      return html`<ha-card lang=${lang} class="layout-${layout}">
        ${live} ${layout === "compact" ? this._renderCompactTitle() : nothing} ${renderOffBlock(ctx, variant)}
      </ha-card>`;
    }

    if (layout === "compact") return this._renderCompact(ctx, drums, live);

    // Full / stacked.
    const head = headline(m, drums, ctx.viewCtx);
    const title = this._title();

    let tiles: TemplateResult[];
    if (layout === "stacked" && this._config.collapse_idle && drums.length === 2) {
      const engaged = (d: DrumModel) => d.isActive || d.status === "delayed" || d.isDoneLike;
      const resting = (d: DrumModel) => d.status === "idle" || d.status === "stale" || d.status === "off";
      tiles = drums.map((d) => {
        const other = drums.find((x) => x !== d)!;
        const collapsible = resting(d) && engaged(other);
        if (collapsible && !this._ui.expanded.has(d.key)) {
          this._collapsedNow = true;
          return renderCollapsedRow(ctx, d);
        }
        return renderTile(ctx, d, { collapsible });
      });
    } else tiles = drums.map((d) => renderTile(ctx, d));

    const totals = this._config.show_totals && !m.machineOff ? totalsLine(m, lang) : null;

    return html`<ha-card lang=${lang} class="layout-${layout}">
      ${live}
      <div class="header">
        <h2 class="title" tabindex="-1" data-focus-key="title">
          <ha-icon icon="mdi:washing-machine" aria-hidden="true"></ha-icon><span class="clamp2">${title}</span>
        </h2>
        ${ctx.isAdmin
          ? html`<a
              class="dev-link"
              href="/config/devices/device/${m.deviceId}"
              aria-label=${t(lang, "a11y.open_device_for", { name: title })}
              title=${t(lang, "a11y.open_device")}
              @click=${(e: MouseEvent) => {
                e.preventDefault();
                this._handlers.openDevice();
              }}
              ><ha-icon icon="mdi:chevron-right" aria-hidden="true"></ha-icon
            ></a>`
          : nothing}
        ${this._sampleActive ? html`<span class="sample-chip">${t(lang, "card.sample")}</span>` : nothing}
        <span class="headline clamp2">${head}</span>
        ${m.childLock === true && !m.machineOff
          ? html`<ha-icon
              class="status-icon"
              role="img"
              icon="mdi:lock-outline"
              title=${t(lang, "a11y.child_lock")}
              aria-label=${t(lang, "a11y.child_lock")}
            ></ha-icon>`
          : nothing}
      </div>
      ${renderFaultBanner(ctx)}
      <div class="drums ${drums.length === 2 ? "two" : ""}">${tiles}</div>
      ${m.machineOff
        ? html`<div class="off-explain spanning">
            ${m.offReason === "power" ? t(lang, "off.explain_power") : t(lang, "off.explain")}
          </div>`
        : nothing}
      ${totals
        ? html`<div class="footer">
            ${totals.water
              ? html`<button type="button" @click=${() => this._handlers.moreInfo(totals.water!.entity)}>
                  <ha-icon icon="mdi:water" aria-hidden="true"></ha-icon><span>${totals.text}</span>
                </button>`
              : html`<span>${totals.text}</span>`}
          </div>`
        : nothing}
      ${this._renderDialog(ctx)}
    </ha-card>`;
  }

  private _renderCompactTitle(): TemplateResult | typeof nothing {
    const title = this._title();
    return title
      ? html`<h2 class="compact-title ellipsis" tabindex="-1" data-focus-key="title">${title}</h2>`
      : nothing;
  }

  private _renderCompact(ctx: RenderCtx, drums: DrumModel[], live: TemplateResult): TemplateResult {
    const views = drums.map((d) => ctx.views[d.key]);
    const notices = (d: DrumModel) => ctx.config.show_notices && d.notices.length > 0;
    const same =
      views.length === 2 && views[0].short === views[1].short && !drums.some(notices) && !views.some((v) => v.attention);
    const head = headline(ctx.model, drums, ctx.viewCtx);
    const f = ctx.model.fault;
    return html`<ha-card lang=${ctx.lang} class="layout-compact">
      ${live} ${this._renderCompactTitle()}
      ${f.on
        ? renderCompactRow(ctx, null, t(ctx.lang, "head.attention"), t(ctx.lang, "compact.attention"), {
            icon: "mdi:alert-circle",
            tint: "fault",
            onTap: () => this._handlers.moreInfo(f.entity),
          })
        : nothing}
      ${same
        ? renderCompactRow(ctx, null, head, head, { icon: "mdi:washing-machine" })
        : drums.map((d) => {
            const v = ctx.views[d.key];
            return renderCompactRow(ctx, d, v.short, v.aria, { tint: v.tint, notice: notices(d) });
          })}
    </ha-card>`;
  }

  private _renderDialog(ctx: RenderCtx): TemplateResult | typeof nothing {
    const st = this._dialog;
    if (!st) return nothing;
    const d = ctx.model[st.drum];
    const changed = this._signature(d, st.cmd) !== st.signature;
    return html`<dialog
      aria-labelledby="dlg-title"
      aria-describedby="dlg-body"
      @cancel=${(e: Event) => {
        e.preventDefault();
        this._closeDialog();
      }}
      @click=${(e: MouseEvent) => this._onDialogClick(e)}
      @keydown=${(e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          this._closeDialog();
        }
      }}
    >
      ${renderDialogContent(ctx.lang, d, st, changed, () => this._closeDialog(), () => this._confirmDialog())}
    </dialog>`;
  }
}

if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, HaismartLaundryCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: CARD_TYPE,
    name: "Haier Laundry Centre",
    description:
      "Is it done, and when? Washer and dryer status at a glance, with safe start, pause and cancel.",
    preview: true,
    documentationURL: DOCS_URL,
  });
  console.info(
    `%c HAISMART-LAUNDRY-CARD %c v${VERSION} `,
    "color:#fff;background:#03a9f4;font-weight:600;border-radius:4px 0 0 4px",
    "color:#03a9f4;background:transparent;font-weight:600",
  );
}

declare global {
  interface HTMLElementTagNameMap {
    "haismart-laundry-card": HaismartLaundryCard;
  }
}
