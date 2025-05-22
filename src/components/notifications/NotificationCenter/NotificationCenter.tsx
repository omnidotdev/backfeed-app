import {
  Button,
  Circle,
  HStack,
  Icon,
  Popover,
  Text,
  VStack,
} from "@omnidev/sigil";
import { useRouter } from "next/navigation";
import { IoNotifications } from "react-icons/io5";
import { LuCheck, LuX } from "react-icons/lu";

import {
  Role,
  useCreateMemberMutation,
  useDeleteInvitationMutation,
  useNotificationsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";
import { getQueryClient } from "lib/util";

const invitations = app.header.routes.invitations;

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
          // TODO: Might need to update when notifications expand beyond invites. For now, the popover description provides the context
          message: `${invitations.join} ${inv?.organization?.name}`,
        })) ?? [],
    },
  );

  // NB: when a user accepts an invitation, all queries should be invalidated to populate data that is based on the new organization they are now a part of
  const onSettled = async () => queryClient.invalidateQueries();

  const { mutate: acceptInvitation } = useCreateMemberMutation({ onSettled });
  const { mutate: deleteInvitation } = useDeleteInvitationMutation({
    onSettled,
  });

  return (
    <Popover
      title={invitations.title}
      // TODO: update when we provide notifications for more than just invites
      description={invitations.description}
      closeTrigger={null}
      trigger={
        <Button
          position="relative"
          variant="icon"
          aria-label="Notifications"
          bgColor="transparent"
          color="foreground.default"
        >
          <Icon src={IoNotifications} />

          {!!notifications?.length && (
            <Circle
              position="absolute"
              top={1.5}
              right={2}
              h={3}
              w={3}
              bgColor="red"
            />
          )}
        </Button>
      }
      triggerProps={{
        asChild: true,
      }}
      contentProps={{
        p: 3,
      }}
      titleProps={{
        fontSize: "md",
      }}
      descriptionProps={{
        color: "foreground.subtle",
      }}
    >
      {!notifications?.length ? (
        <Text
          textAlign="center"
          color="muted"
          py={2}
          minW={{ base: 64, sm: 80 }}
        >
          {invitations.noInvites}
        </Text>
      ) : (
        <VStack>
          {notifications.map((notification) => (
            <HStack
              key={notification.rowId}
              justify="space-between"
              w="full"
              bgColor={{
                base: "background.subtle",
                _dark: "background.subtle/30",
              }}
              minW={{ base: 64, sm: 80 }}
              p={2}
              borderRadius="sm"
            >
              <Text fontSize="sm">{notification.message}</Text>

              <HStack gap={0} justify="center">
                <Button
                  size="sm"
                  variant="ghost"
                  bgColor="transparent"
                  color="green"
                  opacity={{ _hover: 0.8 }}
                  px={0}
                  onClick={() => {
                    acceptInvitation({
                      input: {
                        member: {
                          userId: user?.rowId!,
                          organizationId: notification.organizationId,
                          role: Role.Member,
                        },
                      },
                    });
                    // deletes the invitation after accepting it
                    deleteInvitation({ rowId: notification.rowId });
                  }}
                >
                  <Icon src={LuCheck} />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  bgColor="transparent"
                  color="red"
                  opacity={{ _hover: 0.8 }}
                  px={0}
                  onClick={() =>
                    deleteInvitation({ rowId: notification.rowId })
                  }
                >
                  <Icon src={LuX} />
                </Button>
              </HStack>
            </HStack>
          ))}
        </VStack>
      )}
    </Popover>
  );
};

export default NotificationCenter;
