import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/States";
import { NotImplemented } from "@/components/common/NotImplemented";

export const Route = createFileRoute("/_authenticated/businesses")({
  head: () => ({
    meta: [
      { title: "Businesses — BOOST AI" },
      { name: "description", content: "Businesses in the BOOST AI marketing operating system by BrandBoost." },
      { property: "og:title", content: "Businesses — BOOST AI" },
      { property: "og:description", content: "Businesses in the BOOST AI marketing operating system by BrandBoost." },
    ],
  }),
  component: BusinessesPage,
});

function BusinessesPage() {
  return (
    <div>
      <PageHeader title="Businesses" />
      <NotImplemented
        title="Businesses"
        purpose="Business entities belonging to clients, including locations and their GBP linkage."
        backendObjects={["businesses", "clients", "gbp_locations"]}
      />
    </div>
  );
}
