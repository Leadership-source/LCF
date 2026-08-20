import { apiClient } from "../../clients";

export type CreateTestimonialPayload = {
  name: string;
  role: string;
  message: string;
};

export type PublicTestimonial = {
  id: string;
  name: string;
  role: string;
  message: string;
  approvedAt: string | null;
};

export async function createTestimonial(payload: CreateTestimonialPayload) {
  const response = await apiClient.post("/testimonials", payload);

  return response.data;
}

export async function getPublishedTestimonials(): Promise<PublicTestimonial[]> {
  const response = await apiClient.get("/testimonials/approved");

  return response.data.testimonials;
}
