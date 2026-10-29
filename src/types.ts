// Minimal local Home Assistant frontend types: only what this card touches.
// Deliberately not depending on custom-card-helpers, whose types lag the frontend.

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
  context?: { id: string; parent_id?: string | null; user_id?: string | null };
}

export type HassEntities = Record<string, HassEntity>;

/** hass.entities rows (EntityRegistryDisplayEntry). */
export interface EntityRegistryDisplayEntry {
  entity_id: string;
  name?: string | null;
  icon?: string;
  device_id?: string | null;
  area_id?: string | null;
  platform?: string;
  translation_key?: string;
  entity_category?: "config" | "diagnostic" | null;
  hidden?: boolean;
  has_entity_name?: boolean;
}

export interface DeviceRegistryEntry {
  id: string;
  name: string | null;
  name_by_user: string | null;
  manufacturer?: string | null;
  model?: string | null;
  config_entries?: string[];
}

export interface FrontendLocaleData {
  language: string;
  number_format?: string;
  time_format?: "language" | "system" | "12" | "24";
  time_zone?: "local" | "server";
  date_format?: string;
}

export interface ServiceCallError {
  code?: number | string;
  message?: string;
}

export interface HomeAssistant {
  states: HassEntities;
  entities: Record<string, EntityRegistryDisplayEntry>;
  devices: Record<string, DeviceRegistryEntry>;
  locale: FrontendLocaleData;
  language: string;
  config: { time_zone: string; version?: string };
  user?: { id?: string; name?: string; is_admin: boolean };
  themes?: { darkMode?: boolean };
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>,
  ): Promise<unknown>;
  callWS?<T>(msg: Record<string, unknown>): Promise<T>;
}

export interface ActionConfig {
  action: string;
  [key: string]: unknown;
}

export type LayoutOption = "auto" | "full" | "stacked" | "compact";
export type Layout = "full" | "stacked" | "compact";
export type TimeDisplay = "finish" | "remaining" | "both";
export type DrumSelection = "both" | "washer" | "dryer";
export type DrumOrder = "washer_first" | "dryer_first";
export type LanguageOption = "auto" | "en" | "ms";

export interface LaundryCardConfig {
  type: string;
  device_id?: string;
  title?: string;
  layout?: LayoutOption;
  time_display?: TimeDisplay;
  drums?: DrumSelection;
  order?: DrumOrder;
  collapse_idle?: boolean;
  show_notices?: boolean;
  show_stepper?: boolean;
  show_totals?: boolean;
  show_controls?: "auto" | "never";
  confirm_start?: boolean;
  off_style?: "keep" | "collapse";
  language?: LanguageOption;
  tap_action?: ActionConfig;
  [key: string]: unknown;
}

export type DrumKey = "washer" | "dryer";

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LaundryCardConfig): void;
}

declare global {
  // Injected by Vite `define` (see vite.config.ts).
  const __CARD_VERSION__: string;
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
  interface HASSDomEvents {
    "config-changed": { config: LaundryCardConfig };
  }
}
