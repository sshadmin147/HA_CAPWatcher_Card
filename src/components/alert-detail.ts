import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CAPAlertEntity } from "../types/cap-alert.js";
import { formatTimestamp } from "../utils/format.js";
import "./nz-minimap.js";

@customElement("cap-alert-detail")
export class AlertDetail extends LitElement {
  @property({ attribute: false }) alert!: CAPAlertEntity;
  @property({ type: Boolean }) showGeometry = false;

  static styles = css`
    :host { display: block; }
    .detail {
      padding: 0 12px 12px 12px;
      font-size: 13px;
      color: var(--primary-text-color, #111827);
      line-height: 1.5;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 2px 12px;
      margin-bottom: 10px;
    }
    .meta-label {
      color: var(--secondary-text-color, #6b7280);
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding-top: 1px;
    }
    .meta-value {
      font-size: 13px;
    }
    .description {
      margin: 8px 0;
      white-space: pre-wrap;
      font-size: 13px;
    }
    .instructions {
      margin: 8px 0;
      padding: 8px 10px;
      background: var(--secondary-background-color, #f3f4f6);
      border-left: 3px solid var(--primary-color, #1d4ed8);
      border-radius: 0 4px 4px 0;
      white-space: pre-wrap;
      font-size: 13px;
    }
    .instructions-label {
      font-weight: 600;
      margin-bottom: 4px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color, #6b7280);
    }
    .source-link {
      display: inline-block;
      margin-top: 8px;
      font-size: 12px;
      color: var(--primary-color, #1d4ed8);
      text-decoration: none;
    }
    .source-link:hover { text-decoration: underline; }
  `;

  private _clean(text: string | null | undefined): string {
    if (!text) return "";
    // CAP XML often has leading tabs on each line — strip them
    return text.split("\n").map(l => l.trimStart()).join("\n").trim();
  }

  render() {
    const a = this.alert.attributes;

    return html`
      <div class="detail">
        <div class="meta-grid">
          ${a.issued ? html`
            <span class="meta-label">Issued</span>
            <span class="meta-value">${formatTimestamp(a.issued)}</span>
          ` : ""}
          ${a.onset ? html`
            <span class="meta-label">From</span>
            <span class="meta-value">${formatTimestamp(a.onset)}</span>
          ` : ""}
          ${a.expires ? html`
            <span class="meta-label">Until</span>
            <span class="meta-value">${formatTimestamp(a.expires)}</span>
          ` : ""}
          ${a.area ? html`
            <span class="meta-label">Area</span>
            <span class="meta-value">${a.area}</span>
          ` : ""}
          ${a.urgency ? html`
            <span class="meta-label">Urgency</span>
            <span class="meta-value">${a.urgency}</span>
          ` : ""}
          ${a.certainty ? html`
            <span class="meta-label">Certainty</span>
            <span class="meta-value">${a.certainty}</span>
          ` : ""}
          ${a.category ? html`
            <span class="meta-label">Category</span>
            <span class="meta-value">${a.category}</span>
          ` : ""}
          ${a.source ? html`
            <span class="meta-label">Source</span>
            <span class="meta-value">${a.source}</span>
          ` : ""}
        </div>

        ${a.description ? html`
          <div class="description">${this._clean(a.description)}</div>
        ` : ""}

        ${a.instructions ? html`
          <div class="instructions">
            <div class="instructions-label">Instructions</div>
            ${this._clean(a.instructions)}
          </div>
        ` : ""}

        ${this.showGeometry && a.geometry_polygon ? html`
          <cap-nz-minimap
            .geometryPolygon=${a.geometry_polygon}
            .severityColor=${a.severity_color}
            .severityBackground=${a.severity_background}
          ></cap-nz-minimap>
        ` : ""}

        ${a.cap_url ? html`
          <a class="source-link" href=${a.cap_url} target="_blank" rel="noopener">
            View full alert ↗
          </a>
        ` : ""}
      </div>
    `;
  }
}
