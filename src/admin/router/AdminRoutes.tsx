import { Navigate, Route, Routes } from "react-router-dom";

import AdminLoginPage from "../pages/AdminLoginPage";
import ProtectedAdminRoute from "./ProtectedRoutes";
import ForgotPasswordPage from "../pages/AdminForgetPassword";

import { AdminLayout } from "../layouts/AdminLayout";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import TeamsPage from "../pages/teams/AdminTeams";
import Events from "../pages/events/AdminEvents";
import Settings from "../pages/settings/Settings";
import ResetPasswordPage from "../pages/AdminResetPassword";
import AdminUsersPage from "../pages/users/AdminUsers";

function AdminRoutes() {
  return (
    <Routes>
      {/* /admin → /admin/login */}
      <Route index element={<Navigate to="login" replace />} />

      {/* Public admin pages */}
      <Route path="login" element={<AdminLoginPage />} />
      <Route path="forget-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />

      {/* Protected admin pages */}
      <Route element={<ProtectedAdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="events" element={<Events />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
