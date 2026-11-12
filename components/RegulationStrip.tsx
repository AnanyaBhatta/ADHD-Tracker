"use client";
import { CheckInEntry } from "@/types/entry";
import { formatDateLabel } from "@/lib/utils";

function colorFor(value: number | undefined) {
  if (value === undefined) return "bg-mist";
  if (value >= 4) return "bg-sage";
  if (value >= 3) return "bg-sage-light";
  if (value >= 2) return "bg-amber";
  return "bg-moss";
}

export function RegulationStrip({ entries, days = 14 }: { entries: CheckInEntry[]; days?: number }) {
  const byDate = new Map(entries.map((e) => [e.date, e]));
  const tiles = Array.from({ length: days }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    const iso = d.toISOString().slice(0, 10);
    return { iso, entry: byDate.get(iso) };
  });

  return (
    <div className="flex items-end gap-1.5">
      {tiles.map(({ iso, entry }) => (
        <div
          key={iso}
          title={`${formatDateLabel(iso)}${entry ? ` · mood ${entry.mood}/5` : " · no entry"}`}
          className={`h-8 w-3 rounded-full sm:h-10 sm:w-3.5 ${colorFor(entry?.mood)}`}
        />
      ))}
    </div>
  );
}