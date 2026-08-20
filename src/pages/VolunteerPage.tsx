import type { LucideIcon } from "lucide-react";
import { volunteerBenefits, volunteerOpportunities } from "../static-data/data";
import volunteerHero from "/volunteer-backgroundImage.png";

//volunteerCard props
type VolunteerCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  last?: boolean;
};
type OpportunityCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function VolunteerPage() {
  return (
    <>
      <VolunteerHero />
      <WhyVolunteer />
      <GetInvolvedSection />
      <Ready />
    </>
  );
}

export function VolunteerHero() {
  return (
    <header className="relative overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 min-h-[600px] animate-hero-image bg-cover bg-center"
        style={{
          backgroundImage: `url(${volunteerHero})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative mx-auto mt-25 flex max-w-7xl items-center  px-4 py-10  md:px-8 min-h-[300px] lg:px-12">
        <div className="max-w-2xl space-y-4 text-white">
          <h1 className="text-xl text-orange-500 font-bold leading-tight md:text-3xl lg:text-4xl">
            Become a volunteer
          </h1>

          <p className="   md:leading-7 text-white text-sm md:text-lg">
            Join a passionate team of leaders and change maker working together
            to build stronger communities and develop future leaders.
          </p>
        </div>
      </div>
    </header>
  );
}

export function WhyVolunteer() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-lg md:text-3xl font-bold text-gray-900 ">
          Why Volunteer With Us?
        </h2>

        <div className="mx-auto mt-1 h-1 w-16 rounded-full bg-orange-500" />

        <p className="mt-4 text-gray-600">
          Be part of a movement that is transforming lives and creating lasting
          impact.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-10 md:mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {volunteerBenefits.map((benefit, index) => (
          <VolunteerCard
            key={benefit.id}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
            last={index === volunteerBenefits.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

//benefit

export function VolunteerCard({
  icon: Icon,
  title,
  description,
  last,
}: VolunteerCardProps) {
  return (
    <div
      className={`bg-orange-100/50 border border-orange-500 rounded-2xl md:bg-transparent md:bg-none md:border-orange-50/50 md:border-l-0 md:border-t-0 md:border-b-0 md:rounded-none flex flex-col items-center text-center space-y-2 p-4  ${
        !last ? " lg:border-r lg:border-gray-200" : ""
      }`}
    >
      <Icon size={30} className=" text-orange-500 stroke-[1.6]" />

      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

      <p className=" leading-8 text-gray-600">{description}</p>
    </div>
  );
}

export function GetInvolvedSection() {
  return (
    <section className="bg-orange-100/50 py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-lg md:text-3xl font-bold text-gray-900 ">
            How You Can Get Involved
          </h2>

          <div className="mx-auto mt-1 h-1 w-16 rounded-full bg-orange-500" />

          <p className="mt-4 text-gray-600">
            We have a variety of opportunities for passionate individuals.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 md:mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {volunteerOpportunities.map((item) => (
            <OpportunityCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function OpportunityCard({
  icon: Icon,
  title,
  description,
}: OpportunityCardProps) {
  return (
    <div className="rounded-2xl space-y-2 border border-gray-100 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
        <Icon size={30} className="text-orange-500 stroke-[1.8]" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

      <p className=" leading-8 text-gray-600">{description}</p>
    </div>
  );
}

export function Ready() {
  return (
    <section className="bg-white mx-auto px-4 md:px-8 lg:px-12 py-10">
      <div className="flex justify-between flex-col gap-10 md:items-center md:flex-row rounded-xl p-6 md:p-8 bg-orange-500   text-white ">
        <div className="w-auto md:max-w-xl space-y-2">
          <h2 className="text-md md:text-xl font-bold ">Ready to Volunteer?</h2>

          <p className=" text-xl md:text-sm text-orange-50">
            We'd love to hear from you! If you're passionate about making a
            positive impact in your community and would like to volunteer with
            Leadership Conference Forum, simply send us an email telling us why
            you would like to become a volunteer and how you believe you can
            contribute to our mission.
          </p>
        </div>

        <div className="space-y-2">
          <button className=" inline-block rounded-md bg-white px-5 py-4 text-sm md:text-lg font-semibold text-orange-500 transition hover:bg-orange-100">
            <a href="mailto:info@leadershipconferenceforum.org?subject=Volunteer Application">
              📧 info@leadershipconferenceforum.org
            </a>
          </button>

          <p className="text-xs font-semibold md:text-sm text-orange-100">
            Click the email address above to open your email application and
            send us your volunteer request.
          </p>
        </div>
      </div>
    </section>
  );
}
