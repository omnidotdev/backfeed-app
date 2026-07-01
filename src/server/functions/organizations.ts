import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { ORG_SYNC_SERVICE_TOKEN } from "@/lib/config/env.config";
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

const resendOrganizationInvitationSchema = z.object({
  organizationId: z.string(),
  email: z.email(),
  role: z.enum(["admin", "member"]),
});

/**
 * Resend an invitation (active or expired).
 * Gatekeeper's `cancelPendingInvitationsOnReInvite` auto-cancels the old one.
 * Membership validation is handled by Gatekeeper
 */
export const resendOrganizationInvitation = createServerFn({ method: "POST" })
  .inputValidator((data) => resendOrganizationInvitationSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const accessToken = context.session.accessToken;

    if (!accessToken) {
      throw new Error("No access token available");
    }

    return gatekeeperOrg.inviteMember(data, accessToken);
  });

const listOrganizationInvitationsSchema = z.object({
  organizationId: z.string(),
});

/**
 * List invitations for an organization via Gatekeeper.
 * Runs server-side to avoid CORS issues with the IDP's Better Auth endpoint
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
});

/**
 * List members for an organization via Gatekeeper.
 *
 * Gatekeeper's members endpoint is a server-to-server read gated on
 * `ORG_SYNC_SERVICE_TOKEN`, so the call runs on the server where the secret
 * lives, never in the browser. Authorization is enforced here: the authenticated
 * session must itself be a member of the requested org, so the service token
 * cannot be used to enumerate arbitrary orgs' members. (The user-context Better
 * Auth path is unusable because Gatekeeper's opaque-token->session bridge does
 * not resolve the current hashed access tokens.)
 */
export const listOrganizationMembers = createServerFn({ method: "GET" })
  .inputValidator((data) => listOrganizationMembersSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const isMember = context.session.organizations?.some(
      (org) => org.id === data.organizationId,
    );
    if (!isMember) {
      throw new Error("Forbidden: not a member of this organization");
    }

    if (!ORG_SYNC_SERVICE_TOKEN) {
      throw new Error("ORG_SYNC_SERVICE_TOKEN not configured");
    }

    return gatekeeperOrg.listMembersViaService(
      data.organizationId,
      ORG_SYNC_SERVICE_TOKEN,
    );
  });

const updateOrganizationMemberRoleSchema = z.object({
  organizationId: z.string(),
  memberId: z.string(),
  role: z.enum(["owner", "admin", "member"]),
});

/**
 * Update a member's role via Gatekeeper
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
