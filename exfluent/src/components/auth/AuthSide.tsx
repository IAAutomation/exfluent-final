import { motion } from "framer-motion";
import { ArrowUpRight, Check, PiggyBank, Gauge, Radar, Wand2, Bell } from "lucide-react";

const FEATURES = [
  { icon: <PiggyBank size={14} />, label: "Find $100+/mo of waste" },
  { icon: <Radar size={14} />, label: "Spot overlapping subscriptions" },
  { icon: <Wand2 size={14} />, label: "Get a calm action plan" },
  { icon: <Bell size={14} />, label: "Never miss a trial renewal" },
  { icon: <Gauge size={14} />, label: "Track your Exfluent Score" },
];

export function AuthSide() {
  return (
    <div className="relative flex h-full flex-col justify-between p-12">
      {/* soft gradient blobs */}
      <div
        className="absolute -left-24 -top-24 h-[26rem] w-[26rem] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.88 0.09 35), transparent)" }}
      />
      <div
        className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.84 0.08 320), transparent)" }}
      />
      <div
        className="absolute bottom-[-6rem] left-1/4 h-[22rem] w-[22rem] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.88 0.07 165), transparent)" }}
      />

      {/* Top chip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <span className="chip border-ink/10 bg-card/70 text-ink/80">
          <span className="h-1.5 w-1.5 rounded-full bg-coral" />
          12,400+ creators are already saving
        </span>
      </motion.div>

      {/* Promo card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-10 rounded-3xl border border-ink/10 bg-card/80 p-8 shadow-[0_40px_80px_-40px_rgba(60,40,30,0.45)] backdrop-blur"
      >
        <div className="text-xs uppercase tracking-[0.2em] text-ink/55">Let Exfluent</div>
        <div className="mt-1 font-display text-5xl leading-[1.02] text-ink">
          do this <em className="text-coral">for you.</em>
        </div>

        <ul className="mt-7 space-y-3">
          {FEATURES.map((f, i) => (
            <motion.li
              key={f.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-background/60 px-3.5 py-2.5"
            >
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-ink text-cream">
                {f.icon}
              </span>
              <span className="flex-1 text-sm text-ink/85">{f.label}</span>
              <Check size={14} className="text-mint" />
            </motion.li>
          ))}
        </ul>

        {/* Fake "command bar" */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-7 flex items-center gap-2 rounded-2xl border border-ink/15 bg-ink p-2 text-cream"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-cream/10">
            <Wand2 size={16} />
          </span>
          <div className="flex-1 text-sm text-cream/85">
            <span className="text-cream/55">try: </span>
            <TypeRotator />
          </div>
          <span className="rounded-xl bg-cream text-ink px-3 py-2 text-xs font-medium inline-flex items-center gap-1">
            Run <ArrowUpRight size={12} />
          </span>
        </motion.div>

        <div className="mt-5 flex items-center justify-between text-xs text-ink/55">
          <span>Free plan forever · no card needed</span>
          <span className="text-mint">● live</span>
        </div>
      </motion.div>

      {/* Bottom stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="relative mt-10 grid grid-cols-3 gap-3"
      >
        {[
          { k: "$289", v: "Avg saved / mo" },
          { k: "82", v: "Avg Exfluent Score" },
          { k: "60s", v: "Setup time" },
        ].map((s) => (
          <div key={s.v} className="rounded-2xl border border-ink/10 bg-card/60 p-4 backdrop-blur">
            <div className="font-display text-3xl text-ink">{s.k}</div>
            <div className="text-xs text-ink/60">{s.v}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function TypeRotator() {
  const PHRASES = [
    "find my idle AI tools",
    "audit my Gmail receipts",
    "calculate ROI on ChatGPT",
    "cancel everything I never use",
  ];
  return (
    <span className="inline-block">
      <motion.span
        key="rot"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0, repeat: 0 }}
      >
        <CycleText items={PHRASES} />
      </motion.span>
    </span>
  );
}

function CycleText({ items }: { items: string[] }) {
  return (
    <span className="relative inline-flex h-5 overflow-hidden align-bottom">
      <motion.span
        animate={{ y: [0, -20, -40, -60, -80] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
        className="flex flex-col"
      >
        {[...items, items[0]].map((p, i) => (
          <span key={i} className="block h-5 leading-5 text-cream">
            {p}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
