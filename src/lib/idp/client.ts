/**
 * IDP (Identity Provider) member type alias.
 *
 * Organization membership is owned by Gatekeeper; this alias keeps local call
 * sites stable against the provider's `GatekeeperMember` shape. Member reads and
 * mutations go through the server functions in `@/server/functions/organizations`
 * (never the browser), which delegate to Gatekeeper's permission-checked org API.
 */

import type { GatekeeperMember } from "@omnidotdev/providers/auth";

export type IdpMember = GatekeeperMember;
