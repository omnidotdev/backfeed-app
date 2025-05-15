import {
  Box,
  Button,
  Card,
  Circle,
  Icon,
  Popover,
  Stack,
  Text,
  VStack,
} from "@omnidev/sigil";
import { IoNotifications } from "react-icons/io5";
import { useAuth } from "lib/hooks";
import {
  useCreateMemberMutation,
  useDeleteInvitationMutation,
  useNotificationsQuery,
} from "generated/graphql";

const NotificationCenter = () => {
  const { user } = useAuth();
  const email = user?.email;
  if (!email) return null;

  const { data, refetch } = useNotificationsQuery({ email });

  const notifications =
    data?.invitations?.nodes.map((inv, index) => ({
      id: `${index}-${inv?.organization?.name}`,
      rowId: inv?.rowId,
      email: inv?.email,
      organizationId: inv?.organizationId,
      message: `You've been invited to join ${inv?.organization?.name}`,
    })) ?? [];

  const notificationNumber = notifications.length || 0;

  const createMember = useCreateMemberMutation();
  const deleteInvitation = useDeleteInvitationMutation();

  return (
    <Popover
      closeTrigger={null}
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
        <Stack p={4} alignSelf="center">
          <Text textAlign="center" color="muted">
            No new notifications
          </Text>
        </Stack>
      ) : (
        <VStack gap={2}>
          <Stack>
            {notifications.map((n) => (
              <Box key={n.id}>
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
                <Button onClick={() => createMember()}>Accept</Button>
                <Button onClick={() => deleteInvitation()}>Decline</Button>
              </Box>
            ))}
          </Stack>
        </VStack>
      )}
    </Popover>
  );
};

export default NotificationCenter;
