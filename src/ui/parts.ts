import { html, nothing, type TemplateResult } from "lit";
import type { DrumKey } from "../types";
import type { DrumModel, Notice, StepView } from "../model/derive";
import { t, drumVars, type Lang } from "../localize";
import { noticeText } from "../view";
import { fmtPastClock } from "../time";
import type { RenderCtx } from "./context";

const CATEGORY_TINT: Record<Notice["category"], string> = {
  blocking: "t-paused",
  supply: "t-paused",
  maintenance: "t-scheduled",
  info: "t-muted",
  unknown: "t-muted",
};

export function keyActivate(fn: () => void) {
  return (ev: KeyboardEvent) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      fn();
    }
  };
}

export function renderStepper(lang: Lang, steps: StepView[] | null): TemplateResult | typeof nothing {
  if (!steps || !steps.length) return nothing;
  return html`<ol class="stepper" aria-label=${t(lang, "a11y.progress")}>
    ${steps.map(
      (s, i) => html`<li class="step ${s.state}">
        <span class="mark" aria-hidden="true"
          ><span class="pt"></span>${i < steps.length - 1 ? html`<span class="ln"></span>` : nothing}</span
        >
        <span class="lbl">${t(lang, `step.${s.key}`)}</span>
        <span class="sr-only">${t(lang, `a11y.step_${s.state}`)}</span>
      </li>`,
    )}
  </ol>`;
}

export function renderNotices(ctx: RenderCtx, d: DrumModel): TemplateResult | typeof nothing {
  if (!ctx.config.show_notices || !d.notices.length) return nothing;
  const open = ctx.ui.noticesOpen.has(d.key);
  const shown = open ? d.notices : d.notices.slice(0, 2);
  const more = d.notices.length - 2;
  return html`<div class="chips" id="notices-${d.key}">
    ${shown.map(
      (n) => html`<button
        class="chip ${CATEGORY_TINT[n.category]}"
        type="button"
        title=${noticeText(ctx.lang, n)}
        @click=${() => ctx.on.moreInfo(n.entity)}
      >
        <ha-icon .icon=${n.icon} aria-hidden="true"></ha-icon><span>${noticeText(ctx.lang, n)}</span>
      </button>`,
    )}
    ${more > 0
      ? html`<button
          class="chip t-muted"
          type="button"
          aria-expanded=${open ? "true" : "false"}
          aria-controls="notices-${d.key}"
          @click=${() => ctx.on.toggle("noticesOpen", d.key)}
        >
          <span>${open ? t(ctx.lang, "notice.less") : t(ctx.lang, "notice.more", { n: more })}</span>
        </button>`
      : nothing}
  </div>`;
}

export function renderFaultBanner(ctx: RenderCtx, announce: boolean): TemplateResult | typeof nothing {
  const f = ctx.model.fault;
  if (!f.on || ctx.model.machineOff) return nothing;
  const { lang } = ctx;
  const first = f.faults[0];
  const rest = f.faults.slice(1);
  return html`<div class="banner-wrap">
    <div
      class="banner t-fault"
      role="button"
      tabindex="0"
      @click=${() => ctx.on.moreInfo(f.entity)}
      @keydown=${keyActivate(() => ctx.on.moreInfo(f.entity))}
    >
      <ha-icon icon="mdi:alert-circle" aria-hidden="true"></ha-icon>
      <div class="body" role=${announce ? "alert" : nothing}>
        <span class="title-line">${t(lang, "fault.title")}</span>
        <span>${first ?? t(lang, "fault.no_detail")}</span>
        ${ctx.ui.faultMore && rest.length
          ? html`<ul id="fault-more">
              ${rest.map((x) => html`<li>${x}</li>`)}
            </ul>`
          : nothing}
        ${f.codes ? html`<span class="sub">${t(lang, "fault.code", { code: f.codes })}</span>` : nothing}
      </div>
    </div>
    ${rest.length
      ? html`<button
          class="disclose"
          type="button"
          aria-expanded=${ctx.ui.faultMore ? "true" : "false"}
          aria-controls="fault-more"
          @click=${() => ctx.on.toggleFaultMore()}
        >
          ${t(lang, "fault.more", { n: rest.length })}
        </button>`
      : nothing}
  </div>`;
}

export function renderSetupAlert(lang: Lang, title: string, body: string, editMode: boolean): TemplateResult {
  return html`<div class="alert" role="status">
    <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon>
    <div class="body">
      <span class="title-line">${title}</span>
      <span>${body}</span>
      ${editMode ? html`<span class="sub">${t(lang, "setup.edit_hint")}</span>` : nothing}
    </div>
  </div>`;
}

export function renderOffBlock(ctx: RenderCtx, variant: "collapse" | "stacked" | "compact"): TemplateResult {
  const { lang, model } = ctx;
  const since =
    model.offSince !== undefined ? t(lang, "off.since", { time: fmtPastClock(model.offSince, ctx.now, ctx.viewCtx.time) }) : "";
  const explain = model.offReason === "power" ? t(lang, "off.explain_power") : t(lang, "off.explain");
  return html`<div class="off-block ${variant === "collapse" ? "collapse" : ""}" role="status">
    <ha-icon icon="mdi:power-sleep" aria-hidden="true"></ha-icon>
    <div class="body">
      <span class="off-title">${t(lang, "off.title")}</span>
      ${since ? html`<span class="off-sub">${since}</span>` : nothing}
      ${variant === "stacked" ? html`<span class="off-explain">${explain}</span>` : nothing}
    </div>
  </div>`;
}

export function renderErrorStrip(ctx: RenderCtx, drum: DrumKey): TemplateResult | typeof nothing {
  const st = ctx.controller.get(drum);
  if (!st || st.phase !== "error" || !st.error) return nothing;
  const { lang } = ctx;
  const vars = drumVars(lang, drum);
  const open = ctx.ui.detailsOpen.has(drum);
  return html`<div class="strip t-fault" role="alert">
    <ha-icon icon="mdi:alert-octagon" aria-hidden="true"></ha-icon>
    <div class="body">
      <span class="title-line">${t(lang, "err.title", vars)}</span>
      <span>${t(lang, st.error.key, vars)}</span>
      ${open && st.error.detail ? html`<span class="raw" id="err-raw-${drum}">${st.error.detail}</span>` : nothing}
      <div class="actions">
        <button class="btn tonal" type="button" @click=${(e: Event) => ctx.on.retry(drum, e.currentTarget as HTMLElement)}>
          ${t(lang, "err.retry")}
        </button>
        ${st.error.detail
          ? html`<button
              class="link-btn"
              type="button"
              aria-expanded=${open ? "true" : "false"}
              aria-controls="err-raw-${drum}"
              @click=${() => ctx.on.toggle("detailsOpen", drum)}
            >
              ${t(lang, "err.details")}
            </button>`
          : nothing}
      </div>
    </div>
    <button
      class="btn icon-only"
      type="button"
      aria-label=${t(lang, "ctl.dismiss")}
      title=${t(lang, "ctl.dismiss")}
      @click=${() => ctx.on.dismiss(drum)}
    >
      <ha-icon icon="mdi:close" aria-hidden="true"></ha-icon>
    </button>
  </div>`;
}
