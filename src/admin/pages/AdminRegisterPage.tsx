import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerAdmin } from "../../api/services/admin/auth.service";
import { ADMIN_ROUTES } from "../../constants/routes";
import { getErrorMessage } from "../../lib/getErrorMessage";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

export default function AdminRegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});

  const registerMutation = useMutation({
    mutationFn: registerAdmin,

    onSuccess: () => {
      toast.success("Account created successfully. Please login.");

      navigate(ADMIN_ROUTES.LOGIN, {
        replace: true,
      });
    },

    onError: (error: unknown) => {
      setErrors({
        general: getErrorMessage(error, "Registration failed. Please try again."),
      });
    },
  });

  // --------------------------------
  // Validation
  // --------------------------------

  const validateForm = () => {
    const newErrors: FormErrors = {};

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    // Name
    if (!cleanName) {
      newErrors.name = "Please enter your full name.";
    } else if (cleanName.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    // Email
    if (!cleanEmail) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password
    if (!password) {
      newErrors.password = "Please enter a password.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    // Confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return {
      isValid: Object.keys(newErrors).length === 0,
      cleanName,
      cleanEmail,
    };
  };

  // --------------------------------
  // Submit
  // --------------------------------

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { isValid, cleanName, cleanEmail } = validateForm();

    if (!isValid) return;

    // Clear previous API error
    setErrors((prev) => ({
      ...prev,
      general: undefined,
    }));

    registerMutation.mutate({
      name: cleanName,
      email: cleanEmail,
      password,
    });
  }

  // --------------------------------
  // Field error clearing
  // --------------------------------

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
      general: undefined,
    }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create Admin Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create an account to access the admin dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearError("name");
              }}
              placeholder="Enter your name"
              className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError("email");
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
                clearError("password");
              }}
              placeholder="At least 8 characters"
              className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearError("confirmPassword");
              }}
              placeholder="Confirm your password"
              className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* API Error */}
          {errors.general && (
            <p className="text-center text-sm text-red-500">{errors.general}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {registerMutation.isPending
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/admin/login"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
