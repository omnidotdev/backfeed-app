"use client";

import {
  Button,
  Dialog,
  HStack,
  Input,
  Label,
  Select,
  Stack,
  Text,
  Textarea,
  createListCollection,
} from "@omnidev/sigil";
import { useOrganizationsQuery } from "generated/graphql";

import { app } from "lib/config";
import { useAuth } from "lib/hooks";

interface Props {
  /** State to determine if the dialog is open. */
  isOpen: boolean;
  /** Callback to manage the open state of the dialog. */
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Dialog for creating a new project.
 */
const NewProject = ({ isOpen, setIsOpen }: Props) => {
  const { user } = useAuth();

  const { data: organizations } = useOrganizationsQuery(
    {
      userId: user?.id!,
    },
    {
      enabled: !!user,
      select: (data) =>
        data?.organizations?.nodes?.map((organization) => ({
          label: organization?.name,
          value: organization?.rowId,
        })),
    }
  );

  return (
    <Dialog
      title={app.dashboardPage.cta.newProject.label}
      description={app.dashboardPage.cta.newProject.description}
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <Select
        label={app.dashboardPage.cta.newProject.selectOrganization.label}
        collection={createListCollection({ items: organizations ?? [] })}
        displayGroupLabel={false}
        valueTextProps={{
          placeholder: "Select an organization",
        }}
        triggerProps={{
          borderColor: "border.subtle",
        }}
      />

      <Stack>
        <Label htmlFor={app.dashboardPage.cta.newProject.projectName.id}>
          {app.dashboardPage.cta.newProject.projectName.id}
        </Label>

        <Input
          id={app.dashboardPage.cta.newProject.projectName.id}
          placeholder={app.dashboardPage.cta.newProject.projectName.placeholder}
        />
      </Stack>

      <Stack>
        <Label htmlFor={app.dashboardPage.cta.newProject.projectDescription.id}>
          {app.dashboardPage.cta.newProject.projectDescription.id}
        </Label>

        <Textarea
          id={app.dashboardPage.cta.newProject.projectDescription.id}
          placeholder={
            app.dashboardPage.cta.newProject.projectDescription.placeholder
          }
        />
      </Stack>

      <Stack>
        <Label htmlFor={app.dashboardPage.cta.newProject.projectSlug.id}>
          {app.dashboardPage.cta.newProject.projectSlug.id}
        </Label>

        <HStack>
          <Text
            whiteSpace="nowrap"
            fontSize="lg"
          >{`.../${app.projectsPage.breadcrumb.toLowerCase()}/`}</Text>

          <Input
            id={app.dashboardPage.cta.newProject.projectSlug.id}
            placeholder={
              app.dashboardPage.cta.newProject.projectSlug.placeholder
            }
          />
        </HStack>
      </Stack>

      <Button>{app.dashboardPage.cta.newProject.action}</Button>
    </Dialog>
  );
};

export default NewProject;
