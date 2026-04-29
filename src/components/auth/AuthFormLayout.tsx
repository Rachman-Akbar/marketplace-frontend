import type { ReactNode } from "react";

import { Card } from "./Card";

type AuthFormLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthFormLayout({
  eyebrow,
  title,
  description,
  children,
  footer,
}: AuthFormLayoutProps) {
  return (
    <Card className="w-full space-y-6 rounded-2xl p-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">
          {eyebrow}
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>

        <p className="text-sm text-slate-500">{description}</p>
      </div>

      {children}

      {footer ? (
        <p className="text-center text-sm text-slate-500">{footer}</p>
      ) : null}
    </Card>
  );
}