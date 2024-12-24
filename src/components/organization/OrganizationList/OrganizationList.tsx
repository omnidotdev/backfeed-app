"use client";

import { Stack } from "@omnidev/sigil";

import { SkeletonArray } from "components/core";
import { ErrorBoundary } from "components/layout";
import { OrganizationListItem } from "components/organization";
import { OrganizationOrderBy, useOrganizationsQuery } from "generated/graphql";
import { useDebounceValue, useSearchParams } from "lib/hooks";

import type { StackProps } from "@omnidev/sigil";
import type { Organization } from "generated/graphql";

/**
 * Organization list.
 * TODO: apply either infinite scroll or pagination for the list once data fetching is implemented.
 */
const OrganizationList = ({ ...props }: StackProps) => {
  const [{ search }] = useSearchParams();

  const [debouncedSearch] = useDebounceValue({ value: search });

  const {
    data: organizations,
    isLoading,
    isError,
  } = useOrganizationsQuery(
    {
      orderBy: [OrganizationOrderBy.UserOrganizationsCountDesc],
    },
    {
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
      {/* TODO: update logic handler / filters once data fetching is implemented */}
      {organizations
        ?.filter((organization) =>
          organization?.name?.toLowerCase().includes(debouncedSearch)
        )
        .map((organization, index) => (
          // TODO: remove index once data fetching is implemented
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
