"use client";

import { Grid, GridItem, Input, SegmentGroup } from "@omnidev/sigil";
import { useRef } from "react";

import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";

interface SegmentOption {
  /** Label for the segment option. */
  label: string;
  /** Value for the segment option. */
  value: string;
  /** Whether the segment option is disabled. */
  isDisabled?: boolean;
}

const segmentOptions: SegmentOption[] = [
  {
    label: app.organizationsPage.filters.segmentGroup.all.label,
    value: app.organizationsPage.filters.segmentGroup.all.value,
  },
  {
    label: app.organizationsPage.filters.segmentGroup.yours.label,
    value: app.organizationsPage.filters.segmentGroup.yours.value,
  },
];

/**
 * Organization filters.
 */
const OrganizationFilters = () => {
  const [{ search }, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Grid columns={1} w="full" gap={4}>
      <GridItem w={{ base: "full", sm: "fit-content" }}>
        <SegmentGroup
          defaultValue={segmentOptions[0].value}
          options={segmentOptions}
          onValueChange={({ value }) => {
            setSearchParams({
              userOrganizations: value === segmentOptions[1].value,
            });
            // NB: focus the search input when switching segment.
            inputRef.current?.focus();
          }}
          orientation="horizontal"
          // @ts-ignore: TODO: Check sigil for possible issue.
          itemProps={{
            px: 8,
            justifyContent: "center",
          }}
          // NB: add a gap and display to allow the entire width of segment group to be clickable.
          gap={0}
          display="flex"
        />
      </GridItem>

      <GridItem colSpan={1}>
        <Input
          ref={inputRef}
          borderColor="border.subtle"
          placeholder={app.organizationsPage.filters.search.placeholder}
          defaultValue={search}
          onChange={(e) =>
            setSearchParams({
              search: e.target.value.length ? e.target.value.toLowerCase() : "",
            })
          }
        />
      </GridItem>
    </Grid>
  );
};

export default OrganizationFilters;
