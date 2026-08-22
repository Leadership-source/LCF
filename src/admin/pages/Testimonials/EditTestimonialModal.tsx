import { useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  updateTestimonial,
  type AdminTestimonial,
} from "../../../api/services/admin/testimonial.service";
import { getErrorMessage } from "../../../lib/getErrorMessage";

type Props = {
  testimonial: AdminTestimonial;
  onClose: () => void;
};

type FormErrors = {
  name?: string;
  role?: string;
  message?: string;
};

export default function EditTestimonialModal({ testimonial, onClose }: Props) {
  const queryClient = useQueryClient();

  const [name, setName] = useState(testimonial.name);
  const [role, setRole] = useState(testimonial.role);
  const [message, setMessage] = useState(testimonial.message);
  const [errors, setErrors] = useState<FormErrors>({});

  const mutation = useMutation({
    mutationFn: () =>
      updateTestimonial(testimonial.id, {
        name: name.trim(),
        role: role.trim(),
        message: message.trim(),
      }),
    onSuccess: () => {
      toast.success("Testimonial updated");
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["public-testimonials"] });
      onClose();
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to update testimonial"));
    },
  });

  const validate = () => {
    const errs: FormErrors = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!role.trim()) errs.role = "Role is required.";
    if (!message.trim()) errs.message = "Message is required.";
    else if (message.trim().length < 10)
      errs.message = "Message must be at least 10 characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="font-bold text-gray-900">Edit Testimonial</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={mutation.isPending}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
              disabled={mutation.isPending}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-orange-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Role / Occupation
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => { setRole(e.target.value); setErrors((p) => ({ ...p, role: undefined })); }}
              disabled={mutation.isPending}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-orange-500 ${errors.role ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={message}
              rows={4}
              onChange={(e) => { setMessage(e.target.value); setErrors((p) => ({ ...p, message: undefined })); }}
              disabled={mutation.isPending}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-orange-500 ${errors.message ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={mutation.isPending}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {mutation.isPending ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
