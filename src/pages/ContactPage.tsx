import { useState, type FormEvent } from "react";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  sendContactMessage,
  type ContactFormData,
} from "../api/services/public/contact.service";
import { getErrorMessage } from "../lib/getErrorMessage";

type FormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

const initialForm: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
    </>
  );
}

export function ContactHero() {
  return (
    <section className="relative mt-15 overflow-hidden bg-[#EA580C] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "35px 35px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto mt-15 flex max-w-7xl flex-col gap-4 px-6 py-10 md:px-8 lg:px-12">
        <div className="flex max-w-3xl flex-col gap-4">
          <h1 className="text-2xl font-bold leading-[1.08] tracking-tight text-[#ffdcc0] md:text-4xl lg:text-5xl">
            Contact us
          </h1>

          <p className="max-w-2xl text-base leading-7 text-white md:text-md md:leading-8">
            We would love to hear from you.
            <br />
            Get in touch with us for enquiries, partnerships, or any other
            information.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const contactMutation = useMutation({
    mutationFn: sendContactMessage,

    onSuccess: (response) => {
      toast.success(
        response?.message || "Your message has been sent successfully.",
      );

      setForm(initialForm);
      setErrors({});
    },

    onError: (error: unknown) => {
      setErrors({
        message: getErrorMessage(
          error,
          "Unable to send your message. Please try again.",
        ),
      });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for this field
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    const cleanFullName = form.fullName.trim();
    const cleanEmail = form.email.trim().toLowerCase();
    const cleanPhone = form.phone?.trim() || "";
    const cleanSubject = form.subject.trim();
    const cleanMessage = form.message.trim();

    // Full Name
    if (!cleanFullName) {
      newErrors.fullName = "Please enter your full name.";
    } else if (cleanFullName.length < 2) {
      newErrors.fullName = "Full name must contain at least 2 characters.";
    }

    // Email
    if (!cleanEmail) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone is optional
    if (cleanPhone && cleanPhone.length < 7) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    // Subject
    if (!cleanSubject) {
      newErrors.subject = "Please enter a subject.";
    } else if (cleanSubject.length < 3) {
      newErrors.subject = "Subject must contain at least 3 characters.";
    }

    // Message
    if (!cleanMessage) {
      newErrors.message = "Please enter your message.";
    } else if (cleanMessage.length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    }

    setErrors(newErrors);

    return {
      isValid: Object.keys(newErrors).length === 0,
      cleanFullName,
      cleanEmail,
      cleanPhone,
      cleanSubject,
      cleanMessage,
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      isValid,
      cleanFullName,
      cleanEmail,
      cleanPhone,
      cleanSubject,
      cleanMessage,
    } = validateForm();

    if (!isValid) {
      return;
    }

    const data: ContactFormData = {
      fullName: cleanFullName,
      email: cleanEmail,
      phone: cleanPhone,
      subject: cleanSubject,
      message: cleanMessage,
    };

    contactMutation.mutate(data);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between">
        {/* LEFT SIDE */}
        <div className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Get In Touch</h2>

            <div className="mt-2 h-1 w-16 rounded-full bg-orange-500" />
          </div>

          <p className="leading-8 text-gray-600">
            Have a question or want to work with us?
            <br />
            Fill out the form or reach out to us directly
            <br />
            using the details below.
          </p>

          <div className="space-y-8">
            {/* Office */}
            <div className="flex gap-5 border-b border-gray-200 pb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100">
                <MapPin className="text-orange-500" />
              </div>

              <div>
                <h3 className="text-lg font-semibold">Our Office</h3>

                <p className="mt-2 leading-7 text-gray-600">
                  Durham, United Kingdom.
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-5 border-b border-gray-200 pb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100">
                <Mail className="text-orange-500" />
              </div>

              <div>
                <h3 className="text-lg font-semibold">Email</h3>

                <p className="mt-2 text-gray-600">
                  info@leadershipconferenceforum.org
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-5 border-b border-gray-200 pb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100">
                <Phone className="text-orange-500" />
              </div>

              <div>
                <h3 className="text-lg font-semibold">Phone</h3>

                <p className="mt-2 text-gray-600">07500429811</p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100">
                <Clock3 className="text-orange-500" />
              </div>

              <div>
                <h3 className="text-lg font-semibold">Office Hours</h3>

                <p className="mt-2 leading-7 text-gray-600">
                  Monday – Friday
                  <br />
                  9:00 AM – 5:00 PM (GMT)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h2 className="text-3xl font-bold">Send Us A Message</h2>

          <div className="mb-8 mt-3 h-1 w-16 rounded-full bg-orange-500" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`w-full rounded-xl border p-3 outline-none transition focus:border-orange-500 ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`w-full rounded-xl border p-3 outline-none transition focus:border-orange-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={`w-full rounded-xl border p-3 outline-none transition focus:border-orange-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Subject <span className="text-red-500">*</span>
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className={`w-full rounded-xl border p-3 outline-none transition focus:border-orange-500 ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Message <span className="text-red-500">*</span>
              </label>

              <textarea
                id="message"
                name="message"
                rows={8}
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                className={`w-full rounded-xl border p-4 outline-none transition focus:border-orange-500 ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={contactMutation.isPending}
              className="rounded-xl bg-orange-500 px-10 py-4 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {contactMutation.isPending ? "Sending..." : "Send Message →"}
            </button>
          </form>
        </div>
      </div>

      {/* Follow Us */}
      <div className="mt-10 space-y-4">
        <h3 className="text-2xl font-bold">Follow Us</h3>

        <div className="h-1 w-14 rounded-full bg-orange-500" />

        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/company/leadership-conference-forum"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0077B5] text-white transition hover:scale-105"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </section>
  );
}
