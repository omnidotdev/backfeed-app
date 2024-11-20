import { Stack, useDisclosure, Button, Grid, Box } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";

import { useDataState } from "lib/hooks";
import { app } from "lib/config";
import { ErrorBoundary, SectionContainer } from "components/layout";
import { CreateFeedbackDialog, Post } from "components/project";
import { SkeletonArray } from "components/core";

import type { ResponseType } from "components/dashboard";

/**
 * Represents a vote on a post.
 */
interface ProjectVote {
  /** Unique identifier for the vote. */
  id: string;
  /** The ID of the post the vote is associated with. */
  postId: string;
  /** The ID of the user who cast the vote. */
  userId: string;
  /** The value of the vote. Positive for upvotes, negative for downvotes. */
  vote: number;
}

/**
 * Represents a post within a project.
 */
export interface ProjectPost {
  /** Unique identifier for the post. */
  id: string;
  /** Title of the post. */
  title: string;
  /** Description providing more details about the post. */
  description: string;
  /** The ID of the project this post belongs to. */
  projectId: string;
  /** The ID of the user who created the post. */
  userId: string;
  /** Timestamp when the post was last updated. */
  lastUpdated: string;
  /** Type of post (e.g., feature request, bug report, etc.). */
  type: ResponseType;

  /** Array of votes associated with the post. */
  upvote: ProjectVote[];
}

const POSTS: ProjectPost[] = [
  {
    id: "b25a9f2e-0b6f-42e4-b2d9-3f8e8e7ec1c1",
    title: "Enhance Mobile UX",
    description: "Ideas and feedback on improving the mobile user experience.",
    projectId: "project1",
    userId: "user1",
    lastUpdated: "2024-11-05T18:40:27.761Z",
    type: "Positive",
    upvote: [
      {
        id: "fd4c8d34-f934-4116-8c96-25af3ec39321",
        postId: "b25a9f2e-0b6f-42e4-b2d9-3f8e8e7ec1c1",
        userId: "user1",
        vote: 5,
      },
    ],
  },
  {
    id: "fb1de8c3-413e-452c-a4d8-98dc7a89f3f2",
    title: "Add Dark Mode",
    description: "Suggestions for implementing a dark mode feature.",
    projectId: "project2",
    userId: "user2",
    lastUpdated: "2024-11-17T18:40:27.761Z",
    type: "Bug",
    upvote: [
      {
        id: "a45fef22-7c2e-44d6-bbe2-8c62796e4b9a",
        postId: "fb1de8c3-413e-452c-a4d8-98dc7a89f3f2",
        userId: "user2",
        vote: -3,
      },
    ],
  },
  {
    id: "c761fb6d-62b3-47b5-b3c1-6572f7e523c2",
    title: "Improve Dashboard Analytics",
    description: "Feedback on analytics display and actionable insights.",
    projectId: "project3",
    userId: "user3",
    lastUpdated: "2024-11-12T18:40:27.761Z",
    type: "Feature",
    upvote: [
      {
        id: "e1a58ec9-9d65-4487-b62e-8f3a58f44b16",
        postId: "c761fb6d-62b3-47b5-b3c1-6572f7e523c2",
        userId: "user3",
        vote: 8,
      },
    ],
  },
  {
    id: "cbe8b752-dc2d-4ad9-b191-6c68a64d5d74",
    title: "Optimize Page Load Times",
    description: "Ideas to make the platform faster and more responsive.",
    projectId: "project4",
    userId: "user4",
    lastUpdated: "2024-11-14T12:00:00.000Z",
    type: "Bug",
    upvote: [
      {
        id: "f4f6df59-47db-4d3c-85e6-1a3f4135781c",
        postId: "cbe8b752-dc2d-4ad9-b191-6c68a64d5d74",
        userId: "user4",
        vote: -1,
      },
    ],
  },
  {
    id: "ab83f88e-59c5-4c9e-b997-09a22f8f81ec",
    title: "Integrate AI Chatbot",
    description:
      "Feedback on how the AI chatbot could enhance customer support.",
    projectId: "project5",
    userId: "user5",
    lastUpdated: "2024-11-16T15:30:00.000Z",
    type: "Positive",
    upvote: [
      {
        id: "3a42c96a-71db-4c8e-a4b1-b83c417758aa",
        postId: "ab83f88e-59c5-4c9e-b997-09a22f8f81ec",
        userId: "user5",
        vote: 0,
      },
    ],
  },
  {
    id: "d2baf2c5-497c-464b-9b91-327ea59202c5",
    title: "Streamline Signup Process",
    description: "Suggestions to simplify the user registration flow.",
    projectId: "project6",
    userId: "user6",
    lastUpdated: "2024-11-10T09:45:00.000Z",
    type: "Feature",
    upvote: [
      {
        id: "8c9e5b41-329f-4b97-9f5d-4bcd7d6e2a22",
        postId: "d2baf2c5-497c-464b-9b91-327ea59202c5",
        userId: "user6",
        vote: 10,
      },
    ],
  },
];

/**
 * Project feedback.
 */
const ProjectFeedback = () => {
  const { isLoading, isError } = useDataState();

  const {
    isOpen: isCreatePostDialogOpen,
    onOpen: onCreatePostDialogOpen,
    onClose: onCreatePostDialogClose,
  } = useDisclosure();

  return (
    <SectionContainer
      // TODO: move to app config
      title={app.projectPage.projectFeedback.title}
      icon={HiOutlineFolder}
      h="100%"
    >
      <Stack h="100%" gap={6}>
        <Button onClick={onCreatePostDialogOpen}>Create Feedback</Button>

        {/* Feed */}
        <Box flex={1} overflow="hidden">
          {isError ? (
            <ErrorBoundary message="Error fetching recent feedback" h={32} />
          ) : (
            <Grid
              // TODO: This scrollarea is not completed.
              maxH="100%"
              overflow="auto"
              // NB: The 1px padding is necessary to prevet clipping of the card borders / box shadows.
              p="1px"
              gap={6}
            >
              {isLoading ? (
                <SkeletonArray count={5} h={32} borderRadius="lg" w="100%" />
              ) : (
                POSTS.map((post) => <Post key={post.id} post={post} />)
              )}
            </Grid>
          )}
        </Box>
      </Stack>

      <CreateFeedbackDialog
        isOpen={isCreatePostDialogOpen}
        onClose={onCreatePostDialogClose}
        onOpen={onCreatePostDialogOpen}
        projectId=""
      />
    </SectionContainer>
  );
};

export default ProjectFeedback;
