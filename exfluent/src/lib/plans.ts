export type PlanId = "free" | "pro" | "team";

export interface PlanTier {
  id: PlanId;
  name: string;
  emoji: string;
  tag: string;
  priceMonthly: number;
  priceAnnual: number; // yearly total
  annualSavePct?: number;
  desc: string;
  tone: "peach" | "lavender" | "mint";
  featured?: boolean;
  features: string[];
  cta: string;
}

export const PLANS: PlanTier[] = [
  {
    id: "free",
    name: "Free",
    emoji: "🆓",
    tag: "Start the audit",
    priceMonthly: 0,
    priceAnnual: 0,
    desc: "Find waste in 60 seconds.",
    tone: "peach",
    cta: "Start free",
    features: [
      "3 AI tools maximum",
      "Browser extension (Chrome / Firefox / Edge / Brave)",
      "Gmail auto-detection",
      "Basic dashboard",
      "Basic reports",
      "Share to Twitter / LinkedIn with Exfluent watermark",
      "ROI Calculator — final number only, no breakdown",
      "Stack Optimizer — 1 recommendation per month",
      "Trial & idle alerts via email only",
      "Overlap detection — flag only, no replacement suggestions",
      "1 user",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    emoji: "⚡",
    tag: "Most popular",
    priceMonthly: 7.99,
    priceAnnual: 59,
    annualSavePct: 38,
    desc: "For creators & solo operators.",
    tone: "lavender",
    featured: true,
    cta: "Go Pro",
    features: [
      "Everything in Free",
      "Unlimited AI tools",
      "Full ROI Calculator with complete breakdown + 6-month history",
      "Stack Optimizer — unlimited recommendations with auto-refresh",
      "Overlap detection with exact replacement suggestions",
      "Trial & idle alerts via email, push & Slack",
      "Enhanced Gmail auto-detection",
      "Advanced reports exportable as CSV & PDF",
      "Exfluent Score with public stack profile",
      "Share report — clean card, no watermark",
      "1 user",
    ],
  },
  {
    id: "team",
    name: "Team",
    emoji: "👥",
    tag: "For squads",
    priceMonthly: 19.99,
    priceAnnual: 149,
    annualSavePct: 37,
    desc: "Up to 10 members, full admin.",
    tone: "mint",
    cta: "Start a team",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Full team dashboard with overview",
      "Per-member usage breakdown",
      "Admin controls — invite, remove, assign roles",
      "Role manager — Admin, Member, Viewer tiers",
      "Per-project AI cost allocation",
      "Team-wide overlap detection",
      "Shadow AI detection",
      "Exportable team reports as CSV & PDF",
      "Team billing management",
    ],
  },
];

export interface ScreenDef {
  id: string;
  label: string;
  group: string;
  proOnly?: boolean;
  teamOnly?: boolean;
}

// All screens used across plans. Free shows only its set; Pro adds; Team adds team-only.
export const SCREENS: ScreenDef[] = [
  // shared / free baseline
  { id: "home", label: "Dashboard", group: "Overview" },
  { id: "tools", label: "My AI Tools", group: "Overview" },
  { id: "add", label: "Add / Edit Tool", group: "Overview" },
  { id: "usage", label: "Usage Overview", group: "Insights" },
  { id: "roi", label: "ROI Calculator", group: "Insights" },
  { id: "optimizer", label: "Stack Optimizer", group: "Insights" },
  { id: "overlap", label: "Overlap Detection", group: "Insights" },
  { id: "alerts", label: "Alerts Center", group: "Insights" },
  { id: "share", label: "Share Report", group: "Reports" },
  // pro-only
  { id: "score", label: "Exfluent Score & Profile", group: "Reports", proOnly: true },
  { id: "reports", label: "Advanced Reports", group: "Reports", proOnly: true },
  // shared bottom
  { id: "settings", label: "Settings", group: "Account" },
  { id: "billing", label: "Billing", group: "Account" },
  // team-only
  { id: "team-dashboard", label: "Team Dashboard", group: "Team", teamOnly: true },
  { id: "team-members", label: "Team Members", group: "Team", teamOnly: true },
  { id: "team-invite", label: "Invite Member", group: "Team", teamOnly: true },
  { id: "team-member-detail", label: "Member Detail", group: "Team", teamOnly: true },
  { id: "team-roles", label: "Role Manager", group: "Team", teamOnly: true },
  { id: "team-projects", label: "Project Cost Allocation", group: "Team", teamOnly: true },
  { id: "team-project-detail", label: "Project Detail", group: "Team", teamOnly: true },
  { id: "team-overlap", label: "Team Overlap", group: "Team", teamOnly: true },
  { id: "team-shadow", label: "Shadow AI Detection", group: "Team", teamOnly: true },
  { id: "team-reports", label: "Team Reports", group: "Team", teamOnly: true },
];

export function screensForPlan(plan: PlanId): ScreenDef[] {
  return SCREENS.filter((s) => {
    if (s.teamOnly) return plan === "team";
    if (s.proOnly) return plan === "pro" || plan === "team";
    return true;
  });
}

export function getStoredPlan(): PlanId {
  if (typeof window === "undefined") return "free";
  return (window.localStorage.getItem("exfluent.plan") as PlanId) || "free";
}
export function setStoredPlan(p: PlanId) {
  if (typeof window !== "undefined") window.localStorage.setItem("exfluent.plan", p);
}
