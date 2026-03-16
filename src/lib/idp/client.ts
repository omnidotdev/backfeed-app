import gatekeeperOrg from "@/lib/config/gatekeeper";

import type { GatekeeperMember } from "@omnidotdev/providers/auth";

// Backwards-compatible type aliases
export type IdpMember = GatekeeperMember;
export type IdpMembersResponse = { data: IdpMember[] };

export type UpdateMemberRoleParams = {
  organizationId: string;
  memberId: string;
  role: "owner" | "admin" | "member";
  accessToken: string;
};

export type RemoveMemberParams = {
  organizationId: string;
  memberId: string;
  accessToken: string;
};

export async function fetchOrganizationMembers(
  organizationId: string,
  accessToken: string,
): Promise<IdpMembersResponse> {
  return gatekeeperOrg.listMembers(organizationId, accessToken);
}

export async function updateMemberRole({
  organizationId,
  memberId,
  role,
  accessToken,
}: UpdateMemberRoleParams): Promise<IdpMember> {
  return gatekeeperOrg.updateMemberRole(
    { organizationId, memberId, role },
    accessToken,
  );
}

export async function removeMember({
  organizationId,
  memberId,
  accessToken,
}: RemoveMemberParams): Promise<void> {
  return gatekeeperOrg.removeMember({ organizationId, memberId }, accessToken);
}
