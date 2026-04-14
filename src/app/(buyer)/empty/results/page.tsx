import { PageWrapper } from "@/components/layout/PageWrapper";
import { EmptyState } from "@/components/ui/EmptyState";

export default function EmptyResultsPage() {
  return (
    <PageWrapper>
      <EmptyState
        title="No matching results"
        description="Try another keyword or adjust your filters to discover more curated options."
        ctaLabel="Go to Search"
        ctaHref="/search"
      />
    </PageWrapper>
  );
}
