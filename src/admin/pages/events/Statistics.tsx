function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
      <div className="rounded-full bg-orange-50 p-3">{icon}</div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <h2 className="text-lg font-bold">{value}</h2>
      </div>
    </div>
  );
}

export { StatCard };
