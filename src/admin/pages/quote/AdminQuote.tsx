import { useMemo, useState } from "react";
import {
  MessageSquareQuote,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { StatCard } from "../events/Statistics";
import { getQuotes } from "../../../api/services/admin/quote.service";
import { QuoteSkeleton } from "./QuotesSkeleton";
import { AddQuote } from "./AddQuote";
import { QuoteTable } from "./QuoteTable";
import { InviteLeader } from "./InviteLeader";
import { QuoteInvitationTable } from "./QuoteInvitaionTable";

export default function QuotesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const {
    data: quotes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-quotes"],
    queryFn: getQuotes,
  });

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const searchValue = search.toLowerCase();

      const matchSearch =
        quote.name.toLowerCase().includes(searchValue) ||
        quote.role.toLowerCase().includes(searchValue) ||
        quote.quote.toLowerCase().includes(searchValue);

      const matchStatus = status === "All" || quote.status === status;

      return matchSearch && matchStatus;
    });
  }, [quotes, search, status]);

  const published = quotes.filter(
    (quote) => quote.status === "PUBLISHED",
  ).length;

  const pending = quotes.filter((quote) => quote.status === "PENDING").length;

  const drafts = quotes.filter((quote) => quote.status === "DRAFT").length;

  if (isLoading) {
    return <QuoteSkeleton />;
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load quotes.
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 items-start md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-lg font-bold md:text-2xl">Leaders' Quotes</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage inspirational quotes from leaders and industry professionals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <InviteLeader />
          <AddQuote />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <StatCard
          title="Total Quotes"
          value={quotes.length}
          icon={<MessageSquareQuote className="text-orange-500" size={18} />}
        />

        <StatCard
          title="Published"
          value={published}
          icon={<CheckCircle2 className="text-green-600" size={18} />}
        />

        <StatCard
          title="Pending Review"
          value={pending}
          icon={<Clock className="text-yellow-500" size={18} />}
        />

        <StatCard
          title="Drafts"
          value={drafts}
          icon={<FileText className="text-blue-500" size={18} />}
        />
      </div>

      {/* Table */}
      <QuoteTable
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        filteredQuotes={filteredQuotes}
      />

      {/* Invitations */}
      <QuoteInvitationTable />
    </section>
  );
}
