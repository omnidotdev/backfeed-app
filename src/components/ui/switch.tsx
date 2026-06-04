import { Switch as ArkSwitch } from "@ark-ui/react/switch";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const SwitchRoot = ({
  className,
  ...rest
}: ComponentProps<typeof ArkSwitch.Root>) => (
  <ArkSwitch.Root
    className={cn("inline-flex items-center gap-2", className)}
    {...rest}
  />
);

const SwitchControl = ({
  className,
  ...rest
}: ComponentProps<typeof ArkSwitch.Control>) => (
  <ArkSwitch.Control
    className={cn(
      "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input transition-colors data-disabled:cursor-not-allowed data-[state=checked]:bg-primary data-disabled:opacity-50",
      className,
    )}
    {...rest}
  />
);

const SwitchThumb = ({
  className,
  ...rest
}: ComponentProps<typeof ArkSwitch.Thumb>) => (
  <ArkSwitch.Thumb
    className={cn(
      "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      className,
    )}
    {...rest}
  />
);

const SwitchHiddenInput = ArkSwitch.HiddenInput;

export { SwitchControl, SwitchHiddenInput, SwitchRoot, SwitchThumb };
