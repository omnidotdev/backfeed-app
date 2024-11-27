"use client";

import { Text } from "@omnidev/sigil";
import { notFound } from "next/navigation";

import { Page } from "components/layout";
import { useAuth } from "lib/hooks";

/**
 * Organizations overview page.
 */
const OrganizationsPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) notFound();

  return (
    <Page justify="center" align="center" h="full">
      <Text>Organizations</Text>
    </Page>
  );
};

export default OrganizationsPage;
