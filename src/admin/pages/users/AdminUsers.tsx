import { useState } from "react";
import { UserPlus, Users, Shield, ShieldCheck, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { AddUser } from "./AddUser";
import {
  getUsers,
  deleteUser,
  updateUserRole,
} from "../../../api/services/admin/users.service";
import type { UserRole } from "../../../api/services/admin/auth.service";
import { getErrorMessage } from "../../../lib/getErrorMessage";

const ROLE_BADGE: Record<UserRole, string> = {
  USER: "bg-gray-100 text-gray-700",
  ADMIN: "bg-blue-100 text-blue-700",
  SUPERADMIN: "bg-orange-100 text-orange-700",
};

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [showAddUser, setShowAddUser] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["admin-users"],
    queryFn: getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setDeletingId(null);
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to delete user"));
      setDeletingId(null);
    },
  });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      updateUserRole(id, role),
    onSuccess: () => {
      toast.success("Role updated");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to update role"));
    },
  });

  const totalAdmins = users.filter((u) => u.role === "ADMIN").length;
  const totalSuperAdmins = users.filter((u) => u.role === "SUPERADMIN").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage admin accounts — Superadmin only
          </p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-100 p-2">
              <Users size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <Shield size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Admins</p>
              <p className="text-2xl font-bold text-gray-900">{totalAdmins}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-2">
              <ShieldCheck size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Superadmins</p>
              <p className="text-2xl font-bold text-gray-900">{totalSuperAdmins}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">
            Loading users...
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-16 text-red-500">
            Failed to load users. You may not have permission to view this page.
          </div>
        ) : users.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-gray-400">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Created</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        disabled={roleMutation.isPending}
                        onChange={(e) =>
                          roleMutation.mutate({
                            id: user.id,
                            role: e.target.value as UserRole,
                          })
                        }
                        className={`rounded-full px-3 py-1 text-xs font-semibold outline-none cursor-pointer ${ROLE_BADGE[user.role]}`}
                      >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="SUPERADMIN">Superadmin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAT).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {deletingId === user.id ? (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-600">Confirm?</span>
                          <button
                            onClick={() => deleteMutation.mutate(user.id)}
                            disabled={deleteMutation.isPending}
                            className="font-semibold text-red-600 hover:underline disabled:opacity-50"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="font-semibold text-gray-500 hover:underline"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeletingId(user.id)}
                          className="text-gray-400 hover:text-red-600"
                          title="Delete user"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddUser && <AddUser onClose={() => setShowAddUser(false)} />}
    </div>
  );
}
