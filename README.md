# Haier Laundry Centre card

A Home Assistant dashboard card for the Haier **HWD140-BD14LCGNU1** twin washer + dryer laundry
centre, driven by the [haismart](https://github.com/enapt/haismart-local) integration.

It answers one question at a glance, from across the room: **is it done, and when?** Each drum shows
a single clear answer (a finish *clock time*, not a countdown), the phase it is in, a short progress
stepper, notices like "Softener empty", and, when you have enabled controls in the integration,
safe **Start / Pause / Cancel** buttons.

- Calm when the machine is off: it drops off Wi-Fi after every cycle, and the card says "Machine is
  off · since 9:12 pm" instead of a wall of "unavailable".
- Honest times: estimates are marked with "~", long times are rounded to 5 minutes, and small
  jitter in the machine's countdown does not make the clock jump.
- Safe controls: nothing is sent unless the drum's own remote-control permission is on at the
  machine's panel, Cancel always asks first, and the card waits for the machine to confirm instead
  of pretending a command worked.
- English and Bahasa Melayu, light and dark themes, works from phone width up, and in both
  masonry and sections dashboards.

## Screenshots

_Screenshots go here (light and dark, full and stacked, machine off)._ Run `npm run demo` to see
every scenario locally.

## Requirements

| | |
|---|---|
| Home Assistant | 2025.1 or newer (tested against 2026.10) |
| haismart integration | **v0.73.2.2 or newer** of the fork used here. That version publishes the `haier_value` attribute (the raw value behind every label) and the `translation_key`s of the laundry buttons (`washer_start`, `washer_pause`, `washer_cancel`, `dryer_start`, `dryer_pause`, `dryer_cancel`) and of the `fault` sensor. Older versions still work in a "labels only" mode, which the card editor points out. |
| Controls (optional) | Turn them on in **Settings › Devices & services › haismart › Configure › Enable washer and dryer controls**. Without them the card is a status display. |

## Install

### HACS (or the Home Assistant Marketplace)

1. HACS › the three-dot menu › **Custom repositories**.
2. Add this repository's URL with the category **Dashboard** (HACS calls it `plugin`).
3. Find **Haismart Laundry Card**, download it, and reload the browser when asked.

HACS registers the resource for you at `/hacsfiles/haismart-laundry-card/haismart-laundry-card.js`.

### Manual

1. Download `haismart-laundry-card.js` from the latest release (or `dist/` in this repository).
2. Copy it to `<config>/www/haismart-laundry-card.js`.
3. **Settings › Dashboards › ⋮ › Resources › Add resource**: URL `/local/haismart-laundry-card.js`,
   type **JavaScript module**.
4. Reload the browser.

## Configuration

Add the card from the dashboard's card picker (search for "Haier Laundry Centre"); it finds your
laundry centre automatically and writes its `device_id` into the config so it never switches to
another device later.

### Visual editor

Every option is available in the visual editor. Below the form, a **Detected** panel shows what the
card found: the device, both drums, whether controls are on, the remote-control flags, whether the
integration is new enough for full support, and the fault sensor.

### YAML

```yaml
type: custom:haismart-laundry-card
device_id: 0123456789abcdef0123456789abcdef   # optional; picked automatically when omitted
title: Laundry                                  # optional; defaults to the device name
layout: auto            # auto | full | stacked | compact
time_display: both      # both | finish | remaining
drums: both             # both | washer | dryer
order: washer_first     # washer_first | dryer_first
collapse_idle: true     # stacked layout: fold the idle drum while the other runs
show_notices: true
show_stepper: true
show_totals: false      # water and energy for this cycle, or lifetime totals
show_controls: auto     # auto | never
confirm_start: false    # ask before Start (Cancel always asks; that can't be turned off)
off_style: keep         # keep | collapse (one line while the machine is off)
language: auto          # auto | en | ms
tap_action:
  action: more-info     # default: more-info for the drum's phase entity
```

All keys are optional. Unknown keys are kept and logged once in the browser console.

### Layouts

| Layout | Width | What you get |
|---|---|---|
| full | 460 px and wider | Washer and dryer side by side |
| stacked | 280–459 px | One above the other; the idle drum folds to a single row while the other runs |
| compact | under 280 px | One 40 px row per drum: icon, finish time, attention dot |

`layout: auto` picks one from the card's own width. In a sections dashboard the card takes the full
width by default.

## How it reads the machine

The card never hard-codes entity ids. It finds the haismart device that has laundry entities and
maps each entity by its `haier_attribute` state attribute, then reads `haier_value` (the published
number or boolean) rather than the English label. While the machine is off Home Assistant drops
those attributes, so the card remembers the mapping in the browser (`localStorage`) and, failing
that, recognises the entity ids the integration generates.

## Safety notes

- **Remote control must be on at the machine.** For safety the Haier only accepts commands after
  you press the remote / Wi-Fi key on that drum's panel. Until then every button is disabled with an
  explanation, and nothing is sent. Opening the washer door turns remote control off again.
- **Cancel is destructive** (the programme can't be resumed) and always asks for confirmation.
  "Stop tumbling" during anti-crease also asks.
- **Nothing changes optimistically.** After a button press the card shows "Waiting for the washer to
  confirm…" and only reports success when the machine's own status changes. If nothing changes in
  45 seconds it says so and asks you to check the machine. It never retries by itself.
- **Errors are shown in the card**, in plain words, with the integration's exact message under
  "Details".
- Start is disabled while the machine reports a fault, while the door is open, when no programme is
  selected, and for 5 seconds after the programme changes.

### Known limits

These come from the integration and the machine and are worth checking on your own unit:

1. No laundry command has yet been seen accepted end to end; the 45 s confirmation window is a guess.
2. Whether a delayed start's remaining time includes the delay is unverified, so those times say "about".
3. The washer's "Tumbling" (16) and the Care phases are mapped from their labels only.
4. "Finished at" and "Off since" can show the time Home Assistant restarted.
5. The unit of `washerTotalElectricityUsed` is not documented; the card shows the entity's own unit or none.
6. Native `<dialog>`, `color-mix()` and container units need testing in the Companion apps; fallbacks are in place.

## Translations

English is the source. The Bahasa Melayu strings must be reviewed by a native speaker before each
release. Programme names, unrecognised phase and message texts and fault descriptions are shown as
the integration provides them.

## Development

```sh
npm install
npm run typecheck   # tsc --noEmit
npm test            # vitest: model tests plus a happy-dom render test
npm run build       # dist/haismart-laundry-card.js (single minified ES module, lit bundled)
npm run demo        # http://127.0.0.1:5180 — every scenario in light and dark themes, mocked
npm run gen:contract  # regenerate src/model/contract.ts from test/fixtures/entity_contract.json
```

`dist/` is committed because HACS installs from the repository; CI fails if it is out of date.

| Path | Contents |
|---|---|
| `src/model/` | Pure logic: discovery, derivation, gates, error wording, the generated contract tables |
| `src/view.ts` | Model to display strings (headline, hero, support line, screen-reader sentence) |
| `src/controls.ts` | Command controller: send, wait for confirmation, time out, never retry |
| `src/ui/` | Lit templates for tiles, controls, notices, the fault banner and dialogs |
| `src/editor.ts` | Visual editor (HA's `ha-form`) and the Detected panel |
| `src/translations/` | `en.json`, `ms.json` |
| `test/fixtures/` | The real decoded snapshot, the entity contract and the scenario builders |

## License

MIT © kucau0901
