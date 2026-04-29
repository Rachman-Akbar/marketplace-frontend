import type { AuthUser } from "@/lib/auth";
import { splitName } from "@/lib/profile/profile-utils";

type ProfileDetailsCardProps = {
  user: AuthUser;
};

function ReadonlyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-600">
        {label}
      </label>

      <input
        className="w-full rounded-lg bg-slate-200 px-4 py-3"
        value={value}
        readOnly
      />
    </div>
  );
}

export function ProfileDetailsCard({ user }: ProfileDetailsCardProps) {
  const { firstName, lastName } = splitName(user.name);
  const email = user.email || "-";

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
      <h2 className="mb-4 flex items-center gap-2 text-3xl font-extrabold tracking-tight">
        <span className="material-symbols-outlined text-emerald-700">
          badge
        </span>
        Personal Details
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <ReadonlyField label="First Name" value={firstName} />
        <ReadonlyField label="Last Name" value={lastName} />

        <div className="md:col-span-2">
          <ReadonlyField label="Email Address" value={email} />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-600">
            Bio
          </label>

          <textarea
            className="min-h-28 w-full rounded-lg bg-slate-200 px-4 py-3"
            value="Art director and minimalist furniture collector. Obsessed with natural materials and Bauhaus principles."
            readOnly
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="rounded-lg px-5 py-2 font-semibold text-slate-600"
        >
          Discard
        </button>

        <button
          type="button"
          className="rounded-lg bg-emerald-700 px-6 py-2.5 font-bold text-white"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}