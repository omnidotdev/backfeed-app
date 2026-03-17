import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import gatekeeperOrg from "@/lib/config/gatekeeper";
import { authMiddleware } from "@/server/middleware";

export type { GatekeeperOrganization as Organization } from "@omnidotdev/providers/auth";

const createOrganizationSchema = z.object({
  name: z.string().min(3, "Organization name must be at least 3 characters"),
  slug: z.string().optional(),
});

const getOrganizationBySlugSchema = z.object({
  slug: z.string().min(1),
});

/**
 * Create a new organization via Gatekeeper
 * @knipignore
 */
export const createOrganization = createServerFn({ method: "POST" })
  .inputValidator((data) => createOrganizationSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const accessToken = context.session.accessToken;

    if (!accessToken) {
      throw new Error("No access token available");
    }

    return gatekeeperOrg.createOrganization(data, accessToken);
  });

const inviteOrganizationMemberSchema = z.object({
  organizationId: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "member"]),
});

/**
 * Invite a member to an organization via Gatekeeper.
 * Runs server-side to avoid CORS issues with the IDP's Better Auth endpoint
 * @knipignore
 */
export const inviteOrganizationMember = createServerFn({ method: "POST" })
  .inputValidator((data) => inviteOrganizationMemberSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const accessToken = context.session.accessToken;

    if (!accessToken) {
      throw new Error("No access token available");
    }

    return gatekeeperOrg.inviteMember(data, accessToken);
  });

const resendOrganizationInvitationSchema = z.object({
  organizationId: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "member"]),
});

/**
 * Resend an invitation (active or expired).
 * Gatekeeper's `cancelPendingInvitationsOnReInvite` auto-cancels the old one
 * @knipignore
 */
export const resendOrganizationInvitation = createServerFn({ method: "POST" })
  .inputValidator((data) => resendOrganizationInvitationSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const accessToken = context.session.accessToken;

    if (!accessToken) {
      throw new Error("No access token available");
    }

    const membersResponse = await gatekeeperOrg.listMembers(
      data.organizationId,
      accessToken,
    );

    const isExistingMember = membersResponse.data.some(
      (m) => m.user.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (isExistingMember) {
      throw new Error("This email is already a member of the organization");
    }

    return gatekeeperOrg.inviteMember(data, accessToken);
  });

const listOrganizationInvitationsSchema = z.object({
  organizationId: z.string(),
});

/**
 * List invitations for an organization via Gatekeeper.
 * Runs server-side to avoid CORS issues with the IDP's Better Auth endpoint
 * @knipignore
 */
export const listOrganizationInvitations = createServerFn({ method: "GET" })
  .inputValidator((data) => listOrganizationInvitationsSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const accessToken = context.session.accessToken;

    if (!accessToken) {
      throw new Error("No access token available");
    }

    return gatekeeperOrg.listInvitations(data.organizationId, accessToken);
  });

const cancelOrganizationInvitationSchema = z.object({
  invitationId: z.string(),
});

/**
 * Cancel an organization invitation via Gatekeeper.
 * Runs server-side to avoid CORS issues with the IDP's Better Auth endpoint
 * @knipignore
 */
export const cancelOrganizationInvitation = createServerFn({ method: "POST" })
  .inputValidator((data) => cancelOrganizationInvitationSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const accessToken = context.session.accessToken;

    if (!accessToken) {
      throw new Error("No access token available");
    }

    return gatekeeperOrg.cancelInvitation(data.invitationId, accessToken);
  });

/**
 * Get an organization by slug.
 * Used when JWT claims are stale and don't include a newly created org
 * @knipignore
 */
export const getOrganizationBySlug = createServerFn({ method: "GET" })
  .inputValidator((data) => getOrganizationBySlugSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const accessToken = context.session.accessToken;

    if (!accessToken) {
      return null;
    }

    return gatekeeperOrg.getOrganizationBySlug(data.slug, accessToken);
  });

/**
 * Fetch an organization by slug without authentication.
 * Used for public board access when no JWT is available
 */
export const fetchOrganizationBySlug = createServerFn()
  .inputValidator((data) => getOrganizationBySlugSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      return await gatekeeperOrg.fetchOrganizationBySlug(data.slug);
    } catch (error) {
      console.error("Error fetching organization by slug:", error);
      return null;
    }
  });

const listOrganizationMembersSchema = z.object({
  organizationId: z.string(),
  accessToken: z.string(),
});

/**
 * List members for an organization via Gatekeeper
 * @knipignore
 */
export const listOrganizationMembers = createServerFn({ method: "GET" })
  .inputValidator((data) => listOrganizationMembersSchema.parse(data))
  .handler(async ({ data }) => {
    return gatekeeperOrg.listMembers(data.organizationId, data.accessToken);
  });

const updateOrganizationMemberRoleSchema = z.object({
  organizationId: z.string(),
  memberId: z.string(),
  role: z.enum(["owner", "admin", "member"]),
});

/**
 * Update a member's role via Gatekeeper
 * @knipignore
 */
export const updateOrganizationMemberRole = createServerFn({ method: "POST" })
  .inputValidator((data) => updateOrganizationMemberRoleSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const accessToken = context.session.accessToken;

    if (!accessToken) {
      throw new Error("No access token available");
    }

    return gatekeeperOrg.updateMemberRole(data, accessToken);
  });

const removeOrganizationMemberSchema = z.object({
  organizationId: z.string(),
  memberId: z.string(),
});

/**
 * Remove a member from an organization via Gatekeeper
 * @knipignore
 */
export const removeOrganizationMember = createServerFn({ method: "POST" })
  .inputValidator((data) => removeOrganizationMemberSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const accessToken = context.session.accessToken;

    if (!accessToken) {
      throw new Error("No access token available");
    }

    return gatekeeperOrg.removeMember(data, accessToken);
  });
