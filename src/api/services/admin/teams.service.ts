import { apiClient } from "../../clients";
import type { AdminTeam } from "../../types";

export async function getTeams(): Promise<AdminTeam[]> {
  const response = await apiClient.get("/teams");

  return response.data.data;
}

export type UpdateTeamData = {
  name: string;
  role: string;
  bio?: string;
  image?: File;
};

type CreateTeamData = {
  name: string;
  role: string;
  bio?: string;
  image: File;
};

export async function createTeam(data: CreateTeamData) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("role", data.role);
  if (data.bio !== undefined) formData.append("bio", data.bio);
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
  if (data.bio !== undefined) formData.append("bio", data.bio);

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

const ORDER_KEY = "lcf_team_order";

// Persists the ordered list of team IDs to localStorage
export function saveTeamOrder(ids: string[]): void {
  localStorage.setItem(ORDER_KEY, JSON.stringify(ids));
}

// Returns saved order array, or null if none saved yet
export function getSavedTeamOrder(): string[] | null {
  const raw = localStorage.getItem(ORDER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return null;
  }
}
