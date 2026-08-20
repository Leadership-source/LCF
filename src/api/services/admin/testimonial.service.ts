import { apiClient } from "../../clients";

export type TestimonialStatus = "PENDING" | "APPROVED" | "REJECTED";

export type AdminTestimonial = {
  id: string;
  name: string;
  role: string;
  message: string;
  status: TestimonialStatus;
  createdAt: string;
  approvedAt: string | null;
  approvedBy: string | null;
  userId: string | null;
};

export async function getTestimonials(): Promise<AdminTestimonial[]> {
  const response = await apiClient.get("/testimonials/admin");

  console.log("ADMIN TESTIMONIAL RESPONSE:", response.data);

  return response.data.testimonials;
}

export async function approveTestimonial(id: string) {
  const response = await apiClient.patch(`/testimonials/admin/${id}/approve`);

  return response.data.data;
}

export async function rejectTestimonial(id: string) {
  const response = await apiClient.patch(`/testimonials/admin/${id}/reject`);

  return response.data.data;
}

export async function deleteTestimonial(id: string) {
  const response = await apiClient.delete(`/testimonials/admin/${id}`);

  return response.data.data;
}
