import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/auth/AuthShell";
import { ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Exfluent" },
      { name: "description", content: "Learn how we protect your personal and usage data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
            <ShieldCheck size={12} className="text-coral" />
            Security & Privacy
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl">
            Privacy by <em>design.</em>
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">Last updated: June 14, 2026</p>

          <div className="mt-8 soft-card p-8 space-y-6 text-sm text-ink/80 leading-relaxed">
            <section>
              <h2 className="font-display text-2xl text-ink mb-2">1. Local Tracking Only</h2>
              <p>
                Our browser extension processes your domain-level activity entirely locally. We do not inspect prompt text, query structures, inputs, or outputs. The extension only watches active session durations for registered AI provider URLs (like chatgpt.com, claude.ai, etc.).
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-2">2. Gmail Integration</h2>
              <p>
                If you choose to link your Gmail account, we connect via OAuth with a read-only scope. We filter specifically for billing transaction headers from verified AI vendors (e.g. OpenAI, Anthropic, Midjourney). The content of other emails is completely ignored and is never transmitted or cached on our servers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-2">3. Data Security</h2>
              <p>
                All account data, billing amounts, and dashboard statistics are stored using industry-standard AES-256 encryption. We utilize Stripe for payment processing, meaning your credit card information is never visible to or stored on our servers.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
