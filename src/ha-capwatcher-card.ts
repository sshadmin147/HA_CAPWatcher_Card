import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "./types/ha-types.js";
import { CardConfig, CAPAlertEntity, Severity } from "./types/cap-alert.js";
import { filterAlertEntities, getHighestSeverity, getLastUpdated } from "./utils/entity-filter.js";
import { pruneStale } from "./utils/dismissal.js";
import { getSeverityStyle } from "./utils/severity.js";
import "./components/alert-row.js";
import "./components/no-alerts-state.js";

@customElement("ha-capwatcher-card")
export class HACAPWatcherCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: CardConfig;

  static getConfigElement() {
    import("./ha-capwatcher-editor.js");
    return document.createElement("ha-capwatcher-card-editor");
  }

  static getStubConfig(): Partial<CardConfig> {
    return { type: "custom:ha-capwatcher-card", entry: "", title: "NZ Weather Alerts" };
  }

  setConfig(config: CardConfig) {
    if (!config.entry) throw new Error("entry is required in card config");
    this._config = { show_header: true, max_alerts: 10, min_severity: "info",
      sort_by: "severity", show_geometry: false, show_acknowledge: true, ...config };
  }

  static styles = css`
    :host { display: block; }
    ha-card {
      display: block;
      overflow: hidden;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px 8px;
      border-bottom: 1px solid var(--divider-color, #e5e7eb);
    }
    .title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text-color, #111827);
    }
    .severity-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .count-badge {
      font-size: 11px;
      padding: 1px 6px;
      border-radius: 10px;
      background: var(--secondary-background-color, #e5e7eb);
      color: var(--secondary-text-color, #6b7280);
      font-weight: 600;
    }
    .content {
      padding: 12px;
    }
    .error {
      padding: 16px;
      color: var(--error-color, #dc2626);
      font-size: 13px;
    }
  `;

  private _getAlerts(): CAPAlertEntity[] {
    if (!this.hass || !this._config) return [];
    const states = this.hass.states;
    return filterAlertEntities(states, this._config.entry, {
      minSeverity: this._config.min_severity as Severity,
      sortBy: this._config.sort_by,
      maxAlerts: this._config.max_alerts,
    });
  }

  updated() {
    if (!this.hass || !this._config) return;
    const alerts = this._getAlerts();
    const activeIds = new Set(alerts.map(a => a.entity_id));
    const currentStates: Record<string, string> = {};
    for (const a of alerts) currentStates[a.entity_id] = a.state;
    pruneStale(activeIds, currentStates);
  }

  render() {
    if (!this._config) return nothing;
    if (!this._config.entry) {
      return html`<ha-card><div class="error">Configuration error: entry name required.</div></ha-card>`;
    }

    const alerts = this._getAlerts();
    const highest = getHighestSeverity(alerts);
    const highestStyle = highest ? getSeverityStyle(highest) : null;
    const lastUpdated = getLastUpdated(this.hass?.states ?? {}, this._config.entry);
    const showHeader = this._config.show_header !== false;
    const title = this._config.title ?? "NZ Weather Alerts";

    return html`
      <ha-card>
        ${showHeader ? html`
          <div class="card-header">
            <div class="title-wrap">
              ${highestStyle ? html`
                <div class="severity-dot" style="background:${highestStyle.color}"></div>
              ` : ""}
              <span class="card-title">${title}</span>
            </div>
            ${alerts.length > 0 ? html`
              <span class="count-badge">${alerts.length}</span>
            ` : ""}
          </div>
        ` : ""}

        <div class="content">
          ${alerts.length === 0
            ? html`<cap-no-alerts-state .lastUpdated=${lastUpdated}></cap-no-alerts-state>`
            : alerts.map(alert => html`
                <cap-alert-row
                  .alert=${alert}
                  .showGeometry=${this._config!.show_geometry ?? false}
                  .showAcknowledge=${this._config!.show_acknowledge ?? true}
                ></cap-alert-row>
              `)
          }
        </div>
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-capwatcher-card": HACAPWatcherCard;
  }
}

// Register with HA Lovelace
(window as unknown as Record<string, unknown>).customCards ??= [];
((window as unknown as Record<string, unknown>).customCards as unknown[]).push({
  type: "ha-capwatcher-card",
  name: "HA-CAPWatcher Card",
  description: "Displays NZ CAP weather alerts from the HA-CAPWatcher integration",
  preview: true,
  documentationURL: "https://github.com/AlastairSpencer/HA_CAPWatcher_Card",
});
