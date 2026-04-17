export function SectionHeader({
  kicker,
  title,
  subtitle,
  kana,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  kana?: string;
}) {
  return (
    <div className="mb-12 max-w-3xl animate-fade-up">
      {kicker && (
        <p className="mb-3 font-kana text-xs uppercase tracking-[0.4em] text-neon-pink">
          {kicker}
        </p>
      )}
      <h1 className="font-display text-5xl uppercase leading-none md:text-7xl">
        <span className="text-pink-red-gradient">{title}</span>
        {kana && (
          <span className="ml-4 font-kana text-2xl text-neon-red md:text-3xl">
            {kana}
          </span>
        )}
      </h1>
      {subtitle && (
        <p className="mt-5 text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
