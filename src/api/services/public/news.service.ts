import { apiClient } from "../../clients";

export type NewsArticle = {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string | null;
  image: string;
  excerpt: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function getPublicNews(): Promise<NewsArticle[]> {
  const response = await apiClient.get("/news/public");

  return response.data;
}

export async function getPublicNewsById(id: string): Promise<NewsArticle> {
  const response = await apiClient.get(`/news/${id}`);

  return response.data.data;
}
