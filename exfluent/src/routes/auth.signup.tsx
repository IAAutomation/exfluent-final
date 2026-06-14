import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Field, GoogleButton, PrimaryButton, Divider } from "@/components/auth/FormField";
import { Eye, EyeOff, Check, X } from "lucide-react";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "Create account — Exfluent" },
      { name: "description", content: "Create your Exfluent account in seconds." },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const [show, setShow] = useState(false);
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const rules = [
    { ok: pw.length >= 8, label: "8+ characters" },
    { ok: /[A-Z]/.test(pw), label: "1 uppercase" },
    { ok: /\d/.test(pw), label: "1 number" },
    { ok: confirm.length > 0 && pw === confirm, label: "Passwords match" },
  ];

  return (
    <AuthShell>
      <div>
        <span className="chip">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
          Free to start · No card required
        </span>
        <h1 className="mt-5 font-display text-5xl leading-[1.05]">
          Create your <em>Exfluent</em> account
        </h1>
        <p className="mt-3 text-muted-foreground">
          Join 12,000+ brands and creators shaping the next wave of influence.
        </p>

        <div className="mt-8">
          <GoogleButton label="Sign up with Google" />
          <Divider />

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/auth/verify" });
            }}
          >
            <Field label="Full name" name="name" placeholder="Ava Chen" required />
            <Field label="Work email" name="email" type="email" placeholder="ava@studio.com" required />
            <Field
              label="Password"
              name="password"
              type={show ? "text" : "password"}
              placeholder="Create a strong password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              right={
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            <Field
              label="Confirm password"
              name="confirm"
              type={show ? "text" : "password"}
              placeholder="Re-enter password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <ul className="grid grid-cols-2 gap-1.5 pt-1 text-xs">
              {rules.map((r) => (
                <li
                  key={r.label}
                  className={
                    "inline-flex items-center gap-1.5 " +
                    (r.ok ? "text-foreground" : "text-muted-foreground")
                  }
                >
                  <span
                    className={
                      "inline-flex size-4 items-center justify-center rounded-full " +
                      (r.ok ? "bg-ink text-cream" : "bg-muted")
                    }
                  >
                    {r.ok ? <Check size={11} /> : <X size={11} />}
                  </span>
                  {r.label}
                </li>
              ))}
            </ul>

            <p className="text-xs text-muted-foreground">
              By creating an account you agree to our{" "}
              <a href="#" className="underline">Terms</a> and{" "}
              <a href="#" className="underline">Privacy Policy</a>.
            </p>

            <PrimaryButton>Create account →</PrimaryButton>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already with us?{" "}
            <Link to="/auth/signin" className="text-foreground underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthShell>
  );
}
