import { CalendarDays, MapPin } from "lucide-react";
import type { Event } from "../api/types";
import { whyAttendData } from "../static-data/data";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPublicEvents } from "../api/services/public/events.service";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { EventSkeleton } from "../components/EventSkeleton";

//eventcardprops
type EventCardProps = {
  id: string;
  image: string;
  category: string;
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
};

//whyAttendCard props
type WhyAttendCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

//events page
export default function EventsPage() {
  return (
    <>
      <EventHero />
      <UpcomingEvents />
      <WhyAttendSection />
    </>
  );
}

//event hero section components

export function EventHero() {
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
            Our Events
          </h1>

          <p className="max-w-2xl text-base leading-7 text-white md:text-md md:leading-8">
            Explore our upcoming conferences, workshops, and networking events
            inspire, equip, and connect leaders designed across the UK and
            beyound
          </p>
        </div>
      </div>
    </section>
  );
}

//upcomingEvents components
export function UpcomingEvents() {
  const [selectedCategory, setSelectedCategory] = useState("All Events");

  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: getPublicEvents,
  });

  if (isLoading) {
    return <EventSkeleton />;
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12">
        <p className="text-center text-red-500">Failed to load events.</p>
      </section>
    );
  }

  // Get unique categories from the events
  const categories = Array.from(
    new Set(events.map((event) => event.category?.trim()).filter(Boolean)),
  );

  // Filter events based on selected category
  const filteredEvents =
    selectedCategory === "All Events"
      ? events
      : events.filter(
          (event) =>
            event.category?.toLowerCase() === selectedCategory.toLowerCase(),
        );

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-orange-500" size={30} />

          <h2 className="text-xl font-bold md:text-2xl">Upcoming Events</h2>
        </div>

        {/* Dynamic Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-auto rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 md:w-52"
        >
          <option value="All Events">All Events</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              image={event.image}
              category={event.category}
              title={event.title}
              location={event.location}
              date={event.date}
              time={event.time}
              description={event.description}
            />
          ))
        ) : (
          <p className="py-10 text-center text-gray-500">
            No events found for this category.
          </p>
        )}
      </div>
    </section>
  );
}

// event card
export function EventCard({
  id,
  image,
  category,
  title,
  location,
  date,
  time,
  description,
}: EventCardProps) {
  return (
    <div className="flex  flex-col md:flex-row gap-6 rounded-2xl border border-gray-200 bg-white  shadow-sm hover:shadow-md transition">
      <LazyLoadImage
        src={image}
        alt={title}
        effect="blur"
        className=" w-full rounded-b-none rounded-2xl md:rounded-bl-2xl md:rounded-r-none md:object-cover md:h-full md:w-72 lg:w-72"
      />
      <div className="flex-1 p-4">
        <div className="flex  flex-col lg:flex-row  items-start gap-10 lg:items-center  justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold  uppercase tracking-wide text-orange-500">
              {category}
            </p>

            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              {title}
            </h3>

            <div className=" flex flex-col  gap-2 text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin size={18} className="text-orange-500" />
                <span>{location}</span>
              </div>

              <div className="flex items-center gap-1">
                <CalendarDays size={18} className="text-orange-500" />
                <span>{date}</span>
              </div>

              <span>{time}</span>
            </div>

            <p className="w-auto lg:max-w-lg text-gray-600">{description}</p>
          </div>

          <div className="lg:ml-auto lg:shrink-0">
            <Link
              to={`/events/${id}`}
              className="inline-block whitespace-nowrap rounded-lg bg-orange-500 px-8 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

//whyAttendSection component
export function WhyAttendSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12">
      <div className="rounded-xl bg-orange-50 p-6 shadow-sm space-y-4">
        <h2 className=" text-center text-xl font-bold text-gray-900 md:text-2xl">
          Why Attend Our Events?
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {whyAttendData.map((item, index) => (
            <div
              key={item.id}
              className={`${
                index !== whyAttendData.length - 1
                  ? "lg:border-r lg:border-gray-200 lg:pr-6"
                  : ""
              }`}
            >
              <WhyAttendCard
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

//why attend card components
export function WhyAttendCard({
  icon,
  title,
  description,
}: WhyAttendCardProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-orange-500">{icon}</div>

      <div className="space-y-2">
        <h3 className="text-md font-bold text-gray-900">{title}</h3>

        <p className=" text-sm text-gray-600 leading-6">{description}</p>
      </div>
    </div>
  );
}
