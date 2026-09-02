import { AlertTriangle, X } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  deleteQuote,
} from "../../../api/services/admin/quote.service";

import type { AdminQuote } from "../../../api/services/admin/quote.service";

import { getErrorMessage } from "../../../lib/getErrorMessage";

type DeleteQuoteProps = {
  quote: AdminQuote;
  onClose: () => void;
};

export function DeleteQuote({
  quote,
  onClose,
}: DeleteQuoteProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteQuote(quote.id),

    onSuccess: (response) => {
      toast.success(
        response?.message ||
          "Quote deleted successfully",
      );

      // Update notifications if your backend
      // creates a notification for quote deletion.
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      // Remove deleted quote immediately from cache.
      queryClient.setQueryData<AdminQuote[]>(
        ["admin-quotes"],
        (oldQuotes = []) =>
          oldQuotes.filter(
            (item) => item.id !== quote.id,
          ),
      );

      onClose();
    },

    onError: (error: unknown) => {
      console.error(
        "DELETE QUOTE ERROR:",
        error,
      );

      toast.error(
        getErrorMessage(
          error,
          "Failed to delete quote",
        ),
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
              <AlertTriangle
                size={22}
                className="text-red-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Delete Quote
              </h2>

              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="rounded-lg p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>

        </div>

        {/* Message */}
        <div className="mt-6">

          <p className="text-gray-700">
            Are you sure you want to delete the
            quote from{" "}
            <strong>{quote.name}</strong>?
          </p>

          <p className="mt-2 text-sm text-gray-500">
            This quote will be permanently removed.
          </p>

        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">

          <button
            type="button"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="w-full rounded-lg border border-gray-300 py-3 font-semibold hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() =>
              deleteMutation.mutate()
            }
            disabled={deleteMutation.isPending}
            className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleteMutation.isPending
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}