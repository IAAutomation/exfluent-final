import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/auth/AuthShell";
import { ArrowLeft, Sparkles, Download, Chrome, Flame, Compass } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/extension")({
  head: () => ({
    meta: [
      { title: "Browser extension — Exfluent" },
      { name: "description", content: "Download the Exfluent Chrome & Firefox extension to audit AI usage." },
    ],
  }),
  component: ExtensionPage,
});

function ExtensionPage() {
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
            Integrations
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl">
            Audit spend in <br />
            <em>60 seconds.</em>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            The Exfluent browser extension runs locally in your browser. It automatically detects active AI tool tabs, measures active usage time in seconds, and updates your Exfluent Score — with zero prompt scanning or key-logging.
          </p>

          <div className="mt-12 space-y-6">
            <div className="soft-card p-8 text-center flex flex-col items-center">
              <Download size={36} className="text-coral" />
              <h2 className="font-display text-3xl text-ink mt-3">Download for your browser</h2>
              <p className="mt-2 text-sm text-ink/70 max-w-md">
                Get started on the Chrome Web Store or Firefox Add-on marketplace. It sets up in one click.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3 w-full">
                <button
                  onClick={() => alert("Redirecting to Chrome Web Store... (Just a mock, but it would take you to our store listing!)")}
                  className="flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-xs font-semibold text-cream hover:opacity-95"
                >
                  <Chrome size={16} /> Add to Chrome / Edge
                </button>
                <button
                  onClick={() => alert("Redirecting to Firefox Add-ons... (Just a mock, but it would take you to our Firefox listing!)")}
                  className="flex items-center gap-2 rounded-xl border border-ink/20 bg-card px-4 py-3 text-xs font-semibold text-ink hover:border-ink/50"
                >
                  <Flame size={16} /> Add to Firefox / Safari
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <h3 className="font-display text-2xl text-ink mb-2">Technical Specifications</h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground list-disc pl-5">
                <li><strong>Weight:</strong> &lt; 200KB</li>
                <li><strong>Permissions requested:</strong> Only `tabs` access for active domain matches.</li>
                <li><strong>Auto-detected hosts:</strong> 30+ major AI tools (OpenAI, Anthropic, Cursor, Midjourney, etc.)</li>
                <li><strong>Memory Overhead:</strong> &lt; 5MB RAM consumption.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
