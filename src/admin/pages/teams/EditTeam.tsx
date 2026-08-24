import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AdminTeam } from "../../../api/types";
import { updateTeam } from "../../../api/services/admin/teams.service";

//edit team props
type EditTeamProps = {
  team: AdminTeam;
  onClose: () => void;
};

type FormErrors = {
  name?: string;
  role?: string;
  image?: string;
};

export function EditTeam({ team, onClose }: EditTeamProps) {
  const queryClient = useQueryClient();

  const [name, setName] = useState(team.name);
  const [role, setRole] = useState(team.role);
  const [bio, setBio] = useState(team.bio ?? "");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(team.image);

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setName(team.name);
    setRole(team.role);
    setBio(team.bio ?? "");
    setPreview(team.image);
    setImage(null);
    setErrors({});
  }, [team]);

  const updateMutation = useMutation({
    mutationFn: () =>
      updateTeam(team.id, {
        name: name.trim(),
        role: role.trim(),
        bio: bio.trim() || undefined,
        ...(image ? { image } : {}),
      }),

    onSuccess: (response) => {
      toast.success("Team member updated successfully");

      queryClient.setQueryData<AdminTeam[]>(["admin-teams"], (oldTeams = []) =>
        oldTeams.map((item) =>
          item.id === team.id
            ? {
                ...item,
                ...response.data,
              }
            : item,
        ),
      );

      onClose();
    },

    onError: (error: any) => {
      console.error("UPDATE TEAM ERROR:", error?.response?.data);

      // API/server error can also be displayed inside the form
      setErrors({
        name:
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to update team member",
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

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image must be less than 5MB.",
      }));

      return;
    }

    setImage(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    setErrors((prev) => ({
      ...prev,
      image: undefined,
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
    } else if (cleanRole.length < 2) {
      newErrors.role = "Role must contain at least 2 characters.";
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

    if (!isValid) return;

    updateMutation.mutate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Edit Team Member</h2>

            <p className="text-sm text-gray-500">
              Update this team member's information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={updateMutation.isPending}
            className="rounded-lg p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
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
              className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Bio <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief biography or background..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-orange-500"
            />
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
              <img
                src={preview}
                alt={team.name}
                className="mb-3 h-32 w-32 rounded-full object-cover"
              />

              <p className="text-sm font-medium">Change image</p>

              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG or WEBP — Max 5MB
              </p>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={updateMutation.isPending}
              className="w-full rounded-lg border border-gray-300 py-3 font-semibold hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
