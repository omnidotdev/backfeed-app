import { Accordion as ArkAccordion } from "@ark-ui/react";
import { ChevronDown } from "lucide-react";

import cn from "@/lib/utils";

import type {
  AccordionItemContentProps,
  AccordionItemProps,
  AccordionItemTriggerProps,
  AccordionRootProps,
} from "@ark-ui/react";
import type { ElementType } from "react";

const AccordionRoot = ({ className, ...rest }: AccordionRootProps) => (
  <ArkAccordion.Root
    className={cn(
      "flex flex-col data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:gap-4 data-[orientation=horizontal]:border-none",
      className,
    )}
    {...rest}
  />
);

const AccordionItem = ({ className, ...rest }: AccordionItemProps) => (
  <ArkAccordion.Item
    className={cn(
      "group flex flex-col border-b data-[orientation=horizontal]:w-full data-[orientation=horizontal]:border-none data-disabled:opacity-50",
      className,
    )}
    {...rest}
  />
);

interface ItemTriggerProps extends AccordionItemTriggerProps {
  icon?: ElementType;
}

const AccordionItemTrigger = ({
  className,
  children,
  icon,
  ...rest
}: ItemTriggerProps) => {
  const Icon = icon ?? ChevronDown;

  return (
    <ArkAccordion.ItemTrigger
      className={cn(
        "flex flex-1 cursor-pointer items-center justify-between rounded-md px-2 py-4 text-left font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed data-[orientation=horizontal]:items-start [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...rest}
    >
      {children}
      <Icon className="size-4 transition-transform" />
    </ArkAccordion.ItemTrigger>
  );
};

const AccordionItemContent = ({
  className,
  children,
  ...rest
}: AccordionItemContentProps) => (
  <ArkAccordion.ItemContent
    className={
      "overflow-hidden px-2 text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    }
    {...rest}
  >
    <div className={cn("pt-0 pb-4", className)}>{children}</div>
  </ArkAccordion.ItemContent>
);

export {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
};
