"use client";

import { createToaster } from "@omnidev/sigil";

// TODO move out of constants

/**
 * Helper function to create a toaster instance.
 */
const toaster = createToaster({
  placement: "bottom-end",
  overlap: true,
});

export default toaster;
