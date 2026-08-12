import { apiClient } from "../../clients";
import type { AdminTeam } from "../../types";

export async function getTeams(): Promise<AdminTeam[]> {
  const response = await apiClient.get("/teams");

  return response.data.data;
}

export type UpdateTeamData = {
  name: string;
  role: string;
  image?: File;
};

type CreateTeamData = {
  name: string;
  role: string;
  image: File;
};

export async function createTeam(data: CreateTeamData) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("role", data.role);
  formData.append("image", data.image);

  const response = await apiClient.post("/teams", formData);

  return response.data;
}

export async function updateTeamStatus(
  id: string,
  status: "PUBLISHED" | "UNPUBLISHED",
) {
  const response = await apiClient.patch(`/teams/${id}/status`, {
    status,
  });

  return response.data;
}

export async function updateTeam(id: string, data: UpdateTeamData) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("role", data.role);

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await apiClient.put(`/teams/${id}`, formData);

  return response.data;
}

export async function deleteTeam(id: string) {
  const response = await apiClient.delete(`/teams/${id}`);

  return response.data;
}
