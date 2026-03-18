/**
 * Query options for organization invitations from IDP
 */

import { queryOptions } from "@tanstack/react-query";

import { isInvitationExpired } from "@/lib/validation/invitation";
import { listOrganizationInvitations } from "@/server/functions/organizations";

export interface OrganizationInvitationsVariables {
  organizationId: string;
}

/**
 * Query options for fetching pending organization invitations,
 * split into active (non-expired) and expired groups
 */
const organizationInvitationsOptions = ({
  organizationId,
}: OrganizationInvitationsVariables) =>
  queryOptions({
    queryKey: ["organizationInvitations", organizationId],
    queryFn: async () => {
      const invitations = await listOrganizationInvitations({
        data: { organizationId },
      });

      const pending = invitations.filter(
        (invitation) => invitation.status === "pending",
      );

      return {
        active: pending.filter((inv) => !isInvitationExpired(inv)),
        expired: pending.filter((inv) => isInvitationExpired(inv)),
      };
    },
    enabled: !!organizationId,
  });

export default organizationInvitationsOptions;
