import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function EditProfilePage() {
  return (
    <PageWrapper>
      <SectionTitle title="Edit Profile" subtitle="Update your personal details and public buyer identity." />
      <Card className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input value="Julian" readOnly />
          <Input value="Thorne" readOnly />
        </div>
        <Input value="julian.thorne@canvas.co" readOnly />
        <textarea
          className="min-h-32 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
          value="Art director and minimalist furniture collector. Obsessed with natural materials and Bauhaus principles."
          readOnly
        />
        <div className="flex justify-end gap-3">
          <Button variant="ghost">Discard</Button>
          <Button>Save Changes</Button>
        </div>
      </Card>
    </PageWrapper>
  );
}
