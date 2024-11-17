"use client";

import { Flex } from "@omnidev/sigil";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  message: string;
}

/**
 * Error boundary component. Displays a message when an error occurs from fetching dynamic data.
 */
const ErrorBoundary = ({ message, ...rest }: Props) => (
  <Flex
    align="center"
    justify="center"
    borderRadius="md"
    borderColor="red"
    borderWidth="1px"
    color="red"
    borderStyle="dashed"
    {...rest}
  >
    {message}
  </Flex>
);

export default ErrorBoundary;
