"use client";

import { Button, Text } from "@omnidev/sigil";
import { useRouter } from "next/navigation";
import { useDialogStore } from "lib/hooks/store";

import type { DialogType } from "store";
import type { ReactNode } from "react";
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
const CallToAction = ({ action, ...rest }: Props) => {
  const router = useRouter();

  const { label, icon, href, dialogType } = action;

  const { setIsOpen } = useDialogStore({
    type: dialogType,
  });

  const handleAction = () => {
    if (href) {
      router.push(href);
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
      {...rest}
    >
      {icon}

      <Text>{label}</Text>
    </Button>
  );
};

export default CallToAction;
