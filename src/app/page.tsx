import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import { getAuthSession } from "lib/util";

/**
 * Home page. This route is dynamically rendered based on the user's authentication status.
 */
const HomePage = async () => {
  const session = await getAuthSession();

  if (!session) return <LandingPage />;

  return <DashboardPage />;
};

export default HomePage;
