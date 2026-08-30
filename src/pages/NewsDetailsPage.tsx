// pages/NewsDetailsPage.tsx

import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import {
  getPublicNews,
  getPublicNewsById,
  type NewsArticle,
} from "../api/services/public/news.service";

export default function NewsDetailsPage() {
  const { id } = useParams();

  // Get the article using the ID from the URL
  const {
    data: article,
    isLoading,
    isError,
  } = useQuery<NewsArticle>({
    queryKey: ["public-news-article", id],
    queryFn: () => getPublicNewsById(id!),
    enabled: Boolean(id),
  });

  // Get all published news for related articles
  const { data: newsArticles = [] } = useQuery<NewsArticle[]>({
    queryKey: ["public-news"],
    queryFn: getPublicNews,
  });

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return (
      <main className="min-h-[70vh] px-4 py-20 md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-gray-500">Loading article...</p>
        </div>
      </main>
    );
  }

  // =========================
  // ARTICLE NOT FOUND
  // =========================

  if (isError || !article) {
    return (
      <main className="min-h-[70vh] px-4 py-20 md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            News & Insights
          </span>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            Article Not Found
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
            The article you are looking for may have been removed, or the link
            may no longer be available.
          </p>

          <Link
            to="/news"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <ArrowLeft size={18} />
            Back to News
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* hero section */}

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
          <div className="space-y-3">
            <div className="">
              <span className="inline-block rounded-full bg-orange-100/50 px-4 py-2 text-sm font-semibold text-white">
                {article.category}
              </span>
            </div>

            {/* Title */}

            <h1 className="text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            {/* Metadata */}

            <div className="flex flex-wrap items-center gap-5 text-sm text-white">
              <span className="flex items-center gap-2">
                <CalendarDays size={17} />

                {new Date(article.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>

              {article.readTime && (
                <span className="flex items-center gap-2">
                  <Clock size={17} />

                  {article.readTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* article content */}

      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12">
        <article className="mx-auto">
          {/* Featured Image */}

          <div className="overflow-hidden rounded-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="h-[280px] w-full object-cover md:h-[450px]"
            />
          </div>

          {/* Article Body */}

          <div className="mt-10">
            {/* Excerpt */}

            <p className="text-lg font-medium leading-6 text-gray-700 md:text-xl md:leading-9">
              {article.excerpt}
            </p>

            {/* Full Content */}

            <div className="mt-8">
              {(article.content || "").split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-6 text-base leading-8 text-gray-600 md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* back to news */}

          <div className="border-t border-gray-200 p-4">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 font-semibold text-orange-500 transition hover:text-orange-600"
            >
              <ArrowLeft size={18} />
              Back to News & Insights
            </Link>
          </div>
        </article>
      </main>

      {/* related article */}

      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Continue Reading
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
              More From LCF
            </h2>

            <div className="mt-1 h-1 w-16 rounded-full bg-orange-500" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsArticles
              .filter((item) => item.id !== article.id)
              .slice(0, 3)
              .map((relatedArticle) => (
                <article
                  key={relatedArticle.id}
                  className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image */}

                  <div className="h-52 overflow-hidden">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}

                  <div className="space-y-4 p-5">
                    <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                      {relatedArticle.category}
                    </span>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={14} />

                        {new Date(relatedArticle.date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>

                      {relatedArticle.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock size={14} />

                          {relatedArticle.readTime}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold leading-snug text-gray-900 transition group-hover:text-orange-500">
                      {relatedArticle.title}
                    </h3>

                    <p className="line-clamp-3 leading-7 text-gray-600">
                      {relatedArticle.excerpt}
                    </p>

                    <Link
                      to={`/news/${relatedArticle.id}`}
                      className="inline-flex items-center gap-2 font-semibold text-orange-500 transition hover:text-orange-600"
                    >
                      Read More
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
