"use client";

import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import { useAuth } from "lib/hooks";

/**
 * Home page. This route is dynamically rendered based on the user's authentication status.
 */
const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <DashboardPage /> : <LandingPage />;
};

export default HomePage;
