import { useMemo, useState } from "react";
import { CheckCircle2, EyeOff, Newspaper, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getNews } from "../../../api/services/admin/news.service";
import { AddNews } from "./AddNews";
import { NewsTable } from "./NewsTable";
import { NewsSkeleton } from "./NewsSkeleton";

export default function NewsPage() {
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | "PUBLISHED" | "UNPUBLISHED">(
    "ALL",
  );

  const {
    data: news = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-news"],
    queryFn: getNews,
  });

  const filteredNews = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return news.filter((article) => {
      const matchesSearch =
        !searchValue ||
        article.title.toLowerCase().includes(searchValue) ||
        article.category.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "ALL" ||
        (status === "PUBLISHED" && article.isPublished) ||
        (status === "UNPUBLISHED" && !article.isPublished);

      return matchesSearch && matchesStatus;
    });
  }, [news, search, status]);

  const publishedCount = news.filter((article) => article.isPublished).length;

  const unpublishedCount = news.filter(
    (article) => !article.isPublished,
  ).length;

  if (isLoading) {
    return <NewsSkeleton />;
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load news articles.
      </div>
    );
  }

  return (
    <>
      <section className="space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-lg font-bold md:text-2xl">News & Insights</h1>

            <p className="mt-1 text-sm text-gray-500">
              Create and manage Leadership Conference Forum news and insights.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddNewsOpen(true)}
            className="w-fit rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            + Add News Article
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Articles</p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {news.length}
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
                <Newspaper size={20} className="text-orange-500" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Published</p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {publishedCount}
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 size={20} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border shadow-sm border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Unpublished</p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {unpublishedCount}
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <EyeOff size={20} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Search + status */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news articles..."
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-orange-500"
            />
          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "ALL" | "PUBLISHED" | "UNPUBLISHED")
            }
            className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
          >
            <option value="ALL">All Articles</option>
            <option value="PUBLISHED">Published</option>
            <option value="UNPUBLISHED">Unpublished</option>
          </select>
        </div>

        {/* News table */}
        <NewsTable news={filteredNews} />
      </section>

      {/* Add News Modal */}
      <AddNews isOpen={isAddNewsOpen} onClose={() => setIsAddNewsOpen(false)} />
    </>
  );
}
