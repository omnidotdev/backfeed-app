import { Icon } from "@omnidev/sigil";
import { Reorder, useDragControls } from "motion/react";
import { useState } from "react";
import { PiDotsSixVerticalBold } from "react-icons/pi";

import type { ComponentProps } from "react";

/**
 * Reorder item component. Internally manages state for element's drag position.
 */
const ReorderItem = <T,>({
  children,
  ...rest
}: ComponentProps<typeof Reorder.Item<T>>) => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  const controls = useDragControls();

  return (
    <Reorder.Item {...rest} dragListener={false} dragControls={controls}>
      <Icon
        src={PiDotsSixVerticalBold}
        cursor={{ _hover: isGrabbing ? "grabbing" : "grab" }}
        touchAction="none"
        onPointerUp={() => setIsGrabbing(false)}
        // @ts-ignore: TODO fix implicit any type upstream in Sigil
        onPointerDown={(evt) => {
          evt.preventDefault();
          controls.start(evt);
          setIsGrabbing(true);
        }}
      />

      {children}
    </Reorder.Item>
  );
};

export default ReorderItem;
