import { supabase } from "@/lib/supabase/client";
import { runQuery, type Result } from "@/lib/result";

/**
 * Read-only access to the existing BOOST tables.
 * Column shapes are not assumed beyond `workspace_id` + `created_at`;
 * rows are returned raw and rendered defensively.
 */
export type Row = Record<string, unknown>;

async function listByWorkspace(
  table: string,
  workspaceId: string,
  limit = 25,
): Promise<Result<Row[]>> {
  return runQuery<Row[]>(() =>
    supabase
      .from(table)
      .select("*")
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: false })
      .limit(limit)
      .returns<Row[]>(),
  );
}

export const listConversations = (workspaceId: string) =>
  listByWorkspace("conversations", workspaceId);

export const listAgentRuns = (workspaceId: string) =>
  listByWorkspace("agent_runs", workspaceId, 10);

export const listAgentTasks = (workspaceId: string) =>
  listByWorkspace("agent_tasks", workspaceId, 10);

export const listApprovals = (workspaceId: string) =>
  listByWorkspace("approvals", workspaceId, 10);

/** Best-effort display label for an unknown row shape. */
export function rowLabel(row: Row): string {
  for (const key of ["title", "name", "subject", "summary", "status", "id"]) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return "Untitled";
}

export function rowTimestamp(row: Row): string | null {
  const value = row["created_at"] ?? row["updated_at"];
  return typeof value === "string" ? value : null;
}
