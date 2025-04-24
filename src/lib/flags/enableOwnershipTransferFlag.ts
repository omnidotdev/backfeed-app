import { flag } from "flags/next";

import { isDevEnv } from "lib/config";

/**
 * Feature flag that determines if the user has permission to transfer ownership of an organization.
 */
const enableOwnershipTransferFlag = flag({
  key: "ownership-transfer-flag",
  decide: () => isDevEnv,
});

export default enableOwnershipTransferFlag;
