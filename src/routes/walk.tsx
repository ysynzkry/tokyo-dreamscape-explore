import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/walk")({
  head: () => ({
    meta: [
      { title: "Walk in Tokyo 散歩 — Street View" },
      {
        name: "description",
        content:
          "Walk Shibuya, Asakusa, Akihabara and more in Google Street View without leaving your seat.",
      },
      { property: "og:title", content: "Walk in Tokyo — Street View" },
      {
        property: "og:description",
        content: "Hop between Tokyo's most famous street corners in real Street View.",
      },
    ],
  }),
  component: WalkPage,
});

const SPOTS = [
  {
    name: "Shibuya Crossing",
    kana: "渋谷スクランブル交差点",
    note: "The world's busiest pedestrian scramble.",
    embed:
      "https://www.google.com/maps?q=&layer=c&cbll=35.659493,139.700544&cbp=11,0,0,0,0&output=svembed",
  },
  {
    name: "Senso-ji Temple",
    kana: "浅草寺",
    note: "Tokyo's oldest temple in old-town Asakusa.",
    embed:
      "https://www.google.com/maps?q=&layer=c&cbll=35.714772,139.796651&cbp=11,0,0,0,0&output=svembed",
  },
  {
    name: "Akihabara Electric Town",
    kana: "秋葉原電気街",
    note: "Eight floors of anime, manga and arcades.",
    embed:
      "https://www.google.com/maps?q=&layer=c&cbll=35.698683,139.773105&cbp=11,0,0,0,0&output=svembed",
  },
  {
    name: "Takeshita Street",
    kana: "竹下通り",
    note: "Harajuku's pastel runway of street fashion.",
    embed:
      "https://www.google.com/maps?q=&layer=c&cbll=35.671237,139.703569&cbp=11,0,0,0,0&output=svembed",
  },
  {
    name: "Shinjuku Kabukicho",
    kana: "歌舞伎町",
    note: "Neon city — Tokyo's loudest night district.",
    embed:
      "https://www.google.com/maps?q=&layer=c&cbll=35.694003,139.702956&cbp=11,0,0,0,0&output=svembed",
  },
  {
    name: "Tokyo Tower base",
    kana: "東京タワー",
    note: "Look up — 333m of red lattice steel.",
    embed:
      "https://www.google.com/maps?q=&layer=c&cbll=35.658581,139.745433&cbp=11,0,0,0,0&output=svembed",
  },
];

function WalkPage() {
  const [active, setActive] = useState(0);
  const spot = SPOTS[active];
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeader
        kicker="散歩 · WALK"
        title="Walk in Tokyo"
        kana="散歩"
        subtitle="Drag the Street View. Cross the world without crossing the room."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-2xl border border-border bg-ink shadow-[var(--shadow-neon-pink)]">
          <iframe
            key={spot.embed}
            title={spot.name}
            src={spot.embed}
            className="h-[420px] w-full md:h-[600px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="space-y-2">
          <p className="font-kana text-sm text-neon-pink">{spot.kana}</p>
          <h2 className="font-display text-3xl uppercase">{spot.name}</h2>
          <p className="text-sm text-muted-foreground">{spot.note}</p>

          <div className="mt-5 grid gap-2">
            {SPOTS.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setActive(i)}
                className={`group flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                  i === active
                    ? "border-neon-pink/70 bg-card shadow-[var(--shadow-neon-pink)]"
                    : "border-border bg-background/50 hover:bg-card"
                }`}
              >
                <span>
                  <span className="block font-display text-sm uppercase">{s.name}</span>
                  <span className="block font-kana text-xs text-neon-pink/80">{s.kana}</span>
                </span>
                <span className={i === active ? "text-neon-pink" : "text-muted-foreground"}>
                  ▸
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
