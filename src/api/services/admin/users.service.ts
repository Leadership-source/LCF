import { apiClient } from "../../clients";
import type { UserRole } from "./auth.service";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAT: string;
};

export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export async function getUsers(): Promise<AdminUser[]> {
  const response = await apiClient.get("/admin/users");
  return response.data.users;
}

export async function createUser(data: CreateUserPayload): Promise<AdminUser> {
  const response = await apiClient.post("/admin/users", data);
  return response.data.user;
}

export async function deleteUser(id: string): Promise<void> {
  await apiClient.delete(`/admin/users/${id}`);
}

export async function updateUserRole(
  id: string,
  role: UserRole,
): Promise<AdminUser> {
  const response = await apiClient.patch(`/admin/users/${id}/role`, { role });
  return response.data.user;
}
