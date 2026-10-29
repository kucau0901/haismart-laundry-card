// Contrast of the card's colour tokens against Home Assistant's default light and dark themes,
// using the same color-mix() percentages as src/styles.ts (imported from src/tokens.ts).
import { describe, expect, it } from "vitest";
import { MIX } from "../src/tokens";

type RGB = [number, number, number];
const hex = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
/** color-mix(in srgb, a p%, b): channel-wise in gamma-encoded sRGB. */
const mix = (a: RGB, p: number, b: RGB): RGB => a.map((c, i) => (c * p + b[i] * (100 - p)) / 100) as RGB;
/** color-mix(in srgb, a p%, transparent) composited over `surface`. */
const tint = (a: RGB, p: number, surface: RGB): RGB => mix(a, p, surface);
const lum = ([r, g, b]: RGB) => {
  const f = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a: RGB, b: RGB) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const THEMES = {
  light: {
    primary: "#03a9f4", text: "#212121", secondary: "#727272", surface: "#ffffff",
    error: "#db4437", warning: "#ffa600", success: "#43a047", info: "#039be5",
  },
  dark: {
    primary: "#03a9f4", text: "#e1e1e1", secondary: "#9b9b9b", surface: "#1c1c1c",
    error: "#ef5350", warning: "#ffa600", success: "#43a047", info: "#039be5",
  },
};

describe.each(Object.entries(THEMES))("%s theme", (_name, th) => {
  const c = Object.fromEntries(Object.entries(th).map(([k, v]) => [k, hex(v)])) as Record<keyof typeof th, RGB>;
  const surfaces: Array<[string, RGB]> = [
    ["card", c.surface],
    ["running tint", tint(c.primary, MIX.tint, c.surface)],
    ["paused tint", tint(c.warning, MIX.tint, c.surface)],
    ["done tint", tint(c.success, MIX.tint, c.surface)],
    ["scheduled tint", tint(c.info, MIX.tint, c.surface)],
  ];
  const tinted = surfaces.slice(1);

  it("filled buttons (Start, Resume, the dialog's safe choice): white on the darkened fill >= 4.5", () => {
    expect(contrast(hex("#ffffff"), mix(c.primary, MIX.filled, hex("#000000")))).toBeGreaterThanOrEqual(4.5);
  });

  it.each(surfaces)("destructive text on %s >= 4.5", (_s, bg) => {
    expect(contrast(mix(c.error, MIX.strong, c.text), bg)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(surfaces)("focus ring on %s >= 3", (_s, bg) => {
    expect(contrast(mix(c.primary, MIX.focus, c.text), bg)).toBeGreaterThanOrEqual(3);
  });

  it.each(tinted)("secondary text on %s >= 4.5", (_s, bg) => {
    expect(contrast(mix(c.secondary, MIX.mutedOnTint, c.text), bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("secondary text on the card >= 4.5", () => {
    expect(contrast(c.secondary, c.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(surfaces)("primary text on %s >= 4.5", (_s, bg) => {
    expect(contrast(c.text, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("tonal buttons (Pause, Try again): text on the 12% tint >= 4.5", () => {
    expect(contrast(c.text, tint(c.primary, 12, c.surface))).toBeGreaterThanOrEqual(4.5);
  });

  it("notice marker and warning icons (strong warning) >= 3 on the card", () => {
    expect(contrast(mix(c.warning, MIX.strong, c.text), c.surface)).toBeGreaterThanOrEqual(3);
  });

  it.each(surfaces)("stepper: completed dot and upcoming ring >= 3 on %s", (_s, bg) => {
    expect(contrast(mix(c.primary, MIX.strong, c.text), bg)).toBeGreaterThanOrEqual(3);
    expect(contrast(c.secondary, bg)).toBeGreaterThanOrEqual(3);
  });
});
