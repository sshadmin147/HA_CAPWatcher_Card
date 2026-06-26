import { LitElement, html, css, svg } from "lit";
import { customElement, property } from "lit/decorators.js";

// Equirectangular projection — viewBox 0 0 180 280
// x = (lon - 166) * 13,  y = (|lat| - 34) * 20

// North Island — simplified clockwise outline
// Key landmarks: Cape Reinga (NW), East Cape, Wellington (S), Taranaki (W bulge)
const NORTH_ISLAND =
  "M 87,8 " +       // Cape Reinga
  "L 111,20 " +     // Whangarei east
  "L 117,60 " +     // Auckland east
  "L 126,54 " +     // Coromandel
  "L 137,76 " +     // Bay of Plenty
  "L 163,74 " +     // East Cape
  "L 143,110 " +    // Hawke's Bay
  "L 121,148 " +    // Cape Palliser (SE tip)
  "L 114,146 " +    // Wellington
  "L 116,138 " +    // Kapiti coast
  "L 117,118 " +    // Whanganui
  "L 100,106 " +    // Taranaki tip (west bulge)
  "L 104,90 " +     // North Taranaki
  "L 111,56 " +     // Auckland west / Manukau
  "L 91,30 Z";      // West Northland back to Reinga

// South Island — simplified clockwise outline
// Key landmarks: Farewell Spit (NW), Marlborough Sounds (NE), Bluff (S), Fiordland (W)
const SOUTH_ISLAND =
  "M 87,130 " +     // Farewell Spit (NW)
  "L 96,146 " +     // Nelson
  "L 104,140 " +    // Marlborough Sounds top
  "L 103,150 " +    // Blenheim / Wairau
  "L 100,168 " +    // Kaikoura
  "L 90,196 " +     // Banks Peninsula / Christchurch
  "L 65,222 " +     // Oamaru
  "L 48,244 " +     // Balclutha / Clutha
  "L 31,252 " +     // Bluff (southernmost)
  "L 25,242 " +     // Invercargill west
  "L 22,228 " +     // Fiordland coast
  "L 25,214 " +     // Milford Sound area
  "L 34,198 " +     // Jackson Bay / Haast
  "L 55,188 " +     // Franz Josef
  "L 68,170 " +     // Greymouth / Hokitika
  "L 73,156 " +     // Westport
  "L 79,144 Z";     // Karamea back to Farewell Spit

// Stewart Island — small island south of Bluff
const STEWART_ISLAND = "M 28,258 L 34,264 L 30,270 L 22,268 L 20,262 Z";

interface ParsedGeometry {
  type: "circle" | "polygon";
  circle?: [number, number, number];
  points?: number[][];
}

function latLonToSvg(lat: number, lon: number): [number, number] {
  const x = (lon - 166) * 13;
  const y = (Math.abs(lat) - 34) * 20;
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
    const r = (radiusKm / 111) * 20;
    return { type: "circle", circle: [cx, cy, Math.max(r, 4)] };
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
      width: 90px;
      height: 140px;
      overflow: visible;
    }
    .land {
      fill: var(--secondary-background-color, #e5e7eb);
      stroke: var(--divider-color, #9ca3af);
      stroke-width: 0.8;
    }
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
        <svg viewBox="0 0 180 280" xmlns="http://www.w3.org/2000/svg">
          <path class="land" d=${NORTH_ISLAND} />
          <path class="land" d=${SOUTH_ISLAND} />
          <path class="land" d=${STEWART_ISLAND} />
          ${alertShape}
        </svg>
      </div>
    `;
  }
}
