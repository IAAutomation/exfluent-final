import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/auth/AuthShell";
import { ArrowLeft, Sparkles, FileText } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/dpa")({
  head: () => ({
    meta: [
      { title: "Data processing addendum — Exfluent" },
      { name: "description", content: "Data processing details for GDPR, CCPA and corporate clients." },
    ],
  }),
  component: DpaPage,
});

function DpaPage() {
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
            <FileText size={12} className="text-coral" />
            Compliance
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl">
            Data Processing <br />
            <em>Addendum.</em>
          </h1>
          <p className="mt-6 text-sm text-muted-foreground">Last updated: June 14, 2026</p>

          <div className="mt-8 soft-card p-8 space-y-6 text-sm text-ink/80 leading-relaxed">
            <section>
              <h2 className="font-display text-2xl text-ink mb-2">1. Scope & GDPR Conformity</h2>
              <p>
                This DPA governs the processing of personal data in connection with the services provided by Exfluent under our standard Terms. It guarantees conformity with GDPR (General Data Protection Regulation) and CCPA (California Consumer Privacy Act) regulations.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-2">2. Sub-Processors</h2>
              <p>
                We use secure, enterprise-grade processors for hosting and billing services.
                Our key subprocessors are:
              </p>
              <ul className="mt-2 space-y-1.5 list-disc pl-5">
                <li><strong>Supabase / PostgreSQL:</strong> Database hosting & data storage.</li>
                <li><strong>Stripe:</strong> Payment processing & billing.</li>
                <li><strong>Postmark:</strong> Alert and billing email delivery.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mb-2">3. Storage & Location</h2>
              <p>
                Personal and dashboard tracking data is stored within EU-West (Frankfurt) or US-East regions based on customer location preferences during onboarding. All data is separated at the DB-tenant level.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
