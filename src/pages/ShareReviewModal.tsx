import { X, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import {
  createTestimonial,
  type CreateTestimonialPayload,
} from "../api/services/public/testimonial.service";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormErrors = {
  name?: string;
  role?: string;
  message?: string;
};

export default function ShareReviewModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState<CreateTestimonialPayload>({
    name: "",
    role: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const createMutation = useMutation({
    mutationFn: createTestimonial,

    onSuccess: () => {
      toast.success("Thank you! Your review has been submitted for approval.");

      setFormData({
        name: "",
        role: "",
        message: "",
      });

      setErrors({});
      onClose();
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to submit your review.",
      );
    },
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error as soon as user starts correcting field
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Please enter your role or occupation.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your review.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Your review must be at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    createMutation.mutate({
      name: formData.name.trim(),
      role: formData.role.trim(),
      message: formData.message.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Share Your Review
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Tell us about your experience with LCF.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Name */}
          <div>
            <label
              htmlFor="review-name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Full Name
            </label>

            <input
              id="review-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              disabled={createMutation.isPending}
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                errors.name
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                  : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
              }`}
            />

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="review-role"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Role / Occupation
            </label>

            <input
              id="review-role"
              name="role"
              type="text"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Youth Leader"
              disabled={createMutation.isPending}
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                errors.role
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                  : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
              }`}
            />

            {errors.role && (
              <p className="mt-1.5 text-xs text-red-500">{errors.role}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="review-message"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Your Review
            </label>

            <textarea
              id="review-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your experience..."
              rows={5}
              disabled={createMutation.isPending}
              className={`w-full resize-none rounded-lg border px-4 py-3 text-sm leading-6 outline-none transition ${
                errors.message
                  ? "border-red-500 focus:ring-2 focus:ring-red-500/10"
                  : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
              }`}
            />

            {errors.message && (
              <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
            )}
          </div>

          {/* Notice */}
          <p className="text-xs leading-5 text-gray-400">
            Your review will be reviewed by our team before it appears publicly
            on the website.
          </p>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={createMutation.isPending}
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={16} />

              {createMutation.isPending ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
