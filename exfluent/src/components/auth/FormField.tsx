import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  right?: ReactNode;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, hint, right, className = "", id, ...rest }, ref) => {
    const inputId = id ?? rest.name ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <label htmlFor={inputId} className="block">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
        </div>
        <div className="group relative">
          <input
            ref={ref}
            id={inputId}
            className={
              "w-full rounded-xl border border-input bg-card px-4 py-3 text-[15px] outline-none transition-all placeholder:text-muted-foreground/70 focus:border-ink focus:ring-4 focus:ring-ink/5 " +
              className
            }
            {...rest}
          />
          {right && (
            <div className="absolute inset-y-0 right-3 flex items-center">{right}</div>
          )}
        </div>
      </label>
    );
  },
);
Field.displayName = "Field";

export function GoogleButton({ label = "Continue with Google" }: { label?: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-input bg-card px-4 py-3 text-sm font-medium transition-all hover:border-ink hover:shadow-[0_1px_0_0_rgba(0,0,0,0.05)]"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.87 2.7-6.62z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.35 0-4.34-1.58-5.05-3.71H.96v2.33A9 9 0 009 18z"/>
        <path fill="#FBBC05" d="M3.95 10.71A5.41 5.41 0 013.66 9c0-.59.1-1.17.29-1.71V4.96H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.04l2.99-2.33z"/>
        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.96 4.96L3.95 7.3C4.66 5.16 6.65 3.58 9 3.58z"/>
      </svg>
      {label}
    </button>
  );
}

export function PrimaryButton({
  children,
  type = "submit",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      {...rest}
      className={
        "group relative w-full overflow-hidden rounded-xl bg-ink px-4 py-3.5 text-sm font-medium text-cream transition-all hover:translate-y-[-1px] hover:shadow-[0_10px_30px_-10px_rgba(75,115,255,0.55)] active:translate-y-0 " +
        (rest.className ?? "")
      }
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg,#4B73FF,#FF66F4,#FE7B02,#FF8E63)",
        }}
      />
    </button>
  );
}

export function Divider({ label = "or" }: { label?: string }) {
  return (
    <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      <span className="uppercase tracking-widest">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
