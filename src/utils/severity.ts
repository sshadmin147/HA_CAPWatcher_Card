import { Severity, SEVERITIES } from "../types/cap-alert.js";

interface SeverityStyle {
  color: string;
  background: string | null;
  label: string;
}

const SEVERITY_MAP: Record<Severity, SeverityStyle> = {
  extreme: { color: "#9b1c1c", background: "#f9e0e0", label: "EXTREME" },
  severe:  { color: "#FF181E", background: "#fde8e8", label: "SEVERE" },
  warning: { color: "#FF8918", background: "#fef3e2", label: "WARNING" },
  watch:   { color: "#FFEB18", background: "#e8f0fd", label: "WATCH" },
  info:    { color: "#8b95a1", background: null,      label: "INFO" },
};

export function getSeverityStyle(severity: Severity): SeverityStyle {
  return SEVERITY_MAP[severity] ?? SEVERITY_MAP.info;
}

export function isValidSeverity(value: string): value is Severity {
  return (SEVERITIES as string[]).includes(value);
}

export function severityRank(severity: Severity): number {
  return SEVERITIES.indexOf(severity);
}

export function compareBySeverity(a: Severity, b: Severity): number {
  return severityRank(a) - severityRank(b);
}

export function meetsMinSeverity(severity: Severity, min: Severity): boolean {
  return severityRank(severity) <= severityRank(min);
}
