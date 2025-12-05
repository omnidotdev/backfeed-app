import { Accordion, Stack, Text } from "@omnidev/sigil";

import app from "@/lib/config/app.config";

import type { StackProps } from "@omnidev/sigil";

/**
 * Frequently asked questions about pricing.
 */
const PricingFAQ = (props: StackProps) => (
  <Stack {...props}>
    <Text as="h2" fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
      {app.pricingPage.pricingFaq.FAQ}
    </Text>

    <Accordion items={app.pricingPage.pricingFaq.items} />
  </Stack>
);

export default PricingFAQ;
