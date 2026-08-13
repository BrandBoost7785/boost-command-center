import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/common/States";
import { NotImplemented } from "@/components/common/NotImplemented";

export const Route = createFileRoute("/_authenticated/gbp")({
  head: () => ({
    meta: [
      { title: "GBP — BOOST AI" },
      { name: "description", content: "GBP in the BOOST AI marketing operating system by BrandBoost." },
      { property: "og:title", content: "GBP — BOOST AI" },
      { property: "og:description", content: "GBP in the BOOST AI marketing operating system by BrandBoost." },
    ],
  }),
  component: GbpPage,
});

function GbpPage() {
  return (
    <div>
      <PageHeader title="GBP" />
      <NotImplemented
        title="GBP"
        purpose="Google Business Profile locations, review flow, posts and profile health per business."
        backendObjects={["gbp_locations", "gbp_reviews", "gbp_posts", "integrations"]}
      />
    </div>
  );
}
