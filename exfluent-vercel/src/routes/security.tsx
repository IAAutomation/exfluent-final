import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/auth/AuthShell";
import { ArrowLeft, Sparkles, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security overview — Exfluent" },
      { name: "description", content: "Details on encryption, data isolation, and security infrastructure." },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
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
            <ShieldAlert size={12} className="text-coral" />
            Security Overview
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl">
            Keep your data <em>yours.</em>
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">Last updated: June 14, 2026</p>

          <div className="mt-8 soft-card p-8 space-y-6 text-sm text-ink/80 leading-relaxed">
            <section>
              <h2 className="font-display text-2xl text-ink mb-2">1. Infrastructure & Hosting</h2>
              <p>
                Our infrastructure is hosted within secure, ISO-27001 certified data centers. We separate production databases from staging environments and run periodic automated vulnerabilities tests to guarantee system safety.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-2">2. Token & Key Security</h2>
              <p>
                Authentication credentials and Gmail OAuth tokens are encrypted at-rest using Google KMS keys. Session active tracking is monitored locally in the browser memory and is only compiled to total numbers periodically before sending to the database.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-2">3. Zero-Knowledge extension</h2>
              <p>
                The Exfluent Browser Extension cannot inspect your inputs, outputs, prompts, or sensitive passwords. It is programmed to check if the current active tab hostname matches the pre-defined list of AI vendor hostnames, tracking active durations in milliseconds.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
