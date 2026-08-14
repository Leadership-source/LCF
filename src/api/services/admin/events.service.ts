import { apiClient } from "../../clients";
import type { AdminEvent } from "../../types";

export async function getEvents(): Promise<AdminEvent[]> {
  const response = await apiClient.get("/events");

  return response.data.data;
}

export type CreateEventData = {
  category: string;
  title: string;
  image: File;
  location: string;
  date: string;
  time: string;
  description: string;
  speaker: string;
  venue: string;
  attendees: string;
  agenda: string[];
};

export async function createEvent(data: CreateEventData) {
  const formData = new FormData();

  formData.append("category", data.category);
  formData.append("title", data.title);
  formData.append("image", data.image);
  formData.append("location", data.location);
  formData.append("date", data.date);
  formData.append("time", data.time);
  formData.append("description", data.description);
  formData.append("speaker", data.speaker);
  formData.append("venue", data.venue);
  formData.append("attendees", data.attendees);

  // Send agenda as JSON string
  formData.append("agenda", JSON.stringify(data.agenda));

  const response = await apiClient.post("/events", formData);

  return response.data;
}

export type UpdateEventData = {
  category?: string;
  title?: string;
  image?: File;
  location?: string;
  date?: string;
  time?: string;
  description?: string;
  speaker?: string;
  venue?: string;
  attendees?: string;
  agenda?: string[];
};

export async function updateEvent(id: string, data: UpdateEventData) {
  const formData = new FormData();

  if (data.category !== undefined) {
    formData.append("category", data.category);
  }

  if (data.title !== undefined) {
    formData.append("title", data.title);
  }

  if (data.image) {
    formData.append("image", data.image);
  }

  if (data.location !== undefined) {
    formData.append("location", data.location);
  }

  if (data.date !== undefined) {
    formData.append("date", data.date);
  }

  if (data.time !== undefined) {
    formData.append("time", data.time);
  }

  if (data.description !== undefined) {
    formData.append("description", data.description);
  }

  if (data.speaker !== undefined) {
    formData.append("speaker", data.speaker);
  }

  if (data.venue !== undefined) {
    formData.append("venue", data.venue);
  }

  if (data.attendees !== undefined) {
    formData.append("attendees", data.attendees);
  }

  if (data.agenda !== undefined) {
    formData.append("agenda", JSON.stringify(data.agenda));
  }

  const response = await apiClient.put(`/events/${id}`, formData);

  return response.data;
}

export async function updateEventStatus(
  id: string,
  status: "PUBLISHED" | "UNPUBLISHED",
) {
  const response = await apiClient.patch(`/events/${id}/status`, {
    status,
  });

  return response.data;
}

export async function deleteEvent(id: string) {
  const response = await apiClient.delete(`/events/${id}`);
  return response.data;
}

export type EventAttendee = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  registeredAt: string;
};

export type EventAttendeesResponse = {
  event: { id: string; title: string; date: string; location: string };
  total: number;
  attendees: EventAttendee[];
};

export async function getEventAttendees(
  id: string,
): Promise<EventAttendeesResponse> {
  const response = await apiClient.get(`/events/${id}/attendees`);
  return response.data;
}
