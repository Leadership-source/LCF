import { apiClient } from "../../clients";

export type QuoteStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

export type QuoteSource = "ADMIN" | "INVITATION";

export type AdminQuote = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image?: string | null;
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
  image?: File;
};

export type UpdateQuoteData = {
  name?: string;
  role?: string;
  quote?: string;
  image?: File;
};

function createQuoteFormData(data: CreateQuoteData | UpdateQuoteData) {
  const formData = new FormData();

  if (data.name !== undefined) formData.append("name", data.name);
  if (data.role !== undefined) formData.append("role", data.role);
  if (data.quote !== undefined) formData.append("quote", data.quote);
  if (data.image) formData.append("image", data.image);

  return formData;
}

export async function getQuotes(): Promise<AdminQuote[]> {
  const response = await apiClient.get("/quotes");

  return response.data.data;
}

export async function getQuote(id: string): Promise<AdminQuote> {
  const response = await apiClient.get(`/quotes/${id}`);

  return response.data.data;
}

export async function createQuote(data: CreateQuoteData) {
  const response = await apiClient.post("/quotes", createQuoteFormData(data));

  return response.data;
}

export async function updateQuote(id: string, data: UpdateQuoteData) {
  const response = await apiClient.put(
    `/quotes/${id}`,
    createQuoteFormData(data),
  );

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
