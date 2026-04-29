import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={[
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900",
        "placeholder:text-slate-400",
        "outline-none transition",
        "focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100",
        "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-70",
        className,
      ].join(" ")}
      {...props}
    />
  );
}