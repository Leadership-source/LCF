import { apiClient } from "../../clients";

type Partner = {
  id: string;
  name: string;
  logo: string | null;
  websiteUrl: string | null;
  status: "PUBLISHED";
};

export async function getPublishedPartners(): Promise<Partner[]> {
  const response = await apiClient.get("/partners/published");

  return response.data.data;
}
