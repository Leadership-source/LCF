import { apiClient } from "../../clients";

export type QuoteInvitationDetails = {
  email: string;
  expiresAt: string;
};

export type SubmitQuoteInvitationData = {
  name: string;
  role: string;
  quote: string;
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
  const response = await apiClient.post(
    `/quotes/invitations/${token}/submit`,
    data,
  );

  return response.data;
}
