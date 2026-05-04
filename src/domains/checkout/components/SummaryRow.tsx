type SummaryRowProps = {
  label: string;
  value: string;
  strong?: boolean;
};

export function SummaryRow({ label, value, strong = false }: SummaryRowProps) {
  return (
    <div
      className={
        strong
          ? "flex items-center justify-between text-base font-bold text-slate-950"
          : "flex items-center justify-between text-sm text-slate-600"
      }
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
