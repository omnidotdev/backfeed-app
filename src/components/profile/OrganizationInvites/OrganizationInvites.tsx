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
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";

import { SectionContainer } from "components/layout";
import {
  Role,
  useCreateMemberMutation,
  useDeleteInvitationMutation,
  useInvitationsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

const organizationInviteDetails = app.profilePage.organizationInvites;

interface JoinOrganizationProps {
  /** Invitation ID. */
  invitationId: string;
  /** Organization ID. */
  organizationId: string;
}

/**
 * User's organization invitations.
 */
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

  const handleJoinOrganization = async ({
    invitationId,
    organizationId,
  }: JoinOrganizationProps) => {
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
      rowId: invitationId!,
    });
  };

  return (
    <SectionContainer
      title={organizationInviteDetails.title}
      description={organizationInviteDetails.description}
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
      ) : error || !invitations?.length ? (
        <Stack mx={4} mb={4}>
          <Text>{organizationInviteDetails.emptyState.message}</Text>
        </Stack>
      ) : (
        <Flex w="100%" overflowX="auto">
          <Table
            headerContent={
              <TableRow fontWeight="semibold" w="full" bgColor="transparent">
                {Object.values(organizationInviteDetails.headers).map(
                  (header) => (
                    <TableCell
                      key={header}
                      fontWeight="bold"
                      textAlign={
                        header === organizationInviteDetails.headers.actions
                          ? "end"
                          : "start"
                      }
                    >
                      {header}
                    </TableCell>
                  )
                )}
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
                        handleJoinOrganization({
                          invitationId: rowId!,
                          organizationId: organizationId!,
                        })
                      }
                    >
                      <Icon src={FiUserPlus} />
                      {organizationInviteDetails.actions.accept.label}
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
                      <Icon src={HiOutlineTrash} />
                      {organizationInviteDetails.actions.decline.label}
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
