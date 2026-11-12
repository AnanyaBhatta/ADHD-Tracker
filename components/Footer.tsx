import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-mist py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 text-center">
        <p className="flex items-center gap-1.5 text-xs text-ink/50">
          <ShieldCheck className="h-3.5 w-3.5" />
          All check-in data stays in your browser&apos;s local storage. Nothing is uploaded.
        </p>
        <p className="text-xs text-ink/40">
          Regulation Tracker is a self-reflection tool, not a medical, diagnostic, or treatment product.
        </p>
      </div>
    </footer>
  );
}