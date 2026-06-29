import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@omnidotdev/thornberry/accordion";

import app from "@/lib/config/app.config";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";

/**
 * Frequently asked questions about pricing.
 */
const PricingFAQ = ({ className, ...rest }: ComponentProps<"div">) => (
  <div className={cn("flex flex-col gap-2", className)} {...rest}>
    <h2 className="mb-4 text-center font-bold text-2xl">
      {app.pricingPage.pricingFaq.FAQ}
    </h2>

    <AccordionRoot collapsible>
      {app.pricingPage.pricingFaq.items.map(({ title, body }) => (
        <AccordionItem key={title} value={title}>
          <AccordionItemTrigger>{title}</AccordionItemTrigger>
          <AccordionItemContent>{body}</AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  </div>
);

export default PricingFAQ;
