import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RatingStars } from "@/components/ui/RatingStars";

type ProductCardProps = {
  title: string;
  price: string;
  vendor?: string;
  tag?: string;
  href?: string;
  imageTone?: string;
};

export function ProductCard({
  title,
  price,
  vendor = "Curated Studio",
  tag,
  href = "/products/speckled-vessel",
  imageTone = "from-stone-200 to-slate-100",
}: ProductCardProps) {
  return (
    <Card className="group p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className={`relative mb-3 h-44 rounded-xl bg-gradient-to-br ${imageTone}`}>
        {tag ? <Badge className="absolute left-3 top-3">{tag}</Badge> : null}
      </div>
      <div className="space-y-2 px-1 pb-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="line-clamp-2 font-semibold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">{vendor}</p>
          </div>
          <p className="font-semibold text-emerald-700">{price}</p>
        </div>
        <RatingStars value={4} />
        <div className="flex gap-2 pt-1">
          <Link href={href} className="w-full">
            <Button variant="outline" className="w-full">
              View
            </Button>
          </Link>
          <Button className="w-full">Add</Button>
        </div>
      </div>
    </Card>
  );
}
