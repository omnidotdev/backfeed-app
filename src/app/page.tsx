import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import { getSession } from "lib/util";

/**
 * Home page. This route is dynamically rendered based on the user's authentication status.
 */
const HomePage = async () => {
  const session = await getSession();

  if (!session) return <LandingPage />;

  return <DashboardPage />;
};

export default HomePage;
