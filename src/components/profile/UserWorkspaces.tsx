import { Stack, Text } from "@omnidev/sigil";
import { useRouteContext } from "@tanstack/react-router";
import { LuExternalLink, LuInfo } from "react-icons/lu";

import EmptyState from "@/components/layout/EmptyState";
import WorkspaceListItem from "@/components/workspace/WorkspaceListItem";
import app from "@/lib/config/app.config";
import { AUTH_BASE_URL } from "@/lib/config/env.config";

/**
 * User workspaces list for profile page.
 * Shows workspaces (organizations) the user has access to from JWT claims.
 */
const UserWorkspaces = () => {
  const { session } = useRouteContext({ from: "__root__" });

  // Organizations come from JWT claims, not a database query
  const organizations = session?.organizations ?? [];

  if (!organizations.length) {
    return (
      <EmptyState
        message={app.profileWorkspacesPage.table.emptyState.label}
        minH={48}
      />
    );
  }

  return (
    <Stack gap={4} w="100%">
      {organizations.map((org) => (
        <WorkspaceListItem
          key={org.id}
          workspace={{
            rowId: org.id,
            name: org.name,
            slug: org.slug,
            updatedAt: new Date().toISOString(),
          }}
        />
      ))}

      {/* TODO: Implement in-app organization creation once Gatekeeper API supports it */}
      <Stack
        gap={4}
        align="center"
        p={8}
        borderRadius="lg"
        borderWidth={1}
        borderStyle="dashed"
        borderColor="gray.300"
        bg="gray.50"
        textAlign="center"
        _dark={{
          borderColor: "gray.600",
          bg: "gray.800",
        }}
      >
        <LuInfo size={24} color="var(--chakra-colors-gray-500)" />
        <Stack gap={2}>
          <Text fontSize="sm" color="gray.700" _dark={{ color: "gray.300" }}>
            Workspaces are currently managed via Omni Organizations.
          </Text>
          <Text fontSize="xs" color="gray.500">
            This experience will be improved soon.
          </Text>
        </Stack>
        <a
          href={AUTH_BASE_URL}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            color: "var(--chakra-colors-blue-500)",
          }}
        >
          Manage Organizations
          <LuExternalLink size={12} />
        </a>
      </Stack>
    </Stack>
  );
};

export default UserWorkspaces;
