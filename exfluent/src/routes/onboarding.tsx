import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LogoMark } from "@/components/auth/AuthShell";
import { Field, PrimaryButton } from "@/components/auth/FormField";
import { PricingCards } from "@/components/landing/PricingCards";

import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Camera,
  Check,
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
  plan: string;
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
  { id: "creator", label: "Creator", desc: "I make content & want brand deals.", icon: Camera },
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

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "Free",
    sub: "forever",
    accent: "bg-brand-blue/10 text-brand-blue",
    features: ["1 workspace", "25 creator searches / mo", "Basic analytics"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    sub: "/ month",
    accent: "bg-brand-pink/15 text-brand-pink",
    badge: "Most popular",
    features: ["Unlimited searches", "Outreach inbox", "Campaign tracker", "Audience insights"],
  },
  {
    id: "business",
    name: "Business",
    price: "$149",
    sub: "/ month",
    accent: "bg-brand-orange/15 text-brand-orange",
    features: ["Team seats (10)", "API access", "Brand-safety AI", "Priority support"],
  },
];

const STEPS = ["You", "Source", "Role", "Reason", "Plan"] as const;

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({
    name: "",
    username: "",
    hear: "",
    role: "",
    bring: "",
    plan: "pro",
  });

  const canNext = useMemo(() => {
    if (step === 0) return data.name.trim() && data.username.trim();
    if (step === 1) return !!data.hear;
    if (step === 2) return !!data.role;
    if (step === 3) return !!data.bring;
    return !!data.plan;
  }, [step, data]);

  const next = () => {
    if (step === STEPS.length - 1) navigate({ to: "/plan-picker" });
    else setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display text-2xl">exfluent</span>
        </div>
        <span className="text-xs text-muted-foreground">
          Step {step + 1} of {STEPS.length}
        </span>
      </header>

      {/* Progress */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={
                "h-1.5 flex-1 overflow-hidden rounded-full " +
                (i <= step ? "bg-ink" : "bg-muted")
              }
            >
              {i === step && (
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "linear-gradient(90deg,#4B73FF,#FF66F4,#FE7B02)",
                    animation: "shimmer 2s linear infinite",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        {step === 0 && (
          <Step
            kicker="A quick hello"
            title={<>What should we <em>call you?</em></>}
            sub="Your name appears on campaigns and creator outreach."
          >
            <Field
              label="Full name"
              placeholder="Ava Chen"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <Field
              label="Username"
              hint="lowercase, no spaces"
              placeholder="avachen"
              value={data.username}
              onChange={(e) =>
                setData({
                  ...data,
                  username: e.target.value.toLowerCase().replace(/\s+/g, ""),
                })
              }
              right={<span className="text-sm text-muted-foreground">@</span>}
            />
          </Step>
        )}

        {step === 1 && (
          <Step
            kicker="Tell us"
            title={<>How did you <em>hear about us?</em></>}
            sub="Helps us know what's working — pick one."
          >
            <Grid>
              {heard.map((o) => (
                <OptionCard
                  key={o.id}
                  selected={data.hear === o.id}
                  onClick={() => setData({ ...data, hear: o.id })}
                  icon={<o.icon size={18} />}
                  label={o.label}
                />
              ))}
            </Grid>
          </Step>
        )}

        {step === 2 && (
          <Step
            kicker="Your role"
            title={<>What <em>brings you</em> here?</>}
            sub="We'll tailor the dashboard, templates and creator pool for you."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {roles.map((r) => (
                <BigCard
                  key={r.id}
                  selected={data.role === r.id}
                  onClick={() => setData({ ...data, role: r.id })}
                  icon={<r.icon size={20} />}
                  title={r.label}
                  desc={r.desc}
                />
              ))}
            </div>
          </Step>
        )}

        {step === 3 && (
          <Step
            kicker="The why"
            title={<>What's <em>nudging</em> you to try Exfluent?</>}
            sub="Be honest — this changes what we show you first."
          >
            <div className="space-y-2.5">
              {bring.map((b) => (
                <RowCard
                  key={b.id}
                  selected={data.bring === b.id}
                  onClick={() => setData({ ...data, bring: b.id })}
                  icon={<b.icon size={18} />}
                  label={b.label}
                />
              ))}
            </div>
          </Step>
        )}

        {step === 4 && (
          <Step
            kicker="Almost there"
            title={<>Pick a <em>plan</em> that fits</>}
            sub="You can preview each plan's full dashboard right after — switch anytime."
          >
            <div className="-mx-2">
              <PricingCards
                variant="compact"
                selectable
                selectedId={data.plan as "free" | "pro" | "team"}
                onSelect={(id) => setData({ ...data, plan: id })}
                showBilling
              />
            </div>
          </Step>
        )}


        {/* Nav */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="w-48">
            <PrimaryButton
              type="button"
              onClick={next}
              disabled={!canNext}
              className={!canNext ? "opacity-40 pointer-events-none" : ""}
            >
              {step === STEPS.length - 1 ? "Finish" : "Continue"}
              <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        </div>
      </main>

      <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
    </div>
  );
}

function Step({
  kicker,
  title,
  sub,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  sub: string;
  children: React.ReactNode;
}) {
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

function OptionCard({
  selected,
  onClick,
  icon,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex items-center gap-3 rounded-xl border bg-card px-4 py-3.5 text-left text-sm transition-all " +
        (selected
          ? "border-ink shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]"
          : "border-input hover:border-ink/40")
      }
    >
      <span
        className={
          "inline-flex size-9 items-center justify-center rounded-lg " +
          (selected ? "bg-ink text-cream" : "bg-muted text-foreground")
        }
      >
        {icon}
      </span>
      <span className="flex-1 font-medium">{label}</span>
      {selected && <Check size={16} />}
    </button>
  );
}

function BigCard({
  selected,
  onClick,
  icon,
  title,
  desc,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-2xl border bg-card p-5 text-left transition-all " +
        (selected
          ? "border-ink shadow-[0_20px_50px_-25px_rgba(0,0,0,0.3)] -translate-y-0.5"
          : "border-input hover:border-ink/40")
      }
    >
      <span
        className={
          "inline-flex size-10 items-center justify-center rounded-xl " +
          (selected ? "bg-ink text-cream" : "bg-muted text-foreground")
        }
      >
        {icon}
      </span>
      <div className="mt-4 font-display text-2xl">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </button>
  );
}

function RowCard({
  selected,
  onClick,
  icon,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex w-full items-center gap-4 rounded-xl border bg-card px-4 py-4 text-left transition-all " +
        (selected ? "border-ink" : "border-input hover:border-ink/40")
      }
    >
      <span
        className={
          "inline-flex size-9 items-center justify-center rounded-lg " +
          (selected ? "bg-ink text-cream" : "bg-muted text-foreground")
        }
      >
        {icon}
      </span>
      <span className="flex-1 text-sm font-medium">{label}</span>
      <span
        className={
          "inline-flex size-5 items-center justify-center rounded-full border " +
          (selected ? "bg-ink text-cream border-ink" : "border-input")
        }
      >
        {selected && <Check size={12} />}
      </span>
    </button>
  );
}
