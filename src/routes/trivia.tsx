import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/trivia")({
  head: () => ({
    meta: [
      { title: "Trivia クイズ — How well do you know Tokyo?" },
      {
        name: "description",
        content: "Eight questions about Tokyo — score your way to neon glory.",
      },
      { property: "og:title", content: "Tokyo Trivia クイズ" },
      {
        property: "og:description",
        content: "Test your Tokyo knowledge with 8 questions of trivia.",
      },
    ],
  }),
  component: TriviaPage,
});

const QS = [
  {
    q: "How tall is Tokyo Skytree?",
    options: ["452 m", "634 m", "828 m", "333 m"],
    correct: 1,
    explain: "634m — chosen because 'mu-sa-shi' (6-3-4) is Tokyo's old name.",
  },
  {
    q: "What was Tokyo called before 1868?",
    options: ["Kyoto", "Edo", "Osaka", "Heian"],
    correct: 1,
    explain: "Edo — renamed Tōkyō ('Eastern Capital') with the Meiji Restoration.",
  },
  {
    q: "Tokyo's oldest temple is…",
    options: ["Meiji-jingu", "Senso-ji", "Yasukuni", "Zojo-ji"],
    correct: 1,
    explain: "Senso-ji in Asakusa, founded in 645 AD.",
  },
  {
    q: "Greater Tokyo's population is roughly…",
    options: ["13 million", "20 million", "37 million", "50 million"],
    correct: 2,
    explain: "37 million — the largest metropolitan area on Earth.",
  },
  {
    q: "What does 'sakura' mean?",
    options: ["Sunrise", "Cherry blossom", "Festival", "Dragon"],
    correct: 1,
    explain: "Cherry blossom — celebrated each spring with hanami picnics.",
  },
  {
    q: "Which line loops central Tokyo?",
    options: ["Marunouchi", "Yamanote", "Hibiya", "Ginza"],
    correct: 1,
    explain: "The Yamanote — a green loop hitting most of the city's hubs.",
  },
  {
    q: "Which dish is Tokyo (Edo) famous for inventing?",
    options: ["Ramen", "Edomae sushi", "Okonomiyaki", "Takoyaki"],
    correct: 1,
    explain: "Edomae nigiri sushi — fast food born for Edo's market workers.",
  },
  {
    q: "Tokyo Tower is taller than the Eiffel Tower by…",
    options: ["1 m", "13 m", "100 m", "It's shorter"],
    correct: 1,
    explain: "13m taller (333m vs 320m), and painted aviation orange.",
  },
];

function TriviaPage() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === QS[i].correct) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 >= QS.length) {
      setDone(true);
    } else {
      setI(i + 1);
      setPicked(null);
    }
  }

  function reset() {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <SectionHeader
        kicker="クイズ · TRIVIA"
        title="Tokyo trivia"
        kana="クイズ"
      />

      {done ? (
        <div className="rounded-3xl border border-border bg-card p-10 text-center animate-fade-up">
          <p className="font-kana text-sm text-neon-pink">スコア</p>
          <h2 className="mt-2 font-display text-7xl text-pink-red-gradient">
            {score}/{QS.length}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {score === QS.length
              ? "Perfect — you ARE Tokyo."
              : score >= QS.length - 2
                ? "Tokyo native energy."
                : score >= QS.length / 2
                  ? "Solid traveller. One more trip and you'll know it all."
                  : "Time to book a flight."}
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-full bg-pink-red-gradient px-7 py-3 font-semibold text-white"
          >
            Play again
          </button>
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-card p-8 md:p-10 animate-fade-up">
          <div className="mb-5 flex items-center gap-3 text-sm">
            <span className="font-kana text-neon-pink">
              {String(i + 1).padStart(2, "0")} / {String(QS.length).padStart(2, "0")}
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-pink-red-gradient transition-all"
                style={{ width: `${((i + 1) / QS.length) * 100}%` }}
              />
            </div>
            <span className="text-muted-foreground">Score: {score}</span>
          </div>
          <h2 className="font-display text-2xl uppercase md:text-3xl">{QS[i].q}</h2>
          <div className="mt-6 grid gap-3">
            {QS[i].options.map((o, idx) => {
              const isCorrect = idx === QS[i].correct;
              const isPicked = picked === idx;
              const state =
                picked === null
                  ? "border-border bg-background/50 hover:border-neon-pink/60 hover:bg-card"
                  : isCorrect
                    ? "border-emerald-500/60 bg-emerald-500/10"
                    : isPicked
                      ? "border-destructive/60 bg-destructive/10"
                      : "border-border bg-background/50 opacity-60";
              return (
                <button
                  key={o}
                  onClick={() => choose(idx)}
                  disabled={picked !== null}
                  className={`rounded-xl border px-4 py-3 text-left transition-all ${state}`}
                >
                  {o}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="mt-5 rounded-xl border border-border bg-background/40 p-4 text-sm">
              <span className="text-neon-pink">▸</span> {QS[i].explain}
              <button
                onClick={next}
                className="mt-3 ml-auto block rounded-full bg-pink-red-gradient px-6 py-2 text-sm font-semibold text-white"
              >
                {i + 1 >= QS.length ? "See score" : "Next →"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
