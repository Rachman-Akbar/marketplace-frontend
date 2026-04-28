type SummaryRowProps = {
  label: string;
  value: string | number;
  highlight?: boolean;
};

export function SummaryRow({ label, value, highlight = false }: SummaryRowProps) {
  return (
    <div className="flex justify-between gap-4">
      <span>{label}</span>

      <span
        className={
          highlight
            ? "font-semibold text-emerald-700"
            : "font-semibold text-slate-900"
        }
      >
        {value}
      </span>
    </div>
  );
}