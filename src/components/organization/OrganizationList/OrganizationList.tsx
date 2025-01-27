"use client";

import { Pagination, Stack } from "@omnidev/sigil";
import { keepPreviousData } from "@tanstack/react-query";
import { LuCirclePlus } from "react-icons/lu";

import { SkeletonArray } from "components/core";
import { EmptyState, ErrorBoundary } from "components/layout";
import { OrganizationListItem } from "components/organization";
import {
  OrganizationOrderBy,
  UserOrganizationOrderBy,
  useOrganizationsQuery,
  useUserOrganizationsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth, useDebounceValue, useSearchParams } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

import type { StackProps } from "@omnidev/sigil";
import type { Organization } from "generated/graphql";

/**
 * Organization list.
 */
const OrganizationList = ({ ...props }: StackProps) => {
  const [{ page, pageSize, search, userOrganizations }, setSearchParams] =
    useSearchParams();

  const [debouncedSearch] = useDebounceValue({ value: search });

  const { user, isLoading: isAuthLoading } = useAuth();

  const { setIsOpen: setIsCreateOrganizationDialogOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const sharedVariables = {
    pageSize,
    offset: (page - 1) * pageSize,
    search: debouncedSearch,
  };

  const {
    data: allOrganizations,
    isLoading: isAllOrganizationsLoading,
    isError: isAllOrganizationsError,
  } = useOrganizationsQuery(
    {
      ...sharedVariables,
      orderBy: [OrganizationOrderBy.UserOrganizationsCountDesc],
    },
    {
      enabled: !!user?.rowId,
      placeholderData: keepPreviousData,
      select: (data) => ({
        totalCount: data?.organizations?.totalCount,
        organizations: data?.organizations?.nodes,
      }),
    }
  );

  const {
    data: allUserOrganizations,
    isLoading: isUserOrganizationsLoading,
    isError: isUserOrganizationsError,
  } = useUserOrganizationsQuery(
    {
      ...sharedVariables,
      orderBy: [UserOrganizationOrderBy.OrganizationIdAsc],
      userId: user?.rowId!,
    },
    {
      enabled: !!user?.rowId,
      placeholderData: keepPreviousData,
      select: (data) => ({
        totalCount: data?.userOrganizations?.totalCount,
        organizations: data?.userOrganizations?.nodes.flatMap(
          (node) => node?.organization
        ),
      }),
    }
  );

  const organizations = userOrganizations
    ? allUserOrganizations?.organizations
    : allOrganizations?.organizations;

  const totalCount = userOrganizations
    ? allUserOrganizations?.totalCount
    : allOrganizations?.totalCount;

  if (isAuthLoading) return null;

  if (isAllOrganizationsError || isUserOrganizationsError)
    return <ErrorBoundary message="Error fetching organizations" minH={48} />;

  if (isAllOrganizationsLoading || isUserOrganizationsLoading)
    return (
      <Stack>
        <SkeletonArray count={6} h={36} borderRadius="sm" />
      </Stack>
    );

  if (!organizations?.length)
    return (
      <EmptyState
        message={app.organizationsPage.emptyState.message}
        action={{
          label: app.organizationsPage.emptyState.cta.label,
          icon: LuCirclePlus,
          actionProps: {
            variant: "outline",
            color: "brand.primary",
            borderColor: "brand.primary",
            onClick: () => setIsCreateOrganizationDialogOpen(true),
          },
        }}
        minH={64}
      />
    );

  return (
    <Stack align="center" justify="space-between" h="100%" {...props}>
      <Stack w="100%">
        {organizations.map((organization) => (
          <OrganizationListItem
            key={organization?.rowId}
            organization={organization as Partial<Organization>}
          />
        ))}
      </Stack>

      <Pagination
        count={totalCount ?? 0}
        pageSize={pageSize}
        defaultPage={page}
        onPageChange={({ page }) => setSearchParams({ page })}
        mt={4}
      />
    </Stack>
  );
};

export default OrganizationList;
