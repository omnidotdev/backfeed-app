import { Badge, Flex } from "@omnidev/sigil";
import { Image, Link } from "components/core";
import { app } from "lib/config";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  /** Width of the image */
  width: number;
}

/**
 * Navigation link that displays the Backfeed logo. Routes to the home page.
 */
const LogoLink = ({ width, ...rest }: Props) => {
  return (
    <Link href="/">
      <Flex gap={2} alignItems="center" {...rest}>
        <Image
          src="/img/logo.png"
          alt={`${app.name} logo`}
          width={width}
          height={width / 2}
          priority
          // adjust color based on color theme
          filter={{
            base: "brightness(0)",
            _dark: "brightness(0) invert(1)",
          }}
        />

        <Badge
          size="sm"
          fontSize="xs"
          variant="outline"
          color="brand.primary"
          borderColor="brand.primary"
          px={2}
        >
          Beta
        </Badge>
      </Flex>
    </Link>
  );
};

export default LogoLink;
