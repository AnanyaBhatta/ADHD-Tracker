"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, NotebookPen, Sparkles } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/check-in", label: "Check-in", icon: NotebookPen },
  { href: "/insights", label: "Insights", icon: Sparkles },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-mist bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-6 items-end gap-0.5">
            <span className="h-3 w-1.5 rounded-full bg-sage-light" />
            <span className="h-4 w-1.5 rounded-full bg-sage" />
            <span className="h-6 w-1.5 rounded-full bg-moss" />
          </span>
          <span className="font-display text-lg text-moss">Regulation Tracker</span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm transition-colors sm:px-3 ${
                  active ? "bg-sage/15 font-medium text-moss" : "text-ink/60 hover:text-moss"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}