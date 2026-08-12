import { supabase } from "@/lib/supabase/client";
import { queryOrThrow } from "@/lib/result";
import type { Membership, WorkspaceMembershipRow } from "@/types/db";

/**
 * Resolve the active memberships for the signed-in user.
 * workspace_members.status = 'active' AND workspaces.status = 'active'.
 */
export async function fetchActiveMemberships(userId: string): Promise<Membership[]> {
  const rows = await queryOrThrow<WorkspaceMembershipRow[]>(() =>
    supabase
      .from("workspace_members")
      .select("id, workspace_id, user_id, role, status, workspaces(*)")
      .eq("user_id", userId)
      .eq("status", "active")
      .returns<WorkspaceMembershipRow[]>(),
  );

  return (rows ?? [])
    .filter((row) => row.workspaces && row.workspaces.status === "active")
    .map((row) => ({
      membershipId: row.id,
      role: row.role,
      workspace: row.workspaces!,
    }))
    .sort((a, b) =>
      (a.workspace.name ?? "").localeCompare(b.workspace.name ?? ""),
    );
}
