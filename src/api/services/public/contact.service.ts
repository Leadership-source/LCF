import { apiClient } from "../../clients";
export type ContactFormData = {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export const sendContactMessage = async (data: ContactFormData) => {
  const response = await apiClient.post("/contact", data);

  return response.data;
};
