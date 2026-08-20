import { Check, Clock, X } from "lucide-react";

type Props = {
  pending: number;
  approved: number;
  rejected: number;
};

export default function TestimonialStats({
  pending,
  approved,
  rejected,
}: Props) {
  const stats = [
    {
      label: "Pending Reviews",
      value: pending,
      icon: Clock,
      iconClass: "text-orange-500",
      bgClass: "bg-orange-100",
    },
    {
      label: "Approved Reviews",
      value: approved,
      icon: Check,
      iconClass: "text-green-600",
      bgClass: "bg-green-100",
    },
    {
      label: "Rejected Reviews",
      value: rejected,
      icon: X,
      iconClass: "text-red-500",
      bgClass: "bg-red-100",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-3 ${stat.bgClass}`}>
                <Icon className={stat.iconClass} size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>

                <h2 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
