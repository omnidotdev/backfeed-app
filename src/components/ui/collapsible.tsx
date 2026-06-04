import { Collapsible as ArkCollapsible } from "@ark-ui/react/collapsible";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const CollapsibleRoot = ArkCollapsible.Root;

const CollapsibleTrigger = ({
  className,
  ...rest
}: ComponentProps<typeof ArkCollapsible.Trigger>) => (
  <ArkCollapsible.Trigger className={className} {...rest} />
);

const CollapsibleContent = ({
  className,
  ...rest
}: ComponentProps<typeof ArkCollapsible.Content>) => (
  <ArkCollapsible.Content
    className={cn("overflow-hidden", className)}
    {...rest}
  />
);

export { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
