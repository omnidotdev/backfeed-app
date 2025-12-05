"use client";

import { createListCollection } from "@ark-ui/react";
import { Grid, GridItem, Input, Select } from "@omnidev/sigil";

import { Role } from "../../../generated/graphql";
import { app } from "../../../lib/config";
import { useHandleSearch, useSearchParams } from "../../../lib/hooks";
import { capitalizeFirstLetter } from "../../../lib/util";

/**
 * Organization membership filters.
 */
const MembershipFilters = () => {
  const [{ search, roles }, setSearchParams] = useSearchParams();

  const onSearchChange = useHandleSearch();

  return (
    <Grid columns={{ base: 1, lg: 5 }} w="full">
      <GridItem colSpan={{ base: 1, lg: 4 }}>
        <Input
          borderColor="border.subtle"
          placeholder={app.organizationMembersPage.filters.search.placeholder}
          defaultValue={search}
          onChange={onSearchChange}
        />
      </GridItem>

      <GridItem colSpan={1}>
        <Select
          label={app.projectsPage.filters.select.status.label}
          collection={createListCollection({
            items: Object.values(Role)
              .filter((role) => role !== Role.Owner)
              .map((role) => ({
                label: capitalizeFirstLetter(role),
                value: role,
              })),
          })}
          multiple
          displayFieldLabel={false}
          displayGroupLabel={false}
          valueTextProps={{
            placeholder: app.organizationMembersPage.filters.role.placeholder,
          }}
          triggerProps={{
            borderColor: "border.subtle",
          }}
          defaultValue={roles ? roles : []}
          onValueChange={({ value }) =>
            setSearchParams({ roles: value.length ? (value as Role[]) : null })
          }
        />
      </GridItem>
    </Grid>
  );
};

export default MembershipFilters;
