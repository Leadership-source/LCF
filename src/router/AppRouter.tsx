import { HashRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import EventsPage from "../pages/EventsPage";

import ContactPage from "../pages/ContactPage";
import PageNotFound from "../pages/PageNotFound";
import LegalNoticePage from "../pages/LegalNoticePage";
import EventDetailsPage from "../pages/EventDetailsPage";
import TeamsPage from "../pages/TeamsPage";
import AdminRoutes from "../admin/router/AdminRoutes";
import PublicLayout from "../layouts/PublicLayout";
import VolunteerPage from "../pages/GetInvolvedPage";

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.EVENTS} element={<EventsPage />} />
          <Route path={ROUTES.TEAMS} element={<TeamsPage />} />
          <Route path={ROUTES.EVENTDETAILS} element={<EventDetailsPage />} />
          <Route path={ROUTES.GETINVOLVE} element={<VolunteerPage />} />
          <Route path={ROUTES.LEGAL_NOTICE} element={<LegalNoticePage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={"*"} element={<PageNotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
export default AppRouter;
