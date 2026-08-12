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
