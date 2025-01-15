import {
  useCreateCommentMutation,
  useCreateDownvoteMutation,
  useCreateFeedbackMutation,
  useCreateProjectMutation,
  useCreateUpvoteMutation,
  useDeleteCommentMutation,
} from "generated/graphql";

const PROJECT_MUTATION_KEY = ["project"];
export const CREATE_PROJECT_MUTATION_KEY = [
  ...PROJECT_MUTATION_KEY,
  ...useCreateProjectMutation.getKey(),
];

const FEEDBACK_MUTATION_KEY = ["feedback"];
export const CREATE_FEEDBACK_MUTATION_KEY = [
  ...FEEDBACK_MUTATION_KEY,
  ...useCreateFeedbackMutation.getKey(),
];
export const CREATE_DOWNVOTE_MUTATION_KEY = [
  ...FEEDBACK_MUTATION_KEY,
  ...useCreateDownvoteMutation.getKey(),
];
export const CREATE_UPVOTE_MUTATION_KEY = [
  ...FEEDBACK_MUTATION_KEY,
  ...useCreateUpvoteMutation.getKey(),
];
export const DELETE_DOWNVOTE_MUTATION_KEY = [
  ...FEEDBACK_MUTATION_KEY,
  ...useCreateDownvoteMutation.getKey(),
];
export const DELETE_UPVOTE_MUTATION_KEY = [
  ...FEEDBACK_MUTATION_KEY,
  ...useCreateUpvoteMutation.getKey(),
];

const COMMENT_MUTATION_KEY = ["comment"];
export const CREATE_COMMENT_MUTATION_KEY = [
  ...COMMENT_MUTATION_KEY,
  ...useCreateCommentMutation.getKey(),
];
export const DELETE_COMMENT_MUTATION_KEY = [
  ...COMMENT_MUTATION_KEY,
  ...useDeleteCommentMutation.getKey(),
];
