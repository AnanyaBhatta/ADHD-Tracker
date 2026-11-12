"use client";
import { useEffect, useState } from "react";
import { CheckInEntry } from "@/types/entry";
import { generateSeedData } from "@/lib/seedData";
import { getUserEntries } from "@/lib/storage";
import { combineEntries } from "@/lib/utils";
import { generateInsights, Insight } from "@/lib/insights";
import { InsightCard } from "@/components/insights/InsightCard";

export default function InsightsPage() {
  const [entries, setEntries] = useState<CheckInEntry[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const combined = combineEntries(generateSeedData(), getUserEntries());
    setEntries(combined);
    setInsights(generateInsights(combined));
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm text-ink/50">Looking through your logs…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-3xl text-moss">Insights</h1>
      <p className="mt-2 text-sm text-ink/60">
        Simple, rule-based patterns noticed in your logs. Not a diagnosis — just observations to reflect on.
      </p>

      {insights.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-mist p-8 text-center">
          <p className="text-sm text-ink/60">
            Log a few more check-ins and patterns will start to appear here. You have {entries.length} entries so far.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {insights.map((i) => (
            <InsightCard key={i.id} insight={i} />
          ))}
        </div>
      )}

      <div className="mt-10 rounded-2xl bg-mist/60 p-5 text-xs leading-relaxed text-ink/60">
        Regulation Tracker highlights associations noticed in your own logs. It is not a medical, diagnostic,
        or treatment tool, and it does not replace professional care.
      </div>
    </main>
  );
}