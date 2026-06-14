import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/auth/AuthShell";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  BellRing,
  Check,
  ChevronDown,
  Gauge,
  LayoutDashboard,
  LineChart,
  Mail,
  PiggyBank,
  Radar,
  Share2,
  Shield,
  Sparkles,
  Star,
  Users,
  Wand2,
} from "lucide-react";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { HeroDashboardPreview } from "@/components/landing/HeroDashboardPreview";
import { HowItWorksTimeline } from "@/components/landing/HowItWorksTimeline";
import { ProblemVisuals } from "@/components/landing/ProblemVisuals";
import { PricingCards } from "@/components/landing/PricingCards";
import { Orb, Parallax, Reveal } from "@/components/landing/Floaty";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Exfluent — The calm way to manage every AI subscription" },
      {
        name: "description",
        content:
          "Track every AI tool, see real ROI, kill overlap, and save $100+/month — all from one warm, beautiful dashboard.",
      },
      { property: "og:title", content: "Exfluent — Manage every AI subscription" },
      {
        property: "og:description",
        content:
          "One soft, human dashboard for every AI subscription. Save $100+/month with zero spreadsheets.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <FloatingNav />
      <Hero />
      <LogoBar />
      <Problem />
      <DashboardSection />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <Faq />
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating nav                                                      */
/* ------------------------------------------------------------------ */
function FloatingNav() {
  const { scrollY } = useScroll();
  const padding = useTransform(scrollY, [0, 200], ["1.25rem", "0.5rem"]);
  const width = useTransform(scrollY, [0, 200], ["95%", "92%"]);
  const bg = useTransform(
    scrollY,
    [0, 200],
    ["color-mix(in oklab, var(--card) 45%, transparent)", "color-mix(in oklab, var(--card) 85%, transparent)"],
  );

  return (
    <motion.div
      style={{ paddingTop: padding, paddingBottom: padding }}
      className="sticky top-0 z-50 flex justify-center w-full"
    >
      <motion.nav
        style={{ width, background: bg }}
        className="mx-auto flex max-w-6xl items-center justify-between border border-border/60 px-5 py-3 shadow-[0_18px_50px_-30px_rgba(60,40,30,0.25)] backdrop-blur-xl transition-all rounded-full"
      >
        <Link to="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display text-2xl">Exfluent</span>
        </Link>
        <div className="hidden items-center gap-7 text-sm font-medium text-ink/70 md:flex">
          <a href="#problem" className="hover:text-coral transition-colors">Problem</a>
          <a href="#how" className="hover:text-coral transition-colors">How it works</a>
          <a href="#features" className="hover:text-coral transition-colors">Features</a>
          <a href="#pricing" className="hover:text-coral transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-coral transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/auth/signin" className="rounded-full px-4 py-2 text-sm font-medium text-ink/80 hover:text-ink hover:bg-ink/5 transition-all">
            Sign in
          </Link>
          <Link
            to="/auth/signup"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2 text-sm font-medium text-cream hover:bg-coral hover:shadow-[0_8px_20px_-8px_rgba(254,123,2,0.5)] transition-all"
          >
            Start free
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </motion.nav>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scaleArt = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative px-6 pt-12 pb-24 sm:pt-20">
      <Orb className="-left-32 top-10" color="oklch(0.86 0.085 55)" size={420} />
      <Orb className="right-[-10rem] top-32" color="oklch(0.82 0.07 305)" size={460} delay={0.2} />
      <Orb className="left-1/3 top-[28rem]" color="oklch(0.87 0.07 165)" size={320} delay={0.4} />

      <motion.div style={{ y: yTitle }} className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            New · AI spend audit in 60 seconds
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-6xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            The calm way to run <br />
            every <em className="text-coral">AI subscription.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-7 max-w-2xl text-lg sm:text-xl text-ink/80 leading-relaxed">
            Track tools, watch usage, kill overlap, prove ROI. Exfluent quietly saves
            the average user <span className="font-semibold text-ink">$100+/month</span> — for less than $8.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/auth/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_rgba(60,40,30,0.6)]"
            >
              Run my free audit
              <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3.5 text-sm font-medium backdrop-blur hover:border-ink/40"
            >
              See how it works
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Free plan forever · No card required · 12,400+ creators
          </p>
        </Reveal>
      </motion.div>

      {/* Floating soft 3D-ish cards around hero */}
      <motion.div style={{ scale: scaleArt }} className="relative mx-auto mt-20 max-w-6xl">
        <Parallax speed={40} className="absolute -left-2 -top-10 hidden lg:block">
          <FloatingCard tone="peach" icon={<PiggyBank size={18} />} title="Saved this month" value="$289" />
        </Parallax>
        <Parallax speed={-30} className="absolute -right-4 top-4 hidden lg:block">
          <FloatingCard tone="lavender" icon={<Gauge size={18} />} title="Exfluent Score" value="82" />
        </Parallax>
        <Parallax speed={60} className="absolute -bottom-10 left-1/3 hidden lg:block">
          <FloatingCard tone="mint" icon={<BellRing size={18} />} title="2 idle tools flagged" />
        </Parallax>
        <HeroDashboardPreview />
      </motion.div>

    </section>
  );
}

function FloatingCard({
  tone,
  icon,
  title,
  value,
}: {
  tone: "peach" | "lavender" | "mint";
  icon: React.ReactNode;
  title: string;
  value?: string;
}) {
  const bg: Record<string, string> = {
    peach: "linear-gradient(135deg, oklch(0.92 0.08 55), oklch(0.97 0.04 70))",
    lavender: "linear-gradient(135deg, oklch(0.9 0.07 305), oklch(0.97 0.03 310))",
    mint: "linear-gradient(135deg, oklch(0.91 0.06 165), oklch(0.97 0.03 160))",
  };
  return (
    <div
      className="animate-float rounded-2xl border border-border p-4 shadow-[0_30px_60px_-30px_rgba(60,40,30,0.35)] backdrop-blur"
      style={{ background: bg[tone], minWidth: 200 }}
    >
      <div className="flex items-center gap-2 text-xs text-ink/70">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-card/80">{icon}</span>
        {title}
      </div>
      {value && <div className="mt-1 font-display text-3xl">{value}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Logo bar                                                          */
/* ------------------------------------------------------------------ */
function LogoBar() {
  const logos = [
    "ChatGPT", "Claude", "Gemini", "Midjourney", "Cursor", "Runway",
    "Perplexity", "ElevenLabs", "Suno", "Jasper", "Notion AI", "Copilot",
  ];
  return (
    <section className="relative border-y border-border/60 bg-card/40 py-10 backdrop-blur">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
        Tracks every tool you already pay for
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <Marquee items={logos} />
      </div>
      <style>{`
        @keyframes exf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}

function Marquee({ items }: { items: string[] }) {
  return (
    <div className="flex w-max gap-12 whitespace-nowrap" style={{ animation: "exf-marquee 40s linear infinite" }}>
      {[...items, ...items].map((l, i) => (
        <span key={i} className="font-display text-3xl text-ink/40">{l}</span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Problem                                                           */
/* ------------------------------------------------------------------ */
function Problem() {
  const stats = [
    { n: "30–50%", l: "of AI spend is wasted on tools you forgot about" },
    { n: "$1,200", l: "average yearly waste, per person" },
    { n: "67%", l: "pay twice for the same feature across tools" },
    { n: "$10k+", l: "teams overspend with zero visibility" },
  ];
  return (
    <section id="problem" className="relative px-6 py-28">
      <Orb className="-left-24 top-32" color="oklch(0.9 0.08 20)" size={360} />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="chip mx-auto block w-fit">The problem</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-center font-display text-5xl leading-tight sm:text-6xl">
            Your AI stack is leaking <em className="text-coral">money</em> — quietly.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-center font-display text-xl sm:text-2xl text-ink/80 leading-relaxed italic">
            Trials renew. Duplicates pile up. Nobody opens that $49 tool anymore.
            Exfluent finds every dollar — without spreadsheets or guilt.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="soft-card h-full p-6">
                <div className="font-display text-5xl text-coral">{s.n}</div>
                <p className="mt-3 text-sm text-muted-foreground">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <ProblemVisuals />
      </div>
    </section>
  );
}


/* ------------------------------------------------------------------ */
/*  Dashboard section                                                 */
/* ------------------------------------------------------------------ */
function DashboardSection() {
  return (
    <section className="relative px-6 py-28">
      <Orb className="right-[-8rem] top-10" color="oklch(0.85 0.08 305)" size={400} />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="chip mx-auto block w-fit">Your command center</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-center font-display text-5xl leading-tight sm:text-6xl">
            One warm dashboard. <em className="text-lavender">Total clarity.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-center font-display text-xl sm:text-2xl text-ink/80 leading-relaxed italic">
            Spend, savings, ROI, overlap, idle alerts and the Exfluent Score — all
            in one place that finally feels human.
          </p>
        </Reveal>
        <div className="mt-14">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How it works                                                      */
/* ------------------------------------------------------------------ */
function HowItWorks() {
  const steps = [
    {
      icon: <Mail size={20} />,
      title: "Connect or import",
      body: "Scan Gmail receipts in one tap, or add tools manually. Read-only, zero-knowledge.",
      tone: "peach",
    },
    {
      icon: <Radar size={20} />,
      title: "We watch usage, not you",
      body: "The extension tracks AI domains and session time only. Never prompts, keystrokes or content.",
      tone: "lavender",
    },
    {
      icon: <Wand2 size={20} />,
      title: "Get a calm action plan",
      body: "Cancel, pause, switch, keep — Exfluent tells you why and how much you save.",
      tone: "mint",
    },
    {
      icon: <Share2 size={20} />,
      title: "Prove the ROI",
      body: "Share clean reports with your boss or client. Watch your score climb every week.",
      tone: "rose",
    },
  ];

  return (
    <section id="how" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="chip mx-auto block w-fit">How it works</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-center font-display text-5xl leading-tight sm:text-6xl">
            Four soft steps. <em className="text-mint">Big savings.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-center font-display text-xl sm:text-2xl text-ink/80 leading-relaxed italic">
            Four soft steps. We walk you down a calm timeline — text on one side, the action playing out on the other.
          </p>
        </Reveal>
        <HowItWorksTimeline />
      </div>
    </section>
  );
}


function StepCard({
  idx,
  icon,
  title,
  body,
  tone,
}: {
  idx: number;
  icon: React.ReactNode;
  title: string;
  body: string;
  tone: string;
}) {
  const bg: Record<string, string> = {
    peach: "linear-gradient(160deg, oklch(0.94 0.06 55), oklch(0.99 0.02 70))",
    lavender: "linear-gradient(160deg, oklch(0.93 0.05 305), oklch(0.99 0.02 310))",
    mint: "linear-gradient(160deg, oklch(0.93 0.05 165), oklch(0.99 0.02 160))",
    rose: "linear-gradient(160deg, oklch(0.94 0.05 10), oklch(0.99 0.02 20))",
  };
  return (
    <div
      className="group relative h-full overflow-hidden rounded-3xl border border-border p-6 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(60,40,30,0.35)]"
      style={{ background: bg[tone] }}
    >
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-card/80 text-ink shadow-sm">
          {icon}
        </span>
        <span className="font-display text-4xl text-ink/30">0{idx}</span>
      </div>
      <h3 className="mt-6 font-display text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-ink/70">{body}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Features bento                                                    */
/* ------------------------------------------------------------------ */
function Features() {
  return (
    <section id="features" className="relative px-6 py-28">
      <Orb className="left-1/2 top-20 -translate-x-1/2" color="oklch(0.88 0.07 95)" size={420} />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="chip mx-auto block w-fit">Everything you need</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-center font-display text-5xl leading-tight sm:text-6xl">
            Built for humans. <em className="text-rose">Loved by finance.</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <Bento className="lg:col-span-2" tone="peach" icon={<LayoutDashboard size={18} />} title="The dashboard you'll actually open" body="Spend, savings, ROI and overlap — gentle on the eyes, ruthless on waste.">
            <MiniBarsArt />
          </Bento>
          <Bento className="lg:col-span-1" tone="lavender" icon={<LineChart size={18} />} title="ROI Calculator" body="Hours saved × your rate − tool cost. Per tool, per month, per year.">
            <MiniLineArt />
          </Bento>
          <Bento className="lg:col-span-1" tone="mint" icon={<Wand2 size={18} />} title="Stack Optimizer" body="Cancel, pause, switch — with reasoning and exact savings.">
            <OptimizerArt />
          </Bento>
          <Bento className="lg:col-span-1" tone="rose" icon={<Radar size={18} />} title="Overlap detection" body="Spot duplicates instantly across all accounts.">
            <OverlapArt />
          </Bento>
          <Bento className="lg:col-span-1" tone="peach" icon={<BellRing size={18} />} title="Smart alerts" body="Trials, renewals, idle tools, overspend forecast.">
            <AlertsArt />
          </Bento>
          <Bento className="lg:col-span-1" tone="lavender" icon={<Users size={18} />} title="Team controls" body="Roles, project allocation, shadow-AI detection.">
            <TeamArt />
          </Bento>
          <Bento className="lg:col-span-1" tone="mint" icon={<Shield size={18} />} title="Zero-knowledge" body="We never read prompts, keystrokes or clipboards. Ever.">
            <ShieldArt />
          </Bento>
          <Bento className="lg:col-span-1" tone="butter" icon={<Share2 size={18} />} title="Exfluent Score" body="0–100 stack-health rating. Shareable, addictive.">
            <ScoreArt />
          </Bento>
        </div>
      </div>
    </section>
  );
}

function Bento({
  className = "",
  tone,
  icon,
  title,
  body,
  children,
}: {
  className?: string;
  tone: "peach" | "lavender" | "mint" | "rose" | "butter";
  icon: React.ReactNode;
  title: string;
  body?: string;
  children?: React.ReactNode;
}) {
  const bg: Record<string, string> = {
    peach: "linear-gradient(160deg, oklch(0.94 0.06 55), oklch(0.99 0.02 70))",
    lavender: "linear-gradient(160deg, oklch(0.93 0.05 305), oklch(0.99 0.02 310))",
    mint: "linear-gradient(160deg, oklch(0.93 0.05 165), oklch(0.99 0.02 160))",
    rose: "linear-gradient(160deg, oklch(0.94 0.05 10), oklch(0.99 0.02 20))",
    butter: "linear-gradient(160deg, oklch(0.95 0.07 95), oklch(0.99 0.02 80))",
  };
  return (
    <Reveal className={className}>
      <div
        className="group relative h-full overflow-hidden rounded-3xl border border-border p-6 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(60,40,30,0.3)]"
        style={{ background: bg[tone] }}
      >
        <div className="flex items-center gap-2 text-xs text-ink/70">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-card/80">{icon}</span>
          <span className="font-medium">{title}</span>
        </div>
        {body && <p className="mt-4 max-w-xs text-sm text-ink/70">{body}</p>}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </Reveal>
  );
}

function MiniBarsArt() {
  const heights = [40, 70, 55, 90, 65, 80, 50];
  return (
    <div className="flex items-end gap-2 pt-4">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="w-6 origin-bottom rounded-t-lg"
          style={{
            height: h,
            background: "linear-gradient(180deg, oklch(0.78 0.13 30), oklch(0.86 0.085 55))",
          }}
        />
      ))}
    </div>
  );
}

function MiniLineArt() {
  return (
    <svg viewBox="0 0 220 80" className="mt-4 w-full">
      <defs>
        <linearGradient id="l1" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.82 0.07 305)" />
          <stop offset="1" stopColor="oklch(0.78 0.13 30)" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 60 Q40 20, 70 40 T140 30 T220 10"
        fill="none"
        stroke="url(#l1)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
    </svg>
  );
}

function OptimizerArt() {
  const items = [
    { l: "Cancel Jasper", v: "−$49", c: "oklch(0.86 0.085 30)" },
    { l: "Pause Midjourney", v: "−$30", c: "oklch(0.92 0.07 55)" },
    { l: "Switch Notion AI", v: "−$10", c: "oklch(0.9 0.07 305)" },
  ];
  return (
    <ul className="space-y-1.5 mt-2">
      {items.map((t, i) => (
        <motion.li
          key={t.l}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center justify-between rounded-xl bg-card/80 px-3 py-2 text-xs"
        >
          <span>{t.l}</span>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: t.c }}>
            {t.v}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

function OverlapArt() {
  return (
    <div className="mt-2 grid grid-cols-2 items-center gap-2 text-center text-[11px]">
      <div className="rounded-xl bg-card/80 p-2">Notion AI</div>
      <div className="rounded-xl bg-card/80 p-2">ChatGPT</div>
      <div className="col-span-2 text-center text-[11px] text-ink/60">⇄ same job</div>
    </div>
  );
}

function AlertsArt() {
  const a = [
    { l: "Trial ends · Runway", h: "3d" },
    { l: "Idle · Midjourney", h: "14d" },
    { l: "Renews · ChatGPT", h: "7d" },
  ];
  return (
    <ul className="space-y-1.5 mt-2">
      {a.map((x, i) => (
        <motion.li
          key={x.l}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center justify-between rounded-xl bg-card/80 px-3 py-1.5 text-xs"
        >
          <span>{x.l}</span>
          <span className="text-[10px] text-ink/55">{x.h}</span>
        </motion.li>
      ))}
    </ul>
  );
}

function TeamArt() {
  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex -space-x-2">
        {["A", "B", "C", "D"].map((n, i) => (
          <span
            key={n}
            className="grid h-8 w-8 place-items-center rounded-full border-2 border-card font-display text-xs"
            style={{
              background: ["oklch(0.92 0.08 55)", "oklch(0.9 0.07 305)", "oklch(0.91 0.06 165)", "oklch(0.92 0.06 10)"][i],
            }}
          >
            {n}
          </span>
        ))}
      </div>
      <span className="rounded-full bg-card/80 px-2.5 py-1 text-xs">+6 members</span>
    </div>
  );
}

function ShieldArt() {
  const items = ["domains", "duration"];
  const negs = ["prompts", "keystrokes", "clipboard"];
  return (
    <div className="space-y-1.5 text-xs mt-2">
      {items.map((l) => (
        <div key={l} className="flex items-center gap-2 rounded-xl bg-card/80 px-3 py-1.5">
          <span className="text-mint">✓</span> tracks {l}
        </div>
      ))}
      {negs.map((l) => (
        <div key={l} className="flex items-center gap-2 rounded-xl bg-card/40 px-3 py-1.5 text-ink/55">
          <span>✗</span> never reads {l}
        </div>
      ))}
    </div>
  );
}

function ScoreArt() {
  return (
    <div className="mt-1 flex items-center gap-3">
      <svg viewBox="0 0 60 60" className="h-16 w-16 -rotate-90">
        <circle cx="30" cy="30" r="24" stroke="oklch(0.28 0.03 40 / 0.12)" strokeWidth="6" fill="none" />
        <motion.circle
          cx="30"
          cy="30"
          r="24"
          stroke="oklch(0.78 0.13 30)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 0.82 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ pathLength: 0.82 }}
        />
      </svg>
      <div>
        <div className="font-display text-3xl">82</div>
        <div className="text-[11px] text-ink/60">Top 8%</div>
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/*  Testimonials                                                      */
/* ------------------------------------------------------------------ */
function Testimonials() {
  const items = [
    {
      quote: "Found $187/month in tools I forgot I was paying for. Paid for itself in a week.",
      name: "Maya R.",
      role: "Freelance designer",
      tone: "peach",
    },
    {
      quote: "Finally I can show my CTO exactly what every AI tool costs and returns. Game over.",
      name: "Daniel K.",
      role: "Eng. lead",
      tone: "lavender",
    },
    {
      quote: "Cancelled 4 overlapping tools in 10 minutes. The Score is weirdly addictive.",
      name: "Hira S.",
      role: "YouTube creator",
      tone: "mint",
    },
    {
      quote: "Our agency saved $9,400 last quarter. Exfluent is now mandatory onboarding.",
      name: "Jorge P.",
      role: "Agency founder",
      tone: "rose",
    },
  ];
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="chip mx-auto block w-fit">Loved by 12,400+</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-center font-display text-5xl leading-tight sm:text-6xl">
            Quiet wins. <em className="text-coral">Loud savings.</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div className="soft-card flex h-full flex-col justify-between p-7">
                <div>
                  <div className="flex gap-1 text-coral">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} size={14} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <p className="mt-4 font-display text-2xl leading-snug">"{t.quote}"</p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-full font-display text-xl text-ink"
                    style={{
                      background:
                        t.tone === "peach"
                          ? "oklch(0.92 0.08 55)"
                          : t.tone === "lavender"
                          ? "oklch(0.9 0.07 305)"
                          : t.tone === "mint"
                          ? "oklch(0.91 0.06 165)"
                          : "oklch(0.92 0.06 10)",
                    }}
                  >
                    {t.name[0]}
                  </span>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing                                                           */
/* ------------------------------------------------------------------ */
function Pricing() {
  return (
    <section id="pricing" className="relative px-6 py-28">
      <Orb className="-right-24 top-20" color="oklch(0.86 0.09 55)" size={380} />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="chip mx-auto block w-fit">Pricing</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-center font-display text-5xl leading-tight sm:text-6xl">
            Pay less than a coffee. <em className="text-coral">Save a salary.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-center font-display text-xl sm:text-2xl text-ink/80 leading-relaxed italic">
            Start free forever. Upgrade when you outgrow it.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <PricingCards />
        </Reveal>
      </div>
    </section>
  );
}


/* ------------------------------------------------------------------ */
/*  FAQ                                                               */
/* ------------------------------------------------------------------ */
function Faq() {
  const items = [
    {
      q: "Can Exfluent see my prompts or data?",
      a: "Never. The extension only tracks which AI domain is active and for how long. Zero keystrokes, zero clipboard, zero content.",
    },
    {
      q: "How does the Gmail import work?",
      a: "We use Google's read-only API to scan billing emails from known AI vendors. You can revoke access in one click.",
    },
    {
      q: "Will it work with [insert tool]?",
      a: "We auto-detect 30+ tools out of the box and you can add any custom subscription manually with cost & cycle.",
    },
    {
      q: "Is there a free plan?",
      a: "Yes — 3 tools, the extension, Gmail detect, basic dashboard and one optimizer tip per month. Forever free.",
    },
    {
      q: "What's the Exfluent Score?",
      a: "A 0–100 weekly score blending usage frequency, ROI, idle tools and overlap. It's surprisingly addictive.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Of course. One click, Stripe portal, no awkward retention call.",
    },
  ];
  return (
    <section id="faq" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <span className="chip mx-auto block w-fit">FAQ</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 text-center font-display text-5xl leading-tight sm:text-6xl">
            Asked & <em className="text-lavender">answered.</em>
          </h2>
        </Reveal>
        <div className="mt-14 space-y-3">
          {items.map((it, i) => (
            <Reveal key={it.q} delay={i * 0.04}>
              <FaqItem q={it.q} a={it.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((v) => !v)}
      className="soft-card group w-full p-6 text-left"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-display text-2xl">{q}</span>
        <ChevronDown
          size={20}
          className={"shrink-0 text-ink/50 transition-transform " + (open ? "rotate-180" : "")}
        />
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pt-3 text-sm text-ink/70">{a}</p>
      </motion.div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                            */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="relative mt-12 border-t border-border/60 bg-card/40 px-6 py-16 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="font-display text-3xl">Exfluent</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            The calm command center for your AI subscriptions. Track, optimize, save —
            without the spreadsheets.
          </p>
          <Link
            to="/auth/signup"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-cream hover:opacity-95"
          >
            Start free <ArrowUpRight size={14} />
          </Link>
        </div>
        <FooterCol
          title="Product"
          items={[
            { label: "Features", to: "/", hash: "features" },
            { label: "Pricing", to: "/", hash: "pricing" },
            { label: "Extension", to: "/extension" },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { label: "About", to: "/about" },
            { label: "Careers", to: "/careers" },
            { label: "Press", to: "/press" },
          ]}
        />
        <FooterCol
          title="Legal"
          items={[
            { label: "Privacy", to: "/privacy" },
            { label: "Terms", to: "/terms" },
            { label: "Security", to: "/security" },
            { label: "DPA", to: "/dpa" },
          ]}
        />
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between border-t border-border/60 pt-6 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Exfluent · exfluent.site</span>
        <span>Made with warmth, not hype.</span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string; hash?: string }[];
}) {
  return (
    <div>
      <div className="text-sm font-medium">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i.label}>
            <Link to={i.to} hash={i.hash} className="hover:text-foreground transition-colors">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
