import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/States";
import { NotImplemented } from "@/components/common/NotImplemented";

export const Route = createFileRoute("/_authenticated/leads")({
  head: () => ({
    meta: [
      { title: "Leads — BOOST AI" },
      { name: "description", content: "Leads in the BOOST AI marketing operating system by BrandBoost." },
      { property: "og:title", content: "Leads — BOOST AI" },
      { property: "og:description", content: "Leads in the BOOST AI marketing operating system by BrandBoost." },
    ],
  }),
  component: LeadsPage,
});

function LeadsPage() {
  return (
    <div>
      <PageHeader title="Leads" />
      <NotImplemented
        title="Leads"
        purpose="Inbound and sourced leads with CRM stage, assignment and activity timeline."
        backendObjects={["leads", "crm_contacts", "crm_activities", "workspace_members"]}
      />
    </div>
  );
}
