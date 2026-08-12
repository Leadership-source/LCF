import type { AxiosError } from "axios";

type ApiErrorBody = {
  message?: string;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
};

export function getErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  const axiosError = error as AxiosError<ApiErrorBody>;
  const data = axiosError?.response?.data;

  if (data?.message) return data.message;
  if (data?.error) return data.error;
  if (Array.isArray(data?.errors) && data.errors.length > 0) return data.errors[0].message;
  return fallback;
}
