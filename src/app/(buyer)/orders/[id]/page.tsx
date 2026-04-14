import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function OrderDetailPage() {
  return (
    <PageWrapper>
      <SectionTitle title="Order Detail" subtitle="Order #CC-82910-442" />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <Card className="space-y-3">
            <h3 className="text-xl font-semibold">Items</h3>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-slate-300 to-slate-100" />
              <div className="flex-1">
                <p className="font-medium">Emerald Fragment Limited Edition Print</p>
                <p className="text-sm text-slate-500">Qty 1</p>
              </div>
              <p className="font-semibold">$1,240</p>
            </div>
          </Card>
          <Card className="space-y-2">
            <h3 className="text-xl font-semibold">Payment and Shipping</h3>
            <p className="text-sm text-slate-600">Visa ending in 4242</p>
            <p className="text-sm text-slate-600">128 Fine Arts Plaza, New York, NY</p>
            <Badge>Estimated arrival: Oct 24, 2026</Badge>
          </Card>
        </div>

        <Card className="space-y-4">
          <h3 className="text-xl font-semibold">Order Actions</h3>
          <Link href="/orders/CC-82910-442/tracking" className="block">
            <Button className="w-full">Track Order</Button>
          </Link>
          <Button variant="outline" className="w-full">Download Invoice</Button>
          <Button variant="ghost" className="w-full">Request Support</Button>
        </Card>
      </div>
    </PageWrapper>
  );
}
