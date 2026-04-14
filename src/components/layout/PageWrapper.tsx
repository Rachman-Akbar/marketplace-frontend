import { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageWrapperProps = {
  children: ReactNode;
  className?: string;
};

export function PageWrapper({ children, className }: PageWrapperProps) {
  return <section className={cn("space-y-8 py-2 sm:py-4", className)}>{children}</section>;
}
