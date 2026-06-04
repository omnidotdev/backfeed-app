import { Button } from "@/components/ui/button";
import {
  TooltipContent,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import signIn from "@/lib/auth/signIn";

import type { ComponentProps, ReactNode } from "react";

interface Props extends Omit<ComponentProps<typeof Button>, "children"> {
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

  return (
    <TooltipRoot>
      <TooltipTrigger asChild>
        {children ? (
          <button
            type="button"
            onClick={handleClick}
            className="cursor-pointer"
          >
            {children}
          </button>
        ) : (
          <Button onClick={handleClick} variant="outline" size="sm" {...rest}>
            Sign in to {action}
          </Button>
        )}
      </TooltipTrigger>

      <TooltipPositioner>
        <TooltipContent>Sign in to {action}</TooltipContent>
      </TooltipPositioner>
    </TooltipRoot>
  );
};

export default SignInPrompt;
