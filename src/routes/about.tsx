import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TOKYO Neon City Guide" },
      {
        name: "description",
        content: "About this neon love letter to Tokyo.",
      },
      { property: "og:title", content: "About — TOKYO" },
      {
        property: "og:description",
        content: "The story behind a neon-soaked digital guide to Tokyo.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <SectionHeader kicker="案内 · ABOUT" title="About" kana="案内" />
      <div className="prose prose-invert max-w-none space-y-5 text-muted-foreground">
        <p className="text-lg">
          <span className="text-pink-red-gradient font-display text-2xl">TOKYO</span> is a
          neon love letter to a city of 37 million stories — built as a small,
          fast, open-source web app you can fork on GitHub.
        </p>
        <p>
          Every landmark you see on this site is a real-time 3D model rendered in
          your browser with WebGL. Every word is hand-written. Every link to fly
          there points to <strong className="text-foreground">EgyptAir</strong> — because
          this site was made by a Cairene who fell in love with Tokyo.
        </p>
        <p>
          It is also a love letter to the connection between two of the world's
          oldest living capitals. Cairo, القاهرة. Tokyo, 東京. Two cities that
          mark time with sound from the sky.
        </p>
        <div className="mt-8 grid gap-4 not-prose sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="font-kana text-xs text-neon-pink">技術</p>
            <h4 className="mt-1 font-display uppercase">Tech</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              React 19, TanStack Start, Three.js, Tailwind v4.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="font-kana text-xs text-neon-pink">配備</p>
            <h4 className="mt-1 font-display uppercase">Deploy</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Push to GitHub — deploys to Cloudflare Workers in seconds.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="font-kana text-xs text-neon-pink">作者</p>
            <h4 className="mt-1 font-display uppercase">Made by</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              <Link to="/credits" className="text-neon-pink hover:underline">
                See credits →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
