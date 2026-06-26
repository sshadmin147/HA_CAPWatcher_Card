import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { HomeAssistant } from "./types/ha-types.js";
import { CardConfig, SEVERITIES } from "./types/cap-alert.js";

@customElement("ha-capwatcher-card-editor")
export class HACAPWatcherCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) _config?: CardConfig;

  setConfig(config: CardConfig) {
    this._config = config;
  }

  static styles = css`
    :host { display: block; padding: 16px; }
    .row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 16px;
    }
    label {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color, #6b7280);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    input[type="text"],
    input[type="number"],
    select {
      padding: 8px 10px;
      border: 1px solid var(--divider-color, #d1d5db);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #111827);
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
    }
    input:focus, select:focus {
      outline: none;
      border-color: var(--primary-color, #1d4ed8);
    }
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .toggle-label { font-size: 14px; color: var(--primary-text-color, #111827); }
    input[type="checkbox"] { width: 18px; height: 18px; cursor: pointer; }
    .hint { font-size: 11px; color: var(--secondary-text-color, #9ca3af); margin-top: 2px; }
  `;

  private _fire(key: string, value: unknown) {
    if (!this._config) return;
    const newConfig = { ...this._config, [key]: value };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: newConfig }, bubbles: true, composed: true }));
  }

  private _onInput(e: Event, key: string) {
    this._fire(key, (e.target as HTMLInputElement).value);
  }

  private _onNumber(e: Event, key: string) {
    const v = parseInt((e.target as HTMLInputElement).value, 10);
    if (!isNaN(v)) this._fire(key, v);
  }

  private _onCheck(e: Event, key: string) {
    this._fire(key, (e.target as HTMLInputElement).checked);
  }

  render() {
    if (!this._config) return html``;
    const c = this._config;

    return html`
      <div class="row">
        <label for="entry">Feed entry name</label>
        <input id="entry" type="text" .value=${c.entry ?? ""}
               @change=${(e: Event) => this._onInput(e, "entry")} />
        <span class="hint">The name of the HA-CAPWatcher integration entry (required)</span>
      </div>

      <div class="row">
        <label for="title">Card title</label>
        <input id="title" type="text" .value=${c.title ?? ""}
               placeholder="NZ Weather Alerts"
               @change=${(e: Event) => this._onInput(e, "title")} />
      </div>

      <div class="row">
        <label for="max_alerts">Max alerts shown</label>
        <input id="max_alerts" type="number" min="1" max="20"
               .value=${String(c.max_alerts ?? 10)}
               @change=${(e: Event) => this._onNumber(e, "max_alerts")} />
      </div>

      <div class="row">
        <label for="min_severity">Minimum severity</label>
        <select id="min_severity" .value=${c.min_severity ?? "info"}
                @change=${(e: Event) => this._onInput(e, "min_severity")}>
          ${SEVERITIES.map(s => html`<option value=${s} ?selected=${c.min_severity === s}>${s}</option>`)}
        </select>
      </div>

      <div class="row">
        <label for="sort_by">Sort alerts by</label>
        <select id="sort_by" .value=${c.sort_by ?? "severity"}
                @change=${(e: Event) => this._onInput(e, "sort_by")}>
          <option value="severity" ?selected=${(c.sort_by ?? "severity") === "severity"}>Severity</option>
          <option value="issued" ?selected=${c.sort_by === "issued"}>Issued time</option>
          <option value="feed_name" ?selected=${c.sort_by === "feed_name"}>Feed name</option>
        </select>
      </div>

      <div class="row">
        <div class="toggle-row">
          <span class="toggle-label">Show NZ map</span>
          <input type="checkbox" .checked=${c.show_geometry ?? false}
                 @change=${(e: Event) => this._onCheck(e, "show_geometry")} />
        </div>
      </div>

      <div class="row">
        <div class="toggle-row">
          <span class="toggle-label">Show acknowledge button</span>
          <input type="checkbox" .checked=${c.show_acknowledge ?? true}
                 @change=${(e: Event) => this._onCheck(e, "show_acknowledge")} />
        </div>
      </div>

      <div class="row">
        <div class="toggle-row">
          <span class="toggle-label">Show card header</span>
          <input type="checkbox" .checked=${c.show_header ?? true}
                 @change=${(e: Event) => this._onCheck(e, "show_header")} />
        </div>
      </div>
    `;
  }
}
