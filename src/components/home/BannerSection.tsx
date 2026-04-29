import { BannerCard } from "@/components/catalog/BannerCard";
import { toBannerRoute } from "@/lib/catalog/catalogRoutes";
import { PLACEHOLDER_IMAGE } from "@/lib/catalog/homepageMapper";

import type { Banner } from "@/lib/catalog/types";

export function BannerSection({ banner }: { banner?: Banner }) {
  return (
    <section className="mx-auto max-w-[1440px] pt-6">
      {banner ? (
        <BannerCard
          title={banner.title}
          subtitle={banner.subtitle}
          imageUrl={banner.image_url || PLACEHOLDER_IMAGE}
          href={toBannerRoute(banner.link_url)}
        />
      ) : (
        <div className="rounded-2xl bg-gray-100 px-8 py-16">
          <h1 className="text-4xl font-extrabold">Buyer Homepage</h1>
          <p className="mt-3 text-gray-600">
            Data homepage ditampilkan dari backend catalog API.
          </p>
        </div>
      )}
    </section>
  );
}