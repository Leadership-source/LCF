export function TeamSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-md"
        >
          {/* Image skeleton */}
          <div className="h-56 w-full bg-gray-200" />

          {/* Content skeleton */}
          <div className="p-5 space-y-3">
            <div className="h-5 w-20 rounded-full bg-gray-200" />
            <div className="h-5 w-36 rounded bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-3 w-4/5 rounded bg-gray-200" />
            <div className="h-3 w-3/5 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
