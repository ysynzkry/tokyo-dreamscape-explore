import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/tokyo-cairo")({
  head: () => ({
    meta: [
      { title: "Tokyo × Cairo — Two ancient capitals" },
      {
        name: "description",
        content:
          "From pyramids to pagodas: the surprising lines connecting Cairo and Tokyo.",
      },
      { property: "og:title", content: "Tokyo × Cairo 東京·القاهرة" },
      {
        property: "og:description",
        content: "Two ancient capitals, one shared rhythm of street, food and faith.",
      },
    ],
  }),
  component: TokyoCairoPage,
});

const PAIRS = [
  {
    a: { city: "Cairo", kana: "القاهرة", note: "Founded 969 AD — 'The Victorious'." },
    b: { city: "Tokyo", kana: "東京", note: "Founded 1457 as Edo — 'Eastern Capital'." },
    bridge: "Both cities are imperial capitals named for victory or position.",
  },
  {
    a: { city: "Khan El Khalili", kana: "خان الخليلي", note: "14th-century bazaar of brass, spice and lantern-light." },
    b: { city: "Ameyoko", kana: "アメ横", note: "Open-air market under the Yamanote tracks." },
    bridge: "Markets where every alley smells different.",
  },
  {
    a: { city: "Koshary", kana: "كشري", note: "Rice, lentils, pasta, fried onions, hot sauce — Cairo in a bowl." },
    b: { city: "Ramen", kana: "ラーメン", note: "Noodles, broth, egg, scallion, chili oil — Tokyo in a bowl." },
    bridge: "Two national dishes that are really 'everything in a bowl'.",
  },
  {
    a: { city: "The Nile at sunset", kana: "النيل", note: "Felucca sails on the slow gold river." },
    b: { city: "Sumida at sunset", kana: "隅田川", note: "Yakatabune boats glide under cherry blossoms." },
    bridge: "Cities you understand best from a slow boat at dusk.",
  },
  {
    a: { city: "Adhan", kana: "الأذان", note: "Five times a day, the call rolls across the rooftops." },
    b: { city: "Temple bells", kana: "鐘", note: "108 strikes on New Year's Eve to release earthly desires." },
    bridge: "Both cities mark time with sound from the sky.",
  },
];

function TokyoCairoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeader
        kicker="東京 · القاهرة"
        title="Tokyo × Cairo"
        kana="二つの古都"
        subtitle="Two of the world's oldest living capitals — and more in common than you'd think."
      />

      <div className="space-y-10">
        {PAIRS.map((p, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-3xl border border-border bg-card animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="grid md:grid-cols-2">
              <div className="relative bg-tokyo-gradient p-8">
                <p className="font-kana text-xs text-white/70">{p.a.kana}</p>
                <h3 className="mt-1 font-display text-3xl uppercase text-white">{p.a.city}</h3>
                <p className="mt-3 text-sm text-white/85">{p.a.note}</p>
              </div>
              <div className="relative bg-pink-red-gradient p-8">
                <p className="font-kana text-xs text-white/80">{p.b.kana}</p>
                <h3 className="mt-1 font-display text-3xl uppercase text-white">{p.b.city}</h3>
                <p className="mt-3 text-sm text-white/90">{p.b.note}</p>
              </div>
            </div>
            <div className="border-t border-border bg-background/40 p-5 text-center text-sm text-muted-foreground">
              <span className="text-neon-pink">↔</span> {p.bridge}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-border bg-tokyo-gradient p-10 text-center">
        <h3 className="font-display text-3xl uppercase text-white md:text-5xl">
          Bridge the two
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-white/90">
          EgyptAir flies direct between Cairo and Tokyo. Your ticket is one click away.
        </p>
        <a
          href="https://www.egyptair.com/en/Plan-and-book/Pages/default.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-ink"
        >
          Book the flight ✈
        </a>
      </div>
    </div>
  );
}
