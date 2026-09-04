import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import {
  Users,
  ChevronLeft,
  ChevronRight,
  Quote,
  QuoteIcon,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import heroImage from "/hero-background-image.png";
import aboutImage from "/group-image.jpeg";
import { hightlight } from "../static-data/data";
import { useQuery } from "@tanstack/react-query";
import { getPublishedTeams } from "../api/services/public/teams.service";
import { getPublicEvents } from "../api/services/public/events.service";

import { getPublishedTestimonials } from "../api/services/public/testimonial.service";
import { MessageSquareQuote, ArrowRight } from "lucide-react";

import ShareReviewModal from "./ShareReviewModal";
import { TeamSkeleton } from "../components/TeamSkeleton";

import { getPublishedQuotes } from "../api/services/public/quote.service";

type HightlightProps = {
  title: string;
  image: string;
  description: string;
  link?: string;
};

type TeamCardProps = {
  name: string;
  role: string;
  bio?: string;
  image: string;
  isInView: boolean;
  index: number;
};

const MAX_LENGTH = 55;

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

      {/* upcoming events */}
      {upcomingEvents.length > 0 && (
        <>
          <div className="overflow-hidden bg-orange-200/10 py-4">
            <div className="animate-marquee flex w-max items-center gap-10">
              {[...Array(2)].map((_, copyIdx) => (
                <div key={copyIdx} className="flex items-center gap-10">
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
                          <span className="text-gray-500">
                            {event.location}
                          </span>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {/* About */}
      <AboutSection />

      {/* Highlights */}
      <section className="relative w-full bg-orange-200/20 px-4 py-10 md:px-8 lg:px-12">
        <div className="space-y-2 text-center">
          <h4 className="text-xs font-bold uppercase text-orange-500 md:text-sm">
            Our Highlights
          </h4>

          <p className="text-lg font-semibold text-black lg:text-2xl">
            Explore our key initiatives and programs that empower current and
            future leaders.
          </p>
        </div>

        <div className="mx-auto mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hightlight.map((hl) => (
            <HighLight
              key={hl.title}
              title={hl.title}
              image={hl.image}
              description={hl.description}
              link={hl.link}
            />
          ))}
        </div>
      </section>

      <TeamSection />

      <LeaderQuotes />
      {/* Testimonials */}
      <Testimonials />
      <section className="mx-auto flex w-full gap-10 max-w-4xl flex-col items-stretch justify-center lg:gap-20 px-4 py-10 md:flex-row md:items-stretch">
        <ShareReview />

        <VolunteerSection />
      </section>
    </>
  );
}

//hero section
export function Hero() {
  return (
    <header className="relative overflow-hidden mt-20">
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
      <div className="relative mx-auto min-h-[520px] lg:min-h-[450px]   flex justify-center items-center text-center  px-4  md:px-8 lg:px-12">
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
            className="animate-hero-fade-up max-w-2xl text-sm leading-relaxed text-gray-200 opacity-0 md:text-md md:leading-7"
            style={{ animationDelay: "0.4s" }}
          >
            Leadership Conference Forum (LCF) is a registered charity dedicated
            to inspiring, developing and connecting current and future leaders
            through leadership development, mentorship, professional
            development, networking and collaborative learning. We create
            opportunities for people to strengthen their leadership capacity,
            connect with experienced professionals and contribute positively to
            their communities.
          </p>

          <div
            className="animate-hero-fade-up flex justify-center flex-col gap-4 opacity-0 sm:flex-row"
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

// export function StatCard({ icon, value, title }: StatCardProps) {
//   return (
//     <div className="flex items-center">
//       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
//         {icon}
//       </div>

//       <div>
//         <h3 className="text-lg font-bold text-orange-500 md:text-2xl">
//           {value}+
//         </h3>

//         <p className="text-xs font-semibold text-gray-700 md:text-sm">
//           {title}
//         </p>
//       </div>
//     </div>
//   );
// }

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
          className={`w-auto lg:w-[700px] space-y-4 transition-all duration-700 md:space-y-6 ${
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

          <p className="max-w-lg text-sm  text-gray-600 md:text-md lg:text-lg">
            Leadership Conference Forum (LCF) is a registered charity in England
            and Wales dedicated to inspiring, developing and connecting current
            and future leaders. Based in the United Kingdom, LCF exists to
            create opportunities for people to develop their leadership
            potential, strengthen their professional and personal capabilities,
            and build meaningful connections with experienced leaders,
            professionals and organisations.
          </p>

          <p className="max-w-lg text-sm text-gray-600 md:text-md lg:text-lg">
            Our work focuses on leadership development, mentorship, professional
            development, networking, collaborative learning and community
            engagement. Through our programmes, events and partnerships, we aim
            to create an inclusive platform where emerging and established
            leaders can learn from one another, share experiences, discuss
            real-world challenges and develop the skills, confidence and
            character needed to make a positive contribution to society.
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
          className={`w-full transition-all delay-200 duration-700 lg:w-[700px] ${
            isInView ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
          }`}
        >
          <div className="group overflow-hidden rounded-xl shadow-xl">
            <LazyLoadImage
              src={aboutImage}
              effect="blur"
              alt="Leadership Conference Forum Team"
              className="h-auto md:h-[600px] w-full rounded-xl object-cover shadow-xl hover:scale-105"
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
      className={`w-full rounded-xl bg-white shadow-md transition-all duration-700 hover:-translate-y-1 hover:shadow-lg ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      <div className="group overflow-hidden rounded-t-xl">
        <LazyLoadImage
          src={image}
          effect="blur"
          alt={title}
          wrapperClassName="w-full"
          className="h-44 w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="space-y-2 p-4">
        <h4 className="text-sm font-bold text-orange-700">{title}</h4>

        <p className="text-sm text-gray-500">{displayedText}</p>

        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-semibold text-orange-600 transition hover:text-orange-700"
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
      className="relative w-full overflow-hidden bg-white px-4 py-10 md:px-8 lg:px-12 "
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
      <div className="mx-auto mt-10 grid grid-cols-1 items-center justify-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Teams isInView={isInView} />
      </div>

      <div
        className={`mt-8 text-center transition-all duration-700 delay-300 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <Link
          to={ROUTES.TEAMS}
          className="inline-flex items-center gap-2 rounded-lg border border-orange-500 px-6 py-2.5 text-sm font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white"
        >
          View full team
        </Link>
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
          bio={team.bio}
          image={team.image}
          isInView={isInView}
          index={index}
        />
      ))}
    </>
  );
}

//TEAM CARD

function TeamCard({ name, role, bio, image, isInView, index }: TeamCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl max-w-[350px] md:w-[380px] bg-white shadow-md transition-all duration-700 hover:-translate-y-2 hover:shadow-xl ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Fixed-height image — uniform across all cards */}
      <div className="group h-60 w-full overflow-hidden">
        <LazyLoadImage
          src={image}
          effect="blur"
          alt={name}
          wrapperClassName="w-full"
          className="h-60 w-full object-cover object-top transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h4 className="truncate text-base font-bold text-gray-900">{name}</h4>

        <p className="mt-1 truncate text-sm text-orange-600">{role}</p>

        {bio && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">
            {bio}
          </p>
        )}

        <Link
          to={ROUTES.TEAMS}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange-500 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}

//quote

export function LeaderQuotes() {
  const [current, setCurrent] = useState(0);

  const {
    data: quotes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["public-quotes"],
    queryFn: getPublishedQuotes,
    staleTime: 5 * 60 * 1000,
  });

  const hasMultipleQuotes = quotes.length > 1;

  // --------------------------------
  // Next quote
  // --------------------------------

  const nextSlide = () => {
    if (!hasMultipleQuotes) return;

    setCurrent((prev) => (prev + 1) % quotes.length);
  };

  // --------------------------------
  // Previous quote
  // --------------------------------

  const prevSlide = () => {
    if (!hasMultipleQuotes) return;

    setCurrent((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };

  // --------------------------------
  // Auto rotate
  // --------------------------------

  useEffect(() => {
    if (!hasMultipleQuotes) return;

    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [quotes.length, hasMultipleQuotes]);

  // --------------------------------
  // Prevent invalid index
  // --------------------------------

  useEffect(() => {
    if (current >= quotes.length) {
      setCurrent(0);
    }
  }, [quotes.length, current]);

  // --------------------------------
  // Loading
  // --------------------------------

  if (isLoading) {
    return (
      <section className="w-full bg-white px-4 py-10 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl animate-pulse text-center">
          <div className="mx-auto h-4 w-28 rounded bg-gray-200" />

          <div className="mx-auto mt-3 h-8 w-64 rounded bg-gray-200" />

          <div className="mx-auto mt-10 h-36 rounded-xl bg-gray-200" />
        </div>
      </section>
    );
  }

  // --------------------------------
  // Error / Empty
  // --------------------------------

  if (isError || quotes.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-orange-200/20 px-4 py-10 md:px-8 lg:px-12">
      {/* Header */}

      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 md:text-sm">
          Voices of Leadership
        </p>

        <h2 className="text-md font-bold text-gray-900 md:text-xl lg:text-3xl">
          Words From Leaders
        </h2>

        <p className="mx-auto max-w-2xl text-sm text-gray-500">
          Inspiration and wisdom from leaders and industry professionals.
        </p>
      </div>

      {/* Quote slider */}

      <div className="mx-auto mt-10 flex max-w-6xl items-center gap-4">
        {/* Previous */}

        {hasMultipleQuotes && (
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous quote"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Slides */}

        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="w-full shrink-0 px-4 md:px-10 lg:px-20"
              >
                <div className="mx-auto max-w-4xl rounded-2xl  p-6  md:p-10">
                  {/* Quote icon */}

                  <QuoteIcon
                    size={28}
                    className="text-orange-500"
                    fill="currentColor"
                  />

                  {/* Quote */}

                  <blockquote className="mt-5 text-base leading-8 text-gray-700 md:text-xl md:leading-9">
                    “{quote.quote}”
                  </blockquote>

                  {/* Leader */}

                  <div className="mt-8">
                    <h3 className="text-base font-semibold text-orange-500 md:text-xl">
                      {quote.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 md:text-sm">
                      {quote.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next */}

        {hasMultipleQuotes && (
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next quote"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* Dots */}

      {hasMultipleQuotes && (
        <div className="mt-8 flex justify-center gap-3">
          {quotes.map((quote, index) => (
            <button
              key={quote.id}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to quote ${index + 1}`}
              className={`h-3 w-3 rounded-full transition ${
                current === index
                  ? "bg-orange-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

//TESTIMONIALS
export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const {
    data: testimonials = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["public-testimonials"],
    queryFn: getPublishedTestimonials,
    staleTime: 5 * 60 * 1000,
  });

  const hasMultipleTestimonials = testimonials.length > 1;

  const nextSlide = () => {
    if (!hasMultipleTestimonials) return;

    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    if (!hasMultipleTestimonials) return;

    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!hasMultipleTestimonials) return;

    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, hasMultipleTestimonials]);

  // Prevent invalid index if testimonials change
  useEffect(() => {
    if (current >= testimonials.length) {
      setCurrent(0);
    }
  }, [testimonials.length, current]);

  if (isLoading) {
    return (
      <section className="w-full bg-orange-200/20 px-4 py-10 md:px-8 lg:px-12 ">
        <div className="mx-auto max-w-4xl animate-pulse text-center">
          <div className="mx-auto h-4 w-28 rounded bg-gray-200" />
          <div className="mx-auto mt-3 h-8 w-56 rounded bg-gray-200" />
          <div className="mx-auto mt-10 h-32 rounded bg-gray-200" />
        </div>
      </section>
    );
  }

  if (isError || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-orange-200/20 px-4 py-10 md:px-8 lg:px-12 mt-20">
      {/* Header */}
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 md:text-sm">
          Testimonials
        </p>

        <h2 className="text-md font-bold text-gray-900 md:text-xl lg:text-3xl">
          What People Say
        </h2>

        <p className="mx-auto max-w-2xl text-sm text-gray-500">
          Hear from people whose experiences with LCF have made an impact.
        </p>
      </div>

      {/* Testimonials */}
      <div className="mx-auto mt-10 flex max-w-6xl items-center gap-4">
        {/* Previous */}
        {hasMultipleTestimonials && (
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Slides */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
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
        </div>

        {/* Next */}
        {hasMultipleTestimonials && (
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* Dots */}
      {hasMultipleTestimonials && (
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-3 w-3 rounded-full transition ${
                current === index
                  ? "bg-orange-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
export function ShareReview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex h-full w-full max-w-sm flex-col lg:h-[330px] justify-between rounded-2xl bg-orange-50 px-6 py-8 text-center md:px-10">
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500">
            <MessageSquareQuote size={22} />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Had an Experience with LCF?
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-600">
            We'd love to hear about your experience. Share your thoughts and
            inspire others in our community.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="mx-auto mt-6 flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Share Your Review
          <ArrowRight size={16} />
        </button>
      </div>

      <ShareReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

//VOLUNTEER
export function VolunteerSection() {
  return (
    <div className="flex h-full w-full max-w-sm  lg:h-[330px] flex-col justify-between rounded-2xl bg-orange-50 px-6 py-8 text-center md:px-10">
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500">
          <Users size={20} />
        </div>

        <h4 className="mt-4 text-2xl font-bold text-gray-900">
          Be part of our mission
        </h4>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-600">
          Join a network of passionate leaders working together to create a
          better future for all.
        </p>
      </div>

      <div>
        <Link
          to={ROUTES.GETINVOLVE}
          className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Get Involved
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
