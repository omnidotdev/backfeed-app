"use client";

import { createListCollection } from "@ark-ui/react";
import {
  Button,
  Combobox,
  Dialog,
  HStack,
  Icon,
  useDisclosure,
} from "@omnidev/sigil";
import { LuCirclePlus } from "react-icons/lu";

import { Role, useMembersQuery } from "generated/graphql";

import type { ButtonProps } from "@omnidev/sigil";

interface Action extends ButtonProps {
  /** Action label. */
  label: string;
}

interface Props {
  /** Organization ID. */
  organizationId: string;
}

const AddOwner = ({ organizationId }: Props) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const actions: Action[] = [
    {
      label: "Add Owner",
      onClick: () => {
        // Add owner logic here
      },
    },
    {
      label: "Cancel",
      onClick: onClose,
      variant: "outline",
    },
  ];

  const { data: members } = useMembersQuery(
    {
      organizationId,
      excludeRoles: [Role.Owner],
    },
    {
      select: (data) =>
        data.members?.nodes?.map((member) => ({
          label: `${member?.user?.firstName} ${member?.user?.lastName}`,
          value: member?.userId,
        })),
    }
  );

  return (
    <Dialog
      title="Add Owner"
      description="Add a new owner to the organization."
      open={isOpen}
      onOpenChange={onToggle}
      trigger={
        <Button variant="outline">
          <Icon src={LuCirclePlus} w={4} h={4} />
          New Owner
        </Button>
      }
    >
      <Combobox
        label={{ id: "member", singular: "Member", plural: "Members" }}
        collection={createListCollection({ items: members ?? [] })}
        placeholder="Search for or select a member..."
      />

      <HStack>
        {actions.map(({ label, ...rest }) => (
          <Button key={label} flex={1} {...rest}>
            {label}
          </Button>
        ))}
      </HStack>
    </Dialog>
  );
};

export default AddOwner;
