import type { ValidationErrors } from "../../types/checkout.types";

type CheckoutErrorsProps = {
  error: string | null;
  validationErrors: ValidationErrors;
};

export function CheckoutErrors({
  error,
  validationErrors,
}: CheckoutErrorsProps) {
  if (!error && !validationErrors) {
    return null;
  }

  return (
    <div className="space-y-3">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {validationErrors ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {Object.entries(validationErrors).map(([field, messages]) => (
            <p key={field}>
              <strong>{field}</strong>: {messages.join(", ")}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}