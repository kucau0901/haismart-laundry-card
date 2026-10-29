// Colour-mix percentages used by src/styles.ts. Kept here so test/contrast.test.ts checks the very
// numbers the stylesheet uses against Home Assistant's default light and dark themes.

export const MIX = {
  /** State tint behind tiles, banners and strips (% of the state colour over the surface). */
  tint: 8,
  /** Filled buttons: % of the primary colour mixed with black, under white text. */
  filled: 70,
  /** "Strong" variants of a colour for text/indicators: % of the colour, rest the text colour. */
  strong: 70,
  /** Focus ring: % of the primary colour, rest the text colour. */
  focus: 60,
  /** Secondary text on tinted tiles: % of the secondary text colour, rest the primary text colour. */
  mutedOnTint: 85,
} as const;
