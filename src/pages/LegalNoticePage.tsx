import { Mail } from "lucide-react";

import {
  legalNoticeSections,
  organisationInformation,
} from "../static-data/data";

export default function LegalNoticePage() {
  return (
    <>
      <LegalHero />

      <LegalNoticeContent />
    </>
  );
}

// legal hero section component

export function LegalHero() {
  return (
    <section className="relative mt-15 overflow-hidden bg-[#EA580C] text-white">
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
            Legal Notice
          </h1>

          <p className="max-w-2xl text-base leading-7 text-white md:text-md md:leading-8">
            LCF is governed by a committed board of three trustees, responsible
            for overseeing the strategic direction and governance of the forum,
            ensuring it remains true to its charitable aim
          </p>
        </div>
      </div>
    </section>
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
                  <div className="grid md:grid-cols-[250px_1fr] border-b pb-3">
                    <span className="font-semibold">Charity No:</span>
                    <span>{organisationInformation.CharityNo}</span>
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
