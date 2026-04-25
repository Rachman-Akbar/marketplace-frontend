import axios from "axios";

export function logApiError(label: string, error: unknown) {
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