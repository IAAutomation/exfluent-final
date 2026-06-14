import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/auth/AuthShell";
import { ArrowLeft, Sparkles, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Exfluent" },
      { name: "description", content: "Join the team building the future of calm software." },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const jobs = [
    { title: "Product Designer", dept: "Design", loc: "Remote / Europe" },
    { title: "Senior Full Stack Engineer (React/Start)", dept: "Engineering", loc: "Remote / Global" },
    { title: "Developer Advocate", dept: "Community", loc: "Remote / US East" },
  ];

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
            Careers
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl">
            Do your best work, <br />
            then <em>go offline.</em>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We are a small, fully remote team focused on craft, design details, and calm execution. We don't believe in late-night pagers, endless meetings, or aggressive growth hacking. We value writing, deep focus, and work-life harmony.
          </p>

          <div className="mt-12 space-y-4">
            <h2 className="font-display text-3xl mb-6">Open roles</h2>
            {jobs.map((j, i) => (
              <motion.div
                key={j.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="soft-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-lg text-ink">{j.title}</h3>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Briefcase size={12} /> {j.dept}</span>
                    <span className="inline-flex items-center gap-1"><MapPin size={12} /> {j.loc}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Application form submitted successfully! (Just a mock, but we would love to talk!)`)}
                  className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-cream hover:opacity-95 self-start sm:self-auto"
                >
                  Apply now →
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
