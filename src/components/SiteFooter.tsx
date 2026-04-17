import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-ink/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl text-pink-red-gradient">TOKYO</span>
            <span className="font-kana text-sm text-neon-pink">東京</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A neon love letter to Tokyo — culture, food, history & the streets that
            never sleep.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="mb-3 font-display text-neon-pink">Explore</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/landmarks" className="hover:text-foreground">Landmarks</Link></li>
            <li><Link to="/culture" className="hover:text-foreground">Culture</Link></li>
            <li><Link to="/food" className="hover:text-foreground">Food</Link></li>
            <li><Link to="/walk" className="hover:text-foreground">Walk in Tokyo</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="mb-3 font-display text-neon-pink">Credits</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="https://github.com/ysynzkry"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                @ysynzkry · GitHub
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/hazem.elhassan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                @hazem.elhassan · Instagram
              </a>
            </li>
            <li><Link to="/credits" className="hover:text-foreground">Full credits →</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TOKYO · Built with neon & noodles.
      </div>
    </footer>
  );
}
