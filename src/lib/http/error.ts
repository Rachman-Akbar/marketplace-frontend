import axios from "axios";

export function getAxiosErrorMessage(
  error: unknown,
  fallback = "Terjadi kesalahan.",
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | {
          message?: string;
          error?: string;
          errors?: Record<string, string[]>;
        }
      | undefined;

    if (data?.errors) {
      const firstError = Object.values(data.errors)[0]?.[0];

      if (firstError) {
        return firstError;
      }
    }

    if (data?.message) return data.message;
    if (data?.error) return data.error;
    if (error.message) return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export function logApiError(label: string, error: unknown): void {
  const logger =
    process.env.NODE_ENV === "development" ? console.warn : console.error;

  if (axios.isAxiosError(error)) {
    logger(label, {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      method: error.config?.method,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullUrl: `${error.config?.baseURL ?? ""}${error.config?.url ?? ""}`,
    });

    return;
  }

  if (error instanceof Error) {
    logger(label, {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    return;
  }

  logger(label, error);
}