import "../src/haismart-laundry-card";
import type { HaismartLaundryCard } from "../src/haismart-laundry-card";
import type { HomeAssistant } from "../src/types";
import { scenarios } from "./mock-hass";
import { AT_MS } from "../test/fixtures/scenarios";

// Minimal stand-ins for HA's own elements so the demo renders without the HA frontend.
if (!customElements.get("ha-card")) customElements.define("ha-card", class extends HTMLElement {});
if (!customElements.get("ha-icon"))
  customElements.define(
    "ha-icon",
    class extends HTMLElement {
      static observedAttributes = ["icon"];
      private _icon = "";
      set icon(v: string) {
        this._icon = v;
        this.render();
      }
      get icon() {
        return this._icon || this.getAttribute("icon") || "";
      }
      attributeChangedCallback() {
        this.render();
      }
      connectedCallback() {
        this.render();
      }
      private render() {
        // Render into a shadow root, like the real ha-icon: light-DOM children would break
        // Lit's template walker while the element upgrades during cloning.
        const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });
        const name = this.icon.replace("mdi:", "");
        this.style.cssText =
          "display:inline-flex;width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);flex:none;";
        root.textContent = "";
        const s = document.createElement("span");
        s.textContent = name ? name[0].toUpperCase() : "";
        s.title = this.icon;
        s.style.cssText =
          "display:inline-flex;width:100%;height:100%;border-radius:50%;border:1.5px solid currentColor;align-items:center;justify-content:center;font-size:calc(var(--mdc-icon-size, 24px) * .5);font-weight:600;box-sizing:border-box;font-family:system-ui,sans-serif;";
        root.appendChild(s);
      }
    },
  );

// The fixtures are anchored at 09:17 in Kuala Lumpur: run the demo's clock from there so their
// times read as intended (demo only; the card itself is untouched).
const realNow = Date.now.bind(Date);
const offset = AT_MS + 30_000 - realNow();
Date.now = () => realNow() + offset;

const log = document.getElementById("log")!;
const say = (msg: string) => {
  log.textContent = `${new Date().toLocaleTimeString()}  ${msg}\n${log.textContent}`.slice(0, 4000);
};
for (const ev of ["hass-more-info", "hass-action", "hass-notification", "location-changed", "haptic"])
  window.addEventListener(ev, (e) => say(`${ev} ${JSON.stringify((e as CustomEvent).detail)}`), true);

const cards = new Map<string, HaismartLaundryCard[]>();
const hassById = new Map<string, HomeAssistant>();
const list = scenarios(
  (id, h) => {
    hassById.set(id, decorate(h));
    for (const c of cards.get(id) ?? []) c.hass = hassById.get(id)!;
  },
  (id) => hassById.get(id)!,
);

const checked = (id: string) => (document.getElementById(id) as HTMLInputElement).checked;
const value = (id: string) => (document.getElementById(id) as HTMLSelectElement).value;

function decorate(h: HomeAssistant): HomeAssistant {
  const ms = checked("ms");
  const h24 = checked("h24");
  return { ...h, language: ms ? "ms" : "en", locale: { ...h.locale, language: ms ? "ms" : "en", time_format: h24 ? "24" : "12" } };
}

/** Widths the review asked for: a phone card, a 600px card (side by side), and compact. */
const WIDTHS: Array<[string, number]> = [
  ["Phone 343 px", 343],
  ["600 px", 600],
  ["Compact 260 px", 260],
];

function render() {
  const themes = document.getElementById("themes")!;
  themes.textContent = "";
  cards.clear();
  const layout = value("layout") as "auto" | "full" | "stacked" | "compact";
  const themeSel = value("theme");
  const filter = value("only");
  for (const theme of themeSel === "both" ? ["light", "dark"] : [themeSel]) {
    const section = document.createElement("section");
    section.className = `theme ${theme}`;
    const h2 = document.createElement("h2");
    h2.textContent = theme === "light" ? "Light theme" : "Dark theme";
    section.appendChild(h2);
    for (const s of list) {
      if (filter && s.id !== filter) continue;
      if (!hassById.has(s.id)) hassById.set(s.id, decorate(s.build()));
      else hassById.set(s.id, decorate(hassById.get(s.id)!));
      const row = document.createElement("div");
      row.className = "scenario";
      const h3 = document.createElement("h3");
      h3.textContent = s.title;
      const p = document.createElement("p");
      p.textContent = s.note;
      const strip = document.createElement("div");
      strip.className = "widths";
      for (const [label, width] of WIDTHS) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.style.width = `${width}px`;
        const cap = document.createElement("div");
        cap.className = "cap";
        cap.textContent = label;
        const card = document.createElement("haismart-laundry-card") as HaismartLaundryCard;
        card.setConfig({ type: "custom:haismart-laundry-card", ...(s.config ?? {}), ...(layout !== "auto" ? { layout } : {}) });
        card.hass = hassById.get(s.id)!;
        cards.set(s.id, [...(cards.get(s.id) ?? []), card]);
        cell.append(cap, card);
        strip.appendChild(cell);
      }
      row.append(h3, p, strip);
      section.appendChild(row);
    }
    themes.appendChild(section);
  }
}

const only = document.getElementById("only") as HTMLSelectElement;
for (const s of list) {
  const o = document.createElement("option");
  o.value = s.id;
  o.textContent = s.title;
  only.appendChild(o);
}
for (const id of ["ms", "h24", "layout", "theme", "only"]) document.getElementById(id)!.addEventListener("change", render);
render();
