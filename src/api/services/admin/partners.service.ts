import { apiClient } from "../../clients";

export type PartnerStatus = "PUBLISHED" | "UNPUBLISHED";
export type AdminPartner = {
  id: string;
  name: string;
  logo: string | null;
  status: PartnerStatus;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function getPartners(): Promise<AdminPartner[]> {
  const response = await apiClient.get("/partners");

  return response.data.data;
}

export type CreatePartnerData = {
  name: string;
  logo?: File;
};

export async function createPartner(data: CreatePartnerData) {
  const formData = new FormData();

  formData.append("name", data.name);

  if (data.logo) {
    formData.append("logo", data.logo);
  }

  const response = await apiClient.post("/partners", formData);

  return response.data;
}

export type UpdatePartnerData = {
  name?: string;
  logo?: File;
};

export async function updatePartner(id: string, data: UpdatePartnerData) {
  const formData = new FormData();

  if (data.name !== undefined) {
    formData.append("name", data.name);
  }

  if (data.logo) {
    formData.append("logo", data.logo);
  }

  const response = await apiClient.put(`/partners/${id}`, formData);

  return response.data;
}

export async function updatePartnerStatus(
  id: string,
  status: "PUBLISHED" | "UNPUBLISHED",
) {
  const response = await apiClient.patch(`/partners/${id}/status`, { status });

  return response.data;
}

export async function deletePartner(id: string) {
  const response = await apiClient.delete(`/partners/${id}`);

  return response.data;
}
