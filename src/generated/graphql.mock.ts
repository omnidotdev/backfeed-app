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
 * mockCreateInvitationMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createInvitation }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateInvitationMutation = (resolver: GraphQLResponseResolver<Types.CreateInvitationMutation, Types.CreateInvitationMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateInvitationMutation, Types.CreateInvitationMutationVariables>(
    'CreateInvitation',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteInvitationMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteInvitation }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteInvitationMutation = (resolver: GraphQLResponseResolver<Types.DeleteInvitationMutation, Types.DeleteInvitationMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteInvitationMutation, Types.DeleteInvitationMutationVariables>(
    'DeleteInvitation',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateMemberMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createMember }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateMemberMutation = (resolver: GraphQLResponseResolver<Types.CreateMemberMutation, Types.CreateMemberMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateMemberMutation, Types.CreateMemberMutationVariables>(
    'CreateMember',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockRemoveMemberMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteMember }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockRemoveMemberMutation = (resolver: GraphQLResponseResolver<Types.RemoveMemberMutation, Types.RemoveMemberMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.RemoveMemberMutation, Types.RemoveMemberMutationVariables>(
    'RemoveMember',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateMemberMutation(
 *   ({ query, variables }) => {
 *     const { rowId, patch } = variables;
 *     return HttpResponse.json({
 *       data: { updateMember }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateMemberMutation = (resolver: GraphQLResponseResolver<Types.UpdateMemberMutation, Types.UpdateMemberMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateMemberMutation, Types.UpdateMemberMutationVariables>(
    'UpdateMember',
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
 * mockUpdatePostMutation(
 *   ({ query, variables }) => {
 *     const { rowId, patch } = variables;
 *     return HttpResponse.json({
 *       data: { updatePost }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdatePostMutation = (resolver: GraphQLResponseResolver<Types.UpdatePostMutation, Types.UpdatePostMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdatePostMutation, Types.UpdatePostMutationVariables>(
    'UpdatePost',
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
 * mockUpdateProjectMutation(
 *   ({ query, variables }) => {
 *     const { rowId, patch } = variables;
 *     return HttpResponse.json({
 *       data: { updateProject }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateProjectMutation = (resolver: GraphQLResponseResolver<Types.UpdateProjectMutation, Types.UpdateProjectMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateProjectMutation, Types.UpdateProjectMutationVariables>(
    'UpdateProject',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateProjectSocialMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createProjectSocial }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateProjectSocialMutation = (resolver: GraphQLResponseResolver<Types.CreateProjectSocialMutation, Types.CreateProjectSocialMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateProjectSocialMutation, Types.CreateProjectSocialMutationVariables>(
    'CreateProjectSocial',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteProjectSocialMutation(
 *   ({ query, variables }) => {
 *     const { socialId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteProjectSocial }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteProjectSocialMutation = (resolver: GraphQLResponseResolver<Types.DeleteProjectSocialMutation, Types.DeleteProjectSocialMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteProjectSocialMutation, Types.DeleteProjectSocialMutationVariables>(
    'DeleteProjectSocial',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateProjectStatusConfigMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createProjectStatusConfig }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateProjectStatusConfigMutation = (resolver: GraphQLResponseResolver<Types.CreateProjectStatusConfigMutation, Types.CreateProjectStatusConfigMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateProjectStatusConfigMutation, Types.CreateProjectStatusConfigMutationVariables>(
    'CreateProjectStatusConfig',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteProjectStatusConfigMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteProjectStatusConfig }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteProjectStatusConfigMutation = (resolver: GraphQLResponseResolver<Types.DeleteProjectStatusConfigMutation, Types.DeleteProjectStatusConfigMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteProjectStatusConfigMutation, Types.DeleteProjectStatusConfigMutationVariables>(
    'DeleteProjectStatusConfig',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateProjectStatusConfigMutation(
 *   ({ query, variables }) => {
 *     const { rowId, patch } = variables;
 *     return HttpResponse.json({
 *       data: { updateProjectStatusConfig }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateProjectStatusConfigMutation = (resolver: GraphQLResponseResolver<Types.UpdateProjectStatusConfigMutation, Types.UpdateProjectStatusConfigMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateProjectStatusConfigMutation, Types.UpdateProjectStatusConfigMutationVariables>(
    'UpdateProjectStatusConfig',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateStatusTemplateMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createStatusTemplate }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateStatusTemplateMutation = (resolver: GraphQLResponseResolver<Types.CreateStatusTemplateMutation, Types.CreateStatusTemplateMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateStatusTemplateMutation, Types.CreateStatusTemplateMutationVariables>(
    'CreateStatusTemplate',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteStatusTemplateMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteStatusTemplate }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteStatusTemplateMutation = (resolver: GraphQLResponseResolver<Types.DeleteStatusTemplateMutation, Types.DeleteStatusTemplateMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteStatusTemplateMutation, Types.DeleteStatusTemplateMutationVariables>(
    'DeleteStatusTemplate',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateStatusTemplateMutation(
 *   ({ query, variables }) => {
 *     const { rowId, patch } = variables;
 *     return HttpResponse.json({
 *       data: { updateStatusTemplate }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateStatusTemplateMutation = (resolver: GraphQLResponseResolver<Types.UpdateStatusTemplateMutation, Types.UpdateStatusTemplateMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateStatusTemplateMutation, Types.UpdateStatusTemplateMutationVariables>(
    'UpdateStatusTemplate',
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
 *     const { identityProviderId, username, firstName, lastName, email } = variables;
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
 * mockCreateVoteMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createVote }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateVoteMutation = (resolver: GraphQLResponseResolver<Types.CreateVoteMutation, Types.CreateVoteMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateVoteMutation, Types.CreateVoteMutationVariables>(
    'CreateVote',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteVoteMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteVote }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteVoteMutation = (resolver: GraphQLResponseResolver<Types.DeleteVoteMutation, Types.DeleteVoteMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteVoteMutation, Types.DeleteVoteMutationVariables>(
    'DeleteVote',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateVoteMutation(
 *   ({ query, variables }) => {
 *     const { rowId, patch } = variables;
 *     return HttpResponse.json({
 *       data: { updateVote }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateVoteMutation = (resolver: GraphQLResponseResolver<Types.UpdateVoteMutation, Types.UpdateVoteMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateVoteMutation, Types.UpdateVoteMutationVariables>(
    'UpdateVote',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateWorkspaceMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createWorkspace }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateWorkspaceMutation = (resolver: GraphQLResponseResolver<Types.CreateWorkspaceMutation, Types.CreateWorkspaceMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateWorkspaceMutation, Types.CreateWorkspaceMutationVariables>(
    'CreateWorkspace',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteWorkspaceMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteWorkspace }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteWorkspaceMutation = (resolver: GraphQLResponseResolver<Types.DeleteWorkspaceMutation, Types.DeleteWorkspaceMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteWorkspaceMutation, Types.DeleteWorkspaceMutationVariables>(
    'DeleteWorkspace',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLeaveWorkspaceMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteMember }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockLeaveWorkspaceMutation = (resolver: GraphQLResponseResolver<Types.LeaveWorkspaceMutation, Types.LeaveWorkspaceMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.LeaveWorkspaceMutation, Types.LeaveWorkspaceMutationVariables>(
    'LeaveWorkspace',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateWorkspaceMutation(
 *   ({ query, variables }) => {
 *     const { rowId, patch } = variables;
 *     return HttpResponse.json({
 *       data: { updateWorkspace }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateWorkspaceMutation = (resolver: GraphQLResponseResolver<Types.UpdateWorkspaceMutation, Types.UpdateWorkspaceMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateWorkspaceMutation, Types.UpdateWorkspaceMutationVariables>(
    'UpdateWorkspace',
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
 *     const { feedbackId, pageSize, after } = variables;
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
 *     const { rowId, userId } = variables;
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
 * mockInvitationsQuery(
 *   ({ query, variables }) => {
 *     const { email, workspaceId } = variables;
 *     return HttpResponse.json({
 *       data: { invitations }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockInvitationsQuery = (resolver: GraphQLResponseResolver<Types.InvitationsQuery, Types.InvitationsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.InvitationsQuery, Types.InvitationsQueryVariables>(
    'Invitations',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMembersQuery(
 *   ({ query, variables }) => {
 *     const { workspaceId, roles, search, excludeRoles } = variables;
 *     return HttpResponse.json({
 *       data: { members }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockMembersQuery = (resolver: GraphQLResponseResolver<Types.MembersQuery, Types.MembersQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.MembersQuery, Types.MembersQueryVariables>(
    'Members',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockNotificationsQuery(
 *   ({ query, variables }) => {
 *     const { email } = variables;
 *     return HttpResponse.json({
 *       data: { invitations }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockNotificationsQuery = (resolver: GraphQLResponseResolver<Types.NotificationsQuery, Types.NotificationsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.NotificationsQuery, Types.NotificationsQueryVariables>(
    'Notifications',
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
 *     const { projectId, after, pageSize, orderBy, excludedStatuses, search, userId } = variables;
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
 *     const { projectSlug, workspaceSlug, userId } = variables;
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
 *     const { slug, workspaceId } = variables;
 *     return HttpResponse.json({
 *       data: { projectBySlugAndWorkspaceId }
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
 *       data: { project, votes, votes }
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
 * mockProjectStatusesQuery(
 *   ({ query, variables }) => {
 *     const { workspaceId, isEnabled } = variables;
 *     return HttpResponse.json({
 *       data: { statusTemplates, projectStatusConfigs }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockProjectStatusesQuery = (resolver: GraphQLResponseResolver<Types.ProjectStatusesQuery, Types.ProjectStatusesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.ProjectStatusesQuery, Types.ProjectStatusesQueryVariables>(
    'ProjectStatuses',
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
 *     const { pageSize, offset, workspaceSlug, search } = variables;
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
 *     const { userId, after } = variables;
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
 * mockRepliesQuery(
 *   ({ query, variables }) => {
 *     const { commentId, pageSize, after } = variables;
 *     return HttpResponse.json({
 *       data: { comments }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockRepliesQuery = (resolver: GraphQLResponseResolver<Types.RepliesQuery, Types.RepliesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.RepliesQuery, Types.RepliesQueryVariables>(
    'Replies',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStatusBreakdownQuery(
 *   ({ query, variables }) => {
 *     const { projectId } = variables;
 *     return HttpResponse.json({
 *       data: { posts }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockStatusBreakdownQuery = (resolver: GraphQLResponseResolver<Types.StatusBreakdownQuery, Types.StatusBreakdownQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.StatusBreakdownQuery, Types.StatusBreakdownQueryVariables>(
    'StatusBreakdown',
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
 *     const { identityProviderId } = variables;
 *     return HttpResponse.json({
 *       data: { userByIdentityProviderId }
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
 * mockUserByEmailQuery(
 *   ({ query, variables }) => {
 *     const { email } = variables;
 *     return HttpResponse.json({
 *       data: { userByEmail }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUserByEmailQuery = (resolver: GraphQLResponseResolver<Types.UserByEmailQuery, Types.UserByEmailQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.UserByEmailQuery, Types.UserByEmailQueryVariables>(
    'userByEmail',
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

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkspaceQuery(
 *   ({ query, variables }) => {
 *     const { slug } = variables;
 *     return HttpResponse.json({
 *       data: { workspaceBySlug }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockWorkspaceQuery = (resolver: GraphQLResponseResolver<Types.WorkspaceQuery, Types.WorkspaceQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.WorkspaceQuery, Types.WorkspaceQueryVariables>(
    'Workspace',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkspaceMetricsQuery(
 *   ({ query, variables }) => {
 *     const { workspaceId } = variables;
 *     return HttpResponse.json({
 *       data: { projects, posts, members }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockWorkspaceMetricsQuery = (resolver: GraphQLResponseResolver<Types.WorkspaceMetricsQuery, Types.WorkspaceMetricsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.WorkspaceMetricsQuery, Types.WorkspaceMetricsQueryVariables>(
    'WorkspaceMetrics',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkspaceRoleQuery(
 *   ({ query, variables }) => {
 *     const { userId, workspaceId } = variables;
 *     return HttpResponse.json({
 *       data: { memberByUserIdAndWorkspaceId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockWorkspaceRoleQuery = (resolver: GraphQLResponseResolver<Types.WorkspaceRoleQuery, Types.WorkspaceRoleQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.WorkspaceRoleQuery, Types.WorkspaceRoleQueryVariables>(
    'WorkspaceRole',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkspacesQuery(
 *   ({ query, variables }) => {
 *     const { pageSize, offset, orderBy, isMember, userId, excludeRoles, search, slug, workspaceId } = variables;
 *     return HttpResponse.json({
 *       data: { workspaces }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockWorkspacesQuery = (resolver: GraphQLResponseResolver<Types.WorkspacesQuery, Types.WorkspacesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.WorkspacesQuery, Types.WorkspacesQueryVariables>(
    'Workspaces',
    resolver,
    options
  )
