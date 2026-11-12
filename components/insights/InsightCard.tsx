import { Insight } from "@/lib/insights";
import { Card } from "@/components/ui/Card";
import { Sparkles, Eye, AlertCircle } from "lucide-react";

const iconFor = { positive: Sparkles, neutral: Eye, watch: AlertCircle };
const colorFor = { positive: "text-sage-dark", neutral: "text-moss", watch: "text-amber" };

export function InsightCard({ insight }: { insight: Insight }) {
  const Icon = iconFor[insight.tone];
  return (
    <Card className="flex gap-3">
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${colorFor[insight.tone]}`} />
      <div>
        <p className="font-medium text-ink">{insight.title}</p>
        <p className="mt-1 text-sm text-ink/70">{insight.detail}</p>
      </div>
    </Card>
  );
}