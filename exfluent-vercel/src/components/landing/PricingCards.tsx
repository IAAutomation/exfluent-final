import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PLANS, type PlanId, type PlanTier } from "@/lib/plans";

const toneBg: Record<string, string> = {
  peach: "linear-gradient(160deg, oklch(0.94 0.06 55), oklch(0.99 0.02 70))",
  lavender: "linear-gradient(160deg, oklch(0.92 0.07 305), oklch(0.97 0.03 310))",
  mint: "linear-gradient(160deg, oklch(0.93 0.05 165), oklch(0.99 0.02 160))",
};

interface PricingCardsProps {
  variant?: "landing" | "compact";
  selectable?: boolean;
  selectedId?: PlanId;
  onSelect?: (id: PlanId) => void;
  ctaTo?: string;
  showBilling?: boolean;
}

export function PricingCards({
  variant = "landing",
  selectable = false,
  selectedId,
  onSelect,
  ctaTo = "/auth/signup",
  showBilling = true,
}: PricingCardsProps) {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      {showBilling && (
        <div className="mx-auto flex w-full justify-center">
          <div className="inline-flex rounded-full border border-border bg-card/70 p-1 backdrop-blur">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={
                "rounded-full px-5 py-2 text-sm transition-all " +
                (!annual ? "bg-ink text-cream" : "text-muted-foreground hover:text-foreground")
              }
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={
                "rounded-full px-5 py-2 text-sm transition-all " +
                (annual ? "bg-ink text-cream" : "text-muted-foreground hover:text-foreground")
              }
            >
              Yearly · save 20%
            </button>
          </div>
        </div>
      )}

      <div className={"mt-10 grid gap-5 lg:grid-cols-3 " + (variant === "compact" ? "gap-4" : "")}>
        {PLANS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card
              tier={t}
              annual={annual}
              selectable={selectable}
              selected={selectedId === t.id}
              onSelect={onSelect}
              ctaTo={ctaTo}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Card({
  tier,
  annual,
  selectable,
  selected,
  onSelect,
  ctaTo,
}: {
  tier: PlanTier;
  annual: boolean;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: PlanId) => void;
  ctaTo: string;
}) {
  const price = annual ? (tier.priceAnnual ? +(tier.priceAnnual / 12).toFixed(2) : 0) : tier.priceMonthly;

  const inner = (
    <div
      className={
        "relative h-full overflow-hidden rounded-3xl border p-7 transition-all hover:-translate-y-1 hover:shadow-[0_40px_70px_-30px_rgba(60,40,30,0.35)] " +
        (selected || tier.featured ? "border-ink/40 ring-1 ring-ink/10" : "border-border")
      }
      style={{ background: toneBg[tier.tone] }}
    >
      {tier.featured && (
        <span className="chip absolute right-5 top-5 border-ink/20 bg-ink text-cream">
          <Sparkles size={12} /> {tier.tag}
        </span>
      )}
      <div className="flex items-baseline gap-2">
        <h3 className="font-display text-3xl">{tier.name}</h3>
      </div>
      <p className="mt-1 text-sm text-ink/70">{tier.desc}</p>
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
        {annual && tier.priceAnnual > 0 && (
          <span>
            ${tier.priceAnnual}/year{tier.annualSavePct ? ` · save ${tier.annualSavePct}%` : ""}
          </span>
        )}
        {!annual && tier.priceMonthly > 0 && <span>billed monthly</span>}
      </div>

      <ul className="mt-6 space-y-2.5 text-sm">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check size={16} className="mt-0.5 shrink-0 text-coral" />
            <span className="text-ink/80">{f}</span>
          </li>
        ))}
      </ul>

      <div
        className={
          "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all " +
          (tier.featured || selected
            ? "bg-ink text-cream hover:opacity-95"
            : "border border-ink/20 bg-card/80 text-ink hover:border-ink/50")
        }
      >
        {selectable ? (selected ? "Selected" : "Choose " + tier.name) : tier.cta}
        <ArrowUpRight size={14} />
      </div>
    </div>
  );

  if (selectable) {
    return (
      <button type="button" onClick={() => onSelect?.(tier.id)} className="block w-full text-left">
        {inner}
      </button>
    );
  }
  return (
    <Link to={ctaTo} className="block">
      {inner}
    </Link>
  );
}
