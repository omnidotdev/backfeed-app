import { Button, Dialog, HStack, Icon, useDisclosure } from "@omnidev/sigil";

import { app } from "lib/config";

import type { ButtonProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface ManageOrganizationAction extends ButtonProps {
  /** Action label. */
  label: string;
}

export interface Props {
  /** Dialog title. */
  title: string;
  /** Dialog description. */
  description: string;
  /** Primary dialog action. */
  action: ManageOrganizationAction;
  /** Icon used for the dialog trigger. */
  icon: IconType;
  /** Props to pass to the dialog trigger. */
  triggerProps?: ButtonProps;
}

/**
 * Organization management dialog.
 */
const ManageOrganization = ({
  title,
  description,
  action,
  icon,
  triggerProps,
}: Props) => {
  const {
    isOpen: isManageOrganizationOpen,
    onClose: onCloseManageOrganization,
    onToggle: onToggleManageOrganization,
  } = useDisclosure();

  const manageOrganizationActions: ManageOrganizationAction[] = [
    {
      ...action,
      onClick: (e) => {
        action.onClick?.(e);
        onCloseManageOrganization();
      },
    },
    {
      label: app.organizationsPage.dialogs.cancel.label,
      onClick: onCloseManageOrganization,
      variant: "outline",
    },
  ];

  return (
    // @ts-ignore TODO: figure out why this is throwing an error
    <Dialog
      title={title}
      description={description}
      open={isManageOrganizationOpen}
      onOpenChange={onToggleManageOrganization}
      trigger={
        <Button variant="ghost" p={1} bgColor="transparent" {...triggerProps}>
          <Icon src={icon} w={5} h={5} />
        </Button>
      }
    >
      <HStack>
        {manageOrganizationActions.map(({ label, ...rest }) => (
          <Button key={label} flex={1} {...rest}>
            {label}
          </Button>
        ))}
      </HStack>
    </Dialog>
  );
};

export default ManageOrganization;
