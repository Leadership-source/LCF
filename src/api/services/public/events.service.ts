import { apiClient } from "../../clients";
import type { Event } from "../../types";

export async function getPublicEvents(): Promise<Event[]> {
  const response = await apiClient.get("/events/public");

  return response.data.data;
}

export async function getEvent(id: string): Promise<Event> {
  const response = await apiClient.get(`/events/${id}`);

  return response.data.data;
}

export async function registerForEvent(
  eventId: string,
  data: { name: string; email: string; phone?: string },
) {
  const response = await apiClient.post(`/events/${eventId}/register`, data);
  return response.data;
}
