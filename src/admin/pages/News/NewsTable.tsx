import { useState } from "react";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";

import {
  updateNewsStatus,
  type AdminNewsArticle,
} from "../../../api/services/admin/news.service";

import { ActionButton } from "./ActionButton";
import { EditNews } from "./EditNews";
import { DeleteNews } from "./DeleteNews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../lib/getErrorMessage";

type NewsTableProps = {
  news: AdminNewsArticle[];
};

export function NewsTable({ news }: NewsTableProps) {
  const [editingNews, setEditingNews] = useState<AdminNewsArticle | null>(null);

  const [deletingNews, setDeletingNews] = useState<AdminNewsArticle | null>(
    null,
  );

  const queryClient = useQueryClient();
  const statusMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: number; isPublished: boolean }) =>
      updateNewsStatus(id, isPublished),

    onSuccess: () => {
      toast.success("News status updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-news"],
      });
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update news status"));
    },
  });

  if (news.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
        <p className="font-medium text-gray-900">No news articles found</p>

        <p className="mt-1 text-sm text-gray-500">
          Try changing your search or filter.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Article
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {news.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {/* Article */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-14 w-20 shrink-0 rounded-lg object-cover"
                      />

                      <div className="min-w-0">
                        <h3 className="max-w-xs truncate font-semibold text-gray-900">
                          {article.title}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          {article.readTime || "No read time"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                      {article.category}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {new Date(article.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-4 py-1 text-xs font-medium ${
                          article.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {article.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      {/* Edit */}
                      <ActionButton onClick={() => setEditingNews(article)}>
                        <Pencil size={16} />
                      </ActionButton>

                      {/* Publish / Unpublish */}
                      <ActionButton
                        onClick={() => {
                          statusMutation.mutate({
                            id: article.id,
                            isPublished: !article.isPublished,
                          });
                        }}
                      >
                        {article.isPublished ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </ActionButton>

                      {/* Delete */}
                      <ActionButton
                        danger
                        onClick={() => setDeletingNews(article)}
                      >
                        <Trash2 size={16} />
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingNews && (
        <EditNews article={editingNews} onClose={() => setEditingNews(null)} />
      )}

      {/* Delete Modal */}
      {deletingNews && (
        <DeleteNews
          article={deletingNews}
          onClose={() => setDeletingNews(null)}
        />
      )}
    </>
  );
}
