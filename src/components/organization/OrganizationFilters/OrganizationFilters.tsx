"use client";

import {
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  SegmentGroup,
} from "@omnidev/sigil";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { HiOutlineSlash } from "react-icons/hi2";
import { useIsClient, useToggle } from "usehooks-ts";

import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";

import type { OrganizationsFilter } from "lib/constants/searchParams";

interface OrganizationFilterOption {
  /** Label for the filter segment option. */
  label: string;
  /** Value for the filter segment option. */
  value: string;
}

const organizationFilterOptions: OrganizationFilterOption[] =
  app.organizationsPage.filters.organizationFilterOptions;

/**
 * Organization filters.
 */
const OrganizationFilters = () => {
  const [{ search, organizationsFilter }, setSearchParams] = useSearchParams(),
    [inputFocused, _, setInputFocus] = useToggle(),
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
    <Grid columns={1} w="full">
      <GridItem w={{ base: "full", sm: "fit-content" }}>
        <SegmentGroup
          defaultValue={organizationsFilter}
          options={organizationFilterOptions}
          onValueChange={({ value }) => {
            setSearchParams({
              organizationsFilter: value as OrganizationsFilter,
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
          onBlur={() => setInputFocus(false)}
          onFocus={() => setInputFocus(true)}
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
