import { PageWrapper } from "@/components/layout/PageWrapper";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function OrderTrackingPage() {
  return (
    <PageWrapper>
      <SectionTitle title="Order Tracking" subtitle="Track progress for order #CC-82910-442" />
      <Card className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Shipment Progress</h3>
          <Badge>In Transit</Badge>
        </div>
        <div className="space-y-4">
          {[
            "Order confirmed",
            "Packed by artisan studio",
            "Shipped with premium courier",
            "Out for delivery",
          ].map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <div className={`h-4 w-4 rounded-full ${index < 3 ? "bg-emerald-600" : "bg-slate-300"}`} />
              <p className="text-sm text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  );
}
