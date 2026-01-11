import { Button, Tooltip } from "@omnidev/sigil";

import signIn from "@/lib/auth/signIn";

import type { ButtonProps } from "@omnidev/sigil";

interface Props extends Omit<ButtonProps, "onClick"> {
  /** Action description (e.g., "vote", "comment"). */
  action: string;
}

/**
 * Login prompt button that redirects to sign-in with current URL as return destination.
 */
const LoginPrompt = ({ action, children, ...rest }: Props) => {
  const handleClick = () => {
    // Use current URL as return destination after login
    const returnUrl = window.location.href;
    signIn({ redirectUrl: returnUrl });
  };

  return (
    <Tooltip
      hasArrow={false}
      trigger={
        <Button onClick={handleClick} variant="outline" size="sm" {...rest}>
          {children ?? `Log in to ${action}`}
        </Button>
      }
    >
      Log in to {action}
    </Tooltip>
  );
};

export default LoginPrompt;
