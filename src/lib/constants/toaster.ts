"use client";

import { createToaster } from "@omnidev/sigil";

const toaster = createToaster({
  placement: "bottom-end",
  overlap: true,
});

export default toaster;
