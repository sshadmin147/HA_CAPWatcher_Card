export interface HassEntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntityState>;
  language: string;
  locale: {
    language: string;
    number_format: string;
    time_zone: string;
  };
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}
