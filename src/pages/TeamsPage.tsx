import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getPublishedTeams } from "../api/services/public/teams.service";

export default function TeamsPage() {
  const { data: teams = [], isLoading, isError } = useQuery({
    queryKey: ["teams"],
    queryFn: getPublishedTeams,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="mt-25 max-w-7xl px-4 py-14 md:px-8 lg:px-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-orange-500 md:text-sm">
          Our Leadership Team
        </p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
          Meet the Leaders
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">
          Dedicated individuals driving positive change across our communities.
        </p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-md">
              <div className="h-64 w-full bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-5 w-36 rounded bg-gray-200" />
                <div className="h-3 w-full rounded bg-gray-200" />
                <div className="h-3 w-4/5 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <p className="py-20 text-center text-red-500">Failed to load team members.</p>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((member) => (
            <div
              key={member.id}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Fixed-height image */}
              <div className="overflow-hidden">
                <LazyLoadImage
                  src={member.image}
                  alt={member.name}
                  effect="blur"
                  className="h-64 w-full object-cover object-top transition duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                  {member.role}
                </span>

                <h3 className="mt-3 text-lg font-bold text-gray-900">
                  {member.name}
                </h3>

                {member.bio ? (
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {member.bio}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
