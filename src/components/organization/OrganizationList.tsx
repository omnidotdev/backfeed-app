import { Pagination, Stack } from "@omnidev/sigil";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { LuCirclePlus } from "react-icons/lu";

import SkeletonArray from "@/components/core/SkeletonArray";
import EmptyState from "@/components/layout/EmptyState";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import OrganizationListItem from "@/components/organization/OrganizationListItem";
import { OrganizationOrderBy } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { organizationsOptions } from "@/lib/options/organizations";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { StackProps } from "@omnidev/sigil";
import type { Organization } from "@/generated/graphql";

/**
 * Organization list.
 */
const OrganizationList = (props: StackProps) => {
  const { page, pageSize, search } = useSearch({
    from: "/_auth/organizations/",
  });
  const navigate = useNavigate({ from: "/organizations" });

  const { setIsOpen: setIsCreateOrganizationDialogOpen } = useDialogStore({
    type: DialogType.CreateOrganization,
  });

  const { data, isLoading, isError } = useQuery({
    ...organizationsOptions({
      pageSize,
      offset: (page - 1) * pageSize,
      orderBy: [OrganizationOrderBy.MembersCountDesc],
      search,
      isMember: false,
    }),
    placeholderData: keepPreviousData,
    select: (data) => ({
      totalCount: data?.organizations?.totalCount,
      organizations: data?.organizations?.nodes,
    }),
  });

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
          onClick: () => setIsCreateOrganizationDialogOpen(true),
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
        ellipsisProps={{
          display: { base: "none", sm: "flex" },
        }}
        itemProps={{
          display: { base: "none", sm: "flex" },
        }}
        count={data?.totalCount ?? 0}
        pageSize={pageSize}
        defaultPage={page}
        onPageChange={({ page }) =>
          navigate({
            search: (prev) => ({
              ...prev,
              page,
            }),
          })
        }
        mt={4}
      />
    </Stack>
  );
};

export default OrganizationList;
