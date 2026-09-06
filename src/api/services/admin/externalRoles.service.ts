import { apiClient } from "../../clients";
import type { ExternalRoleType } from "../public/externalRoles.service";

export type ExternalRoleStatus = "PUBLISHED" | "UNPUBLISHED";

export type AdminExternalRole = {
  id: string;
  name: string;
  roleType: ExternalRoleType;
  bio?: string | null;
  image: string;
  displayOrder: number;
  status: ExternalRoleStatus;
  createdAt: string;
  updatedAt: string;
};

type RolesResponse = { data: AdminExternalRole[] };

export async function getExternalRoles(): Promise<AdminExternalRole[]> {
  const response = await apiClient.get<RolesResponse>("/external-roles");
  return response.data.data;
}

function toFormData(data: {
  name?: string;
  roleType?: ExternalRoleType;
  bio?: string;
  displayOrder?: number;
  image?: File;
}) {
  const formData = new FormData();
  if (data.name !== undefined) formData.append("name", data.name);
  if (data.roleType !== undefined) formData.append("roleType", data.roleType);
  if (data.bio !== undefined) formData.append("bio", data.bio);
  if (data.displayOrder !== undefined) formData.append("displayOrder", String(data.displayOrder));
  if (data.image) formData.append("image", data.image);
  return formData;
}

export async function createExternalRole(data: {
  name: string;
  roleType: ExternalRoleType;
  bio: string;
  displayOrder: number;
  image: File;
}) {
  const response = await apiClient.post("/external-roles", toFormData(data));
  return response.data;
}

export async function updateExternalRole(id: string, data: Parameters<typeof toFormData>[0]) {
  const response = await apiClient.put(`/external-roles/${id}`, toFormData(data));
  return response.data;
}

export async function updateExternalRoleStatus(id: string, status: ExternalRoleStatus) {
  const response = await apiClient.patch(`/external-roles/${id}/status`, { status });
  return response.data;
}

export async function deleteExternalRole(id: string) {
  const response = await apiClient.delete(`/external-roles/${id}`);
  return response.data;
}