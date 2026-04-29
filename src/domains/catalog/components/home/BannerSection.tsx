import type { Banner } from "../../types";

import { CATALOG_PLACEHOLDER_IMAGE } from "../../constants";
import { toBannerRoute } from "../../services/catalogRoutes";

type BannerSectionProps = {
  banner?: Banner;
};

export function BannerSection({ banner }: BannerSectionProps) {
  return (
    <section className="mx-auto max-w-[1440px] pt-6">
      {banner ? (
        <a
          href={toBannerRoute(banner.link_url)}
          className="block overflow-hidden rounded-2xl bg-slate-100"
        >
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl">
            <img
              src={banner.image_url || CATALOG_PLACEHOLDER_IMAGE}
              alt={banner.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="relative z-10 max-w-xl p-8 text-white">
              <h1 className="text-4xl font-extrabold tracking-tight">
                {banner.title}
              </h1>

              {banner.subtitle ? (
                <p className="mt-3 text-sm text-white/80">
                  {banner.subtitle}
                </p>
              ) : null}
            </div>
          </div>
        </a>
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