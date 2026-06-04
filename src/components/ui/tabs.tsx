import { Tabs as ArkTabs } from "@ark-ui/react/tabs";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const TabsRoot = ({
  className,
  ...rest
}: ComponentProps<typeof ArkTabs.Root>) => (
  <ArkTabs.Root className={cn("w-full", className)} {...rest} />
);

const TabsList = ({
  className,
  ...rest
}: ComponentProps<typeof ArkTabs.List>) => (
  <ArkTabs.List
    className={cn(
      "inline-flex h-10 max-w-full items-center justify-start overflow-x-auto rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...rest}
  />
);

const TabsTrigger = ({
  className,
  ...rest
}: ComponentProps<typeof ArkTabs.Trigger>) => (
  <ArkTabs.Trigger
    className={cn(
      "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow-sm",
      className,
    )}
    {...rest}
  />
);

const TabsContent = ({
  className,
  ...rest
}: ComponentProps<typeof ArkTabs.Content>) => (
  <ArkTabs.Content
    className={cn(
      "mt-2 rounded-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      className,
    )}
    {...rest}
  />
);

export { TabsRoot, TabsList, TabsTrigger, TabsContent };
