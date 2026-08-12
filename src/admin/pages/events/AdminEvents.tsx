import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { StatCard } from "./Statistics";

import { getEvents } from "../../../api/services/admin/events.service";
import { AddEvent } from "./AddEvents";
import { EventTable } from "./EventsTable";
import { EventSkeleton } from "./EventsSkeleton";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-events"],
    queryFn: getEvents,
  });

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchValue = search.toLowerCase();

      const matchSearch =
        event.title.toLowerCase().includes(searchValue) ||
        event.category.toLowerCase().includes(searchValue) ||
        event.location.toLowerCase().includes(searchValue);

      const matchStatus = status === "All" || event.status === status;

      const matchCategory = category === "All" || event.category === category;

      return matchSearch && matchStatus && matchCategory;
    });
  }, [events, search, status, category]);

  const published = events.filter(
    (event) => event.status === "PUBLISHED",
  ).length;

  const unpublished = events.filter(
    (event) => event.status === "UNPUBLISHED",
  ).length;

  if (isLoading) {
    return <EventSkeleton />;
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load events.
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold md:text-2xl">Events</h1>
        </div>

        <AddEvent />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <StatCard
          title="Total Events"
          value={events.length}
          icon={<CalendarDays className="text-orange-500" size={18} />}
        />

        <StatCard
          title="Published Events"
          value={published}
          icon={<CheckCircle2 className="text-green-600" size={18} />}
        />

        <StatCard
          title="Draft Events"
          value={unpublished}
          icon={<FileText className="text-blue-500" size={18} />}
        />

        <StatCard
          title="Upcoming Events"
          value={events.length}
          icon={<CalendarDays className="text-purple-500" size={18} />}
        />
      </div>

      {/* Event table */}
      <EventTable
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        category={category}
        setCategory={setCategory}
        filteredEvents={filteredEvents}
      />
    </section>
  );
}
