import { Menu as ArkMenu } from "@ark-ui/react/menu";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const MenuRoot = ArkMenu.Root;

const MenuContextTrigger = ({
  className,
  ...rest
}: ComponentProps<typeof ArkMenu.ContextTrigger>) => (
  <ArkMenu.ContextTrigger className={className} {...rest} />
);

const MenuTrigger = ({
  className,
  ...rest
}: ComponentProps<typeof ArkMenu.Trigger>) => (
  <ArkMenu.Trigger className={className} {...rest} />
);

const MenuPositioner = ({
  className,
  ...rest
}: ComponentProps<typeof ArkMenu.Positioner>) => (
  <ArkMenu.Positioner className={className} {...rest} />
);

const MenuContent = ({
  className,
  ...rest
}: ComponentProps<typeof ArkMenu.Content>) => (
  <ArkMenu.Content
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 flex min-w-32 origin-(--transform-origin) flex-col gap-0.5 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none duration-300 data-[state=closed]:animate-out data-[state=open]:animate-in",
      className,
    )}
    {...rest}
  />
);

const MenuItem = ({
  className,
  children,
  variant,
  ...rest
}: ComponentProps<typeof ArkMenu.Item> & { variant?: "destructive" }) => (
  <ArkMenu.Item
    data-variant={variant}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden hover:bg-accent focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-[state=checked]:bg-accent data-highlighted:bg-accent data-inset:pl-8 data-[state=checked]:text-accent-foreground data-[variant=destructive]:text-destructive data-highlighted:text-accent-foreground data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:hover:bg-destructive/10 dark:data-[variant=destructive]:hover:bg-destructive/20 [&[data-state=checked][data-highlighted]]:bg-sidebar-accent/80 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive!",
      className,
    )}
    {...rest}
  >
    {children}
  </ArkMenu.Item>
);

const MenuItemGroup = ({
  className,
  ...rest
}: ComponentProps<typeof ArkMenu.ItemGroup>) => (
  <ArkMenu.ItemGroup className={cn("overflow-hidden", className)} {...rest} />
);

const MenuItemGroupLabel = ({
  className,
  ...rest
}: ComponentProps<typeof ArkMenu.ItemGroupLabel>) => (
  <ArkMenu.ItemGroupLabel
    className={cn(
      "flex w-full items-center justify-between p-2 font-medium text-foreground text-sm",
      className,
    )}
    {...rest}
  />
);

const MenuItemText = ({
  className,
  ...rest
}: ComponentProps<typeof ArkMenu.ItemText>) => (
  <ArkMenu.ItemText className={className} {...rest} />
);

const MenuSeparator = ({
  className,
  ...rest
}: ComponentProps<typeof ArkMenu.Separator>) => (
  <ArkMenu.Separator
    className={cn("-mx-1 mt-1 mb-1 h-px bg-border", className)}
    {...rest}
  />
);

export {
  MenuContent,
  MenuContextTrigger,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemText,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
};
