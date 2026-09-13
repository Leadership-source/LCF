import { useState } from "react";
import { X, Upload } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createPartner } from "../../../api/services/admin/partners.service";

type FormErrors = {
  name?: string;
  logo?: string;
  websiteUrl?: string;
  general?: string;
};

export function AddPartner() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});

  const createPartnerMutation = useMutation({
    mutationFn: createPartner,

    onSuccess: (response) => {
      toast.success(response.message || "Partner added successfully");

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-partners"],
      });

      setOpen(false);

      setName("");
      setLogo(null);
      setPreview("");
      setWebsiteUrl("");
      setErrors({});
    },

    onError: (error: any) => {
      console.error("CREATE PARTNER ERROR:", error?.response?.data);

      const responseData = error?.response?.data;

      if (responseData?.errors) {
        setErrors({
          name: responseData.errors.name,
          logo: responseData.errors.logo,
          websiteUrl: responseData.errors.websiteUrl,
          general: responseData.message,
        });

        return;
      }

      setErrors({
        general:
          responseData?.message ||
          responseData?.error ||
          "Failed to add partner.",
      });
    },
  });

  const handleNameChange = (value: string) => {
    setName(value);

    setErrors((prev) => ({
      ...prev,
      name: undefined,
      general: undefined,
    }));
  };

  const handleWebsiteUrlChange = (value: string) => {
    setWebsiteUrl(value);

    setErrors((prev) => ({
      ...prev,
      websiteUrl: undefined,
      general: undefined,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        logo: "Please select a JPG, PNG, or WEBP image.",
      }));

      setLogo(null);
      setPreview("");

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        logo: "Logo must be less than 5MB.",
      }));

      setLogo(null);
      setPreview("");

      return;
    }

    setLogo(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    setErrors((prev) => ({
      ...prev,
      logo: undefined,
      general: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    const cleanName = name.trim();

    if (!cleanName) {
      newErrors.name = "Please enter the partner name.";
    } else if (cleanName.length < 2) {
      newErrors.name = "Partner name must contain at least 2 characters.";
    }

    const cleanWebsiteUrl = websiteUrl.trim();

    if (cleanWebsiteUrl && !/^https?:\/\/.+/i.test(cleanWebsiteUrl)) {
      newErrors.websiteUrl =
        "Please enter a valid URL starting with http:// or https://.";
    }

    setErrors(newErrors);

    return {
      isValid: Object.keys(newErrors).length === 0,
      cleanName,
      cleanWebsiteUrl,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, cleanName, cleanWebsiteUrl } = validateForm();

    if (!isValid) return;

    createPartnerMutation.mutate({
      name: cleanName,
      logo: logo || undefined,
      websiteUrl: cleanWebsiteUrl || undefined,
    });
  };

  const handleOpen = () => {
    setOpen(true);
    setErrors({});
  };

  const handleClose = () => {
    if (createPartnerMutation.isPending) return;

    setOpen(false);
    setErrors({});
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
      >
        + Add Partner
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Add Partner</h2>

                <p className="text-sm text-gray-500">
                  Add a new partner or supporting organisation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={createPartnerMutation.isPending}
                className="rounded-lg p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Partner Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Teesside University"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Website URL */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Website URL{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>

                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => handleWebsiteUrlChange(e.target.value)}
                  placeholder="https://example.com"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                    errors.websiteUrl ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.websiteUrl && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.websiteUrl}
                  </p>
                )}
              </div>

              {/* Logo */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Logo{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>

                <label
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 hover:border-orange-500 ${
                    errors.logo ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Logo preview"
                      className="h-24 w-24 object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="mb-2 text-gray-400" />

                      <p className="text-sm font-medium">Choose a logo</p>

                      <p className="mt-1 text-xs text-gray-500">
                        JPG, PNG or WEBP — Max 5MB
                      </p>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>

                {logo && (
                  <p className="mt-2 text-xs text-gray-500">
                    Selected: {logo.name}
                  </p>
                )}

                {errors.logo && (
                  <p className="mt-1 text-sm text-red-500">{errors.logo}</p>
                )}
              </div>

              {/* General Error */}
              {errors.general && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {errors.general}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={createPartnerMutation.isPending}
                className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {createPartnerMutation.isPending
                  ? "Adding Partner..."
                  : "Add Partner"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
