import type { DrumKey, Layout, LaundryCardConfig } from "../types";
import type { Command, DrumModel, GateReason, LaundryModel } from "../model/derive";
import type { CommandController } from "../controls";
import type { Lang } from "../localize";
import type { DrumView, ViewCtx } from "../view";

export interface ResolvedConfig extends LaundryCardConfig {
  layout: NonNullable<LaundryCardConfig["layout"]>;
  time_display: NonNullable<LaundryCardConfig["time_display"]>;
  drums: NonNullable<LaundryCardConfig["drums"]>;
  order: NonNullable<LaundryCardConfig["order"]>;
  collapse_idle: boolean;
  show_notices: boolean;
  show_stepper: boolean;
  show_totals: boolean;
  show_controls: "auto" | "never";
  confirm_start: boolean;
  off_style: "keep" | "collapse";
  language: NonNullable<LaundryCardConfig["language"]>;
}

export interface UiState {
  remoteHelp: Set<DrumKey>;
  noticesOpen: Set<DrumKey>;
  detailsOpen: Set<DrumKey>;
  expanded: Set<DrumKey>;
  faultMore: boolean;
  /** Drums whose programme hint has been shown this session. */
  hintSeen: Set<DrumKey>;
}

export interface Handlers {
  tap(d: DrumModel): void;
  moreInfo(entityId: string | undefined): void;
  command(d: DrumModel, cmd: Command, trigger: HTMLElement): void;
  /** A gated (aria-disabled) control was pressed: say why. */
  disabledPress(d: DrumModel, cmd: Command, gate: GateReason | null): void;
  dismiss(drum: DrumKey): void;
  retry(drum: DrumKey, trigger: HTMLElement): void;
  toggle(set: keyof Omit<UiState, "faultMore" | "hintSeen">, drum: DrumKey): void;
  toggleFaultMore(): void;
  openDevice(): void;
}

export interface RenderCtx {
  lang: Lang;
  model: LaundryModel;
  config: ResolvedConfig;
  layout: Layout;
  now: number;
  viewCtx: ViewCtx;
  views: Record<DrumKey, DrumView>;
  controller: CommandController;
  ui: UiState;
  on: Handlers;
  /** Card-picker sample: controls are inert. */
  sample: boolean;
  /** Current user is an admin (device-page links). */
  isAdmin: boolean;
}
