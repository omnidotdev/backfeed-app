import { Badge, Flex, css, sigil } from "@omnidev/sigil";
import { Link, useRouteContext } from "@tanstack/react-router";

import app from "@/lib/config/app.config";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  /** Width of the image */
  width: number;
}

/**
 * Navigation link that displays the Backfeed logo. Routes to the home page.
 */
const LogoLink = ({ width, ...rest }: Props) => {
  const { session } = useRouteContext({ from: "__root__" });

  return (
    <Link to={session ? "/dashboard" : "/"}>
      <Flex gap={2} alignItems="center" {...rest}>
        <sigil.img
          src="/img/logo.png"
          alt={`${app.name} logo`}
          width={width}
          height={width / 2}
          // adjust color based on color theme
          css={css.raw({
            filter: {
              base: "brightness(0)",
              _dark: "brightness(0) invert(1)",
            },
          })}
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
