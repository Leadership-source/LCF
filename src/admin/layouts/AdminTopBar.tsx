import { Bell, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/services/admin/auth.service";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "../../api/services/admin/notification.service";
import { ADMIN_ROUTES } from "../../constants/routes";
import toast from "react-hot-toast";

type AdminTopBarProps = {
  toggleSidebar: () => void;
};

// Map notification type prefix to the admin route it relates to
function getNotificationRoute(type: string): string {
  if (type.startsWith("EVENT")) return ADMIN_ROUTES.EVENTS;
  if (type.startsWith("TEAM")) return ADMIN_ROUTES.TEAMS;
  if (type.startsWith("TESTIMONIAL")) return ADMIN_ROUTES.TESTIMONIALS;
  if (type.startsWith("USER")) return ADMIN_ROUTES.USERS;
  return ADMIN_ROUTES.DASHBOARD;
}

export function AdminTopBar({ toggleSidebar }: AdminTopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  // mark as read
  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },

    onError: () => {
      toast.error("Failed to mark notification as read");
    },
  });

  // mark as all read
  const markAllAsReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      toast.success("All notifications marked as read");
    },

    onError: () => {
      toast.error("Failed to mark notifications as read");
    },
  });

  //delete one notification
  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      toast.success("Notification cleared");
    },

    onError: () => {
      toast.error("Failed to clear notification");
    },
  });

  //clear all notification
  const deleteAllNotificationsMutation = useMutation({
    mutationFn: deleteAllNotifications,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      toast.success("All notifications cleared");
    },

    onError: () => {
      toast.error("Failed to clear notifications");
    },
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
        <div className="relative">
          {/* Bell button */}
          <button
            type="button"
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative rounded-full p-2 hover:bg-gray-100"
          >
            <Bell />

            {unreadNotifications.length > 0 && (
              <span className="absolute right-1 top-1 flex h-2.5 w-2.5 rounded-full bg-orange-500" />
            )}
          </button>

          {/* Dropdown */}
          {showNotifications && (
            <div className="absolute -right-15 lg:right-0 top-12 z-50 w-80 rounded-xl border border-gray-200 bg-white shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <h3 className="font-semibold text-gray-900">Notifications</h3>

                <div className="flex items-center gap-2">
                  {unreadNotifications.length > 0 && (
                    <button
                      type="button"
                      onClick={() => markAllAsReadMutation.mutate()}
                      disabled={markAllAsReadMutation.isPending}
                      className="text-xs font-medium text-orange-500 hover:text-orange-600 disabled:opacity-50"
                    >
                      {markAllAsReadMutation.isPending
                        ? "Marking..."
                        : "Mark all as read"}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="rounded-md p-1 hover:bg-gray-100"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Content */}
              {notificationsLoading ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-gray-500">
                    Loading notifications...
                  </p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell size={28} className="mx-auto mb-2 text-gray-300" />

                  <p className="text-sm text-gray-500">No notifications yet</p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-2 border-b border-gray-100 px-4 py-3 last:border-b-0 ${
                        !notification.isRead ? "bg-orange-50" : "bg-white"
                      }`}
                    >
                      {/* Notification */}
                      <Link
                        to={getNotificationRoute(notification.type)}
                        onClick={() => {
                          if (!notification.isRead) {
                            markAsReadMutation.mutate(notification.id);
                          }

                          setShowNotifications(false);
                        }}
                        className="min-w-0 flex-1"
                      >
                        <p className="text-sm text-gray-700">
                          {notification.message}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </Link>

                      {/* Clear one */}
                      <button
                        type="button"
                        onClick={() =>
                          deleteNotificationMutation.mutate(notification.id)
                        }
                        disabled={deleteNotificationMutation.isPending}
                        className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                        title="Clear notification"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Clear all */}
              {notifications.length > 0 && (
                <div className="border-t border-gray-200 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => deleteAllNotificationsMutation.mutate()}
                    disabled={deleteAllNotificationsMutation.isPending}
                    className="w-full text-center text-sm font-medium text-red-500 hover:text-red-600 disabled:opacity-50"
                  >
                    {deleteAllNotificationsMutation.isPending
                      ? "Clearing..."
                      : "Clear all notifications"}
                  </button>
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
