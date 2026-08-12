import type { ReactNode } from "react";
import { Construction } from "lucide-react";

interface NotImplementedProps {
  title: string;
  purpose: string;
  backendObjects: string[];
  children?: ReactNode;
}

/**
 * Honest placeholder: states what the page will do and which existing
 * database objects it will read. Never renders sample data or fake metrics.
 */
export function NotImplemented({
  title,
  purpose,
  backendObjects,
  children,
}: NotImplementedProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <div className="flex items-start gap-4">
        <div className="rounded-lg border border-border bg-muted p-2.5 text-muted-foreground">
          <Construction className="size-5" aria-hidden />
        </div>
        <div className="space-y-3">
          <div>
            <h2 className="text-base font-semibold text-foreground">{title}</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{purpose}</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Backend objects this view will use
            </p>
            <div className="flex flex-wrap gap-1.5">
              {backendObjects.map((name) => (
                <code
                  key={name}
                  className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-xs text-foreground"
                >
                  {name}
                </code>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            No data is displayed here yet — this view intentionally shows nothing
            rather than placeholder numbers.
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
