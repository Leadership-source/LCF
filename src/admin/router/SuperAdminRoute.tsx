import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/services/admin/auth.service";
import { ADMIN_ROUTES } from "../../constants/routes";

export default function SuperAdminRoute() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return null;

  if (user?.role?.toUpperCase() !== "SUPERADMIN") {
    return <Navigate to={ADMIN_ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}
