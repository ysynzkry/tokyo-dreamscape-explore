import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/food")({
  head: () => ({
    meta: [
      { title: "Food 食 — Tokyo" },
      {
        name: "description",
        content:
          "Ramen at midnight, sushi at dawn, izakaya in between — eat your way through Tokyo.",
      },
      { property: "og:title", content: "Tokyo Food 食" },
      {
        property: "og:description",
        content: "A neon menu of ramen, sushi, izakaya and convenience-store wonders.",
      },
    ],
  }),
  component: FoodPage,
});

const DISHES = [
  { emoji: "🍜", kana: "ラーメン", name: "Ramen", note: "Tonkotsu, shoyu, tsukemen — slurping is a compliment." },
  { emoji: "🍣", kana: "寿司", name: "Sushi", note: "Tsukiji at 5am for the freshest cut you'll ever eat." },
  { emoji: "🥟", kana: "餃子", name: "Gyoza", note: "Crisp-bottomed pillows born in Utsunomiya, perfected in Tokyo." },
  { emoji: "🍢", kana: "おでん", name: "Oden", note: "A winter stew of daikon, egg & fishcake at any konbini." },
  { emoji: "🍙", kana: "おにぎり", name: "Onigiri", note: "The triangular fuel of every Tokyoite's commute." },
  { emoji: "🍤", kana: "天ぷら", name: "Tempura", note: "Lace-thin batter, sesame oil, eaten the moment it's plated." },
  { emoji: "🍡", kana: "団子", name: "Dango", note: "Three-color skewers under the cherry blossoms." },
  { emoji: "🍵", kana: "抹茶", name: "Matcha", note: "Stone-ground green tea, whisked to a froth." },
];

function FoodPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeader
        kicker="食 · FOOD"
        title="Eat the city"
        kana="食"
        subtitle="Tokyo holds more Michelin stars than anywhere on earth — and the best meal is often a 3am bowl of ramen."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DISHES.map((d, i) => (
          <div
            key={d.name}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-neon-red)] animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="text-5xl transition-transform group-hover:scale-110 animate-float-slow">
              {d.emoji}
            </div>
            <p className="mt-4 font-kana text-xs text-neon-pink">{d.kana}</p>
            <h3 className="font-display text-xl uppercase">{d.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
