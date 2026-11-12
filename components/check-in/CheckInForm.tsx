"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ENVIRONMENTS,
  STRESSORS,
  COPING_STRATEGIES,
  CheckInEntry,
  Environment,
} from "@/types/entry";
import { saveUserEntry } from "@/lib/storage";
import { Pill } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";

function Slider({
  label,
  value,
  onChange,
  lowLabel,
  highLabel,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  lowLabel: string;
  highLabel: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-ink">{label}</label>
        <span className="font-mono text-sm text-moss">{value}/5</span>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-sage-dark"
      />
      <div className="mt-1 flex justify-between text-xs text-ink/40">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}

export function CheckInForm() {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);

  const [mood, setMood] = useState(3);
  const [focus, setFocus] = useState(3);
  const [stress, setStress] = useState(3);
  const [sleepHours, setSleepHours] = useState("");
  const [sleepQuality, setSleepQuality] = useState(3);
  const [environment, setEnvironment] = useState<Environment>("Home");
  const [stressors, setStressors] = useState<string[]>([]);
  const [copingStrategies, setCopingStrategies] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  function toggle(list: string[], setList: (v: string[]) => void, item: string) {
    setList(
      list.includes(item) ? list.filter((x) => x !== item) : [...list, item]
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const entry: CheckInEntry = {
      id: `${today}-${Math.random().toString(36).slice(2, 8)}`,
      date: today,
      mood,
      focus,
      stress,
      sleepHours: Number(sleepHours || 0),
      sleepQuality,
      environment,
      stressors,
      copingStrategies,
      notes: notes.trim() || undefined,
      source: "user",
    };

    saveUserEntry(entry);
    setSaved(true);
    setTimeout(() => router.push("/dashboard"), 900);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="space-y-6">
        <Slider
          label="Mood"
          value={mood}
          onChange={setMood}
          lowLabel="Low"
          highLabel="High"
        />
        <Slider
          label="Focus"
          value={focus}
          onChange={setFocus}
          lowLabel="Scattered"
          highLabel="Sharp"
        />
        <Slider
          label="Stress"
          value={stress}
          onChange={setStress}
          lowLabel="Calm"
          highLabel="Overwhelmed"
        />
      </Card>

      <Card className="space-y-6">
        <div>
          <label className="text-sm font-medium text-ink">
            Sleep (hours last night)
          </label>
          <input
            type="number"
            min={0}
            max={24}
            step={0.5}
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            placeholder="Example: 7.5"
            className="mt-2 w-full rounded-xl border border-mist bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sage"
          />
        </div>

        <Slider
          label="Sleep quality"
          value={sleepQuality}
          onChange={setSleepQuality}
          lowLabel="Restless"
          highLabel="Restful"
        />
      </Card>

      <Card>
        <label className="text-sm font-medium text-ink">Environment</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {ENVIRONMENTS.map((env) => (
            <Pill
              key={env}
              label={env}
              active={environment === env}
              onClick={() => setEnvironment(env)}
            />
          ))}
        </div>
      </Card>

      <Card>
        <label className="text-sm font-medium text-ink">
          What showed up today? (stressors)
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {STRESSORS.map((s) => (
            <Pill
              key={s}
              label={s}
              active={stressors.includes(s)}
              onClick={() => toggle(stressors, setStressors, s)}
            />
          ))}
        </div>
      </Card>

      <Card>
        <label className="text-sm font-medium text-ink">
          What helped today? (coping strategies)
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {COPING_STRATEGIES.map((s) => (
            <Pill
              key={s}
              label={s}
              active={copingStrategies.includes(s)}
              onClick={() =>
                toggle(copingStrategies, setCopingStrategies, s)
              }
            />
          ))}
        </div>
      </Card>

      <Card>
        <label className="text-sm font-medium text-ink">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Anything you want to remember about today…"
          className="mt-2 w-full resize-none rounded-xl border border-mist bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sage"
        />
      </Card>

      <button
        type="submit"
        className="w-full rounded-full bg-moss py-3 text-center text-sm font-medium text-paper transition-opacity hover:opacity-90"
      >
        {saved ? "Saved ✓" : "Save today's check-in"}
      </button>
    </form>
  );
}