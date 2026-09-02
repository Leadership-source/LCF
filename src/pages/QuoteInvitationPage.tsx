import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getQuoteInvitation,
  submitQuoteInvitation,
} from "../api/services/public/quoteInvitation.service";

import { getErrorMessage } from "../lib/getErrorMessage";

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

export default function QuoteInvitationPage() {
  const { token } = useParams<{ token: string }>();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const {
    data: invitation,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["quote-invitation", token],
    queryFn: () => getQuoteInvitation(token!),
    enabled: !!token,
    retry: false,
  });

  const submitMutation = useMutation({
    mutationFn: () => submitQuoteInvitation(token!, formData),

    onSuccess: (response) => {
      toast.success(response.message || "Quote submitted successfully");

      setSubmitted(true);
      setFormData(initialForm);
      setErrors({});
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to submit your quote"));
    },
  });

  // --------------------------------
  // Input change
  // --------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error when user starts correcting the field
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  // --------------------------------
  // Validation
  // --------------------------------

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Please enter your role or occupation.";
    } else if (formData.role.trim().length < 2) {
      newErrors.role = "Role must be at least 2 characters.";
    }

    if (!formData.quote.trim()) {
      newErrors.quote = "Please enter your quote.";
    } else if (formData.quote.trim().length < 10) {
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

    if (!validateForm()) {
      return;
    }

    submitMutation.mutate();
  };

  // --------------------------------
  // Loading
  // --------------------------------

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-orange-500">Validating invitation...</p>
      </div>
    );
  }

  // --------------------------------
  // Invalid invitation
  // --------------------------------

  if (isError || !invitation) {
    const message = getErrorMessage(
      error,
      "This invitation link is invalid or has expired.",
    );

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            !
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Invitation Unavailable
          </h1>

          <p className="mt-3 text-gray-500">{message}</p>
        </div>
      </div>
    );
  }

  // --------------------------------
  // Submitted
  // --------------------------------

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="mt-20 w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
            ✓
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Thank You!</h1>

          <p className="mt-3 text-gray-500">
            Your quote has been submitted successfully. It will be reviewed by
            our team before it is published.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------
  // Invitation form
  // --------------------------------

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mt-30 rounded-2xl bg-white p-6 shadow-sm md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-lg font-bold text-gray-900 md:text-2xl">
              Share Your Leadership Quote
            </h1>

            <p className="mt-2 text-gray-500">
              We would be honored to feature your thoughts on leadership and
              inspire others.
            </p>
          </div>

          {/* Invitation email */}
          <div className="mb-6 rounded-lg bg-orange-50 p-4">
            <p className="text-sm text-gray-500">Invitation sent to</p>

            <p className="mt-1 font-medium text-orange-600">
              {invitation.email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={`w-full rounded-lg border px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Role / Occupation
              </label>

              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. CEO, Leadership Consultant"
                className={`w-full rounded-lg border px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.role && (
                <p className="mt-1 text-sm text-red-500">{errors.role}</p>
              )}
            </div>

            {/* Quote */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Your Quote
              </label>

              <textarea
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                placeholder="Share your thoughts on leadership..."
                rows={7}
                className={`w-full resize-none rounded-lg border px-4 py-3 text-gray-900 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 ${
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
                  {formData.quote.length} characters
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Quote"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-gray-400">
            This invitation is valid for 12 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
