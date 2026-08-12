import { useQuery, useMutation } from "@tanstack/react-query";
import { LogOut, User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  logoutAdmin,
} from "../../../api/services/admin/auth.service";
import { ADMIN_ROUTES } from "../../../constants/routes";
import { getErrorMessage } from "../../../lib/getErrorMessage";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";

export default function Settings() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutAdmin,

    onSuccess: () => {
      toast.success("Logged out successfully");

      navigate(ADMIN_ROUTES.LOGIN, {
        replace: true,
      });
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to logout"));
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your account and admin settings.
        </p>
      </div>

      {/* Account Information */}
      <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            Account Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View your admin account information.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3">
              <User size={18} className="text-gray-400" />

              <span className="text-gray-700">{user?.name || "N/A"}</span>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3">
              <Mail size={18} className="text-gray-400" />

              <span className="text-gray-700">{user?.email || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            Password & Security
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your account security.
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-3">
              <Lock size={20} className="text-orange-500" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Password</h3>

              <p className="text-sm text-gray-500">
                Change your account password.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowChangePassword(true)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Session */}
      <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">Session</h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your current admin session.
          </p>
        </div>

        <button
          type="button"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut size={18} />

          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
}
