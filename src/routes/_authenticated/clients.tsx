import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/States";
import { NotImplemented } from "@/components/common/NotImplemented";

export const Route = createFileRoute("/_authenticated/clients")({
  head: () => ({
    meta: [
      { title: "Clients — BOOST AI" },
      { name: "description", content: "Clients in the BOOST AI marketing operating system by BrandBoost." },
      { property: "og:title", content: "Clients — BOOST AI" },
      { property: "og:description", content: "Clients in the BOOST AI marketing operating system by BrandBoost." },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  return (
    <div>
      <PageHeader title="Clients" />
      <NotImplemented
        title="Clients"
        purpose="Agency client records scoped to the active workspace, with owner, status and linked businesses."
        backendObjects={["clients", "workspaces", "workspace_members", "audit_logs"]}
      />
    </div>
  );
}
