import { apiClient } from "../../clients";

export type Notification = {
  id: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  userId: string;
};

export async function getNotifications(): Promise<Notification[]> {
  const response = await apiClient.get("/notifications");

  return response.data.data;
}

export async function markNotificationAsRead(id: string) {
  const response = await apiClient.patch(`/notifications/${id}/read`);

  return response.data.data;
}

export async function markAllNotificationsAsRead() {
  const response = await apiClient.patch("/notifications/read-all");

  return response.data;
}

export async function deleteNotification(id: string) {
  const response = await apiClient.delete(`/notifications/${id}`);

  return response.data;
}

export async function deleteAllNotifications() {
  const response = await apiClient.delete("/notifications/clear-all");

  return response.data;
}
