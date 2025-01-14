"use client";

import { Stack, Text } from "@omnidev/sigil";

import type { Organization } from "generated/graphql";

interface Props {
  /** Organization details. */
  organization: Partial<Organization>;
}

/** Organization settings. */
const OrganizationSettings = ({ organization }: Props) => {
  return (
    <Stack>
      <Text>{organization.name}</Text>
    </Stack>
  );
};

export default OrganizationSettings;
