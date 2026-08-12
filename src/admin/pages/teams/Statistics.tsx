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
    <div className="flex items-center gap-3 rounded-xl bg-white py-2 px-4 shadow-sm">
      <div className="rounded-full bg-orange-50  p-3">{icon}</div>

      <div>
        <p className="text-gray-500">{title}</p>

        <h2 className=" text-md font-bold">{value}</h2>
      </div>
    </div>
  );
}

export { StatCard };
