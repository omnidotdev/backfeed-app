// @ts-nocheck
import * as Types from './generated';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreatePostMutation(
 *   ({ query, variables }) => {
 *     const { postInput } = variables;
 *     return HttpResponse.json({
 *       data: { createPost }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreatePostMutation = (resolver: GraphQLResponseResolver<Types.CreatePostMutation, Types.CreatePostMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreatePostMutation, Types.CreatePostMutationVariables>(
    'CreatePost',
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
 * mockDeleteUpvoteMutation(
 *   ({ query, variables }) => {
 *     const { upvoteId } = variables;
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
 * mockUpvotePostMutation(
 *   ({ query, variables }) => {
 *     const { upvote } = variables;
 *     return HttpResponse.json({
 *       data: { createUpvote }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpvotePostMutation = (resolver: GraphQLResponseResolver<Types.UpvotePostMutation, Types.UpvotePostMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpvotePostMutation, Types.UpvotePostMutationVariables>(
    'UpvotePost',
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
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { organization }
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
 *     const { pageSize, offset, orderBy, userId, search } = variables;
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
 *     const { projectId, after, pageSize } = variables;
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
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { project }
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
 *     const { pageSize, offset, organizationId, search } = variables;
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
