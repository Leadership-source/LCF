import { apiClient } from "../../clients";

export type QuoteInvitationDetails = {
  email: string;
  expiresAt: string;
};

export type SubmitQuoteInvitationData = {
  name: string;
  role: string;
  quote: string;
  image?: File;
};

export async function getQuoteInvitation(
  token: string,
): Promise<QuoteInvitationDetails> {
  const response = await apiClient.get(`/quotes/invitations/${token}`);

  return response.data.data;
}

export async function submitQuoteInvitation(
  token: string,
  data: SubmitQuoteInvitationData,
) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("role", data.role);
  formData.append("quote", data.quote);
  if (data.image) formData.append("image", data.image);

  const response = await apiClient.post(`/quotes/invitations/${token}/submit`, formData);

  return response.data;
}
