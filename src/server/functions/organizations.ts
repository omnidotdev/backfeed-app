import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { ORG_SYNC_SERVICE_TOKEN } from "@/lib/config/env.config";
import gatekeeperOrg from "@/lib/config/gatekeeper";
import { toPrivilegedMemberRoles } from "@/lib/util/orgRoles";
import { authMiddleware } from "@/server/middleware";

import type { MemberRole } from "@/lib/util/orgRoles";

// Workspace creation and handle-availability checks are funneled to the account
// hub (account.omni.dev/workspaces), the single ecosystem surface that owns
// them, so this app no longer exposes its own create/check server functions.
// Only the read paths below remain, used to resolve a workspace by slug and to
// list members.

const getOrganizationBySlugSchema = z.object({
  slug: z.string().min(1),
});

/**
 * Get an organization by slug.
 * Used when JWT claims are stale and don't include a newly created org
 */
export const getOrganizationBySlug = createServerFn({ method: "POST" })
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
export const fetchOrganizationBySlug = createServerFn({ method: "POST" })
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
export const listOrganizationMembers = createServerFn({ method: "POST" })
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

/**
 * List the privileged (owner/admin) member roles for an organization, without
 * authentication.
 *
 * Powers the public feedback board's author role badges: a signed-out visitor
 * (or a signed-in non-member) still sees an "Owner"/"Admin" chip beside staff
 * replies, matching how public issue trackers flag maintainers. Only a minimal
 * `{ userId, role }` projection is returned, filtered to owner/admin, so no
 * member PII (names, emails) and no ordinary-reporter membership is exposed. The
 * service token stays server-side (never reaches the browser), and this mirrors
 * the existing unauthenticated `fetchOrganizationBySlug` public-board read.
 */
export const fetchOrganizationMemberRoles = createServerFn({ method: "POST" })
  .inputValidator((data) => listOrganizationMembersSchema.parse(data))
  .handler(async ({ data }): Promise<{ data: MemberRole[] }> => {
    if (!ORG_SYNC_SERVICE_TOKEN) {
      console.warn(
        "ORG_SYNC_SERVICE_TOKEN not set, author role badges disabled",
      );
      return { data: [] };
    }

    try {
      const { data: members } = await gatekeeperOrg.listMembersViaService(
        data.organizationId,
        ORG_SYNC_SERVICE_TOKEN,
      );

      return { data: toPrivilegedMemberRoles(members) };
    } catch (error) {
      console.error("Error fetching organization member roles:", error);
      return { data: [] };
    }
  });
