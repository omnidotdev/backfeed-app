import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LuPlusCircle } from "react-icons/lu";

import { Page } from "components/layout";
import { OrganizationFilters, OrganizationList } from "components/organization";
import { app } from "lib/config";
import { getSession } from "lib/util";

/**
 * Organizations overview page.
 */
const OrganizationsPage = async () => {
  const session = await getSession();

  if (!session) notFound();

  return (
    <Page
      header={{
        title: app.organizationsPage.header.title,
        description: app.organizationsPage.header.description,
        cta: [
          {
            label: app.organizationsPage.header.cta.newOrganization.label,
            icon: <LuPlusCircle />,
          },
        ],
      }}
    >
      {/* // ! NB: wrapped in a suspense boundary to avoid opting entire page into CSR. See: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
      <Suspense>
        <OrganizationFilters />

        <OrganizationList />
      </Suspense>
    </Page>
  );
};

export default OrganizationsPage;
