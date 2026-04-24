import Link from "next/link";
import { cn } from "@/lib/cn";

type BannerCardProps = {
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  href?: string;
  className?: string;
};

export function BannerCard({
  title,
  subtitle,
  imageUrl,
  href = "#",
  className,
}: BannerCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden rounded-2xl",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={imageUrl}
          alt={title}
          className="h-[260px] w-full object-cover transition duration-500 ease-out group-hover:scale-105 md:h-[420px] xl:h-[560px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-4xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-2 text-sm text-white/85 md:text-base">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}