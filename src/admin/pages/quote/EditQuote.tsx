import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  updateQuote,
  type AdminQuote,
  type UpdateQuoteData,
} from "../../../api/services/admin/quote.service";

import { getErrorMessage } from "../../../lib/getErrorMessage";

type EditQuoteProps = {
  quote: AdminQuote;
  open: boolean;
  onClose: () => void;
};

type FormErrors = {
  name?: string;
  role?: string;
  quote?: string;
  server?: string;
};

export function EditQuote({ quote, open, onClose }: EditQuoteProps) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    role: "",
    quote: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  /*
   * ============================================================
   * POPULATE FORM
   * ============================================================
   */

  useEffect(() => {
    if (!quote || !open) return;

    setForm({
      name: quote.name || "",
      role: quote.role || "",
      quote: quote.quote || "",
    });

    setImage(null);
    setImagePreview(quote.image || "");

    setErrors({});
  }, [quote, open]);

  /*
   * ============================================================
   * UPDATE MUTATION
   * ============================================================
   */

  const updateQuoteMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateQuoteData }) =>
      updateQuote(id, data),

    onSuccess: (response) => {
      toast.success(response?.message || "Quote updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-quotes"],
        refetchType: "active",
      });

      queryClient.invalidateQueries({
        queryKey: ["published-quotes"],
        refetchType: "active",
      });

      onClose();

      setErrors({});
    },

    onError: (error: unknown) => {
      setErrors({
        server: getErrorMessage(error, "Failed to update quote."),
      });
    },
  });

  /*
   * ============================================================
   * INPUT CHANGE
   * ============================================================
   */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
      server: undefined,
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

  /*
   * ============================================================
   * VALIDATION
   * ============================================================
   */

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter the leader's name.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!form.role.trim()) {
      newErrors.role = "Please enter the leader's role.";
    } else if (form.role.trim().length < 2) {
      newErrors.role = "Role must be at least 2 characters.";
    }

    if (!form.quote.trim()) {
      newErrors.quote = "Please enter the quote.";
    } else if (form.quote.trim().length < 10) {
      newErrors.quote = "Quote must be at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
   * ============================================================
   * SUBMIT
   * ============================================================
   */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const quoteData: UpdateQuoteData = {
      name: form.name.trim(),
      role: form.role.trim(),
      quote: form.quote.trim(),
      image: image || undefined,
    };

    updateQuoteMutation.mutate({
      id: quote.id,
      data: quoteData,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Edit Quote</h2>

            <p className="text-sm text-gray-500">
              Update the leader's quote information.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Leader Image <span className="font-normal text-gray-400">(optional)</span></label>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-5 hover:border-orange-500">
              {imagePreview ? <img src={imagePreview} alt="Quote preview" className="h-28 w-28 rounded-lg object-cover" /> : <><Upload className="text-gray-400" /><span className="text-sm text-gray-500">Choose an image, max 5MB</span></>}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {image && <p className="mt-1 text-xs text-gray-500">Selected: {image.name}</p>}
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={updateQuoteMutation.isPending}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* =====================================================
            SERVER ERROR
        ====================================================== */}

        {errors.server && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {errors.server}
          </div>
        )}

        {/* =====================================================
            FORM
        ====================================================== */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* =================================================
              NAME
          ================================================== */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Leader's Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* =================================================
              ROLE
          ================================================== */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Role / Occupation
            </label>

            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. CEO, Founder & Entrepreneur"
              className={`w-full rounded-lg border px-4 py-3 outline-none ${
                errors.role
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role}</p>
            )}
          </div>

          {/* =================================================
              QUOTE
          ================================================== */}

          <div>
            <label className="mb-2 block text-sm font-medium">Quote</label>

            <textarea
              name="quote"
              value={form.quote}
              onChange={handleChange}
              rows={6}
              placeholder="Enter the leader's quote..."
              className={`w-full resize-none rounded-lg border px-4 py-3 outline-none ${
                errors.quote
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.quote && (
              <p className="mt-1 text-sm text-red-500">{errors.quote}</p>
            )}

            <p className="mt-1 text-xs text-gray-400">
              {form.quote.length} characters
            </p>
          </div>

          {/* =================================================
              SUBMIT
          ================================================== */}

          <button
            type="submit"
            disabled={updateQuoteMutation.isPending}
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updateQuoteMutation.isPending
              ? "Updating Quote..."
              : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
