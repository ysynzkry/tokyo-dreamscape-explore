import { createFileRoute, Link } from "@tanstack/react-router";
import { LandmarkScene } from "@/components/LandmarkScene";
import { MarqueeBand } from "@/components/MarqueeBand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOKYO 東京 — Neon City Guide" },
      {
        name: "description",
        content:
          "Discover Tokyo through 3D landmarks, culture, food, history and an experience built for you.",
      },
    ],
  }),
  component: HomePage,
});

const SECTIONS = [
  { to: "/landmarks", title: "Landmarks", kana: "名所", desc: "Rotating 3D icons of the city." },
  { to: "/culture", title: "Culture", kana: "文化", desc: "From kabuki to Harajuku street style." },
  { to: "/food", title: "Food", kana: "食", desc: "Ramen, sushi & midnight izakaya." },
  { to: "/history", title: "History", kana: "歴史", desc: "Edo to neon-lit megacity." },
  { to: "/tokyo-cairo", title: "Tokyo × Cairo", kana: "東京·القاهرة", desc: "Two ancient capitals, one heartbeat." },
  { to: "/experiences", title: "Experiences", kana: "体験", desc: "A trip tailored to you." },
  { to: "/walk", title: "Walk in Tokyo", kana: "散歩", desc: "Street View through the city." },
  { to: "/trivia", title: "Trivia", kana: "クイズ", desc: "How well do you know Tokyo?" },
] as const;

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-radial-pink)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up">
            <p className="font-kana text-sm uppercase tracking-[0.5em] text-neon-pink">
              ようこそ · WELCOME
            </p>
            <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] md:text-8xl">
              <span className="text-pink-red-gradient">TOKYO</span>
              <br />
              <span className="text-neon-red animate-glitch inline-block">NEON</span>
              <br />
              <span className="text-foreground">DREAMS</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              A 24-hour, 3D, neon-soaked love letter to the city that never dims.
              Spin the landmarks. Taste the streets. Find your trip.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/experiences"
                className="rounded-full bg-pink-red-gradient px-7 py-3 font-semibold text-white shadow-lg shadow-primary/40 transition-transform hover:scale-105"
              >
                Build my trip →
              </Link>
              <a
                href="https://www.egyptair.com/en/Plan-and-book/Pages/default.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neon-pink/60 px-7 py-3 font-semibold text-neon-pink hover:bg-neon-pink/10"
              >
                Get a ticket ✈
              </a>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:200ms]">
            <LandmarkScene kind="tower" ringText="TOKYO  TOWER  東京タワー" height={520} />
          </div>
        </div>
      </section>

      <MarqueeBand
        items={[
          "渋谷 SHIBUYA",
          "新宿 SHINJUKU",
          "原宿 HARAJUKU",
          "秋葉原 AKIHABARA",
          "浅草 ASAKUSA",
          "銀座 GINZA",
          "上野 UENO",
          "六本木 ROPPONGI",
        ]}
      />

      {/* SECTIONS GRID */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12">
          <p className="font-kana text-xs uppercase tracking-[0.4em] text-neon-pink">
            探検 · EXPLORE
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase md:text-6xl">
            <span className="text-pink-red-gradient">Pick a district</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SECTIONS.map((s, i) => (
            <Link
              key={s.to}
              to={s.to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-neon-pink/60 hover:shadow-[var(--shadow-neon-pink)]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-0 bg-pink-red-gradient opacity-0 transition-opacity group-hover:opacity-10" />
              <div className="relative">
                <span className="font-kana text-xs text-neon-pink">{s.kana}</span>
                <h3 className="mt-2 font-display text-2xl uppercase">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <span className="mt-4 inline-flex text-sm text-neon-pink opacity-0 transition-opacity group-hover:opacity-100">
                  Enter →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-tokyo-gradient p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
          <div className="relative max-w-xl">
            <p className="font-kana text-xs uppercase tracking-[0.4em] text-white/80">
              出発 · DEPART
            </p>
            <h3 className="mt-3 font-display text-4xl uppercase text-white md:text-6xl">
              From Cairo to Tokyo
            </h3>
            <p className="mt-4 text-white/90">
              Two ancient capitals. One direct ticket. Fly EgyptAir into the neon.
            </p>
            <a
              href="https://www.egyptair.com/en/Plan-and-book/Pages/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
            >
              Book on EgyptAir ✈
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
