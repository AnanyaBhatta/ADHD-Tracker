import { CheckInEntry, Environment } from "@/types/entry";

// Deterministic PRNG so demo data is stable across renders (no hydration mismatches).
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(n)));
}

function isoDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

const STRESSOR_POOL = [
  "Work deadline",
  "Poor sleep",
  "Finances",
  "Relationships",
  "Health",
  "Uncertainty",
  "Social situation",
  "Workload",
];

const COPING_POOL = [
  "Walk",
  "Breathing exercise",
  "Music",
  "Talked to someone",
  "Rest / nap",
  "Journaling",
  "Movement / exercise",
  "Time outdoors",
];

const ENV_POOL: Environment[] = ["Home", "Office", "Outdoors", "Commuting", "Social"];

/**
 * Generates deterministic demo data ending yesterday, so "today" is left
 * open for the user's own first check-in. Built-in loose correlations
 * (short sleep -> higher stress, breathing exercise -> lower stress) give
 * the insights engine something real to surface.
 */
export function generateSeedData(days = 30): CheckInEntry[] {
  const rand = mulberry32(42);
  const entries: CheckInEntry[] = [];

  for (let i = days; i >= 1; i--) {
    const date = isoDaysAgo(i);
    const environment = ENV_POOL[Math.floor(rand() * ENV_POOL.length)];

    const stressorCount = rand() < 0.3 ? 0 : rand() < 0.7 ? 1 : 2;
    const stressors: string[] = [];
    for (let s = 0; s < stressorCount; s++) {
      const candidate = STRESSOR_POOL[Math.floor(rand() * STRESSOR_POOL.length)];
      if (!stressors.includes(candidate)) stressors.push(candidate);
    }

    const sleepPenalty = stressors.includes("Poor sleep") ? 1.5 : 0;
    const roughSleep = Math.max(
      3,
      Math.min(9, Math.round((5 + rand() * 4 - sleepPenalty) * 2) / 2)
    );

    const usedBreathing = rand() < 0.35;
    const usedWalk = rand() < 0.3;
    const copingStrategies: string[] = [];
    if (usedBreathing) copingStrategies.push("Breathing exercise");
    if (usedWalk) copingStrategies.push("Walk");
    if (rand() < 0.2) {
      const extra = COPING_POOL[Math.floor(rand() * COPING_POOL.length)];
      if (!copingStrategies.includes(extra)) copingStrategies.push(extra);
    }

    let stressBase = 2 + stressors.length * 0.8 + rand() * 1.2;
    if (roughSleep < 6) stressBase += 1.2;
    if (usedBreathing) stressBase -= 0.9;
    if (environment === "Commuting") stressBase += 0.4;
    const stress = clamp(stressBase, 1, 5);

    const mood = clamp(5.5 - stress * 0.55 + rand() * 0.8, 1, 5);
    const focus = clamp(5.2 - stress * 0.4 + rand() * 0.8 - (roughSleep < 6 ? 0.6 : 0), 1, 5);
    const sleepQuality = clamp(roughSleep < 6 ? 2 + rand() * 1.5 : 3 + rand() * 2, 1, 5);

    entries.push({
      id: `seed-${date}`,
      date,
      mood,
      focus,
      stress,
      sleepHours: roughSleep,
      sleepQuality,
      environment,
      stressors,
      copingStrategies,
      source: "seed",
    });
  }

  return entries;
}