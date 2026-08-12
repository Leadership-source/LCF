import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  createEvent,
  type CreateEventData,
} from "../../../api/services/admin/events.service";
import { getErrorMessage } from "../../../lib/getErrorMessage";

const initialForm = {
  category: "",
  title: "",
  location: "",
  date: "",
  time: "",
  description: "",
  speaker: "",
  venue: "",
  attendees: "",
  agenda: [""],
};

type FormErrors = {
  category?: string;
  title?: string;
  location?: string;
  date?: string;
  time?: string;
  description?: string;
  speaker?: string;
  venue?: string;
  attendees?: string;
  image?: string;
  agenda?: string;
};

export function AddEvent() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // Revoke blob URL when preview changes or component unmounts
  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const [errors, setErrors] = useState<FormErrors>({});

  const createEventMutation = useMutation({
    mutationFn: createEvent,

    onSuccess: (response) => {
      toast.success(response?.message || "Event added successfully");

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-events"],
      });

      setOpen(false);
      setForm(initialForm);
      setImage(null);
      setPreview("");
      setErrors({});
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to create event"));
    },
  });

  // --------------------------------
  // Normal input change
  // --------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
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
  // Agenda
  // --------------------------------

  const handleAgendaChange = (index: number, value: string) => {
    setForm((prev) => {
      const updatedAgenda = [...prev.agenda];

      updatedAgenda[index] = value;

      return {
        ...prev,
        agenda: updatedAgenda,
      };
    });

    setErrors((prev) => ({
      ...prev,
      agenda: undefined,
    }));
  };

  const addAgendaItem = () => {
    setForm((prev) => ({
      ...prev,
      agenda: [...prev.agenda, ""],
    }));
  };

  const removeAgendaItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      agenda: prev.agenda.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  // --------------------------------
  // Validation
  // --------------------------------

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!image) {
      newErrors.image = "Please select an event image.";
    }

    if (!form.category.trim()) {
      newErrors.category = "Please enter an event category.";
    } else if (form.category.trim().length < 2) {
      newErrors.category = "Category must be at least 2 characters.";
    }

    if (!form.title.trim()) {
      newErrors.title = "Please enter an event title.";
    } else if (form.title.trim().length < 3) {
      newErrors.title = "Event title must be at least 3 characters.";
    }

    if (!form.location.trim()) {
      newErrors.location = "Please enter the event location.";
    }

    if (!form.date) {
      newErrors.date = "Please select an event date.";
    }

    if (!form.time) {
      newErrors.time = "Please select an event time.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Please enter an event description.";
    } else if (form.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    if (!form.speaker.trim()) {
      newErrors.speaker = "Please enter the speaker's name.";
    }

    if (!form.venue.trim()) {
      newErrors.venue = "Please enter the event venue.";
    }

    if (!form.attendees.trim()) {
      newErrors.attendees = "Please enter the expected number of attendees.";
    } else {
      const attendeesNumber = Number(form.attendees);

      if (!Number.isInteger(attendeesNumber) || attendeesNumber < 1) {
        newErrors.attendees =
          "Expected attendees must be a whole number greater than 0.";
      }
    }

    const cleanedAgenda = form.agenda
      .map((item) => item.trim())
      .filter(Boolean);

    if (cleanedAgenda.length === 0) {
      newErrors.agenda = "Please add at least one agenda item.";
    }

    setErrors(newErrors);

    return {
      isValid: Object.keys(newErrors).length === 0,
      cleanedAgenda,
    };
  };

  // --------------------------------
  // Submit
  // --------------------------------

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, cleanedAgenda } = validateForm();

    if (!isValid) {
      return;
    }

    const eventData: CreateEventData = {
      category: form.category.trim(),
      title: form.title.trim(),
      image: image!,
      location: form.location.trim(),
      date: form.date,
      time: form.time,
      description: form.description.trim(),
      speaker: form.speaker.trim(),
      venue: form.venue.trim(),
      attendees: form.attendees.trim(),
      agenda: cleanedAgenda,
    };

    createEventMutation.mutate(eventData);
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
    if (createEventMutation.isPending) return;

    setOpen(false);
    setErrors({});
  };

  return (
    <>
      {/* Add Event Button */}
      <button
        type="button"
        onClick={handleOpen}
        className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
      >
        + Add Event
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Add Event</h2>

                <p className="text-sm text-gray-500">
                  Add a new event to your leadership conference.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={createEventMutation.isPending}
                className="rounded-lg p-2 transition hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Leadership Conference"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Event Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Global Leadership Conference 2026"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Event Image
                </label>

                <label
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition hover:border-orange-500 ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Event preview"
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

              {/* Location + Venue */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Location
                  </label>

                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. London, UK"
                    className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  {errors.location && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Venue
                  </label>

                  <input
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    placeholder="e.g. Conference Hall"
                    className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                      errors.venue ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  {errors.venue && (
                    <p className="mt-1 text-sm text-red-500">{errors.venue}</p>
                  )}
                </div>
              </div>

              {/* Date + Time */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Date</label>

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  {errors.date && (
                    <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Time</label>

                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                      errors.time ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  {errors.time && (
                    <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                  )}
                </div>
              </div>

              {/* Speaker + Attendees */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Speaker
                  </label>

                  <input
                    name="speaker"
                    value={form.speaker}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                      errors.speaker ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  {errors.speaker && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.speaker}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Expected Attendees
                  </label>

                  <input
                    type="number"
                    name="attendees"
                    value={form.attendees}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                    min="1"
                    className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                      errors.attendees ? "border-red-500" : "border-gray-300"
                    }`}
                  />

                  {errors.attendees && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.attendees}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the event..."
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Agenda */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">Agenda</label>

                  <button
                    type="button"
                    onClick={addAgendaItem}
                    className="text-sm font-medium text-orange-500 hover:text-orange-600"
                  >
                    + Add item
                  </button>
                </div>

                <div className="space-y-3">
                  {form.agenda.map((item, index) => (
                    <div key={index}>
                      <div className="flex gap-2">
                        <input
                          value={item}
                          onChange={(e) =>
                            handleAgendaChange(index, e.target.value)
                          }
                          placeholder={`Agenda item ${index + 1}`}
                          className={`flex-1 rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                            errors.agenda ? "border-red-500" : "border-gray-300"
                          }`}
                        />

                        {form.agenda.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAgendaItem(index)}
                            className="rounded-lg px-3 text-red-500 transition hover:bg-red-50"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {errors.agenda && (
                  <p className="mt-1 text-sm text-red-500">{errors.agenda}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={createEventMutation.isPending}
                className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {createEventMutation.isPending
                  ? "Adding Event..."
                  : "Add Event"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
