import { Button, Icon } from "@omnidev/sigil";
import { Link } from "@tanstack/react-router";

import { Tier } from "@/lib/types/tier";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import { useOrganization } from "@/providers/OrganizationProvider";

import type { ButtonProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface Props extends ButtonProps {
  /** Price ID. */
  priceId: string;
  /** Subscription tier. */
  tier: Tier;
  /** Action icon. */
  actionIcon?: IconType;
}

/**
 * Pricing page CTA button.
 *
 * - Not logged in: Links to sign up (Gatekeeper handles org creation)
 * - Logged in, free tier: Links to their workspace
 * - Logged in, paid tier: Links to their workspace settings to upgrade
 */
const TierCallToAction = ({ priceId, tier, actionIcon, ...rest }: Props) => {
  const orgContext = useOrganization();
  const currentOrg = orgContext?.currentOrganization;

  // Determine button styles based on variant prop
  const isOutline = rest.variant === "outline";
  const buttonClassName = isOutline
    ? "border-primary text-primary hover:bg-primary/10"
    : "bg-primary text-primary-foreground hover:bg-primary/90";

  if (tier === Tier.Enterprise) {
    return (
      <Button className={buttonClassName} {...rest}>
        Contact sales
      </Button>
    );
  }

  // If user is logged in and has an org, link to their workspace
  if (currentOrg) {
    if (tier === Tier.Free) {
      return (
        <Button className={buttonClassName} asChild {...rest}>
          <Link
            to="/workspaces/$workspaceSlug"
            params={{ workspaceSlug: currentOrg.slug }}
          >
            Go to Workspace
          </Link>
        </Button>
      );
    }

    // Paid tier - link to settings to upgrade
    return (
      <Button className={buttonClassName} asChild {...rest}>
        <Link
          to="/workspaces/$workspaceSlug/settings"
          params={{ workspaceSlug: currentOrg.slug }}
        >
          {actionIcon && <Icon src={actionIcon} h={4} w={4} />}
          Upgrade to {capitalizeFirstLetter(tier)}
        </Link>
      </Button>
    );
  }

  // Not logged in - prompt to sign up
  // TODO: Link to Gatekeeper signup with redirect back to pricing/checkout
  return (
    <Button className={buttonClassName} {...rest}>
      {tier === Tier.Free
        ? "Get Started Free"
        : `Start with ${capitalizeFirstLetter(tier)}`}
    </Button>
  );
};

export default TierCallToAction;
