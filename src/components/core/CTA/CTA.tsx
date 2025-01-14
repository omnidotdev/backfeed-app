"use client";

import { Button, Text } from "@omnidev/sigil";
import { useRouter } from "next/navigation";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

import type { ReactNode, MouseEvent } from "react";
import type { ButtonProps } from "@omnidev/sigil";

export interface ActionButton extends ButtonProps {
  /** Button label. */
  label: string;
  /** Button icon. */
  icon: ReactNode;
  /** URL path for navigation. */
  href?: string;
  /** Type of dialog to trigger. */
  dialogType?: DialogType;
}

interface Props {
  /** Call to action button props. */
  action: ActionButton;
}

/**
 * Call to action button component.
 */
const CTA = ({ action }: Props) => {
  const router = useRouter();

  const dialogStores = {
    [DialogType.CreateProject]: useDialogStore({
      type: DialogType.CreateProject,
    }),
    [DialogType.CreateOrganization]: useDialogStore({
      type: DialogType.CreateOrganization,
    }),
  };

  const handleClick = (
    e: MouseEvent<HTMLButtonElement>,
    action: ActionButton
  ) => {
    const { href, onClick, dialogType } = action;

    if (href) {
      router.push(href);
      return;
    }

    if (onClick) {
      onClick(e);
      return;
    }

    if (dialogType) {
      dialogStores[dialogType]?.setIsOpen(true);
    }
  };

  return (
    <Button
      size="sm"
      disabled={action.disabled}
      width={{ base: "full", md: "auto" }}
      onClick={(e) => handleClick(e, action)}
      {...action}
    >
      {action.icon}

      <Text>{action.label}</Text>
    </Button>
  );
};

export default CTA;
