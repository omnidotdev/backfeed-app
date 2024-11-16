"use client";

import { Button } from "@omnidev/sigil";

import { useAuth } from "lib/hooks";

const SessionInformation = () => {
  const { initials } = useAuth();

  return (
    <Button
      borderRadius="full"
      variant="icon"
      size="lg"
      bgColor={{ base: "background.subtle", _hover: "background.muted" }}
      color="foreground.muted"
    >
      {initials}
    </Button>
  );
};

export default SessionInformation;
