import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  chakra,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { z } from "zod";

import {
  useCreatePostMutation,
  usePostsQuery,
  useUserQuery,
} from "generated/graphql";

import type { UseDisclosureProps } from "@chakra-ui/react";
import type { CherrypickRequired } from "lib/types/util";
import type { FieldValues } from "react-hook-form";

const schema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(512),
});

type Schema = z.infer<typeof schema>;

// TODO clear errors on modal close

interface Props
  extends CherrypickRequired<UseDisclosureProps, "isOpen" | "onClose"> {
  projectId?: string;
}

/**
 * Create new feedback post modal.
 */
const CreateFeedbackModal = ({ isOpen, onClose, projectId }: Props) => {
  const { mutate: createPost } = useCreatePostMutation();

  const { address: connectedAddress } = useAccount(),
    { data: user } = useUserQuery(
      { walletAddress: connectedAddress! },
      {
        enabled: !!connectedAddress,
        select: (data) => data.userByWalletAddress,
      }
    );

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      // TODO character limit decrement counter in UI
      createPost({
        postInput: {
          projectId: projectId!,
          userId: user?.rowId!,
          // walletAddress: connectedAddress!,
          title: data.title,
          description: data.description,
        },
      });

      void queryClient.invalidateQueries({
        queryKey: usePostsQuery.getKey({ projectId: projectId! }),
      });

      onClose();
    },
    [createPost, onClose, projectId, user?.rowId, queryClient]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Create Feedback Post</ModalHeader>

        <ModalCloseButton />

        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Flex direction="column" gap={8}>
              <FormControl
                id="title"
                isRequired
                // NB: `isInvalid` determines whether `FormErrorMessage` components render
                isInvalid={!!errors.title}
              >
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Short, descriptive title"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  {...register("title")}
                />

                <FormErrorMessage>
                  {errors.title?.message as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                id="description"
                isRequired
                // NB: `isInvalid` determines whether `FormErrorMessage` components render
                isInvalid={!!errors.title}
              >
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Describe additional details..."
                  _placeholder={{ color: "gray.500" }}
                  {...register("description")}
                />

                <FormErrorMessage>
                  {errors.description?.message as string}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            {/* TODO close and invalidate query */}
            <Button type="submit" isDisabled={isSubmitting}>
              Create
            </Button>
          </ModalFooter>
        </chakra.form>
      </ModalContent>
    </Modal>
  );
};

export default CreateFeedbackModal;
