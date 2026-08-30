import { NewsHero } from "../pages/NewsPage";

export function NewsSkeleton() {
  return (
    <main>
      <NewsHero />

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
        <div className="h-8 w-72 animate-pulse rounded bg-gray-200" />

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
            >
              <div className="h-56 animate-pulse bg-gray-200" />

              <div className="space-y-4 p-5">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />

                <div className="h-6 w-full animate-pulse rounded bg-gray-200" />

                <div className="h-20 w-full animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
