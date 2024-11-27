"use client";

import { Stack } from "@omnidev/sigil";
import Link from "next/link";

import { SkeletonArray } from "components/core";
import { ErrorBoundary } from "components/layout";
import { OrganizationListItem } from "components/organization";
import { useDebounceValue, useSearchParams } from "lib/hooks";

import type { StackProps } from "@omnidev/sigil";
import type { Organization } from "components/organization";

interface Props extends StackProps {
  /** Organizations to display. */
  organizations: Organization[];
  /** Whether the data is loading. */
  isLoading?: boolean;
  /** Whether an error was encountered while loading the data. */
  isError?: boolean;
}

/**
 * Organization list.
 */
const OrganizationList = ({
  organizations,
  isLoading = true,
  isError = false,
  ...rest
}: Props) => {
  const [{ search }] = useSearchParams();

  const [debouncedSearch] = useDebounceValue({ value: search });

  if (isError)
    return <ErrorBoundary message="Error fetching organizations" minH={48} />;

  if (isLoading)
    return (
      <Stack>
        <SkeletonArray count={6} h={36} borderRadius="sm" />
      </Stack>
    );

  return (
    <Stack {...rest}>
      {/* TODO: update logic handler / filters once data fetching is implemented */}
      {organizations
        .filter((organization) =>
          organization.name.toLowerCase().includes(debouncedSearch)
        )
        .map((organization) => (
          <Link
            key={organization.id}
            href={`/organizations/${organization.id}`}
          >
            <OrganizationListItem {...organization} />
          </Link>
        ))}
    </Stack>
  );
};

export default OrganizationList;
