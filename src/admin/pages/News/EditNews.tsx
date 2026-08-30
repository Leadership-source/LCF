import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  updateNews,
  updateNewsStatus,
  type AdminNewsArticle,
  type UpdateNewsData,
} from "../../../api/services/admin/news.service";

type EditNewsProps = {
  article: AdminNewsArticle;
  onClose: () => void;
};

type FormState = {
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
};

export function EditNews({ article, onClose }: EditNewsProps) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<FormState>({
    title: article.title,
    category: article.category,
    date: article.date
      ? new Date(article.date).toISOString().split("T")[0]
      : "",
    readTime: article.readTime ?? "",
    excerpt: article.excerpt,
    content: article.content,
  });

  const [image, setImage] = useState<File | undefined>();

  const [imagePreview, setImagePreview] = useState<string>(article.image);

  const [_, setIsPublished] = useState(article.isPublished);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const updateMutation = useMutation({
    mutationFn: (data: UpdateNewsData) => updateNews(String(article.id), data),

    onSuccess: () => {
      toast.success("News article updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-news"],
      });

      onClose();
    },

    onError: () => {
      toast.error("Failed to update news article");
    },
  });

  const statusMutation = useMutation({
    mutationFn: (nextStatus: boolean) =>
      updateNewsStatus(article.id, nextStatus),

    onSuccess: (_, nextStatus) => {
      setIsPublished(nextStatus);

      toast.success(
        nextStatus
          ? "Article published successfully"
          : "Article unpublished successfully",
      );

      queryClient.invalidateQueries({
        queryKey: ["admin-news"],
      });
    },

    onError: () => {
      toast.error("Failed to update publication status");
    },
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImage(file);

    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const preview = URL.createObjectURL(file);

    setImagePreview(preview);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!form.category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!form.date) {
      toast.error("Date is required");
      return;
    }

    if (!form.excerpt.trim()) {
      toast.error("Excerpt is required");
      return;
    }

    if (!form.content.trim()) {
      toast.error("Content is required");
      return;
    }

    const data: UpdateNewsData = {
      title: form.title.trim(),
      category: form.category.trim(),
      date: form.date,
      readTime: form.readTime.trim() || undefined,
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
    };

    if (image) {
      data.image = image;
    }

    updateMutation.mutate(data);
  };

  const isSaving = updateMutation.isPending || statusMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
      <div className="mx-auto my-8 w-full max-w-4xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between  px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Edit News Article
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update the article information below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 px-6 py-6 md:grid-cols-2">
            {/* Title */}
            <div className="md:col-span-2">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Title
              </label>

              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Category
              </label>

              <input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Publication Date
              </label>

              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            {/* Read Time */}
            <div>
              <label
                htmlFor="readTime"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Read Time
              </label>

              <input
                id="readTime"
                name="readTime"
                placeholder="e.g. 5 min read"
                value={form.readTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Article Image
              </label>

              <label
                htmlFor="news-image"
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-gray-300 p-3 transition hover:border-orange-500"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={form.title}
                    className="h-16 w-24 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-gray-100">
                    <ImagePlus size={24} className="text-gray-400" />
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Change image
                  </p>

                  <p className="mt-1 text-xs text-gray-500">Max 5MB</p>
                </div>
              </label>

              <input
                id="news-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Excerpt */}
            <div className="md:col-span-2">
              <label
                htmlFor="excerpt"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Excerpt
              </label>

              <textarea
                id="excerpt"
                name="excerpt"
                rows={4}
                value={form.excerpt}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            {/* Content */}
            <div className="md:col-span-2">
              <label
                htmlFor="content"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Article Content
              </label>

              <textarea
                id="content"
                name="content"
                rows={10}
                value={form.content}
                onChange={handleChange}
                className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3  px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
