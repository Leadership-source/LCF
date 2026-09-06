import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPartners } from "../../../api/services/admin/partners.service";
import { PartnerTable } from "./PartnerTable";
import { AddPartner } from "./AddPartner";

export default function PartnersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const {
    data: partners = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-partners"],
    queryFn: getPartners,
  });

  const filteredPartners = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return partners.filter((partner) => {
      const matchesSearch =
        !searchTerm || partner.name.toLowerCase().includes(searchTerm);

      const matchesStatus = status === "All" || partner.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [partners, search, status]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Partners & Supporters
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage the organisations that support and collaborate with the
            Leadership Conference Forum.
          </p>
        </div>

        <AddPartner />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-xl bg-white px-4 py-10 text-center shadow-sm">
          <p className="text-sm text-gray-500">Loading partners...</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-xl bg-white px-4 py-10 text-center shadow-sm">
          <p className="text-sm text-red-500">Failed to load partners.</p>
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <PartnerTable
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          filteredPartners={filteredPartners}
        />
      )}
    </div>
  );
}
