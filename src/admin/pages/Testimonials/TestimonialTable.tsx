import { Check, MessageSquareQuote, Search, Trash2, X } from "lucide-react";

import { useState } from "react";

import type { AdminTestimonial } from "../../../api/services/admin/testimonial.service";

type Props = {
  testimonials: AdminTestimonial[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  isProcessing: boolean;
};

export default function TestimonialTable({
  testimonials,
  onApprove,
  onReject,
  onDelete,
  isProcessing,
}: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchValue) ||
      testimonial.role.toLowerCase().includes(searchValue) ||
      testimonial.message.toLowerCase().includes(searchValue);

    const matchesStatus = status === "All" || testimonial.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-xl bg-white px-4 py-6 shadow-sm">
      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search testimonials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-11 pr-4 outline-none transition focus:border-orange-500"
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-orange-500"
        >
          <option value="All">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                Name
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                Role
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">
                Testimonial
              </th>

              <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTestimonials.map((testimonial) => (
              <tr
                key={testimonial.id}
                className="border-b border-gray-200 transition hover:bg-gray-50"
              >
                {/* Name */}
                <td className="px-4 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                      <MessageSquareQuote size={18} />
                    </div>

                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        {testimonial.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-4 py-5">
                  <span className="text-sm text-gray-600">
                    {testimonial.role}
                  </span>
                </td>

                {/* Message */}
                <td className="max-w-md px-4 py-5">
                  <p
                    className="line-clamp-2 text-sm leading-6 text-gray-600"
                    title={testimonial.message}
                  >
                    {testimonial.message}
                  </p>
                </td>

                {/* Status */}
                <td className="px-4 py-5 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      testimonial.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : testimonial.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {testimonial.status === "PENDING"
                      ? "Pending"
                      : testimonial.status === "APPROVED"
                        ? "Approved"
                        : "Rejected"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-5">
                  <div className="flex justify-center gap-2">
                    {/* Approve */}
                    {testimonial.status !== "APPROVED" && (
                      <button
                        type="button"
                        onClick={() => onApprove(testimonial.id)}
                        disabled={isProcessing}
                        className="rounded-md border border-green-200 bg-green-50 p-2 text-green-600 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Approve testimonial"
                      >
                        <Check size={16} />
                      </button>
                    )}

                    {/* Reject */}
                    {testimonial.status !== "REJECTED" && (
                      <button
                        type="button"
                        onClick={() => onReject(testimonial.id)}
                        disabled={isProcessing}
                        className="rounded-md border border-gray-300 p-2 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Reject testimonial"
                      >
                        <X size={16} />
                      </button>
                    )}

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onDelete(testimonial.id)}
                      disabled={isProcessing}
                      className="rounded-md border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete testimonial"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Empty state */}
            {filteredTestimonials.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <MessageSquareQuote
                    className="mx-auto text-gray-300"
                    size={40}
                  />

                  <p className="mt-3 text-sm text-gray-500">
                    {search || status !== "All"
                      ? "No testimonials match your search or filter."
                      : "No testimonials have been submitted yet."}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
