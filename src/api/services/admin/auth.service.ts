import { apiClient, TOKEN_KEY } from "../../clients";
export type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
};

export async function loginAdmin(
  payload: LoginPayload,
): Promise<LoginResponse> {
  const response = await apiClient.post("/auth/login", payload);
  localStorage.setItem(TOKEN_KEY, response.data.token);
  return response.data;
}

export async function logoutAdmin() {
  localStorage.removeItem(TOKEN_KEY);
  const response = await apiClient.post("/auth/logout");
  return response.data;
}

export async function getCurrentUser() {
  const response = await apiClient.get("/auth/me");

  return response.data.user;
}

export async function registerAdmin(data: RegisterPayload) {
  const response = await apiClient.post("/auth/register", data);

  return response.data;
}

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export async function changePassword(data: ChangePasswordPayload) {
  const response = await apiClient.put("/auth/change-password", data);

  return response.data;
}

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
};

export async function forgotPassword(payload: ForgotPasswordPayload) {
  const response = await apiClient.post("/auth/forgot-password", payload);

  return response.data;
}

export async function resetPassword(payload: ResetPasswordPayload) {
  const { token, password } = payload;

  const response = await apiClient.post(`/auth/reset-password/${token}`, {
    password,
  });

  return response.data;
}
