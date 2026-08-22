export function TeamSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 items-center gap-10 justify-center lg:gap-100 md:grid-cols-3 lg:justify-between">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="mx-auto h-[350px] w-[300px] animate-pulse overflow-hidden rounded-md bg-white shadow-md md:w-[320px]"
        >
          {/* Image skeleton */}
          <div className="h-[200px] w-full rounded-md rounded-b-none bg-gray-200" />

          {/* Content skeleton */}
          <div className="flex h-[150px] flex-col items-center justify-center gap-2 p-4">
            {/* Name */}
            <div className="h-5 w-32 rounded bg-gray-200" />

            {/* Role */}
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
