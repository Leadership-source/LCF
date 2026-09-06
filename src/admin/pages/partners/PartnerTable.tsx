import { Eye, EyeOff, Pencil, Search, Trash2, ArrowUpDown } from "lucide-react";

import { useState, type Dispatch, type SetStateAction } from "react";
import { ActionButton } from "./ActionButton";
import {
  updatePartnerStatus,
  type AdminPartner,
} from "../../../api/services/admin/partners.service";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { EditPartner } from "./EditPartner";
import { DeletePartner } from "./DeletePartner";

type SortBy =
  | "name-asc"
  | "name-desc"
  | "published-first"
  | "unpublished-first";

type PartnerTableProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  filteredPartners: AdminPartner[];
};

function getPartnerInitials(name: string) {
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function PartnerTable({
  search,
  setSearch,
  status,
  setStatus,
  filteredPartners,
}: PartnerTableProps) {
  const queryClient = useQueryClient();

  const [editingPartner, setEditingPartner] = useState<AdminPartner | null>(
    null,
  );

  const [deletingPartner, setDeletingPartner] = useState<AdminPartner | null>(
    null,
  );

  const [showSort, setShowSort] = useState(false);

  const [sortBy, setSortBy] = useState<SortBy>("name-asc");

  const statusMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "PUBLISHED" | "UNPUBLISHED";
    }) => updatePartnerStatus(id, status),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.setQueryData<AdminPartner[]>(
        ["admin-partners"],
        (oldPartners = []) =>
          oldPartners.map((partner) =>
            partner.id === response.data.id
              ? {
                  ...partner,
                  status: response.data.status,
                }
              : partner,
          ),
      );

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },

    onError: (error: any) => {
      console.error("STATUS UPDATE ERROR:", error.response?.data);

      toast.error(
        error?.response?.data?.message || "Failed to update partner status",
      );
    },
  });

  const searchedPartners = filteredPartners.filter((partner) => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) return true;

    return partner.name.toLowerCase().includes(searchTerm);
  });

  const sortedPartners = [...searchedPartners].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);

      case "name-desc":
        return b.name.localeCompare(a.name);

      case "published-first":
        return (
          Number(b.status === "PUBLISHED") - Number(a.status === "PUBLISHED")
        );

      case "unpublished-first":
        return (
          Number(b.status === "UNPUBLISHED") -
          Number(a.status === "UNPUBLISHED")
        );

      default:
        return 0;
    }
  });

  return (
    <div className="rounded-xl bg-white px-4 py-6 shadow-sm">
      <div className="space-y-6">
        {/* Search / Filter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative w-full max-w-sm">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                placeholder="Search partners..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-11 pr-4 outline-none focus:border-orange-500"
              />
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
            >
              <option value="All">All</option>
              <option value="PUBLISHED">Published</option>
              <option value="UNPUBLISHED">Unpublished</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSort((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border border-gray-400 px-6 py-2"
            >
              <ArrowUpDown size={16} />
              Filter
            </button>

            {showSort && (
              <div className="absolute right-0 z-30 top-12 w-56 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                <p className="px-3 py-2 text-xs font-semibold uppercase text-gray-400">
                  Sort by
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSortBy("name-asc");
                    setShowSort(false);
                  }}
                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Name A → Z
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSortBy("name-desc");
                    setShowSort(false);
                  }}
                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Name Z → A
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSortBy("published-first");
                    setShowSort(false);
                  }}
                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Published first
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSortBy("unpublished-first");
                    setShowSort(false);
                  }}
                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Unpublished first
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {sortedPartners.length === 0 ? (
          <div className="rounded-lg border border-gray-200 px-6 py-10 text-center">
            <p className="text-sm text-gray-500">No partners found.</p>
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="min-w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left md:px-6 md:py-4">#</th>

                  <th className="px-3 py-2 text-left md:px-6 md:py-4">
                    Partner
                  </th>

                  <th className="px-3 py-2 text-left md:px-6 md:py-4">Logo</th>

                  <th className="px-3 py-2 text-left md:px-6 md:py-4">
                    Status
                  </th>

                  <th className="px-3 py-2 text-left md:px-6 md:py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedPartners.map((partner, index) => (
                  <tr
                    key={partner.id}
                    className="border-b border-gray-300 last:border-none hover:bg-gray-50"
                  >
                    {/* Number */}
                    <td className="px-3 py-2 md:px-6 md:py-5">{index + 1}</td>

                    {/* Partner */}
                    <td className="px-3 py-2 md:px-6 md:py-5">
                      <div className="flex items-center gap-4">
                        {partner.logo ? (
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="h-12 w-12 rounded-lg object-contain"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-sm font-bold text-orange-600">
                            {getPartnerInitials(partner.name)}
                          </div>
                        )}

                        <h3 className="font-semibold">{partner.name}</h3>
                      </div>
                    </td>

                    {/* Logo */}
                    <td className="px-3 py-2 md:px-6 md:py-5">
                      {partner.logo ? (
                        <span className="text-sm text-green-600">Uploaded</span>
                      ) : (
                        <span className="text-sm text-gray-400">Initials</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-2 md:px-6 md:py-5">
                      <span
                        className={`rounded-full px-4 py-1 text-xs font-medium ${
                          partner.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {partner.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-2">
                        {/* Edit */}
                        <ActionButton
                          onClick={() => setEditingPartner(partner)}
                        >
                          <Pencil size={16} />
                        </ActionButton>

                        {/* Publish / Unpublish */}
                        <ActionButton
                          onClick={() => {
                            statusMutation.mutate({
                              id: partner.id,
                              status:
                                partner.status === "PUBLISHED"
                                  ? "UNPUBLISHED"
                                  : "PUBLISHED",
                            });
                          }}
                        >
                          {partner.status === "PUBLISHED" ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </ActionButton>

                        {/* Delete */}
                        <ActionButton
                          danger
                          onClick={() => setDeletingPartner(partner)}
                        >
                          <Trash2 size={16} />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingPartner && (
        <EditPartner
          partner={editingPartner}
          onClose={() => setEditingPartner(null)}
        />
      )}

      {/* Delete Modal */}
      {deletingPartner && (
        <DeletePartner
          partner={deletingPartner}
          onClose={() => setDeletingPartner(null)}
        />
      )}
    </div>
  );
}
