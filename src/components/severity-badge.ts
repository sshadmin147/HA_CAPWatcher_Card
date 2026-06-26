import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Severity } from "../types/cap-alert.js";
import { getSeverityStyle } from "../utils/severity.js";

@customElement("cap-severity-badge")
export class SeverityBadge extends LitElement {
  @property() severity: Severity = "info";

  static styles = css`
    :host { display: inline-block; }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #fff;
      white-space: nowrap;
    }
    /* watch uses dark text — yellow badge needs it for contrast */
    .badge.watch { color: #1a1a1a; }
  `;

  render() {
    const style = getSeverityStyle(this.severity);
    return html`
      <span
        class="badge ${this.severity}"
        style="background:${style.color}"
      >${style.label}</span>
    `;
  }
}
