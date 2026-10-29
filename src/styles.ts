import { css, unsafeCSS } from "lit";
import { MIX } from "./tokens";

const pct = (n: number) => unsafeCSS(`${n}%`);

// Visual tokens (§12), layout (§9), motion (§13). Every token is overridable by themes/card-mod.
export const cardStyles = css`
  :host {
    --hlc-running: var(--primary-color, #03a9f4);
    --hlc-paused: var(--warning-color, #ffa600);
    --hlc-done: var(--success-color, #43a047);
    --hlc-fault: var(--error-color, #db4437);
    --hlc-scheduled: var(--info-color, #039be5);
    --hlc-text: var(--primary-text-color, #212121);
    --hlc-muted: var(--secondary-text-color, #727272);
    --hlc-disabled: var(--disabled-text-color, #bdbdbd);
    --hlc-divider: var(--divider-color, rgba(0, 0, 0, 0.12));
    --hlc-surface: var(--ha-card-background, var(--card-background-color, #fff));
    --hlc-radius: var(--ha-card-border-radius, 12px);
    --hlc-on-primary: var(--text-primary-color, #fff);
    --hlc-font: var(--ha-font-family-body, Roboto, system-ui, sans-serif);
    /* Accessible variants (checked in test/contrast.test.ts). White on HA's default primary is
       2.6:1, so filled buttons darken the fill; "strong" colours mix toward the text colour,
       which raises contrast against the surface in light and dark themes alike. */
    --hlc-filled-bg: color-mix(in srgb, var(--hlc-running) ${pct(MIX.filled)}, #000);
    --hlc-filled-fg: #fff;
    --hlc-focus-ring: color-mix(in srgb, var(--primary-color, #03a9f4) ${pct(MIX.focus)}, var(--hlc-text));
    --hlc-fault-text: color-mix(in srgb, var(--hlc-fault) ${pct(MIX.strong)}, var(--hlc-text));
    --hlc-warn-strong: color-mix(in srgb, var(--hlc-paused) ${pct(MIX.strong)}, var(--hlc-text));
    display: block;
  }

  ha-card {
    /* Block, so it is a size container even where ha-card has no styles of its own. */
    display: block;
    container-type: inline-size;
    container-name: hlc;
    font-family: var(--hlc-font);
    color: var(--hlc-text);
    padding: 16px;
    box-sizing: border-box;
    overflow: hidden;
  }
  ha-card.loading {
    min-height: 160px;
  }
  * {
    box-sizing: border-box;
  }
  ha-icon {
    --mdc-icon-size: 24px;
    flex: none;
  }
  .sr-only {
    position: absolute !important;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
  .ellipsis {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  :focus-visible {
    outline: 2px solid var(--hlc-focus-ring);
    outline-offset: 2px;
  }
  .clamp2 {
    min-width: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow-wrap: anywhere;
  }
  :focus:not(:focus-visible) {
    outline: none;
  }

  /* ---------------------------------------------------------------- tints */
  .t-running { --hlc-state: var(--hlc-running); }
  .t-paused { --hlc-state: var(--hlc-paused); }
  .t-done { --hlc-state: var(--hlc-done); }
  .t-scheduled { --hlc-state: var(--hlc-scheduled); }
  .t-fault { --hlc-state: var(--hlc-fault); }
  .t-muted { --hlc-state: var(--hlc-muted); }
  .t-running,
  .t-paused,
  .t-done,
  .t-scheduled,
  .t-fault,
  .t-muted {
    --hlc-state-strong: color-mix(in srgb, var(--hlc-state) ${pct(MIX.strong)}, var(--hlc-text));
  }

  /* ---------------------------------------------------------------- header */
  .header {
    display: flex;
    align-items: center;
    gap: 4px 8px;
    min-height: 48px;
    margin: -8px 0 4px;
  }
  .title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.3;
    min-width: 0;
    flex: 0 1 auto;
    color: var(--hlc-text);
    margin: 0;
    padding: 0;
    font-family: inherit;
    min-height: 44px;
    border-radius: 8px;
  }
  .title ha-icon {
    color: var(--hlc-muted);
  }
  .dev-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    margin-left: -12px;
    border-radius: 50%;
    color: var(--hlc-muted);
    flex: none;
  }
  .headline {
    margin-left: auto;
    font-size: 14px;
    line-height: 1.35;
    color: var(--hlc-muted);
    text-align: right;
    flex: 1 1 auto;
  }
  /* Narrow cards: the headline gets its own row under the title instead of sharing one. */
  @container hlc (max-width: 519px) {
    .header {
      flex-wrap: wrap;
      padding-bottom: 4px;
    }
    .headline {
      order: 10;
      flex-basis: 100%;
      margin-left: 0;
      text-align: left;
    }
  }
  .status-icon {
    --mdc-icon-size: 18px;
    color: var(--hlc-muted);
  }
  .sample-chip {
    font-size: 12px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--hlc-scheduled) 14%, transparent);
    color: var(--hlc-text);
    flex: none;
  }

  /* ---------------------------------------------------------------- drums */
  .drums {
    display: grid;
    gap: 12px;
  }
  .layout-full .drums.two {
    grid-template-columns: 1fr 1fr;
  }
  .layout-stacked .drums {
    gap: 0;
  }
  .layout-stacked .drums > * + * {
    border-top: 1px solid var(--hlc-divider);
  }

  .tile {
    container-type: inline-size;
    container-name: tile;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border-radius: calc(var(--hlc-radius) - 4px);
    border: 1px solid var(--hlc-divider);
    min-width: 0;
    background: transparent;
  }
  .tile.tinted {
    border-color: transparent;
    background: color-mix(in srgb, var(--hlc-state) ${pct(MIX.tint)}, transparent);
    /* Secondary text on the tint stays at 4.5:1 or better. */
    --hlc-muted: color-mix(
      in srgb,
      var(--secondary-text-color, #727272) ${pct(MIX.mutedOnTint)},
      var(--primary-text-color, #212121)
    );
  }
  .tile.has-toggle .label-row {
    padding-right: 40px;
  }
  .drum-toggle {
    position: absolute;
    top: 6px;
    right: 6px;
    color: var(--hlc-muted);
  }
  .layout-stacked .tile:not(.tinted) .drum-toggle {
    right: -6px;
  }
  .layout-stacked .tile {
    border: 0;
    border-radius: 0;
    padding: 16px 0;
    background: transparent;
  }
  .layout-stacked .tile.tinted {
    border-radius: calc(var(--hlc-radius) - 4px);
    padding: 16px;
    margin: 8px 0;
    border-top: 0 !important;
    background: color-mix(in srgb, var(--hlc-state) ${pct(MIX.tint)}, transparent);
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    cursor: pointer;
    border-radius: 8px;
    min-height: 44px;
  }
  .label-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    font-size: 14px;
    font-weight: 500;
    color: var(--hlc-text);
    min-height: 24px;
  }
  .drum-icon {
    color: var(--hlc-state, var(--hlc-muted));
  }
  .drum-icon.muted {
    color: var(--hlc-muted);
  }
  .eyebrow {
    flex: 0 1 auto;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--hlc-state, var(--hlc-muted));
    flex: none;
  }
  .label-icons {
    margin-left: auto;
    display: flex;
    gap: 4px;
    align-items: center;
    flex: none;
  }
  .label-icons ha-icon {
    --mdc-icon-size: 16px;
    color: var(--hlc-muted);
  }
  .hero {
    font-size: 28px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--hlc-text);
  }
  @supports (font-size: 1cqi) {
    .hero {
      font-size: clamp(28px, 9cqi, 44px);
    }
  }
  .hero.muted {
    color: var(--hlc-muted);
  }
  .support {
    font-size: 14px;
    line-height: 1.35;
    font-weight: 400;
    color: var(--hlc-muted);
    display: flex;
    gap: 6px;
    align-items: flex-start;
    min-width: 0;
  }
  .support.blocking {
    color: var(--hlc-text);
  }
  .support.blocking ha-icon {
    --mdc-icon-size: 18px;
    color: var(--hlc-warn-strong);
  }

  /* ---------------------------------------------------------------- stepper */
  .stepper {
    list-style: none;
    display: flex;
    align-items: flex-start;
    margin: 0;
    padding: 0;
    gap: 0;
  }
  .step {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    flex: 1 1 0;
    min-width: 0;
    position: relative;
    font-size: 12px;
    font-weight: 500;
    color: var(--hlc-muted);
  }
  .step:last-child {
    flex: 0 0 auto;
  }
  .step .mark {
    display: flex;
    align-items: center;
    width: 100%;
    height: 10px;
  }
  .step .pt {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: none;
    box-sizing: content-box;
    /* Upcoming: a ring of at least 3:1, not the faint divider colour. */
    border: 2px solid var(--hlc-muted);
    margin: -2px;
  }
  .step .ln {
    flex: 1;
    height: 2px;
    margin: 0 6px;
    background: var(--hlc-muted);
    opacity: 0.5;
  }
  .step.complete .pt {
    background: var(--hlc-state-strong, var(--hlc-state));
    border-color: var(--hlc-state-strong, var(--hlc-state));
  }
  .step.complete .ln {
    background: var(--hlc-state-strong, var(--hlc-state));
    opacity: 1;
  }
  .step.current .pt {
    border-color: var(--hlc-state-strong, var(--hlc-state));
    background: color-mix(in srgb, var(--hlc-state) 30%, transparent);
  }
  .step .lbl {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .step.current .lbl {
    color: var(--hlc-text);
  }
  /* Labels are never hidden: on very narrow tiles the connectors shrink instead. */
  @container tile (max-width: 219px) {
    .step .ln {
      margin: 0 3px;
    }
  }
  @media (forced-colors: active) {
    .step .pt {
      border-color: CanvasText;
      background: Canvas;
    }
    .step.complete .pt,
    .step.current .pt {
      border-color: Highlight;
    }
    .step.complete .pt {
      background: Highlight;
    }
    .step .ln,
    .step.complete .ln {
      background: CanvasText;
      opacity: 1;
    }
    .dot {
      background: CanvasText;
    }
  }

  /* ---------------------------------------------------------------- chips */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: -8px 0;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 28px;
    padding: 4px 10px;
    margin: 8px 0;
    border-radius: 999px;
    border: 0;
    font: 500 12px/1.2 var(--hlc-font);
    color: var(--hlc-text);
    background: color-mix(in srgb, var(--hlc-state, var(--hlc-muted)) 14%, transparent);
    cursor: pointer;
    max-width: 100%;
    position: relative;
  }
  .chip::after {
    /* 44px hit area */
    content: "";
    position: absolute;
    inset: -8px -2px;
  }
  .chip ha-icon {
    --mdc-icon-size: 16px;
    color: var(--hlc-state, var(--hlc-muted));
  }
  .chip span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .prog-chip {
    --hlc-state: var(--hlc-running);
    font-size: 14px;
    min-height: 32px;
  }
  .prog-chip ha-icon {
    color: var(--hlc-muted);
  }
  .prog-meta {
    font-size: 14px;
    color: var(--hlc-muted);
  }
  .hint {
    flex-basis: 100%;
    font-size: 12px;
    color: var(--hlc-muted);
    margin-top: -6px;
  }
  /* Chip, then its duration on the same line; the hint (no programme yet) below. */
  .prog-line {
    display: flex;
    flex-wrap: wrap;
    gap: 0 12px;
    align-items: center;
    margin: -8px 0;
  }

  /* ---------------------------------------------------------------- controls */
  .controls {
    border-top: 1px solid var(--hlc-divider);
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: auto;
  }
  .btn-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 44px;
    min-width: 44px;
    padding: 0 16px;
    border-radius: 20px;
    border: 0;
    font: 500 14px/1 var(--hlc-font);
    cursor: pointer;
    white-space: nowrap;
    background: transparent;
    color: var(--hlc-text);
  }
  .btn ha-icon {
    --mdc-icon-size: 18px;
  }
  .btn.filled {
    background: var(--hlc-filled-bg);
    color: var(--hlc-filled-fg);
  }
  .btn.tonal {
    background: color-mix(in srgb, var(--hlc-running) 12%, transparent);
    color: var(--hlc-text);
  }
  .btn.destructive {
    color: var(--hlc-fault-text);
    font-weight: 600;
  }
  .btn.destructive ha-icon {
    color: var(--hlc-fault);
  }
  .btn.warn {
    color: var(--hlc-text);
    font-weight: 600;
  }
  .btn.warn ha-icon {
    color: var(--hlc-warn-strong);
  }
  .btn.icon-only {
    padding: 0;
    width: 44px;
    border-radius: 50%;
  }
  .btn[aria-disabled="true"] {
    opacity: 0.38;
    cursor: default;
  }
  /* Only a secondary next to a labelled primary goes icon-only (it keeps its aria-label). A
     drum's only action always shows its label. */
  @container tile (max-width: 319px) {
    .btn.secondary.collapsible .lbl {
      display: none;
    }
    .btn.secondary.collapsible {
      padding: 0;
      width: 44px;
      border-radius: 50%;
    }
  }
  .reason,
  .status-line,
  .remote-line {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    line-height: 1.4;
    font-weight: 500;
    color: var(--hlc-muted);
    min-width: 0;
  }
  /* These explain disabled controls: full text colour, and the remote line wraps rather than
     shortening. */
  .reason,
  .remote-line {
    color: var(--hlc-text);
  }
  .reason ha-icon,
  .status-line ha-icon,
  .remote-line ha-icon {
    --mdc-icon-size: 16px;
  }
  .remote-line .full {
    flex: 1 1 auto;
    min-width: 0;
  }
  .info-btn {
    min-width: 44px;
    min-height: 44px;
    margin: -12px -8px -12px 0;
    border: 0;
    background: none;
    color: var(--hlc-muted);
    border-radius: 50%;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
  }
  .remote-help {
    font-size: 12px;
    color: var(--hlc-text);
    line-height: 1.4;
    margin: 0;
  }
  .status-line.ok ha-icon {
    color: var(--hlc-done);
  }
  .status-line.warn {
    color: var(--hlc-text);
    align-items: flex-start;
  }
  .status-line.warn ha-icon {
    color: var(--hlc-warn-strong);
  }
  .status-line .grow {
    flex: 1;
    min-width: 0;
  }
  .link-btn {
    border: 0;
    background: none;
    color: var(--hlc-text);
    font: 500 12px var(--hlc-font);
    text-decoration: underline;
    min-height: 44px;
    margin: -14px 0;
    padding: 0 8px;
    cursor: pointer;
    flex: none;
  }
  .spinner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid currentColor;
    border-right-color: transparent;
    flex: none;
  }
  .dots {
    display: none;
    letter-spacing: 1px;
  }

  /* ---------------------------------------------------------------- strips & banners */
  .strip,
  .banner,
  .alert {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 12px;
    border-radius: 8px;
    border-left: 3px solid var(--hlc-state);
    background: color-mix(in srgb, var(--hlc-state) 14%, transparent);
    color: var(--hlc-text);
    font-size: 14px;
  }
  .strip ha-icon,
  .banner ha-icon,
  .alert ha-icon {
    color: var(--hlc-state);
  }
  .strip .body,
  .banner .body,
  .alert .body {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    flex: 1;
  }
  .strip .title-line,
  .banner .title-line,
  .alert .title-line {
    font-weight: 500;
  }
  .strip .actions,
  .banner .actions {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 4px;
  }
  .strip .raw {
    font-size: 12px;
    color: var(--hlc-muted);
    word-break: break-word;
  }
  .sub {
    font-size: 12px;
    color: var(--hlc-muted);
  }
  .banner {
    margin-bottom: 12px;
    min-width: 0;
  }
  .banner ul {
    margin: 4px 0 0;
    padding-left: 18px;
  }
  .alert {
    --hlc-state: var(--hlc-paused);
  }

  /* ---------------------------------------------------------------- off view */
  .off-block {
    display: flex;
    align-items: center;
    gap: 16px;
    min-height: 120px;
    padding: 8px 0;
  }
  .off-block.collapse {
    min-height: 72px;
    padding: 0;
  }
  .off-block ha-icon {
    --mdc-icon-size: 32px;
    color: var(--hlc-muted);
  }
  .off-block .body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .off-title {
    font-size: 18px;
    font-weight: 500;
  }
  .off-sub,
  .off-explain {
    font-size: 14px;
    color: var(--hlc-muted);
  }
  .off-explain.spanning {
    margin-top: 12px;
  }

  /* ---------------------------------------------------------------- footer */
  .footer {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 12px;
    margin-top: 12px;
    font-size: 12px;
    color: var(--hlc-muted);
  }
  .footer button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: 0;
    color: inherit;
    font: inherit;
    padding: 0;
    min-height: 44px;
    margin: -12px 0;
    cursor: pointer;
  }
  .footer ha-icon {
    --mdc-icon-size: 16px;
  }

  /* ---------------------------------------------------------------- compact & collapsed */
  .compact-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  .crow {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 44px;
    height: 44px;
    border-radius: 8px;
    cursor: pointer;
    min-width: 0;
  }
  .crow .chero {
    font-size: 24px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    flex: 1;
  }
  /* Notice marker: an icon shape, not a colour-only dot. */
  .aicon {
    --mdc-icon-size: 16px;
    color: var(--hlc-warn-strong);
  }
  .crow .drum-icon {
    color: var(--hlc-state-strong, var(--hlc-muted));
  }
  .crow .drum-icon.muted {
    color: var(--hlc-muted);
  }
  .collapsed {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 56px;
    min-width: 0;
  }
  .collapsed .summary {
    flex-direction: row;
    align-items: center;
    flex: 1;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    min-height: 44px;
  }
  .collapsed .summary .drum-icon {
    color: var(--hlc-muted);
  }
  .collapsed .cnotice {
    font-weight: 400;
    color: var(--hlc-muted);
  }
  .collapsed .drum-toggle {
    color: var(--hlc-muted);
  }

  /* ---------------------------------------------------------------- dialog */
  dialog {
    border: 0;
    padding: 24px;
    border-radius: 16px;
    width: 360px;
    max-width: calc(100vw - 32px);
    background: var(--hlc-surface);
    color: var(--hlc-text);
    font-family: var(--hlc-font);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }
  dialog h2 {
    margin: 0 0 12px;
    font-size: 20px;
    font-weight: 500;
  }
  dialog p {
    margin: 0 0 12px;
    font-size: 14px;
    line-height: 1.45;
    color: var(--hlc-muted);
  }
  dialog .rows {
    list-style: none;
    margin: 0 0 12px;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
  }
  dialog .rows li {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  dialog .rows ha-icon {
    --mdc-icon-size: 18px;
    color: var(--hlc-done);
  }
  dialog .changed {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    font-size: 14px;
    color: var(--hlc-text);
    margin-bottom: 12px;
  }
  dialog .changed.empty {
    margin: 0;
  }
  dialog .changed ha-icon {
    --mdc-icon-size: 18px;
    color: var(--hlc-warn-strong);
  }
  /* DOM order is visual order (safe, then confirm), so Tab moves left to right. */
  dialog .dlg-actions {
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 8px;
  }
  @media (max-width: 599px) {
    dialog {
      width: 100vw;
      max-width: 100vw;
      margin: auto 0 0;
      border-radius: 16px 16px 0 0;
      padding: 24px 16px calc(16px + env(safe-area-inset-bottom, 0px));
    }
    dialog .dlg-actions {
      flex-direction: column;
    }
    dialog .dlg-actions .btn {
      width: 100%;
    }
  }

  /* ---------------------------------------------------------------- fallbacks */
  @supports not (background: color-mix(in srgb, red 10%, transparent)) {
    :host {
      --hlc-filled-bg: #0277bd;
      --hlc-focus-ring: var(--primary-text-color, #212121);
      --hlc-fault-text: var(--primary-text-color, #212121);
      --hlc-warn-strong: var(--primary-text-color, #212121);
    }
    .tile.tinted {
      --hlc-muted: var(--primary-text-color, #212121);
    }
    .tile.tinted,
    .layout-stacked .tile.tinted,
    .chip,
    .strip,
    .banner,
    .alert,
    .btn.tonal,
    .sample-chip {
      background: transparent;
      border: 1px solid var(--hlc-state, var(--hlc-running));
    }
    .step.current .pt {
      background: transparent;
    }
  }

  /* ---------------------------------------------------------------- motion (§13) */
  /* Pulses run three times when a phase starts (the element is re-keyed per phase), then stay
     still: the static dot and the text already say "running" (WCAG 2.2.2). */
  @media (prefers-reduced-motion: no-preference) {
    .pulse {
      animation: hlc-pulse 2.4s ease-in-out 3;
    }
    .tilde {
      display: inline-block;
      animation: hlc-pulse 2.4s ease-in-out 3;
    }
    .hero {
      animation: hlc-fade 180ms ease-out;
    }
    .done-anim {
      animation: hlc-scale 300ms ease-out 1;
    }
    .spinner {
      animation: hlc-spin 0.8s linear infinite;
    }
    dialog[open] {
      animation: hlc-dialog 180ms ease-out;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition-duration: 0ms !important;
    }
    .spinner {
      display: none;
    }
    .dots {
      display: inline;
    }
  }
  @keyframes hlc-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.45;
    }
  }
  @keyframes hlc-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes hlc-scale {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }
  @keyframes hlc-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes hlc-dialog {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
`;
