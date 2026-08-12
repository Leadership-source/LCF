import { useQuery } from "@tanstack/react-query";
import { Users, CalendarDays, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { getTeams } from "../../../api/services/admin/teams.service";
import { getEvents } from "../../../api/services/admin/events.service";
import DashboardSkeleton from "./DashboardSkeleton";

export default function DashboardPage() {
  // Get teams
  const { data: teams = [], isLoading: teamsLoading } = useQuery({
    queryKey: ["admin-teams"],
    queryFn: getTeams,
  });

  // Get events
  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: getEvents,
  });

  const isLoading = teamsLoading || eventsLoading;

  // Calculate statistics
  const publishedTeams = teams.filter((team) => team.status === "PUBLISHED");

  const unpublishedEvents = events.filter(
    (event) => event.status === "UNPUBLISHED",
  );

  // Stats used by your existing UI
  const stats = [
    {
      title: "Total Team Members",
      value: teams.length,
      icon: Users,
      description: "All team members",
    },
    {
      title: "Published Team Members",
      value: publishedTeams.length,
      icon: Eye,
      description: "Currently visible",
    },
    {
      title: "Total Events",
      value: events.length,
      icon: CalendarDays,
      description: "All events",
    },
    {
      title: "Unpublished Events",
      value: unpublishedEvents.length,
      icon: EyeOff,
      description: "Currently hidden",
    },
  ];

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back. Here's an overview of your website.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-orange-100 p-3">
                  <Icon size={22} className="text-orange-500" />
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm text-gray-500">{stat.title}</p>

                <h2 className="mt-1 text-3xl font-bold text-gray-900">
                  {stat.value}
                </h2>

                <p className="mt-1 text-xs text-gray-400">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-gray-900">Quick Actions</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/admin/teams"
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-orange-100 p-3">
                <Users size={22} className="text-orange-500" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Manage Team</h3>

                <p className="text-sm text-gray-500">
                  Add, edit, publish or remove team members.
                </p>
              </div>
            </div>

            <ArrowRight
              size={20}
              className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-orange-500"
            />
          </Link>

          <Link
            to="/admin/events"
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-orange-100 p-3">
                <CalendarDays size={22} className="text-orange-500" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Manage Events</h3>

                <p className="text-sm text-gray-500">
                  Create, edit, publish or remove events.
                </p>
              </div>
            </div>

            <ArrowRight
              size={20}
              className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-orange-500"
            />
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-900">Recent Activity</h2>

            <p className="mt-1 text-sm text-gray-500">
              Recent activity on your website.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-400">
            No recent activity yet.
          </p>
        </div>
      </div>
    </div>
  );
}
