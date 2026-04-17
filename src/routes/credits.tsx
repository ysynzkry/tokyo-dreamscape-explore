import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/credits")({
  head: () => ({
    meta: [
      { title: "Credits — TOKYO" },
      { name: "description", content: "Credits for the TOKYO Neon City Guide." },
      { property: "og:title", content: "Credits — TOKYO" },
      { property: "og:description", content: "The humans who made this site." },
    ],
  }),
  component: CreditsPage,
});

function CreditsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <SectionHeader kicker="クレジット · CREDITS" title="Credits" kana="制作" />

      <div className="grid gap-5 sm:grid-cols-2">
        <a
          href="https://github.com/ysynzkry"
          target="_blank"
          rel="noopener noreferrer"
          className="group overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-neon-pink/60 hover:shadow-[var(--shadow-neon-pink)]"
        >
          <p className="font-kana text-xs text-neon-pink">開発</p>
          <h3 className="mt-2 font-display text-2xl uppercase">@ysynzkry</h3>
          <p className="mt-2 text-sm text-muted-foreground">GitHub · Code & build</p>
          <span className="mt-6 inline-flex text-sm text-neon-pink opacity-0 transition-opacity group-hover:opacity-100">
            Open GitHub →
          </span>
        </a>

        <a
          href="https://instagram.com/hazem.elhassan"
          target="_blank"
          rel="noopener noreferrer"
          className="group overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-neon-pink/60 hover:shadow-[var(--shadow-neon-pink)]"
        >
          <p className="font-kana text-xs text-neon-pink">写真</p>
          <h3 className="mt-2 font-display text-2xl uppercase">@hazem.elhassan</h3>
          <p className="mt-2 text-sm text-muted-foreground">Instagram · Vision & curation</p>
          <span className="mt-6 inline-flex text-sm text-neon-pink opacity-0 transition-opacity group-hover:opacity-100">
            Open Instagram →
          </span>
        </a>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
        <h4 className="font-display uppercase text-foreground">Tools used</h4>
        <ul className="mt-3 grid gap-1 sm:grid-cols-2">
          <li>· React 19 + TanStack Start</li>
          <li>· three.js + react-three-fiber</li>
          <li>· Tailwind CSS v4</li>
          <li>· Google Maps Street View embed</li>
          <li>· Russo One & Zen Dots fonts</li>
          <li>· Hosted on Cloudflare Workers</li>
        </ul>
      </div>
    </div>
  );
}
