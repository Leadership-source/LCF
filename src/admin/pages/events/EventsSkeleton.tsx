export function EventSkeleton() {
  return (
    <section className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-36 rounded-md bg-gray-200" />
        </div>

        {/* Add Team button */}
        <div className="h-10 w-28 rounded-lg bg-gray-200" />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"
          >
            {/* Icon */}
            <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

            <div className="min-w-0 flex-1">
              {/* Title */}
              <div className="h-3.5 w-24 rounded bg-gray-200" />

              {/* Value */}
              <div className="mt-2 h-5 w-12 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Team Table Card */}
      <div className="rounded-xl bg-white px-4 py-6 shadow-sm">
        {/* Search + Filter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 gap-4">
            {/* Search */}
            <div className="h-10 w-full max-w-sm rounded-lg bg-gray-200" />

            {/* Status select */}
            <div className="h-10 w-28 rounded-lg bg-gray-200" />
          </div>

          {/* Sort button */}
          <div className="h-10 w-28 rounded-lg bg-gray-200" />
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full">
            {/* Table Header */}
            <thead className="border-b bg-gray-50">
              <tr>
                {Array.from({ length: 6 }).map((_, index) => (
                  <th key={index} className="px-3 py-4 text-left md:px-6">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Rows */}
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 last:border-none"
                >
                  {/* # */}
                  <td className="px-3 py-5 md:px-6">
                    <div className="h-4 w-5 rounded bg-gray-200" />
                  </td>

                  {/* Member */}
                  <td className="px-3 py-5 md:px-6">
                    <div className="flex items-center gap-4">
                      {/* Profile image */}
                      <div className="h-12 w-12 shrink-0 rounded-full bg-gray-200 md:h-14 md:w-14" />

                      <div>
                        {/* Name */}
                        <div className="h-4 w-28 rounded bg-gray-200" />
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-3 py-5 md:px-6">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                  </td>

                  {/* Status */}
                  <td className="px-3 py-5 md:px-6">
                    <div className="h-6 w-24 rounded-full bg-gray-200" />
                  </td>

                  {/* Display Order */}
                  <td className="px-6 py-5">
                    <div className="mx-auto h-4 w-8 rounded bg-gray-200" />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-gray-200" />
                      <div className="h-8 w-8 rounded-md bg-gray-200" />
                      <div className="h-8 w-8 rounded-md bg-gray-200" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
