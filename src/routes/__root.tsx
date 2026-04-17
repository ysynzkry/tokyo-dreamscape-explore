import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SakuraPetals } from "@/components/SakuraPetals";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-pink-red-gradient">404</h1>
        <h2 className="mt-4 font-display text-xl uppercase">Lost in Shibuya</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The street you're looking for doesn't exist on this map.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex rounded-full bg-pink-red-gradient px-5 py-2 text-sm font-semibold text-white"
        >
          Back to Tokyo
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TOKYO — Neon City Guide" },
      {
        name: "description",
        content:
          "A neon journey through Tokyo: culture, food, history, landmarks in 3D, and a bridge to Cairo.",
      },
      { property: "og:title", content: "TOKYO — Neon City Guide" },
      {
        property: "og:description",
        content:
          "Explore Tokyo through rotating 3D landmarks, food, culture & a Cairo connection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SakuraPetals density={45} />
      <SiteHeader />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
