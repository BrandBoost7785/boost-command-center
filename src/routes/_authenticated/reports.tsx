import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/States";
import { NotImplemented } from "@/components/common/NotImplemented";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({
    meta: [
      { title: "Reports — BOOST AI" },
      { name: "description", content: "Reports in the BOOST AI marketing operating system by BrandBoost." },
      { property: "og:title", content: "Reports — BOOST AI" },
      { property: "og:description", content: "Reports in the BOOST AI marketing operating system by BrandBoost." },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" />
      <NotImplemented
        title="Reports"
        purpose="Performance reporting built strictly from recorded runs and CRM outcomes — no estimated or synthesized figures."
        backendObjects={["agent_runs", "leads", "gbp_reviews", "audit_logs"]}
      />
    </div>
  );
}
