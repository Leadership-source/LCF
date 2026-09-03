import { useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  getEvent,
  registerForEvent,
} from "../api/services/public/events.service";

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  general?: string;
};

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id!),
    enabled: !!id,
  });

  const registerMutation = useMutation({
    mutationFn: (data: { name: string; email: string; phone?: string }) =>
      registerForEvent(id!, data),

    onSuccess: (data) => {
      toast.success(data.message || "Registration successful!");

      setShowRegistrationForm(false);
      setName("");
      setEmail("");
      setPhone("");
      setErrors({});
    },

    onError: (error: any) => {
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Registration failed. Please try again.";

      if (status === 409) {
        setErrors({ email: message });
      } else {
        setErrors({ general: message });
      }
    },
  });

  // --------------------------------
  // Submit registration
  // --------------------------------

  const handleRegistrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Name validation
    if (!cleanName) {
      newErrors.name = "Please enter your full name.";
    } else if (cleanName.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    // Email validation
    if (!cleanEmail) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Clear previous API error
    setErrors({});

    registerMutation.mutate({
      name: cleanName,
      email: cleanEmail,
      phone: phone.trim() || undefined,
    });
  };

  // --------------------------------
  // Loading state
  // --------------------------------

  if (isLoading) {
    return (
      <div className="mx-auto mt-20 max-w-7xl py-20 text-center">
        Loading event...
      </div>
    );
  }

  // --------------------------------
  // Error state
  // --------------------------------

  if (isError || !event) {
    return (
      <div className="mx-auto mt-20 max-w-7xl py-20 text-center">
        Event not found.
      </div>
    );
  }

  // --------------------------------
  // Open registration form
  // --------------------------------

  const handleOpenRegistration = () => {
    setErrors({});
    setShowRegistrationForm(true);
  };

  // --------------------------------
  // Close registration form
  // --------------------------------

  const handleCloseRegistration = () => {
    if (registerMutation.isPending) return;

    setShowRegistrationForm(false);
    setErrors({});
  };

  // --------------------------------
  // Render
  // --------------------------------

  return (
    <section className="mt-25 w-full">
      <div className="relative">
        <div className="absolute inset-0 bg-black/50" />

        <img
          src={event.image}
          alt={event.title}
          className="h-[450px] w-full object-cover md:h-[300px]"
        />

        <div className="absolute top-5 space-y-5 px-4 py-10 md:px-8 lg:px-12">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            {event.category}
          </span>

          <h1 className="mt-5 text-xl font-bold text-white md:text-2xl">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-white">
            <div className="flex items-center gap-2">
              <MapPin className="text-orange-500" />
              {event.location}
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="text-orange-500" />
              {event.date}
            </div>

            <div>{event.time}</div>
          </div>

          <p className="leading-8 text-white">{event.description}</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 bg-white px-4 py-10 md:px-8 lg:grid-cols-2 lg:px-10">
        <div className="space-y-2 rounded-md bg-white p-4 shadow-md">
          <h2 className="text-md font-bold md:text-xl">Event Information</h2>

          <div className="space-y-2 text-sm md:text-md">
            <p>
              <strong>Venue:</strong> {event.venue}
            </p>

            <p>
              <strong>Speaker:</strong> {event.speaker}
            </p>

            <p>
              <strong>Expected Attendees:</strong> {event.attendees}
            </p>
          </div>
        </div>

        <div className="rounded-md bg-white p-4 shadow-md">
          <h2 className="text-md font-bold md:text-xl">Agenda</h2>

          <ul className="space-y-2 text-sm md:text-md">
            {event.agenda.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-orange-500">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Location Map */}
      <div className="bg-white px-4 py-10 md:px-8 lg:px-12">
        <h2 className="mb-4 text-lg font-bold md:text-xl">Event Location</h2>
        <div className="overflow-hidden rounded-xl shadow-md">
          <iframe
            title="Event location map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(`${event.venue}, ${event.location}`)}&output=embed`}
            width="100%"
            height="380"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0"
          />
        </div>
      </div>

      <div className="bg-orange-100/50 px-4 py-10 text-center text-orange-500 md:px-8 lg:px-12">
        <h2 className="text-xl font-bold md:text-2xl">
          Ready to Join This Event?
        </h2>

        <p className="mt-2 text-black">
          Reserve your place and be part of an inspiring leadership experience.
        </p>

        <button
          onClick={handleOpenRegistration}
          className="mt-6 rounded-lg bg-orange-500 px-8 py-4 font-semibold text-white"
        >
          Register Now
        </button>
      </div>

      {/* Registration Modal */}
      {showRegistrationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">
              Register for {event.title}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Enter your details to register for this event.
            </p>

            <form
              onSubmit={handleRegistrationSubmit}
              className="mt-6 space-y-4"
            >
              {/* API Error */}
              {errors.general && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {errors.general}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      name: undefined,
                      general: undefined,
                    }));
                  }}
                  placeholder="Enter your full name"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      email: undefined,
                      general: undefined,
                    }));
                  }}
                  placeholder="Enter your email"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone (optional) */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Phone Number{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +44 7700 900000"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseRegistration}
                  disabled={registerMutation.isPending}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="flex-1 rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white disabled:opacity-60"
                >
                  {registerMutation.isPending
                    ? "Registering..."
                    : "Confirm Registration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
