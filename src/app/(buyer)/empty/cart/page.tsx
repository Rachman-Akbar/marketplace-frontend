import { PageWrapper } from "@/components/layout/PageWrapper";
import { EmptyState } from "@/components/ui/EmptyState";

export default function EmptyCartPage() {
  return (
    <PageWrapper>
      <EmptyState
        title="Your cart is still empty"
        description="Browse handmade essentials and add your first curated piece to the collection."
        ctaLabel="Explore Products"
        ctaHref="/products"
      />
    </PageWrapper>
  );
}
