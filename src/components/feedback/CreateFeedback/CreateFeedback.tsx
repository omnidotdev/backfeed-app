"use client";

import {
  Button,
  Input,
  Label,
  Skeleton,
  Stack,
  Text,
  Textarea,
} from "@omnidev/sigil";

import { app } from "lib/config";

interface Props {
  /** Loading state for current feedback. */
  isLoading: boolean;
  /** Error state for current feedback. */
  isError: boolean;
  /** Total feedback for the project. */
  totalCount: number;
}

/**
 * Create feedback form.
 */
const CreateFeedback = ({ isLoading, isError, totalCount }: Props) => {
  return (
    <>
      <Stack gap={1.5}>
        <Label>{app.projectPage.projectFeedback.feedbackTitle.label}</Label>
        <Input
          placeholder={
            app.projectPage.projectFeedback.feedbackTitle.placeholder
          }
          borderColor="border.subtle"
        />
      </Stack>

      <Stack gap={1.5}>
        <Label>
          {app.projectPage.projectFeedback.feedbackDescription.label}
        </Label>
        <Textarea
          placeholder={
            app.projectPage.projectFeedback.feedbackDescription.placeholder
          }
          borderColor="border.subtle"
          rows={5}
          minH={32}
        />
      </Stack>

      <Stack justify="space-between" direction="row">
        <Skeleton isLoaded={!isLoading} h="fit-content">
          <Text
            fontSize="sm"
            color="foreground.muted"
          >{`${isError ? 0 : totalCount} ${app.projectPage.projectFeedback.totalResponses}`}</Text>
        </Skeleton>

        <Button
          w="fit-content"
          placeSelf="flex-end"
          // TODO: discuss if disabling this button (mutation) is the right approach if an error is encountered fetching the comments
          disabled={isLoading || isError}
        >
          {app.projectPage.projectFeedback.submit}
        </Button>
      </Stack>
    </>
  );
};

export default CreateFeedback;
