import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { Users, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import heroImage from "/hero-background-image.png";
import aboutImage from "/about-section-image.png";
import { hightlight, statsData, testimonialData } from "../static-data/data";
import { useQuery } from "@tanstack/react-query";
import { getPublishedTeams } from "../api/services/public/teams.service";
import { getPublicEvents } from "../api/services/public/events.service";
import { TeamSkeleton } from "../admin/pages/teams/TeamSkeleton";

type StatCardProps = {
  icon: ReactNode;
  value: number | string;
  title: string;
};

type HightlightProps = {
  title: string;
  image: string;
  description: string;
};

type TeamCardProps = {
  name: string;
  role: string;
  image: string;
  isInView: boolean;
  index: number;
};

const MAX_LENGTH = 55;
const MAX_TEAM_ROLE = 15;
const MAX_TEAM_NAME = 10;

export default function HomePage() {
  const { data: events = [] } = useQuery({
    queryKey: ["public-events"],
    queryFn: getPublicEvents,
    staleTime: 5 * 60 * 1000,
  });

  const upcomingEvents = events.filter(
    (e) => new Date(e.date) >= new Date(new Date().setHours(0, 0, 0, 0)),
  );

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Scrolling ticker — stats + upcoming events */}
      <div className="overflow-hidden bg-orange-200/10 py-4">
        <div className="animate-marquee flex w-max items-center gap-10">
          {[...Array(2)].map((_, copyIdx) => (
            <div key={copyIdx} className="flex items-center gap-10">
              {statsData.map((stats) => (
                <StatCard
                  key={stats.title}
                  icon={stats.icon}
                  title={stats.title}
                  value={stats.value}
                />
              ))}
              {upcomingEvents.length > 0 && (
                <>
                  <span className="h-6 w-px shrink-0 bg-orange-300" />
                  {upcomingEvents.map((event) => (
                    <Link
                      key={event.id}
                      to={`${ROUTES.EVENTS}/${event.id}`}
                      className="flex shrink-0 items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500"
                    >
                      <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">
                        Upcoming
                      </span>
                      <span>{event.title}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-500">
                        {new Date(event.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-500">{event.location}</span>
                    </Link>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <AboutSection />

      {/* Highlights */}
      <section className="relative max-w-7xl bg-orange-200/20 px-4 py-10 md:px-8 lg:px-12">
        <div className="space-y-2 text-center">
          <h4 className="text-xs font-bold uppercase text-orange-500 md:text-sm">
            Our Highlights
          </h4>

          <p className="text-lg font-semibold text-black lg:text-2xl">
            Explore our key initiatives and programs that empower current and
            future leaders.
          </p>
        </div>

        <div className="mx-auto mt-10 flex flex-col items-center gap-10 md:flex-row md:flex-wrap md:justify-center lg:flex-nowrap lg:justify-between">
          {hightlight.map((hl) => (
            <HighLight
              key={hl.title}
              title={hl.title}
              image={hl.image}
              description={hl.description}
            />
          ))}
        </div>
      </section>

      {/* Team */}
      <TeamSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Volunteer */}
      <VolunteerSection />
    </>
  );
}

//hero section
export function Hero() {
  return (
    <header className="relative overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 animate-hero-image bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative mx-auto mt-25 flex max-w-7xl px-4 py-10 md:px-8 lg:px-12">
        <div className="max-w-2xl space-y-4 text-white">
          <h1
            className="animate-hero-fade-up text-xl font-bold leading-tight opacity-0 md:text-3xl lg:text-4xl"
            style={{ animationDelay: "0.2s" }}
          >
            Building Leaders,
            <br />
            <span className="text-orange-500">Transforming</span> Communities
          </h1>

          <p
            className="animate-hero-fade-up max-w-xl text-sm leading-relaxed text-gray-200 opacity-0 md:text-lg md:leading-7"
            style={{ animationDelay: "0.4s" }}
          >
            Leadership Conference Forum serves as a not-for-profit, charitable
            initiative with a community-driven vision, established to deliver
            public benefit rather than commercial gain. We are committed to
            creating an inclusive and vibrant space where leadership potential
            can be cultivated through conferences, workshops, networking events,
            and expert-led forums.
          </p>

          <div
            className="animate-hero-fade-up flex flex-col gap-4 opacity-0 sm:flex-row"
            style={{ animationDelay: "0.6s" }}
          >
            <Link
              to={ROUTES.ABOUT}
              className="rounded-xl bg-orange-500 px-8 py-4 text-center font-semibold text-white transition hover:-translate-y-1 hover:bg-orange-600"
            >
              Learn More About Us →
            </Link>

            <Link
              to={ROUTES.EVENTS}
              className="rounded-xl border border-white px-8 py-4 text-center font-semibold text-white transition hover:-translate-y-1 hover:bg-white hover:text-black"
            >
              View Upcoming Events
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// STATISTIC

export function StatCard({ icon, value, title }: StatCardProps) {
  return (
    <div className="flex items-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-bold text-orange-500 md:text-2xl">
          {value}+
        </h3>

        <p className="text-xs font-semibold text-gray-700 md:text-sm">
          {title}
        </p>
      </div>
    </div>
  );
}

//ABOUT SECTION
export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });

  return (
    <section
      ref={sectionRef}
      className="overflow-x-hidden bg-white px-4 py-10 md:px-8 lg:px-12"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 md:flex-row">
        {/* Left Content */}
        <div
          className={`w-auto space-y-4 transition-all duration-700 md:space-y-6 ${
            isInView ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500 md:text-sm">
            About Us
          </span>

          <h2 className="mt-3 text-md font-bold leading-tight text-gray-900 md:text-xl lg:text-3xl">
            Raising Leaders,
            <br />
            Building A Better Society
          </h2>

          <p className="max-w-lg text-sm text-gray-600 md:text-md lg:text-lg">
            The Leadership Conference Forum is a charitable organisation based
            in England that exists to develop the capacity and skills of people
            in the Tees Valley and surrounding areas so they can play a fuller
            part in society.
          </p>

          <p className="max-w-lg text-sm text-gray-600 md:text-md lg:text-lg">
            The Forum is managed by a committee led by a Chief Executive and
            supported by directors responsible for communication, strategic
            planning, programmes and events, outreach and partnerships, and
            membership engagement.
          </p>

          <Link
            to={ROUTES.ABOUT}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-orange-600"
          >
            Learn More About Us
            <span>→</span>
          </Link>
        </div>

        {/* Right Image */}
        <div
          className={`w-full transition-all delay-200 duration-700 lg:w-[500px] ${
            isInView ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
          }`}
        >
          <div className="group overflow-hidden rounded-xl shadow-xl">
            <LazyLoadImage
              src={aboutImage}
              effect="blur"
              alt="Leadership Conference Forum Team"
              className="h-auto w-full rounded-xl object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

//HIGHLIGHTS

export function HighLight({ title, image, description }: HightlightProps) {
  const [expanded, setExpanded] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(cardRef, {
    once: true,
    amount: 0.2,
  });

  const shouldTruncate = description.length > MAX_LENGTH;

  const displayedText =
    expanded || !shouldTruncate
      ? description
      : `${description.slice(0, MAX_LENGTH)}...`;

  return (
    <div
      ref={cardRef}
      className={`w-[300px] rounded-md bg-white shadow-md transition-all duration-700 md:w-[250px] ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      <div className="group overflow-hidden rounded-md rounded-b-none">
        <LazyLoadImage
          src={image}
          effect="blur"
          alt={title}
          className="h-[150px] w-[300px] object-cover transition duration-700 group-hover:scale-105 md:w-[250px]"
        />
      </div>

      <div className="space-y-2 p-4">
        <h4 className="text-md font-bold text-orange-700">{title}</h4>

        <p className="text-sm text-gray-500">{displayedText}</p>

        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm font-semibold text-orange-600 transition hover:text-orange-700"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
}

//TEAM SECTION

function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });

  return (
    <section
      ref={sectionRef}
      className="relative max-w-7xl overflow-hidden bg-white px-4 py-10 md:px-8 lg:px-12"
    >
      {/* Section Heading */}
      <div
        className={`space-y-2 text-center transition-all duration-700 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h4 className="text-xs font-bold uppercase text-orange-500 md:text-sm">
          Our leadership team
        </h4>

        <p className="text-lg font-semibold text-black lg:text-2xl">
          Meet the Leaders
        </p>
      </div>

      {/* Team Cards */}
      <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-10 lg:justify-between">
        <Teams isInView={isInView} />
      </div>
    </section>
  );
}

//TEAMS
type TeamsProps = {
  isInView: boolean;
};

export function Teams({ isInView }: TeamsProps) {
  const {
    data: teams = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: getPublishedTeams,
  });

  if (isLoading) {
    return <TeamSkeleton />;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load team members.</p>;
  }

  return (
    <>
      {teams.map((team, index) => (
        <TeamCard
          key={team.id}
          name={team.name}
          role={team.role}
          image={team.image}
          isInView={isInView}
          index={index}
        />
      ))}
    </>
  );
}

//TEAM CARD

function TeamCard({ name, role, image, isInView, index }: TeamCardProps) {
  const [expanded, setExpanded] = useState(false);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const shouldTruncate = name.length > MAX_TEAM_NAME;
  const shouldTruncateRole = role.length > MAX_TEAM_ROLE;

  const displayedName =
    !isDesktop || expanded || !shouldTruncate
      ? name
      : `${name.slice(0, MAX_TEAM_NAME)}...`;

  const displayedRole =
    !isDesktop || expanded || !shouldTruncateRole
      ? role
      : `${role.slice(0, MAX_TEAM_ROLE)}...`;

  return (
    <div
      className={`w-[300px] overflow-hidden rounded-md bg-white shadow-md transition-all duration-700 hover:-translate-y-2 hover:shadow-xl md:w-[200px] ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="group overflow-hidden rounded-md rounded-b-none">
        <LazyLoadImage
          src={image}
          effect="blur"
          alt={name}
          className="h-auto w-[300px] object-cover transition duration-700 group-hover:scale-105 md:h-[150px] md:w-[200px]"
        />
      </div>

      <div className="space-y-2 p-4">
        <h4 className="text-md font-bold text-orange-700">{displayedName}</h4>

        <p className="text-sm text-gray-500">{displayedRole}</p>

        {(shouldTruncate || shouldTruncateRole) && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="hidden text-sm font-semibold text-orange-600 transition hover:text-orange-700 md:block"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
}

//TESTIMONIALS
export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonialData.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-orange-200/20 px-4 py-10 md:px-8 lg:px-12">
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 md:text-sm">
          Testimonials
        </p>

        <h2 className="text-md font-bold text-gray-900 md:text-xl lg:text-3xl">
          What People Say
        </h2>
      </div>

      <div className="flex items-center justify-between overflow-hidden lg:mt-10">
        <div>
          <button
            onClick={prevSlide}
            className="hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition hover:bg-orange-500 hover:text-white md:flex"
          >
            <ChevronLeft size={22} />
          </button>
        </div>

        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {testimonialData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full shrink-0 space-y-3 p-4 md:px-10 lg:px-20"
            >
              <Quote
                size={20}
                className="text-orange-500"
                fill="currentColor"
              />

              <p className="max-w-3xl text-md text-gray-600 md:text-xl">
                {testimonial.message}
              </p>

              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-orange-500 md:text-xl">
                    {testimonial.name}
                  </h3>

                  <p className="text-xs text-gray-500 md:text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={nextSlide}
            className="hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition hover:bg-orange-500 hover:text-white md:flex"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-3">
        {testimonialData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition ${
              current === index ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

//VOLUNTEER
export function VolunteerSection() {
  return (
    <section className="bg-orange-500 px-4 py-10 md:px-8 lg:px-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-500">
            <Users size={20} />
          </div>

          <div className="text-white">
            <h4 className="font-semibold">Be part of our mission</h4>

            <p>
              Join a network of passionate leaders working together to create a
              better future for all
            </p>
          </div>
        </div>

        <div>
          <button className="rounded-xl bg-white px-8 py-4 text-center font-semibold text-orange-500">
            <Link to={ROUTES.VOLUNTEER}>Become a volunteer →</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
