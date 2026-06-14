import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  CheckCircle2,
  PauseCircle,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";

const spendTrend = [
  { m: "Jan", spend: 412, saved: 60 },
  { m: "Feb", spend: 389, saved: 110 },
  { m: "Mar", spend: 421, saved: 140 },
  { m: "Apr", spend: 358, saved: 190 },
  { m: "May", spend: 312, saved: 230 },
  { m: "Jun", spend: 268, saved: 289 },
];

const byCategory = [
  { name: "Writing", value: 38, color: "var(--peach)" },
  { name: "Coding", value: 26, color: "var(--lavender)" },
  { name: "Image", value: 18, color: "var(--rose)" },
  { name: "Voice", value: 12, color: "var(--mint)" },
  { name: "Other", value: 6, color: "var(--butter)" },
];

const tools = [
  { name: "ChatGPT", roi: 92, cost: 20, status: "active" },
  { name: "Cursor", roi: 88, cost: 20, status: "active" },
  { name: "Claude", roi: 76, cost: 18, status: "active" },
  { name: "Midjourney", roi: 41, cost: 30, status: "idle" },
  { name: "Jasper", roi: 12, cost: 49, status: "cancel" },
];

export function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200 }}
      className="soft-card relative mx-auto w-full max-w-6xl overflow-hidden p-4 sm:p-6"
    >
      {/* window chrome */}
      <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose/70" />
          <span className="h-3 w-3 rounded-full bg-butter" />
          <span className="h-3 w-3 rounded-full bg-mint" />
          <span className="ml-3 text-xs text-muted-foreground">exfluent.site / dashboard</span>
        </div>
        <span className="chip">
          <Sparkles size={12} className="text-coral" />
          Live audit
        </span>
      </div>

      {/* KPI strip */}
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="Tools tracked" value="12" delta="+2 this month" icon={<Wallet size={14} />} tone="lavender" />
        <Kpi label="Monthly spend" value="$268" delta="−14% MoM" icon={<TrendingDown size={14} />} tone="mint" trendDown />
        <Kpi label="Wasted / month" value="$89" delta="3 idle tools" icon={<PauseCircle size={14} />} tone="peach" />
        <Kpi label="Exfluent Score" value="82" delta="+6 this week" icon={<TrendingUp size={14} />} tone="rose" />
      </div>

      {/* Charts row */}
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <Panel title="Spend vs. Saved" subtitle="last 6 months" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={spendTrend} margin={{ top: 10, right: 8, bottom: 0, left: -16 }}>
                <defs>
                  <linearGradient id="g-spend" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.13 30)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.78 0.13 30)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g-saved" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.07 305)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="oklch(0.82 0.07 305)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.28 0.03 40 / 0.08)" vertical={false} />
                <XAxis dataKey="m" stroke="oklch(0.48 0.03 50)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.48 0.03 50)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.99 0.012 80)",
                    border: "1px solid oklch(0.28 0.03 40 / 0.12)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="spend" stroke="oklch(0.78 0.13 30)" strokeWidth={2} fill="url(#g-spend)" />
                <Area type="monotone" dataKey="saved" stroke="oklch(0.82 0.07 305)" strokeWidth={2} fill="url(#g-saved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="By category" subtitle="of total spend">
          <div className="flex h-56 items-center">
            <div className="h-full w-1/2">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={byCategory} dataKey="value" innerRadius={42} outerRadius={68} paddingAngle={3} stroke="none">
                    {byCategory.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="w-1/2 space-y-1.5 text-xs">
              {byCategory.map((c) => (
                <li key={c.name} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                  <span className="flex-1">{c.name}</span>
                  <span className="text-muted-foreground">{c.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      {/* Bottom row */}
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <Panel title="ROI by tool" subtitle="higher is better" className="lg:col-span-2">
          <div className="h-48">
            <ResponsiveContainer>
              <BarChart data={tools} margin={{ top: 10, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="oklch(0.28 0.03 40 / 0.08)" vertical={false} />
                <XAxis dataKey="name" stroke="oklch(0.48 0.03 50)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.48 0.03 50)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.99 0.012 80)",
                    border: "1px solid oklch(0.28 0.03 40 / 0.12)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="roi" radius={[10, 10, 4, 4]}>
                  {tools.map((t) => (
                    <Cell
                      key={t.name}
                      fill={
                        t.roi > 70
                          ? "oklch(0.87 0.07 165)"
                          : t.roi > 40
                          ? "oklch(0.93 0.08 95)"
                          : "oklch(0.78 0.13 30)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Smart alerts" subtitle="3 actions" className="overflow-hidden">
          <ul className="space-y-2 text-sm">
            <AlertRow icon={<XCircle size={14} className="text-coral" />} label="Cancel Jasper" hint="−$49 / mo" />
            <AlertRow icon={<PauseCircle size={14} className="text-peach" />} label="Pause Midjourney" hint="14d idle" />
            <AlertRow icon={<CheckCircle2 size={14} className="text-mint" />} label="Trial ends — Runway" hint="in 3d" />
            <AlertRow icon={<Zap size={14} className="text-lavender" />} label="Overlap: Notion AI ⇄ ChatGPT" hint="−$10 / mo" />
            <AlertRow icon={<Bell size={14} className="text-rose" />} label="ChatGPT renews" hint="in 7d" />
          </ul>
        </Panel>
      </div>
    </motion.div>
  );
}

function Kpi({
  label,
  value,
  delta,
  icon,
  tone,
  trendDown,
}: {
  label: string;
  value: string;
  delta: string;
  icon: ReactNode;
  tone: "peach" | "mint" | "lavender" | "rose";
  trendDown?: boolean;
}) {
  const bg: Record<string, string> = {
    peach: "linear-gradient(135deg, oklch(0.92 0.07 55), oklch(0.97 0.03 60))",
    mint: "linear-gradient(135deg, oklch(0.92 0.06 165), oklch(0.97 0.03 160))",
    lavender: "linear-gradient(135deg, oklch(0.9 0.06 305), oklch(0.97 0.03 310))",
    rose: "linear-gradient(135deg, oklch(0.92 0.06 10), oklch(0.97 0.03 20))",
  };
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border p-4"
      style={{ background: bg[tone] }}
    >
      <div className="flex items-center justify-between text-xs text-ink/70">
        <span className="inline-flex items-center gap-1.5">{icon}{label}</span>
        <ArrowUpRight size={14} className="text-ink/40" />
      </div>
      <div className="mt-2 font-display text-4xl">{value}</div>
      <div className={"mt-1 text-xs " + (trendDown ? "text-mint" : "text-ink/60")}>{delta}</div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={"rounded-2xl border border-border bg-card/70 p-4 backdrop-blur " + className}>
      <div className="mb-2 flex items-baseline justify-between">
        <h4 className="text-sm font-medium">{title}</h4>
        {subtitle && <span className="text-[11px] text-muted-foreground">{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

function AlertRow({ icon, label, hint }: { icon: ReactNode; label: string; hint: string }) {
  return (
    <li className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2">
      <span className="flex items-center gap-2">{icon}{label}</span>
      <span className="text-xs text-muted-foreground">{hint}</span>
    </li>
  );
}
