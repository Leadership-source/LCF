import { apiClient, TOKEN_KEY } from "../../clients";
export type LoginPayload = {
  email: string;
  password: string;
};

export type UserRole = "USER" | "ADMIN" | "SUPERADMIN";

export type LoginResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
};

export type LoginVerificationRequiredResponse = {
  status: "verification_required";
  message: string;
  challenge: string;
};

export async function loginAdmin(
  payload: LoginPayload,
): Promise<LoginResponse | LoginVerificationRequiredResponse> {
  const response = await apiClient.post("/auth/login", payload);

  if (response.data.token) {
    localStorage.setItem(TOKEN_KEY, response.data.token);
  }

  return response.data;
}

export async function verifyAdminLogin(challenge: string, code: string) {
  const response = await apiClient.post<LoginResponse>("/auth/login/verify", {
    challenge,
    code,
  });

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
