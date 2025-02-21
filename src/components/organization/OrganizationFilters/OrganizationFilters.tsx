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
import { useHandleSearch, useSearchParams } from "lib/hooks";

/**
 * Organization filters.
 */
const OrganizationFilters = () => {
  const [{ search }] = useSearchParams();

  const onSearchChange = useHandleSearch();

  return (
    <Grid columns={1} gap={4} w="full">
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
          onChange={onSearchChange}
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
