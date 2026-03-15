import { GatekeeperOrgClient } from "@omnidotdev/providers";

import { AUTH_BASE_URL } from "./env.config";

const gatekeeperOrg = new GatekeeperOrgClient(AUTH_BASE_URL!);

export default gatekeeperOrg;
