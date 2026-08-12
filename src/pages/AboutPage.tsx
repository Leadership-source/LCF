import { missionCards, statsData } from "../static-data/data";
import aboutImage from "/about-section-image.png";
import { CheckCircle, type LucideIcon } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

//mission props
type MissionCardProps = {
  Icon: LucideIcon;
  title: string;
  description?: string;
  values?: string[];
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
              values={card.values}
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
    <header className="relative bg-orange-200/10">
      <div className="relative mx-auto flex h-full max-w-7xl py-10 px-4 md:px-8 lg:px-12 mt-25">
        <div className="  space-y-4">
          <h1 className="text-xl text-orange-500 font-bold leading-tight md:text-3xl lg:text-4xl">
            About Us
          </h1>

          <p className="   md:leading-7 text-black text-sm md:text-lg">
            Leadership Conference Forum serves as a not-for-profit, charitable
            initiative with a community-driven vision, established to deliver
            public benefit rather than commercial gain. We are committed to
            creating an inclusive and vibrant space where leadership potential
            can be cultivated through conferences, workshops, networking events,
            and expert-led forums.
          </p>
        </div>
      </div>
    </header>
  );
}

export function AboutSection() {
  return (
    <section className="py-10 px-4 md:px-8 lg:px-12 bg-white">
      <div className="mx-auto flex max-w-7xl  flex-col  items-center gap-12 justify-between  md:flex-row">
        {/* Left Content */}
        <div className="w-auto space-y-4 md:space-y-6 ">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-orange-500">
            who we are
          </span>

          <h2 className="text-md mt-3 md:text-xl lg:text-3xl  font-bold leading-tight text-gray-900 ">
            Raising Leaders,
            <br />
            Building A Better Society
          </h2>

          <p className=" max-w-lg text-sm md:text-md  lg:text-lg text-gray-600">
            The Leadership Conference Forum is a charitable organisation based
            in England that exists to develop the capacity and skills of people
            in the Tees Valley and surrounding areas so they can play a fuller
            part in society.
          </p>
          <p className=" max-w-lg text-sm md:text-md  lg:text-lg text-gray-600">
            The Forum is managed by a committee led by a Chief Executive and
            supported by directors responsible for communication, strategic
            planning, programmes and events, outreach and partnerships, and
            membership engagement.
          </p>
          <div className="space-y-2">
            <p className=" max-w-lg text-sm md:text-md  lg:text-lg text-gray-600">
              Our purpose is to inspire and equip both aspiring and established
              leaders across the United Kingdom and beyond
            </p>
            <p className="text-sm md:text-md   lg:text-lg text-gray-600 font-bold">
              We do this by:
            </p>
            <ul className="list-disc px-8 space-y-1  md:text-md lg:text-md">
              <li>
                Running leadership conferences and forums that bring people
                together to share ideas and best practice
              </li>
              <li>
                Providing mentoring and development workshops for emerging
                leaders
              </li>
              <li>
                Creating opportunities for networking, collaboration and civic
                engagement
              </li>
              <li>
                Forming partnerships that promote inclusive growth and
                charitable activity
              </li>
            </ul>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-[500px]">
          <LazyLoadImage
            src={aboutImage}
            effect="blur"
            alt="Leadership Conference Forum Team"
            className="h-auto md:h-[600px] w-full rounded-xl object-cover shadow-xl"
          />
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
  values,
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

      {values && (
        <ul className="space-y-3">
          {values.map((value) => (
            <li
              key={value}
              className="flex text-sm lg:text-md md:text-md items-center gap-3 text-gray-700"
            >
              <CheckCircle size={18} className="  text-orange-500" />
              {value}
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
