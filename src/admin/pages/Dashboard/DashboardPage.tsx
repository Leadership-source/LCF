import { useQuery } from "@tanstack/react-query";

import {
  Users,
  CalendarDays,
  Eye,
  EyeOff,
  ArrowRight,
  MessageSquareQuote,
  Newspaper,
  CheckCircle2,
  Clock,
} from "lucide-react";

import { Link } from "react-router-dom";

import { getTeams } from "../../../api/services/admin/teams.service";
import { getEvents } from "../../../api/services/admin/events.service";
import { getTestimonials } from "../../../api/services/admin/testimonial.service";
import { getNews } from "../../../api/services/admin/news.service";
import { getQuotes } from "../../../api/services/admin/quote.service";

import DashboardSkeleton from "./DashboardSkeleton";

export default function DashboardPage() {
  // ======================================================
  // GET TEAMS
  // ======================================================

  const { data: teams = [], isLoading: teamsLoading } = useQuery({
    queryKey: ["admin-teams"],
    queryFn: getTeams,
  });

  // ======================================================
  // GET EVENTS
  // ======================================================

  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: getEvents,
  });

  // ======================================================
  // GET TESTIMONIALS
  // ======================================================

  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: getTestimonials,
  });

  // ======================================================
  // GET NEWS
  // ======================================================

  const { data: news = [], isLoading: newsLoading } = useQuery({
    queryKey: ["admin-news"],
    queryFn: getNews,
  });

  // ======================================================
  // GET QUOTES
  // ======================================================

  const { data: quotes = [], isLoading: quotesLoading } = useQuery({
    queryKey: ["admin-quotes"],
    queryFn: getQuotes,
  });

  // ======================================================
  // LOADING STATE
  // ======================================================

  const isLoading =
    teamsLoading ||
    eventsLoading ||
    testimonialsLoading ||
    newsLoading ||
    quotesLoading;

  // ======================================================
  // TEAM STATISTICS
  // ======================================================

  const publishedTeams = teams.filter((team) => team.status === "PUBLISHED");

  // ======================================================
  // EVENT STATISTICS
  // ======================================================

  const unpublishedEvents = events.filter(
    (event) => event.status === "UNPUBLISHED",
  );

  // ======================================================
  // TESTIMONIAL STATISTICS
  // ======================================================

  const pendingTestimonials = testimonials.filter(
    (testimonial) => testimonial.status === "PENDING",
  );

  // ======================================================
  // NEWS STATISTICS
  // ======================================================

  const publishedNews = news.filter((article) => article.isPublished);

  const unpublishedNews = news.filter((article) => !article.isPublished);

  // ======================================================
  // QUOTE STATISTICS
  // ======================================================

  const publishedQuotes = quotes.filter(
    (quote) => quote.status === "PUBLISHED",
  );

  const pendingQuotes = quotes.filter((quote) => quote.status === "PENDING");

  // ======================================================
  // DASHBOARD STATS
  // ======================================================

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
    {
      title: "Pending Testimonials",
      value: pendingTestimonials.length,
      icon: MessageSquareQuote,
      description: "Reviews awaiting approval",
    },
    {
      title: "Total News",
      value: news.length,
      icon: Newspaper,
      description: "All news articles",
    },
    {
      title: "Published News",
      value: publishedNews.length,
      icon: CheckCircle2,
      description: "Currently visible",
    },
    {
      title: "Unpublished News",
      value: unpublishedNews.length,
      icon: EyeOff,
      description: "Currently hidden",
    },
    {
      title: "Total Quotes",
      value: quotes.length,
      icon: MessageSquareQuote,
      description: "All leadership quotes",
    },
    {
      title: "Published Quotes",
      value: publishedQuotes.length,
      icon: CheckCircle2,
      description: "Currently visible",
    },
    {
      title: "Pending Quotes",
      value: pendingQuotes.length,
      icon: Clock,
      description: "Quotes awaiting approval",
    },
  ];

  // ======================================================
  // LOADING
  // ======================================================

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // ======================================================
  // DASHBOARD
  // ======================================================

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
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
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
          {/* Manage Team */}
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

          {/* Manage Events */}
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

          {/* Manage Testimonials */}
          <Link
            to="/admin/testimonials"
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-orange-100 p-3">
                <MessageSquareQuote size={22} className="text-orange-500" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Manage Testimonials
                </h3>

                <p className="text-sm text-gray-500">
                  Review, approve or reject visitor testimonials.
                </p>
              </div>
            </div>

            <ArrowRight
              size={20}
              className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-orange-500"
            />
          </Link>

          {/* Manage News */}
          <Link
            to="/admin/news"
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-orange-100 p-3">
                <Newspaper size={22} className="text-orange-500" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Manage News</h3>

                <p className="text-sm text-gray-500">
                  Create, edit, publish or remove news articles.
                </p>
              </div>
            </div>

            <ArrowRight
              size={20}
              className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-orange-500"
            />
          </Link>

          {/* Manage Quotes */}
          <Link
            to="/admin/quotes"
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-orange-100 p-3">
                <MessageSquareQuote size={22} className="text-orange-500" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Manage Quotes</h3>

                <p className="text-sm text-gray-500">
                  Review, publish or reject leadership quotes.
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
