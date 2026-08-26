import { missionCards, statsData } from "../static-data/data";
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

//stat props
type StatCardProps = {
  icon: React.ReactNode;
  value: number;
  title: string;
};

//about page
export default function AboutPage() {
  return (
    <>
      {/* about hero section */}
      <AboutHero />
      <AboutSection />
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-12">
        {/* mission section */}
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
      <OurImpact />
    </>
  );
}

//  About Hero section component

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#EA580C]  mt-15 text-white">
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
      <div className="relative  flex   gap-4 flex-col   mx-auto max-w-7xl mt-15 py-10 px-6 md:px-8 lg:px-12">
        <div className="max-w-3xl flex flex-col gap-4 ">
          <h1 className="text-2xl font-bold leading-[1.08] text-[#ffdcc0] tracking-tight md:text-4xl lg:text-5xl">
            About Us
          </h1>

          {/* Description */}
          <p className=" max-w-2xl text-base leading-7 text-white md:text-md md:leading-8">
            The Leadership Conference Forum is more than just a conference, it
            is a movement. It exists to bring together individuals who are
            passionate about making a difference. Whether you are a student
            leader, a young professional, a public servant, a social
            entrepreneur, or simply someone with a desire to lead, LCF offers
            you the community, the platform, and the guidance to thrive
          </p>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="py-10 px-4 md:px-8 lg:px-12 bg-white">
      <div className="mx-auto flex max-w-7xl  flex-col  items-center gap-12 justify-between  md:flex-row">
        {/* Left Content */}
        <div className="w-auto space-y-4 md:space-y-6 lg:w-[700px]  ">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-orange-500">
            who we are
          </span>

          <h2 className="text-md mt-3 md:text-xl lg:text-3xl  font-bold leading-tight text-gray-900 ">
            Raising Leaders,
            <br />
            Building A Better Society
          </h2>

          <p className="max-w-lg text-sm text-gray-600 md:text-md lg:text-lg">
            The Leadership Conference Forum (LCF) is a forward-thinking
            initiative dedicated to nurturing the next generation of leaders
            through mentorship, professional development, and collaborative
            dialogue. Based in the United Kingdom, LCF is designed to act as a
            platform for leadership support, empowerment, and advancement,
            connecting emerging leaders with experienced professionals,
            dignitaries, and seasoned changemakers from a variety of sectors
          </p>

          <p className="max-w-lg text-sm text-gray-600 md:text-md lg:text-lg">
            We believe that leadership is not just about titles; it is about
            purpose, service, and responsibility. LCF is a space where leaders
            can learn from each other, discuss real challenges, and grow in both
            competence and character
          </p>

          <div className="space-y-2">
            <p className=" max-w-lg text-sm md:text-md  lg:text-lg text-gray-600">
              Our purpose is to inspire and equip both aspiring and established
              leaders across the United Kingdom and beyond
            </p>
            <p className="text-sm md:text-md   lg:text-lg text-gray-600 font-bold">
              Our Core Objectives:
            </p>
            <ul className="list-disc px-8 space-y-1 text-gray-600  md:text-md lg:text-md">
              <li>
                <strong>Support Upcoming Leaders:</strong>
                {""}{" "}
                <span className="text-sm">
                  {" "}
                  Provide guidance, encouragement, and capacity-building
                  resources for individuals taking on or aspiring to leadership
                  roles within their communities, institutions, and
                  professions.{" "}
                </span>
              </li>
              <li>
                <strong>Mentorship and Coaching:</strong>
                {""}{" "}
                <span className="text-sm">
                  {" "}
                  Facilitate structured mentorship schemes led by experienced
                  leaders and professionals to support personal and career
                  growth{" "}
                </span>
              </li>
              <li>
                <strong> Leadership Forums and Conferences:</strong>
                {""}{" "}
                <span className="text-sm">
                  {" "}
                  Host regular conferences, speaker events, panel discussions
                  and leadership talks to share experiences, promote knowledge
                  exchange, and discuss current societal issues from a
                  leadership perspective{" "}
                </span>
              </li>
              <li>
                <strong> Networking and Collaboration:</strong>
                {""}{" "}
                <span className="text-sm">
                  {" "}
                  Create networking opportunities between emerging leaders,
                  professionals, public figures, academics, and policymakers,
                  fostering partnerships that can lead to real-world im{" "}
                </span>
              </li>
              <li>
                <strong> Charitable and Social Development:</strong>
                {""}{" "}
                <span className="text-sm">
                  {" "}
                  Operate as a registered charity to ensure our work remains
                  inclusive, transparent, and community-focused, attracting
                  charitable advisors, patrons, and key supporters who align
                  with our vision and values{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Image */}
        <div
          className={`w-full transition-all delay-200 duration-700 lg:w-[700px] `}
        >
          <div className="group overflow-hidden rounded-xl shadow-xl">
            <LazyLoadImage
              src={aboutImage}
              effect="blur"
              alt="Leadership Conference Forum Team"
              className="h-auto md:h-[900px] w-full rounded-xl object-cover shadow-xl hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

//our mission section
export function MissionCard({
  Icon,
  title,
  description,
  programs,
}: MissionCardProps) {
  return (
    <div className="rounded-2xl space-y-2 border border-gray-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Icon size={32} className=" text-orange-500" strokeWidth={1.7} />

      <h3 className="text-md md:text-xl font-bold text-gray-900">{title}</h3>

      {description && (
        <p className="leading-6 text-sm md:text-md text-gray-600">
          {description}
        </p>
      )}

      {programs && (
        <ul className="space-y-3">
          {programs.map((program) => (
            <li
              key={program}
              className="flex text-sm lg:text-md md:text-md items-center gap-3 text-gray-700"
            >
              <CheckCircle size={18} className="  text-orange-500" />
              {program}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

//our impact
export function OurImpact() {
  return (
    <section className="bg-orange-200/10 py-10 px-4 md:px-8 lg:px-12">
      <div className=" mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="flex  flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="max-w-md space-y-2">
            <p className="text-sm md:text-md font-semibold uppercase tracking-wide text-orange-500">
              Our Impact
            </p>

            <h2 className="text-md font-bold leading-tight text-gray-900 md:text-2xl">
              Making A Difference
              <br />
              Across The UK & Beyond
            </h2>
          </div>

          {/* Right */}
          <div className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-4 lg:gap-0">
            {statsData.map((stat, index) => (
              <div
                key={stat.title}
                className={`flex justify-center ${
                  index !== statsData.length - 1
                    ? "lg:border-r lg:border-gray-200"
                    : ""
                }`}
              >
                <StatCard
                  icon={stat.icon}
                  value={stat.value}
                  title={stat.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

//statcard component
export function StatCard({ icon, value, title }: StatCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-orange-500">
        {value.toLocaleString()}+
      </h3>

      <p className="mt-2 text-sm font-medium text-gray-700">{title}</p>
    </div>
  );
}

// export function AboutHero() {
//   return (
//     <header className="relative overflow-hidden">
//       {/* Animated Background */}
//       <div
//         className="absolute inset-0 min-h-[600px] animate-hero-image bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${aboutHero})`,
//         }}
//       />

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/35" />

//       {/* Content */}
//       <div className="relative mx-auto mt-25 flex max-w-7xl items-center px-4 py-10 md:px-8 min-h-[300px] lg:px-12">
//         <div className="max-w-2xl space-y-4 text-white">
//           <h1 className="text-xl text-orange-500 font-bold leading-tight md:text-3xl lg:text-4xl">
//             About Us
//           </h1>

//           <p className="   md:leading-7 text-white text-sm md:text-lg">
//             Leadership Conference Forum serves as a not-for-profit, charitable
//             initiative with a community-driven vision, established to deliver
//             public benefit rather than commercial gain. We are committed to
//             creating an inclusive and vibrant space where leadership potential
//             can be cultivated through conferences, workshops, networking events,
//             and expert-led forums.
//           </p>
//         </div>
//       </div>
//     </header>
//   );
// }
