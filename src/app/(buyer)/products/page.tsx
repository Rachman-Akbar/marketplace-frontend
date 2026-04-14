import { PageWrapper } from "@/components/layout/PageWrapper";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tabs } from "@/components/ui/Tabs";
import { productCards } from "@/lib/mock-data";

export default function ProductsPage() {
  return (
    <PageWrapper>
      <SectionTitle title="Product List" subtitle="Browse premium handmade selections from trusted studios." />
      <Tabs
        activeKey="featured"
        tabs={[
          { key: "featured", label: "Featured" },
          { key: "new", label: "New Arrivals" },
          { key: "best", label: "Best Sellers" },
        ]}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productCards.map((product) => (
          <ProductCard key={product.title} {...product} href="/products/speckled-vessel" />
        ))}
      </div>
    </PageWrapper>
  );
}
