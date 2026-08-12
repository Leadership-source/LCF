import { useMemo, useState } from "react";
import { CheckCircle2, EyeOff, Users, ArrowUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { StatCard } from "./Statistics";
import { AddTeam } from "./AddTeam";
import { TeamTable } from "./TeamTable";
import { getTeams } from "../../../api/services/admin/teams.service";
import { TeamSkeleton } from "./TeamSkeleton";

export default function TeamsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState<
    | "name-asc"
    | "name-desc"
    | "role-asc"
    | "role-desc"
    | "published-first"
    | "unpublished-first"
  >("name-asc");

  const {
    data: teams = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-teams"],
    queryFn: getTeams,
  });

  const filteredAndSortedTeams = useMemo(() => {
    const filtered = teams.filter((member) => {
      return status === "All" || member.status === status;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);

        case "name-desc":
          return b.name.localeCompare(a.name);

        case "role-asc":
          return a.role.localeCompare(b.role);

        case "role-desc":
          return b.role.localeCompare(a.role);

        case "published-first":
          return a.status === "PUBLISHED" ? -1 : 1;

        case "unpublished-first":
          return a.status === "UNPUBLISHED" ? -1 : 1;

        default:
          return 0;
      }
    });
  }, [teams, status, sortBy]);

  const published = teams.filter(
    (member) => member.status === "PUBLISHED",
  ).length;

  const unpublished = teams.filter(
    (member) => member.status === "UNPUBLISHED",
  ).length;

  // const matchStatus =
  // status === "All" || member.status === status;

  if (isLoading) {
    return <TeamSkeleton />;
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load team members.
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold md:text-2xl">Team Members</h1>
        </div>

        <AddTeam />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <StatCard
          title="Total Members"
          value={teams.length}
          icon={<Users className="text-orange-500" size={16} />}
        />

        <StatCard
          title="Published Members"
          value={published}
          icon={<CheckCircle2 className="text-green-600" size={16} />}
        />

        <StatCard
          title="Unpublished Members"
          value={unpublished}
          icon={<EyeOff className="text-orange-500" size={16} />}
        />

        <StatCard
          title="Display Order"
          value="Drag to reorder"
          icon={<ArrowUpDown className="text-orange-500" size={16} />}
        />
      </div>

      {/* Table */}
      <TeamTable
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        filteredTeams={filteredAndSortedTeams}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </section>
  );
}
