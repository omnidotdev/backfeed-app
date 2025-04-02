"use client";

import {
  Button,
  Flex,
  Icon,
  Skeleton,
  Stack,
  Table,
  TableCell,
  TableRow,
  Text,
} from "@omnidev/sigil";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { RiUserAddLine } from "react-icons/ri";

import { SectionContainer } from "components/layout";
import {
  Role,
  useCreateMemberMutation,
  useDeleteInvitationMutation,
  useInvitationsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

const OrganizationInvites = () => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const onSettled = () =>
    queryClient.invalidateQueries({
      queryKey: useInvitationsQuery.getKey({
        email: user?.email!,
      }),
    });

  const {
    mutateAsync: joinOrganization,
    isPending: isJoinOrganizationPending,
  } = useCreateMemberMutation({
    onSettled,
  });

  const { mutate: declineOrganization, isPending: isDeleteInvitationPending } =
    useDeleteInvitationMutation({
      onSettled,
    });

  const {
    data: invitations,
    error,
    isLoading,
  } = useInvitationsQuery(
    {
      email: user?.email!,
    },
    {
      enabled: !!user,
      select: (data) =>
        data.invitations?.nodes.map((node) => ({
          rowId: node?.rowId,
          organizationName: node?.organization?.name,
          organizationId: node?.organizationId,
          createdAt: dayjs(node?.createdAt).format("M/D/YYYY"),
        })),
    }
  );

  const handleJoinOrganization = async (
    rowId: string,
    organizationId: string
  ) => {
    await joinOrganization({
      input: {
        member: {
          userId: user?.rowId!,
          organizationId,
          role: Role.Member,
        },
      },
    });

    declineOrganization({
      rowId: rowId!,
    });
  };

  return (
    <SectionContainer
      title={app.profilePage.organizationInvites.title}
      description={app.profilePage.organizationInvites.description}
      p={0}
      titleProps={{
        px: 4,
        mt: 4,
      }}
      descriptionProps={{
        px: 4,
      }}
    >
      {isLoading ? (
        <Skeleton h={18} m={4} />
      ) : error ? (
        <Stack mx={4} mb={4}>
          <Text>No active invitations found.</Text>
        </Stack>
      ) : (
        <Flex w="100%" overflowX="auto">
          <Table
            headerContent={
              <TableRow fontWeight="semibold" w="full" bgColor="transparent">
                <TableCell>Organization</TableCell>

                <TableCell>Invitation Date</TableCell>

                <TableCell textAlign="end">Actions</TableCell>
              </TableRow>
            }
            textWrap="nowrap"
          >
            {invitations?.map(
              ({ rowId, organizationName, createdAt, organizationId }) => (
                <TableRow
                  key={rowId}
                  fontSize={{ base: "sm", md: "lg" }}
                  bgColor="transparent"
                >
                  <TableCell>{organizationName}</TableCell>
                  <TableCell>{createdAt}</TableCell>
                  <TableCell
                    gap={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Button
                      size="sm"
                      fontSize="md"
                      colorPalette="green"
                      color="white"
                      w="fit"
                      disabled={
                        isJoinOrganizationPending || isDeleteInvitationPending
                      }
                      onClick={() =>
                        handleJoinOrganization(rowId!, organizationId!)
                      }
                    >
                      <Icon src={RiUserAddLine} />
                      {app.profilePage.organizationInvites.actions.accept.label}
                    </Button>

                    <Button
                      size="sm"
                      fontSize="md"
                      colorPalette="red"
                      color="white"
                      w="fit"
                      disabled={
                        isJoinOrganizationPending || isDeleteInvitationPending
                      }
                      onClick={() =>
                        declineOrganization({
                          rowId: rowId!,
                        })
                      }
                    >
                      <Icon src={RiUserAddLine} />
                      {
                        app.profilePage.organizationInvites.actions.decline
                          .label
                      }
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </Table>
        </Flex>
      )}
    </SectionContainer>
  );
};

export default OrganizationInvites;
