import {
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  Pencil,
  Search,
  Trash2,
  XCircle,
  RotateCcw,
} from "lucide-react";

import { useState, type Dispatch, type SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import type {
  AdminQuote,
  QuoteStatus,
} from "../../../api/services/admin/quote.service";

import { updateQuoteStatus } from "../../../api/services/admin/quote.service";

import { EditQuote } from "./EditQuote";
import { DeleteQuote } from "./DeleteQuote";

type QuoteTableProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

  status: string;
  setStatus: Dispatch<SetStateAction<string>>;

  filteredQuotes: AdminQuote[];
};

export function QuoteTable({
  search,
  setSearch,
  status,
  setStatus,
  filteredQuotes,
}: QuoteTableProps) {
  const queryClient = useQueryClient();

  const [selectedQuote, setSelectedQuote] = useState<AdminQuote | null>(null);

  const [quoteToDelete, setQuoteToDelete] = useState<AdminQuote | null>(null);

  // =====================================================
  // UPDATE STATUS
  // =====================================================

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: QuoteStatus }) =>
      updateQuoteStatus(id, status),

    onSuccess: (response) => {
      toast.success(response?.message || "Quote status updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-quotes"],
      });
    },

    onError: (error: any) => {
      console.error("UPDATE QUOTE STATUS ERROR:", error?.response?.data);

      toast.error(
        error?.response?.data?.message || "Failed to update quote status",
      );
    },
  });

  // =====================================================
  // TOGGLE / UNREJECT STATUS
  // =====================================================

  const handleToggleStatus = (quote: AdminQuote) => {
    // ---------------------------------------------------
    // REJECTED → PENDING
    //
    // A rejected quote must be unrejected before
    // it can be published.
    // ---------------------------------------------------

    if (quote.status === "REJECTED") {
      updateStatusMutation.mutate({
        id: quote.id,
        status: "PENDING",
      });

      return;
    }

    // ---------------------------------------------------
    // PUBLISHED → DRAFT
    // ---------------------------------------------------

    if (quote.status === "PUBLISHED") {
      updateStatusMutation.mutate({
        id: quote.id,
        status: "DRAFT",
      });

      return;
    }

    // ---------------------------------------------------
    // PENDING / DRAFT → PUBLISHED
    // ---------------------------------------------------

    updateStatusMutation.mutate({
      id: quote.id,
      status: "PUBLISHED",
    });
  };

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const renderStatus = (quoteStatus: QuoteStatus) => {
    if (quoteStatus === "PUBLISHED") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          <CheckCircle2 size={13} />
          Published
        </span>
      );
    }

    if (quoteStatus === "PENDING") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
          Pending
        </span>
      );
    }

    if (quoteStatus === "REJECTED") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
          <XCircle size={13} />
          Rejected
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
        <FileText size={13} />
        Draft
      </span>
    );
  };

  return (
    <div className="rounded-xl bg-white px-4 py-6 shadow-sm">
      {/* SEARCH + FILTER */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search quotes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-11 pr-4 outline-none focus:border-orange-500"
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
        >
          <option value="All">All Status</option>

          <option value="PUBLISHED">Published</option>

          <option value="PENDING">Pending</option>

          <option value="DRAFT">Draft</option>

          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-center">Leader</th>

              <th className="px-4 py-4 text-center">Quote</th>

              <th className="px-4 py-4 text-center">Source</th>

              <th className="px-4 py-4 text-center">Status</th>

              <th className="px-4 py-4 text-center">Date</th>

              <th className="px-4 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredQuotes.map((quote) => (
              <tr
                key={quote.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                {/* LEADER */}
                <td className="px-4 py-4 md:px-8">
                  <div>
                    <h3 className="text-sm font-semibold">{quote.name}</h3>

                    <p className="mt-1 text-sm text-gray-500">{quote.role}</p>
                  </div>
                </td>

                {/* QUOTE */}
                <td className="max-w-md px-4 py-4">
                  <p className="line-clamp-2 text-sm leading-6 text-gray-600">
                    "{quote.quote}"
                  </p>
                </td>

                {/* SOURCE */}
                <td className="px-4 py-4 text-center">
                  <span
                    className={
                      quote.source === "INVITATION"
                        ? "rounded-md bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600"
                        : "rounded-md bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600"
                    }
                  >
                    {quote.source === "INVITATION" ? "Invitation" : "Admin"}
                  </span>
                </td>

                {/* STATUS */}
                <td className="px-4 py-4 text-center">
                  {renderStatus(quote.status)}
                </td>

                {/* DATE */}
                <td className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-500">
                  {new Date(quote.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    {/* EDIT */}
                    <button
                      type="button"
                      onClick={() => setSelectedQuote(quote)}
                      className="rounded-md border border-gray-300 p-2 hover:bg-gray-100"
                      title="Edit quote"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* PUBLISH / UNPUBLISH / UNREJECT */}
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(quote)}
                      disabled={updateStatusMutation.isPending}
                      className="rounded-md border border-gray-300 p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                      title={
                        quote.status === "PUBLISHED"
                          ? "Unpublish quote"
                          : quote.status === "REJECTED"
                            ? "Unreject quote"
                            : "Publish quote"
                      }
                    >
                      {quote.status === "PUBLISHED" ? (
                        <EyeOff size={16} />
                      ) : quote.status === "REJECTED" ? (
                        <RotateCcw size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                    {/* REJECT - INVITATION ONLY */}
                    {quote.source === "INVITATION" &&
                      quote.status !== "REJECTED" &&
                      quote.status !== "PUBLISHED" && (
                        <button
                          type="button"
                          onClick={() =>
                            updateStatusMutation.mutate({
                              id: quote.id,
                              status: "REJECTED",
                            })
                          }
                          disabled={updateStatusMutation.isPending}
                          className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Reject quote"
                        >
                          <XCircle size={16} />
                        </button>
                      )}

                    {/* DELETE */}
                    <button
                      type="button"
                      onClick={() => setQuoteToDelete(quote)}
                      className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50"
                      title="Delete quote"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* EMPTY TABLE */}
            {filteredQuotes.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No quotes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT */}
      {selectedQuote && (
        <EditQuote
          quote={selectedQuote}
          open={!!selectedQuote}
          onClose={() => setSelectedQuote(null)}
        />
      )}

      {/* DELETE */}
      {quoteToDelete && (
        <DeleteQuote
          quote={quoteToDelete}
          onClose={() => setQuoteToDelete(null)}
        />
      )}
    </div>
  );
}
