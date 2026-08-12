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

//legal hero section component
export function LegalHero() {
  return (
    <header className="relative bg-orange-200/10">
      <div className="relative mx-auto flex h-full max-w-7xl py-10 px-4 md:px-8 lg:px-12 mt-25">
        <div className="  space-y-4">
          <h1 className="text-xl text-orange-500 font-bold leading-tight md:text-3xl lg:text-4xl">
            Legal Notice
          </h1>

          <p className="   md:leading-7 text-black text-sm md:text-lg">
            Important information about Leadership Conference Forum, our and the
            use of our website organization
          </p>
        </div>
      </div>
    </header>
  );
}

export function LegalNoticeContent() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12">
      {legalNoticeSections.map((section) => {
        const Icon = section.icon;

        return (
          <div
            key={section.id}
            className="flex  gap-4 md:gap-8 border-b border-gray-200 py-10"
          >
            {/* Icon */}
            <div className="flex h-8 w-8 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border-2 border-orange-500 text-orange-500">
              <Icon size={20} />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-2">
              <h2 className="text-lg md:text-2xl font-bold">{section.title}</h2>

              <p className=" text-md leading-8 text-gray-600">
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
