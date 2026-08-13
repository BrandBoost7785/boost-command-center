import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/States";
import { NotImplemented } from "@/components/common/NotImplemented";

export const Route = createFileRoute("/_authenticated/workflows")({
  head: () => ({
    meta: [
      { title: "Workflows — BOOST AI" },
      { name: "description", content: "Workflows in the BOOST AI marketing operating system by BrandBoost." },
      { property: "og:title", content: "Workflows — BOOST AI" },
      { property: "og:description", content: "Workflows in the BOOST AI marketing operating system by BrandBoost." },
    ],
  }),
  component: WorkflowsPage,
});

function WorkflowsPage() {
  return (
    <div>
      <PageHeader title="Workflows" />
      <NotImplemented
        title="Workflows"
        purpose="Reusable multi-step automations, their triggers, versions and execution history."
        backendObjects={["workflows", "agent_runs", "approvals"]}
      />
    </div>
  );
}
