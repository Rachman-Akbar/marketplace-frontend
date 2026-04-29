import {
  ProductGrid,
  ProductPageHeader,
  productService,
} from "@/domains/catalog";

export default async function ProductsPage() {
  const products = await productService.getAllProducts();

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <ProductPageHeader
        title="Products"
        description="Semua produk dari backend catalog API."
      />

      <section className="mt-10">
        <ProductGrid products={products} />
      </section>
    </main>
  );
}