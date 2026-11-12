import { CheckInEntry } from "@/types/entry";
import { average, round1 } from "@/lib/utils";

export interface Insight {
  id: string;
  title: string;
  detail: string;
  tone: "positive" | "neutral" | "watch";
}

const MIN_GROUP_SIZE = 4;

/** Simple rule-based pattern detection. Every sentence describes an
 * association observed in the logs — never a diagnosis or prediction. */
export function generateInsights(entries: CheckInEntry[]): Insight[] {
  const insights: Insight[] = [];
  if (entries.length < 5) return insights;

  const lowSleep = entries.filter((e) => e.sleepHours < 6);
  const okSleep = entries.filter((e) => e.sleepHours >= 7);

  if (lowSleep.length >= MIN_GROUP_SIZE && okSleep.length >= MIN_GROUP_SIZE) {
    const lowMood = average(lowSleep.map((e) => e.mood));
    const okMood = average(okSleep.map((e) => e.mood));
    if (okMood - lowMood >= 0.4) {
      insights.push({
        id: "sleep-mood",
        title: "Sleep and mood",
        detail: `In your logs, nights under 6 hours of sleep are associated with lower mood (avg ${round1(
          lowMood
        )}/5) compared to nights with 7+ hours (avg ${round1(okMood)}/5).`,
        tone: "watch",
      });
    }

    const lowFocus = average(lowSleep.map((e) => e.focus));
    const okFocus = average(okSleep.map((e) => e.focus));
    if (okFocus - lowFocus >= 0.4) {
      insights.push({
        id: "sleep-focus",
        title: "Sleep and focus",
        detail: `Shorter sleep appears alongside reduced focus in your logs — averaging ${round1(
          lowFocus
        )}/5 on nights under 6 hours vs ${round1(okFocus)}/5 on nights with 7+ hours.`,
        tone: "watch",
      });
    }
  }

  const strategies = new Set<string>();
  entries.forEach((e) => e.copingStrategies.forEach((s) => strategies.add(s)));

  strategies.forEach((strategy) => {
    const used = entries.filter((e) => e.copingStrategies.includes(strategy));
    const notUsed = entries.filter((e) => !e.copingStrategies.includes(strategy));
    if (used.length >= MIN_GROUP_SIZE && notUsed.length >= MIN_GROUP_SIZE) {
      const usedStress = average(used.map((e) => e.stress));
      const notUsedStress = average(notUsed.map((e) => e.stress));
      if (notUsedStress - usedStress >= 0.4) {
        insights.push({
          id: `coping-${strategy}`,
          title: strategy,
          detail: `Days you logged "${strategy}" appeared with lower stress in your logs (avg ${round1(
            usedStress
          )}/5) versus days without it (avg ${round1(notUsedStress)}/5).`,
          tone: "positive",
        });
      }
    }
  });

  const envMap = new Map<string, number[]>();
  entries.forEach((e) => {
    const arr = envMap.get(e.environment) ?? [];
    arr.push(e.stress);
    envMap.set(e.environment, arr);
  });
  let highestEnv: { env: string; avg: number } | null = null;
  let lowestEnv: { env: string; avg: number } | null = null;
  envMap.forEach((vals, env) => {
    if (vals.length < MIN_GROUP_SIZE) return;
    const avg = average(vals);
    if (!highestEnv || avg > highestEnv.avg) highestEnv = { env, avg };
    if (!lowestEnv || avg < lowestEnv.avg) lowestEnv = { env, avg };
  });
  if (
    highestEnv &&
    lowestEnv &&
    (highestEnv as { env: string; avg: number }).env !== (lowestEnv as { env: string; avg: number }).env &&
    (highestEnv as { env: string; avg: number }).avg - (lowestEnv as { env: string; avg: number }).avg >= 0.5
  ) {
    const hi = highestEnv as { env: string; avg: number };
    const lo = lowestEnv as { env: string; avg: number };
    insights.push({
      id: "environment-stress",
      title: "Environment and stress",
      detail: `Entries tagged "${hi.env}" show higher average stress (${round1(
        hi.avg
      )}/5) than entries tagged "${lo.env}" (${round1(lo.avg)}/5) in your logs.`,
      tone: "neutral",
    });
  }

  const stressorCounts = new Map<string, number>();
  entries.forEach((e) =>
    e.stressors.forEach((s) => stressorCounts.set(s, (stressorCounts.get(s) ?? 0) + 1))
  );
  let topStressor: { name: string; count: number } | null = null;
  stressorCounts.forEach((count, name) => {
    if (!topStressor || count > (topStressor as { name: string; count: number }).count) {
      topStressor = { name, count };
    }
  });
  if (topStressor && (topStressor as { name: string; count: number }).count >= MIN_GROUP_SIZE) {
    const t = topStressor as { name: string; count: number };
    const pct = Math.round((t.count / entries.length) * 100);
    insights.push({
      id: "top-stressor",
      title: "Most frequent stressor",
      detail: `"${t.name}" is the most frequently logged stressor in your logs, appearing in ${pct}% of entries.`,
      tone: "neutral",
    });
  }

  insights.push({
    id: "streak",
    title: "Logging activity",
    detail: `You have ${entries.length} entries in your logs. Longer logs tend to reveal clearer patterns over time.`,
    tone: "neutral",
  });

  return insights;
}