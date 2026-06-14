import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/auth/AuthShell";
import { ArrowLeft, Sparkles, Heart, Shield, Eye } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About us — Exfluent" },
      { name: "description", content: "Learn about the team and philosophy behind Exfluent." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
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
            Our story
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl">
            Made with warmth, <br />
            not <em>hype.</em>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Exfluent was born out of a simple frustration: our SaaS dashboards felt cold, stressful, and cluttered.
            Every dashboard wanted more of our attention, more clicks, and more money. We wanted to build something
            that felt human, quiet, and helpful.
          </p>

          <div className="mt-12 space-y-6">
            <div className="soft-card p-8">
              <h2 className="font-display text-3xl text-ink">Our Mission</h2>
              <p className="mt-3 text-sm text-ink/80 leading-relaxed">
                We believe that software should serve people, not the other way around. Our goal is to help creators, solo founders, and modern product teams reclaim control over their software stacks. By offering a calm visual interface and privacy-first local tracking, we make managing your digital workspace simple and stress-free.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card/60 p-5">
                <Heart size={20} className="text-coral" />
                <h3 className="mt-3 font-semibold text-sm">Human First</h3>
                <p className="mt-1 text-xs text-muted-foreground">Soft cream tones and serif typography designed to lower your heart rate.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/60 p-5">
                <Shield size={20} className="text-lavender" />
                <h3 className="mt-3 font-semibold text-sm">Privacy Centric</h3>
                <p className="mt-1 text-xs text-muted-foreground">We run queries locally and only parse domains. No prompt scanning, ever.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/60 p-5">
                <Eye size={20} className="text-mint" />
                <h3 className="mt-3 font-semibold text-sm">Clear & Honest</h3>
                <p className="mt-1 text-xs text-muted-foreground">No hidden renewals. One-click cancellations via Stripe portal.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
