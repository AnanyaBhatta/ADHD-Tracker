"use client";
import { CheckInEntry } from "@/types/entry";
import { formatDateLabel } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function MoodChart({ entries }: { entries: CheckInEntry[] }) {
  const data = entries.map((e) => ({
    date: formatDateLabel(e.date),
    Mood: e.mood,
    Focus: e.focus,
    Stress: e.stress,
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E4E9E6" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#1E2A28" }} />
          <YAxis domain={[0, 5]} tick={{ fontSize: 12, fill: "#1E2A28" }} />
          <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#E4E9E6", fontSize: 13 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="Mood" stroke="#6B8F82" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Focus" stroke="#D9A85C" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Stress" stroke="#3F5B52" strokeWidth={2} dot={false} strokeDasharray="4 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}