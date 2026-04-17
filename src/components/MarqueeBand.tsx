export function MarqueeBand({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-pink-red-gradient py-3">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-lg uppercase tracking-widest text-white">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="text-white/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
