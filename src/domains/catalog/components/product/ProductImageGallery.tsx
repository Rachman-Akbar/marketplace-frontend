import { resolveProductImage } from "../../utils/productMapper";

import type { Product } from "../../types";

type ProductImageGalleryProps = {
  product: Product;
};

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const mainImage = resolveProductImage(product);
  const images = product.images ?? [];

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={mainImage}
          alt={product.name}
          className="h-full max-h-[620px] w-full object-cover"
        />
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image) => {
            if (!image.image_url) return null;

            return (
              <div
                key={image.id}
                className="overflow-hidden rounded-xl border bg-gray-100"
              >
                <img
                  src={image.image_url}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}