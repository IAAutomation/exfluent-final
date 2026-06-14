import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Field, GoogleButton, PrimaryButton, Divider } from "@/components/auth/FormField";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/auth/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — Exfluent" },
      { name: "description", content: "Sign back in to your Exfluent account." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <AuthShell>
      <div>
        <span className="chip">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
          Welcome back
        </span>
        <h1 className="mt-5 font-display text-5xl leading-[1.05]">
          Sign in to <em>Exfluent</em>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Pick up where you left off — campaigns, creators and analytics.
        </p>

        <div className="mt-8">
          <GoogleButton />
          <Divider />

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/app" });
            }}
          >
            <Field label="Email" name="email" type="email" placeholder="you@studio.com" required />
            <Field
              label="Password"
              name="password"
              type={show ? "text" : "password"}
              placeholder="••••••••"
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

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="size-4 rounded border-input" />
                Remember me
              </label>
              <Link to="/auth/forgot" className="text-foreground underline-offset-4 hover:underline">
                Forgot password?
              </Link>
            </div>

            <PrimaryButton>Sign in →</PrimaryButton>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Exfluent?{" "}
            <Link to="/auth/signup" className="text-foreground underline-offset-4 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </AuthShell>
  );
}
