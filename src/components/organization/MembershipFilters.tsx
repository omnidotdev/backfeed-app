import { createListCollection } from "@ark-ui/react";
import { Grid, GridItem, Input, Select } from "@omnidev/sigil";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { Role } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import useHandleSearch from "@/lib/hooks/useHandleSearch";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";

/**
 * Organization membership filters.
 */
const MembershipFilters = () => {
  const { search, roles } = useSearch({
    from: "/_auth/organizations/$organizationSlug/_layout/_manage/members",
  });
  const navigate = useNavigate({
    from: "/organizations/$organizationSlug/members",
  });

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
          defaultValue={roles}
          onValueChange={({ value }) =>
            navigate({
              search: (prev) => ({
                ...prev,
                roles: value as Role[],
              }),
            })
          }
        />
      </GridItem>
    </Grid>
  );
};

export default MembershipFilters;
