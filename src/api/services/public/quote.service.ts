import { apiClient } from "../../clients";

export type PublicQuote = {
  id: string;
  name: string;
  role: string;
  quote: string;
  publishedAt?: string | null;
};

export async function getPublishedQuotes(): Promise<PublicQuote[]> {
  const response = await apiClient.get("/quotes/published");

  return response.data.data;
}
