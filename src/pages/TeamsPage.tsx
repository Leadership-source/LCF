import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

import { getPublishedTeams } from "../api/services/public/teams.service";
import {
  externalRoleTypes,
  getPublishedExternalRoles,
  type ExternalRoleType,
} from "../api/services/public/externalRoles.service";

const externalRoleDetails: Record<ExternalRoleType, {
  title: string;
  description: string;
}> = {
  ADVISOR: {
    title: "Advisors",
    description: "Provide expert advice, insight, and strategic guidance to support LCF's work.",
  },
  PATRON: {
    title: "Patrons",
    description: "Support our mission and help amplify leadership and community development.",
  },
  BRAND_AMBASSADOR: {
    title: "Brand Ambassadors",
    description: "Help raise awareness of LCF and connect our work with wider communities.",
  },
  HONORARY_SUPPORTER: {
    title: "Honorary Supporters",
    description: "Stand alongside LCF as valued supporters of our programmes and vision.",
  },
  MENTEE: {
    title: "Mentors",
    description: "Support leadership development through mentoring and opportunities to grow.",
  },
};

function formatRoleType(roleType: ExternalRoleType) {
  return externalRoleDetails[roleType].title;
}

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
  const [selectedRoleType, setSelectedRoleType] = useState<ExternalRoleType>(
    "ADVISOR",
  );
  const {
    data: teams = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: getPublishedTeams,
    staleTime: 5 * 60 * 1000,
  });
  const {
    data: externalRoles = [],
    isLoading: externalRolesLoading,
    isError: externalRolesError,
  } = useQuery({
    queryKey: ["external-roles-public"],
    queryFn: getPublishedExternalRoles,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const selectedMembers = useMemo(
    () => externalRoles.filter((person) => person.roleType === selectedRoleType),
    [externalRoles, selectedRoleType],
  );

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

        <section className="bg-orange-100/50 mx-auto w-full px-6 py-10 md:px-8 lg:px-12">
          {/* Header */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500 md:text-sm">
              External Roles
            </p>

            <p className=" text-sm leading-7 text-gray-600 md:text-base">
              Our wider network includes people who guide, support, represent,
              and take part in the work of LCF. Select a role to meet the
              published members connected with it.
            </p>
          </div>

          {/* Role filters */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {externalRoleTypes.map((roleType) => {
              const role = externalRoleDetails[roleType];
              const memberCount = externalRoles.filter(
                (person) => person.roleType === roleType,
              ).length;

              return (
                <button
                  key={roleType}
                  type="button"
                  onClick={() => setSelectedRoleType(roleType)}
                  className={`rounded-xl p-5 text-left transition ${
                    selectedRoleType === roleType
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-white text-gray-900 hover:-translate-y-1 hover:shadow-sm"
                  }`}
                >
                  <h3 className="font-bold">{role.title}</h3>
                  <p className={`mt-2 text-sm leading-6 ${selectedRoleType === roleType ? "text-orange-50" : "text-gray-500"}`}>
                    {role.description}
                  </p>
                  <span className={`mt-4 inline-block text-xs font-semibold ${selectedRoleType === roleType ? "text-white" : "text-orange-600"}`}>
                    {memberCount} {memberCount === 1 ? "member" : "members"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* External People */}
          <div className="mt-14">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-orange-500 md:text-2xl">
                {formatRoleType(selectedRoleType)}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {externalRoleDetails[selectedRoleType].description}
              </p>
            </div>

            {externalRolesLoading ? (
              <p className="py-12 text-center text-gray-500">Loading external roles...</p>
            ) : externalRolesError ? (
              <p className="py-12 text-center text-red-500">
                External roles are temporarily unavailable. Please try again
                later.
              </p>
            ) : selectedMembers.length === 0 ? (
              <p className="rounded-xl bg-white px-6 py-12 text-center text-gray-500">
                No published members are currently listed for this role.
              </p>
            ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {selectedMembers.map((person) => (
                <div
                  key={person.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="group h-64 w-full overflow-hidden bg-orange-50">
                    <LazyLoadImage
                      src={person.image}
                      effect="blur"
                      alt={person.name}
                      wrapperClassName="h-full w-full"
                      className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                      {formatRoleType(person.roleType)}
                    </span>

                    <h4 className="mt-3 text-lg font-bold text-gray-900">
                      {person.name}
                    </h4>

                    {person.bio ? (
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">
                        {person.bio}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
