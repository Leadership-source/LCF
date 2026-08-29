import { apiClient } from "../../clients";

export type AdminNewsArticle = {
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

export type CreateNewsData = {
  title: string;
  category: string;
  image: File;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
};

export type UpdateNewsData = {
  title?: string;
  category?: string;
  image?: File;
  excerpt?: string;
  content?: string;
  readTime?: string;
  date?: string;
};

export async function getNews(): Promise<AdminNewsArticle[]> {
  const response = await apiClient.get("/news");

  return response.data;
}

export async function getNewsById(id: string): Promise<AdminNewsArticle> {
  const response = await apiClient.get(`/news/${id}`);

  return response.data;
}

export async function createNews(data: CreateNewsData) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("image", data.image);
  formData.append("excerpt", data.excerpt);
  formData.append("content", data.content);
  formData.append("readTime", data.readTime);
  formData.append("date", data.date);

  const response = await apiClient.post("/news", formData);

  return response.data;
}

export async function updateNews(id: string, data: UpdateNewsData) {
  const formData = new FormData();

  if (data.title !== undefined) {
    formData.append("title", data.title);
  }

  if (data.category !== undefined) {
    formData.append("category", data.category);
  }

  if (data.image) {
    formData.append("image", data.image);
  }

  if (data.excerpt !== undefined) {
    formData.append("excerpt", data.excerpt);
  }

  if (data.content !== undefined) {
    formData.append("content", data.content);
  }

  if (data.readTime !== undefined) {
    formData.append("readTime", data.readTime);
  }

  if (data.date !== undefined) {
    formData.append("date", data.date);
  }

  const response = await apiClient.patch(`/news/${id}`, formData);

  return response.data;
}

export async function updateNewsStatus(id: number, isPublished: boolean) {
  const response = await apiClient.patch(`/news/${id}/status`, {
    isPublished,
  });

  return response.data;
}

export async function deleteNews(id: number) {
  const response = await apiClient.delete(`/news/${id}`);

  return response.data;
}
