import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BellRing,
  Briefcase,
  Check,
  ChevronRight,
  CreditCard,
  Crown,
  Download as DownloadIcon,
  EyeOff,
  Filter,
  Gauge,
  Lock,
  Mail,
  MessageSquare,
  Pencil,
  PiggyBank,
  Plus,
  Radar,
  Search,
  Settings as SettingsIcon,
  Share2,
  Shield,
  ShieldAlert,
  Sparkles,
  Trash2,
  TrendingDown,
  TrendingUp,
  Twitter,
  Linkedin,
  UserPlus,
  Users,
  Wallet,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { LogoMark } from "@/components/auth/AuthShell";
import {
  PLANS,
  SCREENS,
  getStoredPlan,
  screensForPlan,
  setStoredPlan,
  type PlanId,
  type ScreenDef,
} from "@/lib/plans";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Exfluent — your AI stack dashboard" },
      { name: "description", content: "Track every AI subscription, ROI and overlap." },
    ],
  }),
  component: AppRoute,
});

/* ============================================================
 * STATE
 * ============================================================ */

interface Tool {
  id: string;
  name: string;
  category: string;
  cost: number;
  cycle: "Monthly" | "Yearly";
  status: "active" | "idle" | "trial";
  startedAt: string;
  trialEnds?: string;
  usageMin: number; // last 7d
  roi: number; // 0–100
}

const SEED_TOOLS: Tool[] = [
  { id: "t1", name: "ChatGPT", category: "Writing", cost: 20, cycle: "Monthly", status: "active", startedAt: "2024-01-12", usageMin: 320, roi: 92 },
  { id: "t2", name: "Cursor", category: "Coding", cost: 20, cycle: "Monthly", status: "active", startedAt: "2024-02-22", usageMin: 280, roi: 88 },
  { id: "t3", name: "Claude", category: "Writing", cost: 18, cycle: "Monthly", status: "active", startedAt: "2024-03-04", usageMin: 210, roi: 76 },
  { id: "t4", name: "Midjourney", category: "Image", cost: 30, cycle: "Monthly", status: "idle", startedAt: "2023-11-18", usageMin: 18, roi: 41 },
  { id: "t5", name: "Jasper", category: "Writing", cost: 49, cycle: "Monthly", status: "idle", startedAt: "2024-04-01", usageMin: 4, roi: 12 },
  { id: "t6", name: "Notion AI", category: "Writing", cost: 10, cycle: "Monthly", status: "active", startedAt: "2024-01-08", usageMin: 90, roi: 64 },
  { id: "t7", name: "Runway", category: "Video", cost: 15, cycle: "Monthly", status: "trial", startedAt: "2024-05-22", trialEnds: "2024-06-17", usageMin: 60, roi: 55 },
  { id: "t8", name: "ElevenLabs", category: "Voice", cost: 22, cycle: "Monthly", status: "active", startedAt: "2024-02-10", usageMin: 70, roi: 70 },
  { id: "t9", name: "Suno", category: "Voice", cost: 10, cycle: "Monthly", status: "trial", startedAt: "2024-05-30", trialEnds: "2024-06-19", usageMin: 20, roi: 30 },
  { id: "t10", name: "Perplexity", category: "Research", cost: 20, cycle: "Monthly", status: "active", startedAt: "2024-03-15", usageMin: 140, roi: 81 },
  { id: "t11", name: "Copilot", category: "Coding", cost: 10, cycle: "Monthly", status: "active", startedAt: "2024-01-21", usageMin: 240, roi: 84 },
  { id: "t12", name: "Copy.ai", category: "Writing", cost: 36, cycle: "Monthly", status: "idle", startedAt: "2023-12-09", usageMin: 6, roi: 18 },
];

interface Member {
  id: string;
  name: string;
  role: "Admin" | "Member" | "Viewer";
  spend: number;
  score: number;
  tools: number;
  avatarTone: string;
}
const SEED_MEMBERS: Member[] = [
  { id: "m1", name: "Ava Chen", role: "Admin", spend: 268, score: 82, tools: 12, avatarTone: "oklch(0.92 0.08 55)" },
  { id: "m2", name: "Diego Ortiz", role: "Member", spend: 198, score: 74, tools: 9, avatarTone: "oklch(0.9 0.07 305)" },
  { id: "m3", name: "Hira Saeed", role: "Member", spend: 312, score: 68, tools: 14, avatarTone: "oklch(0.91 0.06 165)" },
  { id: "m4", name: "Maya Roberts", role: "Viewer", spend: 90, score: 79, tools: 5, avatarTone: "oklch(0.92 0.06 10)" },
  { id: "m5", name: "Jorge Pacheco", role: "Member", spend: 224, score: 71, tools: 11, avatarTone: "oklch(0.93 0.08 95)" },
];

interface Project {
  id: string;
  name: string;
  client: string;
  toolIds: string[];
  monthlyCost: number;
}
const SEED_PROJECTS: Project[] = [
  { id: "p1", name: "Acme Brand Launch", client: "Acme Co", toolIds: ["t1", "t4", "t8"], monthlyCost: 72 },
  { id: "p2", name: "Internal Docs Site", client: "Internal", toolIds: ["t2", "t6", "t10"], monthlyCost: 50 },
  { id: "p3", name: "Q3 Video Campaign", client: "Northwind", toolIds: ["t7", "t8", "t11"], monthlyCost: 47 },
];

/* ============================================================
 * ROOT
 * ============================================================ */

function AppRoute() {
  const [plan, setPlan] = useState<PlanId>("free");
  const [active, setActive] = useState<string>("home");
  const [tools, setTools] = useState<Tool[]>(SEED_TOOLS);
  const [members] = useState<Member[]>(SEED_MEMBERS);
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS);
  const [toast, setToast] = useState<string>("");

  useEffect(() => {
    setPlan(getStoredPlan());
  }, []);

  const allowedScreens = useMemo(() => screensForPlan(plan), [plan]);
  const screensVisible = useMemo(() => {
    // Free is capped at 3 tools
    return tools.slice(0, plan === "free" ? 3 : tools.length);
  }, [tools, plan]);

  function flash(msg: string) {
    setToast(msg);
    window.clearTimeout((flash as unknown as { t?: number }).t);
    (flash as unknown as { t?: number }).t = window.setTimeout(() => setToast(""), 2400) as unknown as number;
  }

  function switchPlan(p: PlanId) {
    setStoredPlan(p);
    setPlan(p);
    setActive("home");
    flash(`Switched to ${p.toUpperCase()} plan`);
  }

  const ctx: AppCtx = {
    plan,
    tools: screensVisible,
    allTools: tools,
    setTools,
    members,
    projects,
    setProjects,
    flash,
    setActive,
  };

  const active$ = allowedScreens.find((s) => s.id === active) ?? allowedScreens[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <Sidebar
          plan={plan}
          active={active$.id}
          screens={allowedScreens}
          onSelect={(id) => setActive(id)}
          onSwitchPlan={switchPlan}
        />
        <main className="min-h-screen overflow-x-hidden">
          <TopBar plan={plan} active={active$} onSwitchPlan={switchPlan} />
          <div className="mx-auto max-w-6xl px-6 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active$.id + ":" + plan}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ScreenRouter id={active$.id} ctx={ctx} />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm text-cream shadow-[0_20px_50px_-20px_rgba(60,40,30,0.6)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
 * SHELL UI
 * ============================================================ */

interface AppCtx {
  plan: PlanId;
  tools: Tool[];        // visible (free-capped)
  allTools: Tool[];     // total
  setTools: React.Dispatch<React.SetStateAction<Tool[]>>;
  members: Member[];
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  flash: (msg: string) => void;
  setActive: (id: string) => void;
}

function Sidebar({
  plan,
  active,
  screens,
  onSelect,
  onSwitchPlan,
}: {
  plan: PlanId;
  active: string;
  screens: ScreenDef[];
  onSelect: (id: string) => void;
  onSwitchPlan: (p: PlanId) => void;
}) {
  const groups = useMemo(() => {
    const map = new Map<string, ScreenDef[]>();
    screens.forEach((s) => {
      if (!map.has(s.group)) map.set(s.group, []);
      map.get(s.group)!.push(s);
    });
    return Array.from(map.entries());
  }, [screens]);

  return (
    <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-card/60 backdrop-blur lg:flex">
      <div className="flex items-center gap-2 px-5 py-5">
        <LogoMark />
        <span className="font-display text-2xl">Exfluent</span>
      </div>

      {/* plan switcher */}
      <div className="px-4">
        <div className="rounded-2xl border border-border bg-card p-1">
          <div className="flex">
            {PLANS.map((p) => (
              <button
                key={p.id}
                onClick={() => onSwitchPlan(p.id)}
                className={
                  "flex-1 rounded-xl px-2 py-1.5 text-xs font-medium transition-all " +
                  (plan === p.id ? "bg-ink text-cream" : "text-ink/60 hover:text-ink")
                }
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-4 overflow-y-auto px-3 pb-6">
        {groups.map(([g, items]) => (
          <div key={g}>
            <div className="px-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{g}</div>
            <ul className="mt-1.5 space-y-0.5">
              {items.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelect(s.id)}
                    className={
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors " +
                      (active === s.id
                        ? "bg-ink text-cream"
                        : "text-ink/75 hover:bg-muted")
                    }
                  >
                    <span>{s.label}</span>
                    {active === s.id && <ChevronRight size={14} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <Link
          to="/plan-picker"
          className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2 text-xs text-ink/70 hover:border-ink/40"
        >
          <span className="inline-flex items-center gap-1.5">
            <Crown size={12} className="text-coral" /> Change plan
          </span>
          <ArrowUpRight size={12} />
        </Link>
      </div>
    </aside>
  );
}

function TopBar({
  plan,
  active,
  onSwitchPlan,
}: {
  plan: PlanId;
  active: ScreenDef;
  onSwitchPlan: (p: PlanId) => void;
}) {
  const tier = PLANS.find((p) => p.id === plan)!;
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/70 px-6 py-3 backdrop-blur">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">{active.group}</span>
        <ChevronRight size={14} className="text-muted-foreground" />
        <span className="font-medium">{active.label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="chip">
          <span className="h-1.5 w-1.5 rounded-full bg-coral" />
          {tier.name} plan
        </span>
        <select
          value={plan}
          onChange={(e) => onSwitchPlan(e.target.value as PlanId)}
          className="rounded-full border border-border bg-card px-3 py-1.5 text-xs"
        >
          {PLANS.map((p) => (
            <option key={p.id} value={p.id}>
              Switch to {p.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* ============================================================
 * SCREEN ROUTER
 * ============================================================ */

function ScreenRouter({ id, ctx }: { id: string; ctx: AppCtx }) {
  switch (id) {
    case "home":
      return <HomeScreen ctx={ctx} />;
    case "tools":
      return <ToolsScreen ctx={ctx} />;
    case "add":
      return <AddToolScreen ctx={ctx} />;
    case "usage":
      return <UsageScreen ctx={ctx} />;
    case "roi":
      return <RoiScreen ctx={ctx} />;
    case "optimizer":
      return <OptimizerScreen ctx={ctx} />;
    case "overlap":
      return <OverlapScreen ctx={ctx} />;
    case "alerts":
      return <AlertsScreen ctx={ctx} />;
    case "share":
      return <ShareScreen ctx={ctx} />;
    case "profile":
      return <PublicProfileScreen ctx={ctx} />;
    case "score":
      return <ScoreScreen ctx={ctx} />;
    case "reports":
      return <ReportsScreen ctx={ctx} />;
    case "settings":
      return <SettingsScreen ctx={ctx} />;
    case "billing":
      return <BillingScreen ctx={ctx} />;
    case "team-dashboard":
      return <TeamDashboardScreen ctx={ctx} />;
    case "team-members":
      return <TeamMembersScreen ctx={ctx} />;
    case "team-invite":
      return <TeamInviteScreen ctx={ctx} />;
    case "team-member-detail":
      return <TeamMemberDetailScreen ctx={ctx} />;
    case "team-roles":
      return <TeamRolesScreen ctx={ctx} />;
    case "team-projects":
      return <TeamProjectsScreen ctx={ctx} />;
    case "team-project-detail":
      return <TeamProjectDetailScreen ctx={ctx} />;
    case "team-overlap":
      return <TeamOverlapScreen ctx={ctx} />;
    case "team-shadow":
      return <TeamShadowScreen ctx={ctx} />;
    case "team-reports":
      return <TeamReportsScreen ctx={ctx} />;
    default:
      return <div>Unknown screen</div>;
  }
}

/* ============================================================
 * SHARED PRIMITIVES
 * ============================================================ */

function Header({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-4xl leading-tight">{title}</h1>
        {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={"rounded-2xl border border-border bg-card/70 p-5 backdrop-blur " + className}>
      {children}
    </div>
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
  delta?: string;
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
    <div className="overflow-hidden rounded-2xl border border-border p-4" style={{ background: bg[tone] }}>
      <div className="flex items-center justify-between text-xs text-ink/70">
        <span className="inline-flex items-center gap-1.5">{icon} {label}</span>
      </div>
      <div className="mt-2 font-display text-4xl">{value}</div>
      {delta && (
        <div className={"mt-1 text-xs " + (trendDown ? "text-mint" : "text-ink/60")}>{delta}</div>
      )}
    </div>
  );
}

function GateBanner({ children, plan }: { children: ReactNode; plan: PlanId }) {
  if (plan !== "free") return null;
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-ink">
      <span className="inline-flex items-center gap-2">
        <Lock size={14} className="text-coral" /> {children}
      </span>
      <Link
        to="/plan-picker"
        className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-xs text-cream hover:opacity-95"
      >
        Upgrade <ArrowUpRight size={12} />
      </Link>
    </div>
  );
}

function Blur({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm">{children}</div>
      <div className="absolute inset-0 grid place-items-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs">
          <Lock size={12} /> Upgrade to unlock
        </span>
      </div>
    </div>
  );
}

/* ============================================================
 * SCREENS
 * ============================================================ */

/* ---- 1. Home ---- */
function HomeScreen({ ctx }: { ctx: AppCtx }) {
  const totalSpend = ctx.tools.reduce((s, t) => s + t.cost, 0);
  const waste = ctx.tools.filter((t) => t.status === "idle").reduce((s, t) => s + t.cost, 0);
  const score = ctx.plan === "free" ? 64 : 82;

  return (
    <div className="space-y-6">
      <Header
        title={`Welcome back, Ava`}
        sub={`Watching ${ctx.tools.length} AI ${ctx.tools.length === 1 ? "tool" : "tools"} on your ${PLANS.find((p) => p.id === ctx.plan)?.name} plan.`}
        action={
          <Link
            to="/plan-picker"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-ink/40"
          >
            <Crown size={14} /> Manage plan
          </Link>
        }
      />

      {ctx.plan === "free" && (
        <GateBanner plan={ctx.plan}>
          You're seeing the Free dashboard — capped at 3 tools.
        </GateBanner>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Tools tracked" value={String(ctx.tools.length)} icon={<Wallet size={14} />} tone="lavender" delta={ctx.plan === "free" ? "3 / 3 used" : "+2 this month"} />
        <Kpi label="Monthly spend" value={`$${totalSpend}`} icon={<TrendingDown size={14} />} tone="mint" delta="−14% MoM" trendDown />
        <Kpi label="Wasted / month" value={`$${waste}`} icon={<AlertTriangle size={14} />} tone="peach" delta={`${ctx.tools.filter((t) => t.status === "idle").length} idle`} />
        <Kpi label="Exfluent Score" value={String(score)} icon={<Gauge size={14} />} tone="rose" delta={ctx.plan === "free" ? "Upgrade for trend" : "+6 this week"} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-2 flex items-baseline justify-between">
            <h4 className="text-sm font-medium">Spend vs. Saved</h4>
            <span className="text-[11px] text-muted-foreground">{ctx.plan === "free" ? "30 days" : "last 6 months"}</span>
          </div>
          <div className="h-56">
            {ctx.plan === "free" ? (
              <ResponsiveContainer>
                <BarChart data={[{ m: "This month", spend: totalSpend, saved: 40 }]}>
                  <Bar dataKey="spend" fill="oklch(0.78 0.13 30)" radius={[8, 8, 4, 4]} />
                  <XAxis dataKey="m" fontSize={11} axisLine={false} tickLine={false} stroke="oklch(0.48 0.03 50)" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer>
                <AreaChart data={[
                  { m: "Jan", spend: 412, saved: 60 },
                  { m: "Feb", spend: 389, saved: 110 },
                  { m: "Mar", spend: 421, saved: 140 },
                  { m: "Apr", spend: 358, saved: 190 },
                  { m: "May", spend: 312, saved: 230 },
                  { m: "Jun", spend: totalSpend, saved: 289 },
                ]} margin={{ top: 10, right: 8, bottom: 0, left: -16 }}>
                  <defs>
                    <linearGradient id="g-spend2" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.78 0.13 30)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.78 0.13 30)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g-saved2" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.82 0.07 305)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="oklch(0.82 0.07 305)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(0.28 0.03 40 / 0.08)" vertical={false} />
                  <XAxis dataKey="m" fontSize={11} axisLine={false} tickLine={false} stroke="oklch(0.48 0.03 50)" />
                  <YAxis fontSize={11} axisLine={false} tickLine={false} stroke="oklch(0.48 0.03 50)" />
                  <Tooltip />
                  <Area type="monotone" dataKey="spend" stroke="oklch(0.78 0.13 30)" fill="url(#g-spend2)" />
                  <Area type="monotone" dataKey="saved" stroke="oklch(0.82 0.07 305)" fill="url(#g-saved2)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card>
          <h4 className="text-sm font-medium">Quick actions</h4>
          <div className="mt-3 space-y-2 text-sm">
            <ActionRow icon={<Plus size={14} />} label="Add a new tool" onClick={() => ctx.setActive("add")} />
            <ActionRow icon={<Wand2 size={14} />} label="Run optimizer" onClick={() => ctx.setActive("optimizer")} />
            <ActionRow icon={<Share2 size={14} />} label="Share report" onClick={() => ctx.setActive("share")} />
            {ctx.plan !== "free" && <ActionRow icon={<DownloadIcon size={14} />} label="Export CSV" onClick={() => ctx.flash("CSV exported")} />}
            {ctx.plan === "team" && <ActionRow icon={<UserPlus size={14} />} label="Invite a teammate" onClick={() => ctx.setActive("team-invite")} />}
          </div>
        </Card>
      </div>

      {ctx.plan === "team" && <TeamOverviewMini ctx={ctx} />}
    </div>
  );
}

function ActionRow({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2 text-left text-sm hover:border-ink/30">
      <span className="inline-flex items-center gap-2">{icon} {label}</span>
      <ArrowRight size={14} className="text-ink/40" />
    </button>
  );
}

function TeamOverviewMini({ ctx }: { ctx: AppCtx }) {
  const total = ctx.members.reduce((s, m) => s + m.spend, 0);
  const avg = Math.round(ctx.members.reduce((s, m) => s + m.score, 0) / ctx.members.length);
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h4 className="font-display text-2xl">Team overview</h4>
        <button onClick={() => ctx.setActive("team-dashboard")} className="text-xs text-ink/60 hover:text-ink">Open team dashboard →</button>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Kpi label="Members" value={String(ctx.members.length)} icon={<Users size={14} />} tone="lavender" />
        <Kpi label="Team spend" value={`$${total}`} icon={<Wallet size={14} />} tone="peach" />
        <Kpi label="Avg score" value={String(avg)} icon={<Gauge size={14} />} tone="mint" />
      </div>
    </Card>
  );
}

/* ---- 2. Tools ---- */
function ToolsScreen({ ctx }: { ctx: AppCtx }) {
  const [q, setQ] = useState("");
  const filtered = ctx.tools.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <Header
        title="My AI tools"
        sub={ctx.plan === "free" ? "Free plan — up to 3 tools." : "Unlimited tools, grouped by category."}
        action={
          <button
            onClick={() => ctx.setActive("add")}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-cream hover:opacity-95"
          >
            <Plus size={14} /> Add tool
          </button>
        }
      />

      {ctx.plan === "free" && ctx.allTools.length > 3 && (
        <GateBanner plan={ctx.plan}>
          {ctx.allTools.length - 3} more tools detected — upgrade to Pro to unlock unlimited tracking.
        </GateBanner>
      )}

      <Card className="!p-0">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Search size={14} className="text-ink/50" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tools…"
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <button className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs">
            <Filter size={12} /> Filter
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-ink/55">
              <th className="px-4 py-2 font-medium">Tool</th>
              <th className="px-4 py-2 font-medium">Category</th>
              <th className="px-4 py-2 font-medium">Cost</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">ROI</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 font-medium">{t.name}</td>
                <td className="px-4 py-3 text-ink/65">{t.category}</td>
                <td className="px-4 py-3">${t.cost}/{t.cycle === "Monthly" ? "mo" : "yr"}</td>
                <td className="px-4 py-3">
                  <StatusPill status={t.status} />
                </td>
                <td className="px-4 py-3">
                  <RoiBar value={t.roi} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => {
                      ctx.setTools((all) => all.filter((x) => x.id !== t.id));
                      ctx.flash(`Removed ${t.name}`);
                    }}
                    className="text-ink/45 hover:text-coral"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function StatusPill({ status }: { status: Tool["status"] }) {
  const map = {
    active: { bg: "oklch(0.9 0.07 165)", l: "Active" },
    idle: { bg: "oklch(0.92 0.07 55)", l: "Idle" },
    trial: { bg: "oklch(0.9 0.07 305)", l: "Trial" },
  };
  const m = map[status];
  return (
    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: m.bg }}>
      {m.l}
    </span>
  );
}

function RoiBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-background/80">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background:
              value > 70
                ? "oklch(0.87 0.07 165)"
                : value > 40
                ? "oklch(0.93 0.08 95)"
                : "oklch(0.78 0.13 30)",
          }}
        />
      </div>
      <span className="text-xs text-ink/60">{value}%</span>
    </div>
  );
}

/* ---- 3. Add tool ---- */
function AddToolScreen({ ctx }: { ctx: AppCtx }) {
  const [form, setForm] = useState({
    name: "",
    category: "Writing",
    cost: 20,
    cycle: "Monthly" as Tool["cycle"],
    status: "active" as Tool["status"],
  });

  const limitHit = ctx.plan === "free" && ctx.allTools.length >= 3;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (limitHit) return;
    const t: Tool = {
      id: "n" + Math.random().toString(36).slice(2, 7),
      name: form.name || "Untitled",
      category: form.category,
      cost: Number(form.cost),
      cycle: form.cycle,
      status: form.status,
      startedAt: new Date().toISOString().slice(0, 10),
      usageMin: 0,
      roi: 50,
    };
    ctx.setTools((all) => [t, ...all]);
    ctx.flash(`Added ${t.name}`);
    setForm({ ...form, name: "" });
    ctx.setActive("tools");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Header title="Add an AI tool" sub="Manually enter subscription details." />

      {limitHit && (
        <GateBanner plan={ctx.plan}>
          Free plan supports up to 3 tools. Upgrade to add more.
        </GateBanner>
      )}

      <Card>
        <form onSubmit={submit} className="space-y-4">
          <Input label="Tool name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="e.g. ChatGPT Plus" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Select label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={["Writing", "Coding", "Image", "Voice", "Video", "Research", "Other"]} />
            <Select label="Billing cycle" value={form.cycle} onChange={(v) => setForm({ ...form, cycle: v as Tool["cycle"] })} options={["Monthly", "Yearly"]} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Cost (USD)" type="number" value={String(form.cost)} onChange={(v) => setForm({ ...form, cost: Number(v) })} />
            <Select label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v as Tool["status"] })} options={["active", "idle", "trial"]} />
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={() => ctx.setActive("tools")} className="rounded-full px-4 py-2 text-sm text-ink/65 hover:text-ink">
              Cancel
            </button>
            <button
              type="submit"
              disabled={limitHit}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm text-cream disabled:opacity-40"
            >
              <Plus size={14} /> Save tool
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-ink/65">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ink/40"
      />
    </label>
  );
}
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-xs text-ink/65">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ink/40"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

/* ---- 4. Usage ---- */
function UsageScreen({ ctx }: { ctx: AppCtx }) {
  const data = ctx.tools.map((t) => ({ name: t.name, mins: t.usageMin }));
  return (
    <div className="space-y-6">
      <Header title="Usage overview" sub={ctx.plan === "free" ? "Basic time-on-tool, last 7 days." : "Daily / weekly / monthly trends per tool."} />

      <Card>
        <h4 className="text-sm font-medium">Time spent (last 7 days)</h4>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid stroke="oklch(0.28 0.03 40 / 0.08)" vertical={false} />
              <XAxis dataKey="name" fontSize={11} axisLine={false} tickLine={false} stroke="oklch(0.48 0.03 50)" />
              <YAxis fontSize={11} axisLine={false} tickLine={false} stroke="oklch(0.48 0.03 50)" />
              <Tooltip />
              <Bar dataKey="mins" radius={[8, 8, 4, 4]} fill="oklch(0.82 0.07 305)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {ctx.plan !== "free" ? (
        <Card>
          <h4 className="text-sm font-medium">Active vs idle</h4>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {ctx.tools.map((t) => (
              <div key={t.id} className="rounded-xl border border-border bg-background/60 px-3 py-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{t.name}</span>
                  <StatusPill status={t.status} />
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
                  <div className="h-full rounded-full" style={{ width: `${Math.min(100, t.usageMin / 4)}%`, background: "oklch(0.87 0.07 165)" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <GateBanner plan={ctx.plan}>Active-vs-idle comparisons & monthly trends are a Pro feature.</GateBanner>
      )}
    </div>
  );
}

/* ---- 5. ROI ---- */
function RoiScreen({ ctx }: { ctx: AppCtx }) {
  const [rate, setRate] = useState(60);
  const totalHours = ctx.tools.reduce((s, t) => s + t.usageMin / 60, 0);
  const value = totalHours * rate;
  const cost = ctx.tools.reduce((s, t) => s + t.cost, 0);
  const roi = cost ? (value / cost).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <Header title="ROI Calculator" sub="Hours saved × your rate − tool cost." />

      <Card>
        <div className="grid gap-4 sm:grid-cols-3">
          <Kpi label="Total value" value={`$${Math.round(value)}`} icon={<TrendingUp size={14} />} tone="mint" />
          <Kpi label="Tool cost" value={`$${cost}/mo`} icon={<Wallet size={14} />} tone="peach" />
          <Kpi label="ROI multiple" value={`${roi}×`} icon={<Zap size={14} />} tone="lavender" />
        </div>

        <div className="mt-6">
          <label className="text-xs text-ink/65">Your hourly rate</label>
          <input type="range" min={20} max={250} value={rate} onChange={(e) => setRate(+e.target.value)} className="mt-2 w-full" />
          <div className="text-sm">${rate} / hour</div>
        </div>
      </Card>

      {ctx.plan === "free" ? (
        <GateBanner plan={ctx.plan}>Upgrade to Pro for per-tool breakdown, 6-month history & "if cancelled" simulation.</GateBanner>
      ) : (
        <>
          <Card>
            <h4 className="text-sm font-medium">Per-tool breakdown</h4>
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-ink/55">
                  <th className="py-2">Tool</th>
                  <th className="py-2">Hours / mo</th>
                  <th className="py-2">Value</th>
                  <th className="py-2">Cost</th>
                  <th className="py-2">ROI</th>
                </tr>
              </thead>
              <tbody>
                {ctx.tools.map((t) => {
                  const v = Math.round((t.usageMin / 60) * rate);
                  return (
                    <tr key={t.id} className="border-t border-border/60">
                      <td className="py-2">{t.name}</td>
                      <td className="py-2">{(t.usageMin / 60).toFixed(1)}</td>
                      <td className="py-2">${v}</td>
                      <td className="py-2">${t.cost}</td>
                      <td className="py-2 font-medium">{(v / t.cost).toFixed(1)}×</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>

          <Card>
            <h4 className="text-sm font-medium">6-month ROI history</h4>
            <div className="mt-4 h-56">
              <ResponsiveContainer>
                <LineChart data={[
                  { m: "Jan", roi: 2.1 },
                  { m: "Feb", roi: 2.4 },
                  { m: "Mar", roi: 2.6 },
                  { m: "Apr", roi: 2.9 },
                  { m: "May", roi: 3.1 },
                  { m: "Jun", roi: Number(roi) },
                ]}>
                  <CartesianGrid stroke="oklch(0.28 0.03 40 / 0.08)" vertical={false} />
                  <XAxis dataKey="m" fontSize={11} stroke="oklch(0.48 0.03 50)" axisLine={false} tickLine={false} />
                  <YAxis fontSize={11} stroke="oklch(0.48 0.03 50)" axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="roi" stroke="oklch(0.82 0.07 305)" strokeWidth={3} dot={{ r: 4, fill: "oklch(0.82 0.07 305)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

/* ---- 6. Optimizer ---- */
function OptimizerScreen({ ctx }: { ctx: AppCtx }) {
  const tips = [
    { tool: "Jasper", verdict: "Cancel", reason: "Used 4 min in 30 days · ROI 12%", savings: 49 },
    { tool: "Midjourney", verdict: "Pause", reason: "14 days idle · pay-per-use cheaper", savings: 30 },
    { tool: "Copy.ai", verdict: "Cancel", reason: "Overlaps with ChatGPT · 18% ROI", savings: 36 },
    { tool: "Notion AI", verdict: "Switch", reason: "ChatGPT already handles 90% of jobs", savings: 10 },
  ];
  const visible = ctx.plan === "free" ? tips.slice(0, 1) : tips;
  const total = visible.reduce((s, t) => s + t.savings, 0);

  return (
    <div className="space-y-6">
      <Header
        title="Stack Optimizer"
        sub={ctx.plan === "free" ? "1 recommendation per month on Free." : "Unlimited recommendations, auto-refreshes on usage change."}
        action={
          ctx.plan !== "free" && (
            <button onClick={() => ctx.flash(`Applied ${visible.length} actions · saved $${total}/mo`)} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-cream">
              Apply all (−${total}/mo) <Check size={14} />
            </button>
          )
        }
      />

      <div className="space-y-3">
        {visible.map((t) => (
          <Card key={t.tool}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-2xl">{t.tool}</h4>
                  <span className="rounded-full bg-coral/15 px-2.5 py-0.5 text-xs font-medium text-coral">{t.verdict}</span>
                </div>
                {ctx.plan !== "free" ? (
                  <p className="mt-1 text-sm text-ink/65">{t.reason}</p>
                ) : (
                  <p className="mt-1 text-sm text-ink/45">Reasoning locked — upgrade to Pro.</p>
                )}
              </div>
              <div className="text-right">
                <div className="font-display text-3xl text-coral">−${t.savings}</div>
                <div className="text-xs text-ink/55">/ month</div>
              </div>
            </div>
          </Card>
        ))}

        {ctx.plan === "free" && (
          <Blur>
            <div className="space-y-3">
              {tips.slice(1).map((t) => (
                <Card key={t.tool}>
                  <div className="font-display text-2xl">{t.tool} · {t.verdict}</div>
                  <p className="mt-1 text-sm">{t.reason}</p>
                </Card>
              ))}
            </div>
          </Blur>
        )}
      </div>
    </div>
  );
}

/* ---- 7. Overlap ---- */
function OverlapScreen({ ctx }: { ctx: AppCtx }) {
  const pairs = [
    { a: "ChatGPT", b: "Notion AI", category: "Writing", keep: "ChatGPT", drop: "Notion AI", savings: 10, reason: "Same job, ChatGPT used 3× more" },
    { a: "Jasper", b: "Copy.ai", category: "Writing", keep: "—", drop: "Both", savings: 85, reason: "Both idle, both overlap ChatGPT" },
    { a: "Midjourney", b: "DALL·E", category: "Image", keep: "Midjourney", drop: "DALL·E", savings: 20, reason: "Higher ROI on Midjourney" },
  ];

  return (
    <div className="space-y-6">
      <Header title="Overlap detection" sub={ctx.plan === "free" ? "Free flags overlaps without suggestions." : "Feature-by-feature comparison with verdict & savings."} />

      <div className="space-y-3">
        {pairs.map((p) => (
          <Card key={p.a}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-ink/55">{p.category} · overlap</div>
                <div className="mt-1 font-display text-2xl">{p.a} ⇄ {p.b}</div>
              </div>
              <span className="rounded-full bg-coral/15 px-2.5 py-1 text-xs font-medium text-coral">−${p.savings}/mo</span>
            </div>
            {ctx.plan !== "free" ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
                <Snip k="Keep" v={p.keep} tone="mint" />
                <Snip k="Cancel" v={p.drop} tone="rose" />
                <Snip k="Why" v={p.reason} tone="peach" />
              </div>
            ) : (
              <p className="mt-3 text-sm text-ink/55">Replacement suggestions locked on Free.</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
function Snip({ k, v, tone }: { k: string; v: string; tone: "mint" | "rose" | "peach" }) {
  const bg: Record<string, string> = {
    mint: "oklch(0.93 0.05 165)", rose: "oklch(0.93 0.05 10)", peach: "oklch(0.94 0.06 55)",
  };
  return (
    <div className="rounded-xl border border-border p-3" style={{ background: bg[tone] }}>
      <div className="text-[10px] uppercase tracking-wider text-ink/60">{k}</div>
      <div className="mt-1 text-sm">{v}</div>
    </div>
  );
}

/* ---- 8. Alerts ---- */
function AlertsScreen({ ctx }: { ctx: AppCtx }) {
  const alerts = [
    { icon: <BellRing size={14} className="text-coral" />, t: "Trial ends — Runway", h: "in 3 days", channel: "Email" },
    { icon: <Wallet size={14} className="text-peach" />, t: "Idle — Midjourney", h: "14d idle", channel: "Email" },
    { icon: <Check size={14} className="text-mint" />, t: "Renewal — ChatGPT", h: "in 7 days", channel: "Email" },
    { icon: <Zap size={14} className="text-lavender" />, t: "Price hike — Suno", h: "+$2/mo", channel: "Email" },
  ];

  return (
    <div className="space-y-6">
      <Header title="Alerts center" sub={ctx.plan === "free" ? "Email only on Free." : "Email + push + Slack with per-channel toggles."} />

      <Card>
        <ul className="divide-y divide-border">
          {alerts.map((a) => (
            <li key={a.t} className="flex items-center justify-between py-3 text-sm">
              <span className="inline-flex items-center gap-2">{a.icon} {a.t}</span>
              <span className="text-xs text-ink/55">{a.h}</span>
              <span className="rounded-full bg-card px-2 py-0.5 text-[11px]">{a.channel}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h4 className="text-sm font-medium">Channels</h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Toggle label="Email" enabled />
          <Toggle label="Browser push" enabled={ctx.plan !== "free"} locked={ctx.plan === "free"} />
          <Toggle label="Slack" enabled={ctx.plan !== "free"} locked={ctx.plan === "free"} />
        </div>
      </Card>
    </div>
  );
}
function Toggle({ label, enabled, locked }: { label: string; enabled?: boolean; locked?: boolean }) {
  const [on, setOn] = useState(!!enabled);
  return (
    <button
      onClick={() => !locked && setOn(!on)}
      className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-3 py-2 text-sm"
    >
      <span className="inline-flex items-center gap-2">{label}{locked && <Lock size={12} className="text-ink/45" />}</span>
      <span className={"h-5 w-9 rounded-full p-0.5 transition-all " + (on ? "bg-ink" : "bg-muted")}>
        <span className={"block h-4 w-4 rounded-full bg-cream transition-transform " + (on ? "translate-x-4" : "")} />
      </span>
    </button>
  );
}

/* ---- 9. Share ---- */
function ShareScreen({ ctx }: { ctx: AppCtx }) {
  const watermarked = ctx.plan === "free";
  return (
    <div className="space-y-6">
      <Header title="Share report" sub="Drop a clean card into Twitter or LinkedIn." />

      <Card>
        <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-border" style={{
          background: "linear-gradient(160deg, oklch(0.94 0.06 55), oklch(0.92 0.07 305))",
        }}>
          <div className="p-6">
            <div className="text-xs uppercase tracking-wider text-ink/55">My AI stack this month</div>
            <div className="mt-2 font-display text-5xl">$289 saved</div>
            <div className="mt-1 text-sm text-ink/60">Score 82 · 3 idle tools killed</div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <Mini v="12" l="tools" />
              <Mini v="3.4×" l="ROI" />
              <Mini v="−14%" l="MoM" />
            </div>
            {watermarked && (
              <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1 text-[11px]">
                <Sparkles size={10} className="text-coral" /> Tracked with Exfluent
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <ShareBtn icon={<Twitter size={14} />} label="Post to X" onClick={() => ctx.flash("Opening X composer…")} />
          <ShareBtn icon={<Linkedin size={14} />} label="Post to LinkedIn" onClick={() => ctx.flash("Opening LinkedIn…")} />
          <ShareBtn icon={<DownloadIcon size={14} />} label="Download PNG" onClick={() => ctx.flash("PNG downloaded")} />
        </div>
        {watermarked && (
          <GateBanner plan={ctx.plan}>
            Remove the Exfluent watermark on Pro — and pick a custom card color.
          </GateBanner>
        )}
      </Card>
    </div>
  );
}
function Mini({ v, l }: { v: string; l: string }) {
  return <div className="rounded-xl bg-card/80 p-2 text-center"><div className="font-display text-2xl">{v}</div><div className="text-[10px] text-ink/55">{l}</div></div>;
}
function ShareBtn({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) {
  return <button onClick={onClick} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-ink/40">{icon}{label}</button>;
}

/* ---- 10. Score ---- */
function ScoreScreen({ ctx }: { ctx: AppCtx }) {
  const score = 82;
  return (
    <div className="space-y-6">
      <Header title="Exfluent Score" sub="0–100 weekly score. Stack health, ROI, idle, overlap." action={
        <button onClick={() => ctx.flash("Copied exfluent.site/@ava")} className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-ink/40">Copy public link</button>
      } />

      <Card>
        <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
          <div className="relative h-48 w-48">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" stroke="oklch(0.28 0.03 40 / 0.12)" strokeWidth="10" fill="none" />
              <motion.circle cx="50" cy="50" r="42" stroke="oklch(0.78 0.13 30)" strokeWidth="10" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: score / 100 }} transition={{ duration: 1.6, ease: "easeOut" }}
                style={{ pathLength: score / 100 }} />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="font-display text-6xl">{score}</div>
                <div className="text-xs text-ink/55">+6 this week</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <ScoreRow l="Active usage" v={88} />
            <ScoreRow l="ROI vs spend" v={78} />
            <ScoreRow l="No overlap" v={72} />
            <ScoreRow l="No idle drag" v={90} />
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-sm font-medium">Public profile</div>
        <div className="mt-2 inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 text-sm">
          exfluent.site/@ava
        </div>
      </Card>
    </div>
  );
}
function ScoreRow({ l, v }: { l: string; v: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs"><span>{l}</span><span>{v}</span></div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-background"><motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 0.9 }} className="h-full rounded-full bg-coral" /></div>
    </div>
  );
}

/* ---- 11. Reports ---- */
function ReportsScreen({ ctx }: { ctx: AppCtx }) {
  const reports = [
    { name: "Monthly spend", desc: "Per tool · per category" },
    { name: "ROI breakdown", desc: "6-month history" },
    { name: "Optimizer history", desc: "Applied actions & savings" },
  ];
  return (
    <div className="space-y-6">
      <Header title="Advanced reports" sub="Exportable CSV & PDF, ready for finance." />
      <div className="grid gap-3 sm:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.name}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-2xl">{r.name}</h4>
                <p className="mt-1 text-sm text-ink/60">{r.desc}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => ctx.flash(`${r.name}.csv downloaded`)} className="rounded-full border border-border bg-card px-3 py-1 text-xs">CSV</button>
                <button onClick={() => ctx.flash(`${r.name}.pdf downloaded`)} className="rounded-full border border-border bg-card px-3 py-1 text-xs">PDF</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---- 12. Settings (tabbed: Profile · Notifications · Connected Apps · Extension · Privacy · Danger) ---- */
function SettingsScreen({ ctx }: { ctx: AppCtx }) {
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "notifications", label: "Notifications" },
    { id: "connected", label: "Connected apps" },
    { id: "extension", label: "Extension" },
    { id: "privacy", label: "Privacy & data" },
    { id: "danger", label: "Danger zone" },
  ];
  const [tab, setTab] = useState<string>("profile");
  return (
    <div className="space-y-6">
      <Header title="Settings" sub="Profile, integrations, notifications and your data." />
      <div className="flex flex-wrap gap-1.5 rounded-full border border-border bg-card/70 p-1 backdrop-blur w-fit">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={"rounded-full px-4 py-1.5 text-xs transition-all " + (tab === t.id ? "bg-ink text-cream" : "text-ink/65 hover:text-ink")}>{t.label}</button>
        ))}
      </div>

      {tab === "profile" && (
        <Card>
          <h4 className="font-display text-2xl">Your profile</h4>
          <p className="mt-1 text-sm text-ink/60">Visible only to you and your team.</p>
          <div className="mt-5 flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full font-display text-2xl" style={{ background: "oklch(0.92 0.08 55)" }}>A</span>
            <button onClick={() => ctx.flash("Avatar updated")} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs hover:border-ink/40">Change photo</button>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Input label="Full name" value="Ava Chen" onChange={() => {}} />
            <Input label="Username" value="avachen" onChange={() => {}} />
            <Input label="Email" value="ava@exfluent.site" onChange={() => {}} />
            <Input label="Time zone" value="Europe / Lisbon" onChange={() => {}} />
          </div>
          <div className="mt-6 border-t border-border pt-5">
            <h5 className="text-sm font-medium">Change password</h5>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Input label="Current" value="" onChange={() => {}} type="password" placeholder="••••••" />
              <Input label="New" value="" onChange={() => {}} type="password" placeholder="••••••" />
              <Input label="Confirm" value="" onChange={() => {}} type="password" placeholder="••••••" />
            </div>
            <button onClick={() => ctx.flash("Password updated")} className="mt-4 rounded-full bg-ink px-4 py-2 text-sm text-cream">Save changes</button>
          </div>
        </Card>
      )}

      {tab === "notifications" && (
        <Card>
          <h4 className="font-display text-2xl">Notifications</h4>
          <p className="mt-1 text-sm text-ink/60">Pick the channels that should ping you.</p>
          <div className="mt-5 space-y-3">
            <ToggleRow icon={<Mail size={14} />} label="Email alerts" hint="Trials expiring, idle tools, weekly summary" defaultOn />
            <ToggleRow icon={<BellRing size={14} />} label="Push notifications" hint="Browser push for urgent events" defaultOn />
            <ToggleRow icon={<MessageSquare size={14} />} label="Slack" hint={ctx.plan === "free" ? "Pro feature — upgrade to enable" : "Posts to #ai-stack in your workspace"} disabled={ctx.plan === "free"} />
          </div>
          <div className="mt-6 border-t border-border pt-5">
            <h5 className="text-sm font-medium">What to send</h5>
            <div className="mt-3 space-y-3">
              <ToggleRow icon={<AlertTriangle size={14} />} label="Trial ending in 3 days" defaultOn />
              <ToggleRow icon={<EyeOff size={14} />} label="Tool idle for 14 days" defaultOn />
              <ToggleRow icon={<TrendingDown size={14} />} label="Spend drift over 15%" defaultOn />
              <ToggleRow icon={<Sparkles size={14} />} label="New optimizer recommendation" />
            </div>
            <button onClick={() => ctx.flash("Notification preferences saved")} className="mt-5 rounded-full bg-ink px-4 py-2 text-sm text-cream">Save preferences</button>
          </div>
        </Card>
      )}

      {tab === "connected" && (
        <Card>
          <h4 className="font-display text-2xl">Connected apps</h4>
          <p className="mt-1 text-sm text-ink/60">Manage what Exfluent can read from to find AI spend.</p>
          <div className="mt-5 space-y-2 text-sm">
            <Row icon={<Mail size={14} />} label="Gmail — receipts and invoices" status="Connected · ava@exfluent.site" cta="Disconnect" onClick={() => ctx.flash("Gmail disconnected")} />
            <Row icon={<MessageSquare size={14} />} label="Slack — alerts channel" status={ctx.plan === "free" ? "Pro feature" : "Not connected"} cta={ctx.plan === "free" ? undefined : "Connect"} onClick={() => ctx.flash("Opening Slack OAuth…")} />
            <Row icon={<CreditCard size={14} />} label="Stripe — billing read-only" status="Not connected" cta="Connect" onClick={() => ctx.flash("Opening Stripe OAuth…")} />
            <Row icon={<Briefcase size={14} />} label="QuickBooks — finance export" status={ctx.plan === "team" ? "Not connected" : "Team feature"} cta={ctx.plan === "team" ? "Connect" : undefined} onClick={() => ctx.flash("Opening QuickBooks…")} />
          </div>
        </Card>
      )}

      {tab === "extension" && (
        <Card>
          <h4 className="font-display text-2xl">Browser extension</h4>
          <p className="mt-1 text-sm text-ink/60">The on-page sidekick that flags new AI sign-ups in real time.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Stat label="Install status" value="Installed" hint="Chrome · v1.4.2" />
            <Stat label="Last sync" value="2 min ago" hint="Auto-syncs every 5 min" />
            <Stat label="Tools detected" value="12" hint="Since install" />
          </div>
          <div className="mt-5 space-y-3">
            <ToggleRow icon={<Radar size={14} />} label="Auto-detect new AI sign-ups" hint="Watches checkout pages and trial flows" defaultOn />
            <ToggleRow icon={<Shield size={14} />} label="Background tracking" hint="Sync usage in the background" defaultOn />
            <ToggleRow icon={<EyeOff size={14} />} label="Incognito tracking" hint="Off by default for privacy" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/download" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-ink/40"><DownloadIcon size={14} /> Reinstall extension</Link>
            <button onClick={() => ctx.flash("Sync triggered")} className="rounded-full bg-ink px-4 py-2 text-sm text-cream">Force sync now</button>
          </div>
        </Card>
      )}

      {tab === "privacy" && (
        <Card>
          <h4 className="font-display text-2xl">Privacy & data</h4>
          <p className="mt-1 text-sm text-ink/60">You own your data. Export or wipe it whenever.</p>
          <div className="mt-5 space-y-3">
            <Row icon={<DownloadIcon size={14} />} label="Export all my data (JSON)" status="One-time export" cta="Request" onClick={() => ctx.flash("Export queued — email arriving in ~5 min")} />
            <Row icon={<DownloadIcon size={14} />} label="Export tools & ROI as CSV" status="Spreadsheet-friendly" cta="Download" onClick={() => ctx.flash("CSV downloaded")} />
            <Row icon={<Shield size={14} />} label="Anonymize old usage data" status="Older than 12 months" cta="Run now" onClick={() => ctx.flash("Anonymized 8,420 events")} />
            <Row icon={<Trash2 size={14} />} label="Delete all usage history" status="Keeps account & subscriptions" cta="Delete" onClick={() => ctx.flash("Usage history wiped")} />
          </div>
          <div className="mt-5 rounded-xl border border-border bg-background/60 p-4 text-xs text-ink/65">
            We never sell your data. Read the <span className="underline">privacy policy</span> for the full picture.
          </div>
        </Card>
      )}

      {tab === "danger" && (
        <Card className="border-coral/30">
          <h4 className="font-display text-2xl text-coral">Delete account</h4>
          <p className="mt-1 text-sm text-ink/60">This wipes every tool, score, share card and team you own. No undo.</p>
          <ul className="mt-4 space-y-1.5 text-sm text-ink/70">
            <li className="flex items-start gap-2"><X size={14} className="mt-0.5 text-coral shrink-0" /> Cancels any active subscription on the next cycle</li>
            <li className="flex items-start gap-2"><X size={14} className="mt-0.5 text-coral shrink-0" /> Removes your public stack profile</li>
            <li className="flex items-start gap-2"><X size={14} className="mt-0.5 text-coral shrink-0" /> Deletes all reports and shared cards</li>
          </ul>
          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <Input label='Type "DELETE" to confirm' value="" onChange={() => {}} placeholder="DELETE" />
            <button onClick={() => ctx.flash("Account deletion requires email confirmation — check inbox")} className="rounded-full border border-coral/40 px-5 py-2.5 text-sm text-coral hover:bg-coral/10">Delete my account</button>
          </div>
        </Card>
      )}
    </div>
  );
}
function Row({ icon, label, status, cta, onClick }: { icon: ReactNode; label: string; status: string; cta?: string; onClick?: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-background/60 px-3 py-2.5">
      <span className="inline-flex min-w-0 items-center gap-2 text-sm"><span className="text-ink/65">{icon}</span><span className="truncate">{label}</span></span>
      <span className="flex items-center gap-3 text-xs text-ink/60">{status}{cta && <button onClick={onClick} className="rounded-full bg-ink px-3 py-1 text-cream">{cta}</button>}</span>
    </div>
  );
}
function ToggleRow({ icon, label, hint, defaultOn, disabled }: { icon: ReactNode; label: string; hint?: string; defaultOn?: boolean; disabled?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className={"flex items-start justify-between gap-3 rounded-xl border border-border bg-background/60 px-3 py-2.5 " + (disabled ? "opacity-60" : "")}>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm font-medium"><span className="text-ink/65">{icon}</span>{label}</div>
        {hint && <div className="mt-0.5 text-xs text-ink/55">{hint}</div>}
      </div>
      <button onClick={() => !disabled && setOn(!on)} disabled={disabled} className={"relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors " + (on ? "bg-ink" : "bg-muted")}>
        <span className={"absolute top-0.5 grid h-4 w-4 place-items-center rounded-full bg-cream transition-all " + (on ? "left-4" : "left-0.5")} />
      </button>
    </div>
  );
}
function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4">
      <div className="text-xs text-ink/55">{label}</div>
      <div className="mt-1 font-display text-2xl">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-ink/55">{hint}</div>}
    </div>
  );
}

/* ---- 13. Billing (tabbed: Overview · Compare · Payment · Invoices · Cancel · Downgrade) ---- */
function BillingScreen({ ctx }: { ctx: AppCtx }) {
  const tier = PLANS.find((p) => p.id === ctx.plan)!;
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "compare", label: "Compare plans" },
    { id: "payment", label: "Payment method" },
    { id: "invoices", label: "Invoices" },
    { id: "cancel", label: "Cancel" },
    { id: "downgrade", label: "Downgrade" },
  ];
  const [tab, setTab] = useState("overview");
  const usagePct = ctx.plan === "free" ? Math.round((ctx.allTools.length / 3) * 100) : 22;

  return (
    <div className="space-y-6">
      <Header title="Billing" sub={`You're on the ${tier.name} plan.`} />
      <div className="flex flex-wrap gap-1.5 rounded-full border border-border bg-card/70 p-1 backdrop-blur w-fit">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={"rounded-full px-4 py-1.5 text-xs transition-all " + (tab === t.id ? "bg-ink text-cream" : "text-ink/65 hover:text-ink")}>{t.label}</button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-ink/55">Current plan</div>
                <h4 className="mt-1 font-display text-3xl">{tier.name}</h4>
                <div className="mt-1 text-sm text-ink/60">{tier.priceMonthly === 0 ? "Free forever" : `$${tier.priceMonthly}/mo · $${tier.priceAnnual}/yr`}</div>
                <p className="mt-2 max-w-md text-sm text-ink/65">{tier.best}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {ctx.plan === "free" ? (
                  <Link to="/plan-picker" className="rounded-full bg-ink px-4 py-2 text-sm text-cream">Upgrade to Pro</Link>
                ) : (
                  <Link to="/plan-picker" className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-ink/40">Change plan</Link>
                )}
                <button onClick={() => setTab("invoices")} className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-ink/40">View invoices</button>
              </div>
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="Tools tracked" value={`${ctx.allTools.length}${ctx.plan === "free" ? " / 3" : ""}`} hint={ctx.plan === "free" ? `${usagePct}% of free limit` : "Unlimited"} />
            <Stat label="This cycle" value={`$${ctx.plan === "free" ? "0.00" : tier.priceMonthly.toFixed(2)}`} hint={ctx.plan === "free" ? "No charge" : "Renews Jul 1"} />
            <Stat label="Saved with Exfluent" value="$1,284" hint="Lifetime" />
          </div>

          {ctx.plan === "free" && (
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h5 className="font-display text-xl">Unlock the full picture</h5>
                  <p className="mt-1 text-sm text-ink/60">Unlimited tools, ROI breakdown, public score profile.</p>
                </div>
                <Link to="/plan-picker" className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-cream">See plans <ArrowUpRight size={14} /></Link>
              </div>
            </Card>
          )}
        </>
      )}

      {tab === "compare" && (
        <Card className="!p-0 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-4 text-sm">
            <div className="hidden sm:block border-b border-border bg-muted/40 p-4 text-xs uppercase tracking-wider text-ink/55">Feature</div>
            {PLANS.map((p) => (
              <div key={p.id} className={"border-b border-border p-4 " + (p.id === ctx.plan ? "bg-coral/10" : "bg-muted/40")}>
                <div className="font-display text-xl">{p.name}</div>
                <div className="mt-0.5 text-xs text-ink/60">{p.priceMonthly === 0 ? "Free" : `$${p.priceMonthly}/mo`}</div>
              </div>
            ))}
            {[
              ["AI tools tracked", "Up to 3", "Unlimited", "Unlimited"],
              ["ROI breakdown", "Final number", "Full + 6mo", "Full + 6mo"],
              ["Optimizer recs", "1 / month", "Unlimited", "Unlimited + team"],
              ["Alerts channels", "Email", "Email · Push · Slack", "Email · Push · Slack"],
              ["Public stack profile", "—", "Yes", "Yes"],
              ["Watermark-free share", "—", "Yes", "Yes"],
              ["CSV / PDF reports", "—", "Yes", "Team-wide"],
              ["Team members", "1", "1", "Up to 10"],
              ["Per-project cost split", "—", "—", "Yes"],
              ["Shadow AI detection", "—", "—", "Yes"],
            ].map((row, i) => (
              <Compare key={i} cells={row} highlight={ctx.plan === "free" ? 1 : ctx.plan === "pro" ? 2 : 3} />
            ))}
          </div>
          <div className="flex flex-wrap justify-end gap-2 border-t border-border p-4">
            <Link to="/plan-picker" className="rounded-full bg-ink px-4 py-2 text-sm text-cream">Change plan</Link>
          </div>
        </Card>
      )}

      {tab === "payment" && (
        <Card>
          <h4 className="font-display text-2xl">Payment method</h4>
          <p className="mt-1 text-sm text-ink/60">Secured by Stripe. Cards are PCI-tokenized — we never see the number.</p>
          <div className="mt-5 rounded-2xl border border-border bg-gradient-to-br from-[oklch(0.94_0.06_55)] to-[oklch(0.92_0.07_305)] p-5">
            <div className="text-xs uppercase tracking-wider text-ink/55">Default card</div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="font-display text-2xl tracking-wider">•••• •••• •••• 4242</div>
                <div className="mt-1 text-xs text-ink/60">Visa · expires 04 / 28 · Ava Chen</div>
              </div>
              <CreditCard size={32} className="text-ink/60" />
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Input label="Card number" value="" onChange={() => {}} placeholder="1234 1234 1234 1234" />
            <Input label="Cardholder" value="" onChange={() => {}} placeholder="Full name" />
            <Input label="Expiry" value="" onChange={() => {}} placeholder="MM / YY" />
            <Input label="CVC" value="" onChange={() => {}} placeholder="123" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button onClick={() => ctx.flash("Card updated")} className="rounded-full bg-ink px-4 py-2 text-sm text-cream">Save card</button>
            <button onClick={() => ctx.flash("Stripe checkout opening…")} className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-ink/40">Manage in Stripe portal</button>
          </div>
        </Card>
      )}

      {tab === "invoices" && (
        <Card>
          <h4 className="font-display text-2xl">Invoice history</h4>
          <p className="mt-1 text-sm text-ink/60">Tax-ready PDFs for every cycle.</p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-ink/55">
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium">Invoice</th>
                  <th className="px-3 py-2 font-medium">Card</th>
                  <th className="px-3 py-2 font-medium">Amount</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {(ctx.plan === "free"
                  ? [{ d: "Jun 1, 2025", n: "INV-0001", a: 0, s: "Free tier" }]
                  : [
                      { d: "Jun 1, 2025", n: "INV-0214", a: tier.priceMonthly, s: "Paid" },
                      { d: "May 1, 2025", n: "INV-0188", a: tier.priceMonthly, s: "Paid" },
                      { d: "Apr 1, 2025", n: "INV-0161", a: tier.priceMonthly, s: "Paid" },
                      { d: "Mar 1, 2025", n: "INV-0134", a: tier.priceMonthly, s: "Paid" },
                    ]
                ).map((i) => (
                  <tr key={i.n} className="border-b border-border/60 last:border-0">
                    <td className="px-3 py-3">{i.d}</td>
                    <td className="px-3 py-3 text-ink/70">{i.n}</td>
                    <td className="px-3 py-3 text-ink/70 inline-flex items-center gap-2"><CreditCard size={12} /> Visa •• 4242</td>
                    <td className="px-3 py-3">${i.a.toFixed(2)}</td>
                    <td className="px-3 py-3"><span className="rounded-full bg-mint/30 px-2 py-0.5 text-xs">{i.s}</span></td>
                    <td className="px-3 py-3 text-right"><button onClick={() => ctx.flash(`${i.n}.pdf downloaded`)} className="text-ink/60 hover:text-ink"><DownloadIcon size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "cancel" && (
        <Card className="border-coral/30">
          <h4 className="font-display text-2xl">Cancel subscription</h4>
          <p className="mt-1 text-sm text-ink/60">{ctx.plan === "free" ? "You're on Free — nothing to cancel." : "We hate to see you go. Here's what you keep, and what we can do to help."}</p>
          {ctx.plan !== "free" && (
            <>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-background/60 p-4">
                  <div className="text-xs uppercase tracking-wider text-ink/55">You'll keep</div>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-mint shrink-0" /> Access to {tier.name} until Jul 1, 2025</li>
                    <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-mint shrink-0" /> All historic reports and exports</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-background/60 p-4">
                  <div className="text-xs uppercase tracking-wider text-ink/55">You'll lose</div>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    <li className="flex items-start gap-2"><X size={14} className="mt-0.5 text-coral shrink-0" /> Unlimited tool tracking</li>
                    <li className="flex items-start gap-2"><X size={14} className="mt-0.5 text-coral shrink-0" /> Public Exfluent Score profile</li>
                    <li className="flex items-start gap-2"><X size={14} className="mt-0.5 text-coral shrink-0" /> Slack and push alerts</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-mint/40 bg-mint/10 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-display text-xl">Stay on Pro for 50% off — 3 months</div>
                    <p className="mt-1 text-sm text-ink/65">A small thank-you for sticking around. One click, no calls.</p>
                  </div>
                  <button onClick={() => ctx.flash("Discount applied — next 3 cycles are $3.99")} className="rounded-full bg-ink px-4 py-2 text-sm text-cream">Accept offer</button>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button onClick={() => setTab("downgrade")} className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-ink/40">Downgrade to Free instead</button>
                <button onClick={() => ctx.flash("Cancellation scheduled for Jul 1")} className="rounded-full border border-coral/40 px-4 py-2 text-sm text-coral hover:bg-coral/10">Cancel anyway</button>
              </div>
            </>
          )}
        </Card>
      )}

      {tab === "downgrade" && (
        <Card>
          <h4 className="font-display text-2xl">Confirm downgrade</h4>
          <p className="mt-1 text-sm text-ink/60">Your plan changes immediately at the next renewal.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {PLANS.map((p) => (
              <button key={p.id} onClick={() => ctx.flash(`Scheduled downgrade to ${p.name}`)} className={"rounded-2xl border p-4 text-left transition-all hover:border-ink/40 " + (p.id === ctx.plan ? "border-ink/40 ring-1 ring-ink/10" : "border-border bg-card")}>
                <div className="font-display text-2xl">{p.name}</div>
                <div className="mt-1 text-xs text-ink/60">{p.priceMonthly === 0 ? "Free forever" : `$${p.priceMonthly}/mo`}</div>
                <p className="mt-2 text-xs text-ink/65">{p.best}</p>
                {p.id === ctx.plan && <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink/65"><Check size={12} /> Current</div>}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-border bg-background/60 p-4 text-sm">
            <div className="flex items-start gap-2"><ShieldAlert size={16} className="mt-0.5 text-coral shrink-0" /><div><strong className="font-medium">Heads-up:</strong> downgrading to Free caps your stack at 3 tools. The other tools stay archived for 90 days in case you upgrade back.</div></div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button onClick={() => ctx.flash("Downgrade confirmed — takes effect Jul 1")} className="rounded-full bg-ink px-4 py-2 text-sm text-cream">Confirm downgrade</button>
            <button onClick={() => setTab("overview")} className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-ink/40">Keep my plan</button>
          </div>
        </Card>
      )}
    </div>
  );
}
function Compare({ cells, highlight }: { cells: string[]; highlight: number }) {
  return (
    <>
      <div className="border-b border-border/60 bg-card/60 p-4 text-ink/75 sm:bg-transparent">{cells[0]}</div>
      {[1, 2, 3].map((idx) => (
        <div key={idx} className={"border-b border-border/60 p-4 text-ink/80 " + (idx === highlight ? "bg-coral/5" : "")}>
          {cells[idx] === "—" ? <span className="text-ink/40">—</span> : <span className="inline-flex items-center gap-1.5">{cells[idx] !== "—" && cells[idx]?.toLowerCase() === "yes" ? <Check size={14} className="text-coral" /> : null}{cells[idx]}</span>}
        </div>
      ))}
    </>
  );
}

/* ---- 14. Public Stack Profile (pro+) ---- */
function PublicProfileScreen({ ctx }: { ctx: AppCtx }) {
  const url = "exfluent.site/@ava";
  return (
    <div className="space-y-6">
      <Header title="Public stack profile" sub="Your stack page, shareable as a single link." action={
        <button onClick={() => ctx.flash(`Copied ${url}`)} className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-ink/40">Copy link</button>
      } />

      <Card>
        <div className="overflow-hidden rounded-3xl border border-border" style={{ background: "linear-gradient(160deg, oklch(0.94 0.06 55), oklch(0.92 0.07 305))" }}>
          <div className="p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full font-display text-xl" style={{ background: "oklch(0.92 0.08 55)" }}>A</span>
              <div>
                <div className="font-display text-2xl">Ava Chen</div>
                <div className="text-xs text-ink/60">{url}</div>
              </div>
              <span className="ml-auto chip border-ink/15 bg-card/80">Exfluent verified</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <Mini v="82" l="score" />
              <Mini v="$289" l="saved / mo" />
              <Mini v="12" l="AI tools" />
            </div>
            <div className="mt-6">
              <div className="text-xs uppercase tracking-wider text-ink/55">Top of stack</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {ctx.allTools.slice(0, 8).map((t) => (
                  <span key={t.id} className="rounded-full bg-card/80 px-3 py-1 text-xs">{t.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h4 className="text-sm font-medium">Page settings</h4>
        <div className="mt-3 space-y-3">
          <ToggleRow icon={<Sparkles size={14} />} label="Show monthly savings publicly" defaultOn />
          <ToggleRow icon={<Gauge size={14} />} label="Show Exfluent Score" defaultOn />
          <ToggleRow icon={<EyeOff size={14} />} label="Hide tool list (keep score only)" />
        </div>
      </Card>
    </div>
  );
}


/* ============================================================
 * TEAM SCREENS
 * ============================================================ */

function TeamDashboardScreen({ ctx }: { ctx: AppCtx }) {
  const total = ctx.members.reduce((s, m) => s + m.spend, 0);
  const avg = Math.round(ctx.members.reduce((s, m) => s + m.score, 0) / ctx.members.length);
  return (
    <div className="space-y-6">
      <Header title="Team dashboard" sub="Spend, efficiency and trends across your squad." />
      <div className="grid gap-4 sm:grid-cols-4">
        <Kpi label="Members" value={String(ctx.members.length)} icon={<Users size={14} />} tone="lavender" />
        <Kpi label="Total spend" value={`$${total}`} icon={<Wallet size={14} />} tone="peach" delta="−8% MoM" trendDown />
        <Kpi label="Avg score" value={String(avg)} icon={<Gauge size={14} />} tone="mint" />
        <Kpi label="Idle tools" value="11" icon={<AlertTriangle size={14} />} tone="rose" />
      </div>

      <Card>
        <h4 className="text-sm font-medium">Spend per member</h4>
        <div className="mt-4 h-56">
          <ResponsiveContainer>
            <BarChart data={ctx.members.map((m) => ({ name: m.name.split(" ")[0], spend: m.spend }))} margin={{ left: -16 }}>
              <CartesianGrid stroke="oklch(0.28 0.03 40 / 0.08)" vertical={false} />
              <XAxis dataKey="name" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="spend" radius={[8, 8, 4, 4]} fill="oklch(0.82 0.07 305)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h4 className="text-sm font-medium">Team spend trend</h4>
        <div className="mt-4 h-56">
          <ResponsiveContainer>
            <AreaChart data={[
              { m: "Jan", v: 1240 }, { m: "Feb", v: 1180 }, { m: "Mar", v: 1410 }, { m: "Apr", v: 1320 }, { m: "May", v: 1180 }, { m: "Jun", v: total },
            ]} margin={{ left: -16 }}>
              <defs>
                <linearGradient id="tg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.87 0.07 165)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.87 0.07 165)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(0.28 0.03 40 / 0.08)" vertical={false} />
              <XAxis dataKey="m" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="v" stroke="oklch(0.6 0.1 165)" fill="url(#tg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function TeamMembersScreen({ ctx }: { ctx: AppCtx }) {
  return (
    <div className="space-y-6">
      <Header title="Team members" sub={`${ctx.members.length} members · click any row for detail.`} action={
        <button onClick={() => ctx.setActive("team-invite")} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-cream"><UserPlus size={14} /> Invite</button>
      } />
      <Card className="!p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-ink/55">
              <th className="px-4 py-2 font-medium">Member</th>
              <th className="px-4 py-2 font-medium">Role</th>
              <th className="px-4 py-2 font-medium">Tools</th>
              <th className="px-4 py-2 font-medium">Spend</th>
              <th className="px-4 py-2 font-medium">Score</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {ctx.members.map((m) => (
              <tr key={m.id} className="cursor-pointer border-b border-border/60 last:border-0 hover:bg-muted/30" onClick={() => ctx.setActive("team-member-detail")}>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-full font-display text-sm" style={{ background: m.avatarTone }}>{m.name[0]}</span>
                    {m.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink/65">{m.role}</td>
                <td className="px-4 py-3">{m.tools}</td>
                <td className="px-4 py-3">${m.spend}</td>
                <td className="px-4 py-3">{m.score}</td>
                <td className="px-4 py-3 text-right text-ink/40"><ChevronRight size={14} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function TeamInviteScreen({ ctx }: { ctx: AppCtx }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  return (
    <div className="max-w-xl space-y-6">
      <Header title="Invite a teammate" sub="They'll get an email with a one-click join link." />
      <Card>
        <form onSubmit={(e) => { e.preventDefault(); ctx.flash(`Invited ${email} as ${role}`); setEmail(""); }} className="space-y-4">
          <Input label="Work email" value={email} onChange={setEmail} placeholder="alex@company.com" />
          <Select label="Role" value={role} onChange={setRole} options={["Admin", "Member", "Viewer"]} />
          <button type="submit" disabled={!email} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm text-cream disabled:opacity-40"><UserPlus size={14} /> Send invite</button>
        </form>
      </Card>
    </div>
  );
}

function TeamMemberDetailScreen({ ctx }: { ctx: AppCtx }) {
  const m = ctx.members[0];
  return (
    <div className="space-y-6">
      <Header title={`${m.name}`} sub={`${m.role} · ${m.tools} tools · score ${m.score}`} action={<button onClick={() => ctx.setActive("team-members")} className="text-sm text-ink/60 hover:text-ink">← All members</button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <Kpi label="Spend / mo" value={`$${m.spend}`} icon={<Wallet size={14} />} tone="peach" />
        <Kpi label="Tools" value={String(m.tools)} icon={<Briefcase size={14} />} tone="lavender" />
        <Kpi label="Score" value={String(m.score)} icon={<Gauge size={14} />} tone="mint" />
      </div>

      <Card>
        <h4 className="text-sm font-medium">Tool stack</h4>
        <ul className="mt-3 divide-y divide-border text-sm">
          {ctx.tools.slice(0, 6).map((t) => (
            <li key={t.id} className="flex items-center justify-between py-2">
              <span>{t.name}</span>
              <span className="text-ink/60">${t.cost}/mo · ROI {t.roi}%</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function TeamRolesScreen({ ctx }: { ctx: AppCtx }) {
  const roles: Array<{ name: "Admin" | "Member" | "Viewer"; perms: string[] }> = [
    { name: "Admin", perms: ["Invite & remove", "Edit billing", "Change roles", "Export reports"] },
    { name: "Member", perms: ["Add own tools", "View own reports", "Run optimizer"] },
    { name: "Viewer", perms: ["Read-only access"] },
  ];
  return (
    <div className="space-y-6">
      <Header title="Role manager" sub="Edit permissions for each tier." />
      <div className="grid gap-4 sm:grid-cols-3">
        {roles.map((r) => (
          <Card key={r.name}>
            <h4 className="font-display text-2xl">{r.name}</h4>
            <ul className="mt-3 space-y-1.5 text-sm">
              {r.perms.map((p) => <li key={p} className="flex items-center gap-2"><Check size={14} className="text-mint" /> {p}</li>)}
            </ul>
          </Card>
        ))}
      </div>

      <Card className="!p-0">
        <div className="px-4 py-3 text-sm font-medium">Assign roles</div>
        <table className="w-full text-sm">
          <tbody>
            {ctx.members.map((m) => (
              <tr key={m.id} className="border-t border-border">
                <td className="px-4 py-2">{m.name}</td>
                <td className="px-4 py-2 text-right">
                  <select defaultValue={m.role} onChange={(e) => ctx.flash(`${m.name} → ${e.target.value}`)} className="rounded-full border border-border bg-card px-3 py-1 text-xs">
                    <option>Admin</option><option>Member</option><option>Viewer</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function TeamProjectsScreen({ ctx }: { ctx: AppCtx }) {
  const [name, setName] = useState("");
  return (
    <div className="space-y-6">
      <Header title="Per-project AI cost" sub="Allocate AI spend to projects or clients." action={
        <form onSubmit={(e) => { e.preventDefault(); if (!name.trim()) return; ctx.setProjects([{ id: "p" + Date.now(), name, client: "—", toolIds: [], monthlyCost: 0 }, ...ctx.projects]); ctx.flash(`Project ${name} created`); setName(""); }} className="flex gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New project name" className="rounded-full border border-input bg-background px-3 py-2 text-sm outline-none" />
          <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-2 text-sm text-cream"><Plus size={14} /> Add</button>
        </form>
      } />
      <div className="grid gap-3 sm:grid-cols-2">
        {ctx.projects.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-display text-2xl">{p.name}</h4>
                <p className="text-xs text-ink/55">{p.client} · {p.toolIds.length} tools</p>
              </div>
              <button onClick={() => ctx.setActive("team-project-detail")} className="text-xs text-ink/60 hover:text-ink">Open →</button>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-4xl">${p.monthlyCost}</span><span className="text-xs text-ink/55">/mo</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TeamProjectDetailScreen({ ctx }: { ctx: AppCtx }) {
  const p = ctx.projects[0];
  const inProj = ctx.allTools.filter((t) => p.toolIds.includes(t.id));
  return (
    <div className="space-y-6">
      <Header title={p.name} sub={`${p.client} · client billing-ready`} action={
        <button onClick={() => ctx.flash("Project report downloaded")} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm"><DownloadIcon size={14} /> Export</button>
      } />

      <div className="grid gap-4 sm:grid-cols-3">
        <Kpi label="Monthly" value={`$${p.monthlyCost}`} icon={<Wallet size={14} />} tone="peach" />
        <Kpi label="Tools" value={String(inProj.length)} icon={<Briefcase size={14} />} tone="lavender" />
        <Kpi label="ROI" value="3.1×" icon={<TrendingUp size={14} />} tone="mint" />
      </div>

      <Card className="!p-0">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-xs text-ink/55"><th className="px-4 py-2">Tool</th><th className="px-4 py-2">Category</th><th className="px-4 py-2">Cost</th></tr></thead>
          <tbody>
            {inProj.map((t) => (
              <tr key={t.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3">{t.name}</td>
                <td className="px-4 py-3 text-ink/65">{t.category}</td>
                <td className="px-4 py-3">${t.cost}/mo</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function TeamOverlapScreen({ ctx }: { ctx: AppCtx }) {
  const dupes = [
    { tool: "ChatGPT", payers: ["Ava", "Diego", "Hira"], save: 40 },
    { tool: "Midjourney", payers: ["Hira", "Jorge"], save: 30 },
    { tool: "Notion AI", payers: ["Ava", "Maya"], save: 10 },
  ];
  return (
    <div className="space-y-6">
      <Header title="Team-wide overlap" sub="Multiple people paying individually for the same tool." />
      <div className="space-y-3">
        {dupes.map((d) => (
          <Card key={d.tool}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-2xl">{d.tool}</h4>
                <div className="mt-1 text-xs text-ink/55">{d.payers.join(", ")} are all paying individually</div>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl text-coral">−${d.save}</div>
                <div className="text-xs">/ month if consolidated</div>
              </div>
            </div>
            <div className="mt-4">
              <button onClick={() => ctx.flash(`Consolidating ${d.tool}…`)} className="rounded-full bg-ink px-4 py-2 text-xs text-cream">Consolidate to team license</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TeamShadowScreen({ ctx }: { ctx: AppCtx }) {
  const shadow = [
    { tool: "Replit AI", who: "Diego", spend: 25 },
    { tool: "Tome", who: "Hira", spend: 15 },
    { tool: "Gamma", who: "Jorge", spend: 10 },
  ];
  return (
    <div className="space-y-6">
      <Header title="Shadow AI detection" sub="AI tools on company cards that aren't admin-approved." />
      <Card>
        <ul className="divide-y divide-border text-sm">
          {shadow.map((s) => (
            <li key={s.tool} className="flex items-center justify-between py-3">
              <span className="inline-flex items-center gap-2"><ShieldAlert size={14} className="text-coral" /> {s.tool}</span>
              <span className="text-ink/55">used by {s.who}</span>
              <span>${s.spend}/mo</span>
              <div className="flex gap-2">
                <button onClick={() => ctx.flash(`${s.tool} approved`)} className="rounded-full border border-border px-3 py-1 text-xs">Approve</button>
                <button onClick={() => ctx.flash(`${s.tool} flagged for review`)} className="rounded-full bg-ink px-3 py-1 text-xs text-cream">Block</button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function TeamReportsScreen({ ctx }: { ctx: AppCtx }) {
  const list = [
    { n: "Full team spend", d: "All members · all tools" },
    { n: "Per-member usage", d: "Hours · ROI · score" },
    { n: "Per-project costs", d: "Client-billing-ready" },
    { n: "Executive summary", d: "One-page PDF for finance" },
  ];
  return (
    <div className="space-y-6">
      <Header title="Team reports" sub="CSV / PDF exports for finance review." />
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((r) => (
          <Card key={r.n}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display text-2xl">{r.n}</h4>
                <p className="mt-1 text-sm text-ink/60">{r.d}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => ctx.flash(`${r.n}.csv downloaded`)} className="rounded-full border border-border bg-card px-3 py-1 text-xs">CSV</button>
                <button onClick={() => ctx.flash(`${r.n}.pdf downloaded`)} className="rounded-full border border-border bg-card px-3 py-1 text-xs">PDF</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
