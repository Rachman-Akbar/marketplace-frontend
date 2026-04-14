import { cn } from "@/lib/cn";

type AvatarProps = {
  name: string;
  className?: string;
};

export function Avatar({ name, className }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white",
        className,
      )}
      aria-label={name}
      title={name}
    >
      {initial}
    </div>
  );
}
