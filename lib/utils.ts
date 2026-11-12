import { CheckInEntry } from "@/types/entry";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDateISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function formatDateLabel(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Merges seed + user entries. A user entry on the same date replaces the seed entry for that date. */
export function combineEntries(
  seed: CheckInEntry[],
  user: CheckInEntry[]
): CheckInEntry[] {
  const userDates = new Set(user.map((e) => e.date));
  const filteredSeed = seed.filter((e) => !userDates.has(e.date));
  return [...filteredSeed, ...user].sort((a, b) => a.date.localeCompare(b.date));
}