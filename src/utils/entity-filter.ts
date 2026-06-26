import { HassEntityState } from "../types/ha-types.js";
import { CAPAlertEntity, CardConfig, Severity, SEVERITIES } from "../types/cap-alert.js";
import { compareBySeverity, meetsMinSeverity } from "./severity.js";

const AGGREGATE_SUFFIXES = ["_alert_count", "_highest_severity", "_latest_headline"];

export function isAlertEntity(state: HassEntityState): boolean {
  return (
    (SEVERITIES as string[]).includes(state.state) &&
    typeof state.attributes["headline"] === "string" &&
    typeof state.attributes["feed_name"] === "string"
  );
}

export function filterAlertEntities(
  states: Record<string, HassEntityState>,
  config: CardConfig
): CAPAlertEntity[] {
  const min: Severity = config.min_severity ?? "info";

  const alerts = Object.values(states)
    .filter(isAlertEntity)
    .filter((s) => meetsMinSeverity(s.state as Severity, min))
    .map((s) => s as unknown as CAPAlertEntity);

  const sortBy = config.sort_by ?? "severity";

  alerts.sort((a, b) => {
    if (sortBy === "severity") return compareBySeverity(a.state, b.state);
    if (sortBy === "issued") {
      const ai = (a.attributes.issued as string) ?? "";
      const bi = (b.attributes.issued as string) ?? "";
      return bi.localeCompare(ai);
    }
    if (sortBy === "feed_name") {
      return (a.attributes.feed_name ?? "").localeCompare(b.attributes.feed_name ?? "");
    }
    return 0;
  });

  const max = config.max_alerts;
  return max != null ? alerts.slice(0, max) : alerts;
}

export function getAggregateEntityId(entry: string, suffix: string): string {
  return `sensor.ha_capwatcher_${entry}_${suffix}`;
}

export function getAlertCount(states: Record<string, HassEntityState>, entry: string): number {
  const id = getAggregateEntityId(entry, "alert_count");
  const val = parseInt(states[id]?.state ?? "0", 10);
  return isNaN(val) ? 0 : val;
}

export function getHighestSeverity(states: Record<string, HassEntityState>, entry: string): Severity | null {
  const id = getAggregateEntityId(entry, "highest_severity");
  const val = states[id]?.state;
  return (SEVERITIES as string[]).includes(val ?? "") ? (val as Severity) : null;
}

export function getLastUpdated(states: Record<string, HassEntityState>, entry: string): string | null {
  const id = getAggregateEntityId(entry, "alert_count");
  return states[id]?.last_updated ?? null;
}
