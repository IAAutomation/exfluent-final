import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/auth/AuthShell";
import { ArrowLeft, Sparkles, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press kit — Exfluent" },
      { name: "description", content: "Resources and assets for stories about Exfluent." },
    ],
  }),
  component: PressPage,
});

function PressPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-8">
        <Link to="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display text-2xl">Exfluent</span>
        </Link>
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} /> Back to site
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="chip">
            <Sparkles size={12} className="text-coral" />
            Media Room
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl">
            Exfluent in the <em>news.</em>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Exfluent is the calm way to manage every AI subscription. We help solo founders, product agencies, and marketing squads audit AI software spend, prove real ROI, and eliminate duplicative features.
          </p>

          <div className="mt-12 space-y-6">
            <div className="soft-card p-8">
              <h2 className="font-display text-3xl text-ink">Company facts</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink/80">
                <li><strong>Founded:</strong> 2024</li>
                <li><strong>Location:</strong> Fully remote worldwide</li>
                <li><strong>Active Members:</strong> 12,400+ creators and brands</li>
                <li><strong>Average Monthly Savings:</strong> $289 per user</li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card/60 p-6">
                <Download size={24} className="text-coral" />
                <h3 className="mt-3 font-semibold text-sm">Download Brand Assets</h3>
                <p className="mt-1 text-xs text-muted-foreground">Logos, screenshots, and visual styling guides.</p>
                <button
                  onClick={() => alert("Mock Asset Pack download started!")}
                  className="mt-4 text-xs font-semibold underline underline-offset-4"
                >
                  Download .ZIP (14MB)
                </button>
              </div>
              <div className="rounded-2xl border border-border bg-card/60 p-6">
                <Mail size={24} className="text-lavender" />
                <h3 className="mt-3 font-semibold text-sm">Press Contact</h3>
                <p className="mt-1 text-xs text-muted-foreground">For press inquiries, reviews, or interview requests.</p>
                <a href="mailto:press@exfluent.site" className="mt-4 inline-block text-xs font-semibold underline underline-offset-4">
                  press@exfluent.site
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
