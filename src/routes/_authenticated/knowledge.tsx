import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/States";
import { NotImplemented } from "@/components/common/NotImplemented";

export const Route = createFileRoute("/_authenticated/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge — BOOST AI" },
      { name: "description", content: "Knowledge in the BOOST AI marketing operating system by BrandBoost." },
      { property: "og:title", content: "Knowledge — BOOST AI" },
      { property: "og:description", content: "Knowledge in the BOOST AI marketing operating system by BrandBoost." },
    ],
  }),
  component: KnowledgePage,
});

function KnowledgePage() {
  return (
    <div>
      <PageHeader title="Knowledge" />
      <NotImplemented
        title="Knowledge"
        purpose="Workspace knowledge sources and long-term memory available to BOOST agents."
        backendObjects={["knowledge", "memory", "conversations"]}
      />
    </div>
  );
}
