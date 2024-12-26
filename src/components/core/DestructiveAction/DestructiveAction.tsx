import { Button, Dialog, HStack, Icon, useDisclosure } from "@omnidev/sigil";
import { HiOutlineTrash } from "react-icons/hi2";

import { app } from "lib/config";

import type { ButtonProps, DialogProps } from "@omnidev/sigil";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";

interface Action extends ButtonProps {
  /** Action label. */
  label: string;
}

export interface Props extends DialogProps {
  /** Dialog title. */
  title: string;
  /** Dialog description. */
  description: string;
  /** Primary dialog action. */
  action: Action;
  /** Icon used for the default dialog trigger. */
  icon?: IconType;
  /** Children to render in the dialog content area. */
  children?: ReactNode;
}

/**
 * Dialog for destructive actions.
 */
const DestructiveAction = ({
  title,
  description,
  action,
  icon = HiOutlineTrash,
  triggerProps,
  children,
  ...rest
}: Props) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const actions: Action[] = [
    {
      ...action,
      variant: "outline",
      onClick: (e) => {
        action.onClick?.(e);
        onClose();
      },
    },
    {
      label: app.actions.cancel.label,
      onClick: onClose,
    },
  ];

  return (
    <Dialog
      title={title}
      description={description}
      open={isOpen}
      onOpenChange={onToggle}
      trigger={
        <Button variant="icon" p={1} bgColor="transparent" {...triggerProps}>
          <Icon src={icon} w={5} h={5} />
        </Button>
      }
      triggerProps={triggerProps}
      {...rest}
    >
      {children}

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

export default DestructiveAction;
