"use client";

import { createToaster } from "@ark-ui/react";

/**
 * Helper function to create a toaster instance.
 */
const toaster = createToaster({
  placement: "bottom-end",
  overlap: true,
});

export default toaster;
