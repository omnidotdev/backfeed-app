import { HStack, Icon, Stack, Text, css } from "@omnidev/sigil";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuExternalLink, LuInfo, LuLayers } from "react-icons/lu";

import OverflowText from "@/components/core/OverflowText";
import { AUTH_BASE_URL, BASE_URL } from "@/lib/config/env.config";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";
import createMetaTags from "@/lib/util/createMetaTags";
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";
import { useOrganization } from "@/providers/OrganizationProvider";
import {
  getLastWorkspaceCookie,
  setLastWorkspaceCookie,
} from "@/server/functions/lastWorkspace";

import type { OrganizationClaim } from "@/lib/auth/getAuth";

export const Route = createFileRoute("/_auth/workspaces/")({
  beforeLoad: async ({ context: { session } }) => {
    const organizations = session?.organizations ?? [];
    if (!organizations.length) return;

    const lastSlug = await getLastWorkspaceCookie();
    if (lastSlug && organizations.some((org) => org.slug === lastSlug)) {
      throw redirect({
        to: "/workspaces/$workspaceSlug",
        params: { workspaceSlug: lastSlug },
      });
    }
  },
  head: () => ({
    meta: [
      ...createMetaTags({
        title: "Workspaces",
        description:
          "Create a new workspace, or select a current one to view details.",
        url: `${BASE_URL}/workspaces`,
      }),
    ],
  }),
  component: WorkspacesPage,
});

function WorkspacesPage() {
  const orgContext = useOrganization();
  const organizations = orgContext?.organizations ?? [];

  return (
    <Stack h="full" w="full" maxW="4xl" mx="auto" px={4} py={12} gap={8}>
      <Stack align="center" gap={4}>
        <Icon src={LuLayers} w={12} h={12} color="foreground.muted" />
        <Text
          as="h1"
          fontSize="2xl"
          fontWeight="semibold"
          textAlign="center"
          color="foreground.default"
        >
          {organizations.length
            ? "Select a workspace"
            : "Create a workspace to get started"}
        </Text>
      </Stack>

      {!!organizations.length && (
        <Stack
          gap={4}
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
          }}
        >
          {organizations.map((org) => (
            <WorkspaceCard key={org.id} organization={org} />
          ))}
        </Stack>
      )}

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
}

function WorkspaceCard({ organization }: { organization: OrganizationClaim }) {
  const { queryClient } = Route.useRouteContext();

  const metricsData = queryClient.getQueryData(
    workspaceMetricsOptions({ organizationId: organization.id }).queryKey,
  );
  const projectCount =
    (metricsData as { projects?: { totalCount?: number } })?.projects
      ?.totalCount ?? 0;

  return (
    <Link
      to="/workspaces/$workspaceSlug"
      params={{ workspaceSlug: organization.slug! }}
      onClick={() => setLastWorkspaceCookie({ data: organization.slug! })}
      preload="intent"
    >
      <Stack
        p={4}
        bgColor="card-item"
        borderRadius="xl"
        borderWidth="1px"
        borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
        w="full"
        h={32}
        justify="space-between"
        cursor="pointer"
        className={css({
          transition: "all 0.2s ease",
          _hover: {
            bgColor: { base: "neutral.100", _dark: "neutral.800" },
          },
        })}
      >
        <Stack gap={1}>
          <OverflowText
            fontWeight="semibold"
            whiteSpace="nowrap"
            color="brand.primary.700"
            _dark={{ color: "brand.primary.400" }}
          >
            {organization.name}
          </OverflowText>
        </Stack>

        <HStack gap={1}>
          <Icon src={HiOutlineFolder} w={5} h={5} color="foreground.subtle" />
          <Text
            fontSize="sm"
            color="foreground.subtle"
            fontVariant="tabular-nums"
          >
            {projectCount}{" "}
            {setSingularOrPlural({ value: projectCount, label: "project" })}
          </Text>
        </HStack>
      </Stack>
    </Link>
  );
}
