import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  loginAdmin,
  verifyAdminLogin,
} from "../../api/services/admin/auth.service";
import { ADMIN_ROUTES } from "../../constants/routes";
import { getErrorMessage } from "../../lib/getErrorMessage";

type FormErrors = {
  email?: string;
  password?: string;
  code?: string;
  general?: string;
};

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [challenge, setChallenge] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});

  const loginMutation = useMutation({
    mutationFn: loginAdmin,

    onSuccess: (data) => {
      if ("challenge" in data) {
        setChallenge(data.challenge);
        setCode("");
        setErrors({});
        return;
      }

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

  const verifyMutation = useMutation({
    mutationFn: () => verifyAdminLogin(challenge, code),
    onSuccess: (data) => {
      toast.success("Login successful");
      queryClient.setQueryData(["currentUser"], data.user);
      navigate(ADMIN_ROUTES.DASHBOARD, { replace: true });
    },
    onError: (error: unknown) => {
      setErrors({ code: getErrorMessage(error, "Invalid or expired security code.") });
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

  function handleVerify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cleanCode = code.trim();

    if (!/^\d{6}$/.test(cleanCode)) {
      setErrors({ code: "Enter the six-digit security code from your email." });
      return;
    }

    setErrors({});
    verifyMutation.mutate();
  }

  return (
    <div className="flex min-h-screen">
      {/* Left — hero panel */}
      <div
        className="relative hidden flex-1 flex-col justify-between p-12 lg:flex"
        style={{
          backgroundImage: "url('/Admin_Logo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#14171D]/70" />

        {/* Branding */}
        <div className="relative z-10">
          <span className="inline-block rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            LCF Admin
          </span>
        </div>

        {/* Quote */}
        <div className="relative z-10">
          <blockquote className="text-2xl font-semibold leading-snug text-white lg:text-3xl">
            "Empowering leaders, <br />
            transforming communities."
          </blockquote>
          <p className="mt-4 text-sm text-white/60">
            Leadership &amp; Community Foundation — Admin Portal
          </p>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 lg:w-[460px] lg:px-12">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to your admin dashboard
            </p>
          </div>

          {challenge ? (
            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Verify your login</h2>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Enter the six-digit code sent to your email. It expires in 10 minutes.
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Security code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value.replace(/\D/g, "").slice(0, 6));
                    setErrors((current) => ({ ...current, code: undefined }));
                  }}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  autoFocus
                  placeholder="000000"
                  className={`w-full rounded-xl border px-4 py-3 text-center text-xl tracking-[0.4em] outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 ${errors.code ? "border-red-500" : "border-gray-200"}`}
                />
                {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code}</p>}
              </div>

              <button
                type="submit"
                disabled={verifyMutation.isPending}
                className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {verifyMutation.isPending ? "Verifying..." : "Verify and sign in"}
              </button>

              <button
                type="button"
                onClick={() => { setChallenge(""); setCode(""); setErrors({}); }}
                className="w-full text-sm font-medium text-gray-500 hover:text-orange-500"
              >
                Use different credentials
              </button>
            </form>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="admin@example.com"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="••••••••"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* API/Login Error */}
            {errors.general && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {errors.general}
              </div>
            )}

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to={ADMIN_ROUTES.FORGET_PASSWORD}
                className="text-sm font-medium text-orange-500 hover:text-orange-600"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loginMutation.isPending ? "Signing in…" : "Sign In"}
            </button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
}
