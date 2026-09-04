import { missionCards } from "../static-data/data";
import aboutImage from "/group-image.jpeg";
// import aboutHero from "/about-backgroundImage.png";
import { CheckCircle, type LucideIcon } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

//mission props
type MissionCardProps = {
  Icon: LucideIcon;
  title: string;
  description?: string;
  programs?: string[];
};

//about page
export default function AboutPage() {
  return (
    <>
      {/* about hero section */}
      <AboutHero />

      {/* who we are */}
      <AboutSection />

      {/* why LCF matters */}
      <WhyLCFMatters />

      {/* what makes LCF different */}
      <WhatMakesLCFDifferent />

      {/* mission section */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {missionCards.map((card) => (
            <MissionCard
              key={card.id}
              Icon={card.icon}
              title={card.title}
              description={card.description}
              programs={card.programs}
            />
          ))}
        </div>
      </section>

      {/* impact section */}
      {/* <OurImpact /> */}
    </>
  );
}

// About Hero section component
export function AboutHero() {
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
            About Us
          </h1>

          <p className="max-w-2xl text-base leading-7 text-white md:text-md md:leading-8">
            The Leadership Conference Forum is more than just a conference, it
            is a movement. It exists to bring together individuals who are
            passionate about making a difference. Whether you are a student
            leader, a young professional, a public servant, a social
            entrepreneur, or simply someone with a desire to lead, LCF offers
            you the community, the platform, and the guidance to thrive.
          </p>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="bg-white px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row">
        {/* Left Content */}
        <div className="w-auto space-y-4  md:space-y-6 lg:w-[700px]">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500 md:text-sm">
            who we are
          </span>

          <h2 className="mt-3 text-md font-bold leading-tight text-gray-900 md:text-xl lg:text-3xl">
            Raising Leaders,
            <br />
            Building A Better Society
          </h2>

          <p className="w-auto text-sm text-gray-600 md:text-md lg:text-lg">
            Leadership Conference Forum (LCF) is a registered charity in England
            and Wales dedicated to inspiring, developing and connecting current
            and future leaders. Based in the United Kingdom, LCF exists to
            create opportunities for people to develop their leadership
            potential, strengthen their professional and personal capabilities,
            and build meaningful connections with experienced leaders,
            professionals and organisations
          </p>

          <p className="w-auto text-sm text-gray-600 md:text-md lg:text-lg">
            We believe leadership is not simply about titles or positions; it is
            about purpose, service, responsibility and the ability to positively
            influence others. LCF is committed to helping people recognise their
            leadership potential, access opportunities for development and
            contribute meaningfully within their workplaces, organisations and
            communities.
          </p>

          <div className="space-y-2">
            <p className="w-auto text-sm text-gray-600 md:text-md lg:text-lg">
              Our purpose is to inspire and equip both aspiring and established
              leaders across the United Kingdom and beyond.
            </p>

            <p className="text-sm font-bold text-gray-600 md:text-md lg:text-lg">
              Our Core Objectives:
            </p>

            <ul className="list-disc space-y-1 px-8 text-gray-600 md:text-md lg:text-md">
              <li>
                <strong>Support Upcoming Leaders:</strong>{" "}
                <span className="text-sm">
                  Provide guidance, encouragement, and capacity-building
                  resources for individuals taking on or aspiring to leadership
                  roles within their communities, institutions, and professions.
                </span>
              </li>

              <li>
                <strong>Mentorship and Coaching:</strong>{" "}
                <span className="text-sm">
                  Facilitate structured mentorship schemes led by experienced
                  leaders and professionals to support personal and career
                  growth.
                </span>
              </li>

              <li>
                <strong>Leadership Forums and Conferences:</strong>{" "}
                <span className="text-sm">
                  Host regular conferences, speaker events, panel discussions
                  and leadership talks to share experiences, promote knowledge
                  exchange, and discuss current societal issues from a
                  leadership perspective.
                </span>
              </li>

              <li>
                <strong>Networking and Collaboration:</strong>{" "}
                <span className="text-sm">
                  Create networking opportunities between emerging leaders,
                  professionals, public figures, academics, and policymakers,
                  fostering partnerships that can lead to real-world impact.
                </span>
              </li>

              <li>
                <strong>Charitable and Social Development:</strong>{" "}
                <span className="text-sm">
                  Operate as a registered charity to ensure our work remains
                  inclusive, transparent, and community-focused, attracting
                  charitable advisors, patrons, and key supporters who align
                  with our vision and values.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full transition-all delay-200 duration-700 lg:w-[700px]">
          <div className="group overflow-hidden rounded-xl shadow-xl">
            <LazyLoadImage
              src={aboutImage}
              effect="blur"
              alt="Leadership Conference Forum Team"
              className="h-auto w-full rounded-xl object-cover shadow-xl hover:scale-105 md:h-[900px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Why LCF Matters
export function WhyLCFMatters() {
  return (
    <section className="bg-orange-50/50 px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto ">
        <div className="">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-500 md:text-sm">
            Why LCF Matters
          </p>

          <h2 className="mt-3 text-xl font-bold leading-tight text-gray-900 md:text-3xl">
            Creating A Stronger Foundation For Leadership
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600 md:text-md lg:text-lg">
            <p>
              In a time where strong, ethical, and visionary leadership is more
              necessary than ever, LCF aims to fill the gap by providing a
              foundation for growth, connection, and community transformation.
            </p>

            <p>
              We bring together people who share a desire to lead with
              integrity, to learn continuously, and to leave a legacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// What Makes LCF Different
export function WhatMakesLCFDifferent() {
  const mentorshipUnits = [
    "Art",
    "Finance",
    "Politics",
    "Business",
    "Health",
    "IT",
    "Storytelling",
    "Law",
    "Journalism",
    "HR",
    "Banking",
  ];

  return (
    <section className="bg-white px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto ">
        <div className="">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-500 md:text-sm">
            Our Approach
          </p>

          <h2 className="mt-3 text-xl font-bold leading-tight text-gray-900 md:text-3xl">
            What Makes LCF Different?
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-600 md:text-md lg:text-lg">
            <p>
              The Leadership Conference Forum is uniquely centred on diversity
              in leadership. It is built around individuals who see themselves
              as leaders and are willing to share their knowledge and experience
              with the next generation, as well as those eager to learn directly
              from mentors.
            </p>

            <p>
              Within LCF, there are various mentorship units across different
              professional and leadership disciplines. Each unit provides an
              opportunity for individuals to connect with experienced mentors
              and develop their understanding of leadership within their chosen
              field.
            </p>
          </div>
        </div>

        {/* Mentorship Units */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-gray-900 md:text-xl">
            Our Mentorship Units
          </h3>

          <div className="mt-5 flex flex-wrap gap-3">
            {mentorshipUnits.map((unit) => (
              <span
                key={unit}
                className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600"
              >
                {unit}
              </span>
            ))}

            <span className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600">
              And many more
            </span>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-10  border-l-4 border-orange-500 pl-5">
          <p className="text-sm leading-7 text-gray-600 md:text-md lg:text-lg">
            Each unit is guided by a mentor who provides direction, shares
            insights, and helps individuals develop their understanding of
            leadership within their chosen field.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600 md:text-md lg:text-lg">
            In essence, the Leadership Conference Forum is about supporting and
            connecting individuals who view themselves as leaders in any
            discipline with those who aspire to follow in their footsteps,
            promoting mentorship, learning, and meaningful networking across all
            professions.
          </p>
        </div>
      </div>
    </section>
  );
}

// our mission section
export function MissionCard({
  Icon,
  title,
  description,
  programs,
}: MissionCardProps) {
  return (
    <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Icon size={32} className="text-orange-500" strokeWidth={1.7} />

      <h3 className="text-md font-bold text-gray-900 md:text-xl">{title}</h3>

      {description && (
        <p className="text-sm leading-6 text-gray-600 md:text-md">
          {description}
        </p>
      )}

      {programs && (
        <ul className="space-y-3">
          {programs.map((program) => (
            <li
              key={program}
              className="flex items-center gap-3 text-sm text-gray-700 md:text-md lg:text-md"
            >
              <CheckCircle size={18} className="text-orange-500" />
              {program}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// our impact
// export function OurImpact() {
//   return (
//     <section className="bg-orange-200/10 px-4 py-10 md:px-8 lg:px-12">
//       <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
//         <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
//           {/* Left */}
//           <div className="max-w-md space-y-2">
//             <p className="text-sm font-semibold uppercase tracking-wide text-orange-500 md:text-md">
//               Our Impact
//             </p>

//             <h2 className="text-md font-bold leading-tight text-gray-900 md:text-2xl">
//               Making A Difference
//               <br />
//               Across The UK & Beyond
//             </h2>
//           </div>

//           {/* Right */}
//           <div className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-4 lg:gap-0">
//             {statsData.map((stat, index) => (
//               <div
//                 key={stat.title}
//                 className={`flex justify-center ${
//                   index !== statsData.length - 1
//                     ? "lg:border-r lg:border-gray-200"
//                     : ""
//                 }`}
//               >
//                 <StatCard
//                   icon={stat.icon}
//                   value={stat.value}
//                   title={stat.title}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // statcard component
// export function StatCard({ icon, value, title }: StatCardProps) {
//   return (
//     <div className="flex flex-col items-center text-center">
//       <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500">
//         {icon}
//       </div>

//       <h3 className="text-2xl font-bold text-orange-500">
//         {value.toLocaleString()}+
//       </h3>

//       <p className="mt-2 text-sm font-medium text-gray-700">{title}</p>
//     </div>
//   );
// }
