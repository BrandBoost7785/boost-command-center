import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/States";
import { NotImplemented } from "@/components/common/NotImplemented";
import { useWorkspace } from "@/hooks/useWorkspace";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — BOOST AI" },
      {
        name: "description",
        content: "Workspace overview inside the BOOST AI marketing operating system.",
      },
      { property: "og:title", content: "Dashboard — BOOST AI" },
      {
        property: "og:description",
        content: "Workspace overview inside the BOOST AI marketing operating system.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { workspace, role } = useWorkspace();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description={
          workspace
            ? `Active workspace: ${workspace.name ?? workspace.id}${role ? ` · ${role}` : ""}`
            : undefined
        }
      />
      <NotImplemented
        title="Executive overview"
        purpose="Cross-domain workspace signal: agent runs, approvals awaiting action, lead flow and GBP health. Metrics appear only once each source is wired to real queries."
        backendObjects={[
          "workspaces",
          "workspace_members",
          "agent_runs",
          "approvals",
          "leads",
          "audit_logs",
        ]}
      />
    </div>
  );
}
