# Diagnostic: `column workspace_members.id does not exist`

Read-only inspection complete. Exactly three places assume a single-column `id` on `workspace_members`. Nothing else in the codebase queries that table.

## Findings

### 1. `src/services/workspaces.service.ts` (line 13) — root cause
```ts
.select("id, workspace_id, user_id, role, status, workspaces(*)")
```
Why: the select list explicitly asks PostgREST for `id`, which does not exist on the table (composite PK `workspace_id, user_id`). PostgREST rejects the whole request, so `fetchActiveMemberships` throws and the workspace gate stays on "Resolving workspace access…" then shows the error.

Should use:
```ts
.select("workspace_id, user_id, role, status, workspaces(*)")
```

### 2. `src/services/workspaces.service.ts` (line 22)
```ts
membershipId: row.id,
```
Why: maps the non-existent column into the app-level `Membership` object. Should use a composite identity — `` `${row.workspace_id}:${row.user_id}` `` — or simply drop the field, since nothing consumes it (confirmed: `membershipId` appears nowhere outside its declaration and this assignment).

### 3. `src/types/db.ts` (lines 18–34)
```ts
export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  ...
}
export interface Membership {
  membershipId: string;
  ...
}
```
Why: the hand-written type declares `id`, which is what led the query to request it. Should mirror the real table: remove `id`, keep `workspace_id`, `user_id`, `role`, `status`, and optionally add `joined_at`, `invited_by`, `created_at`, `updated_at`. `Membership.membershipId` becomes a derived composite key or is removed.

## RLS / authentication impact

None. The proposed change only shortens the requested column list and adjusts TypeScript types. It does not touch policies (`workspace_members_select_member` etc.), `is_workspace_member`, `has_workspace_role`, `auth.uid()`, the session flow, or any filter used for authorization. The query keeps `.eq('user_id', userId)` and `.eq('status','active')`, and the embedded `workspaces(*)` read still passes through the workspaces SELECT policy.

## Not touched
No database change, no migration, no id column, no PK change, no RLS or function change, no auth change.

## Proposed fix (on approval)
Three edits in two files: correct the `select()` list, derive `membershipId` from the composite key (or drop it), and align `WorkspaceMember` in `src/types/db.ts` with the real column set. Then verify membership resolution loads with a signed-in session.
