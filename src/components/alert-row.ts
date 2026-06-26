import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CAPAlertEntity } from "../types/cap-alert.js";
import { getSeverityStyle } from "../utils/severity.js";
import { dismiss, isDismissed, undismiss } from "../utils/dismissal.js";
import { formatTimestamp } from "../utils/format.js";
import "./severity-badge.js";
import "./alert-detail.js";

@customElement("cap-alert-row")
export class AlertRow extends LitElement {
  @property({ attribute: false }) alert!: CAPAlertEntity;
  @property({ type: Boolean }) showGeometry = false;
  @property({ type: Boolean }) showAcknowledge = true;

  @state() private _expanded = false;
  @state() private _dismissed = false;

  static styles = css`
    :host { display: block; }
    .row {
      border-radius: 6px;
      margin-bottom: 8px;
      overflow: hidden;
      border: 1px solid transparent;
      transition: border-color 0.2s;
    }
    .row.dismissed {
      opacity: 0.45;
    }
    .row-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
    }
    .row-header:hover {
      filter: brightness(0.97);
    }
    .severity-stripe {
      width: 4px;
      border-radius: 2px;
      align-self: stretch;
      flex-shrink: 0;
    }
    .header-content {
      flex: 1;
      min-width: 0;
    }
    .headline {
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text-color, #111827);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }
    .sub {
      font-size: 11px;
      color: var(--secondary-text-color, #6b7280);
      margin-top: 2px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .row-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .expand-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: var(--secondary-text-color, #6b7280);
      font-size: 14px;
      line-height: 1;
      display: flex;
      align-items: center;
    }
    .ack-btn {
      background: none;
      border: 1px solid var(--divider-color, #d1d5db);
      border-radius: 4px;
      cursor: pointer;
      padding: 3px 8px;
      font-size: 11px;
      color: var(--secondary-text-color, #6b7280);
      white-space: nowrap;
    }
    .ack-btn:hover {
      border-color: var(--primary-color, #1d4ed8);
      color: var(--primary-color, #1d4ed8);
    }
    .ack-btn.active {
      background: var(--secondary-background-color, #f3f4f6);
    }
    .detail-wrap {
      border-top: 1px solid var(--divider-color, #e5e7eb);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._dismissed = isDismissed(this.alert.entity_id, this.alert.state);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("alert")) {
      this._dismissed = isDismissed(this.alert.entity_id, this.alert.state);
    }
  }

  private _toggleExpand(e: Event) {
    e.stopPropagation();
    this._expanded = !this._expanded;
  }

  private _toggleDismiss(e: Event) {
    e.stopPropagation();
    if (this._dismissed) {
      undismiss(this.alert.entity_id);
      this._dismissed = false;
    } else {
      dismiss(this.alert.entity_id, this.alert.state);
      this._dismissed = true;
    }
  }

  render() {
    const a = this.alert.attributes;
    const style = getSeverityStyle(this.alert.state);
    const issuedStr = a.issued ? formatTimestamp(a.issued) : null;

    return html`
      <div class="row ${this._dismissed ? "dismissed" : ""}"
           style="background:${a.severity_background ?? "var(--card-background-color, #fff)"}; border-color:${style.color}22">
        <div class="row-header" @click=${this._toggleExpand}>
          <div class="severity-stripe" style="background:${style.color}"></div>
          <div class="header-content">
            <div class="headline">${a.headline}</div>
            <div class="sub">
              <cap-severity-badge severity=${this.alert.state}></cap-severity-badge>
              ${a.area ? html`<span>${a.area}</span>` : ""}
              ${issuedStr ? html`<span>${issuedStr}</span>` : ""}
              <span>${a.feed_name}</span>
            </div>
          </div>
          <div class="row-actions">
            ${this.showAcknowledge ? html`
              <button class="ack-btn ${this._dismissed ? "active" : ""}"
                      @click=${this._toggleDismiss}
                      title="${this._dismissed ? "Restore" : "Acknowledge"}">
                ${this._dismissed ? "Acknowledged" : "Acknowledge"}
              </button>
            ` : ""}
            <button class="expand-btn" title="${this._expanded ? "Collapse" : "Expand"}">
              ${this._expanded ? "▲" : "▼"}
            </button>
          </div>
        </div>

        ${this._expanded ? html`
          <div class="detail-wrap">
            <cap-alert-detail
              .alert=${this.alert}
              .showGeometry=${this.showGeometry}
            ></cap-alert-detail>
          </div>
        ` : ""}
      </div>
    `;
  }
}
