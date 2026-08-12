import { apiClient } from "../../clients";
import type { Team } from "../../types";

export async function getPublishedTeams(): Promise<Team[]> {
  const response = await apiClient.get("/teams/public");

  return response.data.data;
}
