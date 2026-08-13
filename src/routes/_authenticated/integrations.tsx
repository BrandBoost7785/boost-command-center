import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/States";
import { NotImplemented } from "@/components/common/NotImplemented";

export const Route = createFileRoute("/_authenticated/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — BOOST AI" },
      { name: "description", content: "Integrations in the BOOST AI marketing operating system by BrandBoost." },
      { property: "og:title", content: "Integrations — BOOST AI" },
      { property: "og:description", content: "Integrations in the BOOST AI marketing operating system by BrandBoost." },
    ],
  }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  return (
    <div>
      <PageHeader title="Integrations" />
      <NotImplemented
        title="Integrations"
        purpose="Connected third-party accounts and their credential/health status for this workspace."
        backendObjects={["integrations", "workspaces", "audit_logs"]}
      />
    </div>
  );
}
