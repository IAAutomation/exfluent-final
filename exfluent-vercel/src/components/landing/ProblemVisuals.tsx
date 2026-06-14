import { motion } from "framer-motion";

export function ProblemVisuals() {
  return (
    <div className="mt-14 grid gap-5 lg:grid-cols-3">
      <Leaky />
      <DuplicateStack />
      <ForgottenTrials />
    </div>
  );
}

function Leaky() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border p-6"
      style={{
        background: "linear-gradient(160deg, oklch(0.93 0.08 30), oklch(0.98 0.03 40))",
      }}
    >
      <div className="chip border-ink/15 bg-card/80">The leak</div>
      <h3 className="mt-4 font-display text-2xl">Spend leaks every week</h3>
      <p className="mt-2 text-sm text-ink/65">
        Trials roll into paid. Idle tools renew. Nobody notices.
      </p>

      {/* dripping coins */}
      <div className="relative mt-6 h-40">
        <svg viewBox="0 0 200 140" className="absolute inset-0 h-full w-full">
          <path
            d="M10 50 Q100 10 190 50"
            stroke="oklch(0.28 0.03 40 / 0.25)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
          />
        </svg>
        {[
          { x: 20, d: 0 },
          { x: 60, d: 0.2 },
          { x: 110, d: 0.4 },
          { x: 160, d: 0.6 },
        ].map((c, i) => (
          <motion.span
            key={i}
            className="absolute grid h-8 w-8 place-items-center rounded-full bg-coral text-cream shadow-[0_6px_20px_-6px_rgba(60,40,30,0.4)]"
            style={{ left: c.x, top: 30 }}
            animate={{ y: [0, 70], opacity: [1, 0] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: c.d,
              ease: "easeIn",
            }}
          >
            $
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function DuplicateStack() {
  const dupes = [
    { a: "Notion AI", b: "ChatGPT" },
    { a: "Jasper", b: "Copy.ai" },
    { a: "DALL·E", b: "Midjourney" },
  ];
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border p-6"
      style={{
        background: "linear-gradient(160deg, oklch(0.92 0.07 305), oklch(0.99 0.02 310))",
      }}
    >
      <div className="chip border-ink/15 bg-card/80">🔁 The overlap</div>
      <h3 className="mt-4 font-display text-2xl">You pay twice for the same thing</h3>
      <p className="mt-2 text-sm text-ink/65">67% of users double-pay across overlapping AI tools.</p>
      <ul className="mt-5 space-y-2">
        {dupes.map((d, i) => (
          <motion.li
            key={d.a}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between rounded-2xl border border-border bg-card/80 px-4 py-2.5"
          >
            <span className="text-sm">{d.a}</span>
            <span className="text-xs text-ink/50">⇄ overlaps with</span>
            <span className="text-sm">{d.b}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function ForgottenTrials() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border p-6"
      style={{
        background: "linear-gradient(160deg, oklch(0.93 0.05 165), oklch(0.99 0.02 160))",
      }}
    >
      <div className="chip border-ink/15 bg-card/80">⏰ The trial trap</div>
      <h3 className="mt-4 font-display text-2xl">Trials renew silently</h3>
      <p className="mt-2 text-sm text-ink/65">Discover them after the charge, not before.</p>

      <div className="mt-5 space-y-2">
        {[
          { tool: "Runway", in: "3d", cost: "$15" },
          { tool: "Suno", in: "5d", cost: "$10" },
          { tool: "ElevenLabs", in: "9d", cost: "$22" },
        ].map((t, i) => (
          <motion.div
            key={t.tool}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center justify-between rounded-2xl border border-border bg-card/80 px-4 py-3"
          >
            <span className="text-sm">{t.tool}</span>
            <span className="text-xs text-ink/60">trial → paid in {t.in}</span>
            <span className="text-sm font-medium text-coral">+{t.cost}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
