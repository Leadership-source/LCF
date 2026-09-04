import { apiClient } from "../../clients";

export type VolunteerField = {
  name: string;
  label: string;
  type: "text" | "textarea";
  required: boolean;
};

export type VolunteerOption = {
  value: string;
  label: string;
  fields: VolunteerField[];
};

export type AvailabilityOption = {
  value: string;
  label: string;
};

export type VolunteerFormData = {
  fullName: string;
  email: string;
  phone?: string;
  areaOfInterest: string;
  availability: string;
  details: Record<string, string>;
  message?: string;
};

type VolunteerOptionsResponse = {
  options: VolunteerOption[];
  availabilityOptions: AvailabilityOption[];
};

type VolunteerSubmissionResponse = {
  message?: string;
};

export async function getVolunteerOptions(): Promise<VolunteerOptionsResponse> {
  const response = await apiClient.get<VolunteerOptionsResponse>(
    "/volunteers/options",
  );

  return response.data;
}

export async function submitVolunteerApplication(
  data: VolunteerFormData,
): Promise<VolunteerSubmissionResponse> {
  const response = await apiClient.post<VolunteerSubmissionResponse>(
    "/volunteers",
    data,
  );

  return response.data;
}