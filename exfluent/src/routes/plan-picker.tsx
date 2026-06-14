import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { LogoMark } from "@/components/auth/AuthShell";
import { PricingCards } from "@/components/landing/PricingCards";
import { setStoredPlan, type PlanId } from "@/lib/plans";

export const Route = createFileRoute("/plan-picker")({
  head: () => ({
    meta: [
      { title: "Pick your plan — Exfluent" },
      { name: "description", content: "Choose Free, Pro or Team and jump into your dashboard." },
    ],
  }),
  component: PlanPicker,
});

function PlanPicker() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PlanId | undefined>(undefined);

  function pick(id: PlanId) {
    setSelected(id);
    setStoredPlan(id);
    // small delay for the card-press animation
    setTimeout(() => navigate({ to: "/app" }), 320);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display text-2xl">exfluent</span>
        </Link>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to site
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="chip mx-auto block w-fit">
            <Sparkles size={12} className="text-coral" />
            One last step
          </span>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl">
            Pick a plan to <em className="text-coral">preview your dashboard</em>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Click a card — we'll show you the exact screens that come with that plan. You can switch
            anytime from inside the app.
          </p>
        </motion.div>

        <div className="mt-10">
          <PricingCards selectable selectedId={selected} onSelect={pick} showBilling />
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          Just want to look around?{" "}
          <button
            onClick={() => pick("free")}
            className="inline-flex items-center gap-1 font-medium text-foreground hover:underline"
          >
            Continue on Free <ArrowRight size={14} />
          </button>
        </div>
      </main>
    </div>
  );
}
