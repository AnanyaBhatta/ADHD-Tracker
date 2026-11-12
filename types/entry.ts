export type Environment =
  | "Home"
  | "Office"
  | "Outdoors"
  | "Commuting"
  | "Social"
  | "Other";

export const ENVIRONMENTS: Environment[] = [
  "Home",
  "Office",
  "Outdoors",
  "Commuting",
  "Social",
  "Other",
];

export const STRESSORS = [
  "Work deadline",
  "Poor sleep",
  "Finances",
  "Relationships",
  "Health",
  "Uncertainty",
  "Social situation",
  "Workload",
  "Other",
] as const;

export const COPING_STRATEGIES = [
  "Walk",
  "Breathing exercise",
  "Music",
  "Talked to someone",
  "Rest / nap",
  "Journaling",
  "Movement / exercise",
  "Time outdoors",
  "Creative activity",
  "Other",
] as const;

export interface CheckInEntry {
  id: string;
  date: string; // ISO date, yyyy-mm-dd
  mood: number; // 1-5
  focus: number; // 1-5
  stress: number; // 1-5
  sleepHours: number;
  sleepQuality: number; // 1-5
  environment: Environment;
  stressors: string[];
  copingStrategies: string[];
  notes?: string;
  source: "seed" | "user";
}