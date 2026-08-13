import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

import { EmptyState, ErrorState } from "@/components/common/States";
import type { Result, Row } from "./types";

export function ActivityPanel({
  title,
  queryKey,
  fetcher,
  emptyLabel,
  renderRow,
}: {
  title: string;
  queryKey: unknown[];
  fetcher: () => Promise<Result<Row[]>>;
  emptyLabel: string;
  renderRow: (row: Row) => ReactNode;
}) {
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetcher();
      if (!res.ok) throw new Error(res.error);
      return res.data ?? [];
    },
    retry: 0,
  });

  return (
    <section className="rounded-lg border border-border bg-card">
      <header className="flex items-center justify-between border-b border-border px-3 py-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
        {query.isFetching ? (
          <Loader2 className="size-3 animate-spin text-muted-foreground" aria-hidden />
        ) : null}
      </header>
      <div className="p-3">
        {query.isLoading ? (
          <p className="text-xs text-muted-foreground">Loading…</p>
        ) : query.error ? (
          <ErrorState
            message={(query.error as Error).message}
            onRetry={() => void query.refetch()}
          />
        ) : (query.data ?? []).length === 0 ? (
          <EmptyState
            title={emptyLabel}
            icon={<AlertTriangle className="size-4" aria-hidden />}
          />
        ) : (
          <ul className="space-y-1.5">
            {(query.data ?? []).map((row, i) => (
              <li key={String(row["id"] ?? i)}>{renderRow(row)}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
