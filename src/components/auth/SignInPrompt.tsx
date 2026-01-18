import { Box, Button, Tooltip } from "@omnidev/sigil";

import signIn from "@/lib/auth/signIn";

import type { ButtonProps } from "@omnidev/sigil";
import type { ReactNode } from "react";

interface Props extends Omit<ButtonProps, "onClick" | "children"> {
  /** Action description (e.g., "vote", "comment"). */
  action: string;
  /** Custom content to render as the trigger. If provided, renders as a clickable element instead of a button. */
  children?: ReactNode;
}

/**
 * Sign in prompt that redirects to sign-in with current URL as return destination.
 */
const SignInPrompt = ({ action, children, ...rest }: Props) => {
  const handleClick = () => {
    // Use current URL as return destination after sign in
    const returnUrl = window.location.href;
    signIn({ redirectUrl: returnUrl });
  };

  // If children is provided, render it directly as the trigger (no button wrapper)
  if (children) {
    return (
      <Tooltip
        hasArrow={false}
        triggerProps={{ style: { all: "unset" } }}
        trigger={
          <Box onClick={handleClick} cursor="pointer">
            {children}
          </Box>
        }
      >
        Sign in to {action}
      </Tooltip>
    );
  }

  return (
    <Tooltip
      hasArrow={false}
      trigger={
        <Button onClick={handleClick} variant="outline" size="sm" {...rest}>
          Sign in to {action}
        </Button>
      }
    >
      Sign in to {action}
    </Tooltip>
  );
};

export default SignInPrompt;
