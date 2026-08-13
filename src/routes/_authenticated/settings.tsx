import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/States";
import { NotImplemented } from "@/components/common/NotImplemented";
import { useAuth } from "@/hooks/useAuth";
import { useWorkspace } from "@/hooks/useWorkspace";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "Settings — BOOST AI" },
      {
        name: "description",
        content: "Account and workspace settings for BOOST AI.",
      },
      { property: "og:title", content: "Settings — BOOST AI" },
      {
        property: "og:description",
        content: "Account and workspace settings for BOOST AI.",
      },
    ],
  }),
  component: SettingsPage,
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border py-2.5 last:border-0">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="max-w-full truncate font-mono text-xs text-foreground">{value}</span>
    </div>
  );
}

function SettingsPage() {
  const { user } = useAuth();
  const { workspace, role, memberships } = useWorkspace();

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Account and active workspace context." />

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-2 text-sm font-semibold text-foreground">Account</h2>
        <Row label="Email" value={user?.email ?? "—"} />
        <Row label="User ID" value={user?.id ?? "—"} />
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-2 text-sm font-semibold text-foreground">Active workspace</h2>
        <Row label="Name" value={workspace?.name ?? "—"} />
        <Row label="Workspace ID" value={workspace?.id ?? "—"} />
        <Row label="Your role" value={role ?? "—"} />
        <Row label="Active memberships" value={String(memberships.length)} />
      </section>

      <NotImplemented
        title="Workspace & member administration"
        purpose="Editing workspace details, inviting members and managing roles. Read-only context is shown above; write operations are not enabled yet."
        backendObjects={["workspaces", "workspace_members", "profiles", "audit_logs"]}
      />
    </div>
  );
}
