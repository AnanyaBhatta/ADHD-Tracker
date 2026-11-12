"use client";
import { CheckInEntry } from "@/types/entry";
import { formatDateLabel } from "@/lib/utils";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function SleepStressChart({ entries }: { entries: CheckInEntry[] }) {
  const data = entries.map((e) => ({
    date: formatDateLabel(e.date),
    "Sleep (hrs)": e.sleepHours,
    Stress: e.stress,
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E4E9E6" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#1E2A28" }} />
          <YAxis tick={{ fontSize: 12, fill: "#1E2A28" }} />
          <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#E4E9E6", fontSize: 13 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="Sleep (hrs)" fill="#9CBAB0" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="Stress" stroke="#D9A85C" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}