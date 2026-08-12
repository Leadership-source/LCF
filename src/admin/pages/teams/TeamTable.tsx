import { Eye, EyeOff, Pencil, Search, Trash2, ArrowUpDown } from "lucide-react";
import { ActionButton } from "./ActionButton";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { AdminTeam } from "../../../api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateTeamStatus } from "../../../api/services/admin/teams.service";
import { EditTeam } from "./EditTeam";
import { DeleteTeam } from "./DeleteTeam";

// import { updateTeamStatus} from ""

type SortBy =
  | "name-asc"
  | "name-desc"
  | "role-asc"
  | "role-desc"
  | "published-first"
  | "unpublished-first";

type TeamTableProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  filteredTeams: AdminTeam[];

  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
};
export function TeamTable({
  search,
  setSearch,
  status,
  setStatus,
  filteredTeams,

  setSortBy,
}: TeamTableProps) {
  const queryClient = useQueryClient();
  const [editingTeam, setEditingTeam] = useState<AdminTeam | null>(null);
  const [deletingTeam, setDeletingTeam] = useState<AdminTeam | null>(null);

  const [showSort, setShowSort] = useState(false);

  const statusMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "PUBLISHED" | "UNPUBLISHED";
    }) => updateTeamStatus(id, status),

    onSuccess: (response) => {
      toast.success(response.message);

      // Immediately update the team in React Query cache
      queryClient.setQueryData<AdminTeam[]>(["admin-teams"], (oldTeams = []) =>
        oldTeams.map((team) =>
          team.id === response.data.id
            ? {
                ...team,
                status: response.data.status,
              }
            : team,
        ),
      );
    },

    onError: (error: any) => {
      console.error("STATUS UPDATE ERROR:", error.response?.data);

      toast.error(
        error?.response?.data?.message || "Failed to update team status",
      );
    },
  });

  const searchedTeams = filteredTeams.filter((member) => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) return true;

    return (
      member.name.toLowerCase().includes(searchTerm) ||
      member.role.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="rounded-xl px-4 py-6 bg-white shadow-sm">
      {/* Search */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4    md:flex-col  md:justify-between">
          <div className="flex relative flex-col gap-4 md:flex-row md:justify-between md:items-center ">
            <div className="flex flex-1 gap-4">
              <div className="relative w-full max-w-sm">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  placeholder="Search team members..."
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

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSort((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg border border-gray-400 px-6 py-2"
              >
                <ArrowUpDown size={16} />
                Filter
              </button>
            </div>

            {showSort && (
              <div className="absolute left-0 z-30  lg:left-160 lg:top-12 top-25 w-56 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
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
                    setSortBy("role-asc");
                    setShowSort(false);
                  }}
                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Role A → Z
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSortBy("role-desc");
                    setShowSort(false);
                  }}
                  className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Role Z → A
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

          {/* Table */}
          <div className="overflow-x-auto border border-gray-300 rounded-lg ">
            <table className="min-w-full ">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-3 py-2 md:px-6 md:py-4 text-left">#</th>
                  <th className="px-3 py-2 md:px-6 md:py-4 text-left">
                    Member
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-4 text-left">
                    Role / Position
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-4 text-left">
                    Status
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-4 text-left">
                    Display Order
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-4 text-left">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {searchedTeams.map((member, index) => (
                  <tr
                    key={member.id}
                    className="border-b last:border-none border-gray-300 hover:bg-gray-50"
                  >
                    <td className="px-3 py-2 md:px-6 md:py-5">{index + 1}</td>

                    <td className="px-3 py-2 md:px-6 md:py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={member.image}
                          loading="lazy"
                          alt={member.name}
                          className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover"
                        />

                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                        </div>
                      </div>
                    </td>

                    <td className="px-20 py-7 md:px-6 md:py-5 max-w-xs">
                      {member.role}
                    </td>

                    <td className=" md:px-6 md:py-5">
                      <span
                        className={`rounded-full px-4 py-1 text-xs font-medium ${
                          member.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-center">
                      {member.displayOrder}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-2">
                        <ActionButton onClick={() => setEditingTeam(member)}>
                          <Pencil size={16} />
                        </ActionButton>
                        <ActionButton
                          onClick={() => {
                            statusMutation.mutate({
                              id: member.id,
                              status:
                                member.status === "PUBLISHED"
                                  ? "UNPUBLISHED"
                                  : "PUBLISHED",
                            });
                          }}
                        >
                          {member.status === "PUBLISHED" ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </ActionButton>

                        <ActionButton
                          danger
                          onClick={() => setDeletingTeam(member)}
                        >
                          <Trash2 size={16} />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
                {searchedTeams.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No team members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {editingTeam && (
          <EditTeam team={editingTeam} onClose={() => setEditingTeam(null)} />
        )}
        {deletingTeam && (
          <DeleteTeam
            team={deletingTeam}
            onClose={() => setDeletingTeam(null)}
          />
        )}
      </div>
    </div>
  );
}
