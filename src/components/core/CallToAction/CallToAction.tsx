"use client";

import { Button, Text } from "@omnidev/sigil";
import { useRouter } from "next/navigation";

import { useDialogStore } from "lib/hooks/store";

import type { ButtonProps } from "@omnidev/sigil";
import type { ReactNode } from "react";
import type { DialogType } from "store";

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
const CallToAction = ({ action }: Props) => {
  const router = useRouter();

  const { label, icon, href, dialogType, ...buttonProps } = action;

  const { setIsOpen } = useDialogStore({
    type: dialogType,
  });

  const handleAction = () => {
    if (href) {
      if (href.startsWith("https://")) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        router.push(href);
      }
      return;
    }

    if (dialogType) {
      setIsOpen(true);
    }
  };

  return (
    <Button
      size="sm"
      width={{ base: "full", md: "auto" }}
      onClick={handleAction}
      {...buttonProps}
    >
      {icon}

      <Text>{label}</Text>
    </Button>
  );
};

export default CallToAction;
