import { useEffect, useState, type FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { involvementOptions } from "../static-data/data";
import {
  getVolunteerOptions,
  submitVolunteerApplication,
  type AvailabilityOption,
  type VolunteerFormData,
  type VolunteerOption,
} from "../api/services/public/volunteer.service";
import { getErrorMessage } from "../lib/getErrorMessage";

//volunteerCard props
type VolunteerCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  last?: boolean;
};

type InvolvementCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
};

type FormErrors = Record<string, string | undefined>;

type ApiValidationError = {
  errors?: Array<{ field: string; message: string }>;
};

const initialVolunteerForm: VolunteerFormData = {
  fullName: "",
  email: "",
  phone: "",
  areaOfInterest: "",
  availability: "",
  details: {},
  message: "",
};

export default function GetInvolvedPage() {
  return (
    <>
      <VolunteerHero />
      <GetInvolvedSection />

      <Ready />
    </>
  );
}

export function VolunteerHero() {
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
            Get Involved with LCF
          </h1>

          <p className="max-w-2xl text-base leading-7 text-white md:text-md md:leading-8">
            There are many ways to get involved with Leadership Conference
            Forum. Whether you become a member, volunteer, mentor, partner with
            us, support an event, or attend one of our programmes, your
            involvement can help us strengthen communities and develop future
            leaders.
          </p>
        </div>
      </div>
    </section>
  );
}

//benefit

export function VolunteerCard({
  icon: Icon,
  title,
  description,
  last,
}: VolunteerCardProps) {
  return (
    <div
      className={`bg-orange-100/50 border border-orange-500 rounded-2xl md:bg-transparent md:bg-none md:border-orange-50/50 md:border-l-0 md:border-t-0 md:border-b-0 md:rounded-none flex flex-col items-center text-center space-y-2 p-4  ${
        !last ? " lg:border-r lg:border-gray-200" : ""
      }`}
    >
      <Icon size={30} className=" text-orange-500 stroke-[1.6]" />

      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

      <p className=" leading-8 text-gray-600">{description}</p>
    </div>
  );
}

export function GetInvolvedSection() {
  return (
    <section className="bg-orange-100/50 py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-lg md:text-3xl font-bold text-gray-900 ">
            How You Can Get Involved
          </h2>

          <div className="mx-auto mt-1 h-1 w-16 rounded-full bg-orange-500" />

          <p className="mt-4 text-gray-600">
            We have a variety of opportunities for passionate individuals.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {involvementOptions.map((item) => (
              <InvolvementCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                href={item.href}
                actionLabel={item.actionLabel}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function InvolvementCard({
  icon: Icon,
  title,
  description,
  href,
  actionLabel = "Learn More",
}: InvolvementCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
        <Icon size={30} className="text-orange-500 stroke-[1.8]" />
      </div>

      <h3 className="mt-3 text-xl font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 flex-1 leading-8 text-gray-600">{description}</p>

      {href && (
        <a
          href={href}
          className="mt-5 inline-block font-semibold text-orange-500 transition hover:text-orange-600"
        >
          {actionLabel} →
        </a>
      )}
    </div>
  );
}

export function Ready() {
  const [options, setOptions] = useState<VolunteerOption[]>([]);
  const [availabilityOptions, setAvailabilityOptions] = useState<
    AvailabilityOption[]
  >([]);
  const [form, setForm] = useState<VolunteerFormData>(initialVolunteerForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [optionsError, setOptionsError] = useState("");

  useEffect(() => {
    let active = true;

    getVolunteerOptions()
      .then((volunteerFormOptions) => {
        if (active) {
          setOptions(volunteerFormOptions.options);
          setAvailabilityOptions(volunteerFormOptions.availabilityOptions);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setOptionsError(
            getErrorMessage(error, "Unable to load volunteer opportunities."),
          );
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const selectedOption = options.find(
    (option) => option.value === form.areaOfInterest,
  );

  const volunteerMutation = useMutation({
    mutationFn: submitVolunteerApplication,
    onSuccess: (response) => {
      toast.success(response.message || "Thank you for volunteering. We will be in touch soon.");
      setForm(initialVolunteerForm);
      setErrors({});
    },
    onError: (error: unknown) => {
      const validationErrors = (error as AxiosError<ApiValidationError>)?.response
        ?.data?.errors;

      if (validationErrors?.length) {
        setErrors(
          validationErrors.reduce<FormErrors>((current, item) => {
            current[item.field] = item.message;
            return current;
          }, {}),
        );
        return;
      }

      setErrors({ form: getErrorMessage(error, "Unable to submit your application. Please try again.") });
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const areaOfInterest = event.target.value;
    setForm((current) => ({ ...current, areaOfInterest, details: {} }));
    setErrors((current) => ({ ...current, areaOfInterest: undefined }));
  };

  const handleDetailChange = (fieldName: string, value: string) => {
    setForm((current) => ({
      ...current,
      details: { ...current.details, [fieldName]: value },
    }));
    setErrors((current) => ({ ...current, [`details.${fieldName}`]: undefined }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    const fullName = form.fullName.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone?.trim() || "";
    const availability = form.availability.trim();
    const message = form.message?.trim() || "";

    if (fullName.length < 2 || fullName.length > 100) newErrors.fullName = "Enter a name between 2 and 100 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) newErrors.email = "Enter a valid email address.";
    if (phone.length > 20) newErrors.phone = "Phone number cannot exceed 20 characters.";
    if (!selectedOption) newErrors.areaOfInterest = "Select an area of interest.";
    if (!availabilityOptions.some((option) => option.value === availability)) newErrors.availability = "Select your availability.";
    if (message.length > 2000) newErrors.message = "Message cannot exceed 2,000 characters.";

    selectedOption?.fields.forEach((field) => {
      const value = form.details[field.name]?.trim() || "";
      if (field.required && !value) newErrors[`details.${field.name}`] = `${field.label} is required.`;
      else if (value.length > 1000) newErrors[`details.${field.name}`] = `${field.label} cannot exceed 1,000 characters.`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0
      ? { fullName, email, phone, availability, message }
      : null;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanForm = validateForm();
    if (!cleanForm) return;

    volunteerMutation.mutate({
      ...form,
      ...cleanForm,
      details: Object.fromEntries(
        Object.entries(form.details).map(([name, value]) => [name, value.trim()]),
      ),
    });
  };

  return (
    <section
      className="bg-white mx-auto px-4 md:px-8 lg:px-12 py-10 space-y-6"
      id="volunteer"
    >
      <div className="">
        <h2 className="text-lg md:text-3xl font-bold text-gray-900 ">
          Volunteers and Working Committees
        </h2>

        <div className=" mt-2 h-1 w-36 rounded-full bg-orange-500" />

        <p className="mt-4 text-gray-600 leading-7">
          Our activities are supported by passionate volunteers and committee
          members who contribute to event planning, community engagement,
          outreach, and programme coordination. Volunteers are encouraged to
          provide feedback after six months of joining the charity, should they
          wish to continue in their role. If no update is provided within six
          months, the charity will reach out to request confirmation of their
          continued involvement within a 12-month period. This information will
          also be included in the charity’s annual report submitted to the
          Charity Commission
        </p>
      </div>
      <form onSubmit={handleSubmit} className="rounded-xl bg-orange-500 p-6 text-white md:p-8">
        <div className="mb-6 space-y-2">
          <h2 className="text-xl font-bold">Ready to Volunteer?</h2>
          <p className="text-sm leading-6 text-orange-50">Tell us how you would like to contribute and we will be in touch.</p>
        </div>

        {optionsError ? <p role="alert" className="rounded-md bg-red-100 p-3 text-sm text-red-800">{optionsError}</p> : (
          <>
            {errors.form && <p role="alert" className="mb-5 rounded-md bg-red-100 p-3 text-sm text-red-800">{errors.form}</p>}
            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="Full name" name="fullName" value={form.fullName} error={errors.fullName} onChange={handleChange} required maxLength={100} />
              <FormField label="Email address" name="email" type="email" value={form.email} error={errors.email} onChange={handleChange} required maxLength={254} />
              <FormField label="Phone number" name="phone" type="tel" value={form.phone || ""} error={errors.phone} onChange={handleChange} maxLength={20} />
              <div>
                <label htmlFor="availability" className="mb-2 block text-sm font-semibold">Availability <span aria-hidden="true">*</span></label>
                <select id="availability" name="availability" value={form.availability} onChange={handleChange} disabled={!availabilityOptions.length} required className={inputClassName(errors.availability)}>
                  <option value="">{availabilityOptions.length ? "Select availability" : "Loading availability..."}</option>
                  {availabilityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <FieldError message={errors.availability} />
              </div>
              <div>
                <label htmlFor="areaOfInterest" className="mb-2 block text-sm font-semibold">Area of interest <span aria-hidden="true">*</span></label>
                <select id="areaOfInterest" value={form.areaOfInterest} onChange={handleAreaChange} disabled={!options.length} className={inputClassName(errors.areaOfInterest)}>
                  <option value="">{options.length ? "Select an opportunity" : "Loading opportunities..."}</option>
                  {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <FieldError message={errors.areaOfInterest} />
              </div>
            </div>

            {selectedOption && <div className="mt-5 grid gap-5 md:grid-cols-2">
              {selectedOption.fields.map((field) => {
                const error = errors[`details.${field.name}`];
                return <div key={field.name}>
                  <label htmlFor={`details-${field.name}`} className="mb-2 block text-sm font-semibold">{field.label}{field.required && <span aria-hidden="true"> *</span>}</label>
                  {field.type === "textarea" ? <textarea id={`details-${field.name}`} value={form.details[field.name] || ""} onChange={(event) => handleDetailChange(field.name, event.target.value)} required={field.required} maxLength={1000} className={`${inputClassName(error)} min-h-28`} /> : <input id={`details-${field.name}`} type="text" value={form.details[field.name] || ""} onChange={(event) => handleDetailChange(field.name, event.target.value)} required={field.required} maxLength={1000} className={inputClassName(error)} />}
                  <FieldError message={error} />
                </div>;
              })}
            </div>}

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-semibold">Why would you like to volunteer?</label>
              <textarea id="message" name="message" value={form.message || ""} onChange={handleChange} maxLength={2000} className={`${inputClassName(errors.message)} min-h-32`} />
              <FieldError message={errors.message} />
            </div>
            <button type="submit" disabled={volunteerMutation.isPending || !options.length || !availabilityOptions.length} className="mt-6 rounded-md bg-white px-5 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-70">
              {volunteerMutation.isPending ? "Submitting application..." : "Submit volunteer application"}
            </button>
          </>
        )}
      </form>
    </section>
  );
}

function inputClassName(error?: string) {
  return `w-full rounded-md border bg-white p-3 text-gray-900 outline-none transition focus:border-orange-700 ${error ? "border-red-500" : "border-orange-200"}`;
}

type FormFieldProps = {
  label: string;
  name: "fullName" | "email" | "phone";
  type?: "text" | "email" | "tel";
  value: string;
  error?: string;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  required?: boolean;
  maxLength: number;
};

function FormField({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
  required = false,
  maxLength,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        className={inputClassName(error)}
      />
      <FieldError message={error} />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <p role="alert" className="mt-1 text-sm text-red-100">{message}</p> : null;
}
