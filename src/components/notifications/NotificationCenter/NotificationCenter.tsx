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
import { useState } from "react";

const NotificationCenter = () => {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = getQueryClient();

  const { data: notifications } = useNotificationsQuery(
    { email: user?.email! },
    {
      enabled: !!user?.email,
      select: (data) =>
        data?.invitations?.nodes.map((inv) => ({
          rowId: inv?.rowId!,
          organizationId: inv?.organizationId!,
          message: `You've been invited to join ${inv?.organization?.name}`,
        })) ?? [],
    },
  );

  const notificationNumber = notifications?.length || 0;

  const onSettled = async () => {
    await queryClient.invalidateQueries();
  };

  const { mutate: acceptInvitation } = useCreateMemberMutation({ onSettled });
  const { mutate: deleteInvitation } = useDeleteInvitationMutation({
    onSettled,
  });

  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
        <VStack gap={2} p={2}>
          {notifications.map((n) => (
            <Box key={n.rowId}>
              <Card
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
                w="full"
                p={3}
                _hover={{ bg: "foreground.disabled", cursor: "pointer" }}
                onMouseEnter={() => setHoveredId(n.rowId)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() =>
                  router.push(`/profile/${user?.hidraId}/invitations`)
                }
              >
                <Text fontSize="sm" mb={2}>
                  {n.message}
                </Text>

                {hoveredId === n.rowId && (
                  <Stack direction="row" gap={2}>
                    <Button
                      size="sm"
                      bg="green"
                      _hover={{ bg: "green.700" }}
                      onClick={(evt) => {
                        evt.stopPropagation();
                        acceptInvitation({
                          input: {
                            member: {
                              userId: user?.rowId!,
                              organizationId: n.organizationId,
                              role: Role.Member,
                            },
                          },
                        });
                        deleteInvitation({ rowId: n.rowId });
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      bg="red"
                      _hover={{ bg: "red.700" }}
                      onClick={(evt) => {
                        evt.stopPropagation();
                        deleteInvitation({ rowId: n.rowId });
                      }}
                    >
                      Decline
                    </Button>
                  </Stack>
                )}
              </Card>
            </Box>
          ))}
        </VStack>
      )}
    </Popover>
  );
};

export default NotificationCenter;
