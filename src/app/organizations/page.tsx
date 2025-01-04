import { notFound } from "next/navigation";

import { OrganizationsOverview } from "components/organization";
import { app } from "lib/config";
import { getAuthSession } from "lib/util";

export const metadata = {
  title: `${app.organizationsPage.breadcrumb} | ${app.name}`,
};

/**
 * Organizations overview page.
 */
const OrganizationsPage = async () => {
  const session = await getAuthSession();

  if (!session) notFound();

  return <OrganizationsOverview />;
};

export default OrganizationsPage;
