import { motion } from "framer-motion";
import { Mail, Radar, Wand2, Share2 } from "lucide-react";
import type { ReactNode } from "react";

const STEPS = [
  {
    icon: <Mail size={20} />,
    title: "Connect or import",
    body: "Scan Gmail receipts in one tap, or add tools manually. Read-only and zero-knowledge.",
    tone: "peach",
    visual: <ConnectVisual />,
  },
  {
    icon: <Radar size={20} />,
    title: "We watch usage, not you",
    body: "The extension tracks AI domains and session time only. Never prompts, keystrokes or content.",
    tone: "lavender",
    visual: <WatchVisual />,
  },
  {
    icon: <Wand2 size={20} />,
    title: "Get a calm action plan",
    body: "Cancel, pause, switch, keep — Exfluent tells you why and how much you save.",
    tone: "mint",
    visual: <PlanVisual />,
  },
  {
    icon: <Share2 size={20} />,
    title: "Prove the ROI",
    body: "Share clean reports with your boss or client. Watch your score climb every week.",
    tone: "rose",
    visual: <ScoreVisual />,
  },
] as const;

export function HowItWorksTimeline() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl">
      {/* center spine */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-6 top-0 hidden h-full w-px origin-top md:left-1/2 md:block"
        style={{
          background:
            "linear-gradient(180deg, transparent, oklch(0.28 0.03 40 / 0.25), transparent)",
        }}
      />

      <ol className="space-y-16 md:space-y-24">
        {STEPS.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={s.title} className="relative md:grid md:grid-cols-2 md:gap-12">
              {/* node */}
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-6 top-4 z-10 -translate-x-1/2 md:left-1/2"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card font-display text-lg shadow-[0_8px_30px_-10px_rgba(60,40,30,0.3)]">
                  {i + 1}
                </span>
              </motion.span>

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, x: flip ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={
                  "pl-16 md:pl-0 " + (flip ? "md:col-start-2 md:text-left" : "md:text-right")
                }
              >
                <span className="chip">
                  {s.icon} Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-4xl leading-tight">{s.title}</h3>
                <p className="mt-3 max-w-md text-muted-foreground md:inline-block">{s.body}</p>
              </motion.div>

              {/* VISUAL */}
              <motion.div
                initial={{ opacity: 0, x: flip ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={
                  "mt-6 md:mt-0 " + (flip ? "md:col-start-1 md:row-start-1" : "md:col-start-2")
                }
              >
                <ToneCard tone={s.tone}>{s.visual}</ToneCard>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ToneCard({ tone, children }: { tone: string; children: ReactNode }) {
  const bg: Record<string, string> = {
    peach: "linear-gradient(160deg, oklch(0.94 0.06 55), oklch(0.99 0.02 70))",
    lavender: "linear-gradient(160deg, oklch(0.93 0.05 305), oklch(0.99 0.02 310))",
    mint: "linear-gradient(160deg, oklch(0.93 0.05 165), oklch(0.99 0.02 160))",
    rose: "linear-gradient(160deg, oklch(0.94 0.05 10), oklch(0.99 0.02 20))",
  };
  return (
    <div
      className="relative h-full overflow-hidden rounded-3xl border border-border p-6 shadow-[0_30px_60px_-30px_rgba(60,40,30,0.3)]"
      style={{ background: bg[tone] }}
    >
      {children}
    </div>
  );
}

/* ---------- inline SVG / mini visuals ---------- */
function ConnectVisual() {
  const items = ["ChatGPT", "Midjourney", "Claude", "Cursor"];
  return (
    <div>
      <div className="rounded-2xl border border-border bg-card/80 p-4">
        <div className="flex items-center gap-2 text-xs text-ink/60">
          <Mail size={14} /> Gmail · receipts found
        </div>
        <ul className="mt-3 space-y-2">
          {items.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="flex items-center justify-between rounded-xl bg-background/60 px-3 py-2 text-sm"
            >
              <span>{t}</span>
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 220 }}
                className="rounded-full bg-mint/40 px-2 py-0.5 text-[10px] font-medium text-ink"
              >
                imported
              </motion.span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WatchVisual() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-border bg-card/80 p-4">
        <div className="flex items-center justify-between text-xs text-ink/60">
          <span>Active session</span>
          <span>chat.openai.com</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-background/60">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "72%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.82 0.07 305), oklch(0.78 0.13 30))",
            }}
          />
        </div>
        <div className="mt-2 text-[10px] text-ink/55">42 min today</div>
      </div>
      <div className="rounded-2xl border border-border bg-card/80 p-3 text-xs text-ink/65">
        ✓ Domains & duration · ✗ no prompts · ✗ no keystrokes · ✗ no clipboard
      </div>
    </div>
  );
}

function PlanVisual() {
  const tips = [
    { l: "Cancel Jasper", v: "−$49", c: "coral" },
    { l: "Pause Midjourney", v: "−$30", c: "peach" },
    { l: "Keep ChatGPT", v: "ROI 92%", c: "mint" },
  ];
  return (
    <ul className="space-y-2">
      {tips.map((t, i) => (
        <motion.li
          key={t.l}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.15 }}
          className="flex items-center justify-between rounded-2xl border border-border bg-card/80 px-4 py-3"
        >
          <span className="text-sm">{t.l}</span>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-medium text-ink"
            style={{
              background:
                t.c === "coral"
                  ? "oklch(0.86 0.085 30)"
                  : t.c === "peach"
                  ? "oklch(0.92 0.07 55)"
                  : "oklch(0.9 0.06 165)",
            }}
          >
            {t.v}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

function ScoreVisual() {
  return (
    <div className="flex items-center gap-5">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" stroke="oklch(0.28 0.03 40 / 0.1)" strokeWidth="10" fill="none" />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            stroke="oklch(0.78 0.13 30)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 0.82 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ pathLength: 0.82 }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="font-display text-4xl">82</div>
            <div className="text-[10px] text-ink/60">Exfluent Score</div>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-2 text-xs text-ink/70">
        <div className="rounded-xl bg-card/80 px-3 py-2">+6 this week</div>
        <div className="rounded-xl bg-card/80 px-3 py-2">Top 8% of creators</div>
        <div className="rounded-xl bg-card/80 px-3 py-2">Share to LinkedIn →</div>
      </div>
    </div>
  );
}
