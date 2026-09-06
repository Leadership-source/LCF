import { useQuery } from "@tanstack/react-query";

import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

import { getPublishedTeams } from "../api/services/public/teams.service";
import { externalPeople, externalRoles } from "../static-data/data";

// ============================================================
// TEAM HERO
// ============================================================

export function TeamHero() {
  return (
    <section className="relative mt-15 overflow-hidden bg-[#EA580C] text-white">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "35px 35px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto mt-15 flex max-w-7xl flex-col gap-4 px-6 py-10 md:px-8 lg:px-12">
        <div className="flex max-w-3xl flex-col gap-4">
          <h1 className="text-2xl font-bold leading-[1.08] tracking-tight text-[#ffdcc0] md:text-4xl lg:text-5xl">
            Our People
          </h1>

          <p className="max-w-2xl text-base leading-7 text-white md:text-md md:leading-8">
            Meet the dedicated individuals, leaders, professionals, and
            community supporters who contribute to the work and vision of the
            Leadership Conference Forum.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function TeamsPage() {
  const {
    data: teams = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: getPublishedTeams,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <TeamHero />

      <main>
        <section className="mx-auto w-full px-6 py-10 md:px-8 lg:px-12">
          {/* Header */}
          <div className="space-y-1 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500 md:text-sm">
              Our Leadership Team
            </p>

            <h2 className=" text-xl font-bold text-gray-900 md:text-3xl ">
              Meet the Leaders
            </h2>

            <p className="mx-auto  max-w-2xl text-sm leading-relaxed text-gray-500">
              Dedicated individuals driving positive change across our
              communities.
            </p>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-md"
                >
                  <div className="h-60 w-full bg-gray-200" />

                  <div className="space-y-3 p-6">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-5 w-36 rounded bg-gray-200" />
                    <div className="h-3 w-full rounded bg-gray-200" />
                    <div className="h-3 w-4/5 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <p className="py-20 text-center text-red-500">
              Failed to load team members.
            </p>
          )}

          {/* Team Members */}
          {!isLoading && !isError && (
            <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((member) => (
                <div
                  key={member.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="group h-60 w-full overflow-hidden">
                    <LazyLoadImage
                      src={member.image}
                      effect="blur"
                      alt={member.name}
                      wrapperClassName="w-full"
                      className="h-60 w-full object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                  </div>

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

        {/* ===================================================
            EXTERNAL ROLES
        ==================================================== */}

        <section className=" bg-orange-100/50 mx-auto w-full px-6 py-10 md:px-8 lg:px-12">
          {/* Header */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500 md:text-sm">
              External Roles
            </p>

            <p className=" text-sm leading-7 text-gray-600 md:text-base">
              In addition to the trustees, we engage with dignitaries,
              professionals, and community leaders to act as Advisors, Patrons,
              Brand Ambassadors, and Honorary Supporters. Their expertise and
              endorsement help to guide our work, strengthen our credibility,
              and expand our reach.
            </p>
          </div>

          {/* Role Descriptions */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {externalRoles.map((role) => (
              <div
                key={role.title}
                className="rounded-xl space-y-2 border border-orange-100 bg-white p-6 transition hover:border-orange-100 hover:shadow-sm"
              >
                <h3 className="text-lg font-bold text-orange-500">
                  {role.title}
                </h3>

                <p className=" text-sm leading-7 text-gray-500">
                  {role.description}
                </p>
              </div>
            ))}
          </div>

          {/* External People */}
          <div className="mt-14">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-orange-500 md:text-2xl">
                Our External Supporters
              </h3>

              <p className="mt-2 text-sm text-black">
                Meet some of the individuals supporting the work of LCF.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {externalPeople.map((person) => (
                <div
                  key={person.name}
                  className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="group h-64 w-full overflow-hidden bg-orange-50">
                    {person.image ? (
                      <LazyLoadImage
                        src={person.image}
                        effect="blur"
                        alt={person.name}
                        wrapperClassName="h-full w-full"
                        className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-sm text-gray-400">
                          Photo coming soon
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                      {person.role}
                    </span>

                    <h4 className="mt-3 text-lg font-bold text-gray-900">
                      {person.name}
                    </h4>

                    {person.title ? (
                      <p className="mt-2 text-sm font-medium text-gray-600">
                        {person.title}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm italic text-gray-400">
                        Professional title coming soon
                      </p>
                    )}

                    {person.bio ? (
                      <p className="mt-4 text-sm leading-relaxed text-gray-600">
                        {person.bio}
                      </p>
                    ) : null}

                    {person.quote ? (
                      <blockquote className="mt-4 border-l-2 border-orange-500 pl-4 text-sm italic leading-6 text-gray-600">
                        “{person.quote}”
                      </blockquote>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
