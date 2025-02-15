"use client";

import { createListCollection } from "@ark-ui/react";
import { Grid, GridItem, Input, Select } from "@omnidev/sigil";

import { Role } from "generated/graphql";
import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";
import { capitalizeFirstLetter } from "lib/util";

/**
 * Organization membership filters.
 */
const MembershipFilters = () => {
  const [{ search, role }, setSearchParams] = useSearchParams();

  return (
    <Grid columns={{ base: 1, lg: 5 }} w="full">
      <GridItem colSpan={{ base: 1, lg: 4 }}>
        <Input
          borderColor="border.subtle"
          placeholder={app.organizationMembersPage.filters.search.placeholder}
          defaultValue={search}
          onChange={(e) =>
            setSearchParams({
              search: e.target.value.length ? e.target.value.toLowerCase() : "",
            })
          }
        />
      </GridItem>

      <GridItem colSpan={1}>
        <Select
          label={app.projectsPage.filters.select.status.label}
          collection={createListCollection({
            items: Object.values(Role).map((role) => ({
              label: capitalizeFirstLetter(role),
              value: role,
            })),
          })}
          displayFieldLabel={false}
          displayGroupLabel={false}
          valueTextProps={{
            placeholder: app.organizationMembersPage.filters.role.placeholder,
          }}
          triggerProps={{
            borderColor: "border.subtle",
          }}
          defaultValue={role ? [role] : []}
          onValueChange={({ value }) =>
            setSearchParams({ role: value.length ? (value[0] as Role) : null })
          }
        />
      </GridItem>
    </Grid>
  );
};

export default MembershipFilters;
