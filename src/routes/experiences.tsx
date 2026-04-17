import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Experiences 体験 — Build your Tokyo trip" },
      {
        name: "description",
        content:
          "Answer 5 questions and we'll tailor a Tokyo experience just for you.",
      },
      { property: "og:title", content: "Build your Tokyo trip" },
      {
        property: "og:description",
        content: "A 5-question quiz that hands you a personalised neon itinerary.",
      },
    ],
  }),
  component: ExperiencesPage,
});

type Vibe = "neon" | "zen" | "foodie" | "otaku" | "art";

const QUESTIONS: Array<{
  q: string;
  options: { label: string; vibe: Vibe }[];
}> = [
  {
    q: "Pick a sound for your first night.",
    options: [
      { label: "Pachinko & taxi horns in Shinjuku", vibe: "neon" },
      { label: "A bamboo fountain in a temple garden", vibe: "zen" },
      { label: "Slurping at a 4-seat ramen counter", vibe: "foodie" },
      { label: "Arcade chiptune in Akihabara", vibe: "otaku" },
      { label: "A vinyl café in Shimokitazawa", vibe: "art" },
    ],
  },
  {
    q: "Choose a morning.",
    options: [
      { label: "5am sushi at Toyosu market", vibe: "foodie" },
      { label: "Forest walk to Meiji Shrine", vibe: "zen" },
      { label: "Sleep in, brunch in Daikanyama", vibe: "art" },
      { label: "Maid café breakfast (yes really)", vibe: "otaku" },
      { label: "Sunrise on the Shibuya Sky deck", vibe: "neon" },
    ],
  },
  {
    q: "Pick a souvenir.",
    options: [
      { label: "Hand-blown sake cup", vibe: "zen" },
      { label: "Limited-edition KitKat box", vibe: "foodie" },
      { label: "Capsule-toy figure", vibe: "otaku" },
      { label: "Risograph print from a tiny gallery", vibe: "art" },
      { label: "LED Shibuya snow globe", vibe: "neon" },
    ],
  },
  {
    q: "How do you want to move?",
    options: [
      { label: "Yamanote line, all day, no plan", vibe: "neon" },
      { label: "Bicycle along the Sumida river", vibe: "zen" },
      { label: "Walking food tour of Yanaka", vibe: "foodie" },
      { label: "Themed go-kart through Akihabara", vibe: "otaku" },
      { label: "Hopping galleries in Roppongi", vibe: "art" },
    ],
  },
  {
    q: "End the trip with…",
    options: [
      { label: "Karaoke until the first train", vibe: "neon" },
      { label: "An onsen night in Hakone", vibe: "zen" },
      { label: "Omakase you'll think about for years", vibe: "foodie" },
      { label: "A whole day at Ghibli Museum", vibe: "otaku" },
      { label: "teamLab Planets in the dark", vibe: "art" },
    ],
  },
];

const RESULTS: Record<
  Vibe,
  { name: string; kana: string; tagline: string; itinerary: string[] }
> = {
  neon: {
    name: "The Neon Wanderer",
    kana: "ネオン",
    tagline: "Tokyo at full brightness, after midnight.",
    itinerary: [
      "Day 1 — Shinjuku Golden Gai bar crawl",
      "Day 2 — Shibuya Sky sunset + Scramble Crossing",
      "Day 3 — All-night karaoke + first-train ramen",
      "Day 4 — Day-trip Yokohama waterfront neon",
    ],
  },
  zen: {
    name: "The Quiet Pilgrim",
    kana: "静",
    tagline: "Tokyo's hidden gardens and breathing rooms.",
    itinerary: [
      "Day 1 — Meiji Shrine forest walk",
      "Day 2 — Tea ceremony in Yanaka",
      "Day 3 — Hakone onsen overnight",
      "Day 4 — Sumida river boat at golden hour",
    ],
  },
  foodie: {
    name: "The Hungry Tokyoite",
    kana: "食",
    tagline: "Eat 5 meals a day, no regrets.",
    itinerary: [
      "Day 1 — Toyosu sushi breakfast",
      "Day 2 — Tsukemen lunch + izakaya hop",
      "Day 3 — Omakase dinner in Ginza",
      "Day 4 — Depachika tour of Isetan basement",
    ],
  },
  otaku: {
    name: "The Pixel Pilgrim",
    kana: "オタク",
    tagline: "Anime, arcades and capsule toys.",
    itinerary: [
      "Day 1 — Akihabara Electric Town",
      "Day 2 — Ghibli Museum (book ahead!)",
      "Day 3 — Nakano Broadway vintage manga",
      "Day 4 — Pokémon Center Mega Tokyo",
    ],
  },
  art: {
    name: "The Slow Aesthete",
    kana: "美",
    tagline: "Galleries, cafés and risograph zines.",
    itinerary: [
      "Day 1 — teamLab Planets immersive art",
      "Day 2 — Roppongi: Mori + 21_21 Design Sight",
      "Day 3 — Daikanyama T-Site bookstore day",
      "Day 4 — Shimokitazawa vintage + vinyl",
    ],
  },
};

function ExperiencesPage() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<Vibe, number>>({
    neon: 0,
    zen: 0,
    foodie: 0,
    otaku: 0,
    art: 0,
  });

  const done = step >= QUESTIONS.length;
  const winner = (Object.entries(scores) as [Vibe, number][]).sort(
    (a, b) => b[1] - a[1]
  )[0][0];
  const result = RESULTS[winner];

  function answer(vibe: Vibe) {
    setScores((s) => ({ ...s, [vibe]: s[vibe] + 1 }));
    setStep((s) => s + 1);
  }

  function reset() {
    setStep(0);
    setScores({ neon: 0, zen: 0, foodie: 0, otaku: 0, art: 0 });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SectionHeader
        kicker="体験 · EXPERIENCES"
        title="Your Tokyo, tailored"
        kana="体験"
        subtitle="Five questions. One trip designed for you."
      />

      {!done ? (
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12 animate-fade-up">
          <div className="mb-6 flex items-center justify-between text-sm">
            <span className="font-kana text-neon-pink">
              {String(step + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
            </span>
            <div className="flex-1 mx-4 h-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-pink-red-gradient transition-all"
                style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
          <h2 className="font-display text-3xl uppercase md:text-4xl">
            {QUESTIONS[step].q}
          </h2>
          <div className="mt-8 grid gap-3">
            {QUESTIONS[step].options.map((o) => (
              <button
                key={o.label}
                onClick={() => answer(o.vibe)}
                className="group rounded-xl border border-border bg-background/50 p-4 text-left transition-all hover:border-neon-pink/60 hover:bg-card hover:shadow-[var(--shadow-neon-pink)]"
              >
                <span className="text-sm transition-colors group-hover:text-neon-pink">
                  {o.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border bg-card animate-fade-up">
          <div className="bg-tokyo-gradient p-8 md:p-12">
            <p className="font-kana text-sm text-white/80">{result.kana}</p>
            <h2 className="mt-2 font-display text-4xl uppercase text-white md:text-6xl">
              {result.name}
            </h2>
            <p className="mt-3 text-lg text-white/90">{result.tagline}</p>
          </div>
          <div className="p-8 md:p-12">
            <h3 className="font-display text-2xl uppercase">Your 4-day itinerary</h3>
            <ul className="mt-5 space-y-3">
              {result.itinerary.map((d) => (
                <li
                  key={d}
                  className="rounded-lg border border-border bg-background/50 px-4 py-3"
                >
                  <span className="text-neon-pink">▸</span> {d}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.egyptair.com/en/Plan-and-book/Pages/default.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-pink-red-gradient px-7 py-3 font-semibold text-white"
              >
                Book the flight ✈
              </a>
              <button
                onClick={reset}
                className="rounded-full border border-border px-7 py-3 font-semibold hover:bg-secondary"
              >
                Take it again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
