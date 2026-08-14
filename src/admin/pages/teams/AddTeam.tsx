import { useState } from "react";
import { X, Upload } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTeam } from "../../../api/services/admin/teams.service";

type FormErrors = {
  name?: string;
  role?: string;
  image?: string;
  general?: string;
};

export function AddTeam() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});

  const createTeamMutation = useMutation({
    mutationFn: createTeam,

    onSuccess: () => {
      toast.success("Team member added successfully");

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-teams"],
      });

      setOpen(false);

      setName("");
      setRole("");
      setImage(null);
      setPreview("");
      setErrors({});
    },

    onError: (error: any) => {
      console.error("CREATE TEAM ERROR:", error?.response?.data);

      const responseData = error?.response?.data;

      // If your backend returns field-specific errors
      if (responseData?.errors) {
        setErrors({
          name: responseData.errors.name,
          role: responseData.errors.role,
          image: responseData.errors.image,
          general: responseData.message,
        });

        return;
      }

      // General backend error
      setErrors({
        general:
          responseData?.message ||
          responseData?.error ||
          "Failed to add team member.",
      });
    },
  });

  // --------------------------------
  // Name change
  // --------------------------------

  const handleNameChange = (value: string) => {
    setName(value);

    setErrors((prev) => ({
      ...prev,
      name: undefined,
      general: undefined,
    }));
  };

  // --------------------------------
  // Role change
  // --------------------------------

  const handleRoleChange = (value: string) => {
    setRole(value);

    setErrors((prev) => ({
      ...prev,
      role: undefined,
      general: undefined,
    }));
  };

  // --------------------------------
  // Image
  // --------------------------------

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a JPG, PNG, or WEBP image.",
      }));

      setImage(null);
      setPreview("");

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        image: "Image must be less than 5MB.",
      }));

      setImage(null);
      setPreview("");

      return;
    }

    setImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    setErrors((prev) => ({
      ...prev,
      image: undefined,
      general: undefined,
    }));
  };

  // --------------------------------
  // Validation
  // --------------------------------

  const validateForm = () => {
    const newErrors: FormErrors = {};

    const cleanName = name.trim();
    const cleanRole = role.trim();

    // Name
    if (!cleanName) {
      newErrors.name = "Please enter the team member's name.";
    } else if (cleanName.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    // Role
    if (!cleanRole) {
      newErrors.role = "Please enter the team member's role.";
    } else if (cleanRole.length < 3) {
      newErrors.role = "Role must contain at least 3 characters.";
    }

    // Image
    if (!image) {
      newErrors.image = "Please select a profile image.";
    }

    setErrors(newErrors);

    return {
      isValid: Object.keys(newErrors).length === 0,
      cleanName,
      cleanRole,
    };
  };

  // --------------------------------
  // Submit
  // --------------------------------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, cleanName, cleanRole } = validateForm();

    if (!isValid) {
      return;
    }

    createTeamMutation.mutate({
      name: cleanName,
      role: cleanRole,
      image: image!,
    });
  };

  // --------------------------------
  // Open modal
  // --------------------------------

  const handleOpen = () => {
    setOpen(true);
    setErrors({});
  };

  // --------------------------------
  // Close modal
  // --------------------------------

  const handleClose = () => {
    if (createTeamMutation.isPending) return;

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
        + Add Team Member
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Add Team Member</h2>

                <p className="text-sm text-gray-500">
                  Add a new member to your leadership team.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={createTeamMutation.isPending}
                className="rounded-lg p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Jane Smith"
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
                  Role / Position
                </label>

                <input
                  type="text"
                  value={role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  placeholder="e.g. Director of Programmes"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.role && (
                  <p className="mt-1 text-sm text-red-500">{errors.role}</p>
                )}
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Profile Image
                </label>

                <label
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 hover:border-orange-500 ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  ) : (
                    <>
                      <Upload className="mb-2 text-gray-400" />

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

              {/* General API error */}
              {errors.general && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {errors.general}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={createTeamMutation.isPending}
                className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {createTeamMutation.isPending
                  ? "Adding Member..."
                  : "Add Team Member"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
