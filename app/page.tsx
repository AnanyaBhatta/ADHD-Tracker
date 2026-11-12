import Link from "next/link";
import { ArrowRight, ShieldCheck, LineChart, NotebookPen, Sparkles } from "lucide-react";
import { RegulationStrip } from "@/components/RegulationStrip";
import { generateSeedData } from "@/lib/seedData";

const trackedThings = ["Mood", "Focus", "Sleep", "Stress", "Environment", "Stressors", "Coping strategies"];

const steps = [
  {
    icon: NotebookPen,
    title: "Log a minute a day",
    desc: "A short daily check-in captures mood, focus, sleep, stress, environment, and what helped.",
  },
  {
    icon: LineChart,
    title: "See it laid out",
    desc: "Your dashboard turns entries into charts you can actually read at a glance.",
  },
  {
    icon: Sparkles,
    title: "Notice gentle patterns",
    desc: "Simple, rule-based observations point out what appears together in your own logs.",
  },
];

export default function LandingPage() {
  const demoEntries = generateSeedData();

  return (
    <main>
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-14 sm:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-sage-dark">Private self-tracking</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-moss sm:text-5xl">
              Notice your patterns. Gently, privately.
            </h1>
            <p className="mt-4 max-w-md text-ink/70">
              Regulation Tracker is a quiet place to log mood, focus, sleep, and stress — and see what tends
              to show up together, without sending a single byte off your device.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/check-in"
                className="inline-flex items-center gap-2 rounded-full bg-moss px-5 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
              >
                Start today&apos;s check-in
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-mist bg-white px-5 py-3 text-sm font-medium text-ink hover:border-sage"
              >
                View demo dashboard
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-mist bg-white/70 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-ink/50">Last 14 days · demo data</p>
            <div className="mt-4">
              <RegulationStrip entries={demoEntries} days={14} />
            </div>
            <p className="mt-4 text-xs text-ink/50">
              Each tile reflects a logged day&apos;s mood. Yours will fill in as you check in.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-mist bg-white/50 py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-2xl text-moss">How it works</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title}>
                <span className="font-mono text-xs text-sage-dark">Step {i + 1}</span>
                <div className="mt-2 flex items-center gap-2">
                  <s.icon className="h-5 w-5 text-moss" />
                  <h3 className="font-medium text-ink">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-ink/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="font-display text-2xl text-moss">What you track</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {trackedThings.map((t) => (
            <span key={t} className="rounded-full border border-mist bg-white px-3.5 py-1.5 text-sm text-ink/70">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="border-t border-mist bg-white/50 py-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-moss" />
            <h2 className="font-display text-2xl text-moss">Privacy first</h2>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "No account, no sign-up, no email required.",
              "Entries are saved only in your browser's local storage.",
              "Nothing is sent to a server — this demo has none.",
              "Clear your browser data and your logs are gone, by design.",
            ].map((item) => (
              <li key={item} className="rounded-xl border border-mist bg-white p-4 text-sm text-ink/70">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="rounded-2xl bg-mist/60 p-6 text-sm leading-relaxed text-ink/60">
          Regulation Tracker is a personal reflection tool. It does not provide medical advice, diagnosis, or
          treatment, and it is not a substitute for care from a qualified professional.
        </div>
      </section>
    </main>
  );
}