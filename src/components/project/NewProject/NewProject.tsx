"use client";

import { Dialog, Select, createListCollection } from "@omnidev/sigil";
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
    </Dialog>
  );
};

export default NewProject;
