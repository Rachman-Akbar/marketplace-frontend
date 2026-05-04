type StepTitleProps = {
  title: string;
  description?: string;
};

export function StepTitle({ title, description }: StepTitleProps) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}
