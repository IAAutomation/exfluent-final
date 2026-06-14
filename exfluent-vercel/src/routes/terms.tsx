import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/auth/AuthShell";
import { ArrowLeft, Sparkles, Scale } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — Exfluent" },
      { name: "description", content: "Terms and conditions for accessing and using Exfluent." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
            <Scale size={12} className="text-coral" />
            Terms of Service
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl">
            Clean terms, <br />
            no <em>surprises.</em>
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">Last updated: June 14, 2026</p>

          <div className="mt-8 soft-card p-8 space-y-6 text-sm text-ink/80 leading-relaxed">
            <section>
              <h2 className="font-display text-2xl text-ink mb-2">1. Subscription Services</h2>
              <p>
                Exfluent provides dashboard metrics, spending analysis, and optimization suggestions based on the plans (Free, Pro, Team). Pro and Team accounts are billed on a recurring monthly or yearly subscription cycle and can be cancelled at any time through our Stripe customer portal.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-2">2. Acceptable Use</h2>
              <p>
                You agree not to attempt to reverse-engineer our browser extension, bypass tracking limitations, or feed fraudulent billing data into our ROI calculator. We reserve the right to suspend accounts that engage in system abuse.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-2">3. Limitation of Liability</h2>
              <p>
                Exfluent's suggestions (Stack Optimizer) are recommendation-only tips based on your usage records. We are not responsible for software compatibility issues, loss of data, or contractual obligations that occur with third-party software as a result of pausing or cancelling subscriptions suggested by our system.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
