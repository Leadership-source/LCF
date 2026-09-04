import { useState } from "react";
import { ChevronDown, ChevronUp, Mail, UsersRound } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getVolunteerApplications,
  markVolunteerApplicationRead,
  type VolunteerApplication,
} from "../../../api/services/admin/volunteer.service";

export default function VolunteerApplicationsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["volunteer-applications"],
    queryFn: getVolunteerApplications,
  });

  const markReadMutation = useMutation({
    mutationFn: markVolunteerApplicationRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteer-applications"] });
    },
  });

  const handleToggle = (application: VolunteerApplication) => {
    setExpandedId((current) => current === application.id ? null : application.id);
    if (!application.isRead) markReadMutation.mutate(application.id);
  };

  if (isLoading) {
    return <div className="py-20 text-center text-sm text-gray-500">Loading volunteer applications...</div>;
  }

  if (isError) {
    return <div className="py-20 text-center text-red-500">Failed to load volunteer applications.</div>;
  }

  return (
    <section className="space-y-8">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
          <UsersRound size={22} />
        </div>
        <div>
          <h1 className="text-lg font-bold md:text-2xl">Volunteer Applications</h1>
          <p className="mt-1 text-sm text-gray-500">Review volunteer enquiries and respond directly to applicants.</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="border-b bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-4 text-sm font-semibold">Applicant</th>
              <th className="px-4 py-4 text-sm font-semibold">Area</th>
              <th className="px-4 py-4 text-sm font-semibold">Received</th>
              <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <ApplicationRow
                key={application.id}
                application={application}
                isExpanded={expandedId === application.id}
                onToggle={() => handleToggle(application)}
              />
            ))}
            {!applications.length && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">No volunteer applications have been received.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ApplicationRow({ application, isExpanded, onToggle }: { application: VolunteerApplication; isExpanded: boolean; onToggle: () => void }) {
  const detailEntries = Object.entries(application.details || {});

  return (
    <>
      <tr className={`border-b border-gray-200 hover:bg-gray-50 ${application.isRead ? "" : "bg-orange-50/60"}`}>
        <td className="px-4 py-4">
          <div className="flex items-center gap-2"><p className="text-sm font-medium text-gray-900">{application.fullName}</p>{!application.isRead && <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-medium text-white">New</span>}</div>
          <p className="mt-1 text-sm text-gray-500">{application.email}</p>
        </td>
        <td className="px-4 py-4 text-sm text-gray-600">{application.areaOfInterest.replaceAll("_", " ")}</td>
        <td className="px-4 py-4 text-sm text-gray-600">{new Date(application.createdAt).toLocaleString()}</td>
        <td className="px-4 py-4">
          <div className="flex justify-center gap-2">
            <a href={`mailto:${application.email}?subject=${encodeURIComponent("Your LCF volunteer application")}`} className="rounded-md border border-orange-200 bg-orange-50 p-2 text-orange-600 transition hover:bg-orange-100" title={`Email ${application.fullName}`}>
              <Mail size={16} />
            </a>
            <button type="button" onClick={onToggle} className="rounded-md border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100" title={isExpanded ? "Hide application details" : "Show application details"}>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="border-b border-gray-200 bg-orange-50/40">
          <td colSpan={4} className="px-4 py-5">
            <dl className="grid gap-4 text-sm md:grid-cols-3">
              <div><dt className="font-semibold text-gray-700">Phone</dt><dd className="mt-1 text-gray-600">{application.phone || "Not provided"}</dd></div>
              <div><dt className="font-semibold text-gray-700">Availability</dt><dd className="mt-1 text-gray-600">{application.availability}</dd></div>
              <div><dt className="font-semibold text-gray-700">Status</dt><dd className="mt-1 text-gray-600">{application.status}</dd></div>
              {detailEntries.map(([name, value]) => <div key={name}><dt className="font-semibold capitalize text-gray-700">{name.replace(/([A-Z])/g, " $1")}</dt><dd className="mt-1 whitespace-pre-wrap text-gray-600">{value}</dd></div>)}
              <div className="md:col-span-3"><dt className="font-semibold text-gray-700">Message</dt><dd className="mt-1 whitespace-pre-wrap text-gray-600">{application.message || "No message provided."}</dd></div>
            </dl>
          </td>
        </tr>
      )}
    </>
  );
}