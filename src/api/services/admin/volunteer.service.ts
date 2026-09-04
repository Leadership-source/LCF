import { apiClient } from "../../clients";

export type VolunteerApplication = {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  areaOfInterest: string;
  availability: string;
  details: Record<string, string>;
  message?: string | null;
  status: string;
  isRead: boolean;
  createdAt: string;
};

type VolunteerApplicationsResponse = {
  data?: VolunteerApplication[];
};

export async function getVolunteerApplications(): Promise<VolunteerApplication[]> {
  const response = await apiClient.get<VolunteerApplicationsResponse | VolunteerApplication[]>(
    "/volunteers/admin",
  );

  return Array.isArray(response.data) ? response.data : response.data.data || [];
}

export async function markVolunteerApplicationRead(id: string): Promise<void> {
  await apiClient.patch(`/volunteers/admin/${id}/read`);
}