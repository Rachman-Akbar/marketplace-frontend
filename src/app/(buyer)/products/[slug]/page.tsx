import { notFound } from "next/navigation";
import { productService } from "@/domains/catalog/server";
import { ProductDetailView } from "@/domains/catalog/components/product/ProductDetailView";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await productService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}