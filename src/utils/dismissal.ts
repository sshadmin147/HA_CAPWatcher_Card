const STORAGE_KEY = "ha_capwatcher_dismissed";

interface DismissedMap {
  [entityId: string]: string; // entity_id → state value at time of dismiss
}

function load(): DismissedMap {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as DismissedMap;
  } catch {
    return {};
  }
}

function save(map: DismissedMap): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function dismiss(entityId: string, currentState: string): void {
  const map = load();
  map[entityId] = currentState;
  save(map);
}

export function isDismissed(entityId: string, currentState: string): boolean {
  const map = load();
  return map[entityId] === currentState;
}

export function undismiss(entityId: string): void {
  const map = load();
  delete map[entityId];
  save(map);
}

// Remove stale entries for entities that no longer exist or have changed severity
export function pruneStale(activeEntityIds: Set<string>, currentStates: Record<string, string>): void {
  const map = load();
  let changed = false;
  for (const id of Object.keys(map)) {
    if (!activeEntityIds.has(id) || currentStates[id] !== map[id]) {
      delete map[id];
      changed = true;
    }
  }
  if (changed) save(map);
}

export function dismissedCount(activeEntityIds: Set<string>, currentStates: Record<string, string>): number {
  const map = load();
  return Object.keys(map).filter(
    (id) => activeEntityIds.has(id) && currentStates[id] === map[id]
  ).length;
}
