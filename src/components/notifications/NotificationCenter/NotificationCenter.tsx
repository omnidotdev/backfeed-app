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
import { useRouter } from "next/navigation";
import { IoNotifications } from "react-icons/io5";

import {
  Role,
  useCreateMemberMutation,
  useDeleteInvitationMutation,
  useNotificationsQuery,
} from "generated/graphql";
import { useAuth } from "lib/hooks";
import { getQueryClient } from "lib/util";

const NotificationCenter = () => {
  const { user } = useAuth();

  const router = useRouter();

  const queryClient = getQueryClient();

  const { data: notifications } = useNotificationsQuery(
    { email: user?.email! },
    {
      enabled: !!user?.email,
      select: (data) =>
        data?.invitations?.nodes.map((inv, index) => ({
          id: `${index}-${inv?.organization?.name}`,
          rowId: inv?.rowId,
          email: inv?.email,
          organizationId: inv?.organizationId,
          message: `You've been invited to join ${inv?.organization?.name}`,
        })),
    },
  );

  const notificationNumber = notifications?.length || 0;

  // NB: when a user accepts an invitation, all queries should be invalidated to populate data that is based on the new organization they are now a part of
  const onSettled = async () => queryClient.invalidateQueries();

  const { mutate: acceptInvitation } = useCreateMemberMutation({
    onSettled,
  });
  const { mutate: deleteInvitation } = useDeleteInvitationMutation({
    onSettled,
  });

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
      {!notifications?.length ? (
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
                  onClick={() =>
                    router.push(`/profile/${user?.hidraId}/invitations`)
                  }
                >
                  <Text fontSize="sm">{n.message}</Text>
                </Card>

                <Button
                  onClick={(evt) => {
                    evt.stopPropagation();

                    acceptInvitation({
                      input: {
                        member: {
                          userId: user?.rowId!,
                          organizationId: n.organizationId!,
                          role: Role.Member,
                        },
                      },
                    });

                    deleteInvitation({
                      rowId: n.rowId!,
                    });
                  }}
                >
                  Accept
                </Button>

                <Button
                  onClick={(evt) => {
                    evt.stopPropagation();

                    deleteInvitation({ rowId: n.rowId! });
                  }}
                >
                  Decline
                </Button>
              </Box>
            ))}
          </Stack>
        </VStack>
      )}
    </Popover>
  );
};

export default NotificationCenter;
