import { CheckInEntry } from "@/types/entry";
import { formatDateLabel } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";

export function RecentEntries({ entries }: { entries: CheckInEntry[] }) {
  const recent = [...entries].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7);

  return (
    <div className="space-y-3">
      {recent.map((e) => (
        <Card key={e.id}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-sm text-ink/60">{formatDateLabel(e.date)}</p>
            <div className="flex gap-3 text-xs text-ink/70">
              <span>Mood {e.mood}/5</span>
              <span>Focus {e.focus}/5</span>
              <span>Stress {e.stress}/5</span>
              <span>Sleep {e.sleepHours}h</span>
            </div>
          </div>
          {(e.stressors.length > 0 || e.copingStrategies.length > 0) && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {e.stressors.map((s) => (
                <Pill key={s} label={s} />
              ))}
              {e.copingStrategies.map((s) => (
                <Pill key={s} label={s} active />
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}