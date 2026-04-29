type AuthAlertProps = {
  type: "error" | "success";
  message?: string | null;
};

const alertClassName = {
  error:
    "rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700",
  success:
    "rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700",
};

export function AuthAlert({ type, message }: AuthAlertProps) {
  if (!message) return null;

  return <p className={alertClassName[type]}>{message}</p>;
}