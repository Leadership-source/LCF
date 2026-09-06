import { apiClient } from "../../clients";

export const externalRoleTypes = [
  "ADVISOR",
  "PATRON",
  "BRAND_AMBASSADOR",
  "HONORARY_SUPPORTER",
  "MENTEE",
] as const;

export type ExternalRoleType = (typeof externalRoleTypes)[number];

export type PublicExternalRole = {
  id: string;
  name: string;
  roleType: ExternalRoleType;
  bio?: string | null;
  image: string;
  displayOrder: number;
};

type ExternalRolesResponse = {
  data: PublicExternalRole[];
};

export async function getPublishedExternalRoles(): Promise<PublicExternalRole[]> {
  const response = await apiClient.get<ExternalRolesResponse>(
    "/external-roles/public",
  );

  return response.data.data;
}