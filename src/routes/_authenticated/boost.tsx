import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mic, Send, MessageSquare } from "lucide-react";

import { PageHeader, EmptyState, ErrorState } from "@/components/common/States";
import { ActivityPanel } from "@/components/boost/ActivityPanel";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  listAgentRuns,
  listAgentTasks,
  listApprovals,
  listConversations,
  rowLabel,
  rowTimestamp,
  type Row,
} from "@/services/boost.service";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createFileRoute("/_authenticated/boost")({
  head: () => ({
    meta: [
      { title: "BOOST — AI Command Center" },
      {
        name: "description",
        content:
          "The BOOST conversational command center: conversations, agent activity, tool execution and approvals.",
      },
      { property: "og:title", content: "BOOST — AI Command Center" },
      {
        property: "og:description",
        content:
          "The BOOST conversational command center: conversations, agent activity, tool execution and approvals.",
      },
    ],
  }),
  component: BoostPage,
});

function RowLine({ row }: { row: Row }) {
  const ts = rowTimestamp(row);
  return (
    <div className="rounded-md border border-border px-2.5 py-2">
      <p className="truncate text-xs text-foreground">{rowLabel(row)}</p>
      {ts ? (
        <p className="mt-0.5 text-[10px] text-muted-foreground">
          {new Date(ts).toLocaleString()}
        </p>
      ) : null}
    </div>
  );
}

function BoostPage() {
  const { workspaceId } = useWorkspace();
  const [draft, setDraft] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const conversations = useQuery({
    queryKey: ["conversations", workspaceId],
    queryFn: async () => {
      const res = await listConversations(workspaceId!);
      if (!res.ok) throw new Error(res.error);
      return res.data ?? [];
    },
    enabled: Boolean(workspaceId),
    retry: 0,
  });

  if (!workspaceId) return null;

  return (
    <div>
      <PageHeader
        title="BOOST"
        description="Conversational command center for this workspace."
      />

      <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)_280px]">
        {/* Conversation history */}
        <aside className="rounded-lg border border-border bg-card">
          <header className="border-b border-border px-3 py-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Conversations
            </h2>
          </header>
          <div className="max-h-[320px] overflow-y-auto p-3 lg:max-h-[calc(100vh-14rem)]">
            {conversations.isLoading ? (
              <p className="text-xs text-muted-foreground">Loading…</p>
            ) : conversations.error ? (
              <ErrorState
                message={(conversations.error as Error).message}
                onRetry={() => void conversations.refetch()}
              />
            ) : (conversations.data ?? []).length === 0 ? (
              <EmptyState
                title="No conversations yet"
                description="Conversations appear here once the orchestrator starts recording them."
                icon={<MessageSquare className="size-4" aria-hidden />}
              />
            ) : (
              <ul className="space-y-1">
                {(conversations.data ?? []).map((row, i) => {
                  const id = String(row["id"] ?? i);
                  return (
                    <li key={id}>
                      <button
                        onClick={() => setSelected(id)}
                        className={`w-full truncate rounded-md px-2.5 py-2 text-left text-xs transition-colors ${
                          selected === id
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent/60"
                        }`}
                      >
                        {rowLabel(row)}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        {/* Thread + composer */}
        <section className="flex min-h-[420px] flex-col rounded-lg border border-border bg-card">
          <div className="flex-1 overflow-y-auto p-4">
            <EmptyState
              title="No messages loaded"
              description={
                selected
                  ? "Message rendering for this conversation is not wired yet."
                  : "Select a conversation, or start one once the BOOST orchestrator is connected."
              }
              icon={<MessageSquare className="size-4" aria-hidden />}
            />
          </div>

          <div className="border-t border-border p-3">
            <div className="rounded-md border border-dashed border-border px-3 py-2 text-[11px] text-muted-foreground">
              Sending is disabled: the BOOST Executive Orchestrator is not connected
              yet. No responses are generated locally.
            </div>
            <div className="mt-3 flex items-end gap-2">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Message BOOST…"
                rows={2}
                className="resize-none"
                disabled
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Button variant="outline" size="icon" disabled aria-label="Voice input">
                        <Mic className="size-4" />
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Voice is not enabled yet</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button size="icon" disabled aria-label="Send message">
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Activity rail */}
        <aside className="space-y-3">
          <ActivityPanel
            title="Execution status"
            queryKey={["agent_runs", workspaceId]}
            fetcher={() => listAgentRuns(workspaceId)}
            emptyLabel="No agent runs recorded"
            renderRow={(row) => <RowLine row={row} />}
          />
          <ActivityPanel
            title="Tool activity"
            queryKey={["agent_tasks", workspaceId]}
            fetcher={() => listAgentTasks(workspaceId)}
            emptyLabel="No tool executions recorded"
            renderRow={(row) => <RowLine row={row} />}
          />
          <ActivityPanel
            title="Approvals"
            queryKey={["approvals", workspaceId]}
            fetcher={() => listApprovals(workspaceId)}
            emptyLabel="No approval requests"
            renderRow={(row) => <RowLine row={row} />}
          />
        </aside>
      </div>
    </div>
  );
}
