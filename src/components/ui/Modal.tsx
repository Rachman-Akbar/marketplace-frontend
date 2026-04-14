import { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ModalProps = {
  open?: boolean;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Modal({ open = true, title, children, className }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className={cn("w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl", className)}>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">{title}</h3>
        {children}
      </div>
    </div>
  );
}
