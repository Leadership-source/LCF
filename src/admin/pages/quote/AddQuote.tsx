import { useState } from "react";
import { Upload, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createQuote,
  type CreateQuoteData,
} from "../../../api/services/admin/quote.service";

import { getErrorMessage } from "../../../lib/getErrorMessage";

const initialForm = {
  name: "",
  role: "",
  quote: "",
};

type FormErrors = {
  name?: string;
  role?: string;
  quote?: string;
};

export function AddQuote() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const createQuoteMutation = useMutation({
    mutationFn: createQuote,

    onSuccess: (response) => {
      toast.success(response?.message || "Quote added successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-quotes"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      setOpen(false);
      setForm(initialForm);
      setImage(null);
      setImagePreview("");
      setErrors({});
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to create quote"));
    },
  });

  // --------------------------------
  // Input change
  // --------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      toast.error("Please choose an image smaller than 5MB.");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // --------------------------------
  // Validation
  // --------------------------------

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter the leader's name.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!form.role.trim()) {
      newErrors.role = "Please enter the leader's role or occupation.";
    } else if (form.role.trim().length < 2) {
      newErrors.role = "Role must be at least 2 characters.";
    }

    if (!form.quote.trim()) {
      newErrors.quote = "Please enter the leader's quote.";
    } else if (form.quote.trim().length < 10) {
      newErrors.quote = "Quote must be at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // --------------------------------
  // Submit
  // --------------------------------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const quoteData: CreateQuoteData = {
      name: form.name.trim(),
      role: form.role.trim(),
      quote: form.quote.trim(),
      image: image || undefined,
    };

    createQuoteMutation.mutate(quoteData);
  };

  // --------------------------------
  // Open modal
  // --------------------------------

  const handleOpen = () => {
    setOpen(true);
  };

  // --------------------------------
  // Close modal
  // --------------------------------

  const handleClose = () => {
    if (createQuoteMutation.isPending) {
      return;
    }

    setOpen(false);
    setErrors({});
  };

  return (
    <>
      {/* Add Quote Button */}

      <button
        type="button"
        onClick={handleOpen}
        className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
      >
        + Add Quote
      </button>

      {/* Modal */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6">
            {/* Header */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Add Leader's Quote</h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add an inspirational quote from a leader or industry
                  professional.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Leader Image <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-5 hover:border-orange-500">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Quote preview" className="h-28 w-28 rounded-lg object-cover" />
                  ) : (
                    <><Upload className="text-gray-400" /><span className="text-sm text-gray-500">Choose an image, max 5MB</span></>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {image && <p className="mt-1 text-xs text-gray-500">Selected: {image.name}</p>}
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={createQuoteMutation.isPending}
                className="rounded-lg p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Michael Anderson"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Role */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Role / Occupation
                </label>

                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="e.g. Leadership Consultant"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.role && (
                  <p className="mt-1 text-sm text-red-500">{errors.role}</p>
                )}
              </div>

              {/* Quote */}

              <div>
                <label className="mb-2 block text-sm font-medium">Quote</label>

                <textarea
                  name="quote"
                  value={form.quote}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Enter the leader's inspirational quote..."
                  className={`w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                    errors.quote ? "border-red-500" : "border-gray-300"
                  }`}
                />

                <div className="mt-1 flex justify-between">
                  {errors.quote ? (
                    <p className="text-sm text-red-500">{errors.quote}</p>
                  ) : (
                    <span />
                  )}

                  <span className="text-xs text-gray-400">
                    {form.quote.length} characters
                  </span>
                </div>
              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={createQuoteMutation.isPending}
                className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {createQuoteMutation.isPending
                  ? "Adding Quote..."
                  : "Add Quote"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
