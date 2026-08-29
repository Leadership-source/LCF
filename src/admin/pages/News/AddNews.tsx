import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createNews,
  type CreateNewsData,
} from "../../../api/services/admin/news.service";

import { getErrorMessage } from "../../../lib/getErrorMessage";

type AddNewsProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormErrors = {
  title?: string;
  category?: string;
  date?: string;
  readTime?: string;
  image?: string;
  excerpt?: string;
  content?: string;
};

export function AddNews({ isOpen, onClose }: AddNewsProps) {
  const queryClient = useQueryClient();

  // =========================
  // FORM STATE
  // =========================

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [readTime, setReadTime] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  // Image state
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // =========================
  // CREATE NEWS MUTATION
  // =========================

  const createMutation = useMutation({
    mutationFn: createNews,

    onSuccess: (response) => {
      toast.success(response?.message || "News article created successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-news"],
      });

      resetForm();
      onClose();
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to create news article"));
    },
  });

  // =========================
  // IMAGE CHANGE
  // =========================

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a JPG, PNG or WEBP image.",
      }));

      setImage(null);
      setPreview(null);

      return;
    }

    // Validate file size
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size must not exceed 5MB.",
      }));

      setImage(null);
      setPreview(null);

      return;
    }

    // Clear image error
    setErrors((prev) => ({
      ...prev,
      image: undefined,
    }));

    // Set image
    setImage(file);

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  // =========================
  // FORM VALIDATION
  // =========================

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Article title is required.";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (!date) {
      newErrors.date = "Publication date is required.";
    }

    if (!image) {
      newErrors.image = "Article image is required.";
    }

    if (!excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required.";
    }

    if (!content.trim()) {
      newErrors.content = "Article content is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid || !image) {
      return;
    }

    const data: CreateNewsData = {
      title: title.trim(),
      category: category.trim(),
      date,
      readTime: readTime.trim(),
      image,
      excerpt: excerpt.trim(),
      content: content.trim(),
    };

    createMutation.mutate(data);
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setDate("");
    setReadTime("");
    setExcerpt("");
    setContent("");

    setImage(null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setErrors({});
  };

  // =========================
  // CLEANUP PREVIEW URL
  // =========================

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // =========================
  // MODAL CLOSED
  // =========================

  if (!isOpen) {
    return null;
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* =========================
            HEADER
        ========================= */}

        <div className="sticky top-0 z-10 flex items-center justify-between  bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Add News Article
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Create a new news or insight article.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={createMutation.isPending}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        {/* =========================
            FORM
        ========================= */}

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* TITLE */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Article Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);

                if (errors.title) {
                  setErrors((prev) => ({
                    ...prev,
                    title: undefined,
                  }));
                }
              }}
              placeholder="Enter article title"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-orange-500 ${
                errors.title ? "border-red-500" : "border-gray-200"
              }`}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* CATEGORY + DATE */}

          <div className="grid gap-5 md:grid-cols-2">
            {/* CATEGORY */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);

                  if (errors.category) {
                    setErrors((prev) => ({
                      ...prev,
                      category: undefined,
                    }));
                  }
                }}
                placeholder="e.g. Leadership"
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-orange-500 ${
                  errors.category ? "border-red-500" : "border-gray-200"
                }`}
              />

              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            {/* DATE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Publication Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);

                  if (errors.date) {
                    setErrors((prev) => ({
                      ...prev,
                      date: undefined,
                    }));
                  }
                }}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-orange-500 ${
                  errors.date ? "border-red-500" : "border-gray-200"
                }`}
              />

              {errors.date && (
                <p className="mt-1 text-sm text-red-500">{errors.date}</p>
              )}
            </div>
          </div>

          {/* READ TIME */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Read Time
            </label>

            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="e.g. 5 min read"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-500"
            />
          </div>

          {/* =========================
              IMAGE
          ========================= */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Article Image
            </label>

            <label
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition hover:border-orange-500 ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Article preview"
                  className="h-48 w-full rounded-lg object-cover"
                />
              ) : (
                <>
                  <Upload className="mb-2 text-gray-400" size={28} />

                  <p className="text-sm font-medium">Choose an image</p>

                  <p className="mt-1 text-xs text-gray-500">
                    JPG, PNG or WEBP — Max 5MB
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {image && (
              <p className="mt-2 text-xs text-gray-500">
                Selected: {image.name}
              </p>
            )}

            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}
          </div>

          {/* EXCERPT */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Excerpt
            </label>

            <textarea
              value={excerpt}
              onChange={(e) => {
                setExcerpt(e.target.value);

                if (errors.excerpt) {
                  setErrors((prev) => ({
                    ...prev,
                    excerpt: undefined,
                  }));
                }
              }}
              placeholder="Write a short summary of the article..."
              rows={4}
              className={`w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-orange-500 ${
                errors.excerpt ? "border-red-500" : "border-gray-200"
              }`}
            />

            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>
            )}
          </div>

          {/* CONTENT */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Article Content
            </label>

            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);

                if (errors.content) {
                  setErrors((prev) => ({
                    ...prev,
                    content: undefined,
                  }));
                }
              }}
              placeholder="Write the full article content..."
              rows={10}
              className={`w-full resize-y rounded-lg border px-4 py-3 text-sm leading-7 outline-none transition focus:border-orange-500 ${
                errors.content ? "border-red-500" : "border-gray-200"
              }`}
            />

            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content}</p>
            )}
          </div>

          {/* =========================
              ACTIONS
          ========================= */}

          <div className="flex justify-end gap-3  pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={createMutation.isPending}
              className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createMutation.isPending ? "Creating..." : "Create Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
