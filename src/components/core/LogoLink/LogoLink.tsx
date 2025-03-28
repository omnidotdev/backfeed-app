import { Flex, Badge } from "@omnidev/sigil";

import { Image, Link } from "components/core";
import { app } from "lib/config";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  /** Width of the image */
  width: number;
}

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
          mixBlendMode="difference"
          filter="brightness(0) invert(1)"
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
