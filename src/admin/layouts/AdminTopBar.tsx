import { Bell, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/services/admin/auth.service";
import { getNotifications } from "../../api/services/admin/notification.service";

type AdminTopBarProps = {
  toggleSidebar: () => void;
};

export function AdminTopBar({ toggleSidebar }: AdminTopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: notifications = [], isLoading: notificationsLoading } =
    useQuery({
      queryKey: ["notifications"],
      queryFn: getNotifications,
    });

  // Get first letter of user's name
  const userInitial = user?.name?.charAt(0).toUpperCase() || "A";

  // Get unread notifications
  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead,
  );

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 shadow-sm md:px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-md p-2 transition hover:bg-gray-100 lg:hidden"
        >
          <Menu />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative rounded-full p-2 hover:bg-gray-100"
          >
            <Bell />

            {/* Notification count */}
            {unreadNotifications.length > 0 && (
              <span className="absolute right-1 top-1 flex h-2.5 w-2.5 rounded-full bg-orange-500" />
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <h3 className="font-semibold text-gray-900">Notifications</h3>

                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="rounded-md p-1 hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              {notificationsLoading ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-gray-500">
                    Loading notifications...
                  </p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell size={28} className="mx-auto mb-2 text-gray-300" />

                  <p className="text-sm text-gray-500">No new notifications</p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-b border-gray-100 px-4 py-3 last:border-b-0 ${
                        !notification.isRead ? "bg-orange-50" : ""
                      }`}
                    >
                      <p className="text-sm text-gray-700">
                        {notification.message}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-100"
        >
          {/* User abbreviation */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 font-semibold text-white">
            {userInitial}
          </div>

          <div className="hidden text-left lg:block">
            <p className="text-sm font-medium text-gray-900">
              {user?.name || "Admin"}
            </p>

            <p className="text-xs text-gray-500">{user?.email || ""}</p>
          </div>

          <ChevronDown size={16} className="hidden text-gray-500 lg:block" />
        </button>
      </div>
    </header>
  );
}
