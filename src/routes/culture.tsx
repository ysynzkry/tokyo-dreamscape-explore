import { createFileRoute } from "@tanstack/react-router";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/culture")({
  head: () => ({
    meta: [
      { title: "Culture 文化 — Tokyo" },
      {
        name: "description",
        content:
          "From tea ceremony silence to Harajuku chaos — the many cultures of Tokyo.",
      },
      { property: "og:title", content: "Tokyo Culture 文化" },
      {
        property: "og:description",
        content: "Tea, anime, kabuki, kawaii — the layered culture of Tokyo.",
      },
    ],
  }),
  component: CulturePage,
});

const CARDS = [
  { kana: "茶道", title: "Tea Ceremony", desc: "Sadō: an hour of choreographed silence over a single bowl of matcha." },
  { kana: "歌舞伎", title: "Kabuki", desc: "400-year-old theatre of painted faces, sliding stages and shouted poetry." },
  { kana: "原宿", title: "Harajuku Street Style", desc: "Takeshita-dori is a runway of decora, fairy-kei and gothic lolita." },
  { kana: "アニメ", title: "Anime & Otaku", desc: "Akihabara: eight floors of manga, idol cafés and arcade light." },
  { kana: "温泉", title: "Onsen", desc: "Volcanic baths where strangers share silence and steaming mineral water." },
  { kana: "花見", title: "Hanami", desc: "Spring picnics under sakura — beauty is best when it falls." },
];

function CulturePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeader
        kicker="文化 · CULTURE"
        title="Many Tokyos"
        kana="文化"
        subtitle="A city where 8th-century tea masters and cyberpunk DJs share the same train."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <article
            key={c.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-neon-pink/60 hover:shadow-[var(--shadow-neon-pink)] animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="absolute -right-6 -top-6 font-kana text-7xl text-neon-pink/20">
              {c.kana}
            </div>
            <p className="font-kana text-sm text-neon-pink">{c.kana}</p>
            <h3 className="mt-2 font-display text-2xl uppercase">{c.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
