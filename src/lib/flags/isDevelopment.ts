import { flag } from "flags/next";

import { isDevEnv } from "lib/config";

const isDevelopment = flag({
  key: "development-flag",
  decide: () => isDevEnv,
});

export default isDevelopment;
