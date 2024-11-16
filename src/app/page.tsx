"use client";

import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import { useAuth } from "lib/hooks";

// TODO: make dynamic when auth flow is implemented
const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <DashboardPage /> : <LandingPage />;
};

export default HomePage;
