type CheckoutErrorsProps = {
  error: string | null;
};

export function CheckoutErrors({ error }: CheckoutErrorsProps) {
  if (!error) return null;

  return (
    <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-100">
      {error}
    </div>
  );
}
