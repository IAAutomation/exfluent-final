import { motion } from "framer-motion";
import { ArrowUpRight, ShieldAlert, CheckCircle2, Shield, Lock, EyeOff } from "lucide-react";

export function AuthSide() {
  return (
    <div className="relative flex h-full flex-col justify-between p-12">
      {/* soft gradient blobs */}
      <div
        className="absolute -left-24 -top-24 h-[26rem] w-[26rem] rounded-full opacity-70 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(closest-side, oklch(0.88 0.09 35), transparent)" }}
      />
      <div
        className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full opacity-60 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(closest-side, oklch(0.84 0.08 320), transparent)" }}
      />
      <div
        className="absolute bottom-[-6rem] left-1/4 h-[22rem] w-[22rem] rounded-full opacity-70 blur-3xl pointer-events-none"
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
          <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
          12,400+ creators are already saving
        </span>
      </motion.div>

      {/* Renewed Marketing Section */}
      <div className="relative my-auto flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-md"
        >
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight text-ink">
            Stop the silent <br />
            <em className="text-coral">subscription leak.</em>
          </h2>
          <p className="mt-3 text-sm text-ink/70">
            Unused trials renew. Duplicates multiply. Exfluent detects every hidden overspend in real-time, completely automated.
          </p>
        </motion.div>

        {/* Before vs After Cards */}
        <div className="flex flex-col gap-4">
          {/* Before Exfluent Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl border border-dashed border-coral/30 bg-coral/5 p-5 transition-all hover:bg-coral/10"
          >
            <div className="absolute right-4 top-4 text-coral/30 group-hover:text-coral/50 transition-colors">
              <ShieldAlert size={24} />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-coral/80">Before Exfluent</span>
            <h4 className="mt-1 font-display text-lg font-medium text-ink/90">Wasted capital & silent renewals</h4>
            <ul className="mt-3 space-y-2 text-xs text-ink/75">
              <li className="flex items-center justify-between border-b border-coral/10 pb-1.5">
                <span>Runway Gen-3 (Unused 34 days)</span>
                <span className="font-mono text-coral font-medium">$15.00/mo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Duplicate Midjourney sub (Team + Personal)</span>
                <span className="font-mono text-coral font-medium">$30.00/mo</span>
              </li>
            </ul>
          </motion.div>

          {/* After Exfluent Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 shadow-[0_15px_30px_-15px_rgba(16,185,129,0.15)] transition-all hover:bg-emerald-500/10"
          >
            <div className="absolute right-4 top-4 text-emerald-500/40 group-hover:text-emerald-500/60 transition-colors">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">After Exfluent</span>
            <h4 className="mt-1 font-display text-lg font-medium text-ink">Total stack health & clear ROI</h4>
            <ul className="mt-3 space-y-2 text-xs text-ink/85">
              <li className="flex items-center justify-between border-b border-emerald-500/10 pb-1.5">
                <span>Smart overlap alert resolved</span>
                <span className="font-mono text-emerald-600 font-semibold">Saved $45.00/mo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Exfluent Health Score</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700">92/100 (Excellent)</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Security & Trust badging */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-xl bg-card/40 px-4 py-2.5 text-xs text-ink/60 border border-ink/5"
        >
          <span className="flex items-center gap-1.5">
            <Shield size={12} className="text-ink/70" /> GDPR Compliant
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
          <span className="flex items-center gap-1.5">
            <Lock size={12} className="text-ink/70" /> Stripe Secure
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
          <span className="flex items-center gap-1.5">
            <EyeOff size={12} className="text-ink/70" /> Read-Only Email API
          </span>
        </motion.div>
      </div>

      {/* Bottom stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="relative mt-8 grid grid-cols-3 gap-3"
      >
        {[
          { k: "$289", v: "Avg saved / mo" },
          { k: "98.4%", v: "Accuracy rate" },
          { k: "60s", v: "Setup time" },
        ].map((s) => (
          <div key={s.v} className="rounded-2xl border border-ink/10 bg-card/60 p-4 backdrop-blur transition-all hover:border-ink/20">
            <div className="font-display text-3xl text-ink">{s.k}</div>
            <div className="text-xs text-ink/60">{s.v}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
