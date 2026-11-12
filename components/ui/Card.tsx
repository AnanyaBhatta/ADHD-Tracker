import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-mist bg-white/70 p-5 shadow-sm backdrop-blur-sm", className)}>
      {children}
    </div>
  );
}