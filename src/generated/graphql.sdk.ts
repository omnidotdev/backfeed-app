// @ts-nocheck
import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
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

export type Comment = Node & {
  __typename?: 'Comment';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Post` that is related to this `Comment`. */
  post?: Maybe<Post>;
  postId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `User` that is related to this `Comment`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
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
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `message` field. */
  message?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CommentFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CommentFilter>>;
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
  postId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Comment`. */
export enum CommentOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  MessageAsc = 'MESSAGE_ASC',
  MessageDesc = 'MESSAGE_DESC',
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

/** Represents an update to a `Comment`. Fields that are set will be updated. */
export type CommentPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
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

/** All input for the create `UserOrganization` mutation. */
export type CreateUserOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `UserOrganization` to be created by this mutation. */
  userOrganization: UserOrganizationInput;
};

/** The output of our create `UserOrganization` mutation. */
export type CreateUserOrganizationPayload = {
  __typename?: 'CreateUserOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UserOrganization` that was created by this mutation. */
  userOrganization?: Maybe<UserOrganization>;
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

/** All input for the `deleteCommentById` mutation. */
export type DeleteCommentByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Comment` to be deleted. */
  id: Scalars['ID']['input'];
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
  deletedCommentId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Comment` mutation. */
export type DeleteCommentPayloadCommentEdgeArgs = {
  orderBy?: Array<CommentOrderBy>;
};

/** All input for the `deleteDownvoteById` mutation. */
export type DeleteDownvoteByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Downvote` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteDownvoteByPostIdAndUserId` mutation. */
export type DeleteDownvoteByPostIdAndUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
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
  deletedDownvoteId?: Maybe<Scalars['ID']['output']>;
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

/** All input for the `deleteOrganizationById` mutation. */
export type DeleteOrganizationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Organization` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteOrganizationByName` mutation. */
export type DeleteOrganizationByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** All input for the `deleteOrganizationBySlug` mutation. */
export type DeleteOrganizationBySlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
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
  deletedOrganizationId?: Maybe<Scalars['ID']['output']>;
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

/** All input for the `deletePostById` mutation. */
export type DeletePostByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Post` to be deleted. */
  id: Scalars['ID']['input'];
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
  deletedPostId?: Maybe<Scalars['ID']['output']>;
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

/** All input for the `deleteProjectById` mutation. */
export type DeleteProjectByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Project` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteProjectByName` mutation. */
export type DeleteProjectByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** All input for the `deleteProjectBySlugAndOrganizationId` mutation. */
export type DeleteProjectBySlugAndOrganizationIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['UUID']['input'];
  slug: Scalars['String']['input'];
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
  deletedProjectId?: Maybe<Scalars['ID']['output']>;
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

/** All input for the `deleteUpvoteById` mutation. */
export type DeleteUpvoteByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Upvote` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteUpvoteByPostIdAndUserId` mutation. */
export type DeleteUpvoteByPostIdAndUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
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
  deletedUpvoteId?: Maybe<Scalars['ID']['output']>;
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

/** All input for the `deleteUserByHidraId` mutation. */
export type DeleteUserByHidraIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  hidraId: Scalars['UUID']['input'];
};

/** All input for the `deleteUserById` mutation. */
export type DeleteUserByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteUserByUsername` mutation. */
export type DeleteUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
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

/** All input for the `deleteUserOrganizationByUserIdAndOrganizationId` mutation. */
export type DeleteUserOrganizationByUserIdAndOrganizationIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

/** The output of our delete `UserOrganization` mutation. */
export type DeleteUserOrganizationPayload = {
  __typename?: 'DeleteUserOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UserOrganization` that was deleted by this mutation. */
  userOrganization?: Maybe<UserOrganization>;
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedUserId?: Maybe<Scalars['ID']['output']>;
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

export type Downvote = Node & {
  __typename?: 'Downvote';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
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

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Comment`. */
  createComment?: Maybe<CreateCommentPayload>;
  /** Creates a single `Downvote`. */
  createDownvote?: Maybe<CreateDownvotePayload>;
  /** Creates a single `Organization`. */
  createOrganization?: Maybe<CreateOrganizationPayload>;
  /** Creates a single `Post`. */
  createPost?: Maybe<CreatePostPayload>;
  /** Creates a single `Project`. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a single `Upvote`. */
  createUpvote?: Maybe<CreateUpvotePayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `UserOrganization`. */
  createUserOrganization?: Maybe<CreateUserOrganizationPayload>;
  /** Deletes a single `Comment` using a unique key. */
  deleteComment?: Maybe<DeleteCommentPayload>;
  /** Deletes a single `Comment` using its globally unique id. */
  deleteCommentById?: Maybe<DeleteCommentPayload>;
  /** Deletes a single `Downvote` using a unique key. */
  deleteDownvote?: Maybe<DeleteDownvotePayload>;
  /** Deletes a single `Downvote` using its globally unique id. */
  deleteDownvoteById?: Maybe<DeleteDownvotePayload>;
  /** Deletes a single `Downvote` using a unique key. */
  deleteDownvoteByPostIdAndUserId?: Maybe<DeleteDownvotePayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganization?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using its globally unique id. */
  deleteOrganizationById?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganizationByName?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganizationBySlug?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Post` using a unique key. */
  deletePost?: Maybe<DeletePostPayload>;
  /** Deletes a single `Post` using its globally unique id. */
  deletePostById?: Maybe<DeletePostPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using its globally unique id. */
  deleteProjectById?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectByName?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectBySlugAndOrganizationId?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Upvote` using a unique key. */
  deleteUpvote?: Maybe<DeleteUpvotePayload>;
  /** Deletes a single `Upvote` using its globally unique id. */
  deleteUpvoteById?: Maybe<DeleteUpvotePayload>;
  /** Deletes a single `Upvote` using a unique key. */
  deleteUpvoteByPostIdAndUserId?: Maybe<DeleteUpvotePayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByHidraId?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUserById?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByUsername?: Maybe<DeleteUserPayload>;
  /** Deletes a single `UserOrganization` using a unique key. */
  deleteUserOrganizationByUserIdAndOrganizationId?: Maybe<DeleteUserOrganizationPayload>;
  /** Updates a single `Comment` using a unique key and a patch. */
  updateComment?: Maybe<UpdateCommentPayload>;
  /** Updates a single `Comment` using its globally unique id and a patch. */
  updateCommentById?: Maybe<UpdateCommentPayload>;
  /** Updates a single `Downvote` using a unique key and a patch. */
  updateDownvote?: Maybe<UpdateDownvotePayload>;
  /** Updates a single `Downvote` using its globally unique id and a patch. */
  updateDownvoteById?: Maybe<UpdateDownvotePayload>;
  /** Updates a single `Downvote` using a unique key and a patch. */
  updateDownvoteByPostIdAndUserId?: Maybe<UpdateDownvotePayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using its globally unique id and a patch. */
  updateOrganizationById?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganizationByName?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganizationBySlug?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Post` using a unique key and a patch. */
  updatePost?: Maybe<UpdatePostPayload>;
  /** Updates a single `Post` using its globally unique id and a patch. */
  updatePostById?: Maybe<UpdatePostPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using its globally unique id and a patch. */
  updateProjectById?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectByName?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectBySlugAndOrganizationId?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Upvote` using a unique key and a patch. */
  updateUpvote?: Maybe<UpdateUpvotePayload>;
  /** Updates a single `Upvote` using its globally unique id and a patch. */
  updateUpvoteById?: Maybe<UpdateUpvotePayload>;
  /** Updates a single `Upvote` using a unique key and a patch. */
  updateUpvoteByPostIdAndUserId?: Maybe<UpdateUpvotePayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByHidraId?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserById?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByUsername?: Maybe<UpdateUserPayload>;
  /** Updates a single `UserOrganization` using a unique key and a patch. */
  updateUserOrganizationByUserIdAndOrganizationId?: Maybe<UpdateUserOrganizationPayload>;
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
export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
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
export type MutationCreateUpvoteArgs = {
  input: CreateUpvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserOrganizationArgs = {
  input: CreateUserOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCommentByIdArgs = {
  input: DeleteCommentByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDownvoteArgs = {
  input: DeleteDownvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDownvoteByIdArgs = {
  input: DeleteDownvoteByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDownvoteByPostIdAndUserIdArgs = {
  input: DeleteDownvoteByPostIdAndUserIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationByIdArgs = {
  input: DeleteOrganizationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationByNameArgs = {
  input: DeleteOrganizationByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationBySlugArgs = {
  input: DeleteOrganizationBySlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostByIdArgs = {
  input: DeletePostByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectByIdArgs = {
  input: DeleteProjectByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectByNameArgs = {
  input: DeleteProjectByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectBySlugAndOrganizationIdArgs = {
  input: DeleteProjectBySlugAndOrganizationIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUpvoteArgs = {
  input: DeleteUpvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUpvoteByIdArgs = {
  input: DeleteUpvoteByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUpvoteByPostIdAndUserIdArgs = {
  input: DeleteUpvoteByPostIdAndUserIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByHidraIdArgs = {
  input: DeleteUserByHidraIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByIdArgs = {
  input: DeleteUserByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByUsernameArgs = {
  input: DeleteUserByUsernameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserOrganizationByUserIdAndOrganizationIdArgs = {
  input: DeleteUserOrganizationByUserIdAndOrganizationIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCommentByIdArgs = {
  input: UpdateCommentByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDownvoteArgs = {
  input: UpdateDownvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDownvoteByIdArgs = {
  input: UpdateDownvoteByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDownvoteByPostIdAndUserIdArgs = {
  input: UpdateDownvoteByPostIdAndUserIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationByIdArgs = {
  input: UpdateOrganizationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationByNameArgs = {
  input: UpdateOrganizationByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationBySlugArgs = {
  input: UpdateOrganizationBySlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostByIdArgs = {
  input: UpdatePostByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectByIdArgs = {
  input: UpdateProjectByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectByNameArgs = {
  input: UpdateProjectByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectBySlugAndOrganizationIdArgs = {
  input: UpdateProjectBySlugAndOrganizationIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUpvoteArgs = {
  input: UpdateUpvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUpvoteByIdArgs = {
  input: UpdateUpvoteByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUpvoteByPostIdAndUserIdArgs = {
  input: UpdateUpvoteByPostIdAndUserIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByHidraIdArgs = {
  input: UpdateUserByHidraIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByIdArgs = {
  input: UpdateUserByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByUsernameArgs = {
  input: UpdateUserByUsernameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserOrganizationByUserIdAndOrganizationIdArgs = {
  input: UpdateUserOrganizationByUserIdAndOrganizationIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
};

export type Organization = Node & {
  __typename?: 'Organization';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Project`. */
  projects: ProjectConnection;
  rowId: Scalars['UUID']['output'];
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `UserOrganization`. */
  userOrganizations: UserOrganizationConnection;
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


export type OrganizationUserOrganizationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserOrganizationCondition>;
  filter?: InputMaybe<UserOrganizationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrganizationOrderBy>>;
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
  /** Filter by the object’s `userOrganizations` relation. */
  userOrganizations?: InputMaybe<OrganizationToManyUserOrganizationFilter>;
  /** Some related `userOrganizations` exist. */
  userOrganizationsExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Organization`. */
export enum OrganizationOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
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
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserOrganizationsCountAsc = 'USER_ORGANIZATIONS_COUNT_ASC',
  UserOrganizationsCountDesc = 'USER_ORGANIZATIONS_COUNT_DESC',
  UserOrganizationsDistinctCountCreatedAtAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_CREATED_AT_ASC',
  UserOrganizationsDistinctCountCreatedAtDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_CREATED_AT_DESC',
  UserOrganizationsDistinctCountOrganizationIdAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  UserOrganizationsDistinctCountOrganizationIdDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  UserOrganizationsDistinctCountUserIdAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_USER_ID_ASC',
  UserOrganizationsDistinctCountUserIdDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_USER_ID_DESC'
}

/** Represents an update to a `Organization`. Fields that are set will be updated. */
export type OrganizationPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
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

/** A filter to be used against many `UserOrganization` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationToManyUserOrganizationFilter = {
  /** Aggregates across related `UserOrganization` match the filter criteria. */
  aggregates?: InputMaybe<UserOrganizationAggregatesFilter>;
  /** Every related `UserOrganization` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<UserOrganizationFilter>;
  /** No related `UserOrganization` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<UserOrganizationFilter>;
  /** Some related `UserOrganization` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<UserOrganizationFilter>;
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

export type Post = Node & {
  __typename?: 'Post';
  /** Reads and enables pagination through a set of `Comment`. */
  comments: CommentConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Downvote`. */
  downvotes: DownvoteConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Project` that is related to this `Post`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
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
  Title = 'TITLE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  UserId = 'USER_ID'
}

export type PostHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
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
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Post` */
export type PostInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
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

export type Project = Node & {
  __typename?: 'Project';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Organization` that is related to this `Project`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostConnection;
  rowId: Scalars['UUID']['output'];
  slug: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
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
  name?: InputMaybe<Scalars['String']['input']>;
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

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Get a single `Comment`. */
  comment?: Maybe<Comment>;
  /** Reads a single `Comment` using its globally unique `ID`. */
  commentById?: Maybe<Comment>;
  /** Reads and enables pagination through a set of `Comment`. */
  comments?: Maybe<CommentConnection>;
  /** Get a single `Downvote`. */
  downvote?: Maybe<Downvote>;
  /** Reads a single `Downvote` using its globally unique `ID`. */
  downvoteById?: Maybe<Downvote>;
  /** Get a single `Downvote`. */
  downvoteByPostIdAndUserId?: Maybe<Downvote>;
  /** Reads and enables pagination through a set of `Downvote`. */
  downvotes?: Maybe<DownvoteConnection>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Get a single `Organization`. */
  organization?: Maybe<Organization>;
  /** Reads a single `Organization` using its globally unique `ID`. */
  organizationById?: Maybe<Organization>;
  /** Get a single `Organization`. */
  organizationByName?: Maybe<Organization>;
  /** Get a single `Organization`. */
  organizationBySlug?: Maybe<Organization>;
  /** Reads and enables pagination through a set of `Organization`. */
  organizations?: Maybe<OrganizationConnection>;
  /** Get a single `Post`. */
  post?: Maybe<Post>;
  /** Reads a single `Post` using its globally unique `ID`. */
  postById?: Maybe<Post>;
  /** Reads and enables pagination through a set of `Post`. */
  posts?: Maybe<PostConnection>;
  /** Get a single `Project`. */
  project?: Maybe<Project>;
  /** Reads a single `Project` using its globally unique `ID`. */
  projectById?: Maybe<Project>;
  /** Get a single `Project`. */
  projectByName?: Maybe<Project>;
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
  /** Reads a single `Upvote` using its globally unique `ID`. */
  upvoteById?: Maybe<Upvote>;
  /** Get a single `Upvote`. */
  upvoteByPostIdAndUserId?: Maybe<Upvote>;
  /** Reads and enables pagination through a set of `Upvote`. */
  upvotes?: Maybe<UpvoteConnection>;
  /** Get a single `User`. */
  user?: Maybe<User>;
  /** Get a single `User`. */
  userByHidraId?: Maybe<User>;
  /** Reads a single `User` using its globally unique `ID`. */
  userById?: Maybe<User>;
  /** Get a single `User`. */
  userByUsername?: Maybe<User>;
  /** Get a single `UserOrganization`. */
  userOrganizationByUserIdAndOrganizationId?: Maybe<UserOrganization>;
  /** Reads and enables pagination through a set of `UserOrganization`. */
  userOrganizations?: Maybe<UserOrganizationConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UserConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCommentArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCommentByIdArgs = {
  id: Scalars['ID']['input'];
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
export type QueryDownvoteByIdArgs = {
  id: Scalars['ID']['input'];
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
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationByIdArgs = {
  id: Scalars['ID']['input'];
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
export type QueryPostByIdArgs = {
  id: Scalars['ID']['input'];
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
export type QueryProjectByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByNameArgs = {
  name: Scalars['String']['input'];
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
export type QueryUpvoteByIdArgs = {
  id: Scalars['ID']['input'];
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
export type QueryUserByHidraIdArgs = {
  hidraId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByUsernameArgs = {
  username: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserOrganizationByUserIdAndOrganizationIdArgs = {
  organizationId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserOrganizationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserOrganizationCondition>;
  filter?: InputMaybe<UserOrganizationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrganizationOrderBy>>;
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

/** All input for the `updateCommentById` mutation. */
export type UpdateCommentByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Comment` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Comment` being updated. */
  patch: CommentPatch;
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

/** All input for the `updateDownvoteById` mutation. */
export type UpdateDownvoteByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Downvote` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Downvote` being updated. */
  patch: DownvotePatch;
};

/** All input for the `updateDownvoteByPostIdAndUserId` mutation. */
export type UpdateDownvoteByPostIdAndUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Downvote` being updated. */
  patch: DownvotePatch;
  postId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
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

/** All input for the `updateOrganizationById` mutation. */
export type UpdateOrganizationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Organization` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
};

/** All input for the `updateOrganizationByName` mutation. */
export type UpdateOrganizationByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
};

/** All input for the `updateOrganizationBySlug` mutation. */
export type UpdateOrganizationBySlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
  slug: Scalars['String']['input'];
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

/** All input for the `updatePostById` mutation. */
export type UpdatePostByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Post` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Post` being updated. */
  patch: PostPatch;
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

/** All input for the `updateProjectById` mutation. */
export type UpdateProjectByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Project` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  patch: ProjectPatch;
};

/** All input for the `updateProjectByName` mutation. */
export type UpdateProjectByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  patch: ProjectPatch;
};

/** All input for the `updateProjectBySlugAndOrganizationId` mutation. */
export type UpdateProjectBySlugAndOrganizationIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  patch: ProjectPatch;
  slug: Scalars['String']['input'];
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

/** All input for the `updateUpvoteById` mutation. */
export type UpdateUpvoteByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Upvote` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Upvote` being updated. */
  patch: UpvotePatch;
};

/** All input for the `updateUpvoteByPostIdAndUserId` mutation. */
export type UpdateUpvoteByPostIdAndUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Upvote` being updated. */
  patch: UpvotePatch;
  postId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
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

/** All input for the `updateUserByHidraId` mutation. */
export type UpdateUserByHidraIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  hidraId: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUserById` mutation. */
export type UpdateUserByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUserByUsername` mutation. */
export type UpdateUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  username: Scalars['String']['input'];
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

/** All input for the `updateUserOrganizationByUserIdAndOrganizationId` mutation. */
export type UpdateUserOrganizationByUserIdAndOrganizationIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `UserOrganization` being updated. */
  patch: UserOrganizationPatch;
  userId: Scalars['UUID']['input'];
};

/** The output of our update `UserOrganization` mutation. */
export type UpdateUserOrganizationPayload = {
  __typename?: 'UpdateUserOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UserOrganization` that was updated by this mutation. */
  userOrganization?: Maybe<UserOrganization>;
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

export type Upvote = Node & {
  __typename?: 'Upvote';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
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

export type User = Node & {
  __typename?: 'User';
  /** Reads and enables pagination through a set of `Comment`. */
  comments: CommentConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Downvote`. */
  downvotes: DownvoteConnection;
  firstName?: Maybe<Scalars['String']['output']>;
  hidraId: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostConnection;
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Upvote`. */
  upvotes: UpvoteConnection;
  /** Reads and enables pagination through a set of `UserOrganization`. */
  userOrganizations: UserOrganizationConnection;
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


export type UserUserOrganizationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserOrganizationCondition>;
  filter?: InputMaybe<UserOrganizationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrganizationOrderBy>>;
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
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `hidraId` field. */
  hidraId?: InputMaybe<Scalars['UUID']['input']>;
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
  /** Distinct count of firstName across the matching connection */
  firstName?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of hidraId across the matching connection */
  hidraId?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `downvotes` relation. */
  downvotes?: InputMaybe<UserToManyDownvoteFilter>;
  /** Some related `downvotes` exist. */
  downvotesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `firstName` field. */
  firstName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `hidraId` field. */
  hidraId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `lastName` field. */
  lastName?: InputMaybe<StringFilter>;
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
  /** Filter by the object’s `upvotes` relation. */
  upvotes?: InputMaybe<UserToManyUpvoteFilter>;
  /** Some related `upvotes` exist. */
  upvotesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `userOrganizations` relation. */
  userOrganizations?: InputMaybe<UserToManyUserOrganizationFilter>;
  /** Some related `userOrganizations` exist. */
  userOrganizationsExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  HidraIdAsc = 'HIDRA_ID_ASC',
  HidraIdDesc = 'HIDRA_ID_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
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
  UsernameDesc = 'USERNAME_DESC',
  UserOrganizationsCountAsc = 'USER_ORGANIZATIONS_COUNT_ASC',
  UserOrganizationsCountDesc = 'USER_ORGANIZATIONS_COUNT_DESC',
  UserOrganizationsDistinctCountCreatedAtAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_CREATED_AT_ASC',
  UserOrganizationsDistinctCountCreatedAtDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_CREATED_AT_DESC',
  UserOrganizationsDistinctCountOrganizationIdAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  UserOrganizationsDistinctCountOrganizationIdDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  UserOrganizationsDistinctCountUserIdAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_USER_ID_ASC',
  UserOrganizationsDistinctCountUserIdDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_USER_ID_DESC'
}

export type UserOrganization = {
  __typename?: 'UserOrganization';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Organization` that is related to this `UserOrganization`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID']['output'];
  /** Reads a single `User` that is related to this `UserOrganization`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};

export type UserOrganizationAggregates = {
  __typename?: 'UserOrganizationAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<UserOrganizationDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `UserOrganization` object types. */
export type UserOrganizationAggregatesFilter = {
  /** Distinct count aggregate over matching `UserOrganization` objects. */
  distinctCount?: InputMaybe<UserOrganizationDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `UserOrganization` object to be included within the aggregate. */
  filter?: InputMaybe<UserOrganizationFilter>;
};

/**
 * A condition to be used against `UserOrganization` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserOrganizationCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `UserOrganization` values. */
export type UserOrganizationConnection = {
  __typename?: 'UserOrganizationConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<UserOrganizationAggregates>;
  /** A list of edges which contains the `UserOrganization` and cursor to aid in pagination. */
  edges: Array<Maybe<UserOrganizationEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<UserOrganizationAggregates>>;
  /** A list of `UserOrganization` objects. */
  nodes: Array<Maybe<UserOrganization>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserOrganization` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `UserOrganization` values. */
export type UserOrganizationConnectionGroupedAggregatesArgs = {
  groupBy: Array<UserOrganizationGroupBy>;
  having?: InputMaybe<UserOrganizationHavingInput>;
};

export type UserOrganizationDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
};

export type UserOrganizationDistinctCountAggregates = {
  __typename?: 'UserOrganizationDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of userId across the matching connection */
  userId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `UserOrganization` edge in the connection. */
export type UserOrganizationEdge = {
  __typename?: 'UserOrganizationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `UserOrganization` at the end of the edge. */
  node?: Maybe<UserOrganization>;
};

/** A filter to be used against `UserOrganization` object types. All fields are combined with a logical ‘and.’ */
export type UserOrganizationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserOrganizationFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserOrganizationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserOrganizationFilter>>;
  /** Filter by the object’s `organization` relation. */
  organization?: InputMaybe<OrganizationFilter>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `UserOrganization` for usage during aggregation. */
export enum UserOrganizationGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  OrganizationId = 'ORGANIZATION_ID',
  UserId = 'USER_ID'
}

export type UserOrganizationHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `UserOrganization` aggregates. */
export type UserOrganizationHavingInput = {
  AND?: InputMaybe<Array<UserOrganizationHavingInput>>;
  OR?: InputMaybe<Array<UserOrganizationHavingInput>>;
  average?: InputMaybe<UserOrganizationHavingAverageInput>;
  distinctCount?: InputMaybe<UserOrganizationHavingDistinctCountInput>;
  max?: InputMaybe<UserOrganizationHavingMaxInput>;
  min?: InputMaybe<UserOrganizationHavingMinInput>;
  stddevPopulation?: InputMaybe<UserOrganizationHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<UserOrganizationHavingStddevSampleInput>;
  sum?: InputMaybe<UserOrganizationHavingSumInput>;
  variancePopulation?: InputMaybe<UserOrganizationHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<UserOrganizationHavingVarianceSampleInput>;
};

export type UserOrganizationHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `UserOrganization` */
export type UserOrganizationInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  organizationId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `UserOrganization`. */
export enum UserOrganizationOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `UserOrganization`. Fields that are set will be updated. */
export type UserOrganizationPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
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

/** A filter to be used against many `UserOrganization` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyUserOrganizationFilter = {
  /** Aggregates across related `UserOrganization` match the filter criteria. */
  aggregates?: InputMaybe<UserOrganizationAggregatesFilter>;
  /** Every related `UserOrganization` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<UserOrganizationFilter>;
  /** No related `UserOrganization` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<UserOrganizationFilter>;
  /** Some related `UserOrganization` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<UserOrganizationFilter>;
};

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization?: { __typename?: 'CreateOrganizationPayload', organization?: { __typename?: 'Organization', rowId: string, slug: string } | null } | null };

export type DeleteOrganizationMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteOrganizationMutation = { __typename?: 'Mutation', deleteOrganization?: { __typename?: 'DeleteOrganizationPayload', organization?: { __typename?: 'Organization', rowId: string } | null } | null };

export type LeaveOrganizationMutationVariables = Exact<{
  userId: Scalars['UUID']['input'];
  organizationId: Scalars['UUID']['input'];
}>;


export type LeaveOrganizationMutation = { __typename?: 'Mutation', deleteUserOrganizationByUserIdAndOrganizationId?: { __typename?: 'DeleteUserOrganizationPayload', userOrganization?: { __typename?: 'UserOrganization', userId: string, organizationId: string } | null } | null };

export type CreatePostMutationVariables = Exact<{
  postInput: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'CreatePostPayload', clientMutationId?: string | null } | null };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['UUID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'DeletePostPayload', clientMutationId?: string | null } | null };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'CreateProjectPayload', project?: { __typename?: 'Project', slug: string, organization?: { __typename?: 'Organization', slug: string } | null } | null } | null };

export type DeleteUpvoteMutationVariables = Exact<{
  upvoteId: Scalars['UUID']['input'];
}>;


export type DeleteUpvoteMutation = { __typename?: 'Mutation', deleteUpvote?: { __typename?: 'DeleteUpvotePayload', clientMutationId?: string | null } | null };

export type UpvotePostMutationVariables = Exact<{
  upvote: UpvoteInput;
}>;


export type UpvotePostMutation = { __typename?: 'Mutation', createUpvote?: { __typename?: 'CreateUpvotePayload', clientMutationId?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  hidraId: Scalars['UUID']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreateUserPayload', clientMutationId?: string | null } | null };

export type UpdateUserMutationVariables = Exact<{
  hidraId: Scalars['UUID']['input'];
  patch: UserPatch;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUserByHidraId?: { __typename?: 'UpdateUserPayload', clientMutationId?: string | null } | null };

export type CreateUserOrganizationMutationVariables = Exact<{
  input: CreateUserOrganizationInput;
}>;


export type CreateUserOrganizationMutation = { __typename?: 'Mutation', createUserOrganization?: { __typename?: 'CreateUserOrganizationPayload', clientMutationId?: string | null } | null };

export type CommentsQueryVariables = Exact<{
  pageSize: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['Cursor']['input']>;
  feedbackId: Scalars['UUID']['input'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments?: { __typename?: 'CommentConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'CommentEdge', node?: { __typename?: 'Comment', rowId: string, message?: string | null, createdAt?: Date | null, user?: { __typename?: 'User', username?: string | null } | null } | null } | null> } | null };

export type DashboardAggregatesQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type DashboardAggregatesQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', totalCount: number } | null, users?: { __typename?: 'UserConnection', totalCount: number } | null };

export type FeedbackByIdQueryVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type FeedbackByIdQuery = { __typename?: 'Query', post?: { __typename?: 'Post', rowId: string, title?: string | null, description?: string | null, createdAt?: Date | null, updatedAt?: Date | null, project?: { __typename?: 'Project', rowId: string, name?: string | null, organization?: { __typename?: 'Organization', rowId: string, name?: string | null } | null } | null, user?: { __typename?: 'User', username?: string | null } | null, upvotes: { __typename?: 'UpvoteConnection', totalCount: number }, downvotes: { __typename?: 'DownvoteConnection', totalCount: number } } | null };

export type OrganizationQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type OrganizationQuery = { __typename?: 'Query', organizationBySlug?: { __typename?: 'Organization', rowId: string, name?: string | null, slug: string, projects: { __typename?: 'ProjectConnection', nodes: Array<{ __typename?: 'Project', rowId: string, name?: string | null, description?: string | null, slug: string, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null> } } | null };

export type OrganizationMetricsQueryVariables = Exact<{
  organizationId: Scalars['UUID']['input'];
}>;


export type OrganizationMetricsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', totalCount: number } | null, posts?: { __typename?: 'PostConnection', totalCount: number } | null, userOrganizations?: { __typename?: 'UserOrganizationConnection', totalCount: number } | null };

export type OrganizationsQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy> | OrganizationOrderBy>;
  userId: Scalars['UUID']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type OrganizationsQuery = { __typename?: 'Query', organizations?: { __typename?: 'OrganizationConnection', totalCount: number, nodes: Array<{ __typename?: 'Organization', rowId: string, name?: string | null, slug: string, projects: { __typename?: 'ProjectConnection', totalCount: number }, userOrganizations: { __typename?: 'UserOrganizationConnection', totalCount: number } } | null> } | null };

export type PostsQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
  after?: InputMaybe<Scalars['Cursor']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean }, nodes: Array<{ __typename?: 'Post', rowId: string } | null> } | null };

export type ProjectQueryVariables = Exact<{
  projectSlug: Scalars['String']['input'];
  organizationSlug: Scalars['String']['input'];
}>;


export type ProjectQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', nodes: Array<{ __typename?: 'Project', rowId: string, name?: string | null, description?: string | null, organization?: { __typename?: 'Organization', name?: string | null } | null } | null> } | null };

export type ProjectBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  organizationId: Scalars['UUID']['input'];
}>;


export type ProjectBySlugQuery = { __typename?: 'Query', projectBySlugAndOrganizationId?: { __typename?: 'Project', rowId: string } | null };

export type ProjectMetricsQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
}>;


export type ProjectMetricsQuery = { __typename?: 'Query', project?: { __typename?: 'Project', createdAt?: Date | null, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null, upvotes?: { __typename?: 'UpvoteConnection', totalCount: number } | null, downvotes?: { __typename?: 'DownvoteConnection', totalCount: number } | null };

export type ProjectsQueryVariables = Exact<{
  pageSize: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  organizationSlug: Scalars['String']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', totalCount: number, nodes: Array<{ __typename?: 'Project', rowId: string, name?: string | null, description?: string | null, slug: string, organization?: { __typename?: 'Organization', slug: string } | null, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null> } | null };

export type RecentFeedbackQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type RecentFeedbackQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', nodes: Array<{ __typename?: 'Post', rowId: string, createdAt?: Date | null, title?: string | null, description?: string | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null } | null> } | null };

export type UserQueryVariables = Exact<{
  hidraId: Scalars['UUID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', userByHidraId?: { __typename?: 'User', rowId: string, hidraId: string, username?: string | null, firstName?: string | null, lastName?: string | null } | null };

export type WeeklyFeedbackQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  startDate: Scalars['Datetime']['input'];
}>;


export type WeeklyFeedbackQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', groupedAggregates?: Array<{ __typename?: 'PostAggregates', keys?: Array<string | null> | null, distinctCount?: { __typename?: 'PostDistinctCountAggregates', rowId?: string | null } | null }> | null } | null };


export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    organization {
      rowId
      slug
    }
  }
}
    `;
export const DeleteOrganizationDocument = gql`
    mutation DeleteOrganization($rowId: UUID!) {
  deleteOrganization(input: {rowId: $rowId}) {
    organization {
      rowId
    }
  }
}
    `;
export const LeaveOrganizationDocument = gql`
    mutation LeaveOrganization($userId: UUID!, $organizationId: UUID!) {
  deleteUserOrganizationByUserIdAndOrganizationId(
    input: {userId: $userId, organizationId: $organizationId}
  ) {
    userOrganization {
      userId
      organizationId
    }
  }
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($postInput: PostInput!) {
  createPost(input: {post: $postInput}) {
    clientMutationId
  }
}
    `;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: UUID!) {
  deletePost(input: {rowId: $postId}) {
    clientMutationId
  }
}
    `;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    project {
      slug
      organization {
        slug
      }
    }
  }
}
    `;
export const DeleteUpvoteDocument = gql`
    mutation DeleteUpvote($upvoteId: UUID!) {
  deleteUpvote(input: {rowId: $upvoteId}) {
    clientMutationId
  }
}
    `;
export const UpvotePostDocument = gql`
    mutation UpvotePost($upvote: UpvoteInput!) {
  createUpvote(input: {upvote: $upvote}) {
    clientMutationId
  }
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($hidraId: UUID!, $username: String, $firstName: String, $lastName: String) {
  createUser(
    input: {user: {hidraId: $hidraId, username: $username, firstName: $firstName, lastName: $lastName}}
  ) {
    clientMutationId
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation UpdateUser($hidraId: UUID!, $patch: UserPatch!) {
  updateUserByHidraId(input: {hidraId: $hidraId, patch: $patch}) {
    clientMutationId
  }
}
    `;
export const CreateUserOrganizationDocument = gql`
    mutation CreateUserOrganization($input: CreateUserOrganizationInput!) {
  createUserOrganization(input: $input) {
    clientMutationId
  }
}
    `;
export const CommentsDocument = gql`
    query Comments($pageSize: Int!, $after: Cursor, $feedbackId: UUID!) {
  comments(
    first: $pageSize
    after: $after
    orderBy: CREATED_AT_DESC
    condition: {postId: $feedbackId}
  ) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        rowId
        message
        user {
          username
        }
        createdAt
      }
    }
  }
}
    `;
export const DashboardAggregatesDocument = gql`
    query DashboardAggregates($userId: UUID!) {
  posts(
    filter: {project: {organization: {userOrganizations: {some: {userId: {equalTo: $userId}}}}}}
  ) {
    totalCount
  }
  users(
    filter: {userOrganizations: {some: {organization: {userOrganizations: {some: {userId: {equalTo: $userId}}}}}}}
  ) {
    totalCount
  }
}
    `;
export const FeedbackByIdDocument = gql`
    query FeedbackById($rowId: UUID!) {
  post(rowId: $rowId) {
    rowId
    project {
      rowId
      name
      organization {
        rowId
        name
      }
    }
    title
    description
    user {
      username
    }
    upvotes {
      totalCount
    }
    downvotes {
      totalCount
    }
    createdAt
    updatedAt
  }
}
    `;
export const OrganizationDocument = gql`
    query Organization($slug: String!) {
  organizationBySlug(slug: $slug) {
    rowId
    name
    slug
    projects(first: 6, orderBy: POSTS_COUNT_DESC) {
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
export const OrganizationMetricsDocument = gql`
    query OrganizationMetrics($organizationId: UUID!) {
  projects(condition: {organizationId: $organizationId}) {
    totalCount
  }
  posts(filter: {project: {organizationId: {equalTo: $organizationId}}}) {
    totalCount
  }
  userOrganizations(condition: {organizationId: $organizationId}) {
    totalCount
  }
}
    `;
export const OrganizationsDocument = gql`
    query Organizations($pageSize: Int, $offset: Int, $orderBy: [OrganizationOrderBy!], $userId: UUID!, $search: String) {
  organizations(
    first: $pageSize
    offset: $offset
    orderBy: $orderBy
    filter: {name: {includesInsensitive: $search}, userOrganizations: {some: {userId: {equalTo: $userId}}}}
  ) {
    totalCount
    nodes {
      rowId
      name
      slug
      projects {
        totalCount
      }
      userOrganizations {
        totalCount
      }
    }
  }
}
    `;
export const PostsDocument = gql`
    query Posts($projectId: UUID!, $after: Cursor, $pageSize: Int) {
  posts(
    after: $after
    first: $pageSize
    filter: {projectId: {equalTo: $projectId}}
  ) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    totalCount
    nodes {
      rowId
    }
  }
}
    `;
export const ProjectDocument = gql`
    query Project($projectSlug: String!, $organizationSlug: String!) {
  projects(
    first: 1
    condition: {slug: $projectSlug}
    filter: {organization: {slug: {equalTo: $organizationSlug}}}
  ) {
    nodes {
      rowId
      name
      description
      organization {
        name
      }
    }
  }
}
    `;
export const ProjectBySlugDocument = gql`
    query ProjectBySlug($slug: String!, $organizationId: UUID!) {
  projectBySlugAndOrganizationId(slug: $slug, organizationId: $organizationId) {
    rowId
  }
}
    `;
export const ProjectMetricsDocument = gql`
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
export const ProjectsDocument = gql`
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
export const RecentFeedbackDocument = gql`
    query RecentFeedback($userId: UUID!) {
  posts(
    first: 5
    orderBy: CREATED_AT_DESC
    filter: {project: {organization: {userOrganizations: {some: {userId: {equalTo: $userId}}}}}}
  ) {
    nodes {
      rowId
      createdAt
      title
      description
      user {
        rowId
        username
      }
    }
  }
}
    `;
export const UserDocument = gql`
    query User($hidraId: UUID!) {
  userByHidraId(hidraId: $hidraId) {
    rowId
    hidraId
    username
    firstName
    lastName
  }
}
    `;
export const WeeklyFeedbackDocument = gql`
    query WeeklyFeedback($userId: UUID!, $startDate: Datetime!) {
  posts(
    filter: {project: {organization: {userOrganizations: {some: {userId: {equalTo: $userId}}}}}, createdAt: {greaterThanOrEqualTo: $startDate}}
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateOrganization(variables: CreateOrganizationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateOrganizationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOrganizationMutation>(CreateOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateOrganization', 'mutation', variables);
    },
    DeleteOrganization(variables: DeleteOrganizationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteOrganizationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteOrganizationMutation>(DeleteOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteOrganization', 'mutation', variables);
    },
    LeaveOrganization(variables: LeaveOrganizationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LeaveOrganizationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LeaveOrganizationMutation>(LeaveOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LeaveOrganization', 'mutation', variables);
    },
    CreatePost(variables: CreatePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePostMutation>(CreatePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePost', 'mutation', variables);
    },
    DeletePost(variables: DeletePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeletePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePostMutation>(DeletePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeletePost', 'mutation', variables);
    },
    CreateProject(variables: CreateProjectMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateProjectMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateProjectMutation>(CreateProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateProject', 'mutation', variables);
    },
    DeleteUpvote(variables: DeleteUpvoteMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteUpvoteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUpvoteMutation>(DeleteUpvoteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteUpvote', 'mutation', variables);
    },
    UpvotePost(variables: UpvotePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpvotePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpvotePostMutation>(UpvotePostDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpvotePost', 'mutation', variables);
    },
    CreateUser(variables: CreateUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUser', 'mutation', variables);
    },
    UpdateUser(variables: UpdateUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserMutation>(UpdateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateUser', 'mutation', variables);
    },
    CreateUserOrganization(variables: CreateUserOrganizationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateUserOrganizationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserOrganizationMutation>(CreateUserOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUserOrganization', 'mutation', variables);
    },
    Comments(variables: CommentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CommentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CommentsQuery>(CommentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Comments', 'query', variables);
    },
    DashboardAggregates(variables: DashboardAggregatesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DashboardAggregatesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DashboardAggregatesQuery>(DashboardAggregatesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DashboardAggregates', 'query', variables);
    },
    FeedbackById(variables: FeedbackByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FeedbackByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FeedbackByIdQuery>(FeedbackByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FeedbackById', 'query', variables);
    },
    Organization(variables: OrganizationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<OrganizationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OrganizationQuery>(OrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Organization', 'query', variables);
    },
    OrganizationMetrics(variables: OrganizationMetricsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<OrganizationMetricsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OrganizationMetricsQuery>(OrganizationMetricsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'OrganizationMetrics', 'query', variables);
    },
    Organizations(variables: OrganizationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<OrganizationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OrganizationsQuery>(OrganizationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Organizations', 'query', variables);
    },
    Posts(variables: PostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostsQuery>(PostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Posts', 'query', variables);
    },
    Project(variables: ProjectQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProjectQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectQuery>(ProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Project', 'query', variables);
    },
    ProjectBySlug(variables: ProjectBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProjectBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectBySlugQuery>(ProjectBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ProjectBySlug', 'query', variables);
    },
    ProjectMetrics(variables: ProjectMetricsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProjectMetricsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectMetricsQuery>(ProjectMetricsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ProjectMetrics', 'query', variables);
    },
    Projects(variables: ProjectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectsQuery>(ProjectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Projects', 'query', variables);
    },
    RecentFeedback(variables: RecentFeedbackQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RecentFeedbackQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RecentFeedbackQuery>(RecentFeedbackDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RecentFeedback', 'query', variables);
    },
    User(variables: UserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserQuery>(UserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'User', 'query', variables);
    },
    WeeklyFeedback(variables: WeeklyFeedbackQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<WeeklyFeedbackQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WeeklyFeedbackQuery>(WeeklyFeedbackDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'WeeklyFeedback', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;