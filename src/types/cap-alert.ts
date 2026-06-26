export type Severity = "extreme" | "severe" | "warning" | "watch" | "info";

export const SEVERITIES: Severity[] = ["extreme", "severe", "warning", "watch", "info"];

export interface CAPAlertAttributes {
  headline: string;
  severity: Severity;
  urgency: string;
  certainty: string;
  issued: string;
  onset: string | null;
  expires: string | null;
  area: string;
  description: string | null;
  instructions: string | null;
  cap_url: string | null;
  source: string | null;
  category: string | null;
  feed_name: string;
  severity_color: string;
  severity_background: string | null;
  geometry_polygon: string | null;
}

export interface CAPAlertEntity {
  entity_id: string;
  state: Severity;
  attributes: CAPAlertAttributes;
  last_updated: string;
}

export interface CardConfig {
  type: string;
  entry: string;
  title?: string;
  show_header?: boolean;
  max_alerts?: number;
  min_severity?: Severity;
  sort_by?: "severity" | "issued" | "feed_name";
  show_geometry?: boolean;
  show_acknowledge?: boolean;
}
