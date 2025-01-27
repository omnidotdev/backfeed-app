"use client";

import {
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  SegmentGroup,
} from "@omnidev/sigil";
import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useIsClient, useToggle } from "usehooks-ts";

import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";
import { HiOutlineSlash } from "react-icons/hi2";

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
  const [{ search }, setSearchParams] = useSearchParams(),
    [inputFocused, toggleInputFocus] = useToggle(),
    isClient = useIsClient();

  const inputRef = useRef<HTMLInputElement>(null);

  useHotkeys(
    "/",
    () => inputRef.current?.focus(),
    {
      enabled: isClient,
      preventDefault: true,
    },
    [isClient]
  );

  return (
    <Grid columns={1} w="full" gap={4}>
      <GridItem w={{ base: "full", sm: "fit-content" }}>
        <SegmentGroup
          defaultValue={app.organizationsPage.filters.segmentGroup.all.value}
          options={segmentOptions}
          onValueChange={({ value }) => {
            setSearchParams({
              userOrganizations:
                value ===
                app.organizationsPage.filters.segmentGroup.yours.value,
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

      <GridItem colSpan={1} pos="relative">
        <Input
          ref={inputRef}
          borderColor="border.subtle"
          placeholder={app.organizationsPage.filters.search.placeholder}
          defaultValue={search}
          onBlur={toggleInputFocus}
          onFocus={toggleInputFocus}
          onChange={(e) =>
            setSearchParams({
              search: e.target.value.length ? e.target.value.toLowerCase() : "",
            })
          }
        />

        {!inputFocused && (
          <Flex
            pos="absolute"
            right={4}
            top="50%"
            transform="translateY(-50%)"
            align="center"
            justify="center"
            bgColor="background.muted"
            w={6}
            h={6}
            borderRadius="sm"
            boxShadow="sm"
          >
            <Icon src={HiOutlineSlash} color="foreground.subtle" />
          </Flex>
        )}
      </GridItem>
    </Grid>
  );
};

export default OrganizationFilters;
