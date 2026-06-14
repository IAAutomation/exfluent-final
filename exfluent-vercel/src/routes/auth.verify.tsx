import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { PrimaryButton } from "@/components/auth/FormField";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/auth/verify")({
  head: () => ({
    meta: [
      { title: "Verify your email — Exfluent" },
      { name: "description", content: "Enter the 6-digit verification code we sent to your inbox." },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [seconds, setSeconds] = useState(42);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleChange = (i: number, v: string) => {
    const ch = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = ch;
    setCode(next);
    if (ch && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!txt) return;
    e.preventDefault();
    const next = Array(6).fill("");
    txt.split("").forEach((c, i) => (next[i] = c));
    setCode(next);
    refs.current[Math.min(txt.length, 5)]?.focus();
  };

  const complete = code.every((c) => c);

  return (
    <AuthShell>
      <div>
        <span className="chip">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
          One last step
        </span>
        <h1 className="mt-5 font-display text-5xl leading-[1.05]">
          Verify your <em>email</em>
        </h1>
        <div className="mt-3 flex items-start gap-2 text-muted-foreground">
          <Mail size={16} className="mt-1 shrink-0" />
          <p>
            We sent a 6-digit code to{" "}
            <span className="text-foreground">ava@studio.com</span>. Enter it
            below to continue.
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (complete) navigate({ to: "/auth/verified" });
          }}
        >
          <div className="flex justify-between gap-2">
            {code.map((v, i) => (
              <input
                key={i}
                ref={(el) => { refs.current[i] = el; }}
                value={v}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKey(i, e)}
                onPaste={handlePaste}
                inputMode="numeric"
                maxLength={1}
                className="size-14 rounded-xl border border-input bg-card text-center font-display text-3xl outline-none transition-all focus:border-ink focus:ring-4 focus:ring-ink/5"
              />
            ))}
          </div>

          <PrimaryButton disabled={!complete} className={!complete ? "opacity-60" : ""}>
            Verify email →
          </PrimaryButton>

          <div className="text-center text-sm text-muted-foreground">
            {seconds > 0 ? (
              <span>
                Didn't get it? Resend in{" "}
                <span className="text-foreground">0:{seconds.toString().padStart(2, "0")}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setSeconds(42)}
                className="text-foreground underline-offset-4 hover:underline"
              >
                Resend code
              </button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Wrong address?{" "}
            <Link to="/auth/signup" className="text-foreground underline-offset-4 hover:underline">
              Use a different email
            </Link>
          </p>
        </form>
      </div>
    </AuthShell>
  );
}
