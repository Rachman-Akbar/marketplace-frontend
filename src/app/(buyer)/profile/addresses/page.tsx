import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function AddressManagementPage() {
  return (
    <PageWrapper>
      <SectionTitle title="Address Management" subtitle="Select where your curated pieces should be delivered." />
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="space-y-2 border-2 border-emerald-600 bg-emerald-50">
          <p className="font-semibold">Primary Address</p>
          <p className="text-sm text-slate-600">742 Evergreen Terrace, Springfield, IL 62704</p>
          <Button variant="outline" className="w-full">Edit Address</Button>
        </Card>
        <Card className="space-y-2">
          <p className="font-semibold">Secondary Address</p>
          <p className="text-sm text-slate-600">1200 Avenue of the Americas, New York, NY 10036</p>
          <Button variant="outline" className="w-full">Edit Address</Button>
        </Card>
      </div>
      <Button>Add New Address</Button>
    </PageWrapper>
  );
}
