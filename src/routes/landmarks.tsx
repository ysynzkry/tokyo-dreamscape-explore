import { createFileRoute } from "@tanstack/react-router";
import { LandmarkScene, type LandmarkKind } from "@/components/LandmarkScene";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/landmarks")({
  head: () => ({
    meta: [
      { title: "Landmarks 名所 — Tokyo in 3D" },
      {
        name: "description",
        content:
          "Spin Tokyo's icons in 3D: Tokyo Tower, Skytree, Senso-ji Pagoda and the great Torii.",
      },
      { property: "og:title", content: "Tokyo Landmarks in 3D" },
      {
        property: "og:description",
        content: "Rotate the icons of Tokyo while you read their stories.",
      },
    ],
  }),
  component: LandmarksPage,
});

const LANDMARKS: Array<{
  kind: LandmarkKind;
  name: string;
  kana: string;
  ring: string;
  desc: string;
  facts: string[];
}> = [
  {
    kind: "tower",
    name: "Tokyo Tower",
    kana: "東京タワー",
    ring: "TOKYO TOWER · 東京タワー · 1958 ·",
    desc: "A red-and-white lattice giant inspired by the Eiffel Tower, built in 1958 as a symbol of post-war rebirth. At 333m it stands 13m taller than its Paris cousin.",
    facts: ["Height: 333 m", "Opened: 1958", "Color: Aviation orange"],
  },
  {
    kind: "skytree",
    name: "Tokyo Skytree",
    kana: "東京スカイツリー",
    ring: "SKYTREE · 東京スカイツリー · 634M ·",
    desc: "The tallest tower in the world at 634m — a number chosen because 'mu-sa-shi' (6-3-4) is the old name for the Tokyo region.",
    facts: ["Height: 634 m", "Opened: 2012", "Tallest tower on Earth"],
  },
  {
    kind: "pagoda",
    name: "Senso-ji Pagoda",
    kana: "浅草寺",
    ring: "SENSO-JI · 浅草寺 · ASAKUSA ·",
    desc: "Tokyo's oldest temple, founded in 645 AD. The five-story pagoda glows above Asakusa, a hold-out of old Edo amid the modern sprawl.",
    facts: ["Founded: 645 AD", "District: Asakusa", "Five stories"],
  },
  {
    kind: "torii",
    name: "Meiji Torii",
    kana: "明治神宮 鳥居",
    ring: "MEIJI · 明治神宮 · TORII ·",
    desc: "The great cypress torii of Meiji Shrine marks the threshold between busy Harajuku and a 70-hectare forest planted by 100,000 hands.",
    facts: ["Wood: 1,500-yr-old cypress", "Built: 1920", "Gate to the spirits"],
  },
];

function LandmarksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeader
        kicker="名所 · LANDMARKS"
        title="Spin the city"
        kana="名所"
        subtitle="Drag, spin, learn. Each model rotates with its name wrapped in neon."
      />

      <div className="space-y-24">
        {LANDMARKS.map((l, i) => (
          <div
            key={l.kind}
            className={`grid items-center gap-10 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <LandmarkScene kind={l.kind} ringText={l.ring} height={500} />
            <div className="animate-fade-up">
              <p className="font-kana text-sm text-neon-pink">{l.kana}</p>
              <h2 className="mt-2 font-display text-4xl uppercase md:text-5xl">
                <span className="text-pink-red-gradient">{l.name}</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{l.desc}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                {l.facts.map((f) => (
                  <li
                    key={f}
                    className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
                  >
                    <span className="text-neon-pink">▸</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
