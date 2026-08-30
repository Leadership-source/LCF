import { AlertTriangle, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  deleteNews,
  type AdminNewsArticle,
} from "../../../api/services/admin/news.service";

type DeleteNewsProps = {
  article: AdminNewsArticle;
  onClose: () => void;
};

export function DeleteNews({ article, onClose }: DeleteNewsProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteNews(article.id),

    onSuccess: (response) => {
      toast.success(response?.message || "News article deleted successfully");

      // Remove the deleted article immediately from the table
      queryClient.setQueryData<AdminNewsArticle[]>(
        ["admin-news"],
        (oldNews = []) => oldNews.filter((item) => item.id !== article.id),
      );

      // Refresh notifications if your app uses them
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      onClose();
    },

    onError: (error: any) => {
      console.error("DELETE NEWS ERROR:", error?.response?.data || error);

      toast.error(
        error?.response?.data?.message || "Failed to delete news article",
      );
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

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
              <h2 className="text-lg font-bold text-gray-900">
                Delete News Article
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
            className="rounded-lg p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message */}
        <div className="mt-6">
          <p className="text-gray-700">
            Are you sure you want to delete <strong>{article.title}</strong>?
          </p>

          <p className="mt-2 text-sm text-gray-500">
            This news article will be permanently removed.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="w-full rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
