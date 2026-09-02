export function QuoteSkeleton() {
  return (
    <section className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex flex-col gap-5 items-start md:flex md:items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 rounded-md bg-gray-200" />
          <div className="h-4 w-80 max-w-full rounded-md bg-gray-200" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-32 rounded-lg bg-gray-200" />
          <div className="h-10 w-28 rounded-lg bg-gray-200" />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>

      {/* Quote Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        {/* Table Header */}
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 md:flex-row md:items-center md:justify-between">
          <div className="h-5 w-32 rounded bg-gray-200" />

          <div className="flex gap-3">
            <div className="h-10 w-52 rounded-lg bg-gray-200" />
            <div className="h-10 w-32 rounded-lg bg-gray-200" />
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-100">
          <QuoteRowSkeleton />
          <QuoteRowSkeleton />
          <QuoteRowSkeleton />
          <QuoteRowSkeleton />
          <QuoteRowSkeleton />
        </div>
      </div>

      {/* Invitations */}
      <div className="rounded-xl border border-gray-200 bg-white">
        {/* Invitation Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <div className="space-y-2">
            <div className="h-5 w-40 rounded bg-gray-200" />
            <div className="h-3 w-64 rounded bg-gray-200" />
          </div>

          <div className="h-9 w-24 rounded-lg bg-gray-200" />
        </div>

        {/* Invitation Rows */}
        <div className="divide-y divide-gray-100">
          <InvitationRowSkeleton />
          <InvitationRowSkeleton />
          <InvitationRowSkeleton />
        </div>
      </div>
    </section>
  );
}

function StatSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-3 w-24 rounded bg-gray-200" />
          <div className="h-7 w-12 rounded bg-gray-200" />
        </div>

        <div className="h-9 w-9 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

function QuoteRowSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-5 md:items-center">
      {/* Leader */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-3 w-20 rounded bg-gray-200" />
        </div>
      </div>

      {/* Quote */}
      <div className="space-y-2 md:col-span-2">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-4/5 rounded bg-gray-200" />
      </div>

      {/* Status */}
      <div className="h-7 w-20 rounded-full bg-gray-200" />

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <div className="h-8 w-8 rounded-md bg-gray-200" />
        <div className="h-8 w-8 rounded-md bg-gray-200" />
        <div className="h-8 w-8 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

function InvitationRowSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-4 md:items-center">
      <div className="h-4 w-48 rounded bg-gray-200" />

      <div className="h-7 w-20 rounded-full bg-gray-200" />

      <div className="h-4 w-28 rounded bg-gray-200" />

      <div className="flex justify-end gap-2">
        <div className="h-8 w-8 rounded-md bg-gray-200" />
        <div className="h-8 w-8 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
