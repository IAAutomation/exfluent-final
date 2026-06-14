import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AuthSide } from "./AuthSide";


interface AuthShellProps {
  children: ReactNode;
  side?: ReactNode;
  badge?: string;
}

export function AuthShell({ children, side, badge = "Exfluent" }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
        {/* Left: form */}
        <div className="flex flex-col px-6 py-8 sm:px-10 lg:px-16">
          <header className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <LogoMark />
              <span className="font-display text-2xl">{badge}</span>
            </Link>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to site
            </Link>
          </header>

          <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
            {children}
          </main>

          <footer className="flex items-center justify-between text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Exfluent</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
            </div>
          </footer>
        </div>

        {/* Right: art panel */}
        <aside
          className="relative hidden overflow-hidden text-ink lg:block"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.93 0.07 55) 0%, oklch(0.91 0.06 20) 45%, oklch(0.9 0.07 305) 100%)",
          }}
        >
          {side ?? <AuthSide />}
        </aside>
      </div>

    </div>
  );
}

export function LogoMark() {
  return (
    <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-cream">
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 210deg, oklch(0.86 0.085 55), oklch(0.82 0.07 305), oklch(0.87 0.07 165), oklch(0.93 0.08 95), oklch(0.86 0.085 55))",
          filter: "blur(0.5px)",
        }}
      />
      <span className="relative h-3 w-3 rounded-full bg-ink" />
    </span>
  );
}



