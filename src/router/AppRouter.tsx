import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import GetInvolvedPage from "../pages/GetInvolvedPage";
import NewsPage from "../pages/NewsPage";
import NewsDetailsPage from "../pages/NewsDetailsPage";
import QuoteInvitationPage from "../pages/QuoteInvitationPage";
import Seo from "../components/Seo";

function AppRouter() {
  return (
    <BrowserRouter>
      <Seo />
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.EVENTS} element={<EventsPage />} />
          <Route path={ROUTES.TEAMS} element={<TeamsPage />} />
          <Route path={ROUTES.EVENTDETAILS} element={<EventDetailsPage />} />
          <Route path={ROUTES.NEWSDETAILS} element={<NewsDetailsPage />} />
          <Route path={ROUTES.GETINVOLVE} element={<GetInvolvedPage />} />
          <Route path={ROUTES.LEGAL_NOTICE} element={<LegalNoticePage />} />
          <Route path={ROUTES.NEWS} element={<NewsPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route
            path={ROUTES.QUOTEINVITATION}
            element={<QuoteInvitationPage />}
          />
          <Route path={"*"} element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
