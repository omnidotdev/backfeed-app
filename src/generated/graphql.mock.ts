// @ts-nocheck
import * as Types from './generated';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateCommentMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createComment }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateCommentMutation = (resolver: GraphQLResponseResolver<Types.CreateCommentMutation, Types.CreateCommentMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateCommentMutation, Types.CreateCommentMutationVariables>(
    'CreateComment',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteCommentMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteComment }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteCommentMutation = (resolver: GraphQLResponseResolver<Types.DeleteCommentMutation, Types.DeleteCommentMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteCommentMutation, Types.DeleteCommentMutationVariables>(
    'DeleteComment',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateDownvoteMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createDownvote }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateDownvoteMutation = (resolver: GraphQLResponseResolver<Types.CreateDownvoteMutation, Types.CreateDownvoteMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateDownvoteMutation, Types.CreateDownvoteMutationVariables>(
    'CreateDownvote',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteDownvoteMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteDownvote }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteDownvoteMutation = (resolver: GraphQLResponseResolver<Types.DeleteDownvoteMutation, Types.DeleteDownvoteMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteDownvoteMutation, Types.DeleteDownvoteMutationVariables>(
    'DeleteDownvote',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateOrganizationMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createOrganization }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateOrganizationMutation = (resolver: GraphQLResponseResolver<Types.CreateOrganizationMutation, Types.CreateOrganizationMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateOrganizationMutation, Types.CreateOrganizationMutationVariables>(
    'CreateOrganization',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteOrganizationMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteOrganization }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteOrganizationMutation = (resolver: GraphQLResponseResolver<Types.DeleteOrganizationMutation, Types.DeleteOrganizationMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteOrganizationMutation, Types.DeleteOrganizationMutationVariables>(
    'DeleteOrganization',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLeaveOrganizationMutation(
 *   ({ query, variables }) => {
 *     const { userId, organizationId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteUserOrganizationByUserIdAndOrganizationId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockLeaveOrganizationMutation = (resolver: GraphQLResponseResolver<Types.LeaveOrganizationMutation, Types.LeaveOrganizationMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.LeaveOrganizationMutation, Types.LeaveOrganizationMutationVariables>(
    'LeaveOrganization',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateOrganizationMutation(
 *   ({ query, variables }) => {
 *     const { rowId, patch } = variables;
 *     return HttpResponse.json({
 *       data: { updateOrganization }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateOrganizationMutation = (resolver: GraphQLResponseResolver<Types.UpdateOrganizationMutation, Types.UpdateOrganizationMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateOrganizationMutation, Types.UpdateOrganizationMutationVariables>(
    'UpdateOrganization',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateFeedbackMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createPost }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateFeedbackMutation = (resolver: GraphQLResponseResolver<Types.CreateFeedbackMutation, Types.CreateFeedbackMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateFeedbackMutation, Types.CreateFeedbackMutationVariables>(
    'CreateFeedback',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeletePostMutation(
 *   ({ query, variables }) => {
 *     const { postId } = variables;
 *     return HttpResponse.json({
 *       data: { deletePost }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeletePostMutation = (resolver: GraphQLResponseResolver<Types.DeletePostMutation, Types.DeletePostMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeletePostMutation, Types.DeletePostMutationVariables>(
    'DeletePost',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateProjectMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createProject }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateProjectMutation = (resolver: GraphQLResponseResolver<Types.CreateProjectMutation, Types.CreateProjectMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateProjectMutation, Types.CreateProjectMutationVariables>(
    'CreateProject',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteProjectMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteProject }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteProjectMutation = (resolver: GraphQLResponseResolver<Types.DeleteProjectMutation, Types.DeleteProjectMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteProjectMutation, Types.DeleteProjectMutationVariables>(
    'DeleteProject',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateUpvoteMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createUpvote }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateUpvoteMutation = (resolver: GraphQLResponseResolver<Types.CreateUpvoteMutation, Types.CreateUpvoteMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateUpvoteMutation, Types.CreateUpvoteMutationVariables>(
    'CreateUpvote',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteUpvoteMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteUpvote }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteUpvoteMutation = (resolver: GraphQLResponseResolver<Types.DeleteUpvoteMutation, Types.DeleteUpvoteMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteUpvoteMutation, Types.DeleteUpvoteMutationVariables>(
    'DeleteUpvote',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateUserMutation(
 *   ({ query, variables }) => {
 *     const { hidraId, username, firstName, lastName } = variables;
 *     return HttpResponse.json({
 *       data: { createUser }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateUserMutation = (resolver: GraphQLResponseResolver<Types.CreateUserMutation, Types.CreateUserMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateUserMutation, Types.CreateUserMutationVariables>(
    'CreateUser',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateUserMutation(
 *   ({ query, variables }) => {
 *     const { hidraId, patch } = variables;
 *     return HttpResponse.json({
 *       data: { updateUserByHidraId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateUserMutation = (resolver: GraphQLResponseResolver<Types.UpdateUserMutation, Types.UpdateUserMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateUserMutation, Types.UpdateUserMutationVariables>(
    'UpdateUser',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateUserOrganizationMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createUserOrganization }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateUserOrganizationMutation = (resolver: GraphQLResponseResolver<Types.CreateUserOrganizationMutation, Types.CreateUserOrganizationMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateUserOrganizationMutation, Types.CreateUserOrganizationMutationVariables>(
    'CreateUserOrganization',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCommentsQuery(
 *   ({ query, variables }) => {
 *     const { pageSize, after, feedbackId } = variables;
 *     return HttpResponse.json({
 *       data: { comments }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCommentsQuery = (resolver: GraphQLResponseResolver<Types.CommentsQuery, Types.CommentsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.CommentsQuery, Types.CommentsQueryVariables>(
    'Comments',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDashboardAggregatesQuery(
 *   ({ query, variables }) => {
 *     const { userId } = variables;
 *     return HttpResponse.json({
 *       data: { posts, users }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDashboardAggregatesQuery = (resolver: GraphQLResponseResolver<Types.DashboardAggregatesQuery, Types.DashboardAggregatesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.DashboardAggregatesQuery, Types.DashboardAggregatesQueryVariables>(
    'DashboardAggregates',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDownvoteQuery(
 *   ({ query, variables }) => {
 *     const { userId, feedbackId } = variables;
 *     return HttpResponse.json({
 *       data: { downvoteByPostIdAndUserId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDownvoteQuery = (resolver: GraphQLResponseResolver<Types.DownvoteQuery, Types.DownvoteQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.DownvoteQuery, Types.DownvoteQueryVariables>(
    'Downvote',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockFeedbackByIdQuery(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { post }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockFeedbackByIdQuery = (resolver: GraphQLResponseResolver<Types.FeedbackByIdQuery, Types.FeedbackByIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.FeedbackByIdQuery, Types.FeedbackByIdQueryVariables>(
    'FeedbackById',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockOrganizationQuery(
 *   ({ query, variables }) => {
 *     const { slug } = variables;
 *     return HttpResponse.json({
 *       data: { organizationBySlug }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockOrganizationQuery = (resolver: GraphQLResponseResolver<Types.OrganizationQuery, Types.OrganizationQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.OrganizationQuery, Types.OrganizationQueryVariables>(
    'Organization',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockOrganizationMetricsQuery(
 *   ({ query, variables }) => {
 *     const { organizationId } = variables;
 *     return HttpResponse.json({
 *       data: { projects, posts, userOrganizations }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockOrganizationMetricsQuery = (resolver: GraphQLResponseResolver<Types.OrganizationMetricsQuery, Types.OrganizationMetricsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.OrganizationMetricsQuery, Types.OrganizationMetricsQueryVariables>(
    'OrganizationMetrics',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockOrganizationsQuery(
 *   ({ query, variables }) => {
 *     const { pageSize, offset, orderBy, userId, search, slug } = variables;
 *     return HttpResponse.json({
 *       data: { organizations }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockOrganizationsQuery = (resolver: GraphQLResponseResolver<Types.OrganizationsQuery, Types.OrganizationsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.OrganizationsQuery, Types.OrganizationsQueryVariables>(
    'Organizations',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPostsQuery(
 *   ({ query, variables }) => {
 *     const { projectId, after, pageSize, orderBy } = variables;
 *     return HttpResponse.json({
 *       data: { posts }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockPostsQuery = (resolver: GraphQLResponseResolver<Types.PostsQuery, Types.PostsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.PostsQuery, Types.PostsQueryVariables>(
    'Posts',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockProjectQuery(
 *   ({ query, variables }) => {
 *     const { projectSlug, organizationSlug } = variables;
 *     return HttpResponse.json({
 *       data: { projects }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockProjectQuery = (resolver: GraphQLResponseResolver<Types.ProjectQuery, Types.ProjectQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.ProjectQuery, Types.ProjectQueryVariables>(
    'Project',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockProjectBySlugQuery(
 *   ({ query, variables }) => {
 *     const { slug, organizationId } = variables;
 *     return HttpResponse.json({
 *       data: { projectBySlugAndOrganizationId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockProjectBySlugQuery = (resolver: GraphQLResponseResolver<Types.ProjectBySlugQuery, Types.ProjectBySlugQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.ProjectBySlugQuery, Types.ProjectBySlugQueryVariables>(
    'ProjectBySlug',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockProjectMetricsQuery(
 *   ({ query, variables }) => {
 *     const { projectId } = variables;
 *     return HttpResponse.json({
 *       data: { project, upvotes, downvotes }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockProjectMetricsQuery = (resolver: GraphQLResponseResolver<Types.ProjectMetricsQuery, Types.ProjectMetricsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.ProjectMetricsQuery, Types.ProjectMetricsQueryVariables>(
    'ProjectMetrics',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockProjectsQuery(
 *   ({ query, variables }) => {
 *     const { pageSize, offset, organizationSlug, search } = variables;
 *     return HttpResponse.json({
 *       data: { projects }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockProjectsQuery = (resolver: GraphQLResponseResolver<Types.ProjectsQuery, Types.ProjectsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.ProjectsQuery, Types.ProjectsQueryVariables>(
    'Projects',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockRecentFeedbackQuery(
 *   ({ query, variables }) => {
 *     const { userId } = variables;
 *     return HttpResponse.json({
 *       data: { posts }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockRecentFeedbackQuery = (resolver: GraphQLResponseResolver<Types.RecentFeedbackQuery, Types.RecentFeedbackQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.RecentFeedbackQuery, Types.RecentFeedbackQueryVariables>(
    'RecentFeedback',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpvoteQuery(
 *   ({ query, variables }) => {
 *     const { userId, feedbackId } = variables;
 *     return HttpResponse.json({
 *       data: { upvoteByPostIdAndUserId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpvoteQuery = (resolver: GraphQLResponseResolver<Types.UpvoteQuery, Types.UpvoteQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.UpvoteQuery, Types.UpvoteQueryVariables>(
    'Upvote',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserQuery(
 *   ({ query, variables }) => {
 *     const { hidraId } = variables;
 *     return HttpResponse.json({
 *       data: { userByHidraId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUserQuery = (resolver: GraphQLResponseResolver<Types.UserQuery, Types.UserQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.UserQuery, Types.UserQueryVariables>(
    'User',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWeeklyFeedbackQuery(
 *   ({ query, variables }) => {
 *     const { userId, startDate } = variables;
 *     return HttpResponse.json({
 *       data: { posts }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockWeeklyFeedbackQuery = (resolver: GraphQLResponseResolver<Types.WeeklyFeedbackQuery, Types.WeeklyFeedbackQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.WeeklyFeedbackQuery, Types.WeeklyFeedbackQueryVariables>(
    'WeeklyFeedback',
    resolver,
    options
  )
