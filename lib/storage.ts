import { CheckInEntry } from "@/types/entry";

const STORAGE_KEY = "regulation-tracker:entries:v1";

export function getUserEntries(): CheckInEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CheckInEntry[]) : [];
  } catch {
    return [];
  }
}

/** Saves an entry, replacing any existing entry for the same date. */
export function saveUserEntry(entry: CheckInEntry): CheckInEntry[] {
  const existing = getUserEntries().filter((e) => e.date !== entry.date);
  const updated = [...existing, entry].sort((a, b) => a.date.localeCompare(b.date));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearUserEntries(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function hasLoggedToday(entries: CheckInEntry[]): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return entries.some((e) => e.date === today);
}