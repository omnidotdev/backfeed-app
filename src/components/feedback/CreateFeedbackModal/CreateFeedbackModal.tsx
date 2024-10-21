import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  Flex,
  Input,
  Label,
  Text,
  Textarea,
} from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { z } from "zod";

import { useCreatePostMutation, usePostsQuery } from "generated/graphql";

import type { UseDisclosureOptions } from "@omnidev/sigil";
import type { CherrypickRequired } from "lib/types/util";
import type { FieldValues } from "react-hook-form";

const schema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(512),
});

type Schema = z.infer<typeof schema>;

// TODO clear errors on modal close
interface Props
  extends CherrypickRequired<
    UseDisclosureOptions,
    "isOpen" | "onClose" | "onOpen"
  > {
  projectId: string;
}

/**
 * Create new feedback post modal.
 */
const CreateFeedbackModal = ({ isOpen, onOpen, onClose, projectId }: Props) => {
  const { mutate: createPost } = useCreatePostMutation();

  const { address: connectedAddress } = useAccount();

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
        projectId,
        userAddress: connectedAddress!,
        title: data.title,
        description: data.description,
      });

      void queryClient.invalidateQueries({
        queryKey: usePostsQuery.getKey({ projectId }),
      });

      onClose();
    },
    [connectedAddress, createPost, onClose, projectId, queryClient]
  );

  return (
    // @ts-ignore not sure why this is throwing an error
    <Dialog
      open={isOpen}
      // @ts-ignore not sure why this is throwing an error
      onOpenChange={({ open }) => (open ? onOpen() : onClose())}
      title="Create Feedback Post"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap={4}>
          <Flex
            flexDirection="column"
            gap={2}
            // isRequired
            // NB: `isInvalid` determines whether `FormErrorMessage` components render
            // isInvalid={!!errors.title}
          >
            <Label>Title</Label>
            <Input
              placeholder="Short, descriptive title"
              _placeholder={{ color: "gray.500" }}
              type="text"
              {...register("title")}
            />

            <Text color="red" fontSize="sm">
              {errors.title?.message as string}
            </Text>
          </Flex>

          <Flex
            id="description"
            flexDirection="column"
            gap={2}
            // isRequired
            // NB: `isInvalid` determines whether `FormErrorMessage` components render
            // isInvalid={!!errors.title}
          >
            <Label>Description</Label>
            <Textarea
              placeholder="Describe additional details..."
              _placeholder={{ color: "gray.500" }}
              {...register("description")}
            />

            <Text color="red" fontSize="sm">
              {errors.description?.message as string}
            </Text>
          </Flex>
        </Flex>

        {/* TODO close and invalidate query */}
        <Button type="submit" disabled={isSubmitting}>
          Create
        </Button>
      </form>
    </Dialog>
  );
};

export default CreateFeedbackModal;
