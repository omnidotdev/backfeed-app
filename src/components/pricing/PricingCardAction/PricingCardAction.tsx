import { Button, Icon } from "@omnidev/sigil";
import { FaArrowRight } from "react-icons/fa6";

import { app } from "lib/config";

import type { ButtonProps } from "@omnidev/sigil";

/**
 * Pricing card action button.
 */
const PricingCardAction = ({ ...props }: ButtonProps) => (
  <Button
    position="absolute"
    bottom={4}
    left="50%"
    transform="translateX(-50%)"
    w="90%"
    fontSize="lg"
    {...props}
  >
    {app.pricingPage.pricingCard.getStarted}

    <Icon src={FaArrowRight} h={4} w={4} mt={0.5} />
  </Button>
);

export default PricingCardAction;
