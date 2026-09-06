import { Trash2, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  deletePartner,
  type AdminPartner,
} from "../../../api/services/admin/partners.service";

type DeletePartnerProps = {
  partner: AdminPartner;
  onClose: () => void;
};

export function DeletePartner({ partner, onClose }: DeletePartnerProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deletePartner(partner.id),

    onSuccess: (response) => {
      toast.success(response.message || "Partner deleted successfully");

      queryClient.setQueryData<AdminPartner[]>(
        ["admin-partners"],
        (oldPartners = []) =>
          oldPartners.filter((item) => item.id !== partner.id),
      );

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      onClose();
    },

    onError: (error: any) => {
      console.error("DELETE PARTNER ERROR:", error?.response?.data);

      toast.error(error?.response?.data?.message || "Failed to delete partner");
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
            <Trash2 size={20} className="text-red-500" />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5">
          <h2 className="text-xl font-bold text-gray-900">Delete Partner</h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">{partner.name}</span>?
            This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="w-full rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="w-full rounded-lg bg-red-500 py-3 font-semibold text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Partner"}
          </button>
        </div>
      </div>
    </div>
  );
}
