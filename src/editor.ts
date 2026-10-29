// Visual editor: wraps HA's own ha-form (defined whenever the card editor is open), plus a
// read-only "Detected" panel built from the registry and states. Makes no service or WS calls.

import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import type { HomeAssistant, LaundryCardConfig } from "./types";
import { buildIndex, derive, deviceDisplayName, deviceEntities, findLaundryDevices, resolveDevice } from "./model";
import { resolveLang, t, type Lang } from "./localize";

const EDITOR_DEFAULTS: Record<string, unknown> = {
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
};

const select = (lang: Lang, prefix: string, values: string[]) => ({
  select: {
    mode: "dropdown",
    options: values.map((v) => ({ value: v, label: t(lang, `${prefix}_${v}`) })),
  },
});

export function editorSchema(lang: Lang) {
  return [
    // Current selector form (a filter list). The integration filter still lists every haismart
    // device (air conditioners too), so the helper text names the laundry centres detected.
    { name: "device_id", selector: { device: { filter: [{ integration: "haismart" }] } } },
    { name: "title", selector: { text: {} } },
    { name: "layout", selector: select(lang, "ed.layout", ["auto", "full", "stacked", "compact"]) },
    { name: "time_display", selector: select(lang, "ed.time", ["both", "finish", "remaining"]) },
    { name: "drums", selector: select(lang, "ed.drums", ["both", "washer", "dryer"]) },
    { name: "order", selector: select(lang, "ed.order", ["washer_first", "dryer_first"]) },
    {
      name: "advanced",
      type: "expandable",
      flatten: true,
      title: t(lang, "ed.advanced"),
      schema: [
        { name: "collapse_idle", selector: { boolean: {} } },
        { name: "show_notices", selector: { boolean: {} } },
        { name: "show_stepper", selector: { boolean: {} } },
        { name: "show_details", selector: { boolean: {} } },
        { name: "show_totals", selector: { boolean: {} } },
        { name: "show_controls", selector: select(lang, "ed.show_controls", ["auto", "never"]) },
        { name: "confirm_start", selector: { boolean: {} } },
        { name: "off_style", selector: select(lang, "ed.off_style", ["keep", "collapse"]) },
        { name: "language", selector: select(lang, "ed.language", ["auto", "en", "ms"]) },
        { name: "tap_action", selector: { ui_action: {} } },
      ],
    },
  ];
}

const LABEL_KEYS: Record<string, string> = {
  device_id: "ed.device",
  title: "ed.title",
  layout: "ed.layout",
  time_display: "ed.time",
  drums: "ed.drums",
  order: "ed.order",
  collapse_idle: "ed.collapse_idle",
  show_notices: "ed.show_notices",
  show_stepper: "ed.show_stepper",
  show_details: "ed.show_details",
  show_totals: "ed.show_totals",
  show_controls: "ed.show_controls",
  confirm_start: "ed.confirm_start",
  off_style: "ed.off_style",
  language: "ed.language",
  tap_action: "ed.tap_action",
  advanced: "ed.advanced",
};

export interface DetectedRow {
  text: string;
  level: "info" | "warning" | "ok";
}

/** The Detected panel's rows (§10.3); pure, exported for tests. */
export function detectedRows(hass: HomeAssistant, config: LaundryCardConfig, lang: Lang): DetectedRow[] {
  const rows: DetectedRow[] = [];
  const res = resolveDevice(hass, config);
  const laundry = findLaundryDevices(hass);
  if (res.kind !== "ok") return [{ text: t(lang, "det.none"), level: "warning" }];
  const id = res.deviceId;
  const index = buildIndex(hass, id);
  const m = derive(hass, index);
  const found = (b: boolean) => t(lang, b ? "det.found" : "det.not_found");
  const onOff = (b: boolean | undefined) => t(lang, b ? "det.on" : "det.off");
  rows.push({
    text: t(lang, "det.device", { name: deviceDisplayName(hass, id), n: deviceEntities(hass, id).length }),
    level: "info",
  });
  rows.push({ text: t(lang, "det.washer", { found: found(!!index.attrs.laundryCyclePhase) }), level: "info" });
  rows.push({ text: t(lang, "det.dryer", { found: found(!!index.attrs.dryerCyclePhase) }), level: "info" });
  rows.push(
    m.controlsExist
      ? { text: t(lang, "det.controls_on"), level: "ok" }
      : { text: t(lang, "det.controls_off"), level: "info" },
  );
  rows.push(
    m.machineOff || (m.washer.remote === undefined && m.dryer.remote === undefined)
      ? { text: t(lang, "det.remote_unknown"), level: "info" }
      : { text: t(lang, "det.remote", { w: onOff(m.washer.remote), d: onOff(m.dryer.remote) }), level: "info" },
  );
  rows.push({ text: t(lang, m.legacy ? "det.legacy" : "det.full"), level: m.legacy ? "warning" : "ok" });
  rows.push({ text: t(lang, "det.fault", { found: found(!!index.fault) }), level: "info" });
  if (!config.device_id && laundry.length >= 2) rows.push({ text: t(lang, "det.multi"), level: "warning" });
  if (m.controlsExist) {
    rows.push({ text: t(lang, "det.hidden"), level: "info" });
    if (m.washer.remote === false && m.dryer.remote === false)
      rows.push({ text: t(lang, "det.remote_both_off"), level: "info" });
  }
  return rows;
}

export class HaismartLaundryCardEditor extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
  };
  hass?: HomeAssistant;
  private _config?: LaundryCardConfig;
  /** Computed once per hass/config change, not inside each ha-form helper callback. */
  private _rows: DetectedRow[] = [];
  private _helperDevice = "";

  static override styles = css`
    .detected {
      margin-top: 16px;
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .detected h3 {
      margin: 0 0 8px;
      font-size: 14px;
      font-weight: 500;
    }
    .detected ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .detected li {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      line-height: 1.4;
    }
    .detected ha-icon {
      --mdc-icon-size: 18px;
      flex: none;
      color: var(--secondary-text-color);
    }
    .detected li.warning ha-icon {
      color: var(--warning-color, #ffa600);
    }
    .detected li.ok ha-icon {
      color: var(--success-color, #43a047);
    }
  `;

  setConfig(config: LaundryCardConfig): void {
    this._config = config;
  }

  private get _lang(): Lang {
    return resolveLang(this._config?.language, this.hass?.locale?.language ?? this.hass?.language);
  }

  private _computeLabel = (s: { name: string }) => {
    const k = LABEL_KEYS[s.name];
    return k ? t(this._lang, k) : s.name;
  };

  protected override willUpdate(): void {
    if (!this.hass || !this._config) return;
    this._rows = detectedRows(this.hass, this._config, this._lang);
    const hass = this.hass;
    this._helperDevice = findLaundryDevices(hass)
      .map((id) => deviceDisplayName(hass, id))
      .join(", ");
  }

  private _computeHelper = (s: { name: string }) => {
    const lang = this._lang;
    if (s.name === "device_id")
      return this._helperDevice
        ? t(lang, "ed.device_helper", { name: this._helperDevice })
        : t(lang, "ed.device_helper_none");
    if (s.name === "layout") return t(lang, "ed.layout_helper");
    if (s.name === "confirm_start") return t(lang, "ed.confirm_start_helper");
    return undefined;
  };

  private _valueChanged(ev: CustomEvent<{ value: Record<string, unknown> }>): void {
    ev.stopPropagation();
    const value = { ...ev.detail.value };
    const next: LaundryCardConfig = { type: this._config?.type ?? "custom:haismart-laundry-card" };
    for (const [k, v] of Object.entries(value)) {
      if (k === "type") continue;
      // An emptied field (title included) means "default": drop the key.
      if (v === undefined || (typeof v === "string" && !v.trim())) continue;
      if (k in EDITOR_DEFAULTS && EDITOR_DEFAULTS[k] === v) continue;
      if (k === "tap_action" && (v as { action?: string })?.action === "more-info" && Object.keys(v as object).length === 1)
        continue;
      next[k] = v;
    }
    // Keep unknown keys the form does not know about.
    for (const [k, v] of Object.entries(this._config ?? {}))
      if (!(k in next) && !(k in value) && !(k in LABEL_KEYS) && k !== "type") next[k] = v;
    this._config = next;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: next }, bubbles: true, composed: true }));
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const lang = this._lang;
    const data = { ...EDITOR_DEFAULTS, ...this._config };
    const rows = this._rows;
    const icon = (r: DetectedRow) =>
      r.level === "warning" ? "mdi:alert-outline" : r.level === "ok" ? "mdi:check-circle-outline" : "mdi:information-outline";
    return html`<ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${editorSchema(lang)}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <section class="detected" aria-labelledby="det-title">
        <h3 id="det-title">${t(lang, "ed.detected")}</h3>
        <ul>
          ${rows.map(
            (r) => html`<li class=${r.level}><ha-icon .icon=${icon(r)} aria-hidden="true"></ha-icon><span>${r.text}</span></li>`,
          )}
        </ul>
      </section>`;
  }
}

if (!customElements.get("haismart-laundry-card-editor"))
  customElements.define("haismart-laundry-card-editor", HaismartLaundryCardEditor);
