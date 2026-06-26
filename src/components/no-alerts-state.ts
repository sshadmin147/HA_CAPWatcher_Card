import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { formatTime } from "../utils/format.js";

@customElement("cap-no-alerts-state")
export class NoAlertsState extends LitElement {
  @property() lastUpdated: string | null = null;

  static styles = css`
    :host { display: block; }
    .no-alerts {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      color: var(--secondary-text-color, #6b7280);
    }
    .icon {
      font-size: 22px;
      color: #22c55e;
      flex-shrink: 0;
    }
    .text {
      display: flex;
      flex-direction: column;
    }
    .label {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #111827);
    }
    .sub {
      font-size: 12px;
      color: var(--secondary-text-color, #6b7280);
      margin-top: 2px;
    }
  `;

  render() {
    const t = this.lastUpdated ? formatTime(this.lastUpdated) : null;
    return html`
      <div class="no-alerts">
        <span class="icon">✓</span>
        <div class="text">
          <span class="label">No active alerts</span>
          ${t ? html`<span class="sub">Last checked: ${t}</span>` : ""}
        </div>
      </div>
    `;
  }
}
