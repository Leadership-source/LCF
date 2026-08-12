import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, ArrowLeft } from "lucide-react";

import { resetPassword } from "../../api/services/admin/auth.service";
import { ADMIN_ROUTES } from "../../constants/routes";
import { getErrorMessage } from "../../lib/getErrorMessage";

type FormErrors = {
  password?: string;
  confirmPassword?: string;
  token?: string;
  general?: string;
};

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,

    onSuccess: (data) => {
      toast.success(data.message || "Password reset successfully");

      navigate(ADMIN_ROUTES.LOGIN, {
        replace: true,
      });
    },

    onError: (error: unknown) => {
      setErrors({
        general: getErrorMessage(error, "Unable to reset password"),
      });
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: FormErrors = {};

    // Token validation
    if (!token) {
      newErrors.token = "Invalid or missing reset token.";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Please enter your new password.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Clear previous API error
    setErrors({});

    resetPasswordMutation.mutate({
      token: token!,
      password,
    });
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    setErrors((prev) => ({
      ...prev,
      password: undefined,
      general: undefined,
    }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);

    setErrors((prev) => ({
      ...prev,
      confirmPassword: undefined,
      general: undefined,
    }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
            <Lock className="text-orange-500" size={26} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your new password below.
          </p>
        </div>

        {!token ? (
          <div className="text-center">
            <p className="text-sm text-red-500">
              {errors.token ||
                "This password reset link is invalid or missing."}
            </p>

            <Link
              to={ADMIN_ROUTES.FORGET_PASSWORD}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              <ArrowLeft size={16} />
              Request a new link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* API Error */}
            {errors.general && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {errors.general}
              </div>
            )}

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Enter new password"
                className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                placeholder="Confirm new password"
                className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resetPasswordMutation.isPending
                ? "Resetting..."
                : "Reset Password"}
            </button>
          </form>
        )}

        <Link
          to={ADMIN_ROUTES.LOGIN}
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition hover:text-orange-500"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
  );
}
