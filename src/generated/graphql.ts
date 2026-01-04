// @ts-nocheck
import { useMutation, useQuery, useInfiniteQuery, UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { graphqlFetch } from '@/lib/graphql/graphqlFetch';
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
  BigFloat: { input: any; output: any; }
  BigInt: { input: string; output: string; }
  Cursor: { input: string; output: string; }
  Datetime: { input: Date; output: Date; }
  UUID: { input: string; output: string; }
};

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type BigFloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
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

/** All input for the create `ProjectSocial` mutation. */
export type CreateProjectSocialInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `ProjectSocial` to be created by this mutation. */
  projectSocial: ProjectSocialInput;
};

/** The output of our create `ProjectSocial` mutation. */
export type CreateProjectSocialPayload = {
  __typename?: 'CreateProjectSocialPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ProjectSocial` that was created by this mutation. */
  projectSocial?: Maybe<ProjectSocial>;
  /** An edge for our `ProjectSocial`. May be used by Relay 1. */
  projectSocialEdge?: Maybe<ProjectSocialEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `ProjectSocial` mutation. */
export type CreateProjectSocialPayloadProjectSocialEdgeArgs = {
  orderBy?: Array<ProjectSocialOrderBy>;
};

/** All input for the create `ProjectStatusConfig` mutation. */
export type CreateProjectStatusConfigInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `ProjectStatusConfig` to be created by this mutation. */
  projectStatusConfig: ProjectStatusConfigInput;
};

/** The output of our create `ProjectStatusConfig` mutation. */
export type CreateProjectStatusConfigPayload = {
  __typename?: 'CreateProjectStatusConfigPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ProjectStatusConfig` that was created by this mutation. */
  projectStatusConfig?: Maybe<ProjectStatusConfig>;
  /** An edge for our `ProjectStatusConfig`. May be used by Relay 1. */
  projectStatusConfigEdge?: Maybe<ProjectStatusConfigEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `ProjectStatusConfig` mutation. */
export type CreateProjectStatusConfigPayloadProjectStatusConfigEdgeArgs = {
  orderBy?: Array<ProjectStatusConfigOrderBy>;
};

/** All input for the create `StatusTemplate` mutation. */
export type CreateStatusTemplateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `StatusTemplate` to be created by this mutation. */
  statusTemplate: StatusTemplateInput;
};

/** The output of our create `StatusTemplate` mutation. */
export type CreateStatusTemplatePayload = {
  __typename?: 'CreateStatusTemplatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `StatusTemplate` that was created by this mutation. */
  statusTemplate?: Maybe<StatusTemplate>;
  /** An edge for our `StatusTemplate`. May be used by Relay 1. */
  statusTemplateEdge?: Maybe<StatusTemplateEdge>;
};


/** The output of our create `StatusTemplate` mutation. */
export type CreateStatusTemplatePayloadStatusTemplateEdgeArgs = {
  orderBy?: Array<StatusTemplateOrderBy>;
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

/** All input for the create `Vote` mutation. */
export type CreateVoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Vote` to be created by this mutation. */
  vote: VoteInput;
};

/** The output of our create `Vote` mutation. */
export type CreateVotePayload = {
  __typename?: 'CreateVotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Vote` that was created by this mutation. */
  vote?: Maybe<Vote>;
  /** An edge for our `Vote`. May be used by Relay 1. */
  voteEdge?: Maybe<VoteEdge>;
};


/** The output of our create `Vote` mutation. */
export type CreateVotePayloadVoteEdgeArgs = {
  orderBy?: Array<VoteOrderBy>;
};

/** All input for the create `Workspace` mutation. */
export type CreateWorkspaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Workspace` to be created by this mutation. */
  workspace: WorkspaceInput;
};

/** The output of our create `Workspace` mutation. */
export type CreateWorkspacePayload = {
  __typename?: 'CreateWorkspacePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Workspace` that was created by this mutation. */
  workspace?: Maybe<Workspace>;
  /** An edge for our `Workspace`. May be used by Relay 1. */
  workspaceEdge?: Maybe<WorkspaceEdge>;
};


/** The output of our create `Workspace` mutation. */
export type CreateWorkspacePayloadWorkspaceEdgeArgs = {
  orderBy?: Array<WorkspaceOrderBy>;
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

/** All input for the `deleteProjectSocial` mutation. */
export type DeleteProjectSocialInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `ProjectSocial` mutation. */
export type DeleteProjectSocialPayload = {
  __typename?: 'DeleteProjectSocialPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ProjectSocial` that was deleted by this mutation. */
  projectSocial?: Maybe<ProjectSocial>;
  /** An edge for our `ProjectSocial`. May be used by Relay 1. */
  projectSocialEdge?: Maybe<ProjectSocialEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `ProjectSocial` mutation. */
export type DeleteProjectSocialPayloadProjectSocialEdgeArgs = {
  orderBy?: Array<ProjectSocialOrderBy>;
};

/** All input for the `deleteProjectStatusConfig` mutation. */
export type DeleteProjectStatusConfigInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `ProjectStatusConfig` mutation. */
export type DeleteProjectStatusConfigPayload = {
  __typename?: 'DeleteProjectStatusConfigPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ProjectStatusConfig` that was deleted by this mutation. */
  projectStatusConfig?: Maybe<ProjectStatusConfig>;
  /** An edge for our `ProjectStatusConfig`. May be used by Relay 1. */
  projectStatusConfigEdge?: Maybe<ProjectStatusConfigEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `ProjectStatusConfig` mutation. */
export type DeleteProjectStatusConfigPayloadProjectStatusConfigEdgeArgs = {
  orderBy?: Array<ProjectStatusConfigOrderBy>;
};

/** All input for the `deleteStatusTemplate` mutation. */
export type DeleteStatusTemplateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `StatusTemplate` mutation. */
export type DeleteStatusTemplatePayload = {
  __typename?: 'DeleteStatusTemplatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `StatusTemplate` that was deleted by this mutation. */
  statusTemplate?: Maybe<StatusTemplate>;
  /** An edge for our `StatusTemplate`. May be used by Relay 1. */
  statusTemplateEdge?: Maybe<StatusTemplateEdge>;
};


/** The output of our delete `StatusTemplate` mutation. */
export type DeleteStatusTemplatePayloadStatusTemplateEdgeArgs = {
  orderBy?: Array<StatusTemplateOrderBy>;
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

/** All input for the `deleteVote` mutation. */
export type DeleteVoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Vote` mutation. */
export type DeleteVotePayload = {
  __typename?: 'DeleteVotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Vote` that was deleted by this mutation. */
  vote?: Maybe<Vote>;
  /** An edge for our `Vote`. May be used by Relay 1. */
  voteEdge?: Maybe<VoteEdge>;
};


/** The output of our delete `Vote` mutation. */
export type DeleteVotePayloadVoteEdgeArgs = {
  orderBy?: Array<VoteOrderBy>;
};

/** All input for the `deleteWorkspace` mutation. */
export type DeleteWorkspaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Workspace` mutation. */
export type DeleteWorkspacePayload = {
  __typename?: 'DeleteWorkspacePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Workspace` that was deleted by this mutation. */
  workspace?: Maybe<Workspace>;
  /** An edge for our `Workspace`. May be used by Relay 1. */
  workspaceEdge?: Maybe<WorkspaceEdge>;
};


/** The output of our delete `Workspace` mutation. */
export type DeleteWorkspacePayloadWorkspaceEdgeArgs = {
  orderBy?: Array<WorkspaceOrderBy>;
};

export type HavingDatetimeFilter = {
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
};

export type HavingIntFilter = {
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Invitation = {
  __typename?: 'Invitation';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  email: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Workspace` that is related to this `Invitation`. */
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['UUID']['output'];
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
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
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
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  workspaceId?: InputMaybe<BigIntFilter>;
};

export type InvitationDistinctCountAggregates = {
  __typename?: 'InvitationDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of email across the matching connection */
  email?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workspaceId across the matching connection */
  workspaceId?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `workspace` relation. */
  workspace?: InputMaybe<WorkspaceFilter>;
  /** Filter by the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Invitation` for usage during aggregation. */
export enum InvitationGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Email = 'EMAIL',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  WorkspaceId = 'WORKSPACE_ID'
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
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  workspaceId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Invitation`. */
export enum InvitationOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  WorkspaceIdAsc = 'WORKSPACE_ID_ASC',
  WorkspaceIdDesc = 'WORKSPACE_ID_DESC'
}

export type Member = {
  __typename?: 'Member';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  role: Role;
  rowId: Scalars['UUID']['output'];
  /** Reads a single `User` that is related to this `Member`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
  /** Reads a single `Workspace` that is related to this `Member`. */
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['UUID']['output'];
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
  /** Checks for equality with the object’s `role` field. */
  role?: InputMaybe<Role>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
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
  role?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
  workspaceId?: InputMaybe<BigIntFilter>;
};

export type MemberDistinctCountAggregates = {
  __typename?: 'MemberDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of role across the matching connection */
  role?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of userId across the matching connection */
  userId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workspaceId across the matching connection */
  workspaceId?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `role` field. */
  role?: InputMaybe<RoleFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `workspace` relation. */
  workspace?: InputMaybe<WorkspaceFilter>;
  /** Filter by the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Member` for usage during aggregation. */
export enum MemberGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Role = 'ROLE',
  UserId = 'USER_ID',
  WorkspaceId = 'WORKSPACE_ID'
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
  role: Role;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  userId: Scalars['UUID']['input'];
  workspaceId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Member`. */
export enum MemberOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RoleAsc = 'ROLE_ASC',
  RoleDesc = 'ROLE_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  WorkspaceIdAsc = 'WORKSPACE_ID_ASC',
  WorkspaceIdDesc = 'WORKSPACE_ID_DESC'
}

/** Represents an update to a `Member`. Fields that are set will be updated. */
export type MemberPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  role?: InputMaybe<Role>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Comment`. */
  createComment?: Maybe<CreateCommentPayload>;
  /** Creates a single `Invitation`. */
  createInvitation?: Maybe<CreateInvitationPayload>;
  /** Creates a single `Member`. */
  createMember?: Maybe<CreateMemberPayload>;
  /** Creates a single `Post`. */
  createPost?: Maybe<CreatePostPayload>;
  /** Creates a single `Project`. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a single `ProjectSocial`. */
  createProjectSocial?: Maybe<CreateProjectSocialPayload>;
  /** Creates a single `ProjectStatusConfig`. */
  createProjectStatusConfig?: Maybe<CreateProjectStatusConfigPayload>;
  /** Creates a single `StatusTemplate`. */
  createStatusTemplate?: Maybe<CreateStatusTemplatePayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `Vote`. */
  createVote?: Maybe<CreateVotePayload>;
  /** Creates a single `Workspace`. */
  createWorkspace?: Maybe<CreateWorkspacePayload>;
  /** Deletes a single `Comment` using a unique key. */
  deleteComment?: Maybe<DeleteCommentPayload>;
  /** Deletes a single `Invitation` using a unique key. */
  deleteInvitation?: Maybe<DeleteInvitationPayload>;
  /** Deletes a single `Member` using a unique key. */
  deleteMember?: Maybe<DeleteMemberPayload>;
  /** Deletes a single `Post` using a unique key. */
  deletePost?: Maybe<DeletePostPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `ProjectSocial` using a unique key. */
  deleteProjectSocial?: Maybe<DeleteProjectSocialPayload>;
  /** Deletes a single `ProjectStatusConfig` using a unique key. */
  deleteProjectStatusConfig?: Maybe<DeleteProjectStatusConfigPayload>;
  /** Deletes a single `StatusTemplate` using a unique key. */
  deleteStatusTemplate?: Maybe<DeleteStatusTemplatePayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `Vote` using a unique key. */
  deleteVote?: Maybe<DeleteVotePayload>;
  /** Deletes a single `Workspace` using a unique key. */
  deleteWorkspace?: Maybe<DeleteWorkspacePayload>;
  /** Updates a single `Comment` using a unique key and a patch. */
  updateComment?: Maybe<UpdateCommentPayload>;
  /** Updates a single `Member` using a unique key and a patch. */
  updateMember?: Maybe<UpdateMemberPayload>;
  /** Updates a single `Post` using a unique key and a patch. */
  updatePost?: Maybe<UpdatePostPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a single `ProjectSocial` using a unique key and a patch. */
  updateProjectSocial?: Maybe<UpdateProjectSocialPayload>;
  /** Updates a single `ProjectStatusConfig` using a unique key and a patch. */
  updateProjectStatusConfig?: Maybe<UpdateProjectStatusConfigPayload>;
  /** Updates a single `StatusTemplate` using a unique key and a patch. */
  updateStatusTemplate?: Maybe<UpdateStatusTemplatePayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `Vote` using a unique key and a patch. */
  updateVote?: Maybe<UpdateVotePayload>;
  /** Updates a single `Workspace` using a unique key and a patch. */
  updateWorkspace?: Maybe<UpdateWorkspacePayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
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
export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectSocialArgs = {
  input: CreateProjectSocialInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectStatusConfigArgs = {
  input: CreateProjectStatusConfigInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateStatusTemplateArgs = {
  input: CreateStatusTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateVoteArgs = {
  input: CreateVoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
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
export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectSocialArgs = {
  input: DeleteProjectSocialInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectStatusConfigArgs = {
  input: DeleteProjectStatusConfigInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStatusTemplateArgs = {
  input: DeleteStatusTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVoteArgs = {
  input: DeleteVoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkspaceArgs = {
  input: DeleteWorkspaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMemberArgs = {
  input: UpdateMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectSocialArgs = {
  input: UpdateProjectSocialInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectStatusConfigArgs = {
  input: UpdateProjectStatusConfigInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStatusTemplateArgs = {
  input: UpdateStatusTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVoteArgs = {
  input: UpdateVoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkspaceArgs = {
  input: UpdateWorkspaceInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
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
  /** Reads a single `Project` that is related to this `Post`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `StatusTemplate` that is related to this `Post`. */
  statusTemplate?: Maybe<StatusTemplate>;
  statusTemplateId?: Maybe<Scalars['UUID']['output']>;
  statusUpdatedAt?: Maybe<Scalars['Datetime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `User` that is related to this `Post`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Vote`. */
  votes: VoteConnection;
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


export type PostVotesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VoteCondition>;
  filter?: InputMaybe<VoteFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VoteOrderBy>>;
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
  /** Checks for equality with the object’s `statusTemplateId` field. */
  statusTemplateId?: InputMaybe<Scalars['UUID']['input']>;
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
  statusTemplateId?: InputMaybe<BigIntFilter>;
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
  /** Distinct count of statusTemplateId across the matching connection */
  statusTemplateId?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `statusTemplate` relation. */
  statusTemplate?: InputMaybe<StatusTemplateFilter>;
  /** A related `statusTemplate` exists. */
  statusTemplateExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `statusTemplateId` field. */
  statusTemplateId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `statusUpdatedAt` field. */
  statusUpdatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `title` field. */
  title?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `votes` relation. */
  votes?: InputMaybe<PostToManyVoteFilter>;
  /** Some related `votes` exist. */
  votesExist?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Grouping methods for `Post` for usage during aggregation. */
export enum PostGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  ProjectId = 'PROJECT_ID',
  StatusTemplateId = 'STATUS_TEMPLATE_ID',
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
  statusTemplateId?: InputMaybe<Scalars['UUID']['input']>;
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
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusTemplateIdAsc = 'STATUS_TEMPLATE_ID_ASC',
  StatusTemplateIdDesc = 'STATUS_TEMPLATE_ID_DESC',
  StatusUpdatedAtAsc = 'STATUS_UPDATED_AT_ASC',
  StatusUpdatedAtDesc = 'STATUS_UPDATED_AT_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  VotesCountAsc = 'VOTES_COUNT_ASC',
  VotesCountDesc = 'VOTES_COUNT_DESC',
  VotesDistinctCountCreatedAtAsc = 'VOTES_DISTINCT_COUNT_CREATED_AT_ASC',
  VotesDistinctCountCreatedAtDesc = 'VOTES_DISTINCT_COUNT_CREATED_AT_DESC',
  VotesDistinctCountPostIdAsc = 'VOTES_DISTINCT_COUNT_POST_ID_ASC',
  VotesDistinctCountPostIdDesc = 'VOTES_DISTINCT_COUNT_POST_ID_DESC',
  VotesDistinctCountRowIdAsc = 'VOTES_DISTINCT_COUNT_ROW_ID_ASC',
  VotesDistinctCountRowIdDesc = 'VOTES_DISTINCT_COUNT_ROW_ID_DESC',
  VotesDistinctCountUpdatedAtAsc = 'VOTES_DISTINCT_COUNT_UPDATED_AT_ASC',
  VotesDistinctCountUpdatedAtDesc = 'VOTES_DISTINCT_COUNT_UPDATED_AT_DESC',
  VotesDistinctCountUserIdAsc = 'VOTES_DISTINCT_COUNT_USER_ID_ASC',
  VotesDistinctCountUserIdDesc = 'VOTES_DISTINCT_COUNT_USER_ID_DESC',
  VotesDistinctCountVoteTypeAsc = 'VOTES_DISTINCT_COUNT_VOTE_TYPE_ASC',
  VotesDistinctCountVoteTypeDesc = 'VOTES_DISTINCT_COUNT_VOTE_TYPE_DESC'
}

/** Represents an update to a `Post`. Fields that are set will be updated. */
export type PostPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  statusTemplateId?: InputMaybe<Scalars['UUID']['input']>;
  statusUpdatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
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

/** A filter to be used against many `Vote` object types. All fields are combined with a logical ‘and.’ */
export type PostToManyVoteFilter = {
  /** Aggregates across related `Vote` match the filter criteria. */
  aggregates?: InputMaybe<VoteAggregatesFilter>;
  /** Every related `Vote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<VoteFilter>;
  /** No related `Vote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<VoteFilter>;
  /** Some related `Vote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<VoteFilter>;
};

export type Project = {
  __typename?: 'Project';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostConnection;
  /** Reads and enables pagination through a set of `ProjectSocial`. */
  projectSocials: ProjectSocialConnection;
  /** Reads and enables pagination through a set of `ProjectStatusConfig`. */
  projectStatusConfigs: ProjectStatusConfigConnection;
  rowId: Scalars['UUID']['output'];
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Workspace` that is related to this `Project`. */
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['UUID']['output'];
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


export type ProjectProjectSocialsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectSocialCondition>;
  filter?: InputMaybe<ProjectSocialFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectSocialOrderBy>>;
};


export type ProjectProjectStatusConfigsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectStatusConfigCondition>;
  filter?: InputMaybe<ProjectStatusConfigFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectStatusConfigOrderBy>>;
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
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `website` field. */
  website?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
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
  rowId?: InputMaybe<BigIntFilter>;
  slug?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  website?: InputMaybe<BigIntFilter>;
  workspaceId?: InputMaybe<BigIntFilter>;
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
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of slug across the matching connection */
  slug?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of website across the matching connection */
  website?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workspaceId across the matching connection */
  workspaceId?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `posts` relation. */
  posts?: InputMaybe<ProjectToManyPostFilter>;
  /** Some related `posts` exist. */
  postsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `projectSocials` relation. */
  projectSocials?: InputMaybe<ProjectToManyProjectSocialFilter>;
  /** Some related `projectSocials` exist. */
  projectSocialsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `projectStatusConfigs` relation. */
  projectStatusConfigs?: InputMaybe<ProjectToManyProjectStatusConfigFilter>;
  /** Some related `projectStatusConfigs` exist. */
  projectStatusConfigsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `website` field. */
  website?: InputMaybe<StringFilter>;
  /** Filter by the object’s `workspace` relation. */
  workspace?: InputMaybe<WorkspaceFilter>;
  /** Filter by the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Project` for usage during aggregation. */
export enum ProjectGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  Image = 'IMAGE',
  Name = 'NAME',
  Slug = 'SLUG',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  Website = 'WEBSITE',
  WorkspaceId = 'WORKSPACE_ID'
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
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  workspaceId: Scalars['UUID']['input'];
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
  PostsDistinctCountStatusTemplateIdAsc = 'POSTS_DISTINCT_COUNT_STATUS_TEMPLATE_ID_ASC',
  PostsDistinctCountStatusTemplateIdDesc = 'POSTS_DISTINCT_COUNT_STATUS_TEMPLATE_ID_DESC',
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
  ProjectSocialsCountAsc = 'PROJECT_SOCIALS_COUNT_ASC',
  ProjectSocialsCountDesc = 'PROJECT_SOCIALS_COUNT_DESC',
  ProjectSocialsDistinctCountCreatedAtAsc = 'PROJECT_SOCIALS_DISTINCT_COUNT_CREATED_AT_ASC',
  ProjectSocialsDistinctCountCreatedAtDesc = 'PROJECT_SOCIALS_DISTINCT_COUNT_CREATED_AT_DESC',
  ProjectSocialsDistinctCountProjectIdAsc = 'PROJECT_SOCIALS_DISTINCT_COUNT_PROJECT_ID_ASC',
  ProjectSocialsDistinctCountProjectIdDesc = 'PROJECT_SOCIALS_DISTINCT_COUNT_PROJECT_ID_DESC',
  ProjectSocialsDistinctCountRowIdAsc = 'PROJECT_SOCIALS_DISTINCT_COUNT_ROW_ID_ASC',
  ProjectSocialsDistinctCountRowIdDesc = 'PROJECT_SOCIALS_DISTINCT_COUNT_ROW_ID_DESC',
  ProjectSocialsDistinctCountUpdatedAtAsc = 'PROJECT_SOCIALS_DISTINCT_COUNT_UPDATED_AT_ASC',
  ProjectSocialsDistinctCountUpdatedAtDesc = 'PROJECT_SOCIALS_DISTINCT_COUNT_UPDATED_AT_DESC',
  ProjectSocialsDistinctCountUrlAsc = 'PROJECT_SOCIALS_DISTINCT_COUNT_URL_ASC',
  ProjectSocialsDistinctCountUrlDesc = 'PROJECT_SOCIALS_DISTINCT_COUNT_URL_DESC',
  ProjectStatusConfigsAverageSortOrderAsc = 'PROJECT_STATUS_CONFIGS_AVERAGE_SORT_ORDER_ASC',
  ProjectStatusConfigsAverageSortOrderDesc = 'PROJECT_STATUS_CONFIGS_AVERAGE_SORT_ORDER_DESC',
  ProjectStatusConfigsCountAsc = 'PROJECT_STATUS_CONFIGS_COUNT_ASC',
  ProjectStatusConfigsCountDesc = 'PROJECT_STATUS_CONFIGS_COUNT_DESC',
  ProjectStatusConfigsDistinctCountCreatedAtAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_CREATED_AT_ASC',
  ProjectStatusConfigsDistinctCountCreatedAtDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_CREATED_AT_DESC',
  ProjectStatusConfigsDistinctCountCustomColorAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_CUSTOM_COLOR_ASC',
  ProjectStatusConfigsDistinctCountCustomColorDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_CUSTOM_COLOR_DESC',
  ProjectStatusConfigsDistinctCountCustomDescriptionAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_CUSTOM_DESCRIPTION_ASC',
  ProjectStatusConfigsDistinctCountCustomDescriptionDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_CUSTOM_DESCRIPTION_DESC',
  ProjectStatusConfigsDistinctCountIsDefaultAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_IS_DEFAULT_ASC',
  ProjectStatusConfigsDistinctCountIsDefaultDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_IS_DEFAULT_DESC',
  ProjectStatusConfigsDistinctCountIsEnabledAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_IS_ENABLED_ASC',
  ProjectStatusConfigsDistinctCountIsEnabledDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_IS_ENABLED_DESC',
  ProjectStatusConfigsDistinctCountProjectIdAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_PROJECT_ID_ASC',
  ProjectStatusConfigsDistinctCountProjectIdDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_PROJECT_ID_DESC',
  ProjectStatusConfigsDistinctCountRowIdAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_ROW_ID_ASC',
  ProjectStatusConfigsDistinctCountRowIdDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_ROW_ID_DESC',
  ProjectStatusConfigsDistinctCountSortOrderAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_SORT_ORDER_ASC',
  ProjectStatusConfigsDistinctCountSortOrderDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_SORT_ORDER_DESC',
  ProjectStatusConfigsDistinctCountStatusTemplateIdAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_STATUS_TEMPLATE_ID_ASC',
  ProjectStatusConfigsDistinctCountStatusTemplateIdDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_STATUS_TEMPLATE_ID_DESC',
  ProjectStatusConfigsMaxSortOrderAsc = 'PROJECT_STATUS_CONFIGS_MAX_SORT_ORDER_ASC',
  ProjectStatusConfigsMaxSortOrderDesc = 'PROJECT_STATUS_CONFIGS_MAX_SORT_ORDER_DESC',
  ProjectStatusConfigsMinSortOrderAsc = 'PROJECT_STATUS_CONFIGS_MIN_SORT_ORDER_ASC',
  ProjectStatusConfigsMinSortOrderDesc = 'PROJECT_STATUS_CONFIGS_MIN_SORT_ORDER_DESC',
  ProjectStatusConfigsStddevPopulationSortOrderAsc = 'PROJECT_STATUS_CONFIGS_STDDEV_POPULATION_SORT_ORDER_ASC',
  ProjectStatusConfigsStddevPopulationSortOrderDesc = 'PROJECT_STATUS_CONFIGS_STDDEV_POPULATION_SORT_ORDER_DESC',
  ProjectStatusConfigsStddevSampleSortOrderAsc = 'PROJECT_STATUS_CONFIGS_STDDEV_SAMPLE_SORT_ORDER_ASC',
  ProjectStatusConfigsStddevSampleSortOrderDesc = 'PROJECT_STATUS_CONFIGS_STDDEV_SAMPLE_SORT_ORDER_DESC',
  ProjectStatusConfigsSumSortOrderAsc = 'PROJECT_STATUS_CONFIGS_SUM_SORT_ORDER_ASC',
  ProjectStatusConfigsSumSortOrderDesc = 'PROJECT_STATUS_CONFIGS_SUM_SORT_ORDER_DESC',
  ProjectStatusConfigsVariancePopulationSortOrderAsc = 'PROJECT_STATUS_CONFIGS_VARIANCE_POPULATION_SORT_ORDER_ASC',
  ProjectStatusConfigsVariancePopulationSortOrderDesc = 'PROJECT_STATUS_CONFIGS_VARIANCE_POPULATION_SORT_ORDER_DESC',
  ProjectStatusConfigsVarianceSampleSortOrderAsc = 'PROJECT_STATUS_CONFIGS_VARIANCE_SAMPLE_SORT_ORDER_ASC',
  ProjectStatusConfigsVarianceSampleSortOrderDesc = 'PROJECT_STATUS_CONFIGS_VARIANCE_SAMPLE_SORT_ORDER_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  WebsiteAsc = 'WEBSITE_ASC',
  WebsiteDesc = 'WEBSITE_DESC',
  WorkspaceIdAsc = 'WORKSPACE_ID_ASC',
  WorkspaceIdDesc = 'WORKSPACE_ID_DESC'
}

/** Represents an update to a `Project`. Fields that are set will be updated. */
export type ProjectPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type ProjectSocial = {
  __typename?: 'ProjectSocial';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Project` that is related to this `ProjectSocial`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  url: Scalars['String']['output'];
};

export type ProjectSocialAggregates = {
  __typename?: 'ProjectSocialAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<ProjectSocialDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `ProjectSocial` object types. */
export type ProjectSocialAggregatesFilter = {
  /** Distinct count aggregate over matching `ProjectSocial` objects. */
  distinctCount?: InputMaybe<ProjectSocialDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `ProjectSocial` object to be included within the aggregate. */
  filter?: InputMaybe<ProjectSocialFilter>;
};

/**
 * A condition to be used against `ProjectSocial` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ProjectSocialCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `ProjectSocial` values. */
export type ProjectSocialConnection = {
  __typename?: 'ProjectSocialConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<ProjectSocialAggregates>;
  /** A list of edges which contains the `ProjectSocial` and cursor to aid in pagination. */
  edges: Array<Maybe<ProjectSocialEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<ProjectSocialAggregates>>;
  /** A list of `ProjectSocial` objects. */
  nodes: Array<Maybe<ProjectSocial>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ProjectSocial` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `ProjectSocial` values. */
export type ProjectSocialConnectionGroupedAggregatesArgs = {
  groupBy: Array<ProjectSocialGroupBy>;
  having?: InputMaybe<ProjectSocialHavingInput>;
};

export type ProjectSocialDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  projectId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  url?: InputMaybe<BigIntFilter>;
};

export type ProjectSocialDistinctCountAggregates = {
  __typename?: 'ProjectSocialDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of url across the matching connection */
  url?: Maybe<Scalars['BigInt']['output']>;
};

/** A `ProjectSocial` edge in the connection. */
export type ProjectSocialEdge = {
  __typename?: 'ProjectSocialEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ProjectSocial` at the end of the edge. */
  node?: Maybe<ProjectSocial>;
};

/** A filter to be used against `ProjectSocial` object types. All fields are combined with a logical ‘and.’ */
export type ProjectSocialFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProjectSocialFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ProjectSocialFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProjectSocialFilter>>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `url` field. */
  url?: InputMaybe<StringFilter>;
};

/** Grouping methods for `ProjectSocial` for usage during aggregation. */
export enum ProjectSocialGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  ProjectId = 'PROJECT_ID',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  Url = 'URL'
}

export type ProjectSocialHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectSocialHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `ProjectSocial` aggregates. */
export type ProjectSocialHavingInput = {
  AND?: InputMaybe<Array<ProjectSocialHavingInput>>;
  OR?: InputMaybe<Array<ProjectSocialHavingInput>>;
  average?: InputMaybe<ProjectSocialHavingAverageInput>;
  distinctCount?: InputMaybe<ProjectSocialHavingDistinctCountInput>;
  max?: InputMaybe<ProjectSocialHavingMaxInput>;
  min?: InputMaybe<ProjectSocialHavingMinInput>;
  stddevPopulation?: InputMaybe<ProjectSocialHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<ProjectSocialHavingStddevSampleInput>;
  sum?: InputMaybe<ProjectSocialHavingSumInput>;
  variancePopulation?: InputMaybe<ProjectSocialHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<ProjectSocialHavingVarianceSampleInput>;
};

export type ProjectSocialHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectSocialHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectSocialHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectSocialHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectSocialHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectSocialHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectSocialHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `ProjectSocial` */
export type ProjectSocialInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  projectId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  url: Scalars['String']['input'];
};

/** Methods to use when ordering `ProjectSocial`. */
export enum ProjectSocialOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC'
}

/** Represents an update to a `ProjectSocial`. Fields that are set will be updated. */
export type ProjectSocialPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectStatusConfig = {
  __typename?: 'ProjectStatusConfig';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  customColor?: Maybe<Scalars['String']['output']>;
  customDescription?: Maybe<Scalars['String']['output']>;
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Reads a single `Project` that is related to this `ProjectStatusConfig`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  sortOrder?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `StatusTemplate` that is related to this `ProjectStatusConfig`. */
  statusTemplate?: Maybe<StatusTemplate>;
  statusTemplateId: Scalars['UUID']['output'];
};

export type ProjectStatusConfigAggregates = {
  __typename?: 'ProjectStatusConfigAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<ProjectStatusConfigAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<ProjectStatusConfigDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<ProjectStatusConfigMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<ProjectStatusConfigMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<ProjectStatusConfigStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<ProjectStatusConfigStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<ProjectStatusConfigSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<ProjectStatusConfigVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<ProjectStatusConfigVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `ProjectStatusConfig` object types. */
export type ProjectStatusConfigAggregatesFilter = {
  /** Mean average aggregate over matching `ProjectStatusConfig` objects. */
  average?: InputMaybe<ProjectStatusConfigAverageAggregateFilter>;
  /** Distinct count aggregate over matching `ProjectStatusConfig` objects. */
  distinctCount?: InputMaybe<ProjectStatusConfigDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `ProjectStatusConfig` object to be included within the aggregate. */
  filter?: InputMaybe<ProjectStatusConfigFilter>;
  /** Maximum aggregate over matching `ProjectStatusConfig` objects. */
  max?: InputMaybe<ProjectStatusConfigMaxAggregateFilter>;
  /** Minimum aggregate over matching `ProjectStatusConfig` objects. */
  min?: InputMaybe<ProjectStatusConfigMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `ProjectStatusConfig` objects. */
  stddevPopulation?: InputMaybe<ProjectStatusConfigStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `ProjectStatusConfig` objects. */
  stddevSample?: InputMaybe<ProjectStatusConfigStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `ProjectStatusConfig` objects. */
  sum?: InputMaybe<ProjectStatusConfigSumAggregateFilter>;
  /** Population variance aggregate over matching `ProjectStatusConfig` objects. */
  variancePopulation?: InputMaybe<ProjectStatusConfigVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `ProjectStatusConfig` objects. */
  varianceSample?: InputMaybe<ProjectStatusConfigVarianceSampleAggregateFilter>;
};

export type ProjectStatusConfigAverageAggregateFilter = {
  sortOrder?: InputMaybe<BigFloatFilter>;
};

export type ProjectStatusConfigAverageAggregates = {
  __typename?: 'ProjectStatusConfigAverageAggregates';
  /** Mean average of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `ProjectStatusConfig` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type ProjectStatusConfigCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `customColor` field. */
  customColor?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `customDescription` field. */
  customDescription?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `isDefault` field. */
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `isEnabled` field. */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `sortOrder` field. */
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `statusTemplateId` field. */
  statusTemplateId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `ProjectStatusConfig` values. */
export type ProjectStatusConfigConnection = {
  __typename?: 'ProjectStatusConfigConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<ProjectStatusConfigAggregates>;
  /** A list of edges which contains the `ProjectStatusConfig` and cursor to aid in pagination. */
  edges: Array<Maybe<ProjectStatusConfigEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<ProjectStatusConfigAggregates>>;
  /** A list of `ProjectStatusConfig` objects. */
  nodes: Array<Maybe<ProjectStatusConfig>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ProjectStatusConfig` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `ProjectStatusConfig` values. */
export type ProjectStatusConfigConnectionGroupedAggregatesArgs = {
  groupBy: Array<ProjectStatusConfigGroupBy>;
  having?: InputMaybe<ProjectStatusConfigHavingInput>;
};

export type ProjectStatusConfigDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  customColor?: InputMaybe<BigIntFilter>;
  customDescription?: InputMaybe<BigIntFilter>;
  isDefault?: InputMaybe<BigIntFilter>;
  isEnabled?: InputMaybe<BigIntFilter>;
  projectId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  sortOrder?: InputMaybe<BigIntFilter>;
  statusTemplateId?: InputMaybe<BigIntFilter>;
};

export type ProjectStatusConfigDistinctCountAggregates = {
  __typename?: 'ProjectStatusConfigDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of customColor across the matching connection */
  customColor?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of customDescription across the matching connection */
  customDescription?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isDefault across the matching connection */
  isDefault?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isEnabled across the matching connection */
  isEnabled?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of statusTemplateId across the matching connection */
  statusTemplateId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `ProjectStatusConfig` edge in the connection. */
export type ProjectStatusConfigEdge = {
  __typename?: 'ProjectStatusConfigEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ProjectStatusConfig` at the end of the edge. */
  node?: Maybe<ProjectStatusConfig>;
};

/** A filter to be used against `ProjectStatusConfig` object types. All fields are combined with a logical ‘and.’ */
export type ProjectStatusConfigFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProjectStatusConfigFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `customColor` field. */
  customColor?: InputMaybe<StringFilter>;
  /** Filter by the object’s `customDescription` field. */
  customDescription?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isDefault` field. */
  isDefault?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `isEnabled` field. */
  isEnabled?: InputMaybe<BooleanFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ProjectStatusConfigFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProjectStatusConfigFilter>>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `sortOrder` field. */
  sortOrder?: InputMaybe<IntFilter>;
  /** Filter by the object’s `statusTemplate` relation. */
  statusTemplate?: InputMaybe<StatusTemplateFilter>;
  /** Filter by the object’s `statusTemplateId` field. */
  statusTemplateId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `ProjectStatusConfig` for usage during aggregation. */
export enum ProjectStatusConfigGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  CustomColor = 'CUSTOM_COLOR',
  CustomDescription = 'CUSTOM_DESCRIPTION',
  IsDefault = 'IS_DEFAULT',
  IsEnabled = 'IS_ENABLED',
  ProjectId = 'PROJECT_ID',
  SortOrder = 'SORT_ORDER',
  StatusTemplateId = 'STATUS_TEMPLATE_ID'
}

export type ProjectStatusConfigHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
};

export type ProjectStatusConfigHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
};

/** Conditions for `ProjectStatusConfig` aggregates. */
export type ProjectStatusConfigHavingInput = {
  AND?: InputMaybe<Array<ProjectStatusConfigHavingInput>>;
  OR?: InputMaybe<Array<ProjectStatusConfigHavingInput>>;
  average?: InputMaybe<ProjectStatusConfigHavingAverageInput>;
  distinctCount?: InputMaybe<ProjectStatusConfigHavingDistinctCountInput>;
  max?: InputMaybe<ProjectStatusConfigHavingMaxInput>;
  min?: InputMaybe<ProjectStatusConfigHavingMinInput>;
  stddevPopulation?: InputMaybe<ProjectStatusConfigHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<ProjectStatusConfigHavingStddevSampleInput>;
  sum?: InputMaybe<ProjectStatusConfigHavingSumInput>;
  variancePopulation?: InputMaybe<ProjectStatusConfigHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<ProjectStatusConfigHavingVarianceSampleInput>;
};

export type ProjectStatusConfigHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
};

export type ProjectStatusConfigHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
};

export type ProjectStatusConfigHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
};

export type ProjectStatusConfigHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
};

export type ProjectStatusConfigHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
};

export type ProjectStatusConfigHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
};

export type ProjectStatusConfigHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
};

/** An input for mutations affecting `ProjectStatusConfig` */
export type ProjectStatusConfigInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  customColor?: InputMaybe<Scalars['String']['input']>;
  customDescription?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  projectId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  statusTemplateId: Scalars['UUID']['input'];
};

export type ProjectStatusConfigMaxAggregateFilter = {
  sortOrder?: InputMaybe<IntFilter>;
};

export type ProjectStatusConfigMaxAggregates = {
  __typename?: 'ProjectStatusConfigMaxAggregates';
  /** Maximum of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['Int']['output']>;
};

export type ProjectStatusConfigMinAggregateFilter = {
  sortOrder?: InputMaybe<IntFilter>;
};

export type ProjectStatusConfigMinAggregates = {
  __typename?: 'ProjectStatusConfigMinAggregates';
  /** Minimum of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `ProjectStatusConfig`. */
export enum ProjectStatusConfigOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  CustomColorAsc = 'CUSTOM_COLOR_ASC',
  CustomColorDesc = 'CUSTOM_COLOR_DESC',
  CustomDescriptionAsc = 'CUSTOM_DESCRIPTION_ASC',
  CustomDescriptionDesc = 'CUSTOM_DESCRIPTION_DESC',
  IsDefaultAsc = 'IS_DEFAULT_ASC',
  IsDefaultDesc = 'IS_DEFAULT_DESC',
  IsEnabledAsc = 'IS_ENABLED_ASC',
  IsEnabledDesc = 'IS_ENABLED_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SortOrderAsc = 'SORT_ORDER_ASC',
  SortOrderDesc = 'SORT_ORDER_DESC',
  StatusTemplateIdAsc = 'STATUS_TEMPLATE_ID_ASC',
  StatusTemplateIdDesc = 'STATUS_TEMPLATE_ID_DESC'
}

/** Represents an update to a `ProjectStatusConfig`. Fields that are set will be updated. */
export type ProjectStatusConfigPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  customColor?: InputMaybe<Scalars['String']['input']>;
  customDescription?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  statusTemplateId?: InputMaybe<Scalars['UUID']['input']>;
};

export type ProjectStatusConfigStddevPopulationAggregateFilter = {
  sortOrder?: InputMaybe<BigFloatFilter>;
};

export type ProjectStatusConfigStddevPopulationAggregates = {
  __typename?: 'ProjectStatusConfigStddevPopulationAggregates';
  /** Population standard deviation of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectStatusConfigStddevSampleAggregateFilter = {
  sortOrder?: InputMaybe<BigFloatFilter>;
};

export type ProjectStatusConfigStddevSampleAggregates = {
  __typename?: 'ProjectStatusConfigStddevSampleAggregates';
  /** Sample standard deviation of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectStatusConfigSumAggregateFilter = {
  sortOrder?: InputMaybe<BigIntFilter>;
};

export type ProjectStatusConfigSumAggregates = {
  __typename?: 'ProjectStatusConfigSumAggregates';
  /** Sum of sortOrder across the matching connection */
  sortOrder: Scalars['BigInt']['output'];
};

export type ProjectStatusConfigVariancePopulationAggregateFilter = {
  sortOrder?: InputMaybe<BigFloatFilter>;
};

export type ProjectStatusConfigVariancePopulationAggregates = {
  __typename?: 'ProjectStatusConfigVariancePopulationAggregates';
  /** Population variance of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectStatusConfigVarianceSampleAggregateFilter = {
  sortOrder?: InputMaybe<BigFloatFilter>;
};

export type ProjectStatusConfigVarianceSampleAggregates = {
  __typename?: 'ProjectStatusConfigVarianceSampleAggregates';
  /** Sample variance of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
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

/** A filter to be used against many `ProjectSocial` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManyProjectSocialFilter = {
  /** Aggregates across related `ProjectSocial` match the filter criteria. */
  aggregates?: InputMaybe<ProjectSocialAggregatesFilter>;
  /** Every related `ProjectSocial` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ProjectSocialFilter>;
  /** No related `ProjectSocial` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ProjectSocialFilter>;
  /** Some related `ProjectSocial` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ProjectSocialFilter>;
};

/** A filter to be used against many `ProjectStatusConfig` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManyProjectStatusConfigFilter = {
  /** Aggregates across related `ProjectStatusConfig` match the filter criteria. */
  aggregates?: InputMaybe<ProjectStatusConfigAggregatesFilter>;
  /** Every related `ProjectStatusConfig` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ProjectStatusConfigFilter>;
  /** No related `ProjectStatusConfig` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ProjectStatusConfigFilter>;
  /** Some related `ProjectStatusConfig` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ProjectStatusConfigFilter>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Get a single `Comment`. */
  comment?: Maybe<Comment>;
  /** Reads and enables pagination through a set of `Comment`. */
  comments?: Maybe<CommentConnection>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** Get a single `Invitation`. */
  invitation?: Maybe<Invitation>;
  /** Get a single `Invitation`. */
  invitationByWorkspaceIdAndEmail?: Maybe<Invitation>;
  /** Reads and enables pagination through a set of `Invitation`. */
  invitations?: Maybe<InvitationConnection>;
  /** Get a single `Member`. */
  member?: Maybe<Member>;
  /** Get a single `Member`. */
  memberByUserIdAndWorkspaceId?: Maybe<Member>;
  /** Reads and enables pagination through a set of `Member`. */
  members?: Maybe<MemberConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Get a single `Post`. */
  post?: Maybe<Post>;
  /** Reads and enables pagination through a set of `Post`. */
  posts?: Maybe<PostConnection>;
  /** Get a single `Project`. */
  project?: Maybe<Project>;
  /** Get a single `Project`. */
  projectBySlugAndWorkspaceId?: Maybe<Project>;
  /** Get a single `ProjectSocial`. */
  projectSocial?: Maybe<ProjectSocial>;
  /** Reads and enables pagination through a set of `ProjectSocial`. */
  projectSocials?: Maybe<ProjectSocialConnection>;
  /** Get a single `ProjectStatusConfig`. */
  projectStatusConfig?: Maybe<ProjectStatusConfig>;
  /** Get a single `ProjectStatusConfig`. */
  projectStatusConfigByProjectIdAndStatusTemplateId?: Maybe<ProjectStatusConfig>;
  /** Reads and enables pagination through a set of `ProjectStatusConfig`. */
  projectStatusConfigs?: Maybe<ProjectStatusConfigConnection>;
  /** Reads and enables pagination through a set of `Project`. */
  projects?: Maybe<ProjectConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Get a single `StatusTemplate`. */
  statusTemplate?: Maybe<StatusTemplate>;
  /** Get a single `StatusTemplate`. */
  statusTemplateByWorkspaceIdAndName?: Maybe<StatusTemplate>;
  /** Reads and enables pagination through a set of `StatusTemplate`. */
  statusTemplates?: Maybe<StatusTemplateConnection>;
  /** Get a single `User`. */
  user?: Maybe<User>;
  /** Get a single `User`. */
  userByEmail?: Maybe<User>;
  /** Get a single `User`. */
  userByIdentityProviderId?: Maybe<User>;
  /** Get a single `User`. */
  userByUsername?: Maybe<User>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UserConnection>;
  /** Get a single `Vote`. */
  vote?: Maybe<Vote>;
  /** Get a single `Vote`. */
  voteByPostIdAndUserId?: Maybe<Vote>;
  /** Reads and enables pagination through a set of `Vote`. */
  votes?: Maybe<VoteConnection>;
  /** Get a single `Workspace`. */
  workspace?: Maybe<Workspace>;
  /** Get a single `Workspace`. */
  workspaceByName?: Maybe<Workspace>;
  /** Get a single `Workspace`. */
  workspaceBySlug?: Maybe<Workspace>;
  /** Reads and enables pagination through a set of `Workspace`. */
  workspaces?: Maybe<WorkspaceConnection>;
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
export type QueryInvitationArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInvitationByWorkspaceIdAndEmailArgs = {
  email: Scalars['String']['input'];
  workspaceId: Scalars['UUID']['input'];
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
export type QueryMemberByUserIdAndWorkspaceIdArgs = {
  userId: Scalars['UUID']['input'];
  workspaceId: Scalars['UUID']['input'];
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
export type QueryPostArgs = {
  rowId: Scalars['UUID']['input'];
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
export type QueryProjectBySlugAndWorkspaceIdArgs = {
  slug: Scalars['String']['input'];
  workspaceId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectSocialArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectSocialsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectSocialCondition>;
  filter?: InputMaybe<ProjectSocialFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectSocialOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectStatusConfigArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectStatusConfigByProjectIdAndStatusTemplateIdArgs = {
  projectId: Scalars['UUID']['input'];
  statusTemplateId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectStatusConfigsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectStatusConfigCondition>;
  filter?: InputMaybe<ProjectStatusConfigFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectStatusConfigOrderBy>>;
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
export type QueryStatusTemplateArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStatusTemplateByWorkspaceIdAndNameArgs = {
  name: Scalars['String']['input'];
  workspaceId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStatusTemplatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<StatusTemplateCondition>;
  filter?: InputMaybe<StatusTemplateFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StatusTemplateOrderBy>>;
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
export type QueryUserByIdentityProviderIdArgs = {
  identityProviderId: Scalars['UUID']['input'];
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


/** The root query type which gives access points into the data universe. */
export type QueryVoteArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVoteByPostIdAndUserIdArgs = {
  postId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVotesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VoteCondition>;
  filter?: InputMaybe<VoteFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VoteOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkspaceArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkspaceByNameArgs = {
  name: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkspaceBySlugArgs = {
  slug: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkspacesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkspaceCondition>;
  filter?: InputMaybe<WorkspaceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkspaceOrderBy>>;
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

export type StatusTemplate = {
  __typename?: 'StatusTemplate';
  color?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostConnection;
  /** Reads and enables pagination through a set of `ProjectStatusConfig`. */
  projectStatusConfigs: ProjectStatusConfigConnection;
  rowId: Scalars['UUID']['output'];
  sortOrder?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Workspace` that is related to this `StatusTemplate`. */
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['UUID']['output'];
};


export type StatusTemplatePostsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostCondition>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type StatusTemplateProjectStatusConfigsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectStatusConfigCondition>;
  filter?: InputMaybe<ProjectStatusConfigFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectStatusConfigOrderBy>>;
};

export type StatusTemplateAggregates = {
  __typename?: 'StatusTemplateAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<StatusTemplateAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<StatusTemplateDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<StatusTemplateMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<StatusTemplateMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<StatusTemplateStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<StatusTemplateStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<StatusTemplateSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<StatusTemplateVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<StatusTemplateVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `StatusTemplate` object types. */
export type StatusTemplateAggregatesFilter = {
  /** Mean average aggregate over matching `StatusTemplate` objects. */
  average?: InputMaybe<StatusTemplateAverageAggregateFilter>;
  /** Distinct count aggregate over matching `StatusTemplate` objects. */
  distinctCount?: InputMaybe<StatusTemplateDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `StatusTemplate` object to be included within the aggregate. */
  filter?: InputMaybe<StatusTemplateFilter>;
  /** Maximum aggregate over matching `StatusTemplate` objects. */
  max?: InputMaybe<StatusTemplateMaxAggregateFilter>;
  /** Minimum aggregate over matching `StatusTemplate` objects. */
  min?: InputMaybe<StatusTemplateMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `StatusTemplate` objects. */
  stddevPopulation?: InputMaybe<StatusTemplateStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `StatusTemplate` objects. */
  stddevSample?: InputMaybe<StatusTemplateStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `StatusTemplate` objects. */
  sum?: InputMaybe<StatusTemplateSumAggregateFilter>;
  /** Population variance aggregate over matching `StatusTemplate` objects. */
  variancePopulation?: InputMaybe<StatusTemplateVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `StatusTemplate` objects. */
  varianceSample?: InputMaybe<StatusTemplateVarianceSampleAggregateFilter>;
};

export type StatusTemplateAverageAggregateFilter = {
  sortOrder?: InputMaybe<BigFloatFilter>;
};

export type StatusTemplateAverageAggregates = {
  __typename?: 'StatusTemplateAverageAggregates';
  /** Mean average of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `StatusTemplate` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type StatusTemplateCondition = {
  /** Checks for equality with the object’s `color` field. */
  color?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `displayName` field. */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `sortOrder` field. */
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `StatusTemplate` values. */
export type StatusTemplateConnection = {
  __typename?: 'StatusTemplateConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<StatusTemplateAggregates>;
  /** A list of edges which contains the `StatusTemplate` and cursor to aid in pagination. */
  edges: Array<Maybe<StatusTemplateEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<StatusTemplateAggregates>>;
  /** A list of `StatusTemplate` objects. */
  nodes: Array<Maybe<StatusTemplate>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `StatusTemplate` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `StatusTemplate` values. */
export type StatusTemplateConnectionGroupedAggregatesArgs = {
  groupBy: Array<StatusTemplateGroupBy>;
  having?: InputMaybe<StatusTemplateHavingInput>;
};

export type StatusTemplateDistinctCountAggregateFilter = {
  color?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  description?: InputMaybe<BigIntFilter>;
  displayName?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  sortOrder?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  workspaceId?: InputMaybe<BigIntFilter>;
};

export type StatusTemplateDistinctCountAggregates = {
  __typename?: 'StatusTemplateDistinctCountAggregates';
  /** Distinct count of color across the matching connection */
  color?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of displayName across the matching connection */
  displayName?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workspaceId across the matching connection */
  workspaceId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `StatusTemplate` edge in the connection. */
export type StatusTemplateEdge = {
  __typename?: 'StatusTemplateEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `StatusTemplate` at the end of the edge. */
  node?: Maybe<StatusTemplate>;
};

/** A filter to be used against `StatusTemplate` object types. All fields are combined with a logical ‘and.’ */
export type StatusTemplateFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<StatusTemplateFilter>>;
  /** Filter by the object’s `color` field. */
  color?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `displayName` field. */
  displayName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<StatusTemplateFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<StatusTemplateFilter>>;
  /** Filter by the object’s `posts` relation. */
  posts?: InputMaybe<StatusTemplateToManyPostFilter>;
  /** Some related `posts` exist. */
  postsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `projectStatusConfigs` relation. */
  projectStatusConfigs?: InputMaybe<StatusTemplateToManyProjectStatusConfigFilter>;
  /** Some related `projectStatusConfigs` exist. */
  projectStatusConfigsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `sortOrder` field. */
  sortOrder?: InputMaybe<IntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `workspace` relation. */
  workspace?: InputMaybe<WorkspaceFilter>;
  /** Filter by the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `StatusTemplate` for usage during aggregation. */
export enum StatusTemplateGroupBy {
  Color = 'COLOR',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  DisplayName = 'DISPLAY_NAME',
  Name = 'NAME',
  SortOrder = 'SORT_ORDER',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  WorkspaceId = 'WORKSPACE_ID'
}

export type StatusTemplateHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type StatusTemplateHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `StatusTemplate` aggregates. */
export type StatusTemplateHavingInput = {
  AND?: InputMaybe<Array<StatusTemplateHavingInput>>;
  OR?: InputMaybe<Array<StatusTemplateHavingInput>>;
  average?: InputMaybe<StatusTemplateHavingAverageInput>;
  distinctCount?: InputMaybe<StatusTemplateHavingDistinctCountInput>;
  max?: InputMaybe<StatusTemplateHavingMaxInput>;
  min?: InputMaybe<StatusTemplateHavingMinInput>;
  stddevPopulation?: InputMaybe<StatusTemplateHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<StatusTemplateHavingStddevSampleInput>;
  sum?: InputMaybe<StatusTemplateHavingSumInput>;
  variancePopulation?: InputMaybe<StatusTemplateHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<StatusTemplateHavingVarianceSampleInput>;
};

export type StatusTemplateHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type StatusTemplateHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type StatusTemplateHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type StatusTemplateHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type StatusTemplateHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type StatusTemplateHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type StatusTemplateHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  sortOrder?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `StatusTemplate` */
export type StatusTemplateInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  workspaceId: Scalars['UUID']['input'];
};

export type StatusTemplateMaxAggregateFilter = {
  sortOrder?: InputMaybe<IntFilter>;
};

export type StatusTemplateMaxAggregates = {
  __typename?: 'StatusTemplateMaxAggregates';
  /** Maximum of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['Int']['output']>;
};

export type StatusTemplateMinAggregateFilter = {
  sortOrder?: InputMaybe<IntFilter>;
};

export type StatusTemplateMinAggregates = {
  __typename?: 'StatusTemplateMinAggregates';
  /** Minimum of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `StatusTemplate`. */
export enum StatusTemplateOrderBy {
  ColorAsc = 'COLOR_ASC',
  ColorDesc = 'COLOR_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  DisplayNameAsc = 'DISPLAY_NAME_ASC',
  DisplayNameDesc = 'DISPLAY_NAME_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
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
  PostsDistinctCountStatusTemplateIdAsc = 'POSTS_DISTINCT_COUNT_STATUS_TEMPLATE_ID_ASC',
  PostsDistinctCountStatusTemplateIdDesc = 'POSTS_DISTINCT_COUNT_STATUS_TEMPLATE_ID_DESC',
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
  ProjectStatusConfigsAverageSortOrderAsc = 'PROJECT_STATUS_CONFIGS_AVERAGE_SORT_ORDER_ASC',
  ProjectStatusConfigsAverageSortOrderDesc = 'PROJECT_STATUS_CONFIGS_AVERAGE_SORT_ORDER_DESC',
  ProjectStatusConfigsCountAsc = 'PROJECT_STATUS_CONFIGS_COUNT_ASC',
  ProjectStatusConfigsCountDesc = 'PROJECT_STATUS_CONFIGS_COUNT_DESC',
  ProjectStatusConfigsDistinctCountCreatedAtAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_CREATED_AT_ASC',
  ProjectStatusConfigsDistinctCountCreatedAtDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_CREATED_AT_DESC',
  ProjectStatusConfigsDistinctCountCustomColorAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_CUSTOM_COLOR_ASC',
  ProjectStatusConfigsDistinctCountCustomColorDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_CUSTOM_COLOR_DESC',
  ProjectStatusConfigsDistinctCountCustomDescriptionAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_CUSTOM_DESCRIPTION_ASC',
  ProjectStatusConfigsDistinctCountCustomDescriptionDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_CUSTOM_DESCRIPTION_DESC',
  ProjectStatusConfigsDistinctCountIsDefaultAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_IS_DEFAULT_ASC',
  ProjectStatusConfigsDistinctCountIsDefaultDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_IS_DEFAULT_DESC',
  ProjectStatusConfigsDistinctCountIsEnabledAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_IS_ENABLED_ASC',
  ProjectStatusConfigsDistinctCountIsEnabledDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_IS_ENABLED_DESC',
  ProjectStatusConfigsDistinctCountProjectIdAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_PROJECT_ID_ASC',
  ProjectStatusConfigsDistinctCountProjectIdDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_PROJECT_ID_DESC',
  ProjectStatusConfigsDistinctCountRowIdAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_ROW_ID_ASC',
  ProjectStatusConfigsDistinctCountRowIdDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_ROW_ID_DESC',
  ProjectStatusConfigsDistinctCountSortOrderAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_SORT_ORDER_ASC',
  ProjectStatusConfigsDistinctCountSortOrderDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_SORT_ORDER_DESC',
  ProjectStatusConfigsDistinctCountStatusTemplateIdAsc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_STATUS_TEMPLATE_ID_ASC',
  ProjectStatusConfigsDistinctCountStatusTemplateIdDesc = 'PROJECT_STATUS_CONFIGS_DISTINCT_COUNT_STATUS_TEMPLATE_ID_DESC',
  ProjectStatusConfigsMaxSortOrderAsc = 'PROJECT_STATUS_CONFIGS_MAX_SORT_ORDER_ASC',
  ProjectStatusConfigsMaxSortOrderDesc = 'PROJECT_STATUS_CONFIGS_MAX_SORT_ORDER_DESC',
  ProjectStatusConfigsMinSortOrderAsc = 'PROJECT_STATUS_CONFIGS_MIN_SORT_ORDER_ASC',
  ProjectStatusConfigsMinSortOrderDesc = 'PROJECT_STATUS_CONFIGS_MIN_SORT_ORDER_DESC',
  ProjectStatusConfigsStddevPopulationSortOrderAsc = 'PROJECT_STATUS_CONFIGS_STDDEV_POPULATION_SORT_ORDER_ASC',
  ProjectStatusConfigsStddevPopulationSortOrderDesc = 'PROJECT_STATUS_CONFIGS_STDDEV_POPULATION_SORT_ORDER_DESC',
  ProjectStatusConfigsStddevSampleSortOrderAsc = 'PROJECT_STATUS_CONFIGS_STDDEV_SAMPLE_SORT_ORDER_ASC',
  ProjectStatusConfigsStddevSampleSortOrderDesc = 'PROJECT_STATUS_CONFIGS_STDDEV_SAMPLE_SORT_ORDER_DESC',
  ProjectStatusConfigsSumSortOrderAsc = 'PROJECT_STATUS_CONFIGS_SUM_SORT_ORDER_ASC',
  ProjectStatusConfigsSumSortOrderDesc = 'PROJECT_STATUS_CONFIGS_SUM_SORT_ORDER_DESC',
  ProjectStatusConfigsVariancePopulationSortOrderAsc = 'PROJECT_STATUS_CONFIGS_VARIANCE_POPULATION_SORT_ORDER_ASC',
  ProjectStatusConfigsVariancePopulationSortOrderDesc = 'PROJECT_STATUS_CONFIGS_VARIANCE_POPULATION_SORT_ORDER_DESC',
  ProjectStatusConfigsVarianceSampleSortOrderAsc = 'PROJECT_STATUS_CONFIGS_VARIANCE_SAMPLE_SORT_ORDER_ASC',
  ProjectStatusConfigsVarianceSampleSortOrderDesc = 'PROJECT_STATUS_CONFIGS_VARIANCE_SAMPLE_SORT_ORDER_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SortOrderAsc = 'SORT_ORDER_ASC',
  SortOrderDesc = 'SORT_ORDER_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  WorkspaceIdAsc = 'WORKSPACE_ID_ASC',
  WorkspaceIdDesc = 'WORKSPACE_ID_DESC'
}

/** Represents an update to a `StatusTemplate`. Fields that are set will be updated. */
export type StatusTemplatePatch = {
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type StatusTemplateStddevPopulationAggregateFilter = {
  sortOrder?: InputMaybe<BigFloatFilter>;
};

export type StatusTemplateStddevPopulationAggregates = {
  __typename?: 'StatusTemplateStddevPopulationAggregates';
  /** Population standard deviation of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
};

export type StatusTemplateStddevSampleAggregateFilter = {
  sortOrder?: InputMaybe<BigFloatFilter>;
};

export type StatusTemplateStddevSampleAggregates = {
  __typename?: 'StatusTemplateStddevSampleAggregates';
  /** Sample standard deviation of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
};

export type StatusTemplateSumAggregateFilter = {
  sortOrder?: InputMaybe<BigIntFilter>;
};

export type StatusTemplateSumAggregates = {
  __typename?: 'StatusTemplateSumAggregates';
  /** Sum of sortOrder across the matching connection */
  sortOrder: Scalars['BigInt']['output'];
};

/** A filter to be used against many `Post` object types. All fields are combined with a logical ‘and.’ */
export type StatusTemplateToManyPostFilter = {
  /** Aggregates across related `Post` match the filter criteria. */
  aggregates?: InputMaybe<PostAggregatesFilter>;
  /** Every related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostFilter>;
  /** No related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostFilter>;
  /** Some related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostFilter>;
};

/** A filter to be used against many `ProjectStatusConfig` object types. All fields are combined with a logical ‘and.’ */
export type StatusTemplateToManyProjectStatusConfigFilter = {
  /** Aggregates across related `ProjectStatusConfig` match the filter criteria. */
  aggregates?: InputMaybe<ProjectStatusConfigAggregatesFilter>;
  /** Every related `ProjectStatusConfig` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ProjectStatusConfigFilter>;
  /** No related `ProjectStatusConfig` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ProjectStatusConfigFilter>;
  /** Some related `ProjectStatusConfig` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ProjectStatusConfigFilter>;
};

export type StatusTemplateVariancePopulationAggregateFilter = {
  sortOrder?: InputMaybe<BigFloatFilter>;
};

export type StatusTemplateVariancePopulationAggregates = {
  __typename?: 'StatusTemplateVariancePopulationAggregates';
  /** Population variance of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
};

export type StatusTemplateVarianceSampleAggregateFilter = {
  sortOrder?: InputMaybe<BigFloatFilter>;
};

export type StatusTemplateVarianceSampleAggregates = {
  __typename?: 'StatusTemplateVarianceSampleAggregates';
  /** Sample variance of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
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

/** All input for the `updateProjectSocial` mutation. */
export type UpdateProjectSocialInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `ProjectSocial` being updated. */
  patch: ProjectSocialPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `ProjectSocial` mutation. */
export type UpdateProjectSocialPayload = {
  __typename?: 'UpdateProjectSocialPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ProjectSocial` that was updated by this mutation. */
  projectSocial?: Maybe<ProjectSocial>;
  /** An edge for our `ProjectSocial`. May be used by Relay 1. */
  projectSocialEdge?: Maybe<ProjectSocialEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `ProjectSocial` mutation. */
export type UpdateProjectSocialPayloadProjectSocialEdgeArgs = {
  orderBy?: Array<ProjectSocialOrderBy>;
};

/** All input for the `updateProjectStatusConfig` mutation. */
export type UpdateProjectStatusConfigInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `ProjectStatusConfig` being updated. */
  patch: ProjectStatusConfigPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `ProjectStatusConfig` mutation. */
export type UpdateProjectStatusConfigPayload = {
  __typename?: 'UpdateProjectStatusConfigPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ProjectStatusConfig` that was updated by this mutation. */
  projectStatusConfig?: Maybe<ProjectStatusConfig>;
  /** An edge for our `ProjectStatusConfig`. May be used by Relay 1. */
  projectStatusConfigEdge?: Maybe<ProjectStatusConfigEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `ProjectStatusConfig` mutation. */
export type UpdateProjectStatusConfigPayloadProjectStatusConfigEdgeArgs = {
  orderBy?: Array<ProjectStatusConfigOrderBy>;
};

/** All input for the `updateStatusTemplate` mutation. */
export type UpdateStatusTemplateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `StatusTemplate` being updated. */
  patch: StatusTemplatePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `StatusTemplate` mutation. */
export type UpdateStatusTemplatePayload = {
  __typename?: 'UpdateStatusTemplatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `StatusTemplate` that was updated by this mutation. */
  statusTemplate?: Maybe<StatusTemplate>;
  /** An edge for our `StatusTemplate`. May be used by Relay 1. */
  statusTemplateEdge?: Maybe<StatusTemplateEdge>;
};


/** The output of our update `StatusTemplate` mutation. */
export type UpdateStatusTemplatePayloadStatusTemplateEdgeArgs = {
  orderBy?: Array<StatusTemplateOrderBy>;
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

/** All input for the `updateVote` mutation. */
export type UpdateVoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Vote` being updated. */
  patch: VotePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Vote` mutation. */
export type UpdateVotePayload = {
  __typename?: 'UpdateVotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Vote` that was updated by this mutation. */
  vote?: Maybe<Vote>;
  /** An edge for our `Vote`. May be used by Relay 1. */
  voteEdge?: Maybe<VoteEdge>;
};


/** The output of our update `Vote` mutation. */
export type UpdateVotePayloadVoteEdgeArgs = {
  orderBy?: Array<VoteOrderBy>;
};

/** All input for the `updateWorkspace` mutation. */
export type UpdateWorkspaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Workspace` being updated. */
  patch: WorkspacePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Workspace` mutation. */
export type UpdateWorkspacePayload = {
  __typename?: 'UpdateWorkspacePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Workspace` that was updated by this mutation. */
  workspace?: Maybe<Workspace>;
  /** An edge for our `Workspace`. May be used by Relay 1. */
  workspaceEdge?: Maybe<WorkspaceEdge>;
};


/** The output of our update `Workspace` mutation. */
export type UpdateWorkspacePayloadWorkspaceEdgeArgs = {
  orderBy?: Array<WorkspaceOrderBy>;
};

export type User = {
  __typename?: 'User';
  /** Reads and enables pagination through a set of `Comment`. */
  comments: CommentConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  identityProviderId: Scalars['UUID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Member`. */
  members: MemberConnection;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostConnection;
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Vote`. */
  votes: VoteConnection;
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


export type UserVotesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VoteCondition>;
  filter?: InputMaybe<VoteFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VoteOrderBy>>;
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
  /** Checks for equality with the object’s `identityProviderId` field. */
  identityProviderId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
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
  /** Distinct count of identityProviderId across the matching connection */
  identityProviderId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of lastName across the matching connection */
  lastName?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `firstName` field. */
  firstName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `identityProviderId` field. */
  identityProviderId?: InputMaybe<UuidFilter>;
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
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `username` field. */
  username?: InputMaybe<StringFilter>;
  /** Filter by the object’s `votes` relation. */
  votes?: InputMaybe<UserToManyVoteFilter>;
  /** Some related `votes` exist. */
  votesExist?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Grouping methods for `User` for usage during aggregation. */
export enum UserGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  FirstName = 'FIRST_NAME',
  LastName = 'LAST_NAME',
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
  identityProviderId: Scalars['UUID']['input'];
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
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  IdentityProviderIdAsc = 'IDENTITY_PROVIDER_ID_ASC',
  IdentityProviderIdDesc = 'IDENTITY_PROVIDER_ID_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  MembersCountAsc = 'MEMBERS_COUNT_ASC',
  MembersCountDesc = 'MEMBERS_COUNT_DESC',
  MembersDistinctCountCreatedAtAsc = 'MEMBERS_DISTINCT_COUNT_CREATED_AT_ASC',
  MembersDistinctCountCreatedAtDesc = 'MEMBERS_DISTINCT_COUNT_CREATED_AT_DESC',
  MembersDistinctCountRoleAsc = 'MEMBERS_DISTINCT_COUNT_ROLE_ASC',
  MembersDistinctCountRoleDesc = 'MEMBERS_DISTINCT_COUNT_ROLE_DESC',
  MembersDistinctCountRowIdAsc = 'MEMBERS_DISTINCT_COUNT_ROW_ID_ASC',
  MembersDistinctCountRowIdDesc = 'MEMBERS_DISTINCT_COUNT_ROW_ID_DESC',
  MembersDistinctCountUserIdAsc = 'MEMBERS_DISTINCT_COUNT_USER_ID_ASC',
  MembersDistinctCountUserIdDesc = 'MEMBERS_DISTINCT_COUNT_USER_ID_DESC',
  MembersDistinctCountWorkspaceIdAsc = 'MEMBERS_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  MembersDistinctCountWorkspaceIdDesc = 'MEMBERS_DISTINCT_COUNT_WORKSPACE_ID_DESC',
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
  PostsDistinctCountStatusTemplateIdAsc = 'POSTS_DISTINCT_COUNT_STATUS_TEMPLATE_ID_ASC',
  PostsDistinctCountStatusTemplateIdDesc = 'POSTS_DISTINCT_COUNT_STATUS_TEMPLATE_ID_DESC',
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
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  VotesCountAsc = 'VOTES_COUNT_ASC',
  VotesCountDesc = 'VOTES_COUNT_DESC',
  VotesDistinctCountCreatedAtAsc = 'VOTES_DISTINCT_COUNT_CREATED_AT_ASC',
  VotesDistinctCountCreatedAtDesc = 'VOTES_DISTINCT_COUNT_CREATED_AT_DESC',
  VotesDistinctCountPostIdAsc = 'VOTES_DISTINCT_COUNT_POST_ID_ASC',
  VotesDistinctCountPostIdDesc = 'VOTES_DISTINCT_COUNT_POST_ID_DESC',
  VotesDistinctCountRowIdAsc = 'VOTES_DISTINCT_COUNT_ROW_ID_ASC',
  VotesDistinctCountRowIdDesc = 'VOTES_DISTINCT_COUNT_ROW_ID_DESC',
  VotesDistinctCountUpdatedAtAsc = 'VOTES_DISTINCT_COUNT_UPDATED_AT_ASC',
  VotesDistinctCountUpdatedAtDesc = 'VOTES_DISTINCT_COUNT_UPDATED_AT_DESC',
  VotesDistinctCountUserIdAsc = 'VOTES_DISTINCT_COUNT_USER_ID_ASC',
  VotesDistinctCountUserIdDesc = 'VOTES_DISTINCT_COUNT_USER_ID_DESC',
  VotesDistinctCountVoteTypeAsc = 'VOTES_DISTINCT_COUNT_VOTE_TYPE_ASC',
  VotesDistinctCountVoteTypeDesc = 'VOTES_DISTINCT_COUNT_VOTE_TYPE_DESC'
}

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  identityProviderId?: InputMaybe<Scalars['UUID']['input']>;
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

/** A filter to be used against many `Vote` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyVoteFilter = {
  /** Aggregates across related `Vote` match the filter criteria. */
  aggregates?: InputMaybe<VoteAggregatesFilter>;
  /** Every related `Vote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<VoteFilter>;
  /** No related `Vote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<VoteFilter>;
  /** Some related `Vote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<VoteFilter>;
};

export type Vote = {
  __typename?: 'Vote';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Post` that is related to this `Vote`. */
  post?: Maybe<Post>;
  postId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `User` that is related to this `Vote`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
  voteType: VoteType;
};

export type VoteAggregates = {
  __typename?: 'VoteAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<VoteDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Vote` object types. */
export type VoteAggregatesFilter = {
  /** Distinct count aggregate over matching `Vote` objects. */
  distinctCount?: InputMaybe<VoteDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Vote` object to be included within the aggregate. */
  filter?: InputMaybe<VoteFilter>;
};

/** A condition to be used against `Vote` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type VoteCondition = {
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
  /** Checks for equality with the object’s `voteType` field. */
  voteType?: InputMaybe<VoteType>;
};

/** A connection to a list of `Vote` values. */
export type VoteConnection = {
  __typename?: 'VoteConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<VoteAggregates>;
  /** A list of edges which contains the `Vote` and cursor to aid in pagination. */
  edges: Array<Maybe<VoteEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<VoteAggregates>>;
  /** A list of `Vote` objects. */
  nodes: Array<Maybe<Vote>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Vote` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Vote` values. */
export type VoteConnectionGroupedAggregatesArgs = {
  groupBy: Array<VoteGroupBy>;
  having?: InputMaybe<VoteHavingInput>;
};

export type VoteDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
  voteType?: InputMaybe<BigIntFilter>;
};

export type VoteDistinctCountAggregates = {
  __typename?: 'VoteDistinctCountAggregates';
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
  /** Distinct count of voteType across the matching connection */
  voteType?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Vote` edge in the connection. */
export type VoteEdge = {
  __typename?: 'VoteEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Vote` at the end of the edge. */
  node?: Maybe<Vote>;
};

/** A filter to be used against `Vote` object types. All fields are combined with a logical ‘and.’ */
export type VoteFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<VoteFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<VoteFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VoteFilter>>;
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
  /** Filter by the object’s `voteType` field. */
  voteType?: InputMaybe<VoteTypeFilter>;
};

/** Grouping methods for `Vote` for usage during aggregation. */
export enum VoteGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  PostId = 'POST_ID',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  UserId = 'USER_ID',
  VoteType = 'VOTE_TYPE'
}

export type VoteHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type VoteHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Vote` aggregates. */
export type VoteHavingInput = {
  AND?: InputMaybe<Array<VoteHavingInput>>;
  OR?: InputMaybe<Array<VoteHavingInput>>;
  average?: InputMaybe<VoteHavingAverageInput>;
  distinctCount?: InputMaybe<VoteHavingDistinctCountInput>;
  max?: InputMaybe<VoteHavingMaxInput>;
  min?: InputMaybe<VoteHavingMinInput>;
  stddevPopulation?: InputMaybe<VoteHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<VoteHavingStddevSampleInput>;
  sum?: InputMaybe<VoteHavingSumInput>;
  variancePopulation?: InputMaybe<VoteHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<VoteHavingVarianceSampleInput>;
};

export type VoteHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type VoteHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type VoteHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type VoteHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type VoteHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type VoteHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type VoteHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Vote` */
export type VoteInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  postId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
  voteType: VoteType;
};

/** Methods to use when ordering `Vote`. */
export enum VoteOrderBy {
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

/** Represents an update to a `Vote`. Fields that are set will be updated. */
export type VotePatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  postId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  voteType?: InputMaybe<VoteType>;
};

export enum VoteType {
  Down = 'down',
  Up = 'up'
}

/** A filter to be used against VoteType fields. All fields are combined with a logical ‘and.’ */
export type VoteTypeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<VoteType>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<VoteType>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<VoteType>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<VoteType>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<VoteType>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<VoteType>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<VoteType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<VoteType>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<VoteType>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<VoteType>>;
};

export type Workspace = {
  __typename?: 'Workspace';
  billingAccountId?: Maybe<Scalars['String']['output']>;
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
  /** Reads and enables pagination through a set of `StatusTemplate`. */
  statusTemplates: StatusTemplateConnection;
  subscriptionId?: Maybe<Scalars['String']['output']>;
  tier: Tier;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type WorkspaceInvitationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvitationCondition>;
  filter?: InputMaybe<InvitationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvitationOrderBy>>;
};


export type WorkspaceMembersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MemberCondition>;
  filter?: InputMaybe<MemberFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MemberOrderBy>>;
};


export type WorkspaceProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectOrderBy>>;
};


export type WorkspaceStatusTemplatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<StatusTemplateCondition>;
  filter?: InputMaybe<StatusTemplateFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StatusTemplateOrderBy>>;
};

export type WorkspaceAggregates = {
  __typename?: 'WorkspaceAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<WorkspaceDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/**
 * A condition to be used against `Workspace` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type WorkspaceCondition = {
  /** Checks for equality with the object’s `billingAccountId` field. */
  billingAccountId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `subscriptionId` field. */
  subscriptionId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tier` field. */
  tier?: InputMaybe<Tier>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `Workspace` values. */
export type WorkspaceConnection = {
  __typename?: 'WorkspaceConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<WorkspaceAggregates>;
  /** A list of edges which contains the `Workspace` and cursor to aid in pagination. */
  edges: Array<Maybe<WorkspaceEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<WorkspaceAggregates>>;
  /** A list of `Workspace` objects. */
  nodes: Array<Maybe<Workspace>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Workspace` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Workspace` values. */
export type WorkspaceConnectionGroupedAggregatesArgs = {
  groupBy: Array<WorkspaceGroupBy>;
  having?: InputMaybe<WorkspaceHavingInput>;
};

export type WorkspaceDistinctCountAggregates = {
  __typename?: 'WorkspaceDistinctCountAggregates';
  /** Distinct count of billingAccountId across the matching connection */
  billingAccountId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of slug across the matching connection */
  slug?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of subscriptionId across the matching connection */
  subscriptionId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tier across the matching connection */
  tier?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Workspace` edge in the connection. */
export type WorkspaceEdge = {
  __typename?: 'WorkspaceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Workspace` at the end of the edge. */
  node?: Maybe<Workspace>;
};

/** A filter to be used against `Workspace` object types. All fields are combined with a logical ‘and.’ */
export type WorkspaceFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WorkspaceFilter>>;
  /** Filter by the object’s `billingAccountId` field. */
  billingAccountId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `invitations` relation. */
  invitations?: InputMaybe<WorkspaceToManyInvitationFilter>;
  /** Some related `invitations` exist. */
  invitationsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `members` relation. */
  members?: InputMaybe<WorkspaceToManyMemberFilter>;
  /** Some related `members` exist. */
  membersExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<WorkspaceFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<WorkspaceFilter>>;
  /** Filter by the object’s `projects` relation. */
  projects?: InputMaybe<WorkspaceToManyProjectFilter>;
  /** Some related `projects` exist. */
  projectsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `statusTemplates` relation. */
  statusTemplates?: InputMaybe<WorkspaceToManyStatusTemplateFilter>;
  /** Some related `statusTemplates` exist. */
  statusTemplatesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `subscriptionId` field. */
  subscriptionId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tier` field. */
  tier?: InputMaybe<TierFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `Workspace` for usage during aggregation. */
export enum WorkspaceGroupBy {
  BillingAccountId = 'BILLING_ACCOUNT_ID',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  SubscriptionId = 'SUBSCRIPTION_ID',
  Tier = 'TIER',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type WorkspaceHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Workspace` aggregates. */
export type WorkspaceHavingInput = {
  AND?: InputMaybe<Array<WorkspaceHavingInput>>;
  OR?: InputMaybe<Array<WorkspaceHavingInput>>;
  average?: InputMaybe<WorkspaceHavingAverageInput>;
  distinctCount?: InputMaybe<WorkspaceHavingDistinctCountInput>;
  max?: InputMaybe<WorkspaceHavingMaxInput>;
  min?: InputMaybe<WorkspaceHavingMinInput>;
  stddevPopulation?: InputMaybe<WorkspaceHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<WorkspaceHavingStddevSampleInput>;
  sum?: InputMaybe<WorkspaceHavingSumInput>;
  variancePopulation?: InputMaybe<WorkspaceHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<WorkspaceHavingVarianceSampleInput>;
};

export type WorkspaceHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Workspace` */
export type WorkspaceInput = {
  billingAccountId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Workspace`. */
export enum WorkspaceOrderBy {
  BillingAccountIdAsc = 'BILLING_ACCOUNT_ID_ASC',
  BillingAccountIdDesc = 'BILLING_ACCOUNT_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  InvitationsCountAsc = 'INVITATIONS_COUNT_ASC',
  InvitationsCountDesc = 'INVITATIONS_COUNT_DESC',
  InvitationsDistinctCountCreatedAtAsc = 'INVITATIONS_DISTINCT_COUNT_CREATED_AT_ASC',
  InvitationsDistinctCountCreatedAtDesc = 'INVITATIONS_DISTINCT_COUNT_CREATED_AT_DESC',
  InvitationsDistinctCountEmailAsc = 'INVITATIONS_DISTINCT_COUNT_EMAIL_ASC',
  InvitationsDistinctCountEmailDesc = 'INVITATIONS_DISTINCT_COUNT_EMAIL_DESC',
  InvitationsDistinctCountRowIdAsc = 'INVITATIONS_DISTINCT_COUNT_ROW_ID_ASC',
  InvitationsDistinctCountRowIdDesc = 'INVITATIONS_DISTINCT_COUNT_ROW_ID_DESC',
  InvitationsDistinctCountUpdatedAtAsc = 'INVITATIONS_DISTINCT_COUNT_UPDATED_AT_ASC',
  InvitationsDistinctCountUpdatedAtDesc = 'INVITATIONS_DISTINCT_COUNT_UPDATED_AT_DESC',
  InvitationsDistinctCountWorkspaceIdAsc = 'INVITATIONS_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  InvitationsDistinctCountWorkspaceIdDesc = 'INVITATIONS_DISTINCT_COUNT_WORKSPACE_ID_DESC',
  MembersCountAsc = 'MEMBERS_COUNT_ASC',
  MembersCountDesc = 'MEMBERS_COUNT_DESC',
  MembersDistinctCountCreatedAtAsc = 'MEMBERS_DISTINCT_COUNT_CREATED_AT_ASC',
  MembersDistinctCountCreatedAtDesc = 'MEMBERS_DISTINCT_COUNT_CREATED_AT_DESC',
  MembersDistinctCountRoleAsc = 'MEMBERS_DISTINCT_COUNT_ROLE_ASC',
  MembersDistinctCountRoleDesc = 'MEMBERS_DISTINCT_COUNT_ROLE_DESC',
  MembersDistinctCountRowIdAsc = 'MEMBERS_DISTINCT_COUNT_ROW_ID_ASC',
  MembersDistinctCountRowIdDesc = 'MEMBERS_DISTINCT_COUNT_ROW_ID_DESC',
  MembersDistinctCountUserIdAsc = 'MEMBERS_DISTINCT_COUNT_USER_ID_ASC',
  MembersDistinctCountUserIdDesc = 'MEMBERS_DISTINCT_COUNT_USER_ID_DESC',
  MembersDistinctCountWorkspaceIdAsc = 'MEMBERS_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  MembersDistinctCountWorkspaceIdDesc = 'MEMBERS_DISTINCT_COUNT_WORKSPACE_ID_DESC',
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
  ProjectsDistinctCountRowIdAsc = 'PROJECTS_DISTINCT_COUNT_ROW_ID_ASC',
  ProjectsDistinctCountRowIdDesc = 'PROJECTS_DISTINCT_COUNT_ROW_ID_DESC',
  ProjectsDistinctCountSlugAsc = 'PROJECTS_DISTINCT_COUNT_SLUG_ASC',
  ProjectsDistinctCountSlugDesc = 'PROJECTS_DISTINCT_COUNT_SLUG_DESC',
  ProjectsDistinctCountUpdatedAtAsc = 'PROJECTS_DISTINCT_COUNT_UPDATED_AT_ASC',
  ProjectsDistinctCountUpdatedAtDesc = 'PROJECTS_DISTINCT_COUNT_UPDATED_AT_DESC',
  ProjectsDistinctCountWebsiteAsc = 'PROJECTS_DISTINCT_COUNT_WEBSITE_ASC',
  ProjectsDistinctCountWebsiteDesc = 'PROJECTS_DISTINCT_COUNT_WEBSITE_DESC',
  ProjectsDistinctCountWorkspaceIdAsc = 'PROJECTS_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  ProjectsDistinctCountWorkspaceIdDesc = 'PROJECTS_DISTINCT_COUNT_WORKSPACE_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  StatusTemplatesAverageSortOrderAsc = 'STATUS_TEMPLATES_AVERAGE_SORT_ORDER_ASC',
  StatusTemplatesAverageSortOrderDesc = 'STATUS_TEMPLATES_AVERAGE_SORT_ORDER_DESC',
  StatusTemplatesCountAsc = 'STATUS_TEMPLATES_COUNT_ASC',
  StatusTemplatesCountDesc = 'STATUS_TEMPLATES_COUNT_DESC',
  StatusTemplatesDistinctCountColorAsc = 'STATUS_TEMPLATES_DISTINCT_COUNT_COLOR_ASC',
  StatusTemplatesDistinctCountColorDesc = 'STATUS_TEMPLATES_DISTINCT_COUNT_COLOR_DESC',
  StatusTemplatesDistinctCountCreatedAtAsc = 'STATUS_TEMPLATES_DISTINCT_COUNT_CREATED_AT_ASC',
  StatusTemplatesDistinctCountCreatedAtDesc = 'STATUS_TEMPLATES_DISTINCT_COUNT_CREATED_AT_DESC',
  StatusTemplatesDistinctCountDescriptionAsc = 'STATUS_TEMPLATES_DISTINCT_COUNT_DESCRIPTION_ASC',
  StatusTemplatesDistinctCountDescriptionDesc = 'STATUS_TEMPLATES_DISTINCT_COUNT_DESCRIPTION_DESC',
  StatusTemplatesDistinctCountDisplayNameAsc = 'STATUS_TEMPLATES_DISTINCT_COUNT_DISPLAY_NAME_ASC',
  StatusTemplatesDistinctCountDisplayNameDesc = 'STATUS_TEMPLATES_DISTINCT_COUNT_DISPLAY_NAME_DESC',
  StatusTemplatesDistinctCountNameAsc = 'STATUS_TEMPLATES_DISTINCT_COUNT_NAME_ASC',
  StatusTemplatesDistinctCountNameDesc = 'STATUS_TEMPLATES_DISTINCT_COUNT_NAME_DESC',
  StatusTemplatesDistinctCountRowIdAsc = 'STATUS_TEMPLATES_DISTINCT_COUNT_ROW_ID_ASC',
  StatusTemplatesDistinctCountRowIdDesc = 'STATUS_TEMPLATES_DISTINCT_COUNT_ROW_ID_DESC',
  StatusTemplatesDistinctCountSortOrderAsc = 'STATUS_TEMPLATES_DISTINCT_COUNT_SORT_ORDER_ASC',
  StatusTemplatesDistinctCountSortOrderDesc = 'STATUS_TEMPLATES_DISTINCT_COUNT_SORT_ORDER_DESC',
  StatusTemplatesDistinctCountUpdatedAtAsc = 'STATUS_TEMPLATES_DISTINCT_COUNT_UPDATED_AT_ASC',
  StatusTemplatesDistinctCountUpdatedAtDesc = 'STATUS_TEMPLATES_DISTINCT_COUNT_UPDATED_AT_DESC',
  StatusTemplatesDistinctCountWorkspaceIdAsc = 'STATUS_TEMPLATES_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  StatusTemplatesDistinctCountWorkspaceIdDesc = 'STATUS_TEMPLATES_DISTINCT_COUNT_WORKSPACE_ID_DESC',
  StatusTemplatesMaxSortOrderAsc = 'STATUS_TEMPLATES_MAX_SORT_ORDER_ASC',
  StatusTemplatesMaxSortOrderDesc = 'STATUS_TEMPLATES_MAX_SORT_ORDER_DESC',
  StatusTemplatesMinSortOrderAsc = 'STATUS_TEMPLATES_MIN_SORT_ORDER_ASC',
  StatusTemplatesMinSortOrderDesc = 'STATUS_TEMPLATES_MIN_SORT_ORDER_DESC',
  StatusTemplatesStddevPopulationSortOrderAsc = 'STATUS_TEMPLATES_STDDEV_POPULATION_SORT_ORDER_ASC',
  StatusTemplatesStddevPopulationSortOrderDesc = 'STATUS_TEMPLATES_STDDEV_POPULATION_SORT_ORDER_DESC',
  StatusTemplatesStddevSampleSortOrderAsc = 'STATUS_TEMPLATES_STDDEV_SAMPLE_SORT_ORDER_ASC',
  StatusTemplatesStddevSampleSortOrderDesc = 'STATUS_TEMPLATES_STDDEV_SAMPLE_SORT_ORDER_DESC',
  StatusTemplatesSumSortOrderAsc = 'STATUS_TEMPLATES_SUM_SORT_ORDER_ASC',
  StatusTemplatesSumSortOrderDesc = 'STATUS_TEMPLATES_SUM_SORT_ORDER_DESC',
  StatusTemplatesVariancePopulationSortOrderAsc = 'STATUS_TEMPLATES_VARIANCE_POPULATION_SORT_ORDER_ASC',
  StatusTemplatesVariancePopulationSortOrderDesc = 'STATUS_TEMPLATES_VARIANCE_POPULATION_SORT_ORDER_DESC',
  StatusTemplatesVarianceSampleSortOrderAsc = 'STATUS_TEMPLATES_VARIANCE_SAMPLE_SORT_ORDER_ASC',
  StatusTemplatesVarianceSampleSortOrderDesc = 'STATUS_TEMPLATES_VARIANCE_SAMPLE_SORT_ORDER_DESC',
  SubscriptionIdAsc = 'SUBSCRIPTION_ID_ASC',
  SubscriptionIdDesc = 'SUBSCRIPTION_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `Workspace`. Fields that are set will be updated. */
export type WorkspacePatch = {
  billingAccountId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against many `Invitation` object types. All fields are combined with a logical ‘and.’ */
export type WorkspaceToManyInvitationFilter = {
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
export type WorkspaceToManyMemberFilter = {
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
export type WorkspaceToManyProjectFilter = {
  /** Aggregates across related `Project` match the filter criteria. */
  aggregates?: InputMaybe<ProjectAggregatesFilter>;
  /** Every related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ProjectFilter>;
  /** No related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ProjectFilter>;
  /** Some related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ProjectFilter>;
};

/** A filter to be used against many `StatusTemplate` object types. All fields are combined with a logical ‘and.’ */
export type WorkspaceToManyStatusTemplateFilter = {
  /** Aggregates across related `StatusTemplate` match the filter criteria. */
  aggregates?: InputMaybe<StatusTemplateAggregatesFilter>;
  /** Every related `StatusTemplate` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<StatusTemplateFilter>;
  /** No related `StatusTemplate` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<StatusTemplateFilter>;
  /** Some related `StatusTemplate` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<StatusTemplateFilter>;
};

export type CommentFragment = { __typename?: 'Comment', rowId: string, message?: string | null, createdAt?: Date | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, childComments: { __typename?: 'CommentConnection', totalCount: number } };

export type FeedbackFragment = { __typename?: 'Post', rowId: string, title?: string | null, description?: string | null, statusUpdatedAt?: Date | null, createdAt?: Date | null, updatedAt?: Date | null, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, workspace?: { __typename?: 'Workspace', rowId: string, name: string, slug: string } | null } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'VoteConnection', totalCount: number }, userUpvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, downvotes: { __typename?: 'VoteConnection', totalCount: number }, userDownvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> } };

export type InvitationFragment = { __typename?: 'Invitation', rowId: string, email: string, workspaceId: string, createdAt?: Date | null, updatedAt?: Date | null, workspace?: { __typename?: 'Workspace', name: string } | null };

export type MemberFragment = { __typename?: 'Member', rowId: string, workspaceId: string, userId: string, role: Role, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, username?: string | null } | null };

export type ProjectFragment = { __typename?: 'Project', rowId: string, name: string, description?: string | null, slug: string, website?: string | null, workspace?: { __typename?: 'Workspace', rowId: string, name: string, slug: string, tier: Tier } | null, projectSocials: { __typename?: 'ProjectSocialConnection', nodes: Array<{ __typename?: 'ProjectSocial', rowId: string, projectId: string, url: string } | null> }, posts: { __typename?: 'PostConnection', aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null }, userPosts: { __typename?: 'PostConnection', nodes: Array<{ __typename?: 'Post', rowId: string } | null> } };

export type ReplyFragment = { __typename?: 'Comment', rowId: string, parentId?: string | null, message?: string | null, createdAt?: Date | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null };

export type UserFragment = { __typename?: 'User', rowId: string, identityProviderId: string, username?: string | null, firstName?: string | null, lastName?: string | null, email: string };

export type WorkspaceFragment = { __typename?: 'Workspace', rowId: string, name: string, slug: string, tier: Tier, subscriptionId?: string | null, members: { __typename?: 'MemberConnection', totalCount: number } };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'CreateCommentPayload', clientMutationId?: string | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'DeleteCommentPayload', clientMutationId?: string | null } | null };

export type CreateInvitationMutationVariables = Exact<{
  input: CreateInvitationInput;
}>;


export type CreateInvitationMutation = { __typename?: 'Mutation', createInvitation?: { __typename?: 'CreateInvitationPayload', invitation?: { __typename?: 'Invitation', email: string, workspaceId: string } | null } | null };

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


export type RemoveMemberMutation = { __typename?: 'Mutation', deleteMember?: { __typename?: 'DeleteMemberPayload', member?: { __typename?: 'Member', userId: string, workspaceId: string } | null } | null };

export type UpdateMemberMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: MemberPatch;
}>;


export type UpdateMemberMutation = { __typename?: 'Mutation', updateMember?: { __typename?: 'UpdateMemberPayload', clientMutationId?: string | null } | null };

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

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'CreateProjectPayload', project?: { __typename?: 'Project', rowId: string, slug: string, workspace?: { __typename?: 'Workspace', slug: string } | null } | null } | null };

export type DeleteProjectMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: { __typename?: 'DeleteProjectPayload', project?: { __typename?: 'Project', rowId: string } | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: ProjectPatch;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'UpdateProjectPayload', project?: { __typename?: 'Project', slug: string } | null } | null };

export type CreateProjectSocialMutationVariables = Exact<{
  input: CreateProjectSocialInput;
}>;


export type CreateProjectSocialMutation = { __typename?: 'Mutation', createProjectSocial?: { __typename?: 'CreateProjectSocialPayload', clientMutationId?: string | null } | null };

export type DeleteProjectSocialMutationVariables = Exact<{
  socialId: Scalars['UUID']['input'];
}>;


export type DeleteProjectSocialMutation = { __typename?: 'Mutation', deleteProjectSocial?: { __typename?: 'DeleteProjectSocialPayload', clientMutationId?: string | null } | null };

export type CreateProjectStatusConfigMutationVariables = Exact<{
  input: CreateProjectStatusConfigInput;
}>;


export type CreateProjectStatusConfigMutation = { __typename?: 'Mutation', createProjectStatusConfig?: { __typename?: 'CreateProjectStatusConfigPayload', clientMutationId?: string | null, projectStatusConfig?: { __typename?: 'ProjectStatusConfig', rowId: string, projectId: string, statusTemplateId: string, customColor?: string | null, customDescription?: string | null, isEnabled?: boolean | null, isDefault?: boolean | null, sortOrder?: number | null } | null } | null };

export type DeleteProjectStatusConfigMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteProjectStatusConfigMutation = { __typename?: 'Mutation', deleteProjectStatusConfig?: { __typename?: 'DeleteProjectStatusConfigPayload', clientMutationId?: string | null } | null };

export type UpdateProjectStatusConfigMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: ProjectStatusConfigPatch;
}>;


export type UpdateProjectStatusConfigMutation = { __typename?: 'Mutation', updateProjectStatusConfig?: { __typename?: 'UpdateProjectStatusConfigPayload', clientMutationId?: string | null, projectStatusConfig?: { __typename?: 'ProjectStatusConfig', rowId: string, projectId: string, statusTemplateId: string, customColor?: string | null, customDescription?: string | null, isEnabled?: boolean | null, isDefault?: boolean | null, sortOrder?: number | null } | null } | null };

export type CreateStatusTemplateMutationVariables = Exact<{
  input: CreateStatusTemplateInput;
}>;


export type CreateStatusTemplateMutation = { __typename?: 'Mutation', createStatusTemplate?: { __typename?: 'CreateStatusTemplatePayload', clientMutationId?: string | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, color?: string | null, description?: string | null, sortOrder?: number | null } | null } | null };

export type DeleteStatusTemplateMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteStatusTemplateMutation = { __typename?: 'Mutation', deleteStatusTemplate?: { __typename?: 'DeleteStatusTemplatePayload', clientMutationId?: string | null } | null };

export type UpdateStatusTemplateMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: StatusTemplatePatch;
}>;


export type UpdateStatusTemplateMutation = { __typename?: 'Mutation', updateStatusTemplate?: { __typename?: 'UpdateStatusTemplatePayload', clientMutationId?: string | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, color?: string | null, description?: string | null, sortOrder?: number | null } | null } | null };

export type CreateUserMutationVariables = Exact<{
  identityProviderId: Scalars['UUID']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreateUserPayload', user?: { __typename?: 'User', rowId: string } | null } | null };

export type CreateVoteMutationVariables = Exact<{
  input: CreateVoteInput;
}>;


export type CreateVoteMutation = { __typename?: 'Mutation', createVote?: { __typename?: 'CreateVotePayload', clientMutationId?: string | null, vote?: { __typename?: 'Vote', rowId: string, voteType: VoteType } | null } | null };

export type DeleteVoteMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteVoteMutation = { __typename?: 'Mutation', deleteVote?: { __typename?: 'DeleteVotePayload', clientMutationId?: string | null } | null };

export type UpdateVoteMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: VotePatch;
}>;


export type UpdateVoteMutation = { __typename?: 'Mutation', updateVote?: { __typename?: 'UpdateVotePayload', clientMutationId?: string | null, vote?: { __typename?: 'Vote', rowId: string, voteType: VoteType } | null } | null };

export type CreateWorkspaceMutationVariables = Exact<{
  input: CreateWorkspaceInput;
}>;


export type CreateWorkspaceMutation = { __typename?: 'Mutation', createWorkspace?: { __typename?: 'CreateWorkspacePayload', workspace?: { __typename?: 'Workspace', rowId: string, slug: string } | null } | null };

export type DeleteWorkspaceMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteWorkspaceMutation = { __typename?: 'Mutation', deleteWorkspace?: { __typename?: 'DeleteWorkspacePayload', workspace?: { __typename?: 'Workspace', rowId: string } | null } | null };

export type LeaveWorkspaceMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type LeaveWorkspaceMutation = { __typename?: 'Mutation', deleteMember?: { __typename?: 'DeleteMemberPayload', member?: { __typename?: 'Member', userId: string, workspaceId: string } | null } | null };

export type UpdateWorkspaceMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: WorkspacePatch;
}>;


export type UpdateWorkspaceMutation = { __typename?: 'Mutation', updateWorkspace?: { __typename?: 'UpdateWorkspacePayload', workspace?: { __typename?: 'Workspace', slug: string } | null } | null };

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


export type FeedbackByIdQuery = { __typename?: 'Query', post?: { __typename?: 'Post', rowId: string, title?: string | null, description?: string | null, statusUpdatedAt?: Date | null, createdAt?: Date | null, updatedAt?: Date | null, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, workspace?: { __typename?: 'Workspace', rowId: string, name: string, slug: string } | null } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'VoteConnection', totalCount: number }, userUpvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, downvotes: { __typename?: 'VoteConnection', totalCount: number }, userDownvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> } } | null };

export type InvitationsQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type InvitationsQuery = { __typename?: 'Query', invitations?: { __typename?: 'InvitationConnection', totalCount: number, nodes: Array<{ __typename?: 'Invitation', rowId: string, email: string, workspaceId: string, createdAt?: Date | null, updatedAt?: Date | null, workspace?: { __typename?: 'Workspace', name: string } | null } | null> } | null };

export type MembersQueryVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
  roles?: InputMaybe<Array<Role> | Role>;
  search?: InputMaybe<Scalars['String']['input']>;
  excludeRoles?: InputMaybe<Array<Role> | Role>;
}>;


export type MembersQuery = { __typename?: 'Query', members?: { __typename?: 'MemberConnection', totalCount: number, nodes: Array<{ __typename?: 'Member', rowId: string, workspaceId: string, userId: string, role: Role, user?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, username?: string | null } | null } | null> } | null };

export type NotificationsQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type NotificationsQuery = { __typename?: 'Query', invitations?: { __typename?: 'InvitationConnection', totalCount: number, nodes: Array<{ __typename?: 'Invitation', rowId: string, email: string, workspaceId: string, workspace?: { __typename?: 'Workspace', name: string } | null } | null> } | null };

export type PostsQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
  after?: InputMaybe<Scalars['Cursor']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  excludedStatuses?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean }, nodes: Array<{ __typename?: 'Post', rowId: string, title?: string | null, description?: string | null, statusUpdatedAt?: Date | null, createdAt?: Date | null, updatedAt?: Date | null, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, workspace?: { __typename?: 'Workspace', rowId: string, name: string, slug: string } | null } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'VoteConnection', totalCount: number }, userUpvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, downvotes: { __typename?: 'VoteConnection', totalCount: number }, userDownvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> } } | null> } | null };

export type ProjectQueryVariables = Exact<{
  projectSlug: Scalars['String']['input'];
  workspaceSlug: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type ProjectQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', nodes: Array<{ __typename?: 'Project', rowId: string, name: string, description?: string | null, slug: string, website?: string | null, workspace?: { __typename?: 'Workspace', rowId: string, name: string, slug: string, tier: Tier } | null, projectSocials: { __typename?: 'ProjectSocialConnection', nodes: Array<{ __typename?: 'ProjectSocial', rowId: string, projectId: string, url: string } | null> }, posts: { __typename?: 'PostConnection', aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null }, userPosts: { __typename?: 'PostConnection', nodes: Array<{ __typename?: 'Post', rowId: string } | null> } } | null> } | null };

export type ProjectBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  workspaceId: Scalars['UUID']['input'];
}>;


export type ProjectBySlugQuery = { __typename?: 'Query', projectBySlugAndWorkspaceId?: { __typename?: 'Project', rowId: string, name: string } | null };

export type ProjectMetricsQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
}>;


export type ProjectMetricsQuery = { __typename?: 'Query', project?: { __typename?: 'Project', createdAt?: Date | null, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null, upvotes?: { __typename?: 'VoteConnection', totalCount: number } | null, downvotes?: { __typename?: 'VoteConnection', totalCount: number } | null };

export type ProjectStatusesQueryVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ProjectStatusesQuery = { __typename?: 'Query', statusTemplates?: { __typename?: 'StatusTemplateConnection', nodes: Array<{ __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null, sortOrder?: number | null } | null> } | null, projectStatusConfigs?: { __typename?: 'ProjectStatusConfigConnection', nodes: Array<{ __typename?: 'ProjectStatusConfig', rowId: string, projectId: string, statusTemplateId: string, customColor?: string | null, customDescription?: string | null, isEnabled?: boolean | null, isDefault?: boolean | null, sortOrder?: number | null } | null> } | null };

export type ProjectsQueryVariables = Exact<{
  pageSize: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  workspaceSlug: Scalars['String']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', totalCount: number, nodes: Array<{ __typename?: 'Project', rowId: string, name: string, description?: string | null, slug: string, workspace?: { __typename?: 'Workspace', rowId: string, slug: string } | null, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null> } | null };

export type RecentFeedbackQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  after?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type RecentFeedbackQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'PostEdge', node?: { __typename?: 'Post', rowId: string, createdAt?: Date | null, title?: string | null, description?: string | null, project?: { __typename?: 'Project', name: string, slug: string, workspace?: { __typename?: 'Workspace', slug: string } | null } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, displayName: string, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null } | null } | null> } | null };

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
  identityProviderId: Scalars['UUID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', userByIdentityProviderId?: { __typename?: 'User', rowId: string, identityProviderId: string, username?: string | null, firstName?: string | null, lastName?: string | null, email: string } | null };

export type UserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserByEmailQuery = { __typename?: 'Query', userByEmail?: { __typename?: 'User', rowId: string, identityProviderId: string, username?: string | null, firstName?: string | null, lastName?: string | null, email: string } | null };

export type WeeklyFeedbackQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  startDate: Scalars['Datetime']['input'];
}>;


export type WeeklyFeedbackQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', groupedAggregates?: Array<{ __typename?: 'PostAggregates', keys?: Array<string | null> | null, distinctCount?: { __typename?: 'PostDistinctCountAggregates', rowId?: string | null } | null }> | null } | null };

export type WorkspaceQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type WorkspaceQuery = { __typename?: 'Query', workspaceBySlug?: { __typename?: 'Workspace', updatedAt?: Date | null, rowId: string, name: string, slug: string, tier: Tier, subscriptionId?: string | null, projects: { __typename?: 'ProjectConnection', totalCount: number, nodes: Array<{ __typename?: 'Project', rowId: string, name: string, description?: string | null, slug: string, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null> }, members: { __typename?: 'MemberConnection', totalCount: number } } | null };

export type WorkspaceMetricsQueryVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
}>;


export type WorkspaceMetricsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', totalCount: number } | null, posts?: { __typename?: 'PostConnection', totalCount: number } | null, members?: { __typename?: 'MemberConnection', totalCount: number } | null };

export type WorkspaceRoleQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  workspaceId: Scalars['UUID']['input'];
}>;


export type WorkspaceRoleQuery = { __typename?: 'Query', memberByUserIdAndWorkspaceId?: { __typename?: 'Member', rowId: string, role: Role } | null };

export type WorkspacesQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkspaceOrderBy> | WorkspaceOrderBy>;
  isMember?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  excludeRoles?: InputMaybe<Array<Role> | Role>;
  search?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type WorkspacesQuery = { __typename?: 'Query', workspaces?: { __typename?: 'WorkspaceConnection', totalCount: number, nodes: Array<{ __typename?: 'Workspace', updatedAt?: Date | null, rowId: string, name: string, slug: string, tier: Tier, subscriptionId?: string | null, projects: { __typename?: 'ProjectConnection', totalCount: number }, members: { __typename?: 'MemberConnection', totalCount: number } } | null> } | null };


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
    workspace {
      rowId
      name
      slug
    }
  }
  statusTemplate {
    rowId
    name
    displayName
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
  upvotes: votes(condition: {voteType: up}) {
    totalCount
  }
  userUpvotes: votes(condition: {userId: $userId, voteType: up}) {
    nodes {
      rowId
    }
  }
  downvotes: votes(condition: {voteType: down}) {
    totalCount
  }
  userDownvotes: votes(condition: {userId: $userId, voteType: down}) {
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
  workspaceId
  workspace {
    name
  }
  createdAt
  updatedAt
}
    `;
export const MemberFragmentDoc = `
    fragment Member on Member {
  rowId
  workspaceId
  userId
  role
  user {
    firstName
    lastName
    username
  }
}
    `;
export const ProjectFragmentDoc = `
    fragment Project on Project {
  rowId
  name
  description
  slug
  website
  workspace {
    rowId
    name
    slug
    tier
  }
  projectSocials(orderBy: CREATED_AT_ASC) {
    nodes {
      rowId
      projectId
      url
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
  identityProviderId
  username
  firstName
  lastName
  email
}
    `;
export const WorkspaceFragmentDoc = `
    fragment Workspace on Workspace {
  rowId
  name
  slug
  tier
  subscriptionId
  members {
    totalCount
  }
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

export const CreateInvitationDocument = `
    mutation CreateInvitation($input: CreateInvitationInput!) {
  createInvitation(input: $input) {
    invitation {
      email
      workspaceId
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
      workspaceId
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

export const CreateProjectDocument = `
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    project {
      rowId
      slug
      workspace {
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

export const CreateProjectSocialDocument = `
    mutation CreateProjectSocial($input: CreateProjectSocialInput!) {
  createProjectSocial(input: $input) {
    clientMutationId
  }
}
    `;

export const useCreateProjectSocialMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateProjectSocialMutation, TError, CreateProjectSocialMutationVariables, TContext>) => {
    
    return useMutation<CreateProjectSocialMutation, TError, CreateProjectSocialMutationVariables, TContext>(
      {
    mutationKey: ['CreateProjectSocial'],
    mutationFn: (variables?: CreateProjectSocialMutationVariables) => graphqlFetch<CreateProjectSocialMutation, CreateProjectSocialMutationVariables>(CreateProjectSocialDocument, variables)(),
    ...options
  }
    )};

useCreateProjectSocialMutation.getKey = () => ['CreateProjectSocial'];


useCreateProjectSocialMutation.fetcher = (variables: CreateProjectSocialMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateProjectSocialMutation, CreateProjectSocialMutationVariables>(CreateProjectSocialDocument, variables, options);

export const DeleteProjectSocialDocument = `
    mutation DeleteProjectSocial($socialId: UUID!) {
  deleteProjectSocial(input: {rowId: $socialId}) {
    clientMutationId
  }
}
    `;

export const useDeleteProjectSocialMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteProjectSocialMutation, TError, DeleteProjectSocialMutationVariables, TContext>) => {
    
    return useMutation<DeleteProjectSocialMutation, TError, DeleteProjectSocialMutationVariables, TContext>(
      {
    mutationKey: ['DeleteProjectSocial'],
    mutationFn: (variables?: DeleteProjectSocialMutationVariables) => graphqlFetch<DeleteProjectSocialMutation, DeleteProjectSocialMutationVariables>(DeleteProjectSocialDocument, variables)(),
    ...options
  }
    )};

useDeleteProjectSocialMutation.getKey = () => ['DeleteProjectSocial'];


useDeleteProjectSocialMutation.fetcher = (variables: DeleteProjectSocialMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteProjectSocialMutation, DeleteProjectSocialMutationVariables>(DeleteProjectSocialDocument, variables, options);

export const CreateProjectStatusConfigDocument = `
    mutation CreateProjectStatusConfig($input: CreateProjectStatusConfigInput!) {
  createProjectStatusConfig(input: $input) {
    clientMutationId
    projectStatusConfig {
      rowId
      projectId
      statusTemplateId
      customColor
      customDescription
      isEnabled
      isDefault
      sortOrder
    }
  }
}
    `;

export const useCreateProjectStatusConfigMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateProjectStatusConfigMutation, TError, CreateProjectStatusConfigMutationVariables, TContext>) => {
    
    return useMutation<CreateProjectStatusConfigMutation, TError, CreateProjectStatusConfigMutationVariables, TContext>(
      {
    mutationKey: ['CreateProjectStatusConfig'],
    mutationFn: (variables?: CreateProjectStatusConfigMutationVariables) => graphqlFetch<CreateProjectStatusConfigMutation, CreateProjectStatusConfigMutationVariables>(CreateProjectStatusConfigDocument, variables)(),
    ...options
  }
    )};

useCreateProjectStatusConfigMutation.getKey = () => ['CreateProjectStatusConfig'];


useCreateProjectStatusConfigMutation.fetcher = (variables: CreateProjectStatusConfigMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateProjectStatusConfigMutation, CreateProjectStatusConfigMutationVariables>(CreateProjectStatusConfigDocument, variables, options);

export const DeleteProjectStatusConfigDocument = `
    mutation DeleteProjectStatusConfig($rowId: UUID!) {
  deleteProjectStatusConfig(input: {rowId: $rowId}) {
    clientMutationId
  }
}
    `;

export const useDeleteProjectStatusConfigMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteProjectStatusConfigMutation, TError, DeleteProjectStatusConfigMutationVariables, TContext>) => {
    
    return useMutation<DeleteProjectStatusConfigMutation, TError, DeleteProjectStatusConfigMutationVariables, TContext>(
      {
    mutationKey: ['DeleteProjectStatusConfig'],
    mutationFn: (variables?: DeleteProjectStatusConfigMutationVariables) => graphqlFetch<DeleteProjectStatusConfigMutation, DeleteProjectStatusConfigMutationVariables>(DeleteProjectStatusConfigDocument, variables)(),
    ...options
  }
    )};

useDeleteProjectStatusConfigMutation.getKey = () => ['DeleteProjectStatusConfig'];


useDeleteProjectStatusConfigMutation.fetcher = (variables: DeleteProjectStatusConfigMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteProjectStatusConfigMutation, DeleteProjectStatusConfigMutationVariables>(DeleteProjectStatusConfigDocument, variables, options);

export const UpdateProjectStatusConfigDocument = `
    mutation UpdateProjectStatusConfig($rowId: UUID!, $patch: ProjectStatusConfigPatch!) {
  updateProjectStatusConfig(input: {rowId: $rowId, patch: $patch}) {
    clientMutationId
    projectStatusConfig {
      rowId
      projectId
      statusTemplateId
      customColor
      customDescription
      isEnabled
      isDefault
      sortOrder
    }
  }
}
    `;

export const useUpdateProjectStatusConfigMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateProjectStatusConfigMutation, TError, UpdateProjectStatusConfigMutationVariables, TContext>) => {
    
    return useMutation<UpdateProjectStatusConfigMutation, TError, UpdateProjectStatusConfigMutationVariables, TContext>(
      {
    mutationKey: ['UpdateProjectStatusConfig'],
    mutationFn: (variables?: UpdateProjectStatusConfigMutationVariables) => graphqlFetch<UpdateProjectStatusConfigMutation, UpdateProjectStatusConfigMutationVariables>(UpdateProjectStatusConfigDocument, variables)(),
    ...options
  }
    )};

useUpdateProjectStatusConfigMutation.getKey = () => ['UpdateProjectStatusConfig'];


useUpdateProjectStatusConfigMutation.fetcher = (variables: UpdateProjectStatusConfigMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateProjectStatusConfigMutation, UpdateProjectStatusConfigMutationVariables>(UpdateProjectStatusConfigDocument, variables, options);

export const CreateStatusTemplateDocument = `
    mutation CreateStatusTemplate($input: CreateStatusTemplateInput!) {
  createStatusTemplate(input: $input) {
    clientMutationId
    statusTemplate {
      rowId
      name
      displayName
      color
      description
      sortOrder
    }
  }
}
    `;

export const useCreateStatusTemplateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateStatusTemplateMutation, TError, CreateStatusTemplateMutationVariables, TContext>) => {
    
    return useMutation<CreateStatusTemplateMutation, TError, CreateStatusTemplateMutationVariables, TContext>(
      {
    mutationKey: ['CreateStatusTemplate'],
    mutationFn: (variables?: CreateStatusTemplateMutationVariables) => graphqlFetch<CreateStatusTemplateMutation, CreateStatusTemplateMutationVariables>(CreateStatusTemplateDocument, variables)(),
    ...options
  }
    )};

useCreateStatusTemplateMutation.getKey = () => ['CreateStatusTemplate'];


useCreateStatusTemplateMutation.fetcher = (variables: CreateStatusTemplateMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateStatusTemplateMutation, CreateStatusTemplateMutationVariables>(CreateStatusTemplateDocument, variables, options);

export const DeleteStatusTemplateDocument = `
    mutation DeleteStatusTemplate($rowId: UUID!) {
  deleteStatusTemplate(input: {rowId: $rowId}) {
    clientMutationId
  }
}
    `;

export const useDeleteStatusTemplateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteStatusTemplateMutation, TError, DeleteStatusTemplateMutationVariables, TContext>) => {
    
    return useMutation<DeleteStatusTemplateMutation, TError, DeleteStatusTemplateMutationVariables, TContext>(
      {
    mutationKey: ['DeleteStatusTemplate'],
    mutationFn: (variables?: DeleteStatusTemplateMutationVariables) => graphqlFetch<DeleteStatusTemplateMutation, DeleteStatusTemplateMutationVariables>(DeleteStatusTemplateDocument, variables)(),
    ...options
  }
    )};

useDeleteStatusTemplateMutation.getKey = () => ['DeleteStatusTemplate'];


useDeleteStatusTemplateMutation.fetcher = (variables: DeleteStatusTemplateMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteStatusTemplateMutation, DeleteStatusTemplateMutationVariables>(DeleteStatusTemplateDocument, variables, options);

export const UpdateStatusTemplateDocument = `
    mutation UpdateStatusTemplate($rowId: UUID!, $patch: StatusTemplatePatch!) {
  updateStatusTemplate(input: {rowId: $rowId, patch: $patch}) {
    clientMutationId
    statusTemplate {
      rowId
      name
      displayName
      color
      description
      sortOrder
    }
  }
}
    `;

export const useUpdateStatusTemplateMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateStatusTemplateMutation, TError, UpdateStatusTemplateMutationVariables, TContext>) => {
    
    return useMutation<UpdateStatusTemplateMutation, TError, UpdateStatusTemplateMutationVariables, TContext>(
      {
    mutationKey: ['UpdateStatusTemplate'],
    mutationFn: (variables?: UpdateStatusTemplateMutationVariables) => graphqlFetch<UpdateStatusTemplateMutation, UpdateStatusTemplateMutationVariables>(UpdateStatusTemplateDocument, variables)(),
    ...options
  }
    )};

useUpdateStatusTemplateMutation.getKey = () => ['UpdateStatusTemplate'];


useUpdateStatusTemplateMutation.fetcher = (variables: UpdateStatusTemplateMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateStatusTemplateMutation, UpdateStatusTemplateMutationVariables>(UpdateStatusTemplateDocument, variables, options);

export const CreateUserDocument = `
    mutation CreateUser($identityProviderId: UUID!, $username: String, $firstName: String, $lastName: String, $email: String!) {
  createUser(
    input: {user: {identityProviderId: $identityProviderId, username: $username, firstName: $firstName, lastName: $lastName, email: $email}}
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

export const CreateVoteDocument = `
    mutation CreateVote($input: CreateVoteInput!) {
  createVote(input: $input) {
    clientMutationId
    vote {
      rowId
      voteType
    }
  }
}
    `;

export const useCreateVoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateVoteMutation, TError, CreateVoteMutationVariables, TContext>) => {
    
    return useMutation<CreateVoteMutation, TError, CreateVoteMutationVariables, TContext>(
      {
    mutationKey: ['CreateVote'],
    mutationFn: (variables?: CreateVoteMutationVariables) => graphqlFetch<CreateVoteMutation, CreateVoteMutationVariables>(CreateVoteDocument, variables)(),
    ...options
  }
    )};

useCreateVoteMutation.getKey = () => ['CreateVote'];


useCreateVoteMutation.fetcher = (variables: CreateVoteMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateVoteMutation, CreateVoteMutationVariables>(CreateVoteDocument, variables, options);

export const DeleteVoteDocument = `
    mutation DeleteVote($rowId: UUID!) {
  deleteVote(input: {rowId: $rowId}) {
    clientMutationId
  }
}
    `;

export const useDeleteVoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteVoteMutation, TError, DeleteVoteMutationVariables, TContext>) => {
    
    return useMutation<DeleteVoteMutation, TError, DeleteVoteMutationVariables, TContext>(
      {
    mutationKey: ['DeleteVote'],
    mutationFn: (variables?: DeleteVoteMutationVariables) => graphqlFetch<DeleteVoteMutation, DeleteVoteMutationVariables>(DeleteVoteDocument, variables)(),
    ...options
  }
    )};

useDeleteVoteMutation.getKey = () => ['DeleteVote'];


useDeleteVoteMutation.fetcher = (variables: DeleteVoteMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteVoteMutation, DeleteVoteMutationVariables>(DeleteVoteDocument, variables, options);

export const UpdateVoteDocument = `
    mutation UpdateVote($rowId: UUID!, $patch: VotePatch!) {
  updateVote(input: {rowId: $rowId, patch: $patch}) {
    clientMutationId
    vote {
      rowId
      voteType
    }
  }
}
    `;

export const useUpdateVoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateVoteMutation, TError, UpdateVoteMutationVariables, TContext>) => {
    
    return useMutation<UpdateVoteMutation, TError, UpdateVoteMutationVariables, TContext>(
      {
    mutationKey: ['UpdateVote'],
    mutationFn: (variables?: UpdateVoteMutationVariables) => graphqlFetch<UpdateVoteMutation, UpdateVoteMutationVariables>(UpdateVoteDocument, variables)(),
    ...options
  }
    )};

useUpdateVoteMutation.getKey = () => ['UpdateVote'];


useUpdateVoteMutation.fetcher = (variables: UpdateVoteMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateVoteMutation, UpdateVoteMutationVariables>(UpdateVoteDocument, variables, options);

export const CreateWorkspaceDocument = `
    mutation CreateWorkspace($input: CreateWorkspaceInput!) {
  createWorkspace(input: $input) {
    workspace {
      rowId
      slug
    }
  }
}
    `;

export const useCreateWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateWorkspaceMutation, TError, CreateWorkspaceMutationVariables, TContext>) => {
    
    return useMutation<CreateWorkspaceMutation, TError, CreateWorkspaceMutationVariables, TContext>(
      {
    mutationKey: ['CreateWorkspace'],
    mutationFn: (variables?: CreateWorkspaceMutationVariables) => graphqlFetch<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(CreateWorkspaceDocument, variables)(),
    ...options
  }
    )};

useCreateWorkspaceMutation.getKey = () => ['CreateWorkspace'];


useCreateWorkspaceMutation.fetcher = (variables: CreateWorkspaceMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(CreateWorkspaceDocument, variables, options);

export const DeleteWorkspaceDocument = `
    mutation DeleteWorkspace($rowId: UUID!) {
  deleteWorkspace(input: {rowId: $rowId}) {
    workspace {
      rowId
    }
  }
}
    `;

export const useDeleteWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteWorkspaceMutation, TError, DeleteWorkspaceMutationVariables, TContext>) => {
    
    return useMutation<DeleteWorkspaceMutation, TError, DeleteWorkspaceMutationVariables, TContext>(
      {
    mutationKey: ['DeleteWorkspace'],
    mutationFn: (variables?: DeleteWorkspaceMutationVariables) => graphqlFetch<DeleteWorkspaceMutation, DeleteWorkspaceMutationVariables>(DeleteWorkspaceDocument, variables)(),
    ...options
  }
    )};

useDeleteWorkspaceMutation.getKey = () => ['DeleteWorkspace'];


useDeleteWorkspaceMutation.fetcher = (variables: DeleteWorkspaceMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteWorkspaceMutation, DeleteWorkspaceMutationVariables>(DeleteWorkspaceDocument, variables, options);

export const LeaveWorkspaceDocument = `
    mutation LeaveWorkspace($rowId: UUID!) {
  deleteMember(input: {rowId: $rowId}) {
    member {
      userId
      workspaceId
    }
  }
}
    `;

export const useLeaveWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LeaveWorkspaceMutation, TError, LeaveWorkspaceMutationVariables, TContext>) => {
    
    return useMutation<LeaveWorkspaceMutation, TError, LeaveWorkspaceMutationVariables, TContext>(
      {
    mutationKey: ['LeaveWorkspace'],
    mutationFn: (variables?: LeaveWorkspaceMutationVariables) => graphqlFetch<LeaveWorkspaceMutation, LeaveWorkspaceMutationVariables>(LeaveWorkspaceDocument, variables)(),
    ...options
  }
    )};

useLeaveWorkspaceMutation.getKey = () => ['LeaveWorkspace'];


useLeaveWorkspaceMutation.fetcher = (variables: LeaveWorkspaceMutationVariables, options?: RequestInit['headers']) => graphqlFetch<LeaveWorkspaceMutation, LeaveWorkspaceMutationVariables>(LeaveWorkspaceDocument, variables, options);

export const UpdateWorkspaceDocument = `
    mutation UpdateWorkspace($rowId: UUID!, $patch: WorkspacePatch!) {
  updateWorkspace(input: {rowId: $rowId, patch: $patch}) {
    workspace {
      slug
    }
  }
}
    `;

export const useUpdateWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateWorkspaceMutation, TError, UpdateWorkspaceMutationVariables, TContext>) => {
    
    return useMutation<UpdateWorkspaceMutation, TError, UpdateWorkspaceMutationVariables, TContext>(
      {
    mutationKey: ['UpdateWorkspace'],
    mutationFn: (variables?: UpdateWorkspaceMutationVariables) => graphqlFetch<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>(UpdateWorkspaceDocument, variables)(),
    ...options
  }
    )};

useUpdateWorkspaceMutation.getKey = () => ['UpdateWorkspace'];


useUpdateWorkspaceMutation.fetcher = (variables: UpdateWorkspaceMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>(UpdateWorkspaceDocument, variables, options);

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
    filter: {project: {workspace: {members: {some: {userId: {equalTo: $userId}}}}}}
  ) {
    totalCount
  }
  users(
    filter: {members: {some: {workspace: {members: {some: {userId: {equalTo: $userId}}}}}}}
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
    query Invitations($email: String, $workspaceId: UUID) {
  invitations(
    orderBy: CREATED_AT_DESC
    condition: {email: $email, workspaceId: $workspaceId}
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
    query Members($workspaceId: UUID!, $roles: [Role!], $search: String, $excludeRoles: [Role!]) {
  members(
    orderBy: ROLE_ASC
    condition: {workspaceId: $workspaceId}
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
      workspaceId
      workspace {
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

export const PostsDocument = `
    query Posts($projectId: UUID!, $after: Cursor, $pageSize: Int = 10, $orderBy: [PostOrderBy!] = CREATED_AT_DESC, $excludedStatuses: [String!], $search: String, $userId: UUID) {
  posts(
    after: $after
    first: $pageSize
    orderBy: $orderBy
    filter: {projectId: {equalTo: $projectId}, statusTemplate: {displayName: {notIn: $excludedStatuses}}, title: {includesInsensitive: $search}}
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
    query Project($projectSlug: String!, $workspaceSlug: String!, $userId: UUID) {
  projects(
    first: 1
    condition: {slug: $projectSlug}
    filter: {workspace: {slug: {equalTo: $workspaceSlug}}}
  ) {
    nodes {
      ...Project
    }
  }
}
    ${ProjectFragmentDoc}`;

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
    query ProjectBySlug($slug: String!, $workspaceId: UUID!) {
  projectBySlugAndWorkspaceId(slug: $slug, workspaceId: $workspaceId) {
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
  upvotes: votes(
    filter: {post: {projectId: {equalTo: $projectId}}, voteType: {equalTo: up}}
  ) {
    totalCount
  }
  downvotes: votes(
    filter: {post: {projectId: {equalTo: $projectId}}, voteType: {equalTo: down}}
  ) {
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
    query ProjectStatuses($workspaceId: UUID!, $isEnabled: Boolean) {
  statusTemplates(
    condition: {workspaceId: $workspaceId}
    orderBy: [SORT_ORDER_ASC, CREATED_AT_ASC]
  ) {
    nodes {
      rowId
      name
      displayName
      description
      color
      sortOrder
    }
  }
  projectStatusConfigs(condition: {isEnabled: $isEnabled}) {
    nodes {
      rowId
      projectId
      statusTemplateId
      customColor
      customDescription
      isEnabled
      isDefault
      sortOrder
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
    query Projects($pageSize: Int!, $offset: Int!, $workspaceSlug: String!, $search: String) {
  projects(
    orderBy: POSTS_COUNT_DESC
    first: $pageSize
    offset: $offset
    filter: {name: {includesInsensitive: $search}, workspace: {slug: {equalTo: $workspaceSlug}}}
  ) {
    totalCount
    nodes {
      rowId
      name
      description
      slug
      workspace {
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
    filter: {project: {workspace: {members: {some: {userId: {equalTo: $userId}}}}}}
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
          workspace {
            slug
          }
        }
        statusTemplate {
          rowId
          displayName
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
    groupedAggregates(groupBy: STATUS_TEMPLATE_ID) {
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
    query User($identityProviderId: UUID!) {
  userByIdentityProviderId(identityProviderId: $identityProviderId) {
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
    identityProviderId
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
    filter: {project: {workspace: {members: {some: {userId: {equalTo: $userId}}}}}, createdAt: {greaterThanOrEqualTo: $startDate}}
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

export const WorkspaceDocument = `
    query Workspace($slug: String!) {
  workspaceBySlug(slug: $slug) {
    ...Workspace
    updatedAt
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
    ${WorkspaceFragmentDoc}`;

export const useWorkspaceQuery = <
      TData = WorkspaceQuery,
      TError = unknown
    >(
      variables: WorkspaceQueryVariables,
      options?: Omit<UseQueryOptions<WorkspaceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkspaceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkspaceQuery, TError, TData>(
      {
    queryKey: ['Workspace', variables],
    queryFn: graphqlFetch<WorkspaceQuery, WorkspaceQueryVariables>(WorkspaceDocument, variables),
    ...options
  }
    )};

useWorkspaceQuery.getKey = (variables: WorkspaceQueryVariables) => ['Workspace', variables];

export const useInfiniteWorkspaceQuery = <
      TData = InfiniteData<WorkspaceQuery>,
      TError = unknown
    >(
      variables: WorkspaceQueryVariables,
      options: Omit<UseInfiniteQueryOptions<WorkspaceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<WorkspaceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<WorkspaceQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Workspace.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WorkspaceQuery, WorkspaceQueryVariables>(WorkspaceDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteWorkspaceQuery.getKey = (variables: WorkspaceQueryVariables) => ['Workspace.infinite', variables];


useWorkspaceQuery.fetcher = (variables: WorkspaceQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WorkspaceQuery, WorkspaceQueryVariables>(WorkspaceDocument, variables, options);

export const WorkspaceMetricsDocument = `
    query WorkspaceMetrics($workspaceId: UUID!) {
  projects(condition: {workspaceId: $workspaceId}) {
    totalCount
  }
  posts(filter: {project: {workspaceId: {equalTo: $workspaceId}}}) {
    totalCount
  }
  members(condition: {workspaceId: $workspaceId}) {
    totalCount
  }
}
    `;

export const useWorkspaceMetricsQuery = <
      TData = WorkspaceMetricsQuery,
      TError = unknown
    >(
      variables: WorkspaceMetricsQueryVariables,
      options?: Omit<UseQueryOptions<WorkspaceMetricsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkspaceMetricsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkspaceMetricsQuery, TError, TData>(
      {
    queryKey: ['WorkspaceMetrics', variables],
    queryFn: graphqlFetch<WorkspaceMetricsQuery, WorkspaceMetricsQueryVariables>(WorkspaceMetricsDocument, variables),
    ...options
  }
    )};

useWorkspaceMetricsQuery.getKey = (variables: WorkspaceMetricsQueryVariables) => ['WorkspaceMetrics', variables];

export const useInfiniteWorkspaceMetricsQuery = <
      TData = InfiniteData<WorkspaceMetricsQuery>,
      TError = unknown
    >(
      variables: WorkspaceMetricsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<WorkspaceMetricsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<WorkspaceMetricsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<WorkspaceMetricsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['WorkspaceMetrics.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WorkspaceMetricsQuery, WorkspaceMetricsQueryVariables>(WorkspaceMetricsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteWorkspaceMetricsQuery.getKey = (variables: WorkspaceMetricsQueryVariables) => ['WorkspaceMetrics.infinite', variables];


useWorkspaceMetricsQuery.fetcher = (variables: WorkspaceMetricsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WorkspaceMetricsQuery, WorkspaceMetricsQueryVariables>(WorkspaceMetricsDocument, variables, options);

export const WorkspaceRoleDocument = `
    query WorkspaceRole($userId: UUID!, $workspaceId: UUID!) {
  memberByUserIdAndWorkspaceId(userId: $userId, workspaceId: $workspaceId) {
    rowId
    role
  }
}
    `;

export const useWorkspaceRoleQuery = <
      TData = WorkspaceRoleQuery,
      TError = unknown
    >(
      variables: WorkspaceRoleQueryVariables,
      options?: Omit<UseQueryOptions<WorkspaceRoleQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkspaceRoleQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkspaceRoleQuery, TError, TData>(
      {
    queryKey: ['WorkspaceRole', variables],
    queryFn: graphqlFetch<WorkspaceRoleQuery, WorkspaceRoleQueryVariables>(WorkspaceRoleDocument, variables),
    ...options
  }
    )};

useWorkspaceRoleQuery.getKey = (variables: WorkspaceRoleQueryVariables) => ['WorkspaceRole', variables];

export const useInfiniteWorkspaceRoleQuery = <
      TData = InfiniteData<WorkspaceRoleQuery>,
      TError = unknown
    >(
      variables: WorkspaceRoleQueryVariables,
      options: Omit<UseInfiniteQueryOptions<WorkspaceRoleQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<WorkspaceRoleQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<WorkspaceRoleQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['WorkspaceRole.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WorkspaceRoleQuery, WorkspaceRoleQueryVariables>(WorkspaceRoleDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteWorkspaceRoleQuery.getKey = (variables: WorkspaceRoleQueryVariables) => ['WorkspaceRole.infinite', variables];


useWorkspaceRoleQuery.fetcher = (variables: WorkspaceRoleQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WorkspaceRoleQuery, WorkspaceRoleQueryVariables>(WorkspaceRoleDocument, variables, options);

export const WorkspacesDocument = `
    query Workspaces($pageSize: Int, $offset: Int, $orderBy: [WorkspaceOrderBy!], $isMember: Boolean, $userId: UUID, $excludeRoles: [Role!], $search: String, $slug: String, $workspaceId: UUID) {
  workspaces(
    first: $pageSize
    offset: $offset
    orderBy: $orderBy
    filter: {rowId: {equalTo: $workspaceId}, name: {includesInsensitive: $search}, slug: {equalTo: $slug}, or: [{membersExist: $isMember, members: {some: {userId: {equalTo: $userId}, role: {notIn: $excludeRoles}}}}, {rowId: {isNull: $isMember}}]}
  ) {
    totalCount
    nodes {
      ...Workspace
      updatedAt
      projects {
        totalCount
      }
    }
  }
}
    ${WorkspaceFragmentDoc}`;

export const useWorkspacesQuery = <
      TData = WorkspacesQuery,
      TError = unknown
    >(
      variables?: WorkspacesQueryVariables,
      options?: Omit<UseQueryOptions<WorkspacesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkspacesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkspacesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Workspaces'] : ['Workspaces', variables],
    queryFn: graphqlFetch<WorkspacesQuery, WorkspacesQueryVariables>(WorkspacesDocument, variables),
    ...options
  }
    )};

useWorkspacesQuery.getKey = (variables?: WorkspacesQueryVariables) => variables === undefined ? ['Workspaces'] : ['Workspaces', variables];

export const useInfiniteWorkspacesQuery = <
      TData = InfiniteData<WorkspacesQuery>,
      TError = unknown
    >(
      variables: WorkspacesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<WorkspacesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<WorkspacesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<WorkspacesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['Workspaces.infinite'] : ['Workspaces.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WorkspacesQuery, WorkspacesQueryVariables>(WorkspacesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteWorkspacesQuery.getKey = (variables?: WorkspacesQueryVariables) => variables === undefined ? ['Workspaces.infinite'] : ['Workspaces.infinite', variables];


useWorkspacesQuery.fetcher = (variables?: WorkspacesQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WorkspacesQuery, WorkspacesQueryVariables>(WorkspacesDocument, variables, options);
