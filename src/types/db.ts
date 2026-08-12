/**
 * Narrow, hand-declared shapes for the EXISTING BOOST database.
 * Only tables actually read by the app today are declared here.
 * The database is the source of truth; nothing here creates or alters schema.
 */

export type WorkspaceStatus = string;

export interface Workspace {
  id: string;
  name: string | null;
  slug?: string | null;
  status: WorkspaceStatus | null;
  agency_id?: string | null;
  created_at?: string | null;
}

export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: string | null;
  status: string | null;
}

export interface WorkspaceMembershipRow extends WorkspaceMember {
  workspaces: Workspace | null;
}

export interface Membership {
  membershipId: string;
  role: string | null;
  workspace: Workspace;
}

export interface Profile {
  id: string;
  email?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
}
