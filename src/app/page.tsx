"use client";

import { Spinner } from "components/core";
import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import { useAuth } from "lib/hooks";

/**
 * Home page. This route is dynamically rendered based on the user's authentication status.
 */
const HomePage = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <Spinner justifySelf="center" mt={12} />;

  if (!isAuthenticated) return <LandingPage />;

  return <DashboardPage />;
};

export default HomePage;
