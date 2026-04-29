import type { InputHTMLAttributes } from "react";

import { Input } from "./Input";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

export function AuthField({ id, label, ...inputProps }: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <label
        className="block text-sm font-semibold text-slate-700"
        htmlFor={id}
      >
        {label}
      </label>

      <Input id={id} {...inputProps} />
    </div>
  );
}