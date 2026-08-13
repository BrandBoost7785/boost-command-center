import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/States";
import { NotImplemented } from "@/components/common/NotImplemented";

export const Route = createFileRoute("/_authenticated/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — BOOST AI" },
      { name: "description", content: "Tasks in the BOOST AI marketing operating system by BrandBoost." },
      { property: "og:title", content: "Tasks — BOOST AI" },
      { property: "og:description", content: "Tasks in the BOOST AI marketing operating system by BrandBoost." },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  return (
    <div>
      <PageHeader title="Tasks" />
      <NotImplemented
        title="Tasks"
        purpose="Agent tasks and human follow-ups, with owner, status and originating run."
        backendObjects={["agent_tasks", "agent_runs", "workspace_members"]}
      />
    </div>
  );
}
