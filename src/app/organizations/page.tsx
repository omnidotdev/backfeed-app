"use client";

import { Text, VStack } from "@omnidev/sigil";
import { notFound } from "next/navigation";

import { useAuth } from "lib/hooks";

/**
 * Organizations overview page.
 */
const OrganizationsPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) notFound();

  return (
    <VStack justify="center" h="full">
      <Text>Organizations</Text>
    </VStack>
  );
};

export default OrganizationsPage;
