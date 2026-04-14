import { PageWrapper } from "@/components/layout/PageWrapper";
import { EmptyState } from "@/components/ui/EmptyState";

export default function EmptyOrdersPage() {
  return (
    <PageWrapper>
      <EmptyState
        title="No orders yet"
        description="When you place your first order, tracking and order history will appear here."
        ctaLabel="Start Shopping"
        ctaHref="/products"
      />
    </PageWrapper>
  );
}
