"use client";
import { cn } from "@/lib/utils";

export function Pill({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const classes = cn(
    "inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition-colors",
    active
      ? "border-sage bg-sage/15 text-moss font-medium"
      : "border-mist bg-white text-ink/70 hover:border-sage/60",
    onClick && "cursor-pointer select-none"
  );

  if (!onClick) {
    return <span className={classes}>{label}</span>;
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-pressed={active}>
      {label}
    </button>
  );
}