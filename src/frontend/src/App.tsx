import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────

const NOTICE_KEY = "stripclub_notice_dismissed";
const EDC_NOTICE_KEY = "edc_notice_dismissed";

// ─── Home page comics ────────────────────────────────────────────────────────

const homeComics = [
  {
    id: 1,
    title: "Legends of the Hidden Butt",
    embedUrl:
      "https://docs.google.com/presentation/d/1lWnWT1t5nKmRcQhQdWLtfLf4ew7CCjRie_eVSU363a4/embed",
    tagline: "An epic saga of mystery, adventure, and posteriors.",
    ocid: "comic.card.1",
    shadowClass: "shadow-comic-yellow",
    titleColor: "text-primary",
  },
  {
    id: 2,
    title: "Peehead and Butthead",
    embedUrl:
      "https://docs.google.com/presentation/d/1ECdtF3QBLrpkAgGzPDvi1Stqn9lMHNKbR15pMVbtrCE/embed",
    tagline: "Doing less, lowbrow excellence since whenever.",
    ocid: "comic.card.2",
    shadowClass: "shadow-comic-red",
    titleColor: "text-accent",
  },
];

// ─── EDC comics (ONLY shown on /edc) ────────────────────────────────────────

const edcComics = [
  {
    id: 1,
    title: "Mirror, Mirror on the Wall",
    image: "/assets/generated/edc-comic-1.dim_900x500.png",
    tagline: "A man discovers his greatest asset.",
    titleBg: "bg-primary",
  },
  {
    id: 2,
    title: "Office Dog: Performance Review",
    image: "/assets/generated/edc-comic-2.dim_900x500.png",
    tagline: "How he got promoted might surprise you.",
    titleBg: "bg-accent",
  },
  {
    id: 3,
    title: "Captain Flatulence",
    image: "/assets/generated/edc-comic-3.dim_900x500.png",
    tagline: "The hero no one wanted. The hero we deserve.",
    titleBg: "bg-primary",
  },
  {
    id: 4,
    title: "The Bathroom Emergency",
    image: "/assets/generated/edc-comic-4.dim_900x500.png",
    tagline: "OUT OF ORDER has never been so personal.",
    titleBg: "bg-accent",
  },
];

// ─── Shared Components ───────────────────────────────────────────────────────

function SiteHeader({ showEdcLink = true }: { showEdcLink?: boolean }) {
  return (
    <header className="w-full pt-8 pb-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="animate-logo-drop w-full">
          <Link to="/" className="block">
            <div
              className="comic-card relative mx-auto"
              style={{ maxWidth: "900px" }}
            >
              <img
                src="/assets/uploads/Screenshot-2026-03-03-at-4.54.41-PM-1-1.png"
                alt="StripClub Comics"
                className="w-full h-auto block"
                style={{ maxHeight: "260px", objectFit: "contain" }}
              />
            </div>
          </Link>
        </div>

        {/* Tagline */}
        <p
          className="font-display text-2xl md:text-3xl text-primary tracking-widest uppercase text-center"
          style={{
            textShadow: "3px 3px 0 oklch(0.06 0 0)",
            letterSpacing: "0.12em",
          }}
        >
          Your HQ for strips that push it to the edge.
        </p>

        {/* Nav links */}
        {showEdcLink && (
          <div className="flex items-center gap-4">
            <Link
              to="/edc"
              data-ocid="nav.edc_link"
              className="font-display text-lg tracking-widest px-5 py-2 bg-accent text-accent-foreground border-4 border-black uppercase hover:bg-primary hover:text-black transition-colors duration-150"
              style={{ boxShadow: "4px 4px 0 oklch(0.06 0 0)" }}
            >
              ⚡ EDC: Everyday Comics
            </Link>
          </div>
        )}

        {/* Decorative divider */}
        <div className="w-full max-w-3xl flex items-center gap-4 mt-2">
          <div className="flex-1 h-1 bg-primary" />
          <span className="font-display text-accent text-2xl tracking-widest">
            ★ ★ ★
          </span>
          <div className="flex-1 h-1 bg-accent" />
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="w-full border-t-4 border-black bg-card px-4 py-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-xl text-primary tracking-wider">
          STRIPCLUB COMICS
        </p>
        <p className="font-body text-muted-foreground text-sm text-center">
          © {new Date().getFullYear()} StripClub Comics. All rights reserved.{" "}
          <span className="text-accent">PG-13 content.</span>
        </p>
        <p className="font-body text-muted-foreground text-xs text-center">
          Built with ♥ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ─── Home Page Components ─────────────────────────────────────────────────────

function PG13Banner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      data-ocid="notice.banner"
      className="animate-banner-in w-full bg-accent text-accent-foreground border-b-4 border-black px-4 py-3 md:px-6"
      role="alert"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-body font-bold text-sm md:text-base leading-snug">
          ⚠️ <strong>StripClub Comics</strong> contains PG-13 content including
          mature humor. By continuing, you confirm you're cool with that.
        </p>
        <button
          type="button"
          data-ocid="notice.close_button"
          onClick={onDismiss}
          className="flex-shrink-0 bg-black text-primary font-display tracking-widest text-sm px-5 py-2 border-2 border-primary hover:bg-primary hover:text-black transition-colors duration-150 uppercase whitespace-nowrap"
          aria-label="Dismiss PG-13 notice"
        >
          Got it, let's go!
        </button>
      </div>
    </div>
  );
}

function HomeComicCard({
  comic,
  index,
}: {
  comic: (typeof homeComics)[0];
  index: number;
}) {
  return (
    <article
      data-ocid={comic.ocid}
      className="animate-card-pop w-full max-w-5xl mx-auto"
      style={{ animationDelay: `${0.2 + index * 0.15}s` }}
    >
      <div
        className={`comic-card${index === 1 ? "-red" : ""} bg-card rounded-none overflow-hidden`}
      >
        {/* Title bar */}
        <div
          className={`px-6 py-4 border-b-4 border-black ${
            index === 0 ? "bg-primary" : "bg-accent"
          }`}
        >
          <div className="flex items-baseline gap-4">
            <span
              className="font-display text-4xl md:text-5xl tracking-wide text-black leading-none"
              style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.25)" }}
            >
              {comic.title}
            </span>
            <span className="hidden md:block font-marker text-black/70 text-lg">
              {comic.tagline}
            </span>
          </div>
        </div>

        {/* Mobile tagline */}
        <p className="md:hidden font-marker text-muted-foreground text-base px-6 py-2 bg-secondary italic">
          {comic.tagline}
        </p>

        {/* Iframe embed — 16:9 */}
        <div
          className="relative w-full"
          style={{ paddingBottom: "56.25%", minHeight: "540px" }}
        >
          <iframe
            src={comic.embedUrl}
            title={comic.title}
            allowFullScreen
            frameBorder="0"
            className="absolute inset-0 w-full h-full"
            style={{ minHeight: "540px" }}
            loading="lazy"
          />
        </div>

        {/* Bottom bar */}
        <div className="px-6 py-3 bg-secondary border-t-4 border-black flex items-center gap-3">
          <span className="font-display text-primary text-xl tracking-widest">
            ★ FLIP THROUGH THE PANELS ABOVE ★
          </span>
        </div>
      </div>
    </article>
  );
}

function EDCPromoBlock() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        className="comic-card-red bg-card overflow-hidden"
        style={{
          background: `repeating-linear-gradient(
            -45deg,
            oklch(0.14 0.008 260),
            oklch(0.14 0.008 260) 10px,
            oklch(0.17 0.012 260) 10px,
            oklch(0.17 0.012 260) 20px
          )`,
        }}
      >
        {/* Header bar */}
        <div className="bg-accent border-b-4 border-black px-6 py-4">
          <div className="flex items-center gap-3">
            <span
              className="font-display text-5xl md:text-6xl tracking-widest text-black uppercase leading-none"
              style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}
            >
              ⚡ EDC
            </span>
            <div>
              <p className="font-display text-2xl md:text-3xl text-black tracking-widest uppercase leading-none">
                Everyday Comics
              </p>
              <p className="font-marker text-black/70 text-base">
                The unhinged section. Enter at your own risk.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <p
              className="font-display text-3xl md:text-4xl text-foreground tracking-widest uppercase leading-tight mb-3"
              style={{ textShadow: "2px 2px 0 oklch(var(--red))" }}
            >
              Think you can handle it?
            </p>
            <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
              Our raunchiest strips live here — packed with potty humor, adult
              situations, and enough colorful language to make your grandma
              blush. Fresh comics, zero filter, maximum chaos.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "💩 Butt Jokes",
                "🤬 Strong Language",
                "😈 Adult Humor",
                "🔥 No Filter",
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-marker text-sm bg-black text-primary border-2 border-primary px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link
              to="/edc"
              data-ocid="home.edc_promo.button"
              className="inline-block font-display text-2xl md:text-3xl tracking-widest uppercase px-8 py-4 bg-primary text-black border-4 border-black hover:bg-accent hover:text-foreground transition-colors duration-150"
              style={{ boxShadow: "6px 6px 0 oklch(0.06 0 0)" }}
            >
              Enter EDC →
            </Link>
          </div>
        </div>

        {/* Warning strip */}
        <div className="bg-primary border-t-4 border-black px-6 py-2">
          <p className="font-marker text-black text-center text-sm">
            ⚠️ ADULTS ONLY — STRONG LANGUAGE — BUTT JOKES — YOU HAVE BEEN WARNED
            ⚠️
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── EDC Page Components ──────────────────────────────────────────────────────

function EDCNoticeBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      data-ocid="edc.notice.banner"
      className="animate-banner-in w-full bg-accent text-accent-foreground border-b-4 border-black px-4 py-3 md:px-6"
      role="alert"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-body font-bold text-sm md:text-base leading-snug">
          ⚠️ <strong>EDC: Everyday Comics</strong> — Strong language, butt jokes,
          and questionable life choices. You've been warned.
        </p>
        <button
          type="button"
          data-ocid="edc.notice.close_button"
          onClick={onDismiss}
          className="flex-shrink-0 bg-black text-primary font-display tracking-widest text-sm px-5 py-2 border-2 border-primary hover:bg-primary hover:text-black transition-colors duration-150 uppercase whitespace-nowrap"
          aria-label="Dismiss EDC mature content notice"
        >
          I can handle it!
        </button>
      </div>
    </div>
  );
}

function EDCComicCard({
  comic,
  index,
}: {
  comic: (typeof edcComics)[0];
  index: number;
}) {
  const isRed = index % 2 === 1;
  return (
    <article
      data-ocid={`edc.comic.card.${index + 1}`}
      className="animate-card-pop w-full max-w-5xl mx-auto"
      style={{ animationDelay: `${0.15 + index * 0.12}s` }}
    >
      <div
        className={`${isRed ? "comic-card-red" : "comic-card"} bg-card rounded-none overflow-hidden`}
      >
        {/* Title bar */}
        <div className={`px-6 py-4 border-b-4 border-black ${comic.titleBg}`}>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
            <span
              className="font-display text-3xl md:text-5xl tracking-wide text-black leading-none"
              style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.25)" }}
            >
              {comic.title}
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full overflow-hidden bg-black">
          <img
            src={comic.image}
            alt={comic.title}
            className="w-full h-auto block"
            style={{ maxHeight: "500px", objectFit: "cover" }}
            loading="lazy"
          />
        </div>

        {/* Tagline bar */}
        <div className="px-6 py-4 bg-secondary border-t-4 border-black flex items-center justify-between gap-3">
          <p className="font-marker text-muted-foreground text-base md:text-lg italic">
            {comic.tagline}
          </p>
          <span
            className={`font-display text-xl tracking-widest flex-shrink-0 ${isRed ? "text-accent" : "text-primary"}`}
          >
            {isRed ? "💀" : "💥"}
          </span>
        </div>
      </div>
    </article>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function HomePage() {
  const [noticeDismissed, setNoticeDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(NOTICE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const handleDismissNotice = () => {
    try {
      localStorage.setItem(NOTICE_KEY, "true");
    } catch {
      // ignore
    }
    setNoticeDismissed(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!noticeDismissed && <PG13Banner onDismiss={handleDismissNotice} />}

      <SiteHeader showEdcLink />

      <main className="flex-1 w-full px-4 pb-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">
          {/* Section heading */}
          <div className="text-center">
            <h2
              className="font-display text-5xl md:text-6xl text-foreground tracking-widest uppercase"
              style={{
                textShadow:
                  "4px 4px 0 oklch(var(--yellow)), 8px 8px 0 oklch(var(--black))",
              }}
            >
              Read the Comics
            </h2>
            <p className="font-body text-muted-foreground mt-2 text-base">
              Use the arrows inside each comic to flip through the panels.
            </p>
          </div>

          {/* Comic cards */}
          {homeComics.map((comic, idx) => (
            <HomeComicCard key={comic.id} comic={comic} index={idx} />
          ))}

          {/* EDC Promo block — teaser only, no EDC comics here */}
          <section aria-label="EDC — Everyday Comics promo">
            <div className="text-center mb-8">
              <div className="w-full max-w-3xl mx-auto flex items-center gap-4">
                <div className="flex-1 h-1 bg-accent" />
                <span className="font-display text-primary text-2xl tracking-widest">
                  ✦ ✦ ✦
                </span>
                <div className="flex-1 h-1 bg-primary" />
              </div>
            </div>
            <EDCPromoBlock />
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function EDCPage() {
  const [noticeDismissed, setNoticeDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(EDC_NOTICE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const handleDismissNotice = () => {
    try {
      localStorage.setItem(EDC_NOTICE_KEY, "true");
    } catch {
      // ignore
    }
    setNoticeDismissed(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* EDC mature content banner */}
      {!noticeDismissed && <EDCNoticeBanner onDismiss={handleDismissNotice} />}

      {/* Header */}
      <SiteHeader showEdcLink={false} />

      <main className="flex-1 w-full px-4 pb-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {/* Back button */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              data-ocid="edc.back_button"
              className="inline-flex items-center gap-2 font-display text-lg tracking-widest uppercase px-5 py-2 bg-secondary text-foreground border-4 border-black hover:bg-primary hover:text-black transition-colors duration-150"
              style={{ boxShadow: "4px 4px 0 oklch(0.06 0 0)" }}
            >
              ← Back to StripClub
            </Link>
          </div>

          {/* EDC Page Header */}
          <div className="w-full">
            <div
              className="comic-card-red overflow-hidden"
              style={{
                background: `repeating-linear-gradient(
                  45deg,
                  oklch(0.12 0.005 260),
                  oklch(0.12 0.005 260) 8px,
                  oklch(0.16 0.010 260) 8px,
                  oklch(0.16 0.010 260) 16px
                )`,
              }}
            >
              <div className="bg-accent border-b-4 border-black px-6 py-5">
                <h1
                  className="font-display text-6xl md:text-8xl tracking-widest uppercase text-black leading-none"
                  style={{ textShadow: "5px 5px 0 rgba(0,0,0,0.35)" }}
                >
                  EDC
                </h1>
                <p className="font-display text-2xl md:text-4xl text-black tracking-widest uppercase mt-1">
                  Everyday Comics
                </p>
              </div>
              <div className="px-6 py-6">
                <p
                  className="font-display text-3xl md:text-4xl text-foreground tracking-widest uppercase leading-tight"
                  style={{ textShadow: "2px 2px 0 oklch(var(--red))" }}
                >
                  Fresh strips. Every day. No filter. No shame.
                </p>
                <p className="font-body text-muted-foreground mt-3 text-base md:text-lg">
                  The adult corner of StripClub Comics — where the jokes are
                  filthy, the humor is questionable, and the butts are
                  plentiful.
                </p>
              </div>
              <div className="bg-primary border-t-4 border-black px-6 py-2">
                <p className="font-marker text-black text-sm">
                  🔞 Adult humor · Strong language · Butt jokes · You were
                  warned
                </p>
              </div>
            </div>
          </div>

          {/* Section heading */}
          <div className="text-center">
            <h2
              className="font-display text-4xl md:text-5xl text-foreground tracking-widest uppercase"
              style={{
                textShadow:
                  "3px 3px 0 oklch(var(--red)), 6px 6px 0 oklch(var(--black))",
              }}
            >
              Today's Comics
            </h2>
            <p className="font-body text-muted-foreground mt-2 text-sm">
              Handcrafted filth. Curated chaos. Presented with zero apology.
            </p>
          </div>

          {/* EDC Comic cards */}
          {edcComics.map((comic, idx) => (
            <EDCComicCard key={comic.id} comic={comic} index={idx} />
          ))}

          {/* Bottom back link */}
          <div className="flex items-center justify-center pt-4">
            <Link
              to="/"
              className="font-display text-lg tracking-widest uppercase px-6 py-3 bg-secondary text-foreground border-4 border-black hover:bg-primary hover:text-black transition-colors duration-150"
              style={{ boxShadow: "4px 4px 0 oklch(0.06 0 0)" }}
            >
              ← Back to the Main Stage
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

// ─── Root layout ──────────────────────────────────────────────────────────────

function RootLayout() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return <Outlet />;
}

// ─── Router setup ─────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const edcRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edc",
  component: EDCPage,
});

const routeTree = rootRoute.addChildren([homeRoute, edcRoute]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App entry ────────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />;
}
