// Card-owned strings. English is the source; Bahasa Melayu must be reviewed by a native speaker
// before each release (see README). Programme names, unknown phase/message text and fault labels
// are not translated: they are shown as the entity provides them.

import en from "./translations/en.json";
import ms from "./translations/ms.json";
import type { DrumKey, LanguageOption } from "./types";

export type Lang = "en" | "ms";
export type StringKey = keyof typeof en;

const TABLES: Record<Lang, Record<string, string>> = { en, ms };

export type Vars = Record<string, string | number | undefined>;

export function t(lang: Lang, key: string, vars?: Vars): string {
  const raw = TABLES[lang][key] ?? TABLES.en[key] ?? key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (m, name: string) => {
    const v = vars[name];
    return v === undefined ? m : String(v);
  });
}

export function has(lang: Lang, key: string): boolean {
  return key in TABLES[lang] || key in TABLES.en;
}

export function resolveLang(option: LanguageOption | undefined, haLanguage: string | undefined): Lang {
  if (option === "en" || option === "ms") return option;
  return (haLanguage || "").toLowerCase().startsWith("ms") ? "ms" : "en";
}

/** Vars for the {Drum} (title) and {drum} (sentence) placeholders. */
export function drumVars(lang: Lang, drum: DrumKey, other?: boolean): Vars {
  const otherKey: DrumKey = drum === "washer" ? "dryer" : "washer";
  const base: Vars = {
    Drum: t(lang, `drum.${drum}`),
    drum: t(lang, `drum.${drum}_lc`),
  };
  if (other !== false) base.other = t(lang, `drum.${otherKey}_lc`);
  return base;
}

/** Bound translator for one language. */
export type Translate = (key: string, vars?: Vars) => string;
export const translator = (lang: Lang): Translate => (key, vars) => t(lang, key, vars);
