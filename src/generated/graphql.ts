// @ts-nocheck
import { useMutation, useQuery, useInfiniteQuery, UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { graphqlFetch } from 'lib/graphql/graphqlFetch';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: string; output: string; }
  Cursor: { input: string; output: string; }
  Datetime: { input: Date; output: Date; }
  UUID: { input: string; output: string; }
};

/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export type BigIntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigInt']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigInt']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigInt']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigInt']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type Comment = {
  __typename?: 'Comment';
  /** Reads and enables pagination through a set of `Comment`. */
  childComments: CommentConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Comment` that is related to this `Comment`. */
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `Post` that is related to this `Comment`. */
  post?: Maybe<Post>;
  postId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `User` that is related to this `Comment`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};


export type CommentChildCommentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CommentCondition>;
  filter?: InputMaybe<CommentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CommentOrderBy>>;
};

export type CommentAggregates = {
  __typename?: 'CommentAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<CommentDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Comment` object types. */
export type CommentAggregatesFilter = {
  /** Distinct count aggregate over matching `Comment` objects. */
  distinctCount?: InputMaybe<CommentDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Comment` object to be included within the aggregate. */
  filter?: InputMaybe<CommentFilter>;
};

/** A condition to be used against `Comment` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type CommentCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `message` field. */
  message?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `parentId` field. */
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `postId` field. */
  postId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Comment` values. */
export type CommentConnection = {
  __typename?: 'CommentConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<CommentAggregates>;
  /** A list of edges which contains the `Comment` and cursor to aid in pagination. */
  edges: Array<Maybe<CommentEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<CommentAggregates>>;
  /** A list of `Comment` objects. */
  nodes: Array<Maybe<Comment>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Comment` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Comment` values. */
export type CommentConnectionGroupedAggregatesArgs = {
  groupBy: Array<CommentGroupBy>;
  having?: InputMaybe<CommentHavingInput>;
};

export type CommentDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  message?: InputMaybe<BigIntFilter>;
  parentId?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
};

export type CommentDistinctCountAggregates = {
  __typename?: 'CommentDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of message across the matching connection */
  message?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of parentId across the matching connection */
  parentId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of postId across the matching connection */
  postId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of userId across the matching connection */
  userId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Comment` edge in the connection. */
export type CommentEdge = {
  __typename?: 'CommentEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Comment` at the end of the edge. */
  node?: Maybe<Comment>;
};

/** A filter to be used against `Comment` object types. All fields are combined with a logical ‘and.’ */
export type CommentFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CommentFilter>>;
  /** Filter by the object’s `childComments` relation. */
  childComments?: InputMaybe<CommentToManyCommentFilter>;
  /** Some related `childComments` exist. */
  childCommentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `message` field. */
  message?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CommentFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CommentFilter>>;
  /** Filter by the object’s `parent` relation. */
  parent?: InputMaybe<CommentFilter>;
  /** A related `parent` exists. */
  parentExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `parentId` field. */
  parentId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `post` relation. */
  post?: InputMaybe<PostFilter>;
  /** Filter by the object’s `postId` field. */
  postId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Comment` for usage during aggregation. */
export enum CommentGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Message = 'MESSAGE',
  ParentId = 'PARENT_ID',
  PostId = 'POST_ID',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  UserId = 'USER_ID'
}

export type CommentHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CommentHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Comment` aggregates. */
export type CommentHavingInput = {
  AND?: InputMaybe<Array<CommentHavingInput>>;
  OR?: InputMaybe<Array<CommentHavingInput>>;
  average?: InputMaybe<CommentHavingAverageInput>;
  distinctCount?: InputMaybe<CommentHavingDistinctCountInput>;
  max?: InputMaybe<CommentHavingMaxInput>;
  min?: InputMaybe<CommentHavingMinInput>;
  stddevPopulation?: InputMaybe<CommentHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<CommentHavingStddevSampleInput>;
  sum?: InputMaybe<CommentHavingSumInput>;
  variancePopulation?: InputMaybe<CommentHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<CommentHavingVarianceSampleInput>;
};

export type CommentHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CommentHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CommentHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CommentHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CommentHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CommentHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CommentHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Comment` */
export type CommentInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  postId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Comment`. */
export enum CommentOrderBy {
  ChildCommentsCountAsc = 'CHILD_COMMENTS_COUNT_ASC',
  ChildCommentsCountDesc = 'CHILD_COMMENTS_COUNT_DESC',
  ChildCommentsDistinctCountCreatedAtAsc = 'CHILD_COMMENTS_DISTINCT_COUNT_CREATED_AT_ASC',
  ChildCommentsDistinctCountCreatedAtDesc = 'CHILD_COMMENTS_DISTINCT_COUNT_CREATED_AT_DESC',
  ChildCommentsDistinctCountMessageAsc = 'CHILD_COMMENTS_DISTINCT_COUNT_MESSAGE_ASC',
  ChildCommentsDistinctCountMessageDesc = 'CHILD_COMMENTS_DISTINCT_COUNT_MESSAGE_DESC',
  ChildCommentsDistinctCountParentIdAsc = 'CHILD_COMMENTS_DISTINCT_COUNT_PARENT_ID_ASC',
  ChildCommentsDistinctCountParentIdDesc = 'CHILD_COMMENTS_DISTINCT_COUNT_PARENT_ID_DESC',
  ChildCommentsDistinctCountPostIdAsc = 'CHILD_COMMENTS_DISTINCT_COUNT_POST_ID_ASC',
  ChildCommentsDistinctCountPostIdDesc = 'CHILD_COMMENTS_DISTINCT_COUNT_POST_ID_DESC',
  ChildCommentsDistinctCountRowIdAsc = 'CHILD_COMMENTS_DISTINCT_COUNT_ROW_ID_ASC',
  ChildCommentsDistinctCountRowIdDesc = 'CHILD_COMMENTS_DISTINCT_COUNT_ROW_ID_DESC',
  ChildCommentsDistinctCountUpdatedAtAsc = 'CHILD_COMMENTS_DISTINCT_COUNT_UPDATED_AT_ASC',
  ChildCommentsDistinctCountUpdatedAtDesc = 'CHILD_COMMENTS_DISTINCT_COUNT_UPDATED_AT_DESC',
  ChildCommentsDistinctCountUserIdAsc = 'CHILD_COMMENTS_DISTINCT_COUNT_USER_ID_ASC',
  ChildCommentsDistinctCountUserIdDesc = 'CHILD_COMMENTS_DISTINCT_COUNT_USER_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  MessageAsc = 'MESSAGE_ASC',
  MessageDesc = 'MESSAGE_DESC',
  Natural = 'NATURAL',
  ParentIdAsc = 'PARENT_ID_ASC',
  ParentIdDesc = 'PARENT_ID_DESC',
  PostIdAsc = 'POST_ID_ASC',
  PostIdDesc = 'POST_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `Comment`. Fields that are set will be updated. */
export type CommentPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  postId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A filter to be used against many `Comment` object types. All fields are combined with a logical ‘and.’ */
export type CommentToManyCommentFilter = {
  /** Aggregates across related `Comment` match the filter criteria. */
  aggregates?: InputMaybe<CommentAggregatesFilter>;
  /** Every related `Comment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CommentFilter>;
  /** No related `Comment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CommentFilter>;
  /** Some related `Comment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CommentFilter>;
};

/** All input for the create `Comment` mutation. */
export type CreateCommentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Comment` to be created by this mutation. */
  comment: CommentInput;
};

/** The output of our create `Comment` mutation. */
export type CreateCommentPayload = {
  __typename?: 'CreateCommentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Comment` that was created by this mutation. */
  comment?: Maybe<Comment>;
  /** An edge for our `Comment`. May be used by Relay 1. */
  commentEdge?: Maybe<CommentEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Comment` mutation. */
export type CreateCommentPayloadCommentEdgeArgs = {
  orderBy?: Array<CommentOrderBy>;
};

/** All input for the create `Downvote` mutation. */
export type CreateDownvoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Downvote` to be created by this mutation. */
  downvote: DownvoteInput;
};

/** The output of our create `Downvote` mutation. */
export type CreateDownvotePayload = {
  __typename?: 'CreateDownvotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Downvote` that was created by this mutation. */
  downvote?: Maybe<Downvote>;
  /** An edge for our `Downvote`. May be used by Relay 1. */
  downvoteEdge?: Maybe<DownvoteEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Downvote` mutation. */
export type CreateDownvotePayloadDownvoteEdgeArgs = {
  orderBy?: Array<DownvoteOrderBy>;
};

/** All input for the create `Invitation` mutation. */
export type CreateInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Invitation` to be created by this mutation. */
  invitation: InvitationInput;
};

/** The output of our create `Invitation` mutation. */
export type CreateInvitationPayload = {
  __typename?: 'CreateInvitationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Invitation` that was created by this mutation. */
  invitation?: Maybe<Invitation>;
  /** An edge for our `Invitation`. May be used by Relay 1. */
  invitationEdge?: Maybe<InvitationEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Invitation` mutation. */
export type CreateInvitationPayloadInvitationEdgeArgs = {
  orderBy?: Array<InvitationOrderBy>;
};

/** All input for the create `Member` mutation. */
export type CreateMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Member` to be created by this mutation. */
  member: MemberInput;
};

/** The output of our create `Member` mutation. */
export type CreateMemberPayload = {
  __typename?: 'CreateMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Member` that was created by this mutation. */
  member?: Maybe<Member>;
  /** An edge for our `Member`. May be used by Relay 1. */
  memberEdge?: Maybe<MemberEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Member` mutation. */
export type CreateMemberPayloadMemberEdgeArgs = {
  orderBy?: Array<MemberOrderBy>;
};

/** All input for the create `Organization` mutation. */
export type CreateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Organization` to be created by this mutation. */
  organization: OrganizationInput;
};

/** The output of our create `Organization` mutation. */
export type CreateOrganizationPayload = {
  __typename?: 'CreateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Organization` that was created by this mutation. */
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Organization` mutation. */
export type CreateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Array<OrganizationOrderBy>;
};

/** All input for the create `Post` mutation. */
export type CreatePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Post` to be created by this mutation. */
  post: PostInput;
};

/** The output of our create `Post` mutation. */
export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Post` that was created by this mutation. */
  post?: Maybe<Post>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Post` mutation. */
export type CreatePostPayloadPostEdgeArgs = {
  orderBy?: Array<PostOrderBy>;
};

/** All input for the create `PostStatus` mutation. */
export type CreatePostStatusInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PostStatus` to be created by this mutation. */
  postStatus: PostStatusInput;
};

/** The output of our create `PostStatus` mutation. */
export type CreatePostStatusPayload = {
  __typename?: 'CreatePostStatusPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `PostStatus` that was created by this mutation. */
  postStatus?: Maybe<PostStatus>;
  /** An edge for our `PostStatus`. May be used by Relay 1. */
  postStatusEdge?: Maybe<PostStatusEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PostStatus` mutation. */
export type CreatePostStatusPayloadPostStatusEdgeArgs = {
  orderBy?: Array<PostStatusOrderBy>;
};

/** All input for the create `Project` mutation. */
export type CreateProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Project` to be created by this mutation. */
  project: ProjectInput;
};

/** The output of our create `Project` mutation. */
export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Project` that was created by this mutation. */
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Project` mutation. */
export type CreateProjectPayloadProjectEdgeArgs = {
  orderBy?: Array<ProjectOrderBy>;
};

/** All input for the create `Upvote` mutation. */
export type CreateUpvoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Upvote` to be created by this mutation. */
  upvote: UpvoteInput;
};

/** The output of our create `Upvote` mutation. */
export type CreateUpvotePayload = {
  __typename?: 'CreateUpvotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Upvote` that was created by this mutation. */
  upvote?: Maybe<Upvote>;
  /** An edge for our `Upvote`. May be used by Relay 1. */
  upvoteEdge?: Maybe<UpvoteEdge>;
};


/** The output of our create `Upvote` mutation. */
export type CreateUpvotePayloadUpvoteEdgeArgs = {
  orderBy?: Array<UpvoteOrderBy>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UserEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Array<UserOrderBy>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

/** All input for the `deleteComment` mutation. */
export type DeleteCommentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Comment` mutation. */
export type DeleteCommentPayload = {
  __typename?: 'DeleteCommentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Comment` that was deleted by this mutation. */
  comment?: Maybe<Comment>;
  /** An edge for our `Comment`. May be used by Relay 1. */
  commentEdge?: Maybe<CommentEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Comment` mutation. */
export type DeleteCommentPayloadCommentEdgeArgs = {
  orderBy?: Array<CommentOrderBy>;
};

/** All input for the `deleteDownvote` mutation. */
export type DeleteDownvoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Downvote` mutation. */
export type DeleteDownvotePayload = {
  __typename?: 'DeleteDownvotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Downvote` that was deleted by this mutation. */
  downvote?: Maybe<Downvote>;
  /** An edge for our `Downvote`. May be used by Relay 1. */
  downvoteEdge?: Maybe<DownvoteEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Downvote` mutation. */
export type DeleteDownvotePayloadDownvoteEdgeArgs = {
  orderBy?: Array<DownvoteOrderBy>;
};

/** All input for the `deleteInvitation` mutation. */
export type DeleteInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Invitation` mutation. */
export type DeleteInvitationPayload = {
  __typename?: 'DeleteInvitationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Invitation` that was deleted by this mutation. */
  invitation?: Maybe<Invitation>;
  /** An edge for our `Invitation`. May be used by Relay 1. */
  invitationEdge?: Maybe<InvitationEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Invitation` mutation. */
export type DeleteInvitationPayloadInvitationEdgeArgs = {
  orderBy?: Array<InvitationOrderBy>;
};

/** All input for the `deleteMember` mutation. */
export type DeleteMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Member` mutation. */
export type DeleteMemberPayload = {
  __typename?: 'DeleteMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Member` that was deleted by this mutation. */
  member?: Maybe<Member>;
  /** An edge for our `Member`. May be used by Relay 1. */
  memberEdge?: Maybe<MemberEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Member` mutation. */
export type DeleteMemberPayloadMemberEdgeArgs = {
  orderBy?: Array<MemberOrderBy>;
};

/** All input for the `deleteOrganization` mutation. */
export type DeleteOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Organization` mutation. */
export type DeleteOrganizationPayload = {
  __typename?: 'DeleteOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Organization` that was deleted by this mutation. */
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Organization` mutation. */
export type DeleteOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Array<OrganizationOrderBy>;
};

/** All input for the `deletePost` mutation. */
export type DeletePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Post` mutation. */
export type DeletePostPayload = {
  __typename?: 'DeletePostPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Post` that was deleted by this mutation. */
  post?: Maybe<Post>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Post` mutation. */
export type DeletePostPayloadPostEdgeArgs = {
  orderBy?: Array<PostOrderBy>;
};

/** All input for the `deletePostStatus` mutation. */
export type DeletePostStatusInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `PostStatus` mutation. */
export type DeletePostStatusPayload = {
  __typename?: 'DeletePostStatusPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `PostStatus` that was deleted by this mutation. */
  postStatus?: Maybe<PostStatus>;
  /** An edge for our `PostStatus`. May be used by Relay 1. */
  postStatusEdge?: Maybe<PostStatusEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PostStatus` mutation. */
export type DeletePostStatusPayloadPostStatusEdgeArgs = {
  orderBy?: Array<PostStatusOrderBy>;
};

/** All input for the `deleteProject` mutation. */
export type DeleteProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Project` mutation. */
export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Project` that was deleted by this mutation. */
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Project` mutation. */
export type DeleteProjectPayloadProjectEdgeArgs = {
  orderBy?: Array<ProjectOrderBy>;
};

/** All input for the `deleteUpvote` mutation. */
export type DeleteUpvoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Upvote` mutation. */
export type DeleteUpvotePayload = {
  __typename?: 'DeleteUpvotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Upvote` that was deleted by this mutation. */
  upvote?: Maybe<Upvote>;
  /** An edge for our `Upvote`. May be used by Relay 1. */
  upvoteEdge?: Maybe<UpvoteEdge>;
};


/** The output of our delete `Upvote` mutation. */
export type DeleteUpvotePayloadUpvoteEdgeArgs = {
  orderBy?: Array<UpvoteOrderBy>;
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UserEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Array<UserOrderBy>;
};

export type Downvote = {
  __typename?: 'Downvote';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Post` that is related to this `Downvote`. */
  post?: Maybe<Post>;
  postId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `User` that is related to this `Downvote`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};

export type DownvoteAggregates = {
  __typename?: 'DownvoteAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<DownvoteDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Downvote` object types. */
export type DownvoteAggregatesFilter = {
  /** Distinct count aggregate over matching `Downvote` objects. */
  distinctCount?: InputMaybe<DownvoteDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Downvote` object to be included within the aggregate. */
  filter?: InputMaybe<DownvoteFilter>;
};

/**
 * A condition to be used against `Downvote` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type DownvoteCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `postId` field. */
  postId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Downvote` values. */
export type DownvoteConnection = {
  __typename?: 'DownvoteConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<DownvoteAggregates>;
  /** A list of edges which contains the `Downvote` and cursor to aid in pagination. */
  edges: Array<Maybe<DownvoteEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<DownvoteAggregates>>;
  /** A list of `Downvote` objects. */
  nodes: Array<Maybe<Downvote>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Downvote` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Downvote` values. */
export type DownvoteConnectionGroupedAggregatesArgs = {
  groupBy: Array<DownvoteGroupBy>;
  having?: InputMaybe<DownvoteHavingInput>;
};

export type DownvoteDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
};

export type DownvoteDistinctCountAggregates = {
  __typename?: 'DownvoteDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of postId across the matching connection */
  postId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of userId across the matching connection */
  userId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Downvote` edge in the connection. */
export type DownvoteEdge = {
  __typename?: 'DownvoteEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Downvote` at the end of the edge. */
  node?: Maybe<Downvote>;
};

/** A filter to be used against `Downvote` object types. All fields are combined with a logical ‘and.’ */
export type DownvoteFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<DownvoteFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<DownvoteFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<DownvoteFilter>>;
  /** Filter by the object’s `post` relation. */
  post?: InputMaybe<PostFilter>;
  /** Filter by the object’s `postId` field. */
  postId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Downvote` for usage during aggregation. */
export enum DownvoteGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  PostId = 'POST_ID',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  UserId = 'USER_ID'
}

export type DownvoteHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DownvoteHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Downvote` aggregates. */
export type DownvoteHavingInput = {
  AND?: InputMaybe<Array<DownvoteHavingInput>>;
  OR?: InputMaybe<Array<DownvoteHavingInput>>;
  average?: InputMaybe<DownvoteHavingAverageInput>;
  distinctCount?: InputMaybe<DownvoteHavingDistinctCountInput>;
  max?: InputMaybe<DownvoteHavingMaxInput>;
  min?: InputMaybe<DownvoteHavingMinInput>;
  stddevPopulation?: InputMaybe<DownvoteHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<DownvoteHavingStddevSampleInput>;
  sum?: InputMaybe<DownvoteHavingSumInput>;
  variancePopulation?: InputMaybe<DownvoteHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<DownvoteHavingVarianceSampleInput>;
};

export type DownvoteHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DownvoteHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DownvoteHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DownvoteHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DownvoteHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DownvoteHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DownvoteHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Downvote` */
export type DownvoteInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  postId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Downvote`. */
export enum DownvoteOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  PostIdAsc = 'POST_ID_ASC',
  PostIdDesc = 'POST_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `Downvote`. Fields that are set will be updated. */
export type DownvotePatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  postId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type HavingDatetimeFilter = {
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Invitation = {
  __typename?: 'Invitation';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  email: Scalars['String']['output'];
  /** Reads a single `Organization` that is related to this `Invitation`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

export type InvitationAggregates = {
  __typename?: 'InvitationAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<InvitationDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Invitation` object types. */
export type InvitationAggregatesFilter = {
  /** Distinct count aggregate over matching `Invitation` objects. */
  distinctCount?: InputMaybe<InvitationDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Invitation` object to be included within the aggregate. */
  filter?: InputMaybe<InvitationFilter>;
};

/**
 * A condition to be used against `Invitation` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type InvitationCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `Invitation` values. */
export type InvitationConnection = {
  __typename?: 'InvitationConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<InvitationAggregates>;
  /** A list of edges which contains the `Invitation` and cursor to aid in pagination. */
  edges: Array<Maybe<InvitationEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<InvitationAggregates>>;
  /** A list of `Invitation` objects. */
  nodes: Array<Maybe<Invitation>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Invitation` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Invitation` values. */
export type InvitationConnectionGroupedAggregatesArgs = {
  groupBy: Array<InvitationGroupBy>;
  having?: InputMaybe<InvitationHavingInput>;
};

export type InvitationDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  email?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
};

export type InvitationDistinctCountAggregates = {
  __typename?: 'InvitationDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of email across the matching connection */
  email?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Invitation` edge in the connection. */
export type InvitationEdge = {
  __typename?: 'InvitationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Invitation` at the end of the edge. */
  node?: Maybe<Invitation>;
};

/** A filter to be used against `Invitation` object types. All fields are combined with a logical ‘and.’ */
export type InvitationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<InvitationFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<InvitationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<InvitationFilter>>;
  /** Filter by the object’s `organization` relation. */
  organization?: InputMaybe<OrganizationFilter>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `Invitation` for usage during aggregation. */
export enum InvitationGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Email = 'EMAIL',
  OrganizationId = 'ORGANIZATION_ID',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type InvitationHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Invitation` aggregates. */
export type InvitationHavingInput = {
  AND?: InputMaybe<Array<InvitationHavingInput>>;
  OR?: InputMaybe<Array<InvitationHavingInput>>;
  average?: InputMaybe<InvitationHavingAverageInput>;
  distinctCount?: InputMaybe<InvitationHavingDistinctCountInput>;
  max?: InputMaybe<InvitationHavingMaxInput>;
  min?: InputMaybe<InvitationHavingMinInput>;
  stddevPopulation?: InputMaybe<InvitationHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<InvitationHavingStddevSampleInput>;
  sum?: InputMaybe<InvitationHavingSumInput>;
  variancePopulation?: InputMaybe<InvitationHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<InvitationHavingVarianceSampleInput>;
};

export type InvitationHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Invitation` */
export type InvitationInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email: Scalars['String']['input'];
  organizationId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Invitation`. */
export enum InvitationOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `Invitation`. Fields that are set will be updated. */
export type InvitationPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Member = {
  __typename?: 'Member';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Organization` that is related to this `Member`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID']['output'];
  role: Role;
  rowId: Scalars['UUID']['output'];
  /** Reads a single `User` that is related to this `Member`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};

export type MemberAggregates = {
  __typename?: 'MemberAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<MemberDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Member` object types. */
export type MemberAggregatesFilter = {
  /** Distinct count aggregate over matching `Member` objects. */
  distinctCount?: InputMaybe<MemberDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Member` object to be included within the aggregate. */
  filter?: InputMaybe<MemberFilter>;
};

/** A condition to be used against `Member` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MemberCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `role` field. */
  role?: InputMaybe<Role>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Member` values. */
export type MemberConnection = {
  __typename?: 'MemberConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<MemberAggregates>;
  /** A list of edges which contains the `Member` and cursor to aid in pagination. */
  edges: Array<Maybe<MemberEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<MemberAggregates>>;
  /** A list of `Member` objects. */
  nodes: Array<Maybe<Member>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Member` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Member` values. */
export type MemberConnectionGroupedAggregatesArgs = {
  groupBy: Array<MemberGroupBy>;
  having?: InputMaybe<MemberHavingInput>;
};

export type MemberDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  role?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
};

export type MemberDistinctCountAggregates = {
  __typename?: 'MemberDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of role across the matching connection */
  role?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of userId across the matching connection */
  userId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Member` edge in the connection. */
export type MemberEdge = {
  __typename?: 'MemberEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Member` at the end of the edge. */
  node?: Maybe<Member>;
};

/** A filter to be used against `Member` object types. All fields are combined with a logical ‘and.’ */
export type MemberFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MemberFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MemberFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MemberFilter>>;
  /** Filter by the object’s `organization` relation. */
  organization?: InputMaybe<OrganizationFilter>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `role` field. */
  role?: InputMaybe<RoleFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Member` for usage during aggregation. */
export enum MemberGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  OrganizationId = 'ORGANIZATION_ID',
  Role = 'ROLE',
  UserId = 'USER_ID'
}

export type MemberHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type MemberHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Member` aggregates. */
export type MemberHavingInput = {
  AND?: InputMaybe<Array<MemberHavingInput>>;
  OR?: InputMaybe<Array<MemberHavingInput>>;
  average?: InputMaybe<MemberHavingAverageInput>;
  distinctCount?: InputMaybe<MemberHavingDistinctCountInput>;
  max?: InputMaybe<MemberHavingMaxInput>;
  min?: InputMaybe<MemberHavingMinInput>;
  stddevPopulation?: InputMaybe<MemberHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<MemberHavingStddevSampleInput>;
  sum?: InputMaybe<MemberHavingSumInput>;
  variancePopulation?: InputMaybe<MemberHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<MemberHavingVarianceSampleInput>;
};

export type MemberHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type MemberHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type MemberHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type MemberHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type MemberHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type MemberHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type MemberHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Member` */
export type MemberInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  organizationId: Scalars['UUID']['input'];
  role: Role;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  userId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Member`. */
export enum MemberOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RoleAsc = 'ROLE_ASC',
  RoleDesc = 'ROLE_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `Member`. Fields that are set will be updated. */
export type MemberPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  role?: InputMaybe<Role>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Comment`. */
  createComment?: Maybe<CreateCommentPayload>;
  /** Creates a single `Downvote`. */
  createDownvote?: Maybe<CreateDownvotePayload>;
  /** Creates a single `Invitation`. */
  createInvitation?: Maybe<CreateInvitationPayload>;
  /** Creates a single `Member`. */
  createMember?: Maybe<CreateMemberPayload>;
  /** Creates a single `Organization`. */
  createOrganization?: Maybe<CreateOrganizationPayload>;
  /** Creates a single `Post`. */
  createPost?: Maybe<CreatePostPayload>;
  /** Creates a single `PostStatus`. */
  createPostStatus?: Maybe<CreatePostStatusPayload>;
  /** Creates a single `Project`. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a single `Upvote`. */
  createUpvote?: Maybe<CreateUpvotePayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Deletes a single `Comment` using a unique key. */
  deleteComment?: Maybe<DeleteCommentPayload>;
  /** Deletes a single `Downvote` using a unique key. */
  deleteDownvote?: Maybe<DeleteDownvotePayload>;
  /** Deletes a single `Invitation` using a unique key. */
  deleteInvitation?: Maybe<DeleteInvitationPayload>;
  /** Deletes a single `Member` using a unique key. */
  deleteMember?: Maybe<DeleteMemberPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganization?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Post` using a unique key. */
  deletePost?: Maybe<DeletePostPayload>;
  /** Deletes a single `PostStatus` using a unique key. */
  deletePostStatus?: Maybe<DeletePostStatusPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Upvote` using a unique key. */
  deleteUpvote?: Maybe<DeleteUpvotePayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Updates a single `Comment` using a unique key and a patch. */
  updateComment?: Maybe<UpdateCommentPayload>;
  /** Updates a single `Downvote` using a unique key and a patch. */
  updateDownvote?: Maybe<UpdateDownvotePayload>;
  /** Updates a single `Invitation` using a unique key and a patch. */
  updateInvitation?: Maybe<UpdateInvitationPayload>;
  /** Updates a single `Member` using a unique key and a patch. */
  updateMember?: Maybe<UpdateMemberPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Post` using a unique key and a patch. */
  updatePost?: Maybe<UpdatePostPayload>;
  /** Updates a single `PostStatus` using a unique key and a patch. */
  updatePostStatus?: Maybe<UpdatePostStatusPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Upvote` using a unique key and a patch. */
  updateUpvote?: Maybe<UpdateUpvotePayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDownvoteArgs = {
  input: CreateDownvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateInvitationArgs = {
  input: CreateInvitationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMemberArgs = {
  input: CreateMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePostStatusArgs = {
  input: CreatePostStatusInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUpvoteArgs = {
  input: CreateUpvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDownvoteArgs = {
  input: DeleteDownvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteInvitationArgs = {
  input: DeleteInvitationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMemberArgs = {
  input: DeleteMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostStatusArgs = {
  input: DeletePostStatusInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUpvoteArgs = {
  input: DeleteUpvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDownvoteArgs = {
  input: UpdateDownvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateInvitationArgs = {
  input: UpdateInvitationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMemberArgs = {
  input: UpdateMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostStatusArgs = {
  input: UpdatePostStatusInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUpvoteArgs = {
  input: UpdateUpvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
};

export type Organization = {
  __typename?: 'Organization';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Invitation`. */
  invitations: InvitationConnection;
  /** Reads and enables pagination through a set of `Member`. */
  members: MemberConnection;
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Project`. */
  projects: ProjectConnection;
  rowId: Scalars['UUID']['output'];
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type OrganizationInvitationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvitationCondition>;
  filter?: InputMaybe<InvitationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvitationOrderBy>>;
};


export type OrganizationMembersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MemberCondition>;
  filter?: InputMaybe<MemberFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MemberOrderBy>>;
};


export type OrganizationProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectOrderBy>>;
};

export type OrganizationAggregates = {
  __typename?: 'OrganizationAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<OrganizationDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/**
 * A condition to be used against `Organization` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type OrganizationCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `Organization` values. */
export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<OrganizationAggregates>;
  /** A list of edges which contains the `Organization` and cursor to aid in pagination. */
  edges: Array<Maybe<OrganizationEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<OrganizationAggregates>>;
  /** A list of `Organization` objects. */
  nodes: Array<Maybe<Organization>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Organization` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Organization` values. */
export type OrganizationConnectionGroupedAggregatesArgs = {
  groupBy: Array<OrganizationGroupBy>;
  having?: InputMaybe<OrganizationHavingInput>;
};

export type OrganizationDistinctCountAggregates = {
  __typename?: 'OrganizationDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of slug across the matching connection */
  slug?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Organization` edge in the connection. */
export type OrganizationEdge = {
  __typename?: 'OrganizationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Organization` at the end of the edge. */
  node?: Maybe<Organization>;
};

/** A filter to be used against `Organization` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<OrganizationFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `invitations` relation. */
  invitations?: InputMaybe<OrganizationToManyInvitationFilter>;
  /** Some related `invitations` exist. */
  invitationsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `members` relation. */
  members?: InputMaybe<OrganizationToManyMemberFilter>;
  /** Some related `members` exist. */
  membersExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<OrganizationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<OrganizationFilter>>;
  /** Filter by the object’s `projects` relation. */
  projects?: InputMaybe<OrganizationToManyProjectFilter>;
  /** Some related `projects` exist. */
  projectsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `Organization` for usage during aggregation. */
export enum OrganizationGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type OrganizationHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OrganizationHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Organization` aggregates. */
export type OrganizationHavingInput = {
  AND?: InputMaybe<Array<OrganizationHavingInput>>;
  OR?: InputMaybe<Array<OrganizationHavingInput>>;
  average?: InputMaybe<OrganizationHavingAverageInput>;
  distinctCount?: InputMaybe<OrganizationHavingDistinctCountInput>;
  max?: InputMaybe<OrganizationHavingMaxInput>;
  min?: InputMaybe<OrganizationHavingMinInput>;
  stddevPopulation?: InputMaybe<OrganizationHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<OrganizationHavingStddevSampleInput>;
  sum?: InputMaybe<OrganizationHavingSumInput>;
  variancePopulation?: InputMaybe<OrganizationHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<OrganizationHavingVarianceSampleInput>;
};

export type OrganizationHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OrganizationHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OrganizationHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OrganizationHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OrganizationHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OrganizationHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OrganizationHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Organization` */
export type OrganizationInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Organization`. */
export enum OrganizationOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  InvitationsCountAsc = 'INVITATIONS_COUNT_ASC',
  InvitationsCountDesc = 'INVITATIONS_COUNT_DESC',
  InvitationsDistinctCountCreatedAtAsc = 'INVITATIONS_DISTINCT_COUNT_CREATED_AT_ASC',
  InvitationsDistinctCountCreatedAtDesc = 'INVITATIONS_DISTINCT_COUNT_CREATED_AT_DESC',
  InvitationsDistinctCountEmailAsc = 'INVITATIONS_DISTINCT_COUNT_EMAIL_ASC',
  InvitationsDistinctCountEmailDesc = 'INVITATIONS_DISTINCT_COUNT_EMAIL_DESC',
  InvitationsDistinctCountOrganizationIdAsc = 'INVITATIONS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  InvitationsDistinctCountOrganizationIdDesc = 'INVITATIONS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  InvitationsDistinctCountRowIdAsc = 'INVITATIONS_DISTINCT_COUNT_ROW_ID_ASC',
  InvitationsDistinctCountRowIdDesc = 'INVITATIONS_DISTINCT_COUNT_ROW_ID_DESC',
  InvitationsDistinctCountUpdatedAtAsc = 'INVITATIONS_DISTINCT_COUNT_UPDATED_AT_ASC',
  InvitationsDistinctCountUpdatedAtDesc = 'INVITATIONS_DISTINCT_COUNT_UPDATED_AT_DESC',
  MembersCountAsc = 'MEMBERS_COUNT_ASC',
  MembersCountDesc = 'MEMBERS_COUNT_DESC',
  MembersDistinctCountCreatedAtAsc = 'MEMBERS_DISTINCT_COUNT_CREATED_AT_ASC',
  MembersDistinctCountCreatedAtDesc = 'MEMBERS_DISTINCT_COUNT_CREATED_AT_DESC',
  MembersDistinctCountOrganizationIdAsc = 'MEMBERS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  MembersDistinctCountOrganizationIdDesc = 'MEMBERS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  MembersDistinctCountRoleAsc = 'MEMBERS_DISTINCT_COUNT_ROLE_ASC',
  MembersDistinctCountRoleDesc = 'MEMBERS_DISTINCT_COUNT_ROLE_DESC',
  MembersDistinctCountRowIdAsc = 'MEMBERS_DISTINCT_COUNT_ROW_ID_ASC',
  MembersDistinctCountRowIdDesc = 'MEMBERS_DISTINCT_COUNT_ROW_ID_DESC',
  MembersDistinctCountUserIdAsc = 'MEMBERS_DISTINCT_COUNT_USER_ID_ASC',
  MembersDistinctCountUserIdDesc = 'MEMBERS_DISTINCT_COUNT_USER_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectsCountAsc = 'PROJECTS_COUNT_ASC',
  ProjectsCountDesc = 'PROJECTS_COUNT_DESC',
  ProjectsDistinctCountCreatedAtAsc = 'PROJECTS_DISTINCT_COUNT_CREATED_AT_ASC',
  ProjectsDistinctCountCreatedAtDesc = 'PROJECTS_DISTINCT_COUNT_CREATED_AT_DESC',
  ProjectsDistinctCountDescriptionAsc = 'PROJECTS_DISTINCT_COUNT_DESCRIPTION_ASC',
  ProjectsDistinctCountDescriptionDesc = 'PROJECTS_DISTINCT_COUNT_DESCRIPTION_DESC',
  ProjectsDistinctCountImageAsc = 'PROJECTS_DISTINCT_COUNT_IMAGE_ASC',
  ProjectsDistinctCountImageDesc = 'PROJECTS_DISTINCT_COUNT_IMAGE_DESC',
  ProjectsDistinctCountNameAsc = 'PROJECTS_DISTINCT_COUNT_NAME_ASC',
  ProjectsDistinctCountNameDesc = 'PROJECTS_DISTINCT_COUNT_NAME_DESC',
  ProjectsDistinctCountOrganizationIdAsc = 'PROJECTS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  ProjectsDistinctCountOrganizationIdDesc = 'PROJECTS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  ProjectsDistinctCountRowIdAsc = 'PROJECTS_DISTINCT_COUNT_ROW_ID_ASC',
  ProjectsDistinctCountRowIdDesc = 'PROJECTS_DISTINCT_COUNT_ROW_ID_DESC',
  ProjectsDistinctCountSlugAsc = 'PROJECTS_DISTINCT_COUNT_SLUG_ASC',
  ProjectsDistinctCountSlugDesc = 'PROJECTS_DISTINCT_COUNT_SLUG_DESC',
  ProjectsDistinctCountUpdatedAtAsc = 'PROJECTS_DISTINCT_COUNT_UPDATED_AT_ASC',
  ProjectsDistinctCountUpdatedAtDesc = 'PROJECTS_DISTINCT_COUNT_UPDATED_AT_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `Organization`. Fields that are set will be updated. */
export type OrganizationPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against many `Invitation` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationToManyInvitationFilter = {
  /** Aggregates across related `Invitation` match the filter criteria. */
  aggregates?: InputMaybe<InvitationAggregatesFilter>;
  /** Every related `Invitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<InvitationFilter>;
  /** No related `Invitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<InvitationFilter>;
  /** Some related `Invitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<InvitationFilter>;
};

/** A filter to be used against many `Member` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationToManyMemberFilter = {
  /** Aggregates across related `Member` match the filter criteria. */
  aggregates?: InputMaybe<MemberAggregatesFilter>;
  /** Every related `Member` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<MemberFilter>;
  /** No related `Member` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<MemberFilter>;
  /** Some related `Member` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<MemberFilter>;
};

/** A filter to be used against many `Project` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationToManyProjectFilter = {
  /** Aggregates across related `Project` match the filter criteria. */
  aggregates?: InputMaybe<ProjectAggregatesFilter>;
  /** Every related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ProjectFilter>;
  /** No related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ProjectFilter>;
  /** Some related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ProjectFilter>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type Post = {
  __typename?: 'Post';
  /** Reads and enables pagination through a set of `Comment`. */
  comments: CommentConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Downvote`. */
  downvotes: DownvoteConnection;
  /** Reads a single `Project` that is related to this `Post`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `PostStatus` that is related to this `Post`. */
  status?: Maybe<PostStatus>;
  statusId?: Maybe<Scalars['UUID']['output']>;
  statusUpdatedAt?: Maybe<Scalars['Datetime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Upvote`. */
  upvotes: UpvoteConnection;
  /** Reads a single `User` that is related to this `Post`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};


export type PostCommentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CommentCondition>;
  filter?: InputMaybe<CommentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CommentOrderBy>>;
};


export type PostDownvotesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DownvoteCondition>;
  filter?: InputMaybe<DownvoteFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DownvoteOrderBy>>;
};


export type PostUpvotesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UpvoteCondition>;
  filter?: InputMaybe<UpvoteFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UpvoteOrderBy>>;
};

export type PostAggregates = {
  __typename?: 'PostAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<PostDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Post` object types. */
export type PostAggregatesFilter = {
  /** Distinct count aggregate over matching `Post` objects. */
  distinctCount?: InputMaybe<PostDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Post` object to be included within the aggregate. */
  filter?: InputMaybe<PostFilter>;
};

/** A condition to be used against `Post` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PostCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `statusId` field. */
  statusId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `statusUpdatedAt` field. */
  statusUpdatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `title` field. */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Post` values. */
export type PostConnection = {
  __typename?: 'PostConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<PostAggregates>;
  /** A list of edges which contains the `Post` and cursor to aid in pagination. */
  edges: Array<Maybe<PostEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<PostAggregates>>;
  /** A list of `Post` objects. */
  nodes: Array<Maybe<Post>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Post` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Post` values. */
export type PostConnectionGroupedAggregatesArgs = {
  groupBy: Array<PostGroupBy>;
  having?: InputMaybe<PostHavingInput>;
};

export type PostDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  description?: InputMaybe<BigIntFilter>;
  projectId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  statusId?: InputMaybe<BigIntFilter>;
  statusUpdatedAt?: InputMaybe<BigIntFilter>;
  title?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
};

export type PostDistinctCountAggregates = {
  __typename?: 'PostDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of statusId across the matching connection */
  statusId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of statusUpdatedAt across the matching connection */
  statusUpdatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of title across the matching connection */
  title?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of userId across the matching connection */
  userId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Post` edge in the connection. */
export type PostEdge = {
  __typename?: 'PostEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Post` at the end of the edge. */
  node?: Maybe<Post>;
};

/** A filter to be used against `Post` object types. All fields are combined with a logical ‘and.’ */
export type PostFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PostFilter>>;
  /** Filter by the object’s `comments` relation. */
  comments?: InputMaybe<PostToManyCommentFilter>;
  /** Some related `comments` exist. */
  commentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `downvotes` relation. */
  downvotes?: InputMaybe<PostToManyDownvoteFilter>;
  /** Some related `downvotes` exist. */
  downvotesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<PostFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PostFilter>>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` relation. */
  status?: InputMaybe<PostStatusFilter>;
  /** A related `status` exists. */
  statusExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `statusId` field. */
  statusId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `statusUpdatedAt` field. */
  statusUpdatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `title` field. */
  title?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `upvotes` relation. */
  upvotes?: InputMaybe<PostToManyUpvoteFilter>;
  /** Some related `upvotes` exist. */
  upvotesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Post` for usage during aggregation. */
export enum PostGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  ProjectId = 'PROJECT_ID',
  StatusId = 'STATUS_ID',
  StatusUpdatedAt = 'STATUS_UPDATED_AT',
  StatusUpdatedAtTruncatedToDay = 'STATUS_UPDATED_AT_TRUNCATED_TO_DAY',
  StatusUpdatedAtTruncatedToHour = 'STATUS_UPDATED_AT_TRUNCATED_TO_HOUR',
  Title = 'TITLE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  UserId = 'USER_ID'
}

export type PostHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Post` aggregates. */
export type PostHavingInput = {
  AND?: InputMaybe<Array<PostHavingInput>>;
  OR?: InputMaybe<Array<PostHavingInput>>;
  average?: InputMaybe<PostHavingAverageInput>;
  distinctCount?: InputMaybe<PostHavingDistinctCountInput>;
  max?: InputMaybe<PostHavingMaxInput>;
  min?: InputMaybe<PostHavingMinInput>;
  stddevPopulation?: InputMaybe<PostHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<PostHavingStddevSampleInput>;
  sum?: InputMaybe<PostHavingSumInput>;
  variancePopulation?: InputMaybe<PostHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<PostHavingVarianceSampleInput>;
};

export type PostHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Post` */
export type PostInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  statusId?: InputMaybe<Scalars['UUID']['input']>;
  statusUpdatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Post`. */
export enum PostOrderBy {
  CommentsCountAsc = 'COMMENTS_COUNT_ASC',
  CommentsCountDesc = 'COMMENTS_COUNT_DESC',
  CommentsDistinctCountCreatedAtAsc = 'COMMENTS_DISTINCT_COUNT_CREATED_AT_ASC',
  CommentsDistinctCountCreatedAtDesc = 'COMMENTS_DISTINCT_COUNT_CREATED_AT_DESC',
  CommentsDistinctCountMessageAsc = 'COMMENTS_DISTINCT_COUNT_MESSAGE_ASC',
  CommentsDistinctCountMessageDesc = 'COMMENTS_DISTINCT_COUNT_MESSAGE_DESC',
  CommentsDistinctCountParentIdAsc = 'COMMENTS_DISTINCT_COUNT_PARENT_ID_ASC',
  CommentsDistinctCountParentIdDesc = 'COMMENTS_DISTINCT_COUNT_PARENT_ID_DESC',
  CommentsDistinctCountPostIdAsc = 'COMMENTS_DISTINCT_COUNT_POST_ID_ASC',
  CommentsDistinctCountPostIdDesc = 'COMMENTS_DISTINCT_COUNT_POST_ID_DESC',
  CommentsDistinctCountRowIdAsc = 'COMMENTS_DISTINCT_COUNT_ROW_ID_ASC',
  CommentsDistinctCountRowIdDesc = 'COMMENTS_DISTINCT_COUNT_ROW_ID_DESC',
  CommentsDistinctCountUpdatedAtAsc = 'COMMENTS_DISTINCT_COUNT_UPDATED_AT_ASC',
  CommentsDistinctCountUpdatedAtDesc = 'COMMENTS_DISTINCT_COUNT_UPDATED_AT_DESC',
  CommentsDistinctCountUserIdAsc = 'COMMENTS_DISTINCT_COUNT_USER_ID_ASC',
  CommentsDistinctCountUserIdDesc = 'COMMENTS_DISTINCT_COUNT_USER_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  DownvotesCountAsc = 'DOWNVOTES_COUNT_ASC',
  DownvotesCountDesc = 'DOWNVOTES_COUNT_DESC',
  DownvotesDistinctCountCreatedAtAsc = 'DOWNVOTES_DISTINCT_COUNT_CREATED_AT_ASC',
  DownvotesDistinctCountCreatedAtDesc = 'DOWNVOTES_DISTINCT_COUNT_CREATED_AT_DESC',
  DownvotesDistinctCountPostIdAsc = 'DOWNVOTES_DISTINCT_COUNT_POST_ID_ASC',
  DownvotesDistinctCountPostIdDesc = 'DOWNVOTES_DISTINCT_COUNT_POST_ID_DESC',
  DownvotesDistinctCountRowIdAsc = 'DOWNVOTES_DISTINCT_COUNT_ROW_ID_ASC',
  DownvotesDistinctCountRowIdDesc = 'DOWNVOTES_DISTINCT_COUNT_ROW_ID_DESC',
  DownvotesDistinctCountUpdatedAtAsc = 'DOWNVOTES_DISTINCT_COUNT_UPDATED_AT_ASC',
  DownvotesDistinctCountUpdatedAtDesc = 'DOWNVOTES_DISTINCT_COUNT_UPDATED_AT_DESC',
  DownvotesDistinctCountUserIdAsc = 'DOWNVOTES_DISTINCT_COUNT_USER_ID_ASC',
  DownvotesDistinctCountUserIdDesc = 'DOWNVOTES_DISTINCT_COUNT_USER_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusIdAsc = 'STATUS_ID_ASC',
  StatusIdDesc = 'STATUS_ID_DESC',
  StatusUpdatedAtAsc = 'STATUS_UPDATED_AT_ASC',
  StatusUpdatedAtDesc = 'STATUS_UPDATED_AT_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UpvotesCountAsc = 'UPVOTES_COUNT_ASC',
  UpvotesCountDesc = 'UPVOTES_COUNT_DESC',
  UpvotesDistinctCountCreatedAtAsc = 'UPVOTES_DISTINCT_COUNT_CREATED_AT_ASC',
  UpvotesDistinctCountCreatedAtDesc = 'UPVOTES_DISTINCT_COUNT_CREATED_AT_DESC',
  UpvotesDistinctCountPostIdAsc = 'UPVOTES_DISTINCT_COUNT_POST_ID_ASC',
  UpvotesDistinctCountPostIdDesc = 'UPVOTES_DISTINCT_COUNT_POST_ID_DESC',
  UpvotesDistinctCountRowIdAsc = 'UPVOTES_DISTINCT_COUNT_ROW_ID_ASC',
  UpvotesDistinctCountRowIdDesc = 'UPVOTES_DISTINCT_COUNT_ROW_ID_DESC',
  UpvotesDistinctCountUpdatedAtAsc = 'UPVOTES_DISTINCT_COUNT_UPDATED_AT_ASC',
  UpvotesDistinctCountUpdatedAtDesc = 'UPVOTES_DISTINCT_COUNT_UPDATED_AT_DESC',
  UpvotesDistinctCountUserIdAsc = 'UPVOTES_DISTINCT_COUNT_USER_ID_ASC',
  UpvotesDistinctCountUserIdDesc = 'UPVOTES_DISTINCT_COUNT_USER_ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `Post`. Fields that are set will be updated. */
export type PostPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  statusId?: InputMaybe<Scalars['UUID']['input']>;
  statusUpdatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type PostStatus = {
  __typename?: 'PostStatus';
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  isDefault: Scalars['Boolean']['output'];
  /** Reads and enables pagination through a set of `Post`. */
  postsByStatusId: PostConnection;
  /** Reads a single `Project` that is related to this `PostStatus`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type PostStatusPostsByStatusIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostCondition>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};

export type PostStatusAggregates = {
  __typename?: 'PostStatusAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<PostStatusDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `PostStatus` object types. */
export type PostStatusAggregatesFilter = {
  /** Distinct count aggregate over matching `PostStatus` objects. */
  distinctCount?: InputMaybe<PostStatusDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `PostStatus` object to be included within the aggregate. */
  filter?: InputMaybe<PostStatusFilter>;
};

/**
 * A condition to be used against `PostStatus` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PostStatusCondition = {
  /** Checks for equality with the object’s `color` field. */
  color?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `isDefault` field. */
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `PostStatus` values. */
export type PostStatusConnection = {
  __typename?: 'PostStatusConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<PostStatusAggregates>;
  /** A list of edges which contains the `PostStatus` and cursor to aid in pagination. */
  edges: Array<Maybe<PostStatusEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<PostStatusAggregates>>;
  /** A list of `PostStatus` objects. */
  nodes: Array<Maybe<PostStatus>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PostStatus` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `PostStatus` values. */
export type PostStatusConnectionGroupedAggregatesArgs = {
  groupBy: Array<PostStatusGroupBy>;
  having?: InputMaybe<PostStatusHavingInput>;
};

export type PostStatusDistinctCountAggregateFilter = {
  color?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  description?: InputMaybe<BigIntFilter>;
  isDefault?: InputMaybe<BigIntFilter>;
  projectId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  status?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
};

export type PostStatusDistinctCountAggregates = {
  __typename?: 'PostStatusDistinctCountAggregates';
  /** Distinct count of color across the matching connection */
  color?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isDefault across the matching connection */
  isDefault?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of status across the matching connection */
  status?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `PostStatus` edge in the connection. */
export type PostStatusEdge = {
  __typename?: 'PostStatusEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PostStatus` at the end of the edge. */
  node?: Maybe<PostStatus>;
};

/** A filter to be used against `PostStatus` object types. All fields are combined with a logical ‘and.’ */
export type PostStatusFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PostStatusFilter>>;
  /** Filter by the object’s `color` field. */
  color?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isDefault` field. */
  isDefault?: InputMaybe<BooleanFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PostStatusFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PostStatusFilter>>;
  /** Filter by the object’s `postsByStatusId` relation. */
  postsByStatusId?: InputMaybe<PostStatusToManyPostFilter>;
  /** Some related `postsByStatusId` exist. */
  postsByStatusIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `PostStatus` for usage during aggregation. */
export enum PostStatusGroupBy {
  Color = 'COLOR',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  IsDefault = 'IS_DEFAULT',
  ProjectId = 'PROJECT_ID',
  Status = 'STATUS',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type PostStatusHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `PostStatus` aggregates. */
export type PostStatusHavingInput = {
  AND?: InputMaybe<Array<PostStatusHavingInput>>;
  OR?: InputMaybe<Array<PostStatusHavingInput>>;
  average?: InputMaybe<PostStatusHavingAverageInput>;
  distinctCount?: InputMaybe<PostStatusHavingDistinctCountInput>;
  max?: InputMaybe<PostStatusHavingMaxInput>;
  min?: InputMaybe<PostStatusHavingMinInput>;
  stddevPopulation?: InputMaybe<PostStatusHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<PostStatusHavingStddevSampleInput>;
  sum?: InputMaybe<PostStatusHavingSumInput>;
  variancePopulation?: InputMaybe<PostStatusHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<PostStatusHavingVarianceSampleInput>;
};

export type PostStatusHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `PostStatus` */
export type PostStatusInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  projectId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  status: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `PostStatus`. */
export enum PostStatusOrderBy {
  ColorAsc = 'COLOR_ASC',
  ColorDesc = 'COLOR_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IsDefaultAsc = 'IS_DEFAULT_ASC',
  IsDefaultDesc = 'IS_DEFAULT_DESC',
  Natural = 'NATURAL',
  PostsByStatusIdCountAsc = 'POSTS_BY_STATUS_ID_COUNT_ASC',
  PostsByStatusIdCountDesc = 'POSTS_BY_STATUS_ID_COUNT_DESC',
  PostsByStatusIdDistinctCountCreatedAtAsc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  PostsByStatusIdDistinctCountCreatedAtDesc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  PostsByStatusIdDistinctCountDescriptionAsc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_DESCRIPTION_ASC',
  PostsByStatusIdDistinctCountDescriptionDesc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_DESCRIPTION_DESC',
  PostsByStatusIdDistinctCountProjectIdAsc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_PROJECT_ID_ASC',
  PostsByStatusIdDistinctCountProjectIdDesc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_PROJECT_ID_DESC',
  PostsByStatusIdDistinctCountRowIdAsc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_ROW_ID_ASC',
  PostsByStatusIdDistinctCountRowIdDesc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_ROW_ID_DESC',
  PostsByStatusIdDistinctCountStatusIdAsc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_STATUS_ID_ASC',
  PostsByStatusIdDistinctCountStatusIdDesc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_STATUS_ID_DESC',
  PostsByStatusIdDistinctCountStatusUpdatedAtAsc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_STATUS_UPDATED_AT_ASC',
  PostsByStatusIdDistinctCountStatusUpdatedAtDesc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_STATUS_UPDATED_AT_DESC',
  PostsByStatusIdDistinctCountTitleAsc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_TITLE_ASC',
  PostsByStatusIdDistinctCountTitleDesc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_TITLE_DESC',
  PostsByStatusIdDistinctCountUpdatedAtAsc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_UPDATED_AT_ASC',
  PostsByStatusIdDistinctCountUpdatedAtDesc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_UPDATED_AT_DESC',
  PostsByStatusIdDistinctCountUserIdAsc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_USER_ID_ASC',
  PostsByStatusIdDistinctCountUserIdDesc = 'POSTS_BY_STATUS_ID_DISTINCT_COUNT_USER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `PostStatus`. Fields that are set will be updated. */
export type PostStatusPatch = {
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against many `Post` object types. All fields are combined with a logical ‘and.’ */
export type PostStatusToManyPostFilter = {
  /** Aggregates across related `Post` match the filter criteria. */
  aggregates?: InputMaybe<PostAggregatesFilter>;
  /** Every related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostFilter>;
  /** No related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostFilter>;
  /** Some related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostFilter>;
};

/** A filter to be used against many `Comment` object types. All fields are combined with a logical ‘and.’ */
export type PostToManyCommentFilter = {
  /** Aggregates across related `Comment` match the filter criteria. */
  aggregates?: InputMaybe<CommentAggregatesFilter>;
  /** Every related `Comment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CommentFilter>;
  /** No related `Comment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CommentFilter>;
  /** Some related `Comment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CommentFilter>;
};

/** A filter to be used against many `Downvote` object types. All fields are combined with a logical ‘and.’ */
export type PostToManyDownvoteFilter = {
  /** Aggregates across related `Downvote` match the filter criteria. */
  aggregates?: InputMaybe<DownvoteAggregatesFilter>;
  /** Every related `Downvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<DownvoteFilter>;
  /** No related `Downvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<DownvoteFilter>;
  /** Some related `Downvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<DownvoteFilter>;
};

/** A filter to be used against many `Upvote` object types. All fields are combined with a logical ‘and.’ */
export type PostToManyUpvoteFilter = {
  /** Aggregates across related `Upvote` match the filter criteria. */
  aggregates?: InputMaybe<UpvoteAggregatesFilter>;
  /** Every related `Upvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<UpvoteFilter>;
  /** No related `Upvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<UpvoteFilter>;
  /** Some related `Upvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<UpvoteFilter>;
};

export type Project = {
  __typename?: 'Project';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** Reads a single `Organization` that is related to this `Project`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `PostStatus`. */
  postStatuses: PostStatusConnection;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostConnection;
  rowId: Scalars['UUID']['output'];
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type ProjectPostStatusesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostStatusCondition>;
  filter?: InputMaybe<PostStatusFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostStatusOrderBy>>;
};


export type ProjectPostsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostCondition>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};

export type ProjectAggregates = {
  __typename?: 'ProjectAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<ProjectDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Project` object types. */
export type ProjectAggregatesFilter = {
  /** Distinct count aggregate over matching `Project` objects. */
  distinctCount?: InputMaybe<ProjectDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Project` object to be included within the aggregate. */
  filter?: InputMaybe<ProjectFilter>;
};

/** A condition to be used against `Project` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProjectCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `image` field. */
  image?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `Project` values. */
export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<ProjectAggregates>;
  /** A list of edges which contains the `Project` and cursor to aid in pagination. */
  edges: Array<Maybe<ProjectEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<ProjectAggregates>>;
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Project` values. */
export type ProjectConnectionGroupedAggregatesArgs = {
  groupBy: Array<ProjectGroupBy>;
  having?: InputMaybe<ProjectHavingInput>;
};

export type ProjectDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  description?: InputMaybe<BigIntFilter>;
  image?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  slug?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
};

export type ProjectDistinctCountAggregates = {
  __typename?: 'ProjectDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of image across the matching connection */
  image?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of slug across the matching connection */
  slug?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Project` edge in the connection. */
export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
};

/** A filter to be used against `Project` object types. All fields are combined with a logical ‘and.’ */
export type ProjectFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProjectFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `image` field. */
  image?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ProjectFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProjectFilter>>;
  /** Filter by the object’s `organization` relation. */
  organization?: InputMaybe<OrganizationFilter>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `postStatuses` relation. */
  postStatuses?: InputMaybe<ProjectToManyPostStatusFilter>;
  /** Some related `postStatuses` exist. */
  postStatusesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `posts` relation. */
  posts?: InputMaybe<ProjectToManyPostFilter>;
  /** Some related `posts` exist. */
  postsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `Project` for usage during aggregation. */
export enum ProjectGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  Image = 'IMAGE',
  Name = 'NAME',
  OrganizationId = 'ORGANIZATION_ID',
  Slug = 'SLUG',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type ProjectHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Project` aggregates. */
export type ProjectHavingInput = {
  AND?: InputMaybe<Array<ProjectHavingInput>>;
  OR?: InputMaybe<Array<ProjectHavingInput>>;
  average?: InputMaybe<ProjectHavingAverageInput>;
  distinctCount?: InputMaybe<ProjectHavingDistinctCountInput>;
  max?: InputMaybe<ProjectHavingMaxInput>;
  min?: InputMaybe<ProjectHavingMinInput>;
  stddevPopulation?: InputMaybe<ProjectHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<ProjectHavingStddevSampleInput>;
  sum?: InputMaybe<ProjectHavingSumInput>;
  variancePopulation?: InputMaybe<ProjectHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<ProjectHavingVarianceSampleInput>;
};

export type ProjectHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Project` */
export type ProjectInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Project`. */
export enum ProjectOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  ImageAsc = 'IMAGE_ASC',
  ImageDesc = 'IMAGE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PostsCountAsc = 'POSTS_COUNT_ASC',
  PostsCountDesc = 'POSTS_COUNT_DESC',
  PostsDistinctCountCreatedAtAsc = 'POSTS_DISTINCT_COUNT_CREATED_AT_ASC',
  PostsDistinctCountCreatedAtDesc = 'POSTS_DISTINCT_COUNT_CREATED_AT_DESC',
  PostsDistinctCountDescriptionAsc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_ASC',
  PostsDistinctCountDescriptionDesc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_DESC',
  PostsDistinctCountProjectIdAsc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_ASC',
  PostsDistinctCountProjectIdDesc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_DESC',
  PostsDistinctCountRowIdAsc = 'POSTS_DISTINCT_COUNT_ROW_ID_ASC',
  PostsDistinctCountRowIdDesc = 'POSTS_DISTINCT_COUNT_ROW_ID_DESC',
  PostsDistinctCountStatusIdAsc = 'POSTS_DISTINCT_COUNT_STATUS_ID_ASC',
  PostsDistinctCountStatusIdDesc = 'POSTS_DISTINCT_COUNT_STATUS_ID_DESC',
  PostsDistinctCountStatusUpdatedAtAsc = 'POSTS_DISTINCT_COUNT_STATUS_UPDATED_AT_ASC',
  PostsDistinctCountStatusUpdatedAtDesc = 'POSTS_DISTINCT_COUNT_STATUS_UPDATED_AT_DESC',
  PostsDistinctCountTitleAsc = 'POSTS_DISTINCT_COUNT_TITLE_ASC',
  PostsDistinctCountTitleDesc = 'POSTS_DISTINCT_COUNT_TITLE_DESC',
  PostsDistinctCountUpdatedAtAsc = 'POSTS_DISTINCT_COUNT_UPDATED_AT_ASC',
  PostsDistinctCountUpdatedAtDesc = 'POSTS_DISTINCT_COUNT_UPDATED_AT_DESC',
  PostsDistinctCountUserIdAsc = 'POSTS_DISTINCT_COUNT_USER_ID_ASC',
  PostsDistinctCountUserIdDesc = 'POSTS_DISTINCT_COUNT_USER_ID_DESC',
  PostStatusesCountAsc = 'POST_STATUSES_COUNT_ASC',
  PostStatusesCountDesc = 'POST_STATUSES_COUNT_DESC',
  PostStatusesDistinctCountColorAsc = 'POST_STATUSES_DISTINCT_COUNT_COLOR_ASC',
  PostStatusesDistinctCountColorDesc = 'POST_STATUSES_DISTINCT_COUNT_COLOR_DESC',
  PostStatusesDistinctCountCreatedAtAsc = 'POST_STATUSES_DISTINCT_COUNT_CREATED_AT_ASC',
  PostStatusesDistinctCountCreatedAtDesc = 'POST_STATUSES_DISTINCT_COUNT_CREATED_AT_DESC',
  PostStatusesDistinctCountDescriptionAsc = 'POST_STATUSES_DISTINCT_COUNT_DESCRIPTION_ASC',
  PostStatusesDistinctCountDescriptionDesc = 'POST_STATUSES_DISTINCT_COUNT_DESCRIPTION_DESC',
  PostStatusesDistinctCountIsDefaultAsc = 'POST_STATUSES_DISTINCT_COUNT_IS_DEFAULT_ASC',
  PostStatusesDistinctCountIsDefaultDesc = 'POST_STATUSES_DISTINCT_COUNT_IS_DEFAULT_DESC',
  PostStatusesDistinctCountProjectIdAsc = 'POST_STATUSES_DISTINCT_COUNT_PROJECT_ID_ASC',
  PostStatusesDistinctCountProjectIdDesc = 'POST_STATUSES_DISTINCT_COUNT_PROJECT_ID_DESC',
  PostStatusesDistinctCountRowIdAsc = 'POST_STATUSES_DISTINCT_COUNT_ROW_ID_ASC',
  PostStatusesDistinctCountRowIdDesc = 'POST_STATUSES_DISTINCT_COUNT_ROW_ID_DESC',
  PostStatusesDistinctCountStatusAsc = 'POST_STATUSES_DISTINCT_COUNT_STATUS_ASC',
  PostStatusesDistinctCountStatusDesc = 'POST_STATUSES_DISTINCT_COUNT_STATUS_DESC',
  PostStatusesDistinctCountUpdatedAtAsc = 'POST_STATUSES_DISTINCT_COUNT_UPDATED_AT_ASC',
  PostStatusesDistinctCountUpdatedAtDesc = 'POST_STATUSES_DISTINCT_COUNT_UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `Project`. Fields that are set will be updated. */
export type ProjectPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against many `Post` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManyPostFilter = {
  /** Aggregates across related `Post` match the filter criteria. */
  aggregates?: InputMaybe<PostAggregatesFilter>;
  /** Every related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostFilter>;
  /** No related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostFilter>;
  /** Some related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostFilter>;
};

/** A filter to be used against many `PostStatus` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManyPostStatusFilter = {
  /** Aggregates across related `PostStatus` match the filter criteria. */
  aggregates?: InputMaybe<PostStatusAggregatesFilter>;
  /** Every related `PostStatus` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostStatusFilter>;
  /** No related `PostStatus` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostStatusFilter>;
  /** Some related `PostStatus` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostStatusFilter>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Get a single `Comment`. */
  comment?: Maybe<Comment>;
  /** Reads and enables pagination through a set of `Comment`. */
  comments?: Maybe<CommentConnection>;
  /** Get a single `Downvote`. */
  downvote?: Maybe<Downvote>;
  /** Get a single `Downvote`. */
  downvoteByPostIdAndUserId?: Maybe<Downvote>;
  /** Reads and enables pagination through a set of `Downvote`. */
  downvotes?: Maybe<DownvoteConnection>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** Get a single `Invitation`. */
  invitation?: Maybe<Invitation>;
  /** Get a single `Invitation`. */
  invitationByOrganizationIdAndEmail?: Maybe<Invitation>;
  /** Reads and enables pagination through a set of `Invitation`. */
  invitations?: Maybe<InvitationConnection>;
  /** Get a single `Member`. */
  member?: Maybe<Member>;
  /** Get a single `Member`. */
  memberByUserIdAndOrganizationId?: Maybe<Member>;
  /** Reads and enables pagination through a set of `Member`. */
  members?: Maybe<MemberConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Get a single `Organization`. */
  organization?: Maybe<Organization>;
  /** Get a single `Organization`. */
  organizationByName?: Maybe<Organization>;
  /** Get a single `Organization`. */
  organizationBySlug?: Maybe<Organization>;
  /** Reads and enables pagination through a set of `Organization`. */
  organizations?: Maybe<OrganizationConnection>;
  /** Get a single `Post`. */
  post?: Maybe<Post>;
  /** Get a single `PostStatus`. */
  postStatus?: Maybe<PostStatus>;
  /** Reads and enables pagination through a set of `PostStatus`. */
  postStatuses?: Maybe<PostStatusConnection>;
  /** Reads and enables pagination through a set of `Post`. */
  posts?: Maybe<PostConnection>;
  /** Get a single `Project`. */
  project?: Maybe<Project>;
  /** Get a single `Project`. */
  projectBySlugAndOrganizationId?: Maybe<Project>;
  /** Reads and enables pagination through a set of `Project`. */
  projects?: Maybe<ProjectConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Get a single `Upvote`. */
  upvote?: Maybe<Upvote>;
  /** Get a single `Upvote`. */
  upvoteByPostIdAndUserId?: Maybe<Upvote>;
  /** Reads and enables pagination through a set of `Upvote`. */
  upvotes?: Maybe<UpvoteConnection>;
  /** Get a single `User`. */
  user?: Maybe<User>;
  /** Get a single `User`. */
  userByEmail?: Maybe<User>;
  /** Get a single `User`. */
  userByHidraId?: Maybe<User>;
  /** Get a single `User`. */
  userByUsername?: Maybe<User>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UserConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCommentArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCommentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CommentCondition>;
  filter?: InputMaybe<CommentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CommentOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDownvoteArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDownvoteByPostIdAndUserIdArgs = {
  postId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDownvotesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DownvoteCondition>;
  filter?: InputMaybe<DownvoteFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DownvoteOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryInvitationArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInvitationByOrganizationIdAndEmailArgs = {
  email: Scalars['String']['input'];
  organizationId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInvitationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvitationCondition>;
  filter?: InputMaybe<InvitationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvitationOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMemberArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMemberByUserIdAndOrganizationIdArgs = {
  organizationId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMembersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MemberCondition>;
  filter?: InputMaybe<MemberFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MemberOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationByNameArgs = {
  name: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<OrganizationCondition>;
  filter?: InputMaybe<OrganizationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPostArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostStatusArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostStatusesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostStatusCondition>;
  filter?: InputMaybe<PostStatusFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostStatusOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostCondition>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectBySlugAndOrganizationIdArgs = {
  organizationId: Scalars['UUID']['input'];
  slug: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUpvoteArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUpvoteByPostIdAndUserIdArgs = {
  postId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUpvotesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UpvoteCondition>;
  filter?: InputMaybe<UpvoteFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UpvoteOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByHidraIdArgs = {
  hidraId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByUsernameArgs = {
  username: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCondition>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
};

export enum Role {
  Admin = 'admin',
  Member = 'member',
  Owner = 'owner'
}

/** A filter to be used against Role fields. All fields are combined with a logical ‘and.’ */
export type RoleFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Role>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Role>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Role>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Role>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Role>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Role>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Role>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Role>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Role>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Role>>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']['input']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']['input']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
};

export enum Tier {
  Basic = 'basic',
  Enterprise = 'enterprise',
  Free = 'free',
  Team = 'team'
}

/** A filter to be used against Tier fields. All fields are combined with a logical ‘and.’ */
export type TierFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Tier>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Tier>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Tier>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Tier>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Tier>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Tier>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Tier>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Tier>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Tier>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Tier>>;
};

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['UUID']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['UUID']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['UUID']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['UUID']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

/** All input for the `updateComment` mutation. */
export type UpdateCommentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Comment` being updated. */
  patch: CommentPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Comment` mutation. */
export type UpdateCommentPayload = {
  __typename?: 'UpdateCommentPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Comment` that was updated by this mutation. */
  comment?: Maybe<Comment>;
  /** An edge for our `Comment`. May be used by Relay 1. */
  commentEdge?: Maybe<CommentEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Comment` mutation. */
export type UpdateCommentPayloadCommentEdgeArgs = {
  orderBy?: Array<CommentOrderBy>;
};

/** All input for the `updateDownvote` mutation. */
export type UpdateDownvoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Downvote` being updated. */
  patch: DownvotePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Downvote` mutation. */
export type UpdateDownvotePayload = {
  __typename?: 'UpdateDownvotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Downvote` that was updated by this mutation. */
  downvote?: Maybe<Downvote>;
  /** An edge for our `Downvote`. May be used by Relay 1. */
  downvoteEdge?: Maybe<DownvoteEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Downvote` mutation. */
export type UpdateDownvotePayloadDownvoteEdgeArgs = {
  orderBy?: Array<DownvoteOrderBy>;
};

/** All input for the `updateInvitation` mutation. */
export type UpdateInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Invitation` being updated. */
  patch: InvitationPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Invitation` mutation. */
export type UpdateInvitationPayload = {
  __typename?: 'UpdateInvitationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Invitation` that was updated by this mutation. */
  invitation?: Maybe<Invitation>;
  /** An edge for our `Invitation`. May be used by Relay 1. */
  invitationEdge?: Maybe<InvitationEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Invitation` mutation. */
export type UpdateInvitationPayloadInvitationEdgeArgs = {
  orderBy?: Array<InvitationOrderBy>;
};

/** All input for the `updateMember` mutation. */
export type UpdateMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Member` being updated. */
  patch: MemberPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Member` mutation. */
export type UpdateMemberPayload = {
  __typename?: 'UpdateMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Member` that was updated by this mutation. */
  member?: Maybe<Member>;
  /** An edge for our `Member`. May be used by Relay 1. */
  memberEdge?: Maybe<MemberEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Member` mutation. */
export type UpdateMemberPayloadMemberEdgeArgs = {
  orderBy?: Array<MemberOrderBy>;
};

/** All input for the `updateOrganization` mutation. */
export type UpdateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayload = {
  __typename?: 'UpdateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Organization` that was updated by this mutation. */
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Array<OrganizationOrderBy>;
};

/** All input for the `updatePost` mutation. */
export type UpdatePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Post` being updated. */
  patch: PostPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Post` mutation. */
export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Post` that was updated by this mutation. */
  post?: Maybe<Post>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Post` mutation. */
export type UpdatePostPayloadPostEdgeArgs = {
  orderBy?: Array<PostOrderBy>;
};

/** All input for the `updatePostStatus` mutation. */
export type UpdatePostStatusInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `PostStatus` being updated. */
  patch: PostStatusPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `PostStatus` mutation. */
export type UpdatePostStatusPayload = {
  __typename?: 'UpdatePostStatusPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `PostStatus` that was updated by this mutation. */
  postStatus?: Maybe<PostStatus>;
  /** An edge for our `PostStatus`. May be used by Relay 1. */
  postStatusEdge?: Maybe<PostStatusEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PostStatus` mutation. */
export type UpdatePostStatusPayloadPostStatusEdgeArgs = {
  orderBy?: Array<PostStatusOrderBy>;
};

/** All input for the `updateProject` mutation. */
export type UpdateProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Project` being updated. */
  patch: ProjectPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Project` mutation. */
export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Project` that was updated by this mutation. */
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Project` mutation. */
export type UpdateProjectPayloadProjectEdgeArgs = {
  orderBy?: Array<ProjectOrderBy>;
};

/** All input for the `updateUpvote` mutation. */
export type UpdateUpvoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Upvote` being updated. */
  patch: UpvotePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Upvote` mutation. */
export type UpdateUpvotePayload = {
  __typename?: 'UpdateUpvotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Upvote` that was updated by this mutation. */
  upvote?: Maybe<Upvote>;
  /** An edge for our `Upvote`. May be used by Relay 1. */
  upvoteEdge?: Maybe<UpvoteEdge>;
};


/** The output of our update `Upvote` mutation. */
export type UpdateUpvotePayloadUpvoteEdgeArgs = {
  orderBy?: Array<UpvoteOrderBy>;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UserEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Array<UserOrderBy>;
};

export type Upvote = {
  __typename?: 'Upvote';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Post` that is related to this `Upvote`. */
  post?: Maybe<Post>;
  postId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `User` that is related to this `Upvote`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};

export type UpvoteAggregates = {
  __typename?: 'UpvoteAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<UpvoteDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Upvote` object types. */
export type UpvoteAggregatesFilter = {
  /** Distinct count aggregate over matching `Upvote` objects. */
  distinctCount?: InputMaybe<UpvoteDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Upvote` object to be included within the aggregate. */
  filter?: InputMaybe<UpvoteFilter>;
};

/** A condition to be used against `Upvote` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UpvoteCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `postId` field. */
  postId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Upvote` values. */
export type UpvoteConnection = {
  __typename?: 'UpvoteConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<UpvoteAggregates>;
  /** A list of edges which contains the `Upvote` and cursor to aid in pagination. */
  edges: Array<Maybe<UpvoteEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<UpvoteAggregates>>;
  /** A list of `Upvote` objects. */
  nodes: Array<Maybe<Upvote>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Upvote` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Upvote` values. */
export type UpvoteConnectionGroupedAggregatesArgs = {
  groupBy: Array<UpvoteGroupBy>;
  having?: InputMaybe<UpvoteHavingInput>;
};

export type UpvoteDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
};

export type UpvoteDistinctCountAggregates = {
  __typename?: 'UpvoteDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of postId across the matching connection */
  postId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of userId across the matching connection */
  userId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Upvote` edge in the connection. */
export type UpvoteEdge = {
  __typename?: 'UpvoteEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Upvote` at the end of the edge. */
  node?: Maybe<Upvote>;
};

/** A filter to be used against `Upvote` object types. All fields are combined with a logical ‘and.’ */
export type UpvoteFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UpvoteFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UpvoteFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UpvoteFilter>>;
  /** Filter by the object’s `post` relation. */
  post?: InputMaybe<PostFilter>;
  /** Filter by the object’s `postId` field. */
  postId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Upvote` for usage during aggregation. */
export enum UpvoteGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  PostId = 'POST_ID',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  UserId = 'USER_ID'
}

export type UpvoteHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UpvoteHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Upvote` aggregates. */
export type UpvoteHavingInput = {
  AND?: InputMaybe<Array<UpvoteHavingInput>>;
  OR?: InputMaybe<Array<UpvoteHavingInput>>;
  average?: InputMaybe<UpvoteHavingAverageInput>;
  distinctCount?: InputMaybe<UpvoteHavingDistinctCountInput>;
  max?: InputMaybe<UpvoteHavingMaxInput>;
  min?: InputMaybe<UpvoteHavingMinInput>;
  stddevPopulation?: InputMaybe<UpvoteHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<UpvoteHavingStddevSampleInput>;
  sum?: InputMaybe<UpvoteHavingSumInput>;
  variancePopulation?: InputMaybe<UpvoteHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<UpvoteHavingVarianceSampleInput>;
};

export type UpvoteHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UpvoteHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UpvoteHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UpvoteHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UpvoteHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UpvoteHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UpvoteHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Upvote` */
export type UpvoteInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  postId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Upvote`. */
export enum UpvoteOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  PostIdAsc = 'POST_ID_ASC',
  PostIdDesc = 'POST_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `Upvote`. Fields that are set will be updated. */
export type UpvotePatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  postId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Reads and enables pagination through a set of `Comment`. */
  comments: CommentConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Downvote`. */
  downvotes: DownvoteConnection;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  hidraId: Scalars['UUID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Member`. */
  members: MemberConnection;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostConnection;
  rowId: Scalars['UUID']['output'];
  tier?: Maybe<Tier>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Upvote`. */
  upvotes: UpvoteConnection;
  username?: Maybe<Scalars['String']['output']>;
};


export type UserCommentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<CommentCondition>;
  filter?: InputMaybe<CommentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CommentOrderBy>>;
};


export type UserDownvotesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DownvoteCondition>;
  filter?: InputMaybe<DownvoteFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DownvoteOrderBy>>;
};


export type UserMembersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MemberCondition>;
  filter?: InputMaybe<MemberFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MemberOrderBy>>;
};


export type UserPostsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostCondition>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type UserUpvotesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UpvoteCondition>;
  filter?: InputMaybe<UpvoteFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UpvoteOrderBy>>;
};

export type UserAggregates = {
  __typename?: 'UserAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<UserDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `hidraId` field. */
  hidraId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `tier` field. */
  tier?: InputMaybe<Tier>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `username` field. */
  username?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `User` values. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<UserAggregates>;
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<Maybe<UserEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<UserAggregates>>;
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `User` values. */
export type UserConnectionGroupedAggregatesArgs = {
  groupBy: Array<UserGroupBy>;
  having?: InputMaybe<UserHavingInput>;
};

export type UserDistinctCountAggregates = {
  __typename?: 'UserDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of email across the matching connection */
  email?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of firstName across the matching connection */
  firstName?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of hidraId across the matching connection */
  hidraId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of lastName across the matching connection */
  lastName?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tier across the matching connection */
  tier?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of username across the matching connection */
  username?: Maybe<Scalars['BigInt']['output']>;
};

/** A `User` edge in the connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `comments` relation. */
  comments?: InputMaybe<UserToManyCommentFilter>;
  /** Some related `comments` exist. */
  commentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `downvotes` relation. */
  downvotes?: InputMaybe<UserToManyDownvoteFilter>;
  /** Some related `downvotes` exist. */
  downvotesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `firstName` field. */
  firstName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `hidraId` field. */
  hidraId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `lastName` field. */
  lastName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `members` relation. */
  members?: InputMaybe<UserToManyMemberFilter>;
  /** Some related `members` exist. */
  membersExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Negates the expression. */
  not?: InputMaybe<UserFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `posts` relation. */
  posts?: InputMaybe<UserToManyPostFilter>;
  /** Some related `posts` exist. */
  postsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `tier` field. */
  tier?: InputMaybe<TierFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `upvotes` relation. */
  upvotes?: InputMaybe<UserToManyUpvoteFilter>;
  /** Some related `upvotes` exist. */
  upvotesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `username` field. */
  username?: InputMaybe<StringFilter>;
};

/** Grouping methods for `User` for usage during aggregation. */
export enum UserGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  FirstName = 'FIRST_NAME',
  LastName = 'LAST_NAME',
  Tier = 'TIER',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type UserHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `User` aggregates. */
export type UserHavingInput = {
  AND?: InputMaybe<Array<UserHavingInput>>;
  OR?: InputMaybe<Array<UserHavingInput>>;
  average?: InputMaybe<UserHavingAverageInput>;
  distinctCount?: InputMaybe<UserHavingDistinctCountInput>;
  max?: InputMaybe<UserHavingMaxInput>;
  min?: InputMaybe<UserHavingMinInput>;
  stddevPopulation?: InputMaybe<UserHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<UserHavingStddevSampleInput>;
  sum?: InputMaybe<UserHavingSumInput>;
  variancePopulation?: InputMaybe<UserHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<UserHavingVarianceSampleInput>;
};

export type UserHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  hidraId: Scalars['UUID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `User`. */
export enum UserOrderBy {
  CommentsCountAsc = 'COMMENTS_COUNT_ASC',
  CommentsCountDesc = 'COMMENTS_COUNT_DESC',
  CommentsDistinctCountCreatedAtAsc = 'COMMENTS_DISTINCT_COUNT_CREATED_AT_ASC',
  CommentsDistinctCountCreatedAtDesc = 'COMMENTS_DISTINCT_COUNT_CREATED_AT_DESC',
  CommentsDistinctCountMessageAsc = 'COMMENTS_DISTINCT_COUNT_MESSAGE_ASC',
  CommentsDistinctCountMessageDesc = 'COMMENTS_DISTINCT_COUNT_MESSAGE_DESC',
  CommentsDistinctCountParentIdAsc = 'COMMENTS_DISTINCT_COUNT_PARENT_ID_ASC',
  CommentsDistinctCountParentIdDesc = 'COMMENTS_DISTINCT_COUNT_PARENT_ID_DESC',
  CommentsDistinctCountPostIdAsc = 'COMMENTS_DISTINCT_COUNT_POST_ID_ASC',
  CommentsDistinctCountPostIdDesc = 'COMMENTS_DISTINCT_COUNT_POST_ID_DESC',
  CommentsDistinctCountRowIdAsc = 'COMMENTS_DISTINCT_COUNT_ROW_ID_ASC',
  CommentsDistinctCountRowIdDesc = 'COMMENTS_DISTINCT_COUNT_ROW_ID_DESC',
  CommentsDistinctCountUpdatedAtAsc = 'COMMENTS_DISTINCT_COUNT_UPDATED_AT_ASC',
  CommentsDistinctCountUpdatedAtDesc = 'COMMENTS_DISTINCT_COUNT_UPDATED_AT_DESC',
  CommentsDistinctCountUserIdAsc = 'COMMENTS_DISTINCT_COUNT_USER_ID_ASC',
  CommentsDistinctCountUserIdDesc = 'COMMENTS_DISTINCT_COUNT_USER_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DownvotesCountAsc = 'DOWNVOTES_COUNT_ASC',
  DownvotesCountDesc = 'DOWNVOTES_COUNT_DESC',
  DownvotesDistinctCountCreatedAtAsc = 'DOWNVOTES_DISTINCT_COUNT_CREATED_AT_ASC',
  DownvotesDistinctCountCreatedAtDesc = 'DOWNVOTES_DISTINCT_COUNT_CREATED_AT_DESC',
  DownvotesDistinctCountPostIdAsc = 'DOWNVOTES_DISTINCT_COUNT_POST_ID_ASC',
  DownvotesDistinctCountPostIdDesc = 'DOWNVOTES_DISTINCT_COUNT_POST_ID_DESC',
  DownvotesDistinctCountRowIdAsc = 'DOWNVOTES_DISTINCT_COUNT_ROW_ID_ASC',
  DownvotesDistinctCountRowIdDesc = 'DOWNVOTES_DISTINCT_COUNT_ROW_ID_DESC',
  DownvotesDistinctCountUpdatedAtAsc = 'DOWNVOTES_DISTINCT_COUNT_UPDATED_AT_ASC',
  DownvotesDistinctCountUpdatedAtDesc = 'DOWNVOTES_DISTINCT_COUNT_UPDATED_AT_DESC',
  DownvotesDistinctCountUserIdAsc = 'DOWNVOTES_DISTINCT_COUNT_USER_ID_ASC',
  DownvotesDistinctCountUserIdDesc = 'DOWNVOTES_DISTINCT_COUNT_USER_ID_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  HidraIdAsc = 'HIDRA_ID_ASC',
  HidraIdDesc = 'HIDRA_ID_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  MembersCountAsc = 'MEMBERS_COUNT_ASC',
  MembersCountDesc = 'MEMBERS_COUNT_DESC',
  MembersDistinctCountCreatedAtAsc = 'MEMBERS_DISTINCT_COUNT_CREATED_AT_ASC',
  MembersDistinctCountCreatedAtDesc = 'MEMBERS_DISTINCT_COUNT_CREATED_AT_DESC',
  MembersDistinctCountOrganizationIdAsc = 'MEMBERS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  MembersDistinctCountOrganizationIdDesc = 'MEMBERS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  MembersDistinctCountRoleAsc = 'MEMBERS_DISTINCT_COUNT_ROLE_ASC',
  MembersDistinctCountRoleDesc = 'MEMBERS_DISTINCT_COUNT_ROLE_DESC',
  MembersDistinctCountRowIdAsc = 'MEMBERS_DISTINCT_COUNT_ROW_ID_ASC',
  MembersDistinctCountRowIdDesc = 'MEMBERS_DISTINCT_COUNT_ROW_ID_DESC',
  MembersDistinctCountUserIdAsc = 'MEMBERS_DISTINCT_COUNT_USER_ID_ASC',
  MembersDistinctCountUserIdDesc = 'MEMBERS_DISTINCT_COUNT_USER_ID_DESC',
  Natural = 'NATURAL',
  PostsCountAsc = 'POSTS_COUNT_ASC',
  PostsCountDesc = 'POSTS_COUNT_DESC',
  PostsDistinctCountCreatedAtAsc = 'POSTS_DISTINCT_COUNT_CREATED_AT_ASC',
  PostsDistinctCountCreatedAtDesc = 'POSTS_DISTINCT_COUNT_CREATED_AT_DESC',
  PostsDistinctCountDescriptionAsc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_ASC',
  PostsDistinctCountDescriptionDesc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_DESC',
  PostsDistinctCountProjectIdAsc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_ASC',
  PostsDistinctCountProjectIdDesc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_DESC',
  PostsDistinctCountRowIdAsc = 'POSTS_DISTINCT_COUNT_ROW_ID_ASC',
  PostsDistinctCountRowIdDesc = 'POSTS_DISTINCT_COUNT_ROW_ID_DESC',
  PostsDistinctCountStatusIdAsc = 'POSTS_DISTINCT_COUNT_STATUS_ID_ASC',
  PostsDistinctCountStatusIdDesc = 'POSTS_DISTINCT_COUNT_STATUS_ID_DESC',
  PostsDistinctCountStatusUpdatedAtAsc = 'POSTS_DISTINCT_COUNT_STATUS_UPDATED_AT_ASC',
  PostsDistinctCountStatusUpdatedAtDesc = 'POSTS_DISTINCT_COUNT_STATUS_UPDATED_AT_DESC',
  PostsDistinctCountTitleAsc = 'POSTS_DISTINCT_COUNT_TITLE_ASC',
  PostsDistinctCountTitleDesc = 'POSTS_DISTINCT_COUNT_TITLE_DESC',
  PostsDistinctCountUpdatedAtAsc = 'POSTS_DISTINCT_COUNT_UPDATED_AT_ASC',
  PostsDistinctCountUpdatedAtDesc = 'POSTS_DISTINCT_COUNT_UPDATED_AT_DESC',
  PostsDistinctCountUserIdAsc = 'POSTS_DISTINCT_COUNT_USER_ID_ASC',
  PostsDistinctCountUserIdDesc = 'POSTS_DISTINCT_COUNT_USER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TierAsc = 'TIER_ASC',
  TierDesc = 'TIER_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UpvotesCountAsc = 'UPVOTES_COUNT_ASC',
  UpvotesCountDesc = 'UPVOTES_COUNT_DESC',
  UpvotesDistinctCountCreatedAtAsc = 'UPVOTES_DISTINCT_COUNT_CREATED_AT_ASC',
  UpvotesDistinctCountCreatedAtDesc = 'UPVOTES_DISTINCT_COUNT_CREATED_AT_DESC',
  UpvotesDistinctCountPostIdAsc = 'UPVOTES_DISTINCT_COUNT_POST_ID_ASC',
  UpvotesDistinctCountPostIdDesc = 'UPVOTES_DISTINCT_COUNT_POST_ID_DESC',
  UpvotesDistinctCountRowIdAsc = 'UPVOTES_DISTINCT_COUNT_ROW_ID_ASC',
  UpvotesDistinctCountRowIdDesc = 'UPVOTES_DISTINCT_COUNT_ROW_ID_DESC',
  UpvotesDistinctCountUpdatedAtAsc = 'UPVOTES_DISTINCT_COUNT_UPDATED_AT_ASC',
  UpvotesDistinctCountUpdatedAtDesc = 'UPVOTES_DISTINCT_COUNT_UPDATED_AT_DESC',
  UpvotesDistinctCountUserIdAsc = 'UPVOTES_DISTINCT_COUNT_USER_ID_ASC',
  UpvotesDistinctCountUserIdDesc = 'UPVOTES_DISTINCT_COUNT_USER_ID_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC'
}

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  hidraId?: InputMaybe<Scalars['UUID']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against many `Comment` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyCommentFilter = {
  /** Aggregates across related `Comment` match the filter criteria. */
  aggregates?: InputMaybe<CommentAggregatesFilter>;
  /** Every related `Comment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CommentFilter>;
  /** No related `Comment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CommentFilter>;
  /** Some related `Comment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CommentFilter>;
};

/** A filter to be used against many `Downvote` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyDownvoteFilter = {
  /** Aggregates across related `Downvote` match the filter criteria. */
  aggregates?: InputMaybe<DownvoteAggregatesFilter>;
  /** Every related `Downvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<DownvoteFilter>;
  /** No related `Downvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<DownvoteFilter>;
  /** Some related `Downvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<DownvoteFilter>;
};

/** A filter to be used against many `Member` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyMemberFilter = {
  /** Aggregates across related `Member` match the filter criteria. */
  aggregates?: InputMaybe<MemberAggregatesFilter>;
  /** Every related `Member` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<MemberFilter>;
  /** No related `Member` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<MemberFilter>;
  /** Some related `Member` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<MemberFilter>;
};

/** A filter to be used against many `Post` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyPostFilter = {
  /** Aggregates across related `Post` match the filter criteria. */
  aggregates?: InputMaybe<PostAggregatesFilter>;
  /** Every related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostFilter>;
  /** No related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostFilter>;
  /** Some related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostFilter>;
};

/** A filter to be used against many `Upvote` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyUpvoteFilter = {
  /** Aggregates across related `Upvote` match the filter criteria. */
  aggregates?: InputMaybe<UpvoteAggregatesFilter>;
  /** Every related `Upvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<UpvoteFilter>;
  /** No related `Upvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<UpvoteFilter>;
  /** Some related `Upvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<UpvoteFilter>;
};

export type CommentFragment = { __typename?: 'Comment', rowId: string, message?: string | null, createdAt?: Date | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, childComments: { __typename?: 'CommentConnection', totalCount: number } };

export type FeedbackFragment = { __typename?: 'Post', rowId: string, title?: string | null, description?: string | null, statusUpdatedAt?: Date | null, createdAt?: Date | null, updatedAt?: Date | null, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, organization?: { __typename?: 'Organization', rowId: string, name: string, slug: string } | null } | null, status?: { __typename?: 'PostStatus', rowId: string, status: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'UpvoteConnection', totalCount: number }, userUpvotes: { __typename?: 'UpvoteConnection', nodes: Array<{ __typename?: 'Upvote', rowId: string } | null> }, downvotes: { __typename?: 'DownvoteConnection', totalCount: number }, userDownvotes: { __typename?: 'DownvoteConnection', nodes: Array<{ __typename?: 'Downvote', rowId: string } | null> } };

export type InvitationFragment = { __typename?: 'Invitation', rowId: string, email: string, organizationId: string, createdAt?: Date | null, updatedAt?: Date | null, organization?: { __typename?: 'Organization', name: string } | null };

export type MemberFragment = { __typename?: 'Member', rowId: string, organizationId: string, userId: string, role: Role, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, username?: string | null } | null };

export type ReplyFragment = { __typename?: 'Comment', rowId: string, parentId?: string | null, message?: string | null, createdAt?: Date | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null };

export type UserFragment = { __typename?: 'User', rowId: string, hidraId: string, username?: string | null, firstName?: string | null, lastName?: string | null, email: string, tier?: Tier | null };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'CreateCommentPayload', clientMutationId?: string | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'DeleteCommentPayload', clientMutationId?: string | null } | null };

export type CreateDownvoteMutationVariables = Exact<{
  input: CreateDownvoteInput;
}>;


export type CreateDownvoteMutation = { __typename?: 'Mutation', createDownvote?: { __typename?: 'CreateDownvotePayload', clientMutationId?: string | null } | null };

export type DeleteDownvoteMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteDownvoteMutation = { __typename?: 'Mutation', deleteDownvote?: { __typename?: 'DeleteDownvotePayload', clientMutationId?: string | null } | null };

export type CreateInvitationMutationVariables = Exact<{
  input: CreateInvitationInput;
}>;


export type CreateInvitationMutation = { __typename?: 'Mutation', createInvitation?: { __typename?: 'CreateInvitationPayload', invitation?: { __typename?: 'Invitation', email: string, organizationId: string } | null } | null };

export type DeleteInvitationMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteInvitationMutation = { __typename?: 'Mutation', deleteInvitation?: { __typename?: 'DeleteInvitationPayload', clientMutationId?: string | null } | null };

export type CreateMemberMutationVariables = Exact<{
  input: CreateMemberInput;
}>;


export type CreateMemberMutation = { __typename?: 'Mutation', createMember?: { __typename?: 'CreateMemberPayload', clientMutationId?: string | null } | null };

export type RemoveMemberMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type RemoveMemberMutation = { __typename?: 'Mutation', deleteMember?: { __typename?: 'DeleteMemberPayload', member?: { __typename?: 'Member', userId: string, organizationId: string } | null } | null };

export type UpdateMemberMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: MemberPatch;
}>;


export type UpdateMemberMutation = { __typename?: 'Mutation', updateMember?: { __typename?: 'UpdateMemberPayload', clientMutationId?: string | null } | null };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization?: { __typename?: 'CreateOrganizationPayload', organization?: { __typename?: 'Organization', rowId: string, slug: string } | null } | null };

export type DeleteOrganizationMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization?: { __typename?: 'DeleteOrganizationPayload', organization?: { __typename?: 'Organization', rowId: string } | null } | null };

export type LeaveOrganizationMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type LeaveOrganizationMutation = { __typename?: 'Mutation', deleteMember?: { __typename?: 'DeleteMemberPayload', member?: { __typename?: 'Member', userId: string, organizationId: string } | null } | null };

export type UpdateOrganizationMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: OrganizationPatch;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization?: { __typename?: 'UpdateOrganizationPayload', organization?: { __typename?: 'Organization', slug: string } | null } | null };

export type CreateFeedbackMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'CreatePostPayload', clientMutationId?: string | null } | null };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['UUID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'DeletePostPayload', clientMutationId?: string | null } | null };

export type UpdatePostMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: PostPatch;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'UpdatePostPayload', clientMutationId?: string | null } | null };

export type CreatePostStatusMutationVariables = Exact<{
  input: CreatePostStatusInput;
}>;


export type CreatePostStatusMutation = { __typename?: 'Mutation', createPostStatus?: { __typename?: 'CreatePostStatusPayload', clientMutationId?: string | null } | null };

export type DeletePostStatusMutationVariables = Exact<{
  statusId: Scalars['UUID']['input'];
}>;


export type DeletePostStatusMutation = { __typename?: 'Mutation', deletePostStatus?: { __typename?: 'DeletePostStatusPayload', clientMutationId?: string | null } | null };

export type UpdatePostStatusMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: PostStatusPatch;
}>;


export type UpdatePostStatusMutation = { __typename?: 'Mutation', updatePostStatus?: { __typename?: 'UpdatePostStatusPayload', clientMutationId?: string | null } | null };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'CreateProjectPayload', project?: { __typename?: 'Project', rowId: string, slug: string, organization?: { __typename?: 'Organization', slug: string } | null } | null } | null };

export type DeleteProjectMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: { __typename?: 'DeleteProjectPayload', project?: { __typename?: 'Project', rowId: string } | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: ProjectPatch;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'UpdateProjectPayload', project?: { __typename?: 'Project', slug: string } | null } | null };

export type CreateUpvoteMutationVariables = Exact<{
  input: CreateUpvoteInput;
}>;


export type CreateUpvoteMutation = { __typename?: 'Mutation', createUpvote?: { __typename?: 'CreateUpvotePayload', clientMutationId?: string | null } | null };

export type DeleteUpvoteMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteUpvoteMutation = { __typename?: 'Mutation', deleteUpvote?: { __typename?: 'DeleteUpvotePayload', clientMutationId?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  hidraId: Scalars['UUID']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreateUserPayload', user?: { __typename?: 'User', rowId: string } | null } | null };

export type CommentsQueryVariables = Exact<{
  feedbackId: Scalars['UUID']['input'];
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments?: { __typename?: 'CommentConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'CommentEdge', node?: { __typename?: 'Comment', rowId: string, message?: string | null, createdAt?: Date | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, childComments: { __typename?: 'CommentConnection', totalCount: number } } | null } | null> } | null };

export type DashboardAggregatesQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type DashboardAggregatesQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', totalCount: number } | null, users?: { __typename?: 'UserConnection', totalCount: number } | null };

export type FeedbackByIdQueryVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  userId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type FeedbackByIdQuery = { __typename?: 'Query', post?: { __typename?: 'Post', rowId: string, title?: string | null, description?: string | null, statusUpdatedAt?: Date | null, createdAt?: Date | null, updatedAt?: Date | null, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, organization?: { __typename?: 'Organization', rowId: string, name: string, slug: string } | null } | null, status?: { __typename?: 'PostStatus', rowId: string, status: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'UpvoteConnection', totalCount: number }, userUpvotes: { __typename?: 'UpvoteConnection', nodes: Array<{ __typename?: 'Upvote', rowId: string } | null> }, downvotes: { __typename?: 'DownvoteConnection', totalCount: number }, userDownvotes: { __typename?: 'DownvoteConnection', nodes: Array<{ __typename?: 'Downvote', rowId: string } | null> } } | null };

export type InvitationsQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type InvitationsQuery = { __typename?: 'Query', invitations?: { __typename?: 'InvitationConnection', totalCount: number, nodes: Array<{ __typename?: 'Invitation', rowId: string, email: string, organizationId: string, createdAt?: Date | null, updatedAt?: Date | null, organization?: { __typename?: 'Organization', name: string } | null } | null> } | null };

export type MembersQueryVariables = Exact<{
  organizationId: Scalars['UUID']['input'];
  roles?: InputMaybe<Array<Role> | Role>;
  search?: InputMaybe<Scalars['String']['input']>;
  excludeRoles?: InputMaybe<Array<Role> | Role>;
}>;


export type MembersQuery = { __typename?: 'Query', members?: { __typename?: 'MemberConnection', totalCount: number, nodes: Array<{ __typename?: 'Member', rowId: string, organizationId: string, userId: string, role: Role, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, username?: string | null } | null } | null> } | null };

export type NotificationsQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type NotificationsQuery = { __typename?: 'Query', invitations?: { __typename?: 'InvitationConnection', totalCount: number, nodes: Array<{ __typename?: 'Invitation', rowId: string, email: string, organizationId: string, organization?: { __typename?: 'Organization', name: string } | null } | null> } | null };

export type OrganizationQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type OrganizationQuery = { __typename?: 'Query', organizationBySlug?: { __typename?: 'Organization', rowId: string, name: string, slug: string, updatedAt?: Date | null, members: { __typename?: 'MemberConnection', nodes: Array<{ __typename?: 'Member', user?: { __typename?: 'User', tier?: Tier | null } | null } | null> }, projects: { __typename?: 'ProjectConnection', totalCount: number, nodes: Array<{ __typename?: 'Project', rowId: string, name: string, description?: string | null, slug: string, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null> } } | null };

export type OrganizationMetricsQueryVariables = Exact<{
  organizationId: Scalars['UUID']['input'];
}>;


export type OrganizationMetricsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', totalCount: number } | null, posts?: { __typename?: 'PostConnection', totalCount: number } | null, members?: { __typename?: 'MemberConnection', totalCount: number } | null };

export type OrganizationRoleQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  organizationId: Scalars['UUID']['input'];
}>;


export type OrganizationRoleQuery = { __typename?: 'Query', memberByUserIdAndOrganizationId?: { __typename?: 'Member', rowId: string, role: Role } | null };

export type OrganizationsQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy> | OrganizationOrderBy>;
  isMember?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  excludeRoles?: InputMaybe<Array<Role> | Role>;
  search?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type OrganizationsQuery = { __typename?: 'Query', organizations?: { __typename?: 'OrganizationConnection', totalCount: number, nodes: Array<{ __typename?: 'Organization', rowId: string, name: string, slug: string, updatedAt?: Date | null, projects: { __typename?: 'ProjectConnection', totalCount: number }, members: { __typename?: 'MemberConnection', totalCount: number } } | null> } | null };

export type PostsQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
  after?: InputMaybe<Scalars['Cursor']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  excludedStatuses?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean }, nodes: Array<{ __typename?: 'Post', rowId: string, title?: string | null, description?: string | null, statusUpdatedAt?: Date | null, createdAt?: Date | null, updatedAt?: Date | null, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, organization?: { __typename?: 'Organization', rowId: string, name: string, slug: string } | null } | null, status?: { __typename?: 'PostStatus', rowId: string, status: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'UpvoteConnection', totalCount: number }, userUpvotes: { __typename?: 'UpvoteConnection', nodes: Array<{ __typename?: 'Upvote', rowId: string } | null> }, downvotes: { __typename?: 'DownvoteConnection', totalCount: number }, userDownvotes: { __typename?: 'DownvoteConnection', nodes: Array<{ __typename?: 'Downvote', rowId: string } | null> } } | null> } | null };

export type ProjectQueryVariables = Exact<{
  projectSlug: Scalars['String']['input'];
  organizationSlug: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type ProjectQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', nodes: Array<{ __typename?: 'Project', rowId: string, name: string, description?: string | null, slug: string, organization?: { __typename?: 'Organization', rowId: string, name: string, members: { __typename?: 'MemberConnection', nodes: Array<{ __typename?: 'Member', user?: { __typename?: 'User', tier?: Tier | null } | null } | null> } } | null, posts: { __typename?: 'PostConnection', aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null }, userPosts: { __typename?: 'PostConnection', nodes: Array<{ __typename?: 'Post', rowId: string } | null> } } | null> } | null };

export type ProjectBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  organizationId: Scalars['UUID']['input'];
}>;


export type ProjectBySlugQuery = { __typename?: 'Query', projectBySlugAndOrganizationId?: { __typename?: 'Project', rowId: string, name: string } | null };

export type ProjectMetricsQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
}>;


export type ProjectMetricsQuery = { __typename?: 'Query', project?: { __typename?: 'Project', createdAt?: Date | null, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null, upvotes?: { __typename?: 'UpvoteConnection', totalCount: number } | null, downvotes?: { __typename?: 'DownvoteConnection', totalCount: number } | null };

export type ProjectStatusesQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ProjectStatusesQuery = { __typename?: 'Query', postStatuses?: { __typename?: 'PostStatusConnection', nodes: Array<{ __typename?: 'PostStatus', rowId: string, status: string, description?: string | null, color?: string | null, isDefault: boolean } | null> } | null };

export type ProjectsQueryVariables = Exact<{
  pageSize: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  organizationSlug: Scalars['String']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', totalCount: number, nodes: Array<{ __typename?: 'Project', rowId: string, name: string, description?: string | null, slug: string, organization?: { __typename?: 'Organization', rowId: string, slug: string } | null, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null> } | null };

export type RecentFeedbackQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  after?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type RecentFeedbackQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'PostEdge', node?: { __typename?: 'Post', rowId: string, createdAt?: Date | null, title?: string | null, description?: string | null, project?: { __typename?: 'Project', name: string, slug: string, organization?: { __typename?: 'Organization', slug: string } | null } | null, status?: { __typename?: 'PostStatus', rowId: string, status: string, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null } | null } | null> } | null };

export type RepliesQueryVariables = Exact<{
  commentId: Scalars['UUID']['input'];
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type RepliesQuery = { __typename?: 'Query', comments?: { __typename?: 'CommentConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'CommentEdge', node?: { __typename?: 'Comment', rowId: string, parentId?: string | null, message?: string | null, createdAt?: Date | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null } | null } | null> } | null };

export type StatusBreakdownQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
}>;


export type StatusBreakdownQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', groupedAggregates?: Array<{ __typename?: 'PostAggregates', keys?: Array<string | null> | null, distinctCount?: { __typename?: 'PostDistinctCountAggregates', rowId?: string | null } | null }> | null } | null };

export type UserQueryVariables = Exact<{
  hidraId: Scalars['UUID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', userByHidraId?: { __typename?: 'User', rowId: string, hidraId: string, username?: string | null, firstName?: string | null, lastName?: string | null, email: string, tier?: Tier | null } | null };

export type UserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserByEmailQuery = { __typename?: 'Query', userByEmail?: { __typename?: 'User', rowId: string, hidraId: string, username?: string | null, firstName?: string | null, lastName?: string | null, email: string } | null };

export type WeeklyFeedbackQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  startDate: Scalars['Datetime']['input'];
}>;


export type WeeklyFeedbackQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', groupedAggregates?: Array<{ __typename?: 'PostAggregates', keys?: Array<string | null> | null, distinctCount?: { __typename?: 'PostDistinctCountAggregates', rowId?: string | null } | null }> | null } | null };


export const CommentFragmentDoc = `
    fragment Comment on Comment {
  rowId
  message
  user {
    rowId
    username
  }
  createdAt
  childComments {
    totalCount
  }
}
    `;
export const FeedbackFragmentDoc = `
    fragment Feedback on Post {
  rowId
  title
  description
  statusUpdatedAt
  createdAt
  updatedAt
  project {
    rowId
    name
    slug
    organization {
      rowId
      name
      slug
    }
  }
  status {
    rowId
    status
    description
    color
  }
  user {
    rowId
    username
  }
  comments(condition: {parentId: null}) {
    totalCount
  }
  commentsWithReplies: comments {
    totalCount
  }
  upvotes {
    totalCount
  }
  userUpvotes: upvotes(condition: {userId: $userId}) {
    nodes {
      rowId
    }
  }
  downvotes {
    totalCount
  }
  userDownvotes: downvotes(condition: {userId: $userId}) {
    nodes {
      rowId
    }
  }
}
    `;
export const InvitationFragmentDoc = `
    fragment Invitation on Invitation {
  rowId
  email
  organizationId
  organization {
    name
  }
  createdAt
  updatedAt
}
    `;
export const MemberFragmentDoc = `
    fragment Member on Member {
  rowId
  organizationId
  userId
  role
  user {
    firstName
    lastName
    username
  }
}
    `;
export const ReplyFragmentDoc = `
    fragment Reply on Comment {
  rowId
  parentId
  message
  user {
    rowId
    username
  }
  createdAt
}
    `;
export const UserFragmentDoc = `
    fragment User on User {
  rowId
  hidraId
  username
  firstName
  lastName
  email
  tier
}
    `;
export const CreateCommentDocument = `
    mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    clientMutationId
  }
}
    `;

export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>) => {
    
    return useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      {
    mutationKey: ['CreateComment'],
    mutationFn: (variables?: CreateCommentMutationVariables) => graphqlFetch<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, variables)(),
    ...options
  }
    )};

useCreateCommentMutation.getKey = () => ['CreateComment'];


useCreateCommentMutation.fetcher = (variables: CreateCommentMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, variables, options);

export const DeleteCommentDocument = `
    mutation DeleteComment($rowId: UUID!) {
  deleteComment(input: {rowId: $rowId}) {
    clientMutationId
  }
}
    `;

export const useDeleteCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>) => {
    
    return useMutation<DeleteCommentMutation, TError, DeleteCommentMutationVariables, TContext>(
      {
    mutationKey: ['DeleteComment'],
    mutationFn: (variables?: DeleteCommentMutationVariables) => graphqlFetch<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, variables)(),
    ...options
  }
    )};

useDeleteCommentMutation.getKey = () => ['DeleteComment'];


useDeleteCommentMutation.fetcher = (variables: DeleteCommentMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, variables, options);

export const CreateDownvoteDocument = `
    mutation CreateDownvote($input: CreateDownvoteInput!) {
  createDownvote(input: $input) {
    clientMutationId
  }
}
    `;

export const useCreateDownvoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateDownvoteMutation, TError, CreateDownvoteMutationVariables, TContext>) => {
    
    return useMutation<CreateDownvoteMutation, TError, CreateDownvoteMutationVariables, TContext>(
      {
    mutationKey: ['CreateDownvote'],
    mutationFn: (variables?: CreateDownvoteMutationVariables) => graphqlFetch<CreateDownvoteMutation, CreateDownvoteMutationVariables>(CreateDownvoteDocument, variables)(),
    ...options
  }
    )};

useCreateDownvoteMutation.getKey = () => ['CreateDownvote'];


useCreateDownvoteMutation.fetcher = (variables: CreateDownvoteMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateDownvoteMutation, CreateDownvoteMutationVariables>(CreateDownvoteDocument, variables, options);

export const DeleteDownvoteDocument = `
    mutation DeleteDownvote($rowId: UUID!) {
  deleteDownvote(input: {rowId: $rowId}) {
    clientMutationId
  }
}
    `;

export const useDeleteDownvoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteDownvoteMutation, TError, DeleteDownvoteMutationVariables, TContext>) => {
    
    return useMutation<DeleteDownvoteMutation, TError, DeleteDownvoteMutationVariables, TContext>(
      {
    mutationKey: ['DeleteDownvote'],
    mutationFn: (variables?: DeleteDownvoteMutationVariables) => graphqlFetch<DeleteDownvoteMutation, DeleteDownvoteMutationVariables>(DeleteDownvoteDocument, variables)(),
    ...options
  }
    )};

useDeleteDownvoteMutation.getKey = () => ['DeleteDownvote'];


useDeleteDownvoteMutation.fetcher = (variables: DeleteDownvoteMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteDownvoteMutation, DeleteDownvoteMutationVariables>(DeleteDownvoteDocument, variables, options);

export const CreateInvitationDocument = `
    mutation CreateInvitation($input: CreateInvitationInput!) {
  createInvitation(input: $input) {
    invitation {
      email
      organizationId
    }
  }
}
    `;

export const useCreateInvitationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateInvitationMutation, TError, CreateInvitationMutationVariables, TContext>) => {
    
    return useMutation<CreateInvitationMutation, TError, CreateInvitationMutationVariables, TContext>(
      {
    mutationKey: ['CreateInvitation'],
    mutationFn: (variables?: CreateInvitationMutationVariables) => graphqlFetch<CreateInvitationMutation, CreateInvitationMutationVariables>(CreateInvitationDocument, variables)(),
    ...options
  }
    )};

useCreateInvitationMutation.getKey = () => ['CreateInvitation'];


useCreateInvitationMutation.fetcher = (variables: CreateInvitationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateInvitationMutation, CreateInvitationMutationVariables>(CreateInvitationDocument, variables, options);

export const DeleteInvitationDocument = `
    mutation DeleteInvitation($rowId: UUID!) {
  deleteInvitation(input: {rowId: $rowId}) {
    clientMutationId
  }
}
    `;

export const useDeleteInvitationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteInvitationMutation, TError, DeleteInvitationMutationVariables, TContext>) => {
    
    return useMutation<DeleteInvitationMutation, TError, DeleteInvitationMutationVariables, TContext>(
      {
    mutationKey: ['DeleteInvitation'],
    mutationFn: (variables?: DeleteInvitationMutationVariables) => graphqlFetch<DeleteInvitationMutation, DeleteInvitationMutationVariables>(DeleteInvitationDocument, variables)(),
    ...options
  }
    )};

useDeleteInvitationMutation.getKey = () => ['DeleteInvitation'];


useDeleteInvitationMutation.fetcher = (variables: DeleteInvitationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteInvitationMutation, DeleteInvitationMutationVariables>(DeleteInvitationDocument, variables, options);

export const CreateMemberDocument = `
    mutation CreateMember($input: CreateMemberInput!) {
  createMember(input: $input) {
    clientMutationId
  }
}
    `;

export const useCreateMemberMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateMemberMutation, TError, CreateMemberMutationVariables, TContext>) => {
    
    return useMutation<CreateMemberMutation, TError, CreateMemberMutationVariables, TContext>(
      {
    mutationKey: ['CreateMember'],
    mutationFn: (variables?: CreateMemberMutationVariables) => graphqlFetch<CreateMemberMutation, CreateMemberMutationVariables>(CreateMemberDocument, variables)(),
    ...options
  }
    )};

useCreateMemberMutation.getKey = () => ['CreateMember'];


useCreateMemberMutation.fetcher = (variables: CreateMemberMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateMemberMutation, CreateMemberMutationVariables>(CreateMemberDocument, variables, options);

export const RemoveMemberDocument = `
    mutation RemoveMember($rowId: UUID!) {
  deleteMember(input: {rowId: $rowId}) {
    member {
      userId
      organizationId
    }
  }
}
    `;

export const useRemoveMemberMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RemoveMemberMutation, TError, RemoveMemberMutationVariables, TContext>) => {
    
    return useMutation<RemoveMemberMutation, TError, RemoveMemberMutationVariables, TContext>(
      {
    mutationKey: ['RemoveMember'],
    mutationFn: (variables?: RemoveMemberMutationVariables) => graphqlFetch<RemoveMemberMutation, RemoveMemberMutationVariables>(RemoveMemberDocument, variables)(),
    ...options
  }
    )};

useRemoveMemberMutation.getKey = () => ['RemoveMember'];


useRemoveMemberMutation.fetcher = (variables: RemoveMemberMutationVariables, options?: RequestInit['headers']) => graphqlFetch<RemoveMemberMutation, RemoveMemberMutationVariables>(RemoveMemberDocument, variables, options);

export const UpdateMemberDocument = `
    mutation UpdateMember($rowId: UUID!, $patch: MemberPatch!) {
  updateMember(input: {rowId: $rowId, patch: $patch}) {
    clientMutationId
  }
}
    `;

export const useUpdateMemberMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateMemberMutation, TError, UpdateMemberMutationVariables, TContext>) => {
    
    return useMutation<UpdateMemberMutation, TError, UpdateMemberMutationVariables, TContext>(
      {
    mutationKey: ['UpdateMember'],
    mutationFn: (variables?: UpdateMemberMutationVariables) => graphqlFetch<UpdateMemberMutation, UpdateMemberMutationVariables>(UpdateMemberDocument, variables)(),
    ...options
  }
    )};

useUpdateMemberMutation.getKey = () => ['UpdateMember'];


useUpdateMemberMutation.fetcher = (variables: UpdateMemberMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateMemberMutation, UpdateMemberMutationVariables>(UpdateMemberDocument, variables, options);

export const CreateOrganizationDocument = `
    mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    organization {
      rowId
      slug
    }
  }
}
    `;

export const useCreateOrganizationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateOrganizationMutation, TError, CreateOrganizationMutationVariables, TContext>) => {
    
    return useMutation<CreateOrganizationMutation, TError, CreateOrganizationMutationVariables, TContext>(
      {
    mutationKey: ['CreateOrganization'],
    mutationFn: (variables?: CreateOrganizationMutationVariables) => graphqlFetch<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, variables)(),
    ...options
  }
    )};

useCreateOrganizationMutation.getKey = () => ['CreateOrganization'];


useCreateOrganizationMutation.fetcher = (variables: CreateOrganizationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, variables, options);

export const DeleteOrganizationDocument = `
    mutation DeleteOrganization($rowId: UUID!) {
  deleteOrganization(input: {rowId: $rowId}) {
    organization {
      rowId
    }
  }
}
    `;

export const useDeleteOrganizationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteOrganizationMutation, TError, DeleteOrganizationMutationVariables, TContext>) => {
    
    return useMutation<DeleteOrganizationMutation, TError, DeleteOrganizationMutationVariables, TContext>(
      {
    mutationKey: ['DeleteOrganization'],
    mutationFn: (variables?: DeleteOrganizationMutationVariables) => graphqlFetch<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>(DeleteOrganizationDocument, variables)(),
    ...options
  }
    )};

useDeleteOrganizationMutation.getKey = () => ['DeleteOrganization'];


useDeleteOrganizationMutation.fetcher = (variables: DeleteOrganizationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteOrganizationMutation, DeleteOrganizationMutationVariables>(DeleteOrganizationDocument, variables, options);

export const LeaveOrganizationDocument = `
    mutation LeaveOrganization($rowId: UUID!) {
  deleteMember(input: {rowId: $rowId}) {
    member {
      userId
      organizationId
    }
  }
}
    `;

export const useLeaveOrganizationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LeaveOrganizationMutation, TError, LeaveOrganizationMutationVariables, TContext>) => {
    
    return useMutation<LeaveOrganizationMutation, TError, LeaveOrganizationMutationVariables, TContext>(
      {
    mutationKey: ['LeaveOrganization'],
    mutationFn: (variables?: LeaveOrganizationMutationVariables) => graphqlFetch<LeaveOrganizationMutation, LeaveOrganizationMutationVariables>(LeaveOrganizationDocument, variables)(),
    ...options
  }
    )};

useLeaveOrganizationMutation.getKey = () => ['LeaveOrganization'];


useLeaveOrganizationMutation.fetcher = (variables: LeaveOrganizationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<LeaveOrganizationMutation, LeaveOrganizationMutationVariables>(LeaveOrganizationDocument, variables, options);

export const UpdateOrganizationDocument = `
    mutation UpdateOrganization($rowId: UUID!, $patch: OrganizationPatch!) {
  updateOrganization(input: {rowId: $rowId, patch: $patch}) {
    organization {
      slug
    }
  }
}
    `;

export const useUpdateOrganizationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateOrganizationMutation, TError, UpdateOrganizationMutationVariables, TContext>) => {
    
    return useMutation<UpdateOrganizationMutation, TError, UpdateOrganizationMutationVariables, TContext>(
      {
    mutationKey: ['UpdateOrganization'],
    mutationFn: (variables?: UpdateOrganizationMutationVariables) => graphqlFetch<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, variables)(),
    ...options
  }
    )};

useUpdateOrganizationMutation.getKey = () => ['UpdateOrganization'];


useUpdateOrganizationMutation.fetcher = (variables: UpdateOrganizationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, variables, options);

export const CreateFeedbackDocument = `
    mutation CreateFeedback($input: CreatePostInput!) {
  createPost(input: $input) {
    clientMutationId
  }
}
    `;

export const useCreateFeedbackMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateFeedbackMutation, TError, CreateFeedbackMutationVariables, TContext>) => {
    
    return useMutation<CreateFeedbackMutation, TError, CreateFeedbackMutationVariables, TContext>(
      {
    mutationKey: ['CreateFeedback'],
    mutationFn: (variables?: CreateFeedbackMutationVariables) => graphqlFetch<CreateFeedbackMutation, CreateFeedbackMutationVariables>(CreateFeedbackDocument, variables)(),
    ...options
  }
    )};

useCreateFeedbackMutation.getKey = () => ['CreateFeedback'];


useCreateFeedbackMutation.fetcher = (variables: CreateFeedbackMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateFeedbackMutation, CreateFeedbackMutationVariables>(CreateFeedbackDocument, variables, options);

export const DeletePostDocument = `
    mutation DeletePost($postId: UUID!) {
  deletePost(input: {rowId: $postId}) {
    clientMutationId
  }
}
    `;

export const useDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>) => {
    
    return useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
      {
    mutationKey: ['DeletePost'],
    mutationFn: (variables?: DeletePostMutationVariables) => graphqlFetch<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, variables)(),
    ...options
  }
    )};

useDeletePostMutation.getKey = () => ['DeletePost'];


useDeletePostMutation.fetcher = (variables: DeletePostMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, variables, options);

export const UpdatePostDocument = `
    mutation UpdatePost($rowId: UUID!, $patch: PostPatch!) {
  updatePost(input: {rowId: $rowId, patch: $patch}) {
    clientMutationId
  }
}
    `;

export const useUpdatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>) => {
    
    return useMutation<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>(
      {
    mutationKey: ['UpdatePost'],
    mutationFn: (variables?: UpdatePostMutationVariables) => graphqlFetch<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, variables)(),
    ...options
  }
    )};

useUpdatePostMutation.getKey = () => ['UpdatePost'];


useUpdatePostMutation.fetcher = (variables: UpdatePostMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, variables, options);

export const CreatePostStatusDocument = `
    mutation CreatePostStatus($input: CreatePostStatusInput!) {
  createPostStatus(input: $input) {
    clientMutationId
  }
}
    `;

export const useCreatePostStatusMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreatePostStatusMutation, TError, CreatePostStatusMutationVariables, TContext>) => {
    
    return useMutation<CreatePostStatusMutation, TError, CreatePostStatusMutationVariables, TContext>(
      {
    mutationKey: ['CreatePostStatus'],
    mutationFn: (variables?: CreatePostStatusMutationVariables) => graphqlFetch<CreatePostStatusMutation, CreatePostStatusMutationVariables>(CreatePostStatusDocument, variables)(),
    ...options
  }
    )};

useCreatePostStatusMutation.getKey = () => ['CreatePostStatus'];


useCreatePostStatusMutation.fetcher = (variables: CreatePostStatusMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreatePostStatusMutation, CreatePostStatusMutationVariables>(CreatePostStatusDocument, variables, options);

export const DeletePostStatusDocument = `
    mutation DeletePostStatus($statusId: UUID!) {
  deletePostStatus(input: {rowId: $statusId}) {
    clientMutationId
  }
}
    `;

export const useDeletePostStatusMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeletePostStatusMutation, TError, DeletePostStatusMutationVariables, TContext>) => {
    
    return useMutation<DeletePostStatusMutation, TError, DeletePostStatusMutationVariables, TContext>(
      {
    mutationKey: ['DeletePostStatus'],
    mutationFn: (variables?: DeletePostStatusMutationVariables) => graphqlFetch<DeletePostStatusMutation, DeletePostStatusMutationVariables>(DeletePostStatusDocument, variables)(),
    ...options
  }
    )};

useDeletePostStatusMutation.getKey = () => ['DeletePostStatus'];


useDeletePostStatusMutation.fetcher = (variables: DeletePostStatusMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeletePostStatusMutation, DeletePostStatusMutationVariables>(DeletePostStatusDocument, variables, options);

export const UpdatePostStatusDocument = `
    mutation UpdatePostStatus($rowId: UUID!, $patch: PostStatusPatch!) {
  updatePostStatus(input: {rowId: $rowId, patch: $patch}) {
    clientMutationId
  }
}
    `;

export const useUpdatePostStatusMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdatePostStatusMutation, TError, UpdatePostStatusMutationVariables, TContext>) => {
    
    return useMutation<UpdatePostStatusMutation, TError, UpdatePostStatusMutationVariables, TContext>(
      {
    mutationKey: ['UpdatePostStatus'],
    mutationFn: (variables?: UpdatePostStatusMutationVariables) => graphqlFetch<UpdatePostStatusMutation, UpdatePostStatusMutationVariables>(UpdatePostStatusDocument, variables)(),
    ...options
  }
    )};

useUpdatePostStatusMutation.getKey = () => ['UpdatePostStatus'];


useUpdatePostStatusMutation.fetcher = (variables: UpdatePostStatusMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdatePostStatusMutation, UpdatePostStatusMutationVariables>(UpdatePostStatusDocument, variables, options);

export const CreateProjectDocument = `
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    project {
      rowId
      slug
      organization {
        slug
      }
    }
  }
}
    `;

export const useCreateProjectMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateProjectMutation, TError, CreateProjectMutationVariables, TContext>) => {
    
    return useMutation<CreateProjectMutation, TError, CreateProjectMutationVariables, TContext>(
      {
    mutationKey: ['CreateProject'],
    mutationFn: (variables?: CreateProjectMutationVariables) => graphqlFetch<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, variables)(),
    ...options
  }
    )};

useCreateProjectMutation.getKey = () => ['CreateProject'];


useCreateProjectMutation.fetcher = (variables: CreateProjectMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, variables, options);

export const DeleteProjectDocument = `
    mutation DeleteProject($rowId: UUID!) {
  deleteProject(input: {rowId: $rowId}) {
    project {
      rowId
    }
  }
}
    `;

export const useDeleteProjectMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteProjectMutation, TError, DeleteProjectMutationVariables, TContext>) => {
    
    return useMutation<DeleteProjectMutation, TError, DeleteProjectMutationVariables, TContext>(
      {
    mutationKey: ['DeleteProject'],
    mutationFn: (variables?: DeleteProjectMutationVariables) => graphqlFetch<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, variables)(),
    ...options
  }
    )};

useDeleteProjectMutation.getKey = () => ['DeleteProject'];


useDeleteProjectMutation.fetcher = (variables: DeleteProjectMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, variables, options);

export const UpdateProjectDocument = `
    mutation UpdateProject($rowId: UUID!, $patch: ProjectPatch!) {
  updateProject(input: {rowId: $rowId, patch: $patch}) {
    project {
      slug
    }
  }
}
    `;

export const useUpdateProjectMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateProjectMutation, TError, UpdateProjectMutationVariables, TContext>) => {
    
    return useMutation<UpdateProjectMutation, TError, UpdateProjectMutationVariables, TContext>(
      {
    mutationKey: ['UpdateProject'],
    mutationFn: (variables?: UpdateProjectMutationVariables) => graphqlFetch<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, variables)(),
    ...options
  }
    )};

useUpdateProjectMutation.getKey = () => ['UpdateProject'];


useUpdateProjectMutation.fetcher = (variables: UpdateProjectMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, variables, options);

export const CreateUpvoteDocument = `
    mutation CreateUpvote($input: CreateUpvoteInput!) {
  createUpvote(input: $input) {
    clientMutationId
  }
}
    `;

export const useCreateUpvoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateUpvoteMutation, TError, CreateUpvoteMutationVariables, TContext>) => {
    
    return useMutation<CreateUpvoteMutation, TError, CreateUpvoteMutationVariables, TContext>(
      {
    mutationKey: ['CreateUpvote'],
    mutationFn: (variables?: CreateUpvoteMutationVariables) => graphqlFetch<CreateUpvoteMutation, CreateUpvoteMutationVariables>(CreateUpvoteDocument, variables)(),
    ...options
  }
    )};

useCreateUpvoteMutation.getKey = () => ['CreateUpvote'];


useCreateUpvoteMutation.fetcher = (variables: CreateUpvoteMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateUpvoteMutation, CreateUpvoteMutationVariables>(CreateUpvoteDocument, variables, options);

export const DeleteUpvoteDocument = `
    mutation DeleteUpvote($rowId: UUID!) {
  deleteUpvote(input: {rowId: $rowId}) {
    clientMutationId
  }
}
    `;

export const useDeleteUpvoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteUpvoteMutation, TError, DeleteUpvoteMutationVariables, TContext>) => {
    
    return useMutation<DeleteUpvoteMutation, TError, DeleteUpvoteMutationVariables, TContext>(
      {
    mutationKey: ['DeleteUpvote'],
    mutationFn: (variables?: DeleteUpvoteMutationVariables) => graphqlFetch<DeleteUpvoteMutation, DeleteUpvoteMutationVariables>(DeleteUpvoteDocument, variables)(),
    ...options
  }
    )};

useDeleteUpvoteMutation.getKey = () => ['DeleteUpvote'];


useDeleteUpvoteMutation.fetcher = (variables: DeleteUpvoteMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteUpvoteMutation, DeleteUpvoteMutationVariables>(DeleteUpvoteDocument, variables, options);

export const CreateUserDocument = `
    mutation CreateUser($hidraId: UUID!, $username: String, $firstName: String, $lastName: String, $email: String!) {
  createUser(
    input: {user: {hidraId: $hidraId, username: $username, firstName: $firstName, lastName: $lastName, email: $email}}
  ) {
    user {
      rowId
    }
  }
}
    `;

export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>) => {
    
    return useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      {
    mutationKey: ['CreateUser'],
    mutationFn: (variables?: CreateUserMutationVariables) => graphqlFetch<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables)(),
    ...options
  }
    )};

useCreateUserMutation.getKey = () => ['CreateUser'];


useCreateUserMutation.fetcher = (variables: CreateUserMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables, options);

export const CommentsDocument = `
    query Comments($feedbackId: UUID!, $pageSize: Int = 10, $after: Cursor) {
  comments(
    first: $pageSize
    after: $after
    orderBy: CREATED_AT_DESC
    condition: {postId: $feedbackId, parentId: null}
  ) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...Comment
      }
    }
  }
}
    ${CommentFragmentDoc}`;

export const useCommentsQuery = <
      TData = CommentsQuery,
      TError = unknown
    >(
      variables: CommentsQueryVariables,
      options?: Omit<UseQueryOptions<CommentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<CommentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<CommentsQuery, TError, TData>(
      {
    queryKey: ['Comments', variables],
    queryFn: graphqlFetch<CommentsQuery, CommentsQueryVariables>(CommentsDocument, variables),
    ...options
  }
    )};

useCommentsQuery.getKey = (variables: CommentsQueryVariables) => ['Comments', variables];

export const useInfiniteCommentsQuery = <
      TData = InfiniteData<CommentsQuery>,
      TError = unknown
    >(
      variables: CommentsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<CommentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<CommentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<CommentsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Comments.infinite', variables],
      queryFn: (metaData) => graphqlFetch<CommentsQuery, CommentsQueryVariables>(CommentsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteCommentsQuery.getKey = (variables: CommentsQueryVariables) => ['Comments.infinite', variables];


useCommentsQuery.fetcher = (variables: CommentsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<CommentsQuery, CommentsQueryVariables>(CommentsDocument, variables, options);

export const DashboardAggregatesDocument = `
    query DashboardAggregates($userId: UUID!) {
  posts(
    filter: {project: {organization: {members: {some: {userId: {equalTo: $userId}}}}}}
  ) {
    totalCount
  }
  users(
    filter: {members: {some: {organization: {members: {some: {userId: {equalTo: $userId}}}}}}}
  ) {
    totalCount
  }
}
    `;

export const useDashboardAggregatesQuery = <
      TData = DashboardAggregatesQuery,
      TError = unknown
    >(
      variables: DashboardAggregatesQueryVariables,
      options?: Omit<UseQueryOptions<DashboardAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<DashboardAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<DashboardAggregatesQuery, TError, TData>(
      {
    queryKey: ['DashboardAggregates', variables],
    queryFn: graphqlFetch<DashboardAggregatesQuery, DashboardAggregatesQueryVariables>(DashboardAggregatesDocument, variables),
    ...options
  }
    )};

useDashboardAggregatesQuery.getKey = (variables: DashboardAggregatesQueryVariables) => ['DashboardAggregates', variables];

export const useInfiniteDashboardAggregatesQuery = <
      TData = InfiniteData<DashboardAggregatesQuery>,
      TError = unknown
    >(
      variables: DashboardAggregatesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<DashboardAggregatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<DashboardAggregatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<DashboardAggregatesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['DashboardAggregates.infinite', variables],
      queryFn: (metaData) => graphqlFetch<DashboardAggregatesQuery, DashboardAggregatesQueryVariables>(DashboardAggregatesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteDashboardAggregatesQuery.getKey = (variables: DashboardAggregatesQueryVariables) => ['DashboardAggregates.infinite', variables];


useDashboardAggregatesQuery.fetcher = (variables: DashboardAggregatesQueryVariables, options?: RequestInit['headers']) => graphqlFetch<DashboardAggregatesQuery, DashboardAggregatesQueryVariables>(DashboardAggregatesDocument, variables, options);

export const FeedbackByIdDocument = `
    query FeedbackById($rowId: UUID!, $userId: UUID) {
  post(rowId: $rowId) {
    ...Feedback
  }
}
    ${FeedbackFragmentDoc}`;

export const useFeedbackByIdQuery = <
      TData = FeedbackByIdQuery,
      TError = unknown
    >(
      variables: FeedbackByIdQueryVariables,
      options?: Omit<UseQueryOptions<FeedbackByIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FeedbackByIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FeedbackByIdQuery, TError, TData>(
      {
    queryKey: ['FeedbackById', variables],
    queryFn: graphqlFetch<FeedbackByIdQuery, FeedbackByIdQueryVariables>(FeedbackByIdDocument, variables),
    ...options
  }
    )};

useFeedbackByIdQuery.getKey = (variables: FeedbackByIdQueryVariables) => ['FeedbackById', variables];

export const useInfiniteFeedbackByIdQuery = <
      TData = InfiniteData<FeedbackByIdQuery>,
      TError = unknown
    >(
      variables: FeedbackByIdQueryVariables,
      options: Omit<UseInfiniteQueryOptions<FeedbackByIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<FeedbackByIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<FeedbackByIdQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['FeedbackById.infinite', variables],
      queryFn: (metaData) => graphqlFetch<FeedbackByIdQuery, FeedbackByIdQueryVariables>(FeedbackByIdDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteFeedbackByIdQuery.getKey = (variables: FeedbackByIdQueryVariables) => ['FeedbackById.infinite', variables];


useFeedbackByIdQuery.fetcher = (variables: FeedbackByIdQueryVariables, options?: RequestInit['headers']) => graphqlFetch<FeedbackByIdQuery, FeedbackByIdQueryVariables>(FeedbackByIdDocument, variables, options);

export const InvitationsDocument = `
    query Invitations($email: String, $organizationId: UUID) {
  invitations(
    orderBy: CREATED_AT_DESC
    condition: {email: $email, organizationId: $organizationId}
  ) {
    totalCount
    nodes {
      ...Invitation
    }
  }
}
    ${InvitationFragmentDoc}`;

export const useInvitationsQuery = <
      TData = InvitationsQuery,
      TError = unknown
    >(
      variables?: InvitationsQueryVariables,
      options?: Omit<UseQueryOptions<InvitationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<InvitationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<InvitationsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Invitations'] : ['Invitations', variables],
    queryFn: graphqlFetch<InvitationsQuery, InvitationsQueryVariables>(InvitationsDocument, variables),
    ...options
  }
    )};

useInvitationsQuery.getKey = (variables?: InvitationsQueryVariables) => variables === undefined ? ['Invitations'] : ['Invitations', variables];

export const useInfiniteInvitationsQuery = <
      TData = InfiniteData<InvitationsQuery>,
      TError = unknown
    >(
      variables: InvitationsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<InvitationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<InvitationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<InvitationsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['Invitations.infinite'] : ['Invitations.infinite', variables],
      queryFn: (metaData) => graphqlFetch<InvitationsQuery, InvitationsQueryVariables>(InvitationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteInvitationsQuery.getKey = (variables?: InvitationsQueryVariables) => variables === undefined ? ['Invitations.infinite'] : ['Invitations.infinite', variables];


useInvitationsQuery.fetcher = (variables?: InvitationsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<InvitationsQuery, InvitationsQueryVariables>(InvitationsDocument, variables, options);

export const MembersDocument = `
    query Members($organizationId: UUID!, $roles: [Role!], $search: String, $excludeRoles: [Role!]) {
  members(
    orderBy: ROLE_ASC
    condition: {organizationId: $organizationId}
    filter: {role: {in: $roles, notIn: $excludeRoles}, user: {or: [{firstName: {includesInsensitive: $search}}, {lastName: {includesInsensitive: $search}}, {username: {includesInsensitive: $search}}]}}
  ) {
    totalCount
    nodes {
      ...Member
    }
  }
}
    ${MemberFragmentDoc}`;

export const useMembersQuery = <
      TData = MembersQuery,
      TError = unknown
    >(
      variables: MembersQueryVariables,
      options?: Omit<UseQueryOptions<MembersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MembersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MembersQuery, TError, TData>(
      {
    queryKey: ['Members', variables],
    queryFn: graphqlFetch<MembersQuery, MembersQueryVariables>(MembersDocument, variables),
    ...options
  }
    )};

useMembersQuery.getKey = (variables: MembersQueryVariables) => ['Members', variables];

export const useInfiniteMembersQuery = <
      TData = InfiniteData<MembersQuery>,
      TError = unknown
    >(
      variables: MembersQueryVariables,
      options: Omit<UseInfiniteQueryOptions<MembersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<MembersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<MembersQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Members.infinite', variables],
      queryFn: (metaData) => graphqlFetch<MembersQuery, MembersQueryVariables>(MembersDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteMembersQuery.getKey = (variables: MembersQueryVariables) => ['Members.infinite', variables];


useMembersQuery.fetcher = (variables: MembersQueryVariables, options?: RequestInit['headers']) => graphqlFetch<MembersQuery, MembersQueryVariables>(MembersDocument, variables, options);

export const NotificationsDocument = `
    query Notifications($email: String!) {
  invitations(condition: {email: $email}) {
    totalCount
    nodes {
      rowId
      email
      organizationId
      organization {
        name
      }
    }
  }
}
    `;

export const useNotificationsQuery = <
      TData = NotificationsQuery,
      TError = unknown
    >(
      variables: NotificationsQueryVariables,
      options?: Omit<UseQueryOptions<NotificationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NotificationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NotificationsQuery, TError, TData>(
      {
    queryKey: ['Notifications', variables],
    queryFn: graphqlFetch<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, variables),
    ...options
  }
    )};

useNotificationsQuery.getKey = (variables: NotificationsQueryVariables) => ['Notifications', variables];

export const useInfiniteNotificationsQuery = <
      TData = InfiniteData<NotificationsQuery>,
      TError = unknown
    >(
      variables: NotificationsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<NotificationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<NotificationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<NotificationsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Notifications.infinite', variables],
      queryFn: (metaData) => graphqlFetch<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteNotificationsQuery.getKey = (variables: NotificationsQueryVariables) => ['Notifications.infinite', variables];


useNotificationsQuery.fetcher = (variables: NotificationsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, variables, options);

export const OrganizationDocument = `
    query Organization($slug: String!) {
  organizationBySlug(slug: $slug) {
    rowId
    name
    slug
    updatedAt
    members(first: 1, condition: {role: owner}) {
      nodes {
        user {
          tier
        }
      }
    }
    projects(first: 6, orderBy: POSTS_COUNT_DESC) {
      totalCount
      nodes {
        rowId
        name
        description
        slug
        posts {
          totalCount
          aggregates {
            distinctCount {
              userId
            }
          }
        }
      }
    }
  }
}
    `;

export const useOrganizationQuery = <
      TData = OrganizationQuery,
      TError = unknown
    >(
      variables: OrganizationQueryVariables,
      options?: Omit<UseQueryOptions<OrganizationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OrganizationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OrganizationQuery, TError, TData>(
      {
    queryKey: ['Organization', variables],
    queryFn: graphqlFetch<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, variables),
    ...options
  }
    )};

useOrganizationQuery.getKey = (variables: OrganizationQueryVariables) => ['Organization', variables];

export const useInfiniteOrganizationQuery = <
      TData = InfiniteData<OrganizationQuery>,
      TError = unknown
    >(
      variables: OrganizationQueryVariables,
      options: Omit<UseInfiniteQueryOptions<OrganizationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<OrganizationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<OrganizationQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Organization.infinite', variables],
      queryFn: (metaData) => graphqlFetch<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteOrganizationQuery.getKey = (variables: OrganizationQueryVariables) => ['Organization.infinite', variables];


useOrganizationQuery.fetcher = (variables: OrganizationQueryVariables, options?: RequestInit['headers']) => graphqlFetch<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, variables, options);

export const OrganizationMetricsDocument = `
    query OrganizationMetrics($organizationId: UUID!) {
  projects(condition: {organizationId: $organizationId}) {
    totalCount
  }
  posts(filter: {project: {organizationId: {equalTo: $organizationId}}}) {
    totalCount
  }
  members(condition: {organizationId: $organizationId}) {
    totalCount
  }
}
    `;

export const useOrganizationMetricsQuery = <
      TData = OrganizationMetricsQuery,
      TError = unknown
    >(
      variables: OrganizationMetricsQueryVariables,
      options?: Omit<UseQueryOptions<OrganizationMetricsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OrganizationMetricsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OrganizationMetricsQuery, TError, TData>(
      {
    queryKey: ['OrganizationMetrics', variables],
    queryFn: graphqlFetch<OrganizationMetricsQuery, OrganizationMetricsQueryVariables>(OrganizationMetricsDocument, variables),
    ...options
  }
    )};

useOrganizationMetricsQuery.getKey = (variables: OrganizationMetricsQueryVariables) => ['OrganizationMetrics', variables];

export const useInfiniteOrganizationMetricsQuery = <
      TData = InfiniteData<OrganizationMetricsQuery>,
      TError = unknown
    >(
      variables: OrganizationMetricsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<OrganizationMetricsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<OrganizationMetricsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<OrganizationMetricsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['OrganizationMetrics.infinite', variables],
      queryFn: (metaData) => graphqlFetch<OrganizationMetricsQuery, OrganizationMetricsQueryVariables>(OrganizationMetricsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteOrganizationMetricsQuery.getKey = (variables: OrganizationMetricsQueryVariables) => ['OrganizationMetrics.infinite', variables];


useOrganizationMetricsQuery.fetcher = (variables: OrganizationMetricsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<OrganizationMetricsQuery, OrganizationMetricsQueryVariables>(OrganizationMetricsDocument, variables, options);

export const OrganizationRoleDocument = `
    query OrganizationRole($userId: UUID!, $organizationId: UUID!) {
  memberByUserIdAndOrganizationId(
    userId: $userId
    organizationId: $organizationId
  ) {
    rowId
    role
  }
}
    `;

export const useOrganizationRoleQuery = <
      TData = OrganizationRoleQuery,
      TError = unknown
    >(
      variables: OrganizationRoleQueryVariables,
      options?: Omit<UseQueryOptions<OrganizationRoleQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OrganizationRoleQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OrganizationRoleQuery, TError, TData>(
      {
    queryKey: ['OrganizationRole', variables],
    queryFn: graphqlFetch<OrganizationRoleQuery, OrganizationRoleQueryVariables>(OrganizationRoleDocument, variables),
    ...options
  }
    )};

useOrganizationRoleQuery.getKey = (variables: OrganizationRoleQueryVariables) => ['OrganizationRole', variables];

export const useInfiniteOrganizationRoleQuery = <
      TData = InfiniteData<OrganizationRoleQuery>,
      TError = unknown
    >(
      variables: OrganizationRoleQueryVariables,
      options: Omit<UseInfiniteQueryOptions<OrganizationRoleQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<OrganizationRoleQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<OrganizationRoleQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['OrganizationRole.infinite', variables],
      queryFn: (metaData) => graphqlFetch<OrganizationRoleQuery, OrganizationRoleQueryVariables>(OrganizationRoleDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteOrganizationRoleQuery.getKey = (variables: OrganizationRoleQueryVariables) => ['OrganizationRole.infinite', variables];


useOrganizationRoleQuery.fetcher = (variables: OrganizationRoleQueryVariables, options?: RequestInit['headers']) => graphqlFetch<OrganizationRoleQuery, OrganizationRoleQueryVariables>(OrganizationRoleDocument, variables, options);

export const OrganizationsDocument = `
    query Organizations($pageSize: Int, $offset: Int, $orderBy: [OrganizationOrderBy!], $isMember: Boolean, $userId: UUID, $excludeRoles: [Role!], $search: String, $slug: String, $organizationId: UUID) {
  organizations(
    first: $pageSize
    offset: $offset
    orderBy: $orderBy
    filter: {rowId: {equalTo: $organizationId}, name: {includesInsensitive: $search}, slug: {equalTo: $slug}, or: [{membersExist: $isMember, members: {some: {userId: {equalTo: $userId}, role: {notIn: $excludeRoles}}}}, {rowId: {isNull: $isMember}}]}
  ) {
    totalCount
    nodes {
      rowId
      name
      slug
      updatedAt
      projects {
        totalCount
      }
      members {
        totalCount
      }
    }
  }
}
    `;

export const useOrganizationsQuery = <
      TData = OrganizationsQuery,
      TError = unknown
    >(
      variables?: OrganizationsQueryVariables,
      options?: Omit<UseQueryOptions<OrganizationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OrganizationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OrganizationsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Organizations'] : ['Organizations', variables],
    queryFn: graphqlFetch<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, variables),
    ...options
  }
    )};

useOrganizationsQuery.getKey = (variables?: OrganizationsQueryVariables) => variables === undefined ? ['Organizations'] : ['Organizations', variables];

export const useInfiniteOrganizationsQuery = <
      TData = InfiniteData<OrganizationsQuery>,
      TError = unknown
    >(
      variables: OrganizationsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<OrganizationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<OrganizationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<OrganizationsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['Organizations.infinite'] : ['Organizations.infinite', variables],
      queryFn: (metaData) => graphqlFetch<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteOrganizationsQuery.getKey = (variables?: OrganizationsQueryVariables) => variables === undefined ? ['Organizations.infinite'] : ['Organizations.infinite', variables];


useOrganizationsQuery.fetcher = (variables?: OrganizationsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, variables, options);

export const PostsDocument = `
    query Posts($projectId: UUID!, $after: Cursor, $pageSize: Int = 10, $orderBy: [PostOrderBy!] = CREATED_AT_DESC, $excludedStatuses: [String!], $search: String, $userId: UUID) {
  posts(
    after: $after
    first: $pageSize
    orderBy: $orderBy
    filter: {projectId: {equalTo: $projectId}, status: {status: {notIn: $excludedStatuses}}, title: {includesInsensitive: $search}}
  ) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    totalCount
    nodes {
      ...Feedback
    }
  }
}
    ${FeedbackFragmentDoc}`;

export const usePostsQuery = <
      TData = PostsQuery,
      TError = unknown
    >(
      variables: PostsQueryVariables,
      options?: Omit<UseQueryOptions<PostsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PostsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PostsQuery, TError, TData>(
      {
    queryKey: ['Posts', variables],
    queryFn: graphqlFetch<PostsQuery, PostsQueryVariables>(PostsDocument, variables),
    ...options
  }
    )};

usePostsQuery.getKey = (variables: PostsQueryVariables) => ['Posts', variables];

export const useInfinitePostsQuery = <
      TData = InfiniteData<PostsQuery>,
      TError = unknown
    >(
      variables: PostsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<PostsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<PostsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<PostsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Posts.infinite', variables],
      queryFn: (metaData) => graphqlFetch<PostsQuery, PostsQueryVariables>(PostsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfinitePostsQuery.getKey = (variables: PostsQueryVariables) => ['Posts.infinite', variables];


usePostsQuery.fetcher = (variables: PostsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<PostsQuery, PostsQueryVariables>(PostsDocument, variables, options);

export const ProjectDocument = `
    query Project($projectSlug: String!, $organizationSlug: String!, $userId: UUID) {
  projects(
    first: 1
    condition: {slug: $projectSlug}
    filter: {organization: {slug: {equalTo: $organizationSlug}}}
  ) {
    nodes {
      rowId
      name
      description
      slug
      organization {
        rowId
        name
        members(first: 1, condition: {role: owner}) {
          nodes {
            user {
              tier
            }
          }
        }
      }
      posts {
        aggregates {
          distinctCount {
            userId
          }
        }
      }
      userPosts: posts(first: 1, condition: {userId: $userId}) {
        nodes {
          rowId
        }
      }
    }
  }
}
    `;

export const useProjectQuery = <
      TData = ProjectQuery,
      TError = unknown
    >(
      variables: ProjectQueryVariables,
      options?: Omit<UseQueryOptions<ProjectQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProjectQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProjectQuery, TError, TData>(
      {
    queryKey: ['Project', variables],
    queryFn: graphqlFetch<ProjectQuery, ProjectQueryVariables>(ProjectDocument, variables),
    ...options
  }
    )};

useProjectQuery.getKey = (variables: ProjectQueryVariables) => ['Project', variables];

export const useInfiniteProjectQuery = <
      TData = InfiniteData<ProjectQuery>,
      TError = unknown
    >(
      variables: ProjectQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ProjectQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ProjectQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ProjectQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Project.infinite', variables],
      queryFn: (metaData) => graphqlFetch<ProjectQuery, ProjectQueryVariables>(ProjectDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteProjectQuery.getKey = (variables: ProjectQueryVariables) => ['Project.infinite', variables];


useProjectQuery.fetcher = (variables: ProjectQueryVariables, options?: RequestInit['headers']) => graphqlFetch<ProjectQuery, ProjectQueryVariables>(ProjectDocument, variables, options);

export const ProjectBySlugDocument = `
    query ProjectBySlug($slug: String!, $organizationId: UUID!) {
  projectBySlugAndOrganizationId(slug: $slug, organizationId: $organizationId) {
    rowId
    name
  }
}
    `;

export const useProjectBySlugQuery = <
      TData = ProjectBySlugQuery,
      TError = unknown
    >(
      variables: ProjectBySlugQueryVariables,
      options?: Omit<UseQueryOptions<ProjectBySlugQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProjectBySlugQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProjectBySlugQuery, TError, TData>(
      {
    queryKey: ['ProjectBySlug', variables],
    queryFn: graphqlFetch<ProjectBySlugQuery, ProjectBySlugQueryVariables>(ProjectBySlugDocument, variables),
    ...options
  }
    )};

useProjectBySlugQuery.getKey = (variables: ProjectBySlugQueryVariables) => ['ProjectBySlug', variables];

export const useInfiniteProjectBySlugQuery = <
      TData = InfiniteData<ProjectBySlugQuery>,
      TError = unknown
    >(
      variables: ProjectBySlugQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ProjectBySlugQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ProjectBySlugQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ProjectBySlugQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['ProjectBySlug.infinite', variables],
      queryFn: (metaData) => graphqlFetch<ProjectBySlugQuery, ProjectBySlugQueryVariables>(ProjectBySlugDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteProjectBySlugQuery.getKey = (variables: ProjectBySlugQueryVariables) => ['ProjectBySlug.infinite', variables];


useProjectBySlugQuery.fetcher = (variables: ProjectBySlugQueryVariables, options?: RequestInit['headers']) => graphqlFetch<ProjectBySlugQuery, ProjectBySlugQueryVariables>(ProjectBySlugDocument, variables, options);

export const ProjectMetricsDocument = `
    query ProjectMetrics($projectId: UUID!) {
  project(rowId: $projectId) {
    createdAt
    posts {
      totalCount
      aggregates {
        distinctCount {
          userId
        }
      }
    }
  }
  upvotes(filter: {post: {projectId: {equalTo: $projectId}}}) {
    totalCount
  }
  downvotes(filter: {post: {projectId: {equalTo: $projectId}}}) {
    totalCount
  }
}
    `;

export const useProjectMetricsQuery = <
      TData = ProjectMetricsQuery,
      TError = unknown
    >(
      variables: ProjectMetricsQueryVariables,
      options?: Omit<UseQueryOptions<ProjectMetricsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProjectMetricsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProjectMetricsQuery, TError, TData>(
      {
    queryKey: ['ProjectMetrics', variables],
    queryFn: graphqlFetch<ProjectMetricsQuery, ProjectMetricsQueryVariables>(ProjectMetricsDocument, variables),
    ...options
  }
    )};

useProjectMetricsQuery.getKey = (variables: ProjectMetricsQueryVariables) => ['ProjectMetrics', variables];

export const useInfiniteProjectMetricsQuery = <
      TData = InfiniteData<ProjectMetricsQuery>,
      TError = unknown
    >(
      variables: ProjectMetricsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ProjectMetricsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ProjectMetricsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ProjectMetricsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['ProjectMetrics.infinite', variables],
      queryFn: (metaData) => graphqlFetch<ProjectMetricsQuery, ProjectMetricsQueryVariables>(ProjectMetricsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteProjectMetricsQuery.getKey = (variables: ProjectMetricsQueryVariables) => ['ProjectMetrics.infinite', variables];


useProjectMetricsQuery.fetcher = (variables: ProjectMetricsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<ProjectMetricsQuery, ProjectMetricsQueryVariables>(ProjectMetricsDocument, variables, options);

export const ProjectStatusesDocument = `
    query ProjectStatuses($projectId: UUID!, $isDefault: Boolean) {
  postStatuses(
    condition: {projectId: $projectId, isDefault: $isDefault}
    orderBy: [IS_DEFAULT_DESC, CREATED_AT_ASC]
  ) {
    nodes {
      rowId
      status
      description
      color
      isDefault
    }
  }
}
    `;

export const useProjectStatusesQuery = <
      TData = ProjectStatusesQuery,
      TError = unknown
    >(
      variables: ProjectStatusesQueryVariables,
      options?: Omit<UseQueryOptions<ProjectStatusesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProjectStatusesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProjectStatusesQuery, TError, TData>(
      {
    queryKey: ['ProjectStatuses', variables],
    queryFn: graphqlFetch<ProjectStatusesQuery, ProjectStatusesQueryVariables>(ProjectStatusesDocument, variables),
    ...options
  }
    )};

useProjectStatusesQuery.getKey = (variables: ProjectStatusesQueryVariables) => ['ProjectStatuses', variables];

export const useInfiniteProjectStatusesQuery = <
      TData = InfiniteData<ProjectStatusesQuery>,
      TError = unknown
    >(
      variables: ProjectStatusesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ProjectStatusesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ProjectStatusesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ProjectStatusesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['ProjectStatuses.infinite', variables],
      queryFn: (metaData) => graphqlFetch<ProjectStatusesQuery, ProjectStatusesQueryVariables>(ProjectStatusesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteProjectStatusesQuery.getKey = (variables: ProjectStatusesQueryVariables) => ['ProjectStatuses.infinite', variables];


useProjectStatusesQuery.fetcher = (variables: ProjectStatusesQueryVariables, options?: RequestInit['headers']) => graphqlFetch<ProjectStatusesQuery, ProjectStatusesQueryVariables>(ProjectStatusesDocument, variables, options);

export const ProjectsDocument = `
    query Projects($pageSize: Int!, $offset: Int!, $organizationSlug: String!, $search: String) {
  projects(
    orderBy: POSTS_COUNT_DESC
    first: $pageSize
    offset: $offset
    filter: {name: {includesInsensitive: $search}, organization: {slug: {equalTo: $organizationSlug}}}
  ) {
    totalCount
    nodes {
      rowId
      name
      description
      slug
      organization {
        rowId
        slug
      }
      posts {
        totalCount
        aggregates {
          distinctCount {
            userId
          }
        }
      }
    }
  }
}
    `;

export const useProjectsQuery = <
      TData = ProjectsQuery,
      TError = unknown
    >(
      variables: ProjectsQueryVariables,
      options?: Omit<UseQueryOptions<ProjectsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProjectsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProjectsQuery, TError, TData>(
      {
    queryKey: ['Projects', variables],
    queryFn: graphqlFetch<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, variables),
    ...options
  }
    )};

useProjectsQuery.getKey = (variables: ProjectsQueryVariables) => ['Projects', variables];

export const useInfiniteProjectsQuery = <
      TData = InfiniteData<ProjectsQuery>,
      TError = unknown
    >(
      variables: ProjectsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ProjectsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ProjectsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ProjectsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Projects.infinite', variables],
      queryFn: (metaData) => graphqlFetch<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteProjectsQuery.getKey = (variables: ProjectsQueryVariables) => ['Projects.infinite', variables];


useProjectsQuery.fetcher = (variables: ProjectsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, variables, options);

export const RecentFeedbackDocument = `
    query RecentFeedback($userId: UUID!, $after: Cursor) {
  posts(
    first: 10
    after: $after
    orderBy: CREATED_AT_DESC
    filter: {project: {organization: {members: {some: {userId: {equalTo: $userId}}}}}}
  ) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        rowId
        createdAt
        title
        description
        project {
          name
          slug
          organization {
            slug
          }
        }
        status {
          rowId
          status
          color
        }
        user {
          rowId
          username
        }
      }
    }
  }
}
    `;

export const useRecentFeedbackQuery = <
      TData = RecentFeedbackQuery,
      TError = unknown
    >(
      variables: RecentFeedbackQueryVariables,
      options?: Omit<UseQueryOptions<RecentFeedbackQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RecentFeedbackQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RecentFeedbackQuery, TError, TData>(
      {
    queryKey: ['RecentFeedback', variables],
    queryFn: graphqlFetch<RecentFeedbackQuery, RecentFeedbackQueryVariables>(RecentFeedbackDocument, variables),
    ...options
  }
    )};

useRecentFeedbackQuery.getKey = (variables: RecentFeedbackQueryVariables) => ['RecentFeedback', variables];

export const useInfiniteRecentFeedbackQuery = <
      TData = InfiniteData<RecentFeedbackQuery>,
      TError = unknown
    >(
      variables: RecentFeedbackQueryVariables,
      options: Omit<UseInfiniteQueryOptions<RecentFeedbackQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<RecentFeedbackQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<RecentFeedbackQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['RecentFeedback.infinite', variables],
      queryFn: (metaData) => graphqlFetch<RecentFeedbackQuery, RecentFeedbackQueryVariables>(RecentFeedbackDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteRecentFeedbackQuery.getKey = (variables: RecentFeedbackQueryVariables) => ['RecentFeedback.infinite', variables];


useRecentFeedbackQuery.fetcher = (variables: RecentFeedbackQueryVariables, options?: RequestInit['headers']) => graphqlFetch<RecentFeedbackQuery, RecentFeedbackQueryVariables>(RecentFeedbackDocument, variables, options);

export const RepliesDocument = `
    query Replies($commentId: UUID!, $pageSize: Int = 3, $after: Cursor) {
  comments(
    first: $pageSize
    after: $after
    orderBy: CREATED_AT_DESC
    condition: {parentId: $commentId}
  ) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...Reply
      }
    }
  }
}
    ${ReplyFragmentDoc}`;

export const useRepliesQuery = <
      TData = RepliesQuery,
      TError = unknown
    >(
      variables: RepliesQueryVariables,
      options?: Omit<UseQueryOptions<RepliesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RepliesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RepliesQuery, TError, TData>(
      {
    queryKey: ['Replies', variables],
    queryFn: graphqlFetch<RepliesQuery, RepliesQueryVariables>(RepliesDocument, variables),
    ...options
  }
    )};

useRepliesQuery.getKey = (variables: RepliesQueryVariables) => ['Replies', variables];

export const useInfiniteRepliesQuery = <
      TData = InfiniteData<RepliesQuery>,
      TError = unknown
    >(
      variables: RepliesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<RepliesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<RepliesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<RepliesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Replies.infinite', variables],
      queryFn: (metaData) => graphqlFetch<RepliesQuery, RepliesQueryVariables>(RepliesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteRepliesQuery.getKey = (variables: RepliesQueryVariables) => ['Replies.infinite', variables];


useRepliesQuery.fetcher = (variables: RepliesQueryVariables, options?: RequestInit['headers']) => graphqlFetch<RepliesQuery, RepliesQueryVariables>(RepliesDocument, variables, options);

export const StatusBreakdownDocument = `
    query StatusBreakdown($projectId: UUID!) {
  posts(condition: {projectId: $projectId}) {
    groupedAggregates(groupBy: STATUS_ID) {
      keys
      distinctCount {
        rowId
      }
    }
  }
}
    `;

export const useStatusBreakdownQuery = <
      TData = StatusBreakdownQuery,
      TError = unknown
    >(
      variables: StatusBreakdownQueryVariables,
      options?: Omit<UseQueryOptions<StatusBreakdownQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<StatusBreakdownQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<StatusBreakdownQuery, TError, TData>(
      {
    queryKey: ['StatusBreakdown', variables],
    queryFn: graphqlFetch<StatusBreakdownQuery, StatusBreakdownQueryVariables>(StatusBreakdownDocument, variables),
    ...options
  }
    )};

useStatusBreakdownQuery.getKey = (variables: StatusBreakdownQueryVariables) => ['StatusBreakdown', variables];

export const useInfiniteStatusBreakdownQuery = <
      TData = InfiniteData<StatusBreakdownQuery>,
      TError = unknown
    >(
      variables: StatusBreakdownQueryVariables,
      options: Omit<UseInfiniteQueryOptions<StatusBreakdownQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<StatusBreakdownQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<StatusBreakdownQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['StatusBreakdown.infinite', variables],
      queryFn: (metaData) => graphqlFetch<StatusBreakdownQuery, StatusBreakdownQueryVariables>(StatusBreakdownDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteStatusBreakdownQuery.getKey = (variables: StatusBreakdownQueryVariables) => ['StatusBreakdown.infinite', variables];


useStatusBreakdownQuery.fetcher = (variables: StatusBreakdownQueryVariables, options?: RequestInit['headers']) => graphqlFetch<StatusBreakdownQuery, StatusBreakdownQueryVariables>(StatusBreakdownDocument, variables, options);

export const UserDocument = `
    query User($hidraId: UUID!) {
  userByHidraId(hidraId: $hidraId) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export const useUserQuery = <
      TData = UserQuery,
      TError = unknown
    >(
      variables: UserQueryVariables,
      options?: Omit<UseQueryOptions<UserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserQuery, TError, TData>(
      {
    queryKey: ['User', variables],
    queryFn: graphqlFetch<UserQuery, UserQueryVariables>(UserDocument, variables),
    ...options
  }
    )};

useUserQuery.getKey = (variables: UserQueryVariables) => ['User', variables];

export const useInfiniteUserQuery = <
      TData = InfiniteData<UserQuery>,
      TError = unknown
    >(
      variables: UserQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['User.infinite', variables],
      queryFn: (metaData) => graphqlFetch<UserQuery, UserQueryVariables>(UserDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserQuery.getKey = (variables: UserQueryVariables) => ['User.infinite', variables];


useUserQuery.fetcher = (variables: UserQueryVariables, options?: RequestInit['headers']) => graphqlFetch<UserQuery, UserQueryVariables>(UserDocument, variables, options);

export const UserByEmailDocument = `
    query userByEmail($email: String!) {
  userByEmail(email: $email) {
    rowId
    hidraId
    username
    firstName
    lastName
    email
  }
}
    `;

export const useUserByEmailQuery = <
      TData = UserByEmailQuery,
      TError = unknown
    >(
      variables: UserByEmailQueryVariables,
      options?: Omit<UseQueryOptions<UserByEmailQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserByEmailQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserByEmailQuery, TError, TData>(
      {
    queryKey: ['userByEmail', variables],
    queryFn: graphqlFetch<UserByEmailQuery, UserByEmailQueryVariables>(UserByEmailDocument, variables),
    ...options
  }
    )};

useUserByEmailQuery.getKey = (variables: UserByEmailQueryVariables) => ['userByEmail', variables];

export const useInfiniteUserByEmailQuery = <
      TData = InfiniteData<UserByEmailQuery>,
      TError = unknown
    >(
      variables: UserByEmailQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserByEmailQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserByEmailQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserByEmailQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['userByEmail.infinite', variables],
      queryFn: (metaData) => graphqlFetch<UserByEmailQuery, UserByEmailQueryVariables>(UserByEmailDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserByEmailQuery.getKey = (variables: UserByEmailQueryVariables) => ['userByEmail.infinite', variables];


useUserByEmailQuery.fetcher = (variables: UserByEmailQueryVariables, options?: RequestInit['headers']) => graphqlFetch<UserByEmailQuery, UserByEmailQueryVariables>(UserByEmailDocument, variables, options);

export const WeeklyFeedbackDocument = `
    query WeeklyFeedback($userId: UUID!, $startDate: Datetime!) {
  posts(
    filter: {project: {organization: {members: {some: {userId: {equalTo: $userId}}}}}, createdAt: {greaterThanOrEqualTo: $startDate}}
  ) {
    groupedAggregates(groupBy: [CREATED_AT_TRUNCATED_TO_DAY]) {
      keys
      distinctCount {
        rowId
      }
    }
  }
}
    `;

export const useWeeklyFeedbackQuery = <
      TData = WeeklyFeedbackQuery,
      TError = unknown
    >(
      variables: WeeklyFeedbackQueryVariables,
      options?: Omit<UseQueryOptions<WeeklyFeedbackQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WeeklyFeedbackQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WeeklyFeedbackQuery, TError, TData>(
      {
    queryKey: ['WeeklyFeedback', variables],
    queryFn: graphqlFetch<WeeklyFeedbackQuery, WeeklyFeedbackQueryVariables>(WeeklyFeedbackDocument, variables),
    ...options
  }
    )};

useWeeklyFeedbackQuery.getKey = (variables: WeeklyFeedbackQueryVariables) => ['WeeklyFeedback', variables];

export const useInfiniteWeeklyFeedbackQuery = <
      TData = InfiniteData<WeeklyFeedbackQuery>,
      TError = unknown
    >(
      variables: WeeklyFeedbackQueryVariables,
      options: Omit<UseInfiniteQueryOptions<WeeklyFeedbackQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<WeeklyFeedbackQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<WeeklyFeedbackQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['WeeklyFeedback.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WeeklyFeedbackQuery, WeeklyFeedbackQueryVariables>(WeeklyFeedbackDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteWeeklyFeedbackQuery.getKey = (variables: WeeklyFeedbackQueryVariables) => ['WeeklyFeedback.infinite', variables];


useWeeklyFeedbackQuery.fetcher = (variables: WeeklyFeedbackQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WeeklyFeedbackQuery, WeeklyFeedbackQueryVariables>(WeeklyFeedbackDocument, variables, options);
