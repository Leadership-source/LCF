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
import SuperAdminRoute from "./SuperAdminRoute";
import TestimonialsPage from "../pages/Testimonials/TestimonialsPage";
import NewsPage from "../pages/News/AdminNews";
import QuotesPage from "../pages/quote/AdminQuote";
import VolunteerApplicationsPage from "../pages/volunteers/VolunteerApplicationsPage";
import PartnersPage from "../pages/partners/PartnersPage";
import ExternalRolesPage from "../pages/externalRoles/ExternalRolesPage";

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
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="events" element={<Events />} />
          <Route path="settings" element={<Settings />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="quotes" element={<QuotesPage />} />
          <Route path="volunteers" element={<VolunteerApplicationsPage />} />
          <Route path="partners" element={<PartnersPage />} />
          <Route path="external-roles" element={<ExternalRolesPage />} />

          <Route element={<SuperAdminRoute />}>
            <Route path="users" element={<AdminUsersPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
