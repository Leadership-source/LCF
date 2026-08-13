import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginAdmin } from "../../api/services/admin/auth.service";
import { ADMIN_ROUTES } from "../../constants/routes";
import { getErrorMessage } from "../../lib/getErrorMessage";

type FormErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});

  const loginMutation = useMutation({
    mutationFn: loginAdmin,

    onSuccess: (data) => {
      toast.success("Login successful");

      queryClient.setQueryData(["currentUser"], data.user);

      navigate(ADMIN_ROUTES.DASHBOARD, {
        replace: true,
      });
    },

    onError: (error: unknown) => {
      setErrors({
        general: getErrorMessage(error, "Invalid email or password"),
      });
    },
  });

  // --------------------------------
  // Email change
  // --------------------------------

  const handleEmailChange = (value: string) => {
    setEmail(value);

    setErrors((prev) => ({
      ...prev,
      email: undefined,
      general: undefined,
    }));
  };

  // --------------------------------
  // Password change
  // --------------------------------

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    setErrors((prev) => ({
      ...prev,
      password: undefined,
      general: undefined,
    }));
  };

  // --------------------------------
  // Validation
  // --------------------------------

  const validateForm = () => {
    const newErrors: FormErrors = {};

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // Email
    if (!cleanEmail) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password
    if (!cleanPassword) {
      newErrors.password = "Please enter your password.";
    }

    setErrors(newErrors);

    return {
      isValid: Object.keys(newErrors).length === 0,
      cleanEmail,
      cleanPassword,
    };
  };

  // --------------------------------
  // Submit
  // --------------------------------

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { isValid, cleanEmail, cleanPassword } = validateForm();

    if (!isValid) return;

    // Clear any previous API error
    setErrors((prev) => ({
      ...prev,
      general: undefined,
    }));

    loginMutation.mutate({
      email: cleanEmail,
      password: cleanPassword,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="admin@example.com"
              className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="Enter your password"
              className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* API/Login Error */}
          {errors.general && (
            <p className="text-center text-sm text-red-500">{errors.general}</p>
          )}

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to={ADMIN_ROUTES.FORGET_PASSWORD}
              className="text-sm font-semibold text-orange-500 hover:text-orange-600"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

    </div>
  );
}
