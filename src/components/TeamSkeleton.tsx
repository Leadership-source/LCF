export function TeamSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-10 lg:justify-between">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-[300px] animate-pulse rounded-md bg-white shadow-md md:w-[200px]"
        >
          {/* Image skeleton */}
          <div className="h-[200px] w-full rounded-md rounded-b-none bg-gray-200 md:h-[150px] md:w-[200px]" />

          {/* Content skeleton */}
          <div className="space-y-3 p-4">
            {/* Name */}
            <div className="h-5 w-32 rounded bg-gray-200" />

            {/* Role */}
            <div className="h-4 w-24 rounded bg-gray-200" />

            {/* Optional Show More */}
            <div className="hidden h-4 w-20 rounded bg-gray-200 md:block" />
          </div>
        </div>
      ))}
    </div>
  );
}
