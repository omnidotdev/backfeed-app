import { flag } from "flags/next";

import { isDevEnv } from "lib/config";

/**
 * Feature flag that determines if the user has permission to join an organization.
 */
const enableJoinOrganizationFlag = flag({
  key: "join-organization-flag",
  decide: () => isDevEnv,
});

export default enableJoinOrganizationFlag;
