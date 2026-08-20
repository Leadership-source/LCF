export default function TestimonialSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />

        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>

      {/* Testimonials */}
      <div className="space-y-5">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}
