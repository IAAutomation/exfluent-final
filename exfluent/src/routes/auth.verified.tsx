import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { PrimaryButton } from "@/components/auth/FormField";
import { Check } from "lucide-react";

export const Route = createFileRoute("/auth/verified")({
  head: () => ({
    meta: [
      { title: "Email verified — Exfluent" },
      { name: "description", content: "Your email is verified. Welcome to Exfluent." },
    ],
  }),
  component: VerifiedPage,
});

function VerifiedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/onboarding" }), 2400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <AuthShell>
      <div className="text-center">
        <div className="mx-auto inline-flex">
          <span className="relative inline-flex">
            <span
              aria-hidden
              className="absolute -inset-6 rounded-full opacity-60 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 180deg, #4B73FF, #FF66F4, #FE7B02, #FF8E63, #4B73FF)",
              }}
            />
            <span className="relative flex size-24 items-center justify-center rounded-full bg-ink text-cream">
              <Check size={44} strokeWidth={2.5} />
            </span>
          </span>
        </div>

        <span className="chip mt-8 inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
          All set
        </span>
        <h1 className="mt-5 font-display text-5xl leading-[1.05]">
          You're <em>verified.</em>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Welcome to Exfluent. We're taking you to a quick setup so we can tailor
          everything around your goals.
        </p>

        <div className="mt-10 text-left">
          <PrimaryButton type="button" onClick={() => navigate({ to: "/onboarding" })}>
            Continue to setup →
          </PrimaryButton>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Redirecting automatically in a moment…
        </p>
      </div>
    </AuthShell>
  );
}
