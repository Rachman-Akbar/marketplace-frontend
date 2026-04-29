import type { AuthUser } from "@/lib/auth";

import { ProfileActivityCard } from "./ProfileActivityCard";
import { ProfileDetailsCard } from "./ProfileDetailsCard";
import { ProfileHeroCard } from "./ProfileHeroCard";
import { ProfileLogoutButton } from "./ProfileLogoutButton";
import { ProfileMembershipCard } from "./ProfileMembershipCard";
import { ProfileSecurityCard } from "./ProfileSecurityCard";
import { ProfileSidebar } from "./ProfileSidebar";

type ProfileDashboardProps = {
  user: AuthUser;
};

export function ProfileDashboard({ user }: ProfileDashboardProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <ProfileSidebar />

      <section className="space-y-6">
        <div className="flex items-center justify-end">
          <ProfileLogoutButton />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ProfileHeroCard user={user} />
          <ProfileMembershipCard />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <ProfileDetailsCard user={user} />

          <div className="space-y-4">
            <ProfileActivityCard />
            <ProfileSecurityCard />
          </div>
        </div>
      </section>
    </div>
  );
}