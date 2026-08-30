export function NewsSkeleton() {
  return (
    <section className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="h-7 w-44 rounded-md bg-gray-200" />

          <div className="mt-2 h-4 w-80 max-w-full rounded bg-gray-200" />
        </div>

        {/* Add News Button */}
        <div className="h-11 w-40 rounded-lg bg-gray-200" />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Articles */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-4 w-24 rounded bg-gray-200" />

              <div className="mt-3 h-8 w-12 rounded bg-gray-200" />
            </div>

            <div className="h-10 w-10 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Published */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-4 w-20 rounded bg-gray-200" />

              <div className="mt-3 h-8 w-12 rounded bg-gray-200" />
            </div>

            <div className="h-10 w-10 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Unpublished */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-4 w-24 rounded bg-gray-200" />

              <div className="mt-3 h-8 w-12 rounded bg-gray-200" />
            </div>

            <div className="h-10 w-10 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Search + Status */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="h-11 w-full rounded-lg bg-gray-200 md:max-w-md" />

        {/* Status */}
        <div className="h-11 w-full rounded-lg bg-gray-200 md:w-44" />
      </div>

      {/* News Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            {/* Table Header */}
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </th>

                <th className="px-5 py-4 text-left">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </th>

                <th className="px-5 py-4 text-left">
                  <div className="h-4 w-14 rounded bg-gray-200" />
                </th>

                <th className="px-5 py-4 text-left">
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </th>

                <th className="px-5 py-4 text-right">
                  <div className="ml-auto h-4 w-16 rounded bg-gray-200" />
                </th>
              </tr>
            </thead>

            {/* Table Rows */}
            <tbody>
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  {/* Article */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* Image */}
                      <div className="h-14 w-20 shrink-0 rounded-lg bg-gray-200" />

                      <div className="space-y-2">
                        {/* Title */}
                        <div className="h-4 w-48 rounded bg-gray-200" />

                        {/* Read time */}
                        <div className="h-3 w-20 rounded bg-gray-200" />
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <div className="h-6 w-20 rounded-full bg-gray-200" />
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-gray-200" />

                      <div className="h-3 w-20 rounded bg-gray-200" />
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <div className="h-9 w-9 rounded-md bg-gray-200" />

                      <div className="h-9 w-9 rounded-md bg-gray-200" />

                      <div className="h-9 w-9 rounded-md bg-gray-200" />
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
