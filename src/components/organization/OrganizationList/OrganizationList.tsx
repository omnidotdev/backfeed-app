"use client";

import { Pagination, Stack } from "@omnidev/sigil";
import { keepPreviousData } from "@tanstack/react-query";
import { LuCirclePlus } from "react-icons/lu";

import { SkeletonArray } from "components/core";
import { EmptyState, ErrorBoundary } from "components/layout";
import { OrganizationListItem } from "components/organization";
import { OrganizationOrderBy, useOrganizationsQuery } from "generated/graphql";
import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

import type { StackProps } from "@omnidev/sigil";
import type { Organization } from "generated/graphql";

/**
 * Organization list.
 */
const OrganizationList = ({ ...props }: StackProps) => {
  const [{ page, pageSize, search }, setSearchParams] = useSearchParams();

  const { setIsOpen: setIsCreateOrganizationDialogOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const { data, isLoading, isError } = useOrganizationsQuery(
    {
      pageSize,
      offset: (page - 1) * pageSize,
      orderBy: [OrganizationOrderBy.MembersCountDesc],
      search,
      isMember: false,
    },
    {
      placeholderData: keepPreviousData,
      select: (data) => ({
        totalCount: data?.organizations?.totalCount,
        organizations: data?.organizations?.nodes,
      }),
    }
  );

  const organizations = data?.organizations;

  if (isError)
    return <ErrorBoundary message="Error fetching organizations" minH={48} />;

  if (isLoading)
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
        siblingCount={0}
        // @ts-ignore: TODO: fix prop definition upstream (omit `index`)
        ellipsisProps={{
          display: { base: "none", sm: "flex" },
        }}
        // @ts-ignore: TODO: fix prop definition upstream (omit `type` and `value`)
        itemProps={{
          display: { base: "none", sm: "flex" },
        }}
        count={data?.totalCount ?? 0}
        pageSize={pageSize}
        defaultPage={page}
        onPageChange={({ page }) => setSearchParams({ page })}
        mt={4}
      />
    </Stack>
  );
};

export default OrganizationList;
