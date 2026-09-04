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
};

type VolunteerSubmissionResponse = {
  message?: string;
};

export async function getVolunteerOptions(): Promise<VolunteerOption[]> {
  const response = await apiClient.get<VolunteerOptionsResponse>(
    "/volunteers/options",
  );

  return response.data.options;
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