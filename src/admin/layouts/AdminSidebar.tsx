import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Settings,
  LogOut,
  ShieldCheck,
  X,
  MessageSquareQuote,
  Newspaper,
  Quote,
  HandHeart,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ADMIN_ROUTES } from "../../constants/routes";
import {
  getCurrentUser,
  logoutAdmin,
} from "../../api/services/admin/auth.service";
import { getErrorMessage } from "../../lib/getErrorMessage";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const coreNavItems = [
  {
    label: "Dashboard",
    to: ADMIN_ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Team Members",
    to: ADMIN_ROUTES.TEAMS,
    icon: Users,
    end: true,
  },
  {
    label: "Events",
    to: ADMIN_ROUTES.EVENTS,
    icon: CalendarDays,
    end: true,
  },
  {
    label: "Testimonials",
    to: ADMIN_ROUTES.TESTIMONIALS,
    icon: MessageSquareQuote,
    end: true,
  },
  {
    label: "News & Insights",
    to: ADMIN_ROUTES.NEWS,
    icon: Newspaper,
    end: true,
  },
  {
    label: "Leaders' Quotes",
    to: ADMIN_ROUTES.QUOTES,
    icon: Quote,
    end: true,
  },
  {
    label: "Volunteer Applications",
    to: ADMIN_ROUTES.VOLUNTEERS,
    icon: HandHeart,
    end: true,
  },
  {
    label: "Settings",
    to: ADMIN_ROUTES.SETTINGS,
    icon: Settings,
    end: true,
  },
];

export function AdminSidebar({ isOpen, onClose }: Props) {
  const navigate = useNavigate();

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
  });

  const isSuperAdmin = currentUser?.role?.toUpperCase() === "SUPERADMIN";

  const logoutMutation = useMutation({
    mutationFn: logoutAdmin,

    onSuccess: () => {
      toast.success("Logged out successfully");

      onClose();

      navigate(ADMIN_ROUTES.LOGIN, {
        replace: true,
      });
    },

    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to logout"));
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/50
          transition-opacity duration-300
          lg:hidden
          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64 flex-col
          bg-[#14171D] text-white

          transform
          transition-transform
          duration-300
          ease-in-out

          lg:static
          lg:translate-x-0

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-8 lg:hidden"
        >
          <X size={22} />
        </button>

        {/* Logo — image banner with overlay */}
        <div
          className="relative flex h-24 shrink-0 items-end overflow-hidden px-4 pb-3"
          style={{
            backgroundImage: "url('/Admin_Logo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <div className="absolute inset-0 bg-[#14171D]/60" />
          <div className="relative z-10 flex items-center gap-2">
            <span className="rounded-md bg-orange-500 px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-white">
              LCF
            </span>
            <span className="text-sm font-semibold text-white">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-2">
            {coreNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-2 py-2 transition-colors ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "text-gray-300 hover:bg-[#292b32]"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {isSuperAdmin && (
              <NavLink
                to={ADMIN_ROUTES.USERS}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-2 py-2 transition-colors ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "text-gray-300 hover:bg-[#292b32]"
                  }`
                }
              >
                <ShieldCheck size={20} />
                <span>Users</span>
              </NavLink>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-700 px-2 py-6">
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-gray-300 transition-colors hover:bg-[#292b32] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={20} />

            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}
