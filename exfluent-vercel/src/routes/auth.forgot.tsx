import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Field, PrimaryButton } from "@/components/auth/FormField";
import { MailCheck, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({
    meta: [
      { title: "Reset password — Exfluent" },
      { name: "description", content: "Reset your Exfluent password in seconds." },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <AuthShell>
      <div>
        <Link
          to="/auth/signin"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} /> Back to sign in
        </Link>

        {!sent ? (
          <>
            <span className="chip mt-6">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
              Account recovery
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05]">
              Forgot your <em>password?</em>
            </h1>
            <p className="mt-3 text-muted-foreground">
              No worries — enter your email and we'll send a secure link to reset it.
            </p>

            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <PrimaryButton>Send reset link →</PrimaryButton>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Remembered it?{" "}
              <Link to="/auth/signin" className="text-foreground underline-offset-4 hover:underline">
                Sign in
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="mt-6 inline-flex size-14 items-center justify-center rounded-2xl bg-ink text-cream">
              <MailCheck size={26} />
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[1.05]">
              Check your <em>inbox.</em>
            </h1>
            <p className="mt-3 text-muted-foreground">
              We've sent a password reset link to{" "}
              <span className="text-foreground">{email || "your email"}</span>. The
              link is valid for 30 minutes.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
              <p className="text-foreground font-medium">Didn't receive it?</p>
              <ul className="mt-2 space-y-1.5 list-disc pl-5">
                <li>Check your spam or promotions folder</li>
                <li>Make sure the address is correct</li>
                <li>Wait 60 seconds and try again</li>
              </ul>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSent(false)}
                className="flex-1 rounded-xl border border-input bg-card px-4 py-3 text-sm font-medium hover:border-ink"
              >
                Use different email
              </button>
              <Link
                to="/auth/signin"
                className="flex-1 rounded-xl bg-ink px-4 py-3 text-center text-sm font-medium text-cream hover:opacity-95"
              >
                Back to sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthShell>
  );
}
