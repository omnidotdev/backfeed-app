import { Box, Button, Card, Text, VStack } from "@omnidev/sigil";
import { IoNotifications } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "lib/hooks";
import { useNotificationsQuery } from "generated/graphql";

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  const email = user?.email;
  if (!email) return null;

  const { data } = useNotificationsQuery(
    {
      email,
    },
    {
      refetchOnReconnect: true,
    },
  );

  const notifications =
    data?.invitations?.nodes.map((inv, index) => ({
      id: `${index}-${inv?.organization?.name}`,
      message: `You've been invited to join ${inv?.organization?.name}`,
    })) ?? [];

  const notificationNumber = notifications.length;

  // Optional: Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box position="relative" ref={ref}>
      <Button
        variant="ghost"
        aria-label="Notifications"
        p={2}
        onClick={() => setIsOpen((prev) => !prev)}
        position="relative"
      >
        <IoNotifications size={20} />

        {notificationNumber > 0 && (
          <Box
            position="absolute"
            top="2"
            right="2"
            transform="translate(40%, -40%)"
            bg="red.500"
            borderRadius="full"
            minW="16px"
            h="16px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
            color="white"
            pointerEvents="none"
          >
            <Text lineHeight="none">{notificationNumber}</Text>
          </Box>
        )}
      </Button>

      {isOpen && (
        <Box
          position="absolute"
          right={0}
          mt={2}
          w="64"
          bg="background"
          boxShadow="md"
          borderRadius="md"
          p={2}
          zIndex={10}
        >
          <VStack gap={2}>
            {notifications.length === 0 ? (
              <Text px={2} py={4} textAlign="center" color="muted">
                No notifications
              </Text>
            ) : (
              notifications.map((n) => (
                <Card
                  key={n.id}
                  p={3}
                  h={18}
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"full"}
                  display="flex"
                  _hover={{ bg: "foreground.disabled", cursor: "pointer" }}
                  onClick={() => {
                    window.location.href = `/profile/${user.hidraId}/invitations`;
                  }}
                >
                  <Text fontSize="sm">{n.message}</Text>
                </Card>
              ))
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default NotificationCenter;
