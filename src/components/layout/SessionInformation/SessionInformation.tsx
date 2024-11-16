"use client";

import { Button } from "@omnidev/sigil";

import { useAuth } from "lib/hooks";

const getInitials = (firstName: string, lastName: string) =>
  `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;

const SessionInformation = () => {
  const { firstName, lastName } = useAuth();

  return (
    <Button
      borderRadius="full"
      variant="icon"
      size="lg"
      w={11}
      bgColor={{ base: "background.subtle", _hover: "background.muted" }}
      color="foreground.muted"
    >
      {getInitials(firstName, lastName)}
    </Button>
  );
};

export default SessionInformation;
