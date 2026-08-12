export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="h-7 w-32 rounded-md bg-gray-200" />

        <div className="mt-2 h-4 w-72 max-w-full rounded-md bg-gray-200" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            {/* Icon */}
            <div className="h-11 w-11 rounded-lg bg-gray-200" />

            <div className="mt-5">
              {/* Title */}
              <div className="h-4 w-32 rounded bg-gray-200" />

              {/* Number */}
              <div className="mt-2 h-9 w-16 rounded bg-gray-200" />

              {/* Description */}
              <div className="mt-2 h-3 w-28 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="mb-4 h-5 w-32 rounded bg-gray-200" />

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="h-11 w-11 shrink-0 rounded-lg bg-gray-200" />

                <div className="min-w-0">
                  {/* Heading */}
                  <div className="h-4 w-28 rounded bg-gray-200" />

                  {/* Description */}
                  <div className="mt-2 h-3 w-56 max-w-full rounded bg-gray-200" />
                </div>
              </div>

              {/* Arrow */}
              <div className="ml-4 h-5 w-5 shrink-0 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          {/* Heading */}
          <div className="h-4 w-32 rounded bg-gray-200" />

          {/* Description */}
          <div className="mt-2 h-3 w-64 max-w-full rounded bg-gray-200" />
        </div>

        {/* Activity placeholder */}
        <div className="mt-6 flex flex-col items-center justify-center py-8">
          <div className="h-4 w-40 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
