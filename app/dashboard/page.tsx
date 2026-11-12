"use client";
import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { CheckInEntry } from "@/types/entry";
import { generateSeedData } from "@/lib/seedData";
import { getUserEntries, hasLoggedToday } from "@/lib/storage";
import { combineEntries } from "@/lib/utils";
import { SummaryStats } from "@/components/dashboard/SummaryStats";
import { MoodChart } from "@/components/dashboard/MoodChart";
import { SleepStressChart } from "@/components/dashboard/SleepStressChart";
import { RecentEntries } from "@/components/dashboard/RecentEntries";
import { RegulationStrip } from "@/components/RegulationStrip";

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 font-display text-lg text-moss">{children}</h2>;
}

export default function DashboardPage() {
  const [entries, setEntries] = useState<CheckInEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loggedToday, setLoggedToday] = useState(false);

  useEffect(() => {
    const combined = combineEntries(generateSeedData(), getUserEntries());
    setEntries(combined);
    setLoggedToday(hasLoggedToday(combined));
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-sm text-ink/50">Loading your dashboard…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-moss">Dashboard</h1>
          <p className="mt-1 text-sm text-ink/60">{entries.length} entries in your logs · demo data included</p>
        </div>
        {!loggedToday && (
          <Link
            href="/check-in"
            className="inline-flex items-center gap-2 self-start rounded-full bg-moss px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            <CalendarCheck className="h-4 w-4" />
            Log today
          </Link>
        )}
      </div>

      <section className="mt-8">
        <p className="mb-2 text-xs uppercase tracking-wide text-ink/50">Last 14 days</p>
        <RegulationStrip entries={entries} days={14} />
      </section>

      <section className="mt-8">
        <SummaryStats entries={entries} />
      </section>

      <section className="mt-8">
        <SectionTitle>Mood, focus &amp; stress over time</SectionTitle>
        <div className="rounded-2xl border border-mist bg-white/70 p-4">
          <MoodChart entries={entries} />
        </div>
      </section>

      <section className="mt-8">
        <SectionTitle>Sleep &amp; stress</SectionTitle>
        <div className="rounded-2xl border border-mist bg-white/70 p-4">
          <SleepStressChart entries={entries} />
        </div>
      </section>

      <section className="mt-8">
        <SectionTitle>Recent entries</SectionTitle>
        <RecentEntries entries={entries} />
      </section>
    </main>
  );
}