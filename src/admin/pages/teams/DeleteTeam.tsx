import { AlertTriangle, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteTeam } from "../../../api/services/admin/teams.service";

import type { AdminTeam } from "../../../api/types";

type DeleteTeamProps = {
  team: AdminTeam;
  onClose: () => void;
};

export function DeleteTeam({ team, onClose }: DeleteTeamProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteTeam(team.id),

    onSuccess: (response) => {
      toast.success(response.message || "Team member deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.setQueryData<AdminTeam[]>(["admin-teams"], (oldTeams = []) =>
        oldTeams.filter((item) => item.id !== team.id),
      );

      onClose();
    },

    onError: (error: any) => {
      console.error("DELETE TEAM ERROR:", error.response?.data);

      toast.error(
        error?.response?.data?.message || "Failed to delete team member",
      );
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle size={22} className="text-red-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold">Delete Team Member</h2>

              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message */}
        <div className="mt-6">
          <p className="text-gray-700">
            Are you sure you want to delete <strong>{team.name}</strong>?
          </p>

          <p className="mt-2 text-sm text-gray-500">
            This team member will be permanently removed.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="w-full rounded-lg border border-gray-300 py-3 font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
