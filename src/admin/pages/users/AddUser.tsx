import { useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUser } from "../../../api/services/admin/users.service";
import type { UserRole } from "../../../api/services/admin/auth.service";
import { getErrorMessage } from "../../../lib/getErrorMessage";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
};

type Props = { onClose: () => void };

export function AddUser({ onClose }: Props) {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generatePassword, setGeneratePassword] = useState(true);
  const [role, setRole] = useState<UserRole>("USER");
  const [errors, setErrors] = useState<FormErrors>({});

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (response) => {
      toast.success(
        response.emailSent
          ? "User created and welcome email sent."
          : "User created, but the welcome email could not be delivered.",
      );
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      onClose();
    },
    onError: (error: unknown) => {
      setErrors({ general: getErrorMessage(error, "Failed to create user") });
    },
  });

  const validate = () => {
    const errs: FormErrors = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Enter a valid email address.";
    if (!generatePassword && !password) errs.password = "Password is required.";
    else if (!generatePassword && password.length < 6) errs.password = "Minimum 6 characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setErrors({});
    mutation.mutate({
      name: name.trim(),
      email: email.trim(),
      role,
      ...(generatePassword ? {} : { password }),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Create User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
              placeholder="Jane Doe"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-orange-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              placeholder="jane@example.com"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-orange-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="flex items-start gap-3 rounded-lg bg-orange-50 p-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={generatePassword}
                onChange={(event) => {
                  setGeneratePassword(event.target.checked);
                  setErrors((current) => ({ ...current, password: undefined }));
                }}
                className="mt-0.5 accent-orange-500"
              />
              <span>
                <span className="block font-medium">Generate and email a temporary password</span>
                <span className="mt-1 block text-xs text-gray-500">The API will create the password and send onboarding instructions to the user.</span>
              </span>
            </label>
            {!generatePassword && (
              <>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                  placeholder="Minimum 6 characters"
                  className={`mt-3 w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-orange-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPERADMIN">Superadmin</option>
            </select>
          </div>

          {errors.general && (
            <p className="text-center text-sm text-red-500">{errors.general}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {mutation.isPending ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
