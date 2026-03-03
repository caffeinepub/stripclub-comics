import { useEffect, useState } from "react";

const NOTICE_KEY = "stripclub_notice_dismissed";

const comics = [
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

function PG13Banner({
  onDismiss,
}: {
  onDismiss: () => void;
}) {
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

function ComicCard({
  comic,
  index,
}: {
  comic: (typeof comics)[0];
  index: number;
}) {
  return (
    <article
      data-ocid={comic.ocid}
      className="animate-card-pop w-full max-w-5xl mx-auto"
      style={{ animationDelay: `${0.2 + index * 0.15}s` }}
    >
      {/* Card container */}
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

        {/* Bottom bar with comic-style decoration */}
        <div className="px-6 py-3 bg-secondary border-t-4 border-black flex items-center gap-3">
          <span className="font-display text-primary text-xl tracking-widest">
            ★ FLIP THROUGH THE PANELS ABOVE ★
          </span>
        </div>
      </div>
    </article>
  );
}

export default function App() {
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

  // Ensure dark mode class is always applied
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* PG-13 Banner */}
      {!noticeDismissed && <PG13Banner onDismiss={handleDismissNotice} />}

      {/* Header */}
      <header className="w-full pt-8 pb-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="animate-logo-drop w-full">
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

      {/* Comics Section */}
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
          {comics.map((comic, idx) => (
            <ComicCard key={comic.id} comic={comic} index={idx} />
          ))}
        </div>
      </main>

      {/* Footer */}
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
    </div>
  );
}
