import { redirect } from "next/navigation";

import { ProfileDashboard } from "@/components/profile";
import { getServerAuthSession } from "@/lib/auth/server-session";

export default async function ProfileDashboardPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  return <ProfileDashboard user={session.user} />;
}