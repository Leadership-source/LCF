import { apiClient } from "../../clients";

export type QuoteStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

export type QuoteSource = "ADMIN" | "INVITATION";

export type AdminQuote = {
  id: string;
  name: string;
  role: string;
  quote: string;
  status: QuoteStatus;
  source: QuoteSource;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string | null;
  reviewedBy?: string | null;
  publishedAt?: string | null;
};

export type CreateQuoteData = {
  name: string;
  role: string;
  quote: string;
};

export type UpdateQuoteData = {
  name?: string;
  role?: string;
  quote?: string;
};

export async function getQuotes(): Promise<AdminQuote[]> {
  const response = await apiClient.get("/quotes");

  return response.data.data;
}

export async function getQuote(id: string): Promise<AdminQuote> {
  const response = await apiClient.get(`/quotes/${id}`);

  return response.data.data;
}

export async function createQuote(data: CreateQuoteData) {
  const response = await apiClient.post("/quotes", data);

  return response.data;
}

export async function updateQuote(id: string, data: UpdateQuoteData) {
  const response = await apiClient.put(`/quotes/${id}`, data);

  return response.data;
}

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  const response = await apiClient.patch(`/quotes/${id}/status`, { status });

  return response.data;
}

export async function deleteQuote(id: string) {
  const response = await apiClient.delete(`/quotes/${id}`);

  return response.data;
}
