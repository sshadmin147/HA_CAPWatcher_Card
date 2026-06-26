import { LitElement, html, css, svg } from "lit";
import { customElement, property } from "lit/decorators.js";

// Simplified NZ coastline — equirectangular projection
// viewBox 0 0 200 280, bounding box: lon 166–179, lat -34–-47
// x = (lon - 166) * 15.38, y = (|lat| - 34) * 21.54

// North Island approximate outline
const NORTH_ISLAND =
  "M103,11 L111,22 L128,43 L131,28 L153,62 L193,80 L168,123 L136,157 L108,151 L120,114 L133,88 L130,65 Z";

// South Island approximate outline
const SOUTH_ISLAND =
  "M103,140 L128,161 L162,211 L103,206 L77,230 L72,247 L37,267 L51,271 L39,215 L46,204 L85,172 L92,161 Z";

// Stewart Island approximate (small triangle)
const STEWART_ISLAND = "M55,271 L65,280 L48,280 Z";

interface ParsedGeometry {
  type: "circle" | "polygon";
  // circle: [cx, cy, r] in SVG units
  circle?: [number, number, number];
  // polygon: flat array of [x, y] pairs
  points?: number[][];
}

function latLonToSvg(lat: number, lon: number): [number, number] {
  const x = (lon - 166) * 15.38;
  const y = (Math.abs(lat) - 34) * 21.54;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function parseGeometry(raw: string): ParsedGeometry | null {
  // CAP circle: "lat,lon radius"
  const circleMatch = raw.match(/^(-?\d+\.?\d*),(-?\d+\.?\d*)\s+(\d+\.?\d*)$/);
  if (circleMatch) {
    const lat = parseFloat(circleMatch[1]);
    const lon = parseFloat(circleMatch[2]);
    const radiusKm = parseFloat(circleMatch[3]);
    const [cx, cy] = latLonToSvg(lat, lon);
    // Rough: 1 degree ≈ 111km; convert radius to SVG units via lat scale
    const r = (radiusKm / 111) * 21.54;
    return { type: "circle", circle: [cx, cy, Math.max(r, 3)] };
  }

  // CAP polygon: "lat1,lon1 lat2,lon2 ..."
  const pairs = raw.trim().split(/\s+/);
  if (pairs.length >= 3) {
    const points: number[][] = [];
    for (const pair of pairs) {
      const [latStr, lonStr] = pair.split(",");
      if (!latStr || !lonStr) return null;
      const lat = parseFloat(latStr);
      const lon = parseFloat(lonStr);
      if (isNaN(lat) || isNaN(lon)) return null;
      points.push(latLonToSvg(lat, lon));
    }
    return { type: "polygon", points };
  }

  return null;
}

@customElement("cap-nz-minimap")
export class NZMinimap extends LitElement {
  @property() geometryPolygon: string | null = null;
  @property() severityColor = "#8b95a1";
  @property() severityBackground: string | null = null;

  static styles = css`
    :host { display: block; }
    .map-wrap {
      display: flex;
      justify-content: center;
      padding: 8px 0;
    }
    svg {
      width: 100px;
      height: 140px;
      overflow: visible;
    }
    .land { fill: var(--secondary-background-color, #e5e7eb); stroke: var(--divider-color, #9ca3af); stroke-width: 0.5; }
    .alert-area { stroke-width: 1.5; }
  `;

  render() {
    const geo = this.geometryPolygon ? parseGeometry(this.geometryPolygon) : null;
    const fill = this.severityBackground ?? `${this.severityColor}33`;

    const alertShape = geo
      ? geo.type === "circle" && geo.circle
        ? svg`<circle
            class="alert-area"
            cx=${geo.circle[0]} cy=${geo.circle[1]} r=${geo.circle[2]}
            fill=${fill} stroke=${this.severityColor}
          />`
        : geo.type === "polygon" && geo.points
        ? svg`<polygon
            class="alert-area"
            points=${geo.points.map((p) => p.join(",")).join(" ")}
            fill=${fill} stroke=${this.severityColor}
          />`
        : ""
      : "";

    return html`
      <div class="map-wrap">
        <svg viewBox="0 0 200 290" xmlns="http://www.w3.org/2000/svg">
          <path class="land" d=${NORTH_ISLAND} />
          <path class="land" d=${SOUTH_ISLAND} />
          <path class="land" d=${STEWART_ISLAND} />
          ${alertShape}
        </svg>
      </div>
    `;
  }
}
