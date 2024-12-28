"use client";

import { Stack } from "@omnidev/sigil";
import { keepPreviousData } from "@tanstack/react-query";

import { SkeletonArray } from "components/core";
import { ErrorBoundary } from "components/layout";
import { OrganizationListItem } from "components/organization";
import { OrganizationOrderBy, useOrganizationsQuery } from "generated/graphql";
import { useAuth, useDebounceValue, useSearchParams } from "lib/hooks";

import type { StackProps } from "@omnidev/sigil";
import type { Organization } from "generated/graphql";

/**
 * Organization list.
 * TODO: apply either infinite scroll or pagination for the list once data fetching is implemented.
 */
const OrganizationList = ({ ...props }: StackProps) => {
  const [{ search }] = useSearchParams();

  const [debouncedSearch] = useDebounceValue({ value: search });

  const { user } = useAuth();

  const {
    data: organizations,
    isLoading,
    isError,
  } = useOrganizationsQuery(
    {
      orderBy: [OrganizationOrderBy.UserOrganizationsCountDesc],
      userId: user?.id!,
      search: debouncedSearch,
    },
    {
      enabled: !!user,
      placeholderData: keepPreviousData,
      select: (data) => data?.organizations?.nodes,
    }
  );

  if (isError)
    return <ErrorBoundary message="Error fetching organizations" minH={48} />;

  if (isLoading)
    return (
      <Stack>
        <SkeletonArray count={6} h={36} borderRadius="sm" />
      </Stack>
    );

  return (
    <Stack {...props}>
      {organizations?.map((organization, index) => (
        // TODO: remove index once ownership check is implemented
        <OrganizationListItem
          key={organization?.rowId}
          organization={organization as Partial<Organization>}
          index={index}
        />
      ))}
    </Stack>
  );
};

export default OrganizationList;
