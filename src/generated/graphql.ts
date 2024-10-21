// @ts-nocheck
import { useMutation, useQuery, useInfiniteQuery, UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { useGraphqlClient } from 'lib/hooks';
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
  Datetime: { input: any; output: any; }
  Cursor: { input: any; output: any; }
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Get a single `User`. */
  userByRowId?: Maybe<User>;
  /** Get a single `Organization`. */
  organizationByRowId?: Maybe<Organization>;
  /** Get a single `Upvote`. */
  upvoteByRowId?: Maybe<Upvote>;
  /** Get a single `Post`. */
  postByRowId?: Maybe<Post>;
  /** Get a single `Project`. */
  projectByRowId?: Maybe<Project>;
  /** Get a single `_PrismaMigration`. */
  _prismaMigrationByRowId?: Maybe<_PrismaMigration>;
  /** Reads a single `User` using its globally unique `ID`. */
  user?: Maybe<User>;
  /** Reads a single `Organization` using its globally unique `ID`. */
  organization?: Maybe<Organization>;
  /** Reads a single `Upvote` using its globally unique `ID`. */
  upvote?: Maybe<Upvote>;
  /** Reads a single `Post` using its globally unique `ID`. */
  post?: Maybe<Post>;
  /** Reads a single `Project` using its globally unique `ID`. */
  project?: Maybe<Project>;
  /** Reads a single `_PrismaMigration` using its globally unique `ID`. */
  _prismaMigration?: Maybe<_PrismaMigration>;
  /** Reads and enables pagination through a set of `User`. */
  allUsers?: Maybe<UserConnection>;
  /** Reads and enables pagination through a set of `Organization`. */
  allOrganizations?: Maybe<OrganizationConnection>;
  /** Reads and enables pagination through a set of `Upvote`. */
  allUpvotes?: Maybe<UpvoteConnection>;
  /** Reads and enables pagination through a set of `Post`. */
  allPosts?: Maybe<PostConnection>;
  /** Reads and enables pagination through a set of `Project`. */
  allProjects?: Maybe<ProjectConnection>;
  /** Reads and enables pagination through a set of `_PrismaMigration`. */
  allPrismaMigrations?: Maybe<_PrismaMigrationConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByRowIdArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationByRowIdArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUpvoteByRowIdArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostByRowIdArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByRowIdArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type Query_PrismaMigrationByRowIdArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUpvoteArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type Query_PrismaMigrationArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAllUsersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
  condition?: InputMaybe<UserCondition>;
  filter?: InputMaybe<UserFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllOrganizationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy>>;
  condition?: InputMaybe<OrganizationCondition>;
  filter?: InputMaybe<OrganizationFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllUpvotesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<UpvoteOrderBy>>;
  condition?: InputMaybe<UpvoteCondition>;
  filter?: InputMaybe<UpvoteFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllPostsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
  condition?: InputMaybe<PostCondition>;
  filter?: InputMaybe<PostFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllProjectsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<ProjectOrderBy>>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllPrismaMigrationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<_PrismaMigrationOrderBy>>;
  condition?: InputMaybe<_PrismaMigrationCondition>;
  filter?: InputMaybe<_PrismaMigrationFilter>;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
};

export type User = Node & {
  __typename?: 'User';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['String']['output'];
  walletAddress: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  updatedAt: Scalars['Datetime']['output'];
  /** Reads and enables pagination through a set of `Post`. */
  postsByAuthorId: PostConnection;
  /** Reads and enables pagination through a set of `Upvote`. */
  upvotesByUserId: UpvoteConnection;
};


export type UserPostsByAuthorIdArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
  condition?: InputMaybe<PostCondition>;
  filter?: InputMaybe<PostFilter>;
};


export type UserUpvotesByUserIdArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<UpvoteOrderBy>>;
  condition?: InputMaybe<UpvoteCondition>;
  filter?: InputMaybe<UpvoteFilter>;
};

/** A connection to a list of `Post` values. */
export type PostConnection = {
  __typename?: 'PostConnection';
  /** A list of `Post` objects. */
  nodes: Array<Maybe<Post>>;
  /** A list of edges which contains the `Post` and cursor to aid in pagination. */
  edges: Array<Maybe<PostEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Post` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

export type Post = Node & {
  __typename?: 'Post';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['String']['output'];
  title: Scalars['String']['output'];
  description: Scalars['String']['output'];
  projectId: Scalars['String']['output'];
  authorId: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `Post`. */
  userByAuthorId?: Maybe<User>;
  /** Reads a single `Project` that is related to this `Post`. */
  projectByProjectId?: Maybe<Project>;
  /** Reads and enables pagination through a set of `Upvote`. */
  upvotesByPostId: UpvoteConnection;
};


export type PostUpvotesByPostIdArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<UpvoteOrderBy>>;
  condition?: InputMaybe<UpvoteCondition>;
  filter?: InputMaybe<UpvoteFilter>;
};

export type Project = Node & {
  __typename?: 'Project';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  organizationId: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Datetime']['output'];
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `Organization` that is related to this `Project`. */
  organizationByOrganizationId?: Maybe<Organization>;
  /** Reads and enables pagination through a set of `Post`. */
  postsByProjectId: PostConnection;
};


export type ProjectPostsByProjectIdArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
  condition?: InputMaybe<PostCondition>;
  filter?: InputMaybe<PostFilter>;
};

export type Organization = Node & {
  __typename?: 'Organization';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  updatedAt: Scalars['Datetime']['output'];
  /** Reads and enables pagination through a set of `Project`. */
  projectsByOrganizationId: ProjectConnection;
};


export type OrganizationProjectsByOrganizationIdArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  orderBy?: InputMaybe<Array<ProjectOrderBy>>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
};

/** A connection to a list of `Project` values. */
export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** A list of edges which contains the `Project` and cursor to aid in pagination. */
  edges: Array<Maybe<ProjectEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Project` edge in the connection. */
export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
};

/** Methods to use when ordering `Project`. */
export enum ProjectOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  ImageAsc = 'IMAGE_ASC',
  ImageDesc = 'IMAGE_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A condition to be used against `Project` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProjectCondition = {
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `image` field. */
  image?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against `Project` object types. All fields are combined with a logical ‘and.’ */
export type ProjectFilter = {
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `image` field. */
  image?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `postsByProjectId` relation. */
  postsByProjectId?: InputMaybe<ProjectToManyPostFilter>;
  /** Some related `postsByProjectId` exist. */
  postsByProjectIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `organizationByOrganizationId` relation. */
  organizationByOrganizationId?: InputMaybe<OrganizationFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProjectFilter>>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProjectFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<ProjectFilter>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']['input']>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']['input']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against many `Post` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManyPostFilter = {
  /** Every related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostFilter>;
  /** Some related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostFilter>;
  /** No related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostFilter>;
};

/** A filter to be used against `Post` object types. All fields are combined with a logical ‘and.’ */
export type PostFilter = {
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `title` field. */
  title?: InputMaybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `authorId` field. */
  authorId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `upvotesByPostId` relation. */
  upvotesByPostId?: InputMaybe<PostToManyUpvoteFilter>;
  /** Some related `upvotesByPostId` exist. */
  upvotesByPostIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `userByAuthorId` relation. */
  userByAuthorId?: InputMaybe<UserFilter>;
  /** Filter by the object’s `projectByProjectId` relation. */
  projectByProjectId?: InputMaybe<ProjectFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PostFilter>>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PostFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<PostFilter>;
};

/** A filter to be used against many `Upvote` object types. All fields are combined with a logical ‘and.’ */
export type PostToManyUpvoteFilter = {
  /** Every related `Upvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<UpvoteFilter>;
  /** Some related `Upvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<UpvoteFilter>;
  /** No related `Upvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<UpvoteFilter>;
};

/** A filter to be used against `Upvote` object types. All fields are combined with a logical ‘and.’ */
export type UpvoteFilter = {
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `postId` field. */
  postId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `postByPostId` relation. */
  postByPostId?: InputMaybe<PostFilter>;
  /** Filter by the object’s `userByUserId` relation. */
  userByUserId?: InputMaybe<UserFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UpvoteFilter>>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UpvoteFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<UpvoteFilter>;
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `walletAddress` field. */
  walletAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `postsByAuthorId` relation. */
  postsByAuthorId?: InputMaybe<UserToManyPostFilter>;
  /** Some related `postsByAuthorId` exist. */
  postsByAuthorIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `upvotesByUserId` relation. */
  upvotesByUserId?: InputMaybe<UserToManyUpvoteFilter>;
  /** Some related `upvotesByUserId` exist. */
  upvotesByUserIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserFilter>>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<UserFilter>;
};

/** A filter to be used against many `Post` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyPostFilter = {
  /** Every related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostFilter>;
  /** Some related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostFilter>;
  /** No related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostFilter>;
};

/** A filter to be used against many `Upvote` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyUpvoteFilter = {
  /** Every related `Upvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<UpvoteFilter>;
  /** Some related `Upvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<UpvoteFilter>;
  /** No related `Upvote` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<UpvoteFilter>;
};

/** A filter to be used against `Organization` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationFilter = {
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `projectsByOrganizationId` relation. */
  projectsByOrganizationId?: InputMaybe<OrganizationToManyProjectFilter>;
  /** Some related `projectsByOrganizationId` exist. */
  projectsByOrganizationIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<OrganizationFilter>>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<OrganizationFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<OrganizationFilter>;
};

/** A filter to be used against many `Project` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationToManyProjectFilter = {
  /** Every related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ProjectFilter>;
  /** Some related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ProjectFilter>;
  /** No related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ProjectFilter>;
};

/** Methods to use when ordering `Post`. */
export enum PostOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  AuthorIdAsc = 'AUTHOR_ID_ASC',
  AuthorIdDesc = 'AUTHOR_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A condition to be used against `Post` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PostCondition = {
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `title` field. */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `authorId` field. */
  authorId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `Upvote` values. */
export type UpvoteConnection = {
  __typename?: 'UpvoteConnection';
  /** A list of `Upvote` objects. */
  nodes: Array<Maybe<Upvote>>;
  /** A list of edges which contains the `Upvote` and cursor to aid in pagination. */
  edges: Array<Maybe<UpvoteEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Upvote` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

export type Upvote = Node & {
  __typename?: 'Upvote';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['String']['output'];
  postId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `Post` that is related to this `Upvote`. */
  postByPostId?: Maybe<Post>;
  /** Reads a single `User` that is related to this `Upvote`. */
  userByUserId?: Maybe<User>;
};

/** A `Upvote` edge in the connection. */
export type UpvoteEdge = {
  __typename?: 'UpvoteEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Upvote` at the end of the edge. */
  node?: Maybe<Upvote>;
};

/** Methods to use when ordering `Upvote`. */
export enum UpvoteOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  PostIdAsc = 'POST_ID_ASC',
  PostIdDesc = 'POST_ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A condition to be used against `Upvote` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UpvoteCondition = {
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `postId` field. */
  postId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A `Post` edge in the connection. */
export type PostEdge = {
  __typename?: 'PostEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Post` at the end of the edge. */
  node?: Maybe<Post>;
};

export type _PrismaMigration = Node & {
  __typename?: '_PrismaMigration';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['String']['output'];
  checksum: Scalars['String']['output'];
  finishedAt?: Maybe<Scalars['Datetime']['output']>;
  migrationName: Scalars['String']['output'];
  logs?: Maybe<Scalars['String']['output']>;
  rolledBackAt?: Maybe<Scalars['Datetime']['output']>;
  startedAt: Scalars['Datetime']['output'];
  appliedStepsCount: Scalars['Int']['output'];
};

/** A connection to a list of `User` values. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<Maybe<UserEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `User` edge in the connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
};

/** Methods to use when ordering `User`. */
export enum UserOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  WalletAddressAsc = 'WALLET_ADDRESS_ASC',
  WalletAddressDesc = 'WALLET_ADDRESS_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `walletAddress` field. */
  walletAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `Organization` values. */
export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  /** A list of `Organization` objects. */
  nodes: Array<Maybe<Organization>>;
  /** A list of edges which contains the `Organization` and cursor to aid in pagination. */
  edges: Array<Maybe<OrganizationEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Organization` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Organization` edge in the connection. */
export type OrganizationEdge = {
  __typename?: 'OrganizationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Organization` at the end of the edge. */
  node?: Maybe<Organization>;
};

/** Methods to use when ordering `Organization`. */
export enum OrganizationOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/**
 * A condition to be used against `Organization` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type OrganizationCondition = {
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `_PrismaMigration` values. */
export type _PrismaMigrationConnection = {
  __typename?: '_PrismaMigrationConnection';
  /** A list of `_PrismaMigration` objects. */
  nodes: Array<Maybe<_PrismaMigration>>;
  /** A list of edges which contains the `_PrismaMigration` and cursor to aid in pagination. */
  edges: Array<Maybe<_PrismaMigrationEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `_PrismaMigration` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `_PrismaMigration` edge in the connection. */
export type _PrismaMigrationEdge = {
  __typename?: '_PrismaMigrationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `_PrismaMigration` at the end of the edge. */
  node?: Maybe<_PrismaMigration>;
};

/** Methods to use when ordering `_PrismaMigration`. */
export enum _PrismaMigrationOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  ChecksumAsc = 'CHECKSUM_ASC',
  ChecksumDesc = 'CHECKSUM_DESC',
  FinishedAtAsc = 'FINISHED_AT_ASC',
  FinishedAtDesc = 'FINISHED_AT_DESC',
  MigrationNameAsc = 'MIGRATION_NAME_ASC',
  MigrationNameDesc = 'MIGRATION_NAME_DESC',
  LogsAsc = 'LOGS_ASC',
  LogsDesc = 'LOGS_DESC',
  RolledBackAtAsc = 'ROLLED_BACK_AT_ASC',
  RolledBackAtDesc = 'ROLLED_BACK_AT_DESC',
  StartedAtAsc = 'STARTED_AT_ASC',
  StartedAtDesc = 'STARTED_AT_DESC',
  AppliedStepsCountAsc = 'APPLIED_STEPS_COUNT_ASC',
  AppliedStepsCountDesc = 'APPLIED_STEPS_COUNT_DESC'
}

/**
 * A condition to be used against `_PrismaMigration` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type _PrismaMigrationCondition = {
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `checksum` field. */
  checksum?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `finishedAt` field. */
  finishedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `migrationName` field. */
  migrationName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `logs` field. */
  logs?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rolledBackAt` field. */
  rolledBackAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `startedAt` field. */
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `appliedStepsCount` field. */
  appliedStepsCount?: InputMaybe<Scalars['Int']['input']>;
};

/** A filter to be used against `_PrismaMigration` object types. All fields are combined with a logical ‘and.’ */
export type _PrismaMigrationFilter = {
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `checksum` field. */
  checksum?: InputMaybe<StringFilter>;
  /** Filter by the object’s `finishedAt` field. */
  finishedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `migrationName` field. */
  migrationName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `logs` field. */
  logs?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rolledBackAt` field. */
  rolledBackAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `startedAt` field. */
  startedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `appliedStepsCount` field. */
  appliedStepsCount?: InputMaybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<_PrismaMigrationFilter>>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<_PrismaMigrationFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<_PrismaMigrationFilter>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `Organization`. */
  createOrganization?: Maybe<CreateOrganizationPayload>;
  /** Creates a single `Upvote`. */
  createUpvote?: Maybe<CreateUpvotePayload>;
  /** Creates a single `Post`. */
  createPost?: Maybe<CreatePostPayload>;
  /** Creates a single `Project`. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a single `_PrismaMigration`. */
  createPrismaMigration?: Maybe<CreatePrismaMigrationPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByRowId?: Maybe<UpdateUserPayload>;
  /** Updates a single `Organization` using its globally unique id and a patch. */
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganizationByRowId?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Upvote` using its globally unique id and a patch. */
  updateUpvote?: Maybe<UpdateUpvotePayload>;
  /** Updates a single `Upvote` using a unique key and a patch. */
  updateUpvoteByRowId?: Maybe<UpdateUpvotePayload>;
  /** Updates a single `Post` using its globally unique id and a patch. */
  updatePost?: Maybe<UpdatePostPayload>;
  /** Updates a single `Post` using a unique key and a patch. */
  updatePostByRowId?: Maybe<UpdatePostPayload>;
  /** Updates a single `Project` using its globally unique id and a patch. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectByRowId?: Maybe<UpdateProjectPayload>;
  /** Updates a single `_PrismaMigration` using its globally unique id and a patch. */
  updatePrismaMigration?: Maybe<UpdatePrismaMigrationPayload>;
  /** Updates a single `_PrismaMigration` using a unique key and a patch. */
  updatePrismaMigrationByRowId?: Maybe<UpdatePrismaMigrationPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByRowId?: Maybe<DeleteUserPayload>;
  /** Deletes a single `Organization` using its globally unique id. */
  deleteOrganization?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganizationByRowId?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Upvote` using its globally unique id. */
  deleteUpvote?: Maybe<DeleteUpvotePayload>;
  /** Deletes a single `Upvote` using a unique key. */
  deleteUpvoteByRowId?: Maybe<DeleteUpvotePayload>;
  /** Deletes a single `Post` using its globally unique id. */
  deletePost?: Maybe<DeletePostPayload>;
  /** Deletes a single `Post` using a unique key. */
  deletePostByRowId?: Maybe<DeletePostPayload>;
  /** Deletes a single `Project` using its globally unique id. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectByRowId?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `_PrismaMigration` using its globally unique id. */
  deletePrismaMigration?: Maybe<DeletePrismaMigrationPayload>;
  /** Deletes a single `_PrismaMigration` using a unique key. */
  deletePrismaMigrationByRowId?: Maybe<DeletePrismaMigrationPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUpvoteArgs = {
  input: CreateUpvoteInput;
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
export type MutationCreatePrismaMigrationArgs = {
  input: CreatePrismaMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByRowIdArgs = {
  input: UpdateUserByRowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationByRowIdArgs = {
  input: UpdateOrganizationByRowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUpvoteArgs = {
  input: UpdateUpvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUpvoteByRowIdArgs = {
  input: UpdateUpvoteByRowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostByRowIdArgs = {
  input: UpdatePostByRowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectByRowIdArgs = {
  input: UpdateProjectByRowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePrismaMigrationArgs = {
  input: UpdatePrismaMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePrismaMigrationByRowIdArgs = {
  input: UpdatePrismaMigrationByRowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByRowIdArgs = {
  input: DeleteUserByRowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationByRowIdArgs = {
  input: DeleteOrganizationByRowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUpvoteArgs = {
  input: DeleteUpvoteInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUpvoteByRowIdArgs = {
  input: DeleteUpvoteByRowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostByRowIdArgs = {
  input: DeletePostByRowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectByRowIdArgs = {
  input: DeleteProjectByRowIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePrismaMigrationArgs = {
  input: DeletePrismaMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePrismaMigrationByRowIdArgs = {
  input: DeletePrismaMigrationByRowIdInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UserEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Array<UserOrderBy>;
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

/** An input for mutations affecting `User` */
export type UserInput = {
  rowId: Scalars['String']['input'];
  walletAddress: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt: Scalars['Datetime']['input'];
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationEdge>;
};


/** The output of our create `Organization` mutation. */
export type CreateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Array<OrganizationOrderBy>;
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

/** An input for mutations affecting `Organization` */
export type OrganizationInput = {
  rowId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt: Scalars['Datetime']['input'];
};

/** The output of our create `Upvote` mutation. */
export type CreateUpvotePayload = {
  __typename?: 'CreateUpvotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Upvote` that was created by this mutation. */
  upvote?: Maybe<Upvote>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Upvote`. May be used by Relay 1. */
  upvoteEdge?: Maybe<UpvoteEdge>;
};


/** The output of our create `Upvote` mutation. */
export type CreateUpvotePayloadUpvoteEdgeArgs = {
  orderBy?: Array<UpvoteOrderBy>;
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

/** An input for mutations affecting `Upvote` */
export type UpvoteInput = {
  rowId: Scalars['String']['input'];
  postId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt: Scalars['Datetime']['input'];
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostEdge>;
};


/** The output of our create `Post` mutation. */
export type CreatePostPayloadPostEdgeArgs = {
  orderBy?: Array<PostOrderBy>;
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

/** An input for mutations affecting `Post` */
export type PostInput = {
  rowId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
  authorId: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt: Scalars['Datetime']['input'];
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectEdge>;
};


/** The output of our create `Project` mutation. */
export type CreateProjectPayloadProjectEdgeArgs = {
  orderBy?: Array<ProjectOrderBy>;
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

/** An input for mutations affecting `Project` */
export type ProjectInput = {
  rowId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt: Scalars['Datetime']['input'];
};

/** The output of our create `_PrismaMigration` mutation. */
export type CreatePrismaMigrationPayload = {
  __typename?: 'CreatePrismaMigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `_PrismaMigration` that was created by this mutation. */
  _prismaMigration?: Maybe<_PrismaMigration>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `_PrismaMigration`. May be used by Relay 1. */
  _prismaMigrationEdge?: Maybe<_PrismaMigrationEdge>;
};


/** The output of our create `_PrismaMigration` mutation. */
export type CreatePrismaMigrationPayload_PrismaMigrationEdgeArgs = {
  orderBy?: Array<_PrismaMigrationOrderBy>;
};

/** All input for the create `_PrismaMigration` mutation. */
export type CreatePrismaMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `_PrismaMigration` to be created by this mutation. */
  _prismaMigration: _PrismaMigrationInput;
};

/** An input for mutations affecting `_PrismaMigration` */
export type _PrismaMigrationInput = {
  rowId: Scalars['String']['input'];
  checksum: Scalars['String']['input'];
  finishedAt?: InputMaybe<Scalars['Datetime']['input']>;
  migrationName: Scalars['String']['input'];
  logs?: InputMaybe<Scalars['String']['input']>;
  rolledBackAt?: InputMaybe<Scalars['Datetime']['input']>;
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
  appliedStepsCount?: InputMaybe<Scalars['Int']['input']>;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UserEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Array<UserOrderBy>;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  rowId?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** All input for the `updateUserByRowId` mutation. */
export type UpdateUserByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationEdge>;
};


/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Array<OrganizationOrderBy>;
};

/** All input for the `updateOrganization` mutation. */
export type UpdateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Organization` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  organizationPatch: OrganizationPatch;
};

/** Represents an update to a `Organization`. Fields that are set will be updated. */
export type OrganizationPatch = {
  rowId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** All input for the `updateOrganizationByRowId` mutation. */
export type UpdateOrganizationByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  organizationPatch: OrganizationPatch;
};

/** The output of our update `Upvote` mutation. */
export type UpdateUpvotePayload = {
  __typename?: 'UpdateUpvotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Upvote` that was updated by this mutation. */
  upvote?: Maybe<Upvote>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Upvote`. May be used by Relay 1. */
  upvoteEdge?: Maybe<UpvoteEdge>;
};


/** The output of our update `Upvote` mutation. */
export type UpdateUpvotePayloadUpvoteEdgeArgs = {
  orderBy?: Array<UpvoteOrderBy>;
};

/** All input for the `updateUpvote` mutation. */
export type UpdateUpvoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Upvote` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Upvote` being updated. */
  upvotePatch: UpvotePatch;
};

/** Represents an update to a `Upvote`. Fields that are set will be updated. */
export type UpvotePatch = {
  rowId?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** All input for the `updateUpvoteByRowId` mutation. */
export type UpdateUpvoteByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Upvote` being updated. */
  upvotePatch: UpvotePatch;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostEdge>;
};


/** The output of our update `Post` mutation. */
export type UpdatePostPayloadPostEdgeArgs = {
  orderBy?: Array<PostOrderBy>;
};

/** All input for the `updatePost` mutation. */
export type UpdatePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Post` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Post` being updated. */
  postPatch: PostPatch;
};

/** Represents an update to a `Post`. Fields that are set will be updated. */
export type PostPatch = {
  rowId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  authorId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** All input for the `updatePostByRowId` mutation. */
export type UpdatePostByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Post` being updated. */
  postPatch: PostPatch;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectEdge>;
};


/** The output of our update `Project` mutation. */
export type UpdateProjectPayloadProjectEdgeArgs = {
  orderBy?: Array<ProjectOrderBy>;
};

/** All input for the `updateProject` mutation. */
export type UpdateProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Project` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  projectPatch: ProjectPatch;
};

/** Represents an update to a `Project`. Fields that are set will be updated. */
export type ProjectPatch = {
  rowId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** All input for the `updateProjectByRowId` mutation. */
export type UpdateProjectByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  projectPatch: ProjectPatch;
};

/** The output of our update `_PrismaMigration` mutation. */
export type UpdatePrismaMigrationPayload = {
  __typename?: 'UpdatePrismaMigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `_PrismaMigration` that was updated by this mutation. */
  _prismaMigration?: Maybe<_PrismaMigration>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `_PrismaMigration`. May be used by Relay 1. */
  _prismaMigrationEdge?: Maybe<_PrismaMigrationEdge>;
};


/** The output of our update `_PrismaMigration` mutation. */
export type UpdatePrismaMigrationPayload_PrismaMigrationEdgeArgs = {
  orderBy?: Array<_PrismaMigrationOrderBy>;
};

/** All input for the `updatePrismaMigration` mutation. */
export type UpdatePrismaMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `_PrismaMigration` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `_PrismaMigration` being updated. */
  _prismaMigrationPatch: _PrismaMigrationPatch;
};

/** Represents an update to a `_PrismaMigration`. Fields that are set will be updated. */
export type _PrismaMigrationPatch = {
  rowId?: InputMaybe<Scalars['String']['input']>;
  checksum?: InputMaybe<Scalars['String']['input']>;
  finishedAt?: InputMaybe<Scalars['Datetime']['input']>;
  migrationName?: InputMaybe<Scalars['String']['input']>;
  logs?: InputMaybe<Scalars['String']['input']>;
  rolledBackAt?: InputMaybe<Scalars['Datetime']['input']>;
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
  appliedStepsCount?: InputMaybe<Scalars['Int']['input']>;
};

/** All input for the `updatePrismaMigrationByRowId` mutation. */
export type UpdatePrismaMigrationByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `_PrismaMigration` being updated. */
  _prismaMigrationPatch: _PrismaMigrationPatch;
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  deletedUserId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UserEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Array<UserOrderBy>;
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteUserByRowId` mutation. */
export type DeleteUserByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
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
  deletedOrganizationId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationEdge>;
};


/** The output of our delete `Organization` mutation. */
export type DeleteOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: Array<OrganizationOrderBy>;
};

/** All input for the `deleteOrganization` mutation. */
export type DeleteOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Organization` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteOrganizationByRowId` mutation. */
export type DeleteOrganizationByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `Upvote` mutation. */
export type DeleteUpvotePayload = {
  __typename?: 'DeleteUpvotePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Upvote` that was deleted by this mutation. */
  upvote?: Maybe<Upvote>;
  deletedUpvoteId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Upvote`. May be used by Relay 1. */
  upvoteEdge?: Maybe<UpvoteEdge>;
};


/** The output of our delete `Upvote` mutation. */
export type DeleteUpvotePayloadUpvoteEdgeArgs = {
  orderBy?: Array<UpvoteOrderBy>;
};

/** All input for the `deleteUpvote` mutation. */
export type DeleteUpvoteInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Upvote` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteUpvoteByRowId` mutation. */
export type DeleteUpvoteByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
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
  deletedPostId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostEdge>;
};


/** The output of our delete `Post` mutation. */
export type DeletePostPayloadPostEdgeArgs = {
  orderBy?: Array<PostOrderBy>;
};

/** All input for the `deletePost` mutation. */
export type DeletePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Post` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deletePostByRowId` mutation. */
export type DeletePostByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
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
  deletedProjectId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectEdge>;
};


/** The output of our delete `Project` mutation. */
export type DeleteProjectPayloadProjectEdgeArgs = {
  orderBy?: Array<ProjectOrderBy>;
};

/** All input for the `deleteProject` mutation. */
export type DeleteProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Project` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteProjectByRowId` mutation. */
export type DeleteProjectByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `_PrismaMigration` mutation. */
export type DeletePrismaMigrationPayload = {
  __typename?: 'DeletePrismaMigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `_PrismaMigration` that was deleted by this mutation. */
  _prismaMigration?: Maybe<_PrismaMigration>;
  deletedPrismaMigrationId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `_PrismaMigration`. May be used by Relay 1. */
  _prismaMigrationEdge?: Maybe<_PrismaMigrationEdge>;
};


/** The output of our delete `_PrismaMigration` mutation. */
export type DeletePrismaMigrationPayload_PrismaMigrationEdgeArgs = {
  orderBy?: Array<_PrismaMigrationOrderBy>;
};

/** All input for the `deletePrismaMigration` mutation. */
export type DeletePrismaMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `_PrismaMigration` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deletePrismaMigrationByRowId` mutation. */
export type DeletePrismaMigrationByRowIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePostByRowId?: { __typename?: 'DeletePostPayload', clientMutationId?: string | null } | null };

export type CreatePostMutationVariables = Exact<{
  postInput: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'CreatePostPayload', clientMutationId?: string | null } | null };

export type DeleteUpvoteMutationVariables = Exact<{
  upvoteId: Scalars['String']['input'];
}>;


export type DeleteUpvoteMutation = { __typename?: 'Mutation', deleteUpvoteByRowId?: { __typename?: 'DeleteUpvotePayload', clientMutationId?: string | null } | null };

export type UpvotePostMutationVariables = Exact<{
  upvote: UpvoteInput;
}>;


export type UpvotePostMutation = { __typename?: 'Mutation', createUpvote?: { __typename?: 'CreateUpvotePayload', clientMutationId?: string | null } | null };

export type PostsQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type PostsQuery = { __typename?: 'Query', allPosts?: { __typename?: 'PostConnection', nodes: Array<{ __typename?: 'Post', rowId: string, createdAt: any, title: string, description: string, userByAuthorId?: { __typename?: 'User', walletAddress: string } | null, upvotesByPostId: { __typename?: 'UpvoteConnection', nodes: Array<{ __typename?: 'Upvote', rowId: string } | null> } } | null> } | null };

export type OrganizationQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type OrganizationQuery = { __typename?: 'Query', allOrganizations?: { __typename?: 'OrganizationConnection', nodes: Array<{ __typename?: 'Organization', rowId: string, name: string, slug: string } | null> } | null };

export type ProjectsQueryVariables = Exact<{
  organizationId?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', allProjects?: { __typename?: 'ProjectConnection', nodes: Array<{ __typename?: 'Project', rowId: string, name: string, description?: string | null, slug: string } | null> } | null };

export type ProjectQueryVariables = Exact<{
  organizationId?: InputMaybe<Scalars['String']['input']>;
  projectSlug: Scalars['String']['input'];
}>;


export type ProjectQuery = { __typename?: 'Query', allProjects?: { __typename?: 'ProjectConnection', nodes: Array<{ __typename?: 'Project', rowId: string, name: string, image?: string | null, description?: string | null } | null> } | null };



export const DeletePostDocument = `
    mutation DeletePost($postId: String!) {
  deletePostByRowId(input: {rowId: $postId}) {
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
    mutationFn: useGraphqlClient<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument),
    ...options
  }
    )};

export const CreatePostDocument = `
    mutation CreatePost($postInput: PostInput!) {
  createPost(input: {post: $postInput}) {
    clientMutationId
  }
}
    `;

export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>) => {
    
    return useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      {
    mutationKey: ['CreatePost'],
    mutationFn: useGraphqlClient<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument),
    ...options
  }
    )};

export const DeleteUpvoteDocument = `
    mutation DeleteUpvote($upvoteId: String!) {
  deleteUpvoteByRowId(input: {rowId: $upvoteId}) {
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
    mutationFn: useGraphqlClient<DeleteUpvoteMutation, DeleteUpvoteMutationVariables>(DeleteUpvoteDocument),
    ...options
  }
    )};

export const UpvotePostDocument = `
    mutation UpvotePost($upvote: UpvoteInput!) {
  createUpvote(input: {upvote: $upvote}) {
    clientMutationId
  }
}
    `;

export const useUpvotePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpvotePostMutation, TError, UpvotePostMutationVariables, TContext>) => {
    
    return useMutation<UpvotePostMutation, TError, UpvotePostMutationVariables, TContext>(
      {
    mutationKey: ['UpvotePost'],
    mutationFn: useGraphqlClient<UpvotePostMutation, UpvotePostMutationVariables>(UpvotePostDocument),
    ...options
  }
    )};

export const PostsDocument = `
    query Posts($projectId: String!) {
  allPosts(filter: {projectId: {equalTo: $projectId}}) {
    nodes {
      rowId
      createdAt
      title
      description
      userByAuthorId {
        walletAddress
      }
      upvotesByPostId {
        nodes {
          rowId
        }
      }
    }
  }
}
    `;

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
    queryFn: useGraphqlClient<PostsQuery, PostsQueryVariables>(PostsDocument).bind(null, variables),
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
    const query = useGraphqlClient<PostsQuery, PostsQueryVariables>(PostsDocument)
    return useInfiniteQuery<PostsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Posts.infinite', variables],
      queryFn: (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      ...restOptions
    }
  })()
    )};

useInfinitePostsQuery.getKey = (variables: PostsQueryVariables) => ['Posts.infinite', variables];

export const OrganizationDocument = `
    query Organization($slug: String!) {
  allOrganizations(condition: {slug: $slug}) {
    nodes {
      rowId
      name
      slug
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
    queryFn: useGraphqlClient<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument).bind(null, variables),
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
    const query = useGraphqlClient<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument)
    return useInfiniteQuery<OrganizationQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Organization.infinite', variables],
      queryFn: (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      ...restOptions
    }
  })()
    )};

useInfiniteOrganizationQuery.getKey = (variables: OrganizationQueryVariables) => ['Organization.infinite', variables];

export const ProjectsDocument = `
    query Projects($organizationId: String) {
  allProjects(filter: {organizationId: {equalTo: $organizationId}}) {
    nodes {
      rowId
      name
      description
      slug
    }
  }
}
    `;

export const useProjectsQuery = <
      TData = ProjectsQuery,
      TError = unknown
    >(
      variables?: ProjectsQueryVariables,
      options?: Omit<UseQueryOptions<ProjectsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProjectsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProjectsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Projects'] : ['Projects', variables],
    queryFn: useGraphqlClient<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument).bind(null, variables),
    ...options
  }
    )};

useProjectsQuery.getKey = (variables?: ProjectsQueryVariables) => variables === undefined ? ['Projects'] : ['Projects', variables];

export const useInfiniteProjectsQuery = <
      TData = InfiniteData<ProjectsQuery>,
      TError = unknown
    >(
      variables: ProjectsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ProjectsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ProjectsQuery, TError, TData>['queryKey'] }
    ) => {
    const query = useGraphqlClient<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument)
    return useInfiniteQuery<ProjectsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['Projects.infinite'] : ['Projects.infinite', variables],
      queryFn: (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      ...restOptions
    }
  })()
    )};

useInfiniteProjectsQuery.getKey = (variables?: ProjectsQueryVariables) => variables === undefined ? ['Projects.infinite'] : ['Projects.infinite', variables];

export const ProjectDocument = `
    query Project($organizationId: String, $projectSlug: String!) {
  allProjects(
    filter: {and: {organizationId: {equalTo: $organizationId}, slug: {equalTo: $projectSlug}}}
  ) {
    nodes {
      rowId
      name
      image
      description
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
    queryFn: useGraphqlClient<ProjectQuery, ProjectQueryVariables>(ProjectDocument).bind(null, variables),
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
    const query = useGraphqlClient<ProjectQuery, ProjectQueryVariables>(ProjectDocument)
    return useInfiniteQuery<ProjectQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Project.infinite', variables],
      queryFn: (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      ...restOptions
    }
  })()
    )};

useInfiniteProjectQuery.getKey = (variables: ProjectQueryVariables) => ['Project.infinite', variables];
