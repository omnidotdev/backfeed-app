import { css } from "@omnidev/sigil";
import {
  HoverCardContent,
  HoverCardPositioner,
  HoverCardRoot,
  HoverCardTrigger,
} from "@ark-ui/react/hover-card";
import { Portal } from "@ark-ui/react/portal";

import type { PropsWithChildren, ReactNode } from "react";
import type { HoverCardRootProps } from "@ark-ui/react/hover-card";

interface Props extends HoverCardRootProps, PropsWithChildren {
  trigger: ReactNode;
}

const HoverCard = ({ children, trigger, ...rest }: Props) => (
  <HoverCardRoot {...rest}>
    <HoverCardTrigger>{trigger}</HoverCardTrigger>
    <Portal>
      <HoverCardPositioner>
        <HoverCardContent
          className={css({
            bgColor: "background.default",
            borderRadius: "lg",
            boxShadow: "card",
            p: 0,
          })}
        >
          {children}
        </HoverCardContent>
      </HoverCardPositioner>
    </Portal>
  </HoverCardRoot>
);

export default HoverCard;
