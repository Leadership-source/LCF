import {
  CalendarDays,
  Eye,
  EyeOff,
  Pencil,
  Search,
  Trash2,
  UsersRound,
} from "lucide-react";

import { useState, type Dispatch, type SetStateAction } from "react";

import type { AdminEvent } from "../../../api/types";
import { EditEvent } from "./EditEvents";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEventStatus } from "../../../api/services/admin/events.service";
import { DeleteEvent } from "./DeleteEvents";
import { EventAttendeesModal } from "./EventAttendeesModal";

type EventTableProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

  status: string;
  setStatus: Dispatch<SetStateAction<string>>;

  category: string;
  setCategory: Dispatch<SetStateAction<string>>;

  filteredEvents: AdminEvent[];
};

export function EventTable({
  search,
  setSearch,
  status,
  setStatus,
  category,
  setCategory,
  filteredEvents,
}: EventTableProps) {
  const [selectedEvent, setSelectedEvent] = useState<AdminEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<AdminEvent | null>(null);
  const [attendeesEventId, setAttendeesEventId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "PUBLISHED" | "UNPUBLISHED";
    }) => updateEventStatus(id, status),

    onSuccess: (response) => {
      toast.success(response?.message || "Event status updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-events"],
      });
    },

    onError: (error: any) => {
      console.error("UPDATE EVENT STATUS ERROR:", error?.response?.data);

      toast.error(
        error?.response?.data?.message || "Failed to update event status",
      );
    },
  });

  const handleToggleStatus = (event: AdminEvent) => {
    const newStatus =
      event.status === "PUBLISHED" ? "UNPUBLISHED" : "PUBLISHED";

    updateStatusMutation.mutate({
      id: event.id,
      status: newStatus,
    });
  };

  return (
    <div className="rounded-xl bg-white px-4 py-6 shadow-sm">
      {/* Search and filters */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search events..."
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
          <option value="UNPUBLISHED">Draft</option>
        </select>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
        >
          <option value="All">All Categories</option>

          {[...new Set(filteredEvents.map((event) => event.category))].map(
            (item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ),
          )}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-center">Event</th>
              <th className="px-4 py-4 text-center">Category</th>
              <th className="px-4 py-4 text-center">Date & Time</th>
              <th className="px-4 py-4 text-center">Location</th>
              <th className="px-4 py-4 text-center">Status</th>
              <th className="px-4 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEvents.map((event) => (
              <tr
                key={event.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                {/* Event */}
                <td className="px-4 py-2 md:px-10">
                  <div className="flex items-center gap-4">
                    <img
                      src={event.image}
                      loading="lazy"
                      alt={event.title}
                      className="h-16 w-24 rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-sm">{event.title}</h3>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-30  text-center py-4 md:px-20">
                  <span className="rounded-md  bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                    {event.category}
                  </span>
                </td>

                {/* Date */}
                <td className="px-4 py-4">
                  <div className="flex text-sm items-center gap-2">
                    <CalendarDays size={15} className="text-gray-500" />

                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">{event.time}</p>
                </td>

                {/* Location */}
                <td className="px-4 py-4">
                  <p className="font-medium text-sm">{event.location}</p>

                  <p className="text-sm text-gray-500 ">{event.venue}</p>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      event.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {event.status === "PUBLISHED" ? "Published" : "Draft"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAttendeesEventId(event.id)}
                      className="flex items-center gap-1.5 rounded-md border border-orange-200 bg-orange-50 px-2.5 py-1.5 text-xs font-medium text-orange-600 hover:bg-orange-100"
                      title="View attendees"
                    >
                      <UsersRound size={14} />
                      Attendees
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="rounded-md border border-gray-300 p-2 hover:bg-gray-100"
                      title="Edit event"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(event)}
                      disabled={updateStatusMutation.isPending}
                      className="rounded-md border border-gray-300 p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                      title={
                        event.status === "PUBLISHED"
                          ? "Unpublish event"
                          : "Publish event"
                      }
                    >
                      {event.status === "PUBLISHED" ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEventToDelete(event)}
                      className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50"
                      title="Delete event"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredEvents.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedEvent && (
        <EditEvent
          event={selectedEvent}
          open={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      {eventToDelete && (
        <DeleteEvent
          event={eventToDelete}
          onClose={() => setEventToDelete(null)}
        />
      )}
      {attendeesEventId && (
        <EventAttendeesModal
          eventId={attendeesEventId}
          onClose={() => setAttendeesEventId(null)}
        />
      )}
    </div>
  );
}
