import { CheckInEntry } from "@/types/entry";
import { average, round1 } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

export function SummaryStats({ entries }: { entries: CheckInEntry[] }) {
  const stats = [
    { label: "Avg mood", value: entries.length ? `${round1(average(entries.map((e) => e.mood)))}/5` : "—" },
    { label: "Avg focus", value: entries.length ? `${round1(average(entries.map((e) => e.focus)))}/5` : "—" },
    { label: "Avg stress", value: entries.length ? `${round1(average(entries.map((e) => e.stress)))}/5` : "—" },
    { label: "Avg sleep", value: entries.length ? `${round1(average(entries.map((e) => e.sleepHours)))}h` : "—" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="text-center">
          <p className="font-mono text-2xl text-moss">{s.value}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">{s.label}</p>
        </Card>
      ))}
    </div>
  );
}