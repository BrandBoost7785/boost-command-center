import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/States";
import { NotImplemented } from "@/components/common/NotImplemented";

export const Route = createFileRoute("/_authenticated/agents")({
  head: () => ({
    meta: [
      { title: "Agents — BOOST AI" },
      { name: "description", content: "Agents in the BOOST AI marketing operating system by BrandBoost." },
      { property: "og:title", content: "Agents — BOOST AI" },
      { property: "og:description", content: "Agents in the BOOST AI marketing operating system by BrandBoost." },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <div>
      <PageHeader title="Agents" />
      <NotImplemented
        title="Agents"
        purpose="Registered BOOST agents, their tool grants, run history and configuration."
        backendObjects={["ai_agents", "agent_tools", "agent_runs"]}
      />
    </div>
  );
}
