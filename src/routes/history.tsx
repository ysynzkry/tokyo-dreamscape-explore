import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History 歴史 — Tokyo" },
      {
        name: "description",
        content: "From the fishing village of Edo to a city of 37 million.",
      },
      { property: "og:title", content: "Tokyo History 歴史" },
      {
        property: "og:description",
        content: "1457 to today — the timeline of Edo and Tokyo.",
      },
    ],
  }),
  component: HistoryPage,
});

const TIMELINE = [
  { year: "1457", title: "Edo Castle", desc: "Ōta Dōkan builds a small castle on a fishing-village inlet called Edo." },
  { year: "1603", title: "Tokugawa Shogunate", desc: "Edo becomes the seat of military power. Within a century it's the world's largest city." },
  { year: "1868", title: "Meiji Restoration", desc: "Edo is renamed TŌKYŌ — 'Eastern Capital' — and the emperor moves in." },
  { year: "1923", title: "Great Kantō Earthquake", desc: "Most of the city burns. It rises again in concrete and steel." },
  { year: "1945", title: "Firebombings", desc: "WWII levels Tokyo a second time. Reconstruction begins immediately." },
  { year: "1964", title: "Olympic Tokyo", desc: "Bullet trains, expressways, the world watches a reborn city." },
  { year: "2012", title: "Skytree", desc: "634 metres of broadcast steel — Tokyo claims the sky." },
  { year: "今", title: "Now", desc: "37 million people. The largest metropolitan area on Earth." },
];

function HistoryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeader
        kicker="歴史 · HISTORY"
        title="Edo to neon"
        kana="歴史"
        subtitle="Five centuries of fire, rebuilding and reinvention."
      />
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-pink-red-gradient md:left-1/2" />
        <ul className="space-y-10">
          {TIMELINE.map((t, i) => (
            <li
              key={t.year}
              className={`relative grid gap-4 md:grid-cols-2 md:gap-12 animate-fade-up ${
                i % 2 ? "md:[&>*:first-child]:order-2" : ""
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`pl-12 md:pl-0 ${i % 2 ? "md:text-left" : "md:text-right"}`}>
                <span className="font-display text-5xl text-pink-red-gradient">{t.year}</span>
              </div>
              <div className="pl-12 md:pl-0">
                <h3 className="font-display text-2xl uppercase">{t.title}</h3>
                <p className="mt-2 text-muted-foreground">{t.desc}</p>
              </div>
              <span className="absolute left-2 top-2 h-4 w-4 rounded-full bg-pink-red-gradient ring-4 ring-background md:left-[calc(50%-8px)]" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
