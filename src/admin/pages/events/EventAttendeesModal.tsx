import { useRef } from "react";
import { X, Printer, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  getEventAttendees,
} from "../../../api/services/admin/events.service";

type Props = {
  eventId: string;
  onClose: () => void;
};

export function EventAttendeesModal({ eventId, onClose }: Props) {
  const printRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["event-attendees", eventId],
    queryFn: () => getEventAttendees(eventId),
  });

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;

    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) return;

    win.document.write(`
      <html>
        <head>
          <title>Attendees — ${data?.event.title ?? ""}</title>
          <style>
            body { font-family: sans-serif; padding: 24px; color: #111; }
            h1 { font-size: 20px; margin-bottom: 4px; }
            p { font-size: 13px; color: #555; margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; font-size: 13px; }
            th { background: #f3f4f6; text-align: left; padding: 8px 12px; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
            td { padding: 8px 12px; border-bottom: 1px solid #e5e7eb; }
            tr:last-child td { border-bottom: none; }
          </style>
        </head>
        <body>${content.innerHTML}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <Users size={20} className="text-orange-500" />
            <div>
              <h2 className="font-bold text-gray-900">
                {isLoading ? "Loading…" : (data?.event.title ?? "Attendees")}
              </h2>
              {data && (
                <p className="text-xs text-gray-500">
                  {data.total} registered ·{" "}
                  {new Date(data.event.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {data.event.location}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {data && data.total > 0 && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <Printer size={15} />
                Print
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isLoading ? (
            <p className="py-10 text-center text-gray-400">Loading attendees…</p>
          ) : isError ? (
            <p className="py-10 text-center text-red-500">
              Failed to load attendees.
            </p>
          ) : data!.total === 0 ? (
            <p className="py-10 text-center text-gray-400">
              No registrations yet.
            </p>
          ) : (
            /* printRef wraps only the printable content */
            <div ref={printRef}>
              <h1 style={{ fontSize: 20, marginBottom: 4 }}>{data!.event.title}</h1>
              <p style={{ fontSize: 13, color: "#555", marginBottom: 16 }}>
                {new Date(data!.event.date).toLocaleDateString("en-GB", {
                  day: "numeric", month: "long", year: "numeric",
                })} · {data!.event.location} · {data!.total} attendees
              </p>

              <table className="w-full text-sm">
                <thead className="border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Phone</th>
                    <th className="px-4 py-2">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data!.attendees.map((a, i) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                      <td className="px-4 py-2 font-medium text-gray-900">{a.name}</td>
                      <td className="px-4 py-2 text-gray-600">{a.email}</td>
                      <td className="px-4 py-2 text-gray-500">{a.phone ?? "—"}</td>
                      <td className="px-4 py-2 text-gray-500">
                        {new Date(a.registeredAt).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
