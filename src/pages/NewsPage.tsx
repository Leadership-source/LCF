import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getPublicNews,
  type NewsArticle,
} from "../api/services/public/news.service";
import { NewsSkeleton } from "../components/NewsSkeleton";

type NewsCardProps = {
  article: NewsArticle;
};

export default function NewsPage() {
  const {
    data: newsArticles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["public-news"],
    queryFn: getPublicNews,
  });

  const featuredArticle = newsArticles[0];

  if (isLoading) {
    return <NewsSkeleton />;
  }

  if (isError) {
    return (
      <main className="min-h-[60vh] px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Unable to load news
          </h1>

          <p className="mt-3 text-gray-600">
            We couldn't load the latest news and insights. Please try again.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <NewsHero />
      <NewsIntro />

      {featuredArticle && <FeaturedNews article={featuredArticle} />}

      <LatestNews articles={newsArticles} />

      <NewsCTA />
    </>
  );
}

//news hero section
export function NewsHero() {
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
            News & Insights
          </h1>

          <p className="max-w-2xl text-base leading-7 text-white md:text-md md:leading-8">
            Stay informed with the latest news, leadership perspectives,
            mentorship stories, events, and updates from the Leadership
            Conference Forum.
          </p>
        </div>
      </div>
    </section>
  );
}

export function NewsIntro() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 md:px-8 lg:px-12">
      <div className="mx-auto ">
        <h2 className="text-xl font-bold text-gray-900 md:text-3xl">
          Stories, Ideas & Leadership Perspectives
        </h2>

        <div className=" mt-2 h-1 w-16 rounded-full bg-orange-500" />

        <p className="mt-5 text-sm leading-7 text-gray-600 md:text-base md:leading-8">
          Discover stories and perspectives from across the Leadership
          Conference Forum. Explore leadership development, mentorship,
          community engagement, upcoming activities, and the experiences shaping
          our growing network.
        </p>
      </div>
    </section>
  );
}

export function FeaturedNews({ article }: { article: NewsArticle }) {
  return (
    <section className="bg-orange-50/60 py-8">
      <div className="mx-auto max-w-7xl space-y-4 px-4 md:px-8 lg:px-12">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            Featured
          </p>

          <h2 className="text-xl font-bold text-gray-900 md:text-3xl">
            Featured Story
          </h2>
        </div>

        <article className="grid overflow-hidden rounded-2xl bg-white shadow-sm md:grid-cols-2">
          <div className="h-[280px] md:h-full">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center space-y-5 p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="rounded-full bg-orange-100 px-3 py-1 font-medium text-orange-600">
                {article.category}
              </span>

              <span className="flex items-center gap-1">
                <CalendarDays size={15} />
                {new Date(article.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              {article.readTime && (
                <span className="flex items-center gap-1">
                  <Clock size={15} />
                  {article.readTime}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
              {article.title}
            </h3>

            <p className="leading-7 text-gray-600">{article.excerpt}</p>

            <Link
              to={`/news/${article.id}`}
              className="inline-flex w-fit items-center gap-2 rounded-md bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Read Article
              <ArrowRight size={18} />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
export function LatestNews({ articles }: { articles: NewsArticle[] }) {
  return (
    <section className="mx-auto max-w-7xl space-y-4 px-4 py-12 md:px-8 lg:px-12">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
          Latest
        </p>

        <h2 className="text-xl font-bold text-gray-900 md:text-3xl">
          Latest News & Insights
        </h2>

        <div className="h-1 w-16 rounded-full bg-orange-500" />

        <p className="max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
          Explore the latest stories, updates, leadership conversations and
          activities from LCF.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="font-semibold text-gray-900">
            No news articles available
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Check back later for the latest updates from LCF.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <CalendarDays size={14} />
            {article.date}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={14} />
            {article.readTime}
          </span>
        </div>

        <h3 className="text-xl font-bold leading-snug text-gray-900 transition group-hover:text-orange-500">
          {article.title}
        </h3>

        <p className="line-clamp-3 leading-7 text-gray-600">
          {article.excerpt}
        </p>

        <Link
          to={`/news/${article.id}`}
          className="inline-flex items-center gap-2 font-semibold text-orange-500 transition hover:text-orange-600"
        >
          Read More
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export function NewsCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:px-12">
      <div className="flex flex-col justify-between gap-6 rounded-2xl bg-orange-500 p-4 text-white md:flex-row md:items-center md:p-10">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-xl font-bold md:text-2xl">
            Stay Connected With LCF
          </h2>

          <p className=" text-sm leading-7 text-orange-50 md:text-base">
            Keep up with leadership conversations, mentorship opportunities,
            community activities, upcoming events and the latest updates from
            Leadership Conference Forum.
          </p>
        </div>

        <Link
          to="/events"
          className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
        >
          Explore Events
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
