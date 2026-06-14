import { motion } from "framer-motion";
import { ArrowUpRight, Gauge, Wallet, Zap, TrendingDown } from "lucide-react";

/**
 * Compact hero-only mini dashboard preview.
 * Visually distinct from <DashboardPreview /> used in the lower DashboardSection.
 * Card-stack style: phone-like KPI tower + floating widget tiles, no charts.
 */
export function HeroDashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-5xl"
    >
      <div className="soft-card relative overflow-hidden p-6 sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          {/* LEFT: hero stat tower */}
          <div
            className="relative overflow-hidden rounded-3xl p-6"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.92 0.08 55), oklch(0.94 0.06 20) 60%, oklch(0.9 0.07 305))",
            }}
          >
            <span className="chip border-ink/15 bg-card/70">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              Your AI stack · live
            </span>
            <div className="mt-6">
              <div className="text-xs text-ink/60">Saved this month</div>
              <Counter value={289} className="font-display text-7xl leading-none" prefix="$" />
              <div className="mt-2 inline-flex items-center gap-1 text-xs text-mint">
                <TrendingDown size={12} /> Spend down 14% MoM
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <MiniStat label="Tools" value="12" />
              <MiniStat label="Idle" value="3" />
              <MiniStat label="Overlap" value="2" />
              <MiniStat label="Score" value="82" />
            </div>
          </div>

          {/* RIGHT: floating widget tiles */}
          <div className="relative grid gap-4">
            <Tile delay={0.1} tone="lavender" title="Exfluent Score" big="82" sub="+6 this week" icon={<Gauge size={16} />} />
            <Tile delay={0.2} tone="mint" title="ROI this month" big="3.4×" sub="$612 value / $268 spend" icon={<Zap size={16} />} />
            <Tile delay={0.3} tone="peach" title="Top tool" big="ChatGPT" sub="92% ROI · $20/mo" icon={<Wallet size={16} />} />
          </div>
        </div>

        {/* foot strip */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/60 p-4 text-xs text-ink/70">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
            Watching 12 AI subscriptions · synced 2 min ago
          </div>
          <div className="flex items-center gap-1">
            <span>Open full dashboard</span> <ArrowUpRight size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-card/70 p-3 backdrop-blur">
      <div className="text-[10px] uppercase tracking-wider text-ink/55">{label}</div>
      <div className="font-display text-3xl leading-none">{value}</div>
    </div>
  );
}

function Tile({
  delay,
  tone,
  title,
  big,
  sub,
  icon,
}: {
  delay: number;
  tone: "lavender" | "mint" | "peach";
  title: string;
  big: string;
  sub: string;
  icon: React.ReactNode;
}) {
  const bg: Record<string, string> = {
    lavender: "linear-gradient(135deg, oklch(0.92 0.07 305), oklch(0.97 0.03 310))",
    mint: "linear-gradient(135deg, oklch(0.92 0.06 165), oklch(0.97 0.03 160))",
    peach: "linear-gradient(135deg, oklch(0.94 0.06 55), oklch(0.99 0.02 70))",
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border p-5"
      style={{ background: bg[tone] }}
    >
      <div className="flex items-center justify-between text-xs text-ink/70">
        <span className="inline-flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-card/80">{icon}</span>
          {title}
        </span>
        <ArrowUpRight size={14} className="text-ink/40" />
      </div>
      <div className="mt-3 font-display text-4xl leading-none">{big}</div>
      <div className="mt-1 text-xs text-ink/60">{sub}</div>
    </motion.div>
  );
}

function Counter({ value, prefix = "", className = "" }: { value: number; prefix?: string; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {prefix}
      {value}
    </motion.div>
  );
}
