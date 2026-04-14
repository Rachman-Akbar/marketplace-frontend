import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type EmptyStateProps = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export function EmptyState({ title, description, ctaLabel, ctaHref }: EmptyStateProps) {
  return (
    <Card className="mx-auto max-w-2xl py-12 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-xl">
        ◌
      </div>
      <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">{description}</p>
      <Link href={ctaHref} className="mt-6 inline-block">
        <Button>{ctaLabel}</Button>
      </Link>
    </Card>
  );
}
