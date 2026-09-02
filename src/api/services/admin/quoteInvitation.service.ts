import { apiClient } from "../../clients";

export type QuoteInvitation = {
  id: string;
  email: string;
  expiresAt: string;
};

export type CreateQuoteInvitationData = {
  email: string;
};

export type QuoteInvitationResponse = {
  status: string;
  message: string;
  data: QuoteInvitation;
};

export async function createQuoteInvitation(
  data: CreateQuoteInvitationData,
): Promise<QuoteInvitationResponse> {
  const response = await apiClient.post("/quotes/invitations", data);

  return response.data;
}

export type QuoteInvitationStatus =
  | "PENDING"
  | "USED"
  | "EXPIRED"
  | "CANCELLED";

export type AdminQuoteInvitation = {
  id: string;
  email: string;
  createdAt: string;
  expiresAt: string;
  usedAt?: string | null;
  status: QuoteInvitationStatus;
};

export async function getQuoteInvitations(): Promise<AdminQuoteInvitation[]> {
  const response = await apiClient.get("/quotes/invitations");

  return response.data.data;
}

export async function resendQuoteInvitation(id: string) {
  const response = await apiClient.post(`/quotes/invitations/${id}/resend`);

  return response.data;
}

export async function deleteQuoteInvitation(id: string) {
  const response = await apiClient.delete(`/quotes/invitations/${id}`);

  return response.data;
}
