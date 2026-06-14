import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/auth/AuthShell";
import {
  Chrome,
  Check,
  Download,
  Shield,
  Sparkles,
  Zap,
  MousePointerClick,
  Star,
  Puzzle,
} from "lucide-react";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Install the Exfluent extension" },
      {
        name: "description",
        content:
          "Add the Exfluent browser extension to discover creators wherever you scroll.",
      },
    ],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!downloading) return;
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          setDone(true);
          setDownloading(false);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 180);
    return () => clearInterval(t);
  }, [downloading]);

  const startDownload = () => {
    setDone(false);
    setProgress(0);
    setDownloading(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background gradient orbs */}
      <Orbs />

      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display text-2xl">exfluent</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden text-muted-foreground sm:inline">
            Signed in as <span className="text-foreground">ava@studio.com</span>
          </span>
          <Link
            to="/auth/signin"
            className="rounded-full border border-input px-3 py-1.5 text-xs hover:border-ink"
          >
            Sign out
          </Link>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        {/* LEFT */}
        <section>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
            Step 3 of 3 · Almost ready
          </span>
          <h1 className="mt-5 font-display text-6xl leading-[0.95] sm:text-7xl">
            One last thing — <br />
            <em>install the extension.</em>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            The Exfluent extension lives quietly in your browser and surfaces
            audience data, fit scores and outreach — right on Instagram, TikTok,
            YouTube and X.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={startDownload}
              disabled={downloading || done}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-6 py-4 text-sm font-medium text-cream transition-all hover:translate-y-[-1px] hover:shadow-[0_18px_40px_-15px_rgba(75,115,255,0.55)] disabled:opacity-80"
            >
              <Chrome size={18} />
              {done
                ? "Added to Chrome"
                : downloading
                ? `Downloading… ${Math.min(100, Math.round(progress))}%`
                : "Add to Chrome — Free"}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1"
                style={{
                  background:
                    "linear-gradient(90deg,#4B73FF,#FF66F4,#FE7B02,#FF8E63)",
                }}
              />
            </button>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-input px-5 py-3.5 text-sm hover:border-ink"
            >
              <Puzzle size={16} /> Other browsers
            </a>
          </div>

          {/* Progress / status */}
          <div className="mt-6 max-w-md">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full transition-[width] duration-200"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg,#4B73FF,#FF66F4,#FE7B02)",
                }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {done ? (
                <span className="inline-flex items-center gap-1.5 text-foreground">
                  <Check size={14} className="text-brand-blue" />
                  Installed. Pin it from the puzzle icon in your toolbar.
                </span>
              ) : downloading ? (
                "Fetching extension package from chrome web store…"
              ) : (
                "~280 KB · works on Chrome, Brave, Arc, Edge"
              )}
            </p>
          </div>

          {/* Feature trio */}
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {[
              { i: <Zap size={16} />, t: "Live audience insights", d: "On any profile, instantly." },
              { i: <MousePointerClick size={16} />, t: "1-click outreach", d: "From profile to inbox." },
              { i: <Shield size={16} />, t: "Brand-safety AI", d: "Flags risk before you spend." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-input bg-card p-4">
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-ink text-cream">
                  {f.i}
                </span>
                <div className="mt-3 text-sm font-medium">{f.t}</div>
                <div className="text-xs text-muted-foreground">{f.d}</div>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="mt-10 flex items-center gap-5">
            <div className="flex -space-x-2">
              {["#FF66F4", "#4B73FF", "#FE7B02", "#FF8E63"].map((c) => (
                <span
                  key={c}
                  className="inline-block size-9 rounded-full border-2 border-background"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-brand-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
                <span className="ml-1 text-foreground">4.9</span>
              </div>
              <div className="text-xs text-muted-foreground">
                from 1,820 Chrome Store reviews
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT — visual */}
        <section className="relative">
          <BrowserMock downloading={downloading} done={done} progress={progress} />
        </section>
      </main>

      {/* Steps strip */}
      <section className="relative border-t border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3">
          {[
            { n: "01", t: "Click Add to Chrome", d: "We open the Chrome Web Store in a new tab." },
            { n: "02", t: "Pin Exfluent", d: "Hit the puzzle icon, then the pin next to Exfluent." },
            { n: "03", t: "Start discovering", d: "Visit any creator profile — magic appears." },
          ].map((s) => (
            <div key={s.n} className="flex gap-4">
              <span className="font-display text-5xl text-brand-blue">{s.n}</span>
              <div>
                <div className="font-medium">{s.t}</div>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative mx-auto max-w-7xl px-6 py-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Exfluent · Made for creators, brands and the people who back them.
      </footer>
    </div>
  );
}

function Orbs() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side,#4B73FF,transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-15rem] top-32 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side,#FF66F4,transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20rem] left-1/3 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side,#FE7B02,transparent)" }}
      />
    </>
  );
}

function BrowserMock({
  downloading,
  done,
  progress,
}: {
  downloading: boolean;
  done: boolean;
  progress: number;
}) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-blue/20 via-brand-pink/20 to-brand-orange/20 blur-2xl" />
      <div className="overflow-hidden rounded-3xl border border-input bg-card shadow-[0_40px_120px_-40px_rgba(0,0,0,0.35)]">
        {/* chrome bar */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-3">
          <span className="size-3 rounded-full bg-brand-red" />
          <span className="size-3 rounded-full bg-brand-orange" />
          <span className="size-3 rounded-full bg-brand-blue" />
          <div className="ml-3 flex-1 rounded-full bg-card px-3 py-1 text-xs text-muted-foreground">
            chrome://extensions/exfluent
          </div>
          <Puzzle size={16} className="text-muted-foreground" />
        </div>

        {/* card */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className="relative grid size-16 place-items-center rounded-2xl"
              style={{
                background:
                  "conic-gradient(from 200deg,#4B73FF,#FF66F4,#FE7B02,#FF8E63,#4B73FF)",
              }}
            >
              <span className="grid size-12 place-items-center rounded-xl bg-ink text-cream">
                <Sparkles size={20} />
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-2xl">Exfluent for Chrome</h3>
                <span className="rounded-full bg-brand-blue/10 px-2 py-0.5 text-[10px] font-medium text-brand-blue">
                  Verified
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                exfluent.ai · Productivity · 280 KB
              </div>
              <div className="mt-1 flex items-center gap-1 text-brand-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} fill="currentColor" />
                ))}
                <span className="ml-1 text-xs text-foreground">4.9</span>
                <span className="text-xs text-muted-foreground">(1,820)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-input bg-background p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">
                {done
                  ? "Installation complete"
                  : downloading
                  ? "Installing Exfluent…"
                  : "Ready to install"}
              </span>
              <span className="text-muted-foreground">
                {Math.min(100, Math.round(progress))}%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full transition-[width] duration-200"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg,#4B73FF,#FF66F4,#FE7B02)",
                }}
              />
            </div>
            <ul className="mt-4 space-y-1.5 text-xs">
              {[
                "Verifying signature",
                "Downloading manifest",
                "Installing background worker",
                "Connecting to your workspace",
              ].map((s, i) => {
                const reached = progress > i * 25;
                return (
                  <li
                    key={s}
                    className={
                      "flex items-center gap-2 " +
                      (reached ? "text-foreground" : "text-muted-foreground")
                    }
                  >
                    <span
                      className={
                        "inline-flex size-4 items-center justify-center rounded-full " +
                        (reached ? "bg-ink text-cream" : "bg-muted")
                      }
                    >
                      {reached && <Check size={10} />}
                    </span>
                    {s}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield size={14} /> Reviewed by Chrome Web Store
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs text-cream">
              <Download size={12} /> 28k installs
            </span>
          </div>
        </div>
      </div>

      {/* floating chip */}
      <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-input bg-card p-3 shadow-xl sm:block">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-brand-pink/15 text-brand-pink">
            <Sparkles size={16} />
          </span>
          <div className="text-xs">
            <div className="font-medium">@avachen joined</div>
            <div className="text-muted-foreground">12s ago · Plan: Pro</div>
          </div>
        </div>
      </div>
    </div>
  );
}
