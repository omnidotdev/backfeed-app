import { Box, Card, Circle, Icon, Popover, Text, VStack } from "@omnidev/sigil";
import { IoNotifications } from "react-icons/io5";
import { useAuth } from "lib/hooks";
import { useNotificationsQuery } from "generated/graphql";

const NotificationCenter = () => {
  const { user } = useAuth();
  const email = user?.email;
  if (!email) return null;

  const { data } = useNotificationsQuery({ email });

  const notifications =
    data?.invitations?.nodes.map((inv, index) => ({
      id: `${index}-${inv?.organization?.name}`,
      message: `You've been invited to join ${inv?.organization?.name}`,
    })) ?? [];

  const notificationNumber = notifications.length;

  return (
    <Popover
      trigger={
        <Box position="relative" cursor="pointer">
          <Icon src={IoNotifications} />

          {notificationNumber > 0 && (
            <Circle
              position="absolute"
              top="0"
              right="0"
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
            </Circle>
          )}
        </Box>
      }
    >
      {notifications.length === 0 ? (
        <Text textAlign="center" color="muted">
          No new notifications
        </Text>
      ) : (
        <VStack gap={2}>
          {notifications.map((n) => (
            <Card
              key={n.id}
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="full"
              _hover={{ bg: "foreground.disabled", cursor: "pointer" }}
              onClick={() => {
                window.location.href = `/profile/${user.hidraId}/invitations`;
              }}
            >
              <Text fontSize="sm">{n.message}</Text>
            </Card>
          ))}
        </VStack>
      )}
    </Popover>
  );
};

export default NotificationCenter;
