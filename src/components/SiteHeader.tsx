import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { MusicToggle } from "@/components/MusicToggle";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/landmarks", label: "Landmarks" },
  { to: "/culture", label: "Culture" },
  { to: "/food", label: "Food" },
  { to: "/history", label: "History" },
  { to: "/tokyo-cairo", label: "Tokyo × Cairo" },
  { to: "/experiences", label: "Experiences" },
  { to: "/walk", label: "Walk" },
  { to: "/trivia", label: "Trivia" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl text-pink-red-gradient">TOKYO</span>
          <span className="font-kana text-xs text-neon-pink">東京</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-neon-pink" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <MusicToggle />
          <a
            href="https://www.egyptair.com/en/Plan-and-book/Pages/default.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-pink-red-gradient px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition-transform hover:scale-105 md:inline-flex"
          >
            Get a ticket ✈
          </a>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "text-neon-pink" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href="https://www.egyptair.com/en/Plan-and-book/Pages/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-pink-red-gradient px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Get a ticket ✈
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
