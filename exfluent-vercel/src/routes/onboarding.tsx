import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "@/components/auth/AuthShell";
import { Field, PrimaryButton } from "@/components/auth/FormField";
import { PLANS, setStoredPlan, type PlanId } from "@/lib/plans";

import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Camera,
  Check,
  Chrome,
  Download,
  Mail,
  Megaphone,
  Sparkles,
  Users,
  Globe,
  Search,
  Newspaper,
  AtSign,
  Wallet,
  Rocket,
  Repeat,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  Puzzle,
  Shield,
  Wand2,
  Zap,
  ChevronRight,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome — Exfluent onboarding" },
      { name: "description", content: "Tell us about you so we can tailor Exfluent." },
    ],
  }),
  component: Onboarding,
});

type Data = {
  name: string;
  username: string;
  hear: string;
  role: string;
  bring: string;
  plan: PlanId;
  importedTools: string[];
  extensionInstalled: boolean;
};

const heard = [
  { id: "google", label: "Google search", icon: Search },
  { id: "social", label: "Instagram / X / TikTok", icon: AtSign },
  { id: "friend", label: "From a friend", icon: Users },
  { id: "press", label: "Press / blog", icon: Newspaper },
  { id: "ad", label: "Online ad", icon: Megaphone },
  { id: "other", label: "Somewhere else", icon: Globe },
];

const roles = [
  { id: "creator", label: "Creator", desc: "I make content and want brand deals.", icon: Camera },
  { id: "brand", label: "Brand / DTC", desc: "I run a product or store.", icon: Sparkles },
  { id: "agency", label: "Agency", desc: "I run campaigns for clients.", icon: Briefcase },
  { id: "marketer", label: "In-house marketer", desc: "I lead growth at a company.", icon: Megaphone },
];

const bring = [
  { id: "trial", label: "Started a free trial elsewhere", icon: Rocket },
  { id: "overcharge", label: "Got overcharged on another tool", icon: Wallet },
  { id: "renewal", label: "Renewal is coming up", icon: Repeat },
  { id: "scale", label: "Want to scale creator campaigns", icon: TrendingUp },
  { id: "discover", label: "Just exploring — curious", icon: Sparkles },
];

const SUGGESTED_TOOLS = [
  "ChatGPT", "Claude", "Cursor", "Midjourney", "Notion AI", "Perplexity",
  "Copilot", "Runway", "ElevenLabs", "Suno", "Jasper", "Copy.ai",
];

const STEPS = [
  "You",
  "Source",
  "Role",
  "Reason",
  "Plan",
  "Connect",
  "Audit",
  "Extension",
] as const;

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step]);

  const [data, setData] = useState<Data>({
    name: "",
    username: "",
    hear: "",
    role: "",
    bring: "",
    plan: "pro",
    importedTools: [],
    extensionInstalled: false,
  });

  const canNext = useMemo(() => {
    if (step === 0) return !!data.name.trim() && !!data.username.trim();
    if (step === 1) return !!data.hear;
    if (step === 2) return !!data.role;
    if (step === 3) return !!data.bring;
    if (step === 4) return !!data.plan;
    if (step === 5) return data.importedTools.length > 0;
    if (step === 6) return true;
    if (step === 7) return data.extensionInstalled;
    return true;
  }, [step, data]);

  const next = () => {
    if (step === 4) setStoredPlan(data.plan);
    if (step === STEPS.length - 1) navigate({ to: "/app" });
    else setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display text-2xl">Exfluent</span>
        </div>
        <span className="text-xs text-muted-foreground">
          Step {step + 1} of {STEPS.length}
        </span>
      </header>

      <div className="mx-auto max-w-5xl px-6">
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div key={i} className={"h-1.5 flex-1 overflow-hidden rounded-full " + (i <= step ? "bg-ink" : "bg-muted")}>
              {i === step && (
                <div className="h-full w-full" style={{ background: "linear-gradient(90deg,#4B73FF,#FF66F4,#FE7B02)", animation: "shimmer 2s linear infinite" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <main className={"mx-auto px-6 py-10 sm:py-14 " + (step === 4 ? "max-w-6xl" : step === 5 || step === 6 || step === 7 ? "max-w-4xl" : "max-w-2xl")}>
        {step === 0 && (
          <Step kicker="A quick hello" title={<>What should we <em>call you?</em></>} sub="Your name appears on campaigns and creator outreach.">
            <Field label="Full name" placeholder="Ava Chen" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            <Field label="Username" hint="lowercase, no spaces" placeholder="avachen" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value.toLowerCase().replace(/\s+/g, "") })} right={<span className="text-sm text-muted-foreground">@</span>} />
          </Step>
        )}

        {step === 1 && (
          <Step kicker="Tell us" title={<>How did you <em>hear about us?</em></>} sub="Helps us know what's working — pick one.">
            <Grid>
              {heard.map((o) => (
                <OptionCard key={o.id} selected={data.hear === o.id} onClick={() => setData({ ...data, hear: o.id })} icon={<o.icon size={18} />} label={o.label} />
              ))}
            </Grid>
          </Step>
        )}

        {step === 2 && (
          <Step kicker="Your role" title={<>What <em>brings you</em> here?</>} sub="We'll tailor the dashboard, templates and creator pool for you.">
            <div className="grid gap-3 sm:grid-cols-2">
              {roles.map((r) => (
                <BigCard key={r.id} selected={data.role === r.id} onClick={() => setData({ ...data, role: r.id })} icon={<r.icon size={20} />} title={r.label} desc={r.desc} />
              ))}
            </div>
          </Step>
        )}

        {step === 3 && (
          <Step kicker="The why" title={<>What's <em>nudging</em> you to try Exfluent?</>} sub="Be honest — this changes what we show you first.">
            <div className="space-y-2.5">
              {bring.map((b) => (
                <RowCard key={b.id} selected={data.bring === b.id} onClick={() => setData({ ...data, bring: b.id })} icon={<b.icon size={18} />} label={b.label} />
              ))}
            </div>
          </Step>
        )}

        {step === 4 && (
          <Step kicker="Almost there" title={<>Pick a <em>plan</em> that fits</>} sub="You can preview each plan's full dashboard right after. Switch anytime.">
            <PlanPickerCards selected={data.plan} onSelect={(id) => {
              setData({ ...data, plan: id });
              setStoredPlan(id);
              setStep((s) => s + 1);
            }} />
          </Step>
        )}

        {step === 5 && (
          <Step kicker="Stack import" title={<>Let's <em>find your AI spend</em></>} sub="Scan Gmail receipts in one click, or add tools by hand. You can do both later.">
            <StackImport data={data} setData={setData} />
          </Step>
        )}

        {step === 6 && (
          <Step kicker="Your first audit" title={<>Here's what we <em>just found</em></>} sub="Snapshot from your import — a deeper audit runs once the extension is on.">
            <FirstAuditResult data={data} />
          </Step>
        )}

        {step === 7 && (
          <Step kicker="One more thing" title={<>Add the <em>browser extension</em></>} sub="It catches new AI sign-ups, free trials and price changes the second they happen.">
            <ExtensionInstall data={data} setData={setData} />
          </Step>
        )}

        <div className="mt-10 flex items-center justify-between">
          <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="w-48">
            <PrimaryButton type="button" onClick={next} disabled={!canNext} className={!canNext ? "opacity-40 pointer-events-none" : ""}>
              {step === STEPS.length - 1 ? "Open my dashboard" : step === 7 ? "Open my dashboard" : "Continue"}
              <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        </div>
      </main>

      <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
    </div>
  );
}

/* ============================================================
 * STEP COMPONENTS
 * ============================================================ */

function PlanPickerCards({ selected, onSelect }: { selected: PlanId; onSelect: (id: PlanId) => void }) {
  const [annual, setAnnual] = useState(true);
  const toneBg: Record<string, string> = {
    peach: "linear-gradient(160deg, oklch(0.94 0.06 55), oklch(0.99 0.02 70))",
    lavender: "linear-gradient(160deg, oklch(0.92 0.07 305), oklch(0.97 0.03 310))",
    mint: "linear-gradient(160deg, oklch(0.93 0.05 165), oklch(0.99 0.02 160))",
  };
  return (
    <div>
      <div className="mx-auto flex w-full justify-center">
        <div className="inline-flex rounded-full border border-border bg-card/70 p-1 backdrop-blur">
          <button type="button" onClick={() => setAnnual(false)} className={"rounded-full px-5 py-2 text-sm transition-all " + (!annual ? "bg-ink text-cream" : "text-muted-foreground hover:text-foreground")}>Monthly</button>
          <button type="button" onClick={() => setAnnual(true)} className={"rounded-full px-5 py-2 text-sm transition-all " + (annual ? "bg-ink text-cream" : "text-muted-foreground hover:text-foreground")}>Yearly · save 20%</button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {PLANS.map((t, i) => {
          const price = annual ? (t.priceAnnual ? +(t.priceAnnual / 12).toFixed(2) : 0) : t.priceMonthly;
          const isSel = selected === t.id;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col h-full text-left"
            >
              <div
                className={
                  "relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border p-7 transition-all hover:-translate-y-1 hover:shadow-[0_40px_70px_-30px_rgba(60,40,30,0.35)] " +
                  (isSel ? "border-ink/60 ring-2 ring-ink/15 -translate-y-1 shadow-[0_40px_70px_-30px_rgba(60,40,30,0.35)]" : t.featured ? "border-ink/30 ring-1 ring-ink/5" : "border-border")
                }
                style={{ background: toneBg[t.tone] }}
              >
                <div>
                  {t.featured && !isSel && (
                    <span className="chip absolute right-5 top-5 border-ink/20 bg-ink text-cream">
                      <Sparkles size={12} /> {t.tag}
                    </span>
                  )}
                  {isSel && (
                    <span className="chip absolute right-5 top-5 border-ink/20 bg-ink text-cream">
                      <Check size={12} /> Selected
                    </span>
                  )}

                  <h3 className="font-display text-3xl">{t.name}</h3>
                  <p className="mt-1 text-sm text-ink/70">{t.desc}</p>

                  <div className="mt-6 flex items-baseline gap-1 h-[68px] overflow-hidden relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={price}
                        initial={{ y: annual ? 18 : -18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: annual ? -18 : 18, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.34, 1.3, 0.64, 1] }}
                        className="flex items-baseline gap-1"
                      >
                        <span className="font-display text-6xl">${price}</span>
                        <span className="text-sm font-sans text-ink/60">/mo</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="min-h-[1.25rem] text-xs text-ink/60">
                    {annual && t.priceAnnual > 0 && (
                      <span>${t.priceAnnual}/year{t.annualSavePct ? ` · save ${t.annualSavePct}%` : ""}</span>
                    )}
                    {!annual && t.priceMonthly > 0 && <span>billed monthly</span>}
                  </div>

                  <div className="mt-5 rounded-xl bg-card/60 px-3 py-2 text-xs text-ink/70 backdrop-blur">
                    <span className="font-medium text-ink">Best for · </span>{t.best}
                  </div>

                  <ul className="mt-5 space-y-2.5 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check size={16} className="mt-0.5 shrink-0 text-coral" />
                        <span className="text-ink/80">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelect(t.id)}
                  className={"mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all " + (isSel || t.featured ? "bg-ink text-cream hover:opacity-95 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.3)]" : "border border-ink/20 bg-card/80 text-ink hover:border-ink/50")}
                >
                  {isSel ? "Selected" : `Choose ${t.name}`}
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">14-day money-back guarantee · cancel any time</p>
    </div>
  );
}

function StackImport({ data, setData }: { data: Data; setData: (d: Data) => void }) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [manual, setManual] = useState("");

  function runScan() {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      setData({ ...data, importedTools: Array.from(new Set([...data.importedTools, "ChatGPT", "Cursor", "Midjourney", "Notion AI", "Perplexity"])) });
    }, 1600);
  }

  function toggle(name: string) {
    const has = data.importedTools.includes(name);
    setData({ ...data, importedTools: has ? data.importedTools.filter((t) => t !== name) : [...data.importedTools, name] });
  }

  function addManual() {
    const n = manual.trim();
    if (!n) return;
    if (!data.importedTools.includes(n)) setData({ ...data, importedTools: [...data.importedTools, n] });
    setManual("");
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
      {/* Gmail scan */}
      <div className="rounded-3xl border border-border bg-card/70 p-6 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-coral/15 text-coral"><Mail size={18} /></span>
          <div>
            <h4 className="font-display text-xl">Scan Gmail for AI receipts</h4>
            <p className="text-xs text-ink/60">Read-only · we only look at subjects from Stripe, Paddle and known AI vendors.</p>
          </div>
        </div>

        <div className="mt-5 space-y-2 text-sm">
          <Bullet>Finds active subscriptions and trials</Bullet>
          <Bullet>Detects last-renewal dates and amounts</Bullet>
          <Bullet>Never reads message bodies</Bullet>
        </div>

        <button onClick={runScan} disabled={scanning || scanned} className={"mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all " + (scanned ? "bg-mint/30 text-ink" : "bg-ink text-cream hover:opacity-95 disabled:opacity-60")}>
          {scanning ? (<><Loader2 size={16} className="animate-spin" /> Scanning Gmail…</>) : scanned ? (<><Check size={16} /> Scan complete — 5 tools</>) : (<><Mail size={16} /> Connect Gmail & scan</>)}
        </button>

        <AnimatePresence>
          {scanning && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-1.5 overflow-hidden text-xs text-ink/60">
              <div className="flex items-center gap-2"><Loader2 size={12} className="animate-spin" /> Authorizing…</div>
              <div className="flex items-center gap-2"><Loader2 size={12} className="animate-spin" /> Reading last 90 days…</div>
              <div className="flex items-center gap-2"><Loader2 size={12} className="animate-spin" /> Matching vendor list…</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Manual add */}
      <div className="rounded-3xl border border-border bg-card/70 p-6 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-lavender/30 text-ink"><Wand2 size={18} /></span>
          <div>
            <h4 className="font-display text-xl">Add tools manually</h4>
            <p className="text-xs text-ink/60">Click a chip to add, or type your own.</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {SUGGESTED_TOOLS.map((name) => {
            const on = data.importedTools.includes(name);
            return (
              <button key={name} type="button" onClick={() => toggle(name)} className={"inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs transition-all " + (on ? "border-ink bg-ink text-cream" : "border-border bg-background hover:border-ink/40")}>
                {on && <Check size={11} />} {name}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex gap-2">
          <input value={manual} onChange={(e) => setManual(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addManual())} placeholder="Add a tool name…" className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:border-ink/40" />
          <button type="button" onClick={addManual} className="inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2 text-sm text-cream"><Plus size={14} /> Add</button>
        </div>

        <div className="mt-5 rounded-xl border border-border bg-background/60 p-3 text-xs text-ink/60">
          <span className="font-medium text-ink">{data.importedTools.length}</span> tool{data.importedTools.length === 1 ? "" : "s"} ready to import.
        </div>
      </div>
    </div>
  );
}

function FirstAuditResult({ data }: { data: Data }) {
  const tools = data.importedTools.length || 5;
  const monthlySpend = tools * 24;
  const waste = Math.round(monthlySpend * 0.22);
  const overlaps = Math.max(1, Math.floor(tools / 4));
  const roi = (2 + tools / 10).toFixed(1);

  const cards = [
    { l: "Tools found", v: String(tools), hint: data.importedTools.length ? "From your import" : "Estimated", icon: <Sparkles size={14} />, tone: "lavender" },
    { l: "Monthly spend", v: `$${monthlySpend}`, hint: "Across all active tools", icon: <Wallet size={14} />, tone: "peach" },
    { l: "Likely waste", v: `$${waste}`, hint: "Idle or unused last 14 days", icon: <TrendingDown size={14} />, tone: "rose" },
    { l: "Overlaps", v: String(overlaps), hint: "Tools doing the same job", icon: <Puzzle size={14} />, tone: "mint" },
    { l: "Est. ROI", v: `${roi}×`, hint: "Value vs spend", icon: <TrendingUp size={14} />, tone: "lavender" },
    { l: "You could save", v: `$${waste * 12}/yr`, hint: "If you act this month", icon: <PiggyBank size={14} />, tone: "mint" },
  ];

  const toneBg: Record<string, string> = {
    peach: "linear-gradient(135deg, oklch(0.93 0.07 55), oklch(0.97 0.03 60))",
    mint: "linear-gradient(135deg, oklch(0.93 0.05 165), oklch(0.97 0.03 160))",
    lavender: "linear-gradient(135deg, oklch(0.91 0.06 305), oklch(0.97 0.03 310))",
    rose: "linear-gradient(135deg, oklch(0.92 0.06 10), oklch(0.97 0.03 20))",
  };

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div key={c.l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-2xl border border-border p-5" style={{ background: toneBg[c.tone] }}>
            <div className="flex items-center justify-between text-xs text-ink/70">
              <span className="inline-flex items-center gap-1.5">{c.icon} {c.l}</span>
            </div>
            <div className="mt-2 font-display text-4xl">{c.v}</div>
            <div className="mt-1 text-xs text-ink/60">{c.hint}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-card/70 p-5">
        <h4 className="font-display text-xl">Top opportunity</h4>
        <p className="mt-1 text-sm text-ink/65">Two writing tools overlap — consolidate to save <strong>${Math.round(waste * 0.6)}/mo</strong>. The Stack Optimizer will walk you through it.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="chip border-ink/15 bg-card/80"><Shield size={12} /> Safe to consolidate</span>
          <span className="chip border-ink/15 bg-card/80"><Zap size={12} /> 1-click action inside the app</span>
        </div>
      </div>
    </div>
  );
}

function ExtensionInstall({ data, setData }: { data: Data; setData: (d: Data) => void }) {
  const [installing, setInstalling] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!installing) return;
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          setInstalling(false);
          setData({ ...data, extensionInstalled: true });
          return 100;
        }
        return p + Math.random() * 9 + 3;
      });
    }, 180);
    return () => clearInterval(t);
  }, [installing]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-3xl border border-border bg-card/70 p-7 backdrop-blur">
        <span className="chip border-ink/15 bg-card/80"><Puzzle size={12} /> Recommended · 92% of users install</span>
        <h4 className="mt-3 font-display text-3xl">Catch every new AI sign-up</h4>
        <p className="mt-2 text-sm text-ink/65">The extension lives quietly in your browser. It flags trials, free upgrades and price changes the moment they appear on a checkout page.</p>

        <div className="mt-6 space-y-2.5 text-sm">
          <Bullet>Works in Chrome, Firefox, Edge and Brave</Bullet>
          <Bullet>Reads only AI vendor checkout pages</Bullet>
          <Bullet>No tracking, no ads, no data sold</Bullet>
        </div>

        {!data.extensionInstalled ? (
          <button onClick={() => setInstalling(true)} disabled={installing} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-medium text-cream transition-all disabled:opacity-60">
            {installing ? (<><Loader2 size={16} className="animate-spin" /> Installing… {Math.min(100, Math.round(progress))}%</>) : (<><Download size={16} /> Add to browser</>)}
          </button>
        ) : (
          <div className="mt-7 rounded-2xl border border-mint/40 bg-mint/15 p-4 text-sm">
            <div className="flex items-center gap-2 font-medium"><Check size={16} /> Extension installed</div>
            <div className="mt-1 text-xs text-ink/65">It's already tracking — open your dashboard to see live updates.</div>
          </div>
        )}

        {installing && (
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-ink transition-all" style={{ width: `${Math.min(100, progress)}%` }} />
          </div>
        )}

        <div className="mt-5 flex items-center justify-between text-xs text-ink/55">
          <Link to="/download" className="inline-flex items-center gap-1 hover:text-foreground">Full install guide <ChevronRight size={12} /></Link>
          <button onClick={() => setData({ ...data, extensionInstalled: true })} className="hover:text-foreground">Skip for now</button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-border p-7" style={{ background: "linear-gradient(160deg, oklch(0.94 0.06 55), oklch(0.92 0.07 305))" }}>
        <div className="rounded-2xl border border-ink/10 bg-card/80 p-4 shadow-[0_20px_40px_-25px_rgba(60,40,30,0.4)]">
          <div className="flex items-center gap-2 text-xs text-ink/60"><Chrome size={14} /> Chrome · pinned</div>
          <div className="mt-3 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-coral/15 text-coral"><Sparkles size={16} /></span>
            <div className="text-sm">
              <div className="font-medium">New AI tool detected</div>
              <div className="text-xs text-ink/60">midjourney.com · $30/mo trial started</div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="rounded-full bg-ink px-3 py-1.5 text-xs text-cream">Track it</button>
            <button className="rounded-full border border-border bg-card px-3 py-1.5 text-xs">Ignore</button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-ink/10 bg-card/80 p-4">
          <div className="flex items-center gap-2 text-xs text-ink/60"><Zap size={14} /> Smart suggestion</div>
          <p className="mt-2 text-sm">Looks like you already pay for <strong>Runway</strong>. Worth keeping both?</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * SHARED UI
 * ============================================================ */

function Step({ kicker, title, sub, children }: { kicker: string; title: React.ReactNode; sub: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="chip">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
        {kicker}
      </span>
      <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl">{title}</h1>
      <p className="mt-3 max-w-lg text-muted-foreground">{sub}</p>
      <div className="mt-8 space-y-4">{children}</div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-2.5 sm:grid-cols-2">{children}</div>;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm text-ink/75">
      <Check size={14} className="mt-0.5 shrink-0 text-coral" /> {children}
    </div>
  );
}

function OptionCard({ selected, onClick, icon, label }: { selected: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button type="button" onClick={onClick} className={"flex items-center gap-3 rounded-xl border bg-card px-4 py-3.5 text-left text-sm transition-all " + (selected ? "border-ink shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]" : "border-input hover:border-ink/40")}>
      <span className={"inline-flex size-9 items-center justify-center rounded-lg " + (selected ? "bg-ink text-cream" : "bg-muted text-foreground")}>{icon}</span>
      <span className="flex-1 font-medium">{label}</span>
      {selected && <Check size={16} />}
    </button>
  );
}

function BigCard({ selected, onClick, icon, title, desc }: { selected: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <button type="button" onClick={onClick} className={"rounded-2xl border bg-card p-5 text-left transition-all " + (selected ? "border-ink shadow-[0_20px_50px_-25px_rgba(0,0,0,0.3)] -translate-y-0.5" : "border-input hover:border-ink/40")}>
      <span className={"inline-flex size-10 items-center justify-center rounded-xl " + (selected ? "bg-ink text-cream" : "bg-muted text-foreground")}>{icon}</span>
      <div className="mt-4 font-display text-2xl">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </button>
  );
}

function RowCard({ selected, onClick, icon, label }: { selected: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button type="button" onClick={onClick} className={"flex w-full items-center gap-4 rounded-xl border bg-card px-4 py-4 text-left transition-all " + (selected ? "border-ink" : "border-input hover:border-ink/40")}>
      <span className={"inline-flex size-9 items-center justify-center rounded-lg " + (selected ? "bg-ink text-cream" : "bg-muted text-foreground")}>{icon}</span>
      <span className="flex-1 text-sm font-medium">{label}</span>
      <span className={"inline-flex size-5 items-center justify-center rounded-full border " + (selected ? "bg-ink text-cream border-ink" : "border-input")}>
        {selected && <Check size={12} />}
      </span>
    </button>
  );
}
