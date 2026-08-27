import { Mail, Users } from "lucide-react";

import {
  externalRoles,
  legalNoticeSections,
  organisationInformation,
} from "../static-data/data";

import legalHero from "/legal-backgroundImage.png";

export default function LegalNoticePage() {
  return (
    <>
      <LegalHero />
      <ExternalRoles />
      <LegalNoticeContent />
    </>
  );
}

// legal hero section component
export function LegalHero() {
  return (
    <header className="relative overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 min-h-[600px] animate-hero-image bg-cover bg-center"
        style={{
          backgroundImage: `url(${legalHero})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative mx-auto mt-25 flex max-w-7xl items-center px-4 py-10 md:px-8 min-h-[300px] lg:px-12">
        <div className="max-w-2xl space-y-4 text-white">
          <h1 className="text-xl text-orange-500 font-bold leading-tight md:text-3xl lg:text-4xl">
            Legal Notice
          </h1>

          <p className="md:leading-7 text-white text-sm md:text-lg">
            LCF is governed by a committed board of three trustees, responsible
            for overseeing the strategic direction and governance of the forum,
            ensuring it remains true to its charitable aim
          </p>
        </div>
      </div>
    </header>
  );
}

export function LegalNoticeContent() {
  return (
    <section className="mx-auto max-w-7xl px-4  md:px-8 lg:px-12">
      {legalNoticeSections.map((section) => {
        const Icon = section.icon;

        return (
          <div
            key={section.id}
            className="flex gap-4 md:gap-8 border-b border-gray-200 py-10"
          >
            {/* Icon */}
            <div className="flex h-8 w-8 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border-2 border-orange-500 text-orange-500">
              <Icon size={20} />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              <h2 className="text-lg md:text-2xl font-bold">{section.title}</h2>

              <p className="text-md leading-8 text-gray-600">
                {section.description}
              </p>

              {/* Only Organisation Information */}
              {section.id === 1 && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-[250px_1fr] border-b pb-3">
                    <span className="font-semibold">Registered Name:</span>
                    <span>{organisationInformation.registeredName}</span>
                  </div>

                  <div className="grid md:grid-cols-[250px_1fr] border-b pb-3">
                    <span className="font-semibold">Registered Address:</span>
                    <div>{organisationInformation.address}</div>
                  </div>

                  <div className="grid md:grid-cols-[250px_1fr] border-b pb-3">
                    <span className="font-semibold">Email:</span>
                    <span>{organisationInformation.email}</span>
                  </div>

                  <div className="grid md:grid-cols-[250px_1fr]">
                    <span className="font-semibold">Phone:</span>
                    <span>{organisationInformation.phone}</span>
                  </div>
                </div>
              )}

              {section.id === 6 && (
                <div className="space-y-3">
                  <p className="flex items-center gap-3">
                    <Mail size={18} className="text-orange-500" />
                    {organisationInformation.email}
                  </p>

                  <p className="flex items-center gap-3">
                    📞 {organisationInformation.phone}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}

// External roles section
export function ExternalRoles() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12">
      <div className="flex gap-4 md:gap-8 border-b border-gray-200 py-10">
        <div className="flex h-8 w-8 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border-2 border-orange-500 text-orange-500">
          <Users size={20} />
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg md:text-2xl font-bold">External Roles</h2>

            <p className="text-md leading-8 text-gray-600">
              In addition to the trustees, we engage with dignitaries,
              professionals, and community leaders to act as Advisors, Patrons,
              Brand Ambassadors, and Honorary Supporters. Their expertise and
              endorsement help to guide our work, strengthen our credibility,
              and expand our reach.
            </p>
          </div>

          <div className="space-y-6">
            {externalRoles.map((role) => (
              <div
                key={role.title}
                className="border-b border-gray-200 pb-5 last:border-b-0 last:pb-0"
              >
                <h3 className="text-base md:text-xl font-semibold">
                  {role.title}
                </h3>

                <p className="mt-2 text-md leading-8 text-gray-600">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
