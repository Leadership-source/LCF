export function EventSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-12 animate-pulse">
      {/* Section Header */}
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          {/* Calendar icon */}
          <div className="h-7 w-7 rounded-md bg-gray-200" />

          {/* Heading */}
          <div className="h-7 w-44 rounded-md bg-gray-200" />
        </div>

        {/* Category select */}
        <div className="h-12 w-full rounded-lg bg-gray-200 md:w-52" />
      </div>

      {/* Event Cards */}
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:flex-row"
          >
            {/* Image */}
            <div className="h-56 w-full shrink-0 bg-gray-200 md:h-auto md:w-72 lg:w-72" />

            {/* Content */}
            <div className="flex-1 p-4">
              <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="w-full space-y-4">
                  {/* Category */}
                  <div className="h-3 w-24 rounded bg-gray-200" />

                  {/* Title */}
                  <div className="h-6 w-3/4 max-w-md rounded bg-gray-200" />

                  {/* Location */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-gray-200" />
                      <div className="h-4 w-48 rounded bg-gray-200" />
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded bg-gray-200" />
                      <div className="h-4 w-40 rounded bg-gray-200" />
                    </div>

                    {/* Time */}
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </div>

                  {/* Description */}
                  <div className="max-w-lg space-y-2">
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-5/6 rounded bg-gray-200" />
                    <div className="h-4 w-2/3 rounded bg-gray-200" />
                  </div>
                </div>

                {/* View Details button */}
                <div className="h-12 w-36 shrink-0 rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
