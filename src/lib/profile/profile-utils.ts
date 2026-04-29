import type { AuthUser } from "@/lib/auth";

export function splitName(
  fullName: string | null | undefined,
): {
  firstName: string;
  lastName: string;
} {
  if (!fullName?.trim()) {
    return {
      firstName: "",
      lastName: "",
    };
  }

  const chunks = fullName.trim().split(/\s+/);

  return {
    firstName: chunks[0] ?? "",
    lastName: chunks.length > 1 ? chunks.slice(1).join(" ") : "",
  };
}

export function getDisplayName(user: AuthUser): string {
  return user.name?.trim() || user.email || "User";
}

export function getAvatarUrl(user: AuthUser): string {
  if (user.avatar?.trim()) {
    return user.avatar;
  }

  const name = encodeURIComponent(getDisplayName(user));

  return `https://ui-avatars.com/api/?background=047857&color=ffffff&name=${name}`;
}