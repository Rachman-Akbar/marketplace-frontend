import type { AuthUser } from "@/domains/auth";
import { getAvatarUrl, getDisplayName } from "@/lib/profile/profile-utils";

type ProfileHeroCardProps = {
  user: AuthUser;
};

export function ProfileHeroCard({ user }: ProfileHeroCardProps) {
  const displayName = getDisplayName(user);
  const avatarUrl = getAvatarUrl(user);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm md:col-span-2">
      <div className="flex items-center gap-5">
        <div className="relative">
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-24 w-24 rounded-full border-4 border-emerald-300 object-cover"
          />

          <button
            type="button"
            className="absolute -bottom-1 -right-1 rounded-full bg-emerald-700 p-1.5 text-white"
            aria-label="Edit profile picture"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
          </button>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight">
              {displayName}
            </h1>

            <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
              Pro Member
            </span>
          </div>

          <p className="mt-1 text-slate-500">
            Curating aesthetics since Oct 2023
          </p>

          <div className="mt-4 flex gap-3">
            <div className="rounded-lg bg-slate-200 px-4 py-2 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Collections
              </p>
              <p className="text-xl font-extrabold text-emerald-700">24</p>
            </div>

            <div className="rounded-lg bg-slate-200 px-4 py-2 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Reviews
              </p>
              <p className="text-xl font-extrabold text-emerald-700">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}