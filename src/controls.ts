// Command controller (§6.5): one per card. Sends button presses, then waits for the machine to
// confirm through state. Nothing here changes what the card shows optimistically, and nothing is
// ever retried automatically. Pending state is in memory only.

import type { DrumKey, HomeAssistant } from "./types";
import { type Command, type DrumModel, commandConfirmed } from "./model/derive";
import { type HumanError, humaniseError } from "./model/errors";

export type PendingPhase = "sending" | "waiting" | "confirmed" | "unconfirmed" | "error";

export interface PendingState {
  drum: DrumKey;
  cmd: Command;
  phase: PendingPhase;
  entity: string;
  error?: HumanError;
  /** Status of the drum when the error was shown; the strip clears when it changes. */
  statusAtError?: string;
}

export interface ControllerHost {
  requestUpdate(): void;
  onConfirmed?(drum: DrumKey, cmd: Command): void;
  onUnconfirmed?(drum: DrumKey, cmd: Command): void;
  onError?(drum: DrumKey, cmd: Command, err: HumanError): void;
}

export const CONFIRM_TIMEOUT_MS = 45_000;
export const CONFIRMED_DISPLAY_MS = 3_000;

export class CommandController {
  private readonly states = new Map<DrumKey, PendingState>();
  private readonly timers = new Map<DrumKey, ReturnType<typeof setTimeout>>();
  private sendingDrum?: DrumKey;

  constructor(private readonly host: ControllerHost) {}

  get(drum: DrumKey): PendingState | undefined {
    return this.states.get(drum);
  }

  /** Drum whose command is in the "sending" phase (locks the other drum, gate 2). */
  get sending(): DrumKey | undefined {
    return this.sendingDrum;
  }

  /** Drums with a command still in flight (sending or waiting): gate 3. */
  get pending(): DrumKey[] {
    return [...this.states.values()]
      .filter((s) => s.phase === "sending" || s.phase === "waiting")
      .map((s) => s.drum);
  }

  isBusy(drum: DrumKey): boolean {
    const s = this.states.get(drum);
    return !!s && (s.phase === "sending" || s.phase === "waiting");
  }

  async run(hass: HomeAssistant, drum: DrumKey, cmd: Command, entity: string): Promise<void> {
    if (this.sendingDrum || this.isBusy(drum)) return; // further activations are ignored
    this.clearTimer(drum);
    this.states.set(drum, { drum, cmd, phase: "sending", entity });
    this.sendingDrum = drum;
    this.host.requestUpdate();
    try {
      await hass.callService("button", "press", { entity_id: entity });
    } catch (err) {
      const human = humaniseError(err);
      this.sendingDrum = undefined;
      this.states.set(drum, { drum, cmd, phase: "error", entity, error: human });
      this.host.onError?.(drum, cmd, human);
      this.host.requestUpdate();
      return;
    }
    this.sendingDrum = undefined;
    const st = this.states.get(drum);
    if (st && st.phase === "sending") {
      st.phase = "waiting";
      this.setTimer(drum, CONFIRM_TIMEOUT_MS, () => {
        const cur = this.states.get(drum);
        if (cur && cur.phase === "waiting") {
          cur.phase = "unconfirmed";
          this.host.onUnconfirmed?.(drum, cmd);
          this.host.requestUpdate();
        }
      });
    }
    this.host.requestUpdate();
  }

  /** Feed every fresh model in: confirms waiting commands and clears stale error strips. */
  observe(drums: DrumModel[]): void {
    for (const d of drums) {
      const st = this.states.get(d.key);
      if (!st) continue;
      if (st.phase === "waiting" && commandConfirmed(st.cmd, d)) {
        st.phase = "confirmed";
        this.host.onConfirmed?.(d.key, st.cmd);
        this.setTimer(d.key, CONFIRMED_DISPLAY_MS, () => {
          if (this.states.get(d.key)?.phase === "confirmed") this.states.delete(d.key);
          this.host.requestUpdate();
        });
        this.host.requestUpdate();
      } else if (st.phase === "error") {
        if (st.statusAtError === undefined) st.statusAtError = d.status;
        else if (st.statusAtError !== d.status) {
          this.states.delete(d.key);
          this.host.requestUpdate();
        }
      }
    }
  }

  dismiss(drum: DrumKey): void {
    const st = this.states.get(drum);
    if (st && (st.phase === "error" || st.phase === "unconfirmed" || st.phase === "confirmed")) {
      this.clearTimer(drum);
      this.states.delete(drum);
      this.host.requestUpdate();
    }
  }

  dispose(): void {
    for (const k of [...this.timers.keys()]) this.clearTimer(k);
  }

  private setTimer(drum: DrumKey, ms: number, fn: () => void): void {
    this.clearTimer(drum);
    this.timers.set(
      drum,
      setTimeout(() => {
        this.timers.delete(drum);
        fn();
      }, ms),
    );
  }

  private clearTimer(drum: DrumKey): void {
    const h = this.timers.get(drum);
    if (h !== undefined) clearTimeout(h);
    this.timers.delete(drum);
  }
}
