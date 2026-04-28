type StepTitleProps = {
  number: number;
  title: string;
};

export function StepTitle({ number, title }: StepTitleProps) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
        {number}
      </span>

      <h2 className="text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
    </div>
  );
}