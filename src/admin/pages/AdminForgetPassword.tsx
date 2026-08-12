import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react";

import { forgotPassword } from "../../api/services/admin/auth.service";
import { ADMIN_ROUTES } from "../../constants/routes";
import { getErrorMessage } from "../../lib/getErrorMessage";

type FormErrors = {
  email?: string;
  general?: string;
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,

    onSuccess: (data) => {
      toast.success(data.message || "Password reset link sent successfully");

      setEmail("");
      setErrors({});
    },

    onError: (error: unknown) => {
      setErrors({
        general: getErrorMessage(error, "Unable to process request"),
      });
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    const newErrors: FormErrors = {};

    if (!cleanEmail) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Clear previous backend error before submitting again
    setErrors((prev) => ({
      ...prev,
      general: undefined,
    }));

    forgotPasswordMutation.mutate({
      email: cleanEmail,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
            <Mail className="text-orange-500" size={26} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                // Clear errors when user starts correcting the field
                setErrors((prev) => ({
                  ...prev,
                  email: undefined,
                  general: undefined,
                }));
              }}
              placeholder="admin@example.com"
              className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />

            {/* Email validation error */}
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Backend/API error */}
          {errors.general && (
            <p className="text-sm text-red-500">{errors.general}</p>
          )}

          <button
            type="submit"
            disabled={forgotPasswordMutation.isPending}
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {forgotPasswordMutation.isPending
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>

        {/* Back to login */}
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
