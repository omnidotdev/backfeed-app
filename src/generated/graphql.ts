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
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: { input: any; output: any; }
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: { input: string; output: string; }
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: string; output: string; }
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) and, if it has a timezone, [RFC
   * 3339](https://datatracker.ietf.org/doc/html/rfc3339) standards. Input values
   * that do not conform to both ISO 8601 and RFC 3339 may be coerced, which may lead
   * to unexpected results.
   */
  Datetime: { input: Date; output: Date; }
  /** Represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: { input: string; output: string; }
};

export type Attachment = {
  __typename?: 'Attachment';
  createdAt: Scalars['Datetime']['output'];
  fileSize?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  kind: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  /** Reads a single `Post` that is related to this `Attachment`. */
  post?: Maybe<Post>;
  postId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  storageKey: Scalars['String']['output'];
  url: Scalars['String']['output'];
  /** Reads a single `User` that is related to this `Attachment`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type AttachmentAggregates = {
  __typename?: 'AttachmentAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<AttachmentAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<AttachmentDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<AttachmentMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<AttachmentMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<AttachmentStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<AttachmentStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<AttachmentSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<AttachmentVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<AttachmentVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `Attachment` object types. */
export type AttachmentAggregatesFilter = {
  /** Mean average aggregate over matching `Attachment` objects. */
  average?: InputMaybe<AttachmentAverageAggregateFilter>;
  /** Distinct count aggregate over matching `Attachment` objects. */
  distinctCount?: InputMaybe<AttachmentDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Attachment` object to be included within the aggregate. */
  filter?: InputMaybe<AttachmentFilter>;
  /** Maximum aggregate over matching `Attachment` objects. */
  max?: InputMaybe<AttachmentMaxAggregateFilter>;
  /** Minimum aggregate over matching `Attachment` objects. */
  min?: InputMaybe<AttachmentMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `Attachment` objects. */
  stddevPopulation?: InputMaybe<AttachmentStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `Attachment` objects. */
  stddevSample?: InputMaybe<AttachmentStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `Attachment` objects. */
  sum?: InputMaybe<AttachmentSumAggregateFilter>;
  /** Population variance aggregate over matching `Attachment` objects. */
  variancePopulation?: InputMaybe<AttachmentVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `Attachment` objects. */
  varianceSample?: InputMaybe<AttachmentVarianceSampleAggregateFilter>;
};

export type AttachmentAverageAggregateFilter = {
  fileSize?: InputMaybe<BigFloatFilter>;
  height?: InputMaybe<BigFloatFilter>;
  width?: InputMaybe<BigFloatFilter>;
};

export type AttachmentAverageAggregates = {
  __typename?: 'AttachmentAverageAggregates';
  /** Mean average of fileSize across the matching connection */
  fileSize?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of height across the matching connection */
  height?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of width across the matching connection */
  width?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `Attachment` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AttachmentCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `fileSize` field. */
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `height` field. */
  height?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `kind` field. */
  kind?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `mimeType` field. */
  mimeType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `postId` field. */
  postId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `storageKey` field. */
  storageKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `width` field. */
  width?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `Attachment` values. */
export type AttachmentConnection = {
  __typename?: 'AttachmentConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<AttachmentAggregates>;
  /** A list of edges which contains the `Attachment` and cursor to aid in pagination. */
  edges: Array<Maybe<AttachmentEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<AttachmentAggregates>>;
  /** A list of `Attachment` objects. */
  nodes: Array<Maybe<Attachment>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Attachment` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Attachment` values. */
export type AttachmentConnectionGroupedAggregatesArgs = {
  groupBy: Array<AttachmentGroupBy>;
  having?: InputMaybe<AttachmentHavingInput>;
};

export type AttachmentDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  fileSize?: InputMaybe<BigIntFilter>;
  height?: InputMaybe<BigIntFilter>;
  kind?: InputMaybe<BigIntFilter>;
  mimeType?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  storageKey?: InputMaybe<BigIntFilter>;
  url?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
  width?: InputMaybe<BigIntFilter>;
};

export type AttachmentDistinctCountAggregates = {
  __typename?: 'AttachmentDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of fileSize across the matching connection */
  fileSize?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of height across the matching connection */
  height?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of kind across the matching connection */
  kind?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of mimeType across the matching connection */
  mimeType?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of postId across the matching connection */
  postId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of storageKey across the matching connection */
  storageKey?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of url across the matching connection */
  url?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of userId across the matching connection */
  userId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of width across the matching connection */
  width?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Attachment` edge in the connection. */
export type AttachmentEdge = {
  __typename?: 'AttachmentEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Attachment` at the end of the edge. */
  node?: Maybe<Attachment>;
};

/** A filter to be used against `Attachment` object types. All fields are combined with a logical ‘and.’ */
export type AttachmentFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AttachmentFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `fileSize` field. */
  fileSize?: InputMaybe<IntFilter>;
  /** Filter by the object’s `height` field. */
  height?: InputMaybe<IntFilter>;
  /** Filter by the object’s `kind` field. */
  kind?: InputMaybe<StringFilter>;
  /** Filter by the object’s `mimeType` field. */
  mimeType?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AttachmentFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AttachmentFilter>>;
  /** Filter by the object’s `post` relation. */
  post?: InputMaybe<PostFilter>;
  /** Filter by the object’s `postId` field. */
  postId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `storageKey` field. */
  storageKey?: InputMaybe<StringFilter>;
  /** Filter by the object’s `url` field. */
  url?: InputMaybe<StringFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `width` field. */
  width?: InputMaybe<IntFilter>;
};

/** Grouping methods for `Attachment` for usage during aggregation. */
export enum AttachmentGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  FileSize = 'FILE_SIZE',
  Height = 'HEIGHT',
  Kind = 'KIND',
  MimeType = 'MIME_TYPE',
  PostId = 'POST_ID',
  StorageKey = 'STORAGE_KEY',
  Url = 'URL',
  UserId = 'USER_ID',
  Width = 'WIDTH'
}

export type AttachmentHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  fileSize?: InputMaybe<HavingIntFilter>;
  height?: InputMaybe<HavingIntFilter>;
  width?: InputMaybe<HavingIntFilter>;
};

export type AttachmentHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  fileSize?: InputMaybe<HavingIntFilter>;
  height?: InputMaybe<HavingIntFilter>;
  width?: InputMaybe<HavingIntFilter>;
};

/** Conditions for `Attachment` aggregates. */
export type AttachmentHavingInput = {
  AND?: InputMaybe<Array<AttachmentHavingInput>>;
  OR?: InputMaybe<Array<AttachmentHavingInput>>;
  average?: InputMaybe<AttachmentHavingAverageInput>;
  distinctCount?: InputMaybe<AttachmentHavingDistinctCountInput>;
  max?: InputMaybe<AttachmentHavingMaxInput>;
  min?: InputMaybe<AttachmentHavingMinInput>;
  stddevPopulation?: InputMaybe<AttachmentHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<AttachmentHavingStddevSampleInput>;
  sum?: InputMaybe<AttachmentHavingSumInput>;
  variancePopulation?: InputMaybe<AttachmentHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<AttachmentHavingVarianceSampleInput>;
};

export type AttachmentHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  fileSize?: InputMaybe<HavingIntFilter>;
  height?: InputMaybe<HavingIntFilter>;
  width?: InputMaybe<HavingIntFilter>;
};

export type AttachmentHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  fileSize?: InputMaybe<HavingIntFilter>;
  height?: InputMaybe<HavingIntFilter>;
  width?: InputMaybe<HavingIntFilter>;
};

export type AttachmentHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  fileSize?: InputMaybe<HavingIntFilter>;
  height?: InputMaybe<HavingIntFilter>;
  width?: InputMaybe<HavingIntFilter>;
};

export type AttachmentHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  fileSize?: InputMaybe<HavingIntFilter>;
  height?: InputMaybe<HavingIntFilter>;
  width?: InputMaybe<HavingIntFilter>;
};

export type AttachmentHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  fileSize?: InputMaybe<HavingIntFilter>;
  height?: InputMaybe<HavingIntFilter>;
  width?: InputMaybe<HavingIntFilter>;
};

export type AttachmentHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  fileSize?: InputMaybe<HavingIntFilter>;
  height?: InputMaybe<HavingIntFilter>;
  width?: InputMaybe<HavingIntFilter>;
};

export type AttachmentHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  fileSize?: InputMaybe<HavingIntFilter>;
  height?: InputMaybe<HavingIntFilter>;
  width?: InputMaybe<HavingIntFilter>;
};

/** An input for mutations affecting `Attachment` */
export type AttachmentInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  kind: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  postId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  storageKey: Scalars['String']['input'];
  url: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type AttachmentMaxAggregateFilter = {
  fileSize?: InputMaybe<IntFilter>;
  height?: InputMaybe<IntFilter>;
  width?: InputMaybe<IntFilter>;
};

export type AttachmentMaxAggregates = {
  __typename?: 'AttachmentMaxAggregates';
  /** Maximum of fileSize across the matching connection */
  fileSize?: Maybe<Scalars['Int']['output']>;
  /** Maximum of height across the matching connection */
  height?: Maybe<Scalars['Int']['output']>;
  /** Maximum of width across the matching connection */
  width?: Maybe<Scalars['Int']['output']>;
};

export type AttachmentMinAggregateFilter = {
  fileSize?: InputMaybe<IntFilter>;
  height?: InputMaybe<IntFilter>;
  width?: InputMaybe<IntFilter>;
};

export type AttachmentMinAggregates = {
  __typename?: 'AttachmentMinAggregates';
  /** Minimum of fileSize across the matching connection */
  fileSize?: Maybe<Scalars['Int']['output']>;
  /** Minimum of height across the matching connection */
  height?: Maybe<Scalars['Int']['output']>;
  /** Minimum of width across the matching connection */
  width?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `Attachment`. */
export enum AttachmentOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  FileSizeAsc = 'FILE_SIZE_ASC',
  FileSizeDesc = 'FILE_SIZE_DESC',
  HeightAsc = 'HEIGHT_ASC',
  HeightDesc = 'HEIGHT_DESC',
  KindAsc = 'KIND_ASC',
  KindDesc = 'KIND_DESC',
  MimeTypeAsc = 'MIME_TYPE_ASC',
  MimeTypeDesc = 'MIME_TYPE_DESC',
  Natural = 'NATURAL',
  PostIdAsc = 'POST_ID_ASC',
  PostIdDesc = 'POST_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StorageKeyAsc = 'STORAGE_KEY_ASC',
  StorageKeyDesc = 'STORAGE_KEY_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  WidthAsc = 'WIDTH_ASC',
  WidthDesc = 'WIDTH_DESC'
}

/** Represents an update to a `Attachment`. Fields that are set will be updated. */
export type AttachmentPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  storageKey?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type AttachmentStddevPopulationAggregateFilter = {
  fileSize?: InputMaybe<BigFloatFilter>;
  height?: InputMaybe<BigFloatFilter>;
  width?: InputMaybe<BigFloatFilter>;
};

export type AttachmentStddevPopulationAggregates = {
  __typename?: 'AttachmentStddevPopulationAggregates';
  /** Population standard deviation of fileSize across the matching connection */
  fileSize?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of height across the matching connection */
  height?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of width across the matching connection */
  width?: Maybe<Scalars['BigFloat']['output']>;
};

export type AttachmentStddevSampleAggregateFilter = {
  fileSize?: InputMaybe<BigFloatFilter>;
  height?: InputMaybe<BigFloatFilter>;
  width?: InputMaybe<BigFloatFilter>;
};

export type AttachmentStddevSampleAggregates = {
  __typename?: 'AttachmentStddevSampleAggregates';
  /** Sample standard deviation of fileSize across the matching connection */
  fileSize?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of height across the matching connection */
  height?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of width across the matching connection */
  width?: Maybe<Scalars['BigFloat']['output']>;
};

export type AttachmentSumAggregateFilter = {
  fileSize?: InputMaybe<BigIntFilter>;
  height?: InputMaybe<BigIntFilter>;
  width?: InputMaybe<BigIntFilter>;
};

export type AttachmentSumAggregates = {
  __typename?: 'AttachmentSumAggregates';
  /** Sum of fileSize across the matching connection */
  fileSize: Scalars['BigInt']['output'];
  /** Sum of height across the matching connection */
  height: Scalars['BigInt']['output'];
  /** Sum of width across the matching connection */
  width: Scalars['BigInt']['output'];
};

export type AttachmentVariancePopulationAggregateFilter = {
  fileSize?: InputMaybe<BigFloatFilter>;
  height?: InputMaybe<BigFloatFilter>;
  width?: InputMaybe<BigFloatFilter>;
};

export type AttachmentVariancePopulationAggregates = {
  __typename?: 'AttachmentVariancePopulationAggregates';
  /** Population variance of fileSize across the matching connection */
  fileSize?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of height across the matching connection */
  height?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of width across the matching connection */
  width?: Maybe<Scalars['BigFloat']['output']>;
};

export type AttachmentVarianceSampleAggregateFilter = {
  fileSize?: InputMaybe<BigFloatFilter>;
  height?: InputMaybe<BigFloatFilter>;
  width?: InputMaybe<BigFloatFilter>;
};

export type AttachmentVarianceSampleAggregates = {
  __typename?: 'AttachmentVarianceSampleAggregates';
  /** Sample variance of fileSize across the matching connection */
  fileSize?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of height across the matching connection */
  height?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of width across the matching connection */
  width?: Maybe<Scalars['BigFloat']['output']>;
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

export type ChangePostStatusInput = {
  note?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['UUID']['input'];
  statusTemplateId?: InputMaybe<Scalars['UUID']['input']>;
};

export type ChangePostStatusPayload = {
  __typename?: 'ChangePostStatusPayload';
  id: Scalars['UUID']['output'];
  statusTemplateId?: Maybe<Scalars['UUID']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  /** Reads and enables pagination through a set of `Comment`. */
  childComments: CommentConnection;
  createdAt: Scalars['Datetime']['output'];
  message?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Comment` that is related to this `Comment`. */
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `Post` that is related to this `Comment`. */
  post?: Maybe<Post>;
  postId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Reaction`. */
  reactions: ReactionConnection;
  rowId: Scalars['UUID']['output'];
  updatedAt: Scalars['Datetime']['output'];
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


export type CommentReactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReactionCondition>;
  filter?: InputMaybe<ReactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReactionOrderBy>>;
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
  /** Filter by the object’s `reactions` relation. */
  reactions?: InputMaybe<CommentToManyReactionFilter>;
  /** Some related `reactions` exist. */
  reactionsExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  ReactionsCountAsc = 'REACTIONS_COUNT_ASC',
  ReactionsCountDesc = 'REACTIONS_COUNT_DESC',
  ReactionsDistinctCountCommentIdAsc = 'REACTIONS_DISTINCT_COUNT_COMMENT_ID_ASC',
  ReactionsDistinctCountCommentIdDesc = 'REACTIONS_DISTINCT_COUNT_COMMENT_ID_DESC',
  ReactionsDistinctCountCreatedAtAsc = 'REACTIONS_DISTINCT_COUNT_CREATED_AT_ASC',
  ReactionsDistinctCountCreatedAtDesc = 'REACTIONS_DISTINCT_COUNT_CREATED_AT_DESC',
  ReactionsDistinctCountEmojiAsc = 'REACTIONS_DISTINCT_COUNT_EMOJI_ASC',
  ReactionsDistinctCountEmojiDesc = 'REACTIONS_DISTINCT_COUNT_EMOJI_DESC',
  ReactionsDistinctCountPostIdAsc = 'REACTIONS_DISTINCT_COUNT_POST_ID_ASC',
  ReactionsDistinctCountPostIdDesc = 'REACTIONS_DISTINCT_COUNT_POST_ID_DESC',
  ReactionsDistinctCountRowIdAsc = 'REACTIONS_DISTINCT_COUNT_ROW_ID_ASC',
  ReactionsDistinctCountRowIdDesc = 'REACTIONS_DISTINCT_COUNT_ROW_ID_DESC',
  ReactionsDistinctCountUserIdAsc = 'REACTIONS_DISTINCT_COUNT_USER_ID_ASC',
  ReactionsDistinctCountUserIdDesc = 'REACTIONS_DISTINCT_COUNT_USER_ID_DESC',
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

/** A filter to be used against many `Reaction` object types. All fields are combined with a logical ‘and.’ */
export type CommentToManyReactionFilter = {
  /** Aggregates across related `Reaction` match the filter criteria. */
  aggregates?: InputMaybe<ReactionAggregatesFilter>;
  /** Every related `Reaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ReactionFilter>;
  /** No related `Reaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ReactionFilter>;
  /** Some related `Reaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ReactionFilter>;
};

/** All input for the create `Attachment` mutation. */
export type CreateAttachmentInput = {
  /** The `Attachment` to be created by this mutation. */
  attachment: AttachmentInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `Attachment` mutation. */
export type CreateAttachmentPayload = {
  __typename?: 'CreateAttachmentPayload';
  /** The `Attachment` that was created by this mutation. */
  attachment?: Maybe<Attachment>;
  /** An edge for our `Attachment`. May be used by Relay 1. */
  attachmentEdge?: Maybe<AttachmentEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Attachment` mutation. */
export type CreateAttachmentPayloadAttachmentEdgeArgs = {
  orderBy?: Array<AttachmentOrderBy>;
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

/** All input for the create `PostReference` mutation. */
export type CreatePostReferenceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PostReference` to be created by this mutation. */
  postReference: PostReferenceInput;
};

/** The output of our create `PostReference` mutation. */
export type CreatePostReferencePayload = {
  __typename?: 'CreatePostReferencePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `PostReference` that was created by this mutation. */
  postReference?: Maybe<PostReference>;
  /** An edge for our `PostReference`. May be used by Relay 1. */
  postReferenceEdge?: Maybe<PostReferenceEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PostReference` mutation. */
export type CreatePostReferencePayloadPostReferenceEdgeArgs = {
  orderBy?: Array<PostReferenceOrderBy>;
};

/** All input for the create `PostTag` mutation. */
export type CreatePostTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `PostTag` to be created by this mutation. */
  postTag: PostTagInput;
};

/** The output of our create `PostTag` mutation. */
export type CreatePostTagPayload = {
  __typename?: 'CreatePostTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `PostTag` that was created by this mutation. */
  postTag?: Maybe<PostTag>;
  /** An edge for our `PostTag`. May be used by Relay 1. */
  postTagEdge?: Maybe<PostTagEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PostTag` mutation. */
export type CreatePostTagPayloadPostTagEdgeArgs = {
  orderBy?: Array<PostTagOrderBy>;
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

/** All input for the create `ProjectLink` mutation. */
export type CreateProjectLinkInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `ProjectLink` to be created by this mutation. */
  projectLink: ProjectLinkInput;
};

/** The output of our create `ProjectLink` mutation. */
export type CreateProjectLinkPayload = {
  __typename?: 'CreateProjectLinkPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ProjectLink` that was created by this mutation. */
  projectLink?: Maybe<ProjectLink>;
  /** An edge for our `ProjectLink`. May be used by Relay 1. */
  projectLinkEdge?: Maybe<ProjectLinkEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `ProjectLink` mutation. */
export type CreateProjectLinkPayloadProjectLinkEdgeArgs = {
  orderBy?: Array<ProjectLinkOrderBy>;
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

/** All input for the create `Reaction` mutation. */
export type CreateReactionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Reaction` to be created by this mutation. */
  reaction: ReactionInput;
};

/** The output of our create `Reaction` mutation. */
export type CreateReactionPayload = {
  __typename?: 'CreateReactionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Reaction` that was created by this mutation. */
  reaction?: Maybe<Reaction>;
  /** An edge for our `Reaction`. May be used by Relay 1. */
  reactionEdge?: Maybe<ReactionEdge>;
};


/** The output of our create `Reaction` mutation. */
export type CreateReactionPayloadReactionEdgeArgs = {
  orderBy?: Array<ReactionOrderBy>;
};

/** All input for the create `SignalCluster` mutation. */
export type CreateSignalClusterInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SignalCluster` to be created by this mutation. */
  signalCluster: SignalClusterInput;
};

/** The output of our create `SignalCluster` mutation. */
export type CreateSignalClusterPayload = {
  __typename?: 'CreateSignalClusterPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SignalCluster` that was created by this mutation. */
  signalCluster?: Maybe<SignalCluster>;
  /** An edge for our `SignalCluster`. May be used by Relay 1. */
  signalClusterEdge?: Maybe<SignalClusterEdge>;
};


/** The output of our create `SignalCluster` mutation. */
export type CreateSignalClusterPayloadSignalClusterEdgeArgs = {
  orderBy?: Array<SignalClusterOrderBy>;
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

/** All input for the create `Tag` mutation. */
export type CreateTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Tag` to be created by this mutation. */
  tag: TagInput;
};

/** The output of our create `Tag` mutation. */
export type CreateTagPayload = {
  __typename?: 'CreateTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Tag` that was created by this mutation. */
  tag?: Maybe<Tag>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagEdge>;
};


/** The output of our create `Tag` mutation. */
export type CreateTagPayloadTagEdgeArgs = {
  orderBy?: Array<TagOrderBy>;
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

/** All input for the create `WardenSyncQueue` mutation. */
export type CreateWardenSyncQueueInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `WardenSyncQueue` to be created by this mutation. */
  wardenSyncQueue: WardenSyncQueueInput;
};

/** The output of our create `WardenSyncQueue` mutation. */
export type CreateWardenSyncQueuePayload = {
  __typename?: 'CreateWardenSyncQueuePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WardenSyncQueue` that was created by this mutation. */
  wardenSyncQueue?: Maybe<WardenSyncQueue>;
  /** An edge for our `WardenSyncQueue`. May be used by Relay 1. */
  wardenSyncQueueEdge?: Maybe<WardenSyncQueueEdge>;
};


/** The output of our create `WardenSyncQueue` mutation. */
export type CreateWardenSyncQueuePayloadWardenSyncQueueEdgeArgs = {
  orderBy?: Array<WardenSyncQueueOrderBy>;
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

/** All input for the `deleteAttachment` mutation. */
export type DeleteAttachmentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Attachment` mutation. */
export type DeleteAttachmentPayload = {
  __typename?: 'DeleteAttachmentPayload';
  /** The `Attachment` that was deleted by this mutation. */
  attachment?: Maybe<Attachment>;
  /** An edge for our `Attachment`. May be used by Relay 1. */
  attachmentEdge?: Maybe<AttachmentEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Attachment` mutation. */
export type DeleteAttachmentPayloadAttachmentEdgeArgs = {
  orderBy?: Array<AttachmentOrderBy>;
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

/** All input for the `deletePostReference` mutation. */
export type DeletePostReferenceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `PostReference` mutation. */
export type DeletePostReferencePayload = {
  __typename?: 'DeletePostReferencePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `PostReference` that was deleted by this mutation. */
  postReference?: Maybe<PostReference>;
  /** An edge for our `PostReference`. May be used by Relay 1. */
  postReferenceEdge?: Maybe<PostReferenceEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PostReference` mutation. */
export type DeletePostReferencePayloadPostReferenceEdgeArgs = {
  orderBy?: Array<PostReferenceOrderBy>;
};

export type DeletePostStatusChangeInput = {
  rowId: Scalars['UUID']['input'];
};

export type DeletePostStatusChangePayload = {
  __typename?: 'DeletePostStatusChangePayload';
  id: Scalars['UUID']['output'];
};

/** All input for the `deletePostTag` mutation. */
export type DeletePostTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `PostTag` mutation. */
export type DeletePostTagPayload = {
  __typename?: 'DeletePostTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `PostTag` that was deleted by this mutation. */
  postTag?: Maybe<PostTag>;
  /** An edge for our `PostTag`. May be used by Relay 1. */
  postTagEdge?: Maybe<PostTagEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PostTag` mutation. */
export type DeletePostTagPayloadPostTagEdgeArgs = {
  orderBy?: Array<PostTagOrderBy>;
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

/** All input for the `deleteProjectLink` mutation. */
export type DeleteProjectLinkInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `ProjectLink` mutation. */
export type DeleteProjectLinkPayload = {
  __typename?: 'DeleteProjectLinkPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ProjectLink` that was deleted by this mutation. */
  projectLink?: Maybe<ProjectLink>;
  /** An edge for our `ProjectLink`. May be used by Relay 1. */
  projectLinkEdge?: Maybe<ProjectLinkEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `ProjectLink` mutation. */
export type DeleteProjectLinkPayloadProjectLinkEdgeArgs = {
  orderBy?: Array<ProjectLinkOrderBy>;
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

/** All input for the `deleteReaction` mutation. */
export type DeleteReactionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Reaction` mutation. */
export type DeleteReactionPayload = {
  __typename?: 'DeleteReactionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Reaction` that was deleted by this mutation. */
  reaction?: Maybe<Reaction>;
  /** An edge for our `Reaction`. May be used by Relay 1. */
  reactionEdge?: Maybe<ReactionEdge>;
};


/** The output of our delete `Reaction` mutation. */
export type DeleteReactionPayloadReactionEdgeArgs = {
  orderBy?: Array<ReactionOrderBy>;
};

/** All input for the `deleteSignalCluster` mutation. */
export type DeleteSignalClusterInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `SignalCluster` mutation. */
export type DeleteSignalClusterPayload = {
  __typename?: 'DeleteSignalClusterPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SignalCluster` that was deleted by this mutation. */
  signalCluster?: Maybe<SignalCluster>;
  /** An edge for our `SignalCluster`. May be used by Relay 1. */
  signalClusterEdge?: Maybe<SignalClusterEdge>;
};


/** The output of our delete `SignalCluster` mutation. */
export type DeleteSignalClusterPayloadSignalClusterEdgeArgs = {
  orderBy?: Array<SignalClusterOrderBy>;
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

/** All input for the `deleteTag` mutation. */
export type DeleteTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Tag` mutation. */
export type DeleteTagPayload = {
  __typename?: 'DeleteTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Tag` that was deleted by this mutation. */
  tag?: Maybe<Tag>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagEdge>;
};


/** The output of our delete `Tag` mutation. */
export type DeleteTagPayloadTagEdgeArgs = {
  orderBy?: Array<TagOrderBy>;
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

/** All input for the `deleteWardenSyncQueue` mutation. */
export type DeleteWardenSyncQueueInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `WardenSyncQueue` mutation. */
export type DeleteWardenSyncQueuePayload = {
  __typename?: 'DeleteWardenSyncQueuePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WardenSyncQueue` that was deleted by this mutation. */
  wardenSyncQueue?: Maybe<WardenSyncQueue>;
  /** An edge for our `WardenSyncQueue`. May be used by Relay 1. */
  wardenSyncQueueEdge?: Maybe<WardenSyncQueueEdge>;
};


/** The output of our delete `WardenSyncQueue` mutation. */
export type DeleteWardenSyncQueuePayloadWardenSyncQueueEdgeArgs = {
  orderBy?: Array<WardenSyncQueueOrderBy>;
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

export type IngestSignalInput = {
  organizationId: Scalars['UUID']['input'];
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  rawContent: Scalars['String']['input'];
  source: Scalars['String']['input'];
  sourceMetadata?: InputMaybe<Scalars['JSON']['input']>;
};

export type IngestSignalPayload = {
  __typename?: 'IngestSignalPayload';
  id: Scalars['UUID']['output'];
  projectId?: Maybe<Scalars['UUID']['output']>;
  sentiment?: Maybe<Scalars['String']['output']>;
  source: Scalars['String']['output'];
  status: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
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

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Move a post to a status (or clear it) with an optional note, recorded on
   * the status timeline. Admin-only.
   */
  changePostStatus?: Maybe<ChangePostStatusPayload>;
  /** Creates a single `Attachment`. */
  createAttachment?: Maybe<CreateAttachmentPayload>;
  /** Creates a single `Comment`. */
  createComment?: Maybe<CreateCommentPayload>;
  /** Creates a single `Post`. */
  createPost?: Maybe<CreatePostPayload>;
  /** Creates a single `PostReference`. */
  createPostReference?: Maybe<CreatePostReferencePayload>;
  /** Creates a single `PostTag`. */
  createPostTag?: Maybe<CreatePostTagPayload>;
  /** Creates a single `Project`. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a single `ProjectLink`. */
  createProjectLink?: Maybe<CreateProjectLinkPayload>;
  /** Creates a single `ProjectStatusConfig`. */
  createProjectStatusConfig?: Maybe<CreateProjectStatusConfigPayload>;
  /** Creates a single `Reaction`. */
  createReaction?: Maybe<CreateReactionPayload>;
  /** Creates a single `SignalCluster`. */
  createSignalCluster?: Maybe<CreateSignalClusterPayload>;
  /** Creates a single `StatusTemplate`. */
  createStatusTemplate?: Maybe<CreateStatusTemplatePayload>;
  /** Creates a single `Tag`. */
  createTag?: Maybe<CreateTagPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `Vote`. */
  createVote?: Maybe<CreateVotePayload>;
  /** Creates a single `WardenSyncQueue`. */
  createWardenSyncQueue?: Maybe<CreateWardenSyncQueuePayload>;
  /** Deletes a single `Attachment` using a unique key. */
  deleteAttachment?: Maybe<DeleteAttachmentPayload>;
  /** Deletes a single `Comment` using a unique key. */
  deleteComment?: Maybe<DeleteCommentPayload>;
  /** Deletes a single `Post` using a unique key. */
  deletePost?: Maybe<DeletePostPayload>;
  /** Deletes a single `PostReference` using a unique key. */
  deletePostReference?: Maybe<DeletePostReferencePayload>;
  /**
   * Remove a single entry from a post's status timeline. Admin-only. Does not
   * change the post's current status (use changePostStatus for that).
   */
  deletePostStatusChange?: Maybe<DeletePostStatusChangePayload>;
  /** Deletes a single `PostTag` using a unique key. */
  deletePostTag?: Maybe<DeletePostTagPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `ProjectLink` using a unique key. */
  deleteProjectLink?: Maybe<DeleteProjectLinkPayload>;
  /** Deletes a single `ProjectStatusConfig` using a unique key. */
  deleteProjectStatusConfig?: Maybe<DeleteProjectStatusConfigPayload>;
  /** Deletes a single `Reaction` using a unique key. */
  deleteReaction?: Maybe<DeleteReactionPayload>;
  /** Deletes a single `SignalCluster` using a unique key. */
  deleteSignalCluster?: Maybe<DeleteSignalClusterPayload>;
  /** Deletes a single `StatusTemplate` using a unique key. */
  deleteStatusTemplate?: Maybe<DeleteStatusTemplatePayload>;
  /** Deletes a single `Tag` using a unique key. */
  deleteTag?: Maybe<DeleteTagPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `Vote` using a unique key. */
  deleteVote?: Maybe<DeleteVotePayload>;
  /** Deletes a single `WardenSyncQueue` using a unique key. */
  deleteWardenSyncQueue?: Maybe<DeleteWardenSyncQueuePayload>;
  ingestSignal?: Maybe<IngestSignalPayload>;
  promoteSignalToPost?: Maybe<PromoteSignalToPostPayload>;
  /** Update the current user's email notification settings. */
  setNotificationPreference?: Maybe<NotificationPreference>;
  /** Updates a single `Attachment` using a unique key and a patch. */
  updateAttachment?: Maybe<UpdateAttachmentPayload>;
  /** Updates a single `Comment` using a unique key and a patch. */
  updateComment?: Maybe<UpdateCommentPayload>;
  /** Updates a single `Post` using a unique key and a patch. */
  updatePost?: Maybe<UpdatePostPayload>;
  /** Updates a single `PostReference` using a unique key and a patch. */
  updatePostReference?: Maybe<UpdatePostReferencePayload>;
  /** Updates a single `PostTag` using a unique key and a patch. */
  updatePostTag?: Maybe<UpdatePostTagPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a single `ProjectLink` using a unique key and a patch. */
  updateProjectLink?: Maybe<UpdateProjectLinkPayload>;
  /** Updates a single `ProjectStatusConfig` using a unique key and a patch. */
  updateProjectStatusConfig?: Maybe<UpdateProjectStatusConfigPayload>;
  /** Updates a single `Reaction` using a unique key and a patch. */
  updateReaction?: Maybe<UpdateReactionPayload>;
  /** Updates a single `SignalCluster` using a unique key and a patch. */
  updateSignalCluster?: Maybe<UpdateSignalClusterPayload>;
  /** Updates a single `StatusTemplate` using a unique key and a patch. */
  updateStatusTemplate?: Maybe<UpdateStatusTemplatePayload>;
  /** Updates a single `Tag` using a unique key and a patch. */
  updateTag?: Maybe<UpdateTagPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `Vote` using a unique key and a patch. */
  updateVote?: Maybe<UpdateVotePayload>;
  /** Updates a single `WardenSyncQueue` using a unique key and a patch. */
  updateWardenSyncQueue?: Maybe<UpdateWardenSyncQueuePayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationChangePostStatusArgs = {
  input: ChangePostStatusInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAttachmentArgs = {
  input: CreateAttachmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePostReferenceArgs = {
  input: CreatePostReferenceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePostTagArgs = {
  input: CreatePostTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectLinkArgs = {
  input: CreateProjectLinkInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectStatusConfigArgs = {
  input: CreateProjectStatusConfigInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateReactionArgs = {
  input: CreateReactionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSignalClusterArgs = {
  input: CreateSignalClusterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateStatusTemplateArgs = {
  input: CreateStatusTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTagArgs = {
  input: CreateTagInput;
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
export type MutationCreateWardenSyncQueueArgs = {
  input: CreateWardenSyncQueueInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAttachmentArgs = {
  input: DeleteAttachmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostReferenceArgs = {
  input: DeletePostReferenceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostStatusChangeArgs = {
  input: DeletePostStatusChangeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostTagArgs = {
  input: DeletePostTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectLinkArgs = {
  input: DeleteProjectLinkInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectStatusConfigArgs = {
  input: DeleteProjectStatusConfigInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteReactionArgs = {
  input: DeleteReactionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSignalClusterArgs = {
  input: DeleteSignalClusterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteStatusTemplateArgs = {
  input: DeleteStatusTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagArgs = {
  input: DeleteTagInput;
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
export type MutationDeleteWardenSyncQueueArgs = {
  input: DeleteWardenSyncQueueInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationIngestSignalArgs = {
  input: IngestSignalInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationPromoteSignalToPostArgs = {
  input: PromoteSignalToPostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSetNotificationPreferenceArgs = {
  input: SetNotificationPreferenceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAttachmentArgs = {
  input: UpdateAttachmentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostReferenceArgs = {
  input: UpdatePostReferenceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostTagArgs = {
  input: UpdatePostTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectLinkArgs = {
  input: UpdateProjectLinkInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectStatusConfigArgs = {
  input: UpdateProjectStatusConfigInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateReactionArgs = {
  input: UpdateReactionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSignalClusterArgs = {
  input: UpdateSignalClusterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateStatusTemplateArgs = {
  input: UpdateStatusTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
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
export type MutationUpdateWardenSyncQueueArgs = {
  input: UpdateWardenSyncQueueInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
};

export type NotificationPreference = {
  __typename?: 'NotificationPreference';
  /** Email me when a post I reported or upvoted changes status. */
  postUpdates: Scalars['Boolean']['output'];
};

/** The currently authenticated user. */
export type Observer = {
  __typename?: 'Observer';
  email: Scalars['String']['output'];
  identityProviderId: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  username?: Maybe<Scalars['String']['output']>;
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
  aiTags?: Maybe<Scalars['JSON']['output']>;
  /** Reads and enables pagination through a set of `Attachment`. */
  attachments: AttachmentConnection;
  /** Reads a single `SignalCluster` that is related to this `Post`. */
  cluster?: Maybe<SignalCluster>;
  clusterId?: Maybe<Scalars['UUID']['output']>;
  /** Reads and enables pagination through a set of `Comment`. */
  comments: CommentConnection;
  createdAt: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Post` that is related to this `Post`. */
  duplicateOf?: Maybe<Post>;
  duplicateOfId?: Maybe<Scalars['UUID']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  /** Reads and enables pagination through a set of `PostReference`. */
  postReferencesByTargetPostId: PostReferenceConnection;
  /** Reads and enables pagination through a set of `PostStatusChange`. */
  postStatusChanges: PostStatusChangeConnection;
  /** Reads and enables pagination through a set of `PostTag`. */
  postTags: PostTagConnection;
  /** Reads and enables pagination through a set of `Post`. */
  postsByDuplicateOfId: PostConnection;
  /** Reads a single `Project` that is related to this `Post`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Reaction`. */
  reactions: ReactionConnection;
  rowId: Scalars['UUID']['output'];
  sentiment?: Maybe<Scalars['String']['output']>;
  shippedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Signal`. */
  signals: SignalConnection;
  source?: Maybe<Scalars['String']['output']>;
  /** Reads a single `StatusTemplate` that is related to this `Post`. */
  statusTemplate?: Maybe<StatusTemplate>;
  statusTemplateId?: Maybe<Scalars['UUID']['output']>;
  statusUpdatedAt: Scalars['Datetime']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `Post`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Vote`. */
  votes: VoteConnection;
};


export type PostAttachmentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AttachmentCondition>;
  filter?: InputMaybe<AttachmentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AttachmentOrderBy>>;
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


export type PostPostReferencesByTargetPostIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostReferenceCondition>;
  filter?: InputMaybe<PostReferenceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostReferenceOrderBy>>;
};


export type PostPostStatusChangesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostStatusChangeCondition>;
  filter?: InputMaybe<PostStatusChangeFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostStatusChangeOrderBy>>;
};


export type PostPostTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostTagCondition>;
  filter?: InputMaybe<PostTagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostTagOrderBy>>;
};


export type PostPostsByDuplicateOfIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostCondition>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type PostReactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReactionCondition>;
  filter?: InputMaybe<ReactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReactionOrderBy>>;
};


export type PostSignalsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SignalCondition>;
  filter?: InputMaybe<SignalFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SignalOrderBy>>;
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
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<PostAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<PostDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<PostMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<PostMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<PostStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<PostStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<PostSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<PostVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<PostVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `Post` object types. */
export type PostAggregatesFilter = {
  /** Mean average aggregate over matching `Post` objects. */
  average?: InputMaybe<PostAverageAggregateFilter>;
  /** Distinct count aggregate over matching `Post` objects. */
  distinctCount?: InputMaybe<PostDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Post` object to be included within the aggregate. */
  filter?: InputMaybe<PostFilter>;
  /** Maximum aggregate over matching `Post` objects. */
  max?: InputMaybe<PostMaxAggregateFilter>;
  /** Minimum aggregate over matching `Post` objects. */
  min?: InputMaybe<PostMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `Post` objects. */
  stddevPopulation?: InputMaybe<PostStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `Post` objects. */
  stddevSample?: InputMaybe<PostStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `Post` objects. */
  sum?: InputMaybe<PostSumAggregateFilter>;
  /** Population variance aggregate over matching `Post` objects. */
  variancePopulation?: InputMaybe<PostVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `Post` objects. */
  varianceSample?: InputMaybe<PostVarianceSampleAggregateFilter>;
};

export type PostAverageAggregateFilter = {
  number?: InputMaybe<BigFloatFilter>;
};

export type PostAverageAggregates = {
  __typename?: 'PostAverageAggregates';
  /** Mean average of number across the matching connection */
  number?: Maybe<Scalars['BigFloat']['output']>;
};

/** A condition to be used against `Post` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PostCondition = {
  /** Checks for equality with the object’s `clusterId` field. */
  clusterId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `duplicateOfId` field. */
  duplicateOfId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `number` field. */
  number?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `sentiment` field. */
  sentiment?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `shippedAt` field. */
  shippedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `source` field. */
  source?: InputMaybe<Scalars['String']['input']>;
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
  aiTags?: InputMaybe<BigIntFilter>;
  clusterId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  description?: InputMaybe<BigIntFilter>;
  duplicateOfId?: InputMaybe<BigIntFilter>;
  number?: InputMaybe<BigIntFilter>;
  projectId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  sentiment?: InputMaybe<BigIntFilter>;
  shippedAt?: InputMaybe<BigIntFilter>;
  source?: InputMaybe<BigIntFilter>;
  statusTemplateId?: InputMaybe<BigIntFilter>;
  statusUpdatedAt?: InputMaybe<BigIntFilter>;
  title?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
};

export type PostDistinctCountAggregates = {
  __typename?: 'PostDistinctCountAggregates';
  /** Distinct count of aiTags across the matching connection */
  aiTags?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of clusterId across the matching connection */
  clusterId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of duplicateOfId across the matching connection */
  duplicateOfId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of number across the matching connection */
  number?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of sentiment across the matching connection */
  sentiment?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of shippedAt across the matching connection */
  shippedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of source across the matching connection */
  source?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `attachments` relation. */
  attachments?: InputMaybe<PostToManyAttachmentFilter>;
  /** Some related `attachments` exist. */
  attachmentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `cluster` relation. */
  cluster?: InputMaybe<SignalClusterFilter>;
  /** A related `cluster` exists. */
  clusterExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `clusterId` field. */
  clusterId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `comments` relation. */
  comments?: InputMaybe<PostToManyCommentFilter>;
  /** Some related `comments` exist. */
  commentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `duplicateOf` relation. */
  duplicateOf?: InputMaybe<PostFilter>;
  /** A related `duplicateOf` exists. */
  duplicateOfExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `duplicateOfId` field. */
  duplicateOfId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PostFilter>;
  /** Filter by the object’s `number` field. */
  number?: InputMaybe<IntFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PostFilter>>;
  /** Filter by the object’s `postReferencesByTargetPostId` relation. */
  postReferencesByTargetPostId?: InputMaybe<PostToManyPostReferenceFilter>;
  /** Some related `postReferencesByTargetPostId` exist. */
  postReferencesByTargetPostIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `postStatusChanges` relation. */
  postStatusChanges?: InputMaybe<PostToManyPostStatusChangeFilter>;
  /** Some related `postStatusChanges` exist. */
  postStatusChangesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `postTags` relation. */
  postTags?: InputMaybe<PostToManyPostTagFilter>;
  /** Some related `postTags` exist. */
  postTagsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `postsByDuplicateOfId` relation. */
  postsByDuplicateOfId?: InputMaybe<PostToManyPostFilter>;
  /** Some related `postsByDuplicateOfId` exist. */
  postsByDuplicateOfIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `reactions` relation. */
  reactions?: InputMaybe<PostToManyReactionFilter>;
  /** Some related `reactions` exist. */
  reactionsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `sentiment` field. */
  sentiment?: InputMaybe<StringFilter>;
  /** Filter by the object’s `shippedAt` field. */
  shippedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `signals` relation. */
  signals?: InputMaybe<PostToManySignalFilter>;
  /** Some related `signals` exist. */
  signalsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `source` field. */
  source?: InputMaybe<StringFilter>;
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
  AiTags = 'AI_TAGS',
  ClusterId = 'CLUSTER_ID',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  DuplicateOfId = 'DUPLICATE_OF_ID',
  Number = 'NUMBER',
  ProjectId = 'PROJECT_ID',
  Sentiment = 'SENTIMENT',
  ShippedAt = 'SHIPPED_AT',
  ShippedAtTruncatedToDay = 'SHIPPED_AT_TRUNCATED_TO_DAY',
  ShippedAtTruncatedToHour = 'SHIPPED_AT_TRUNCATED_TO_HOUR',
  Source = 'SOURCE',
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
  number?: InputMaybe<HavingIntFilter>;
  shippedAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  shippedAt?: InputMaybe<HavingDatetimeFilter>;
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
  number?: InputMaybe<HavingIntFilter>;
  shippedAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  shippedAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  shippedAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  shippedAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  shippedAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  shippedAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  shippedAt?: InputMaybe<HavingDatetimeFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Post` */
export type PostInput = {
  aiTags?: InputMaybe<Scalars['JSON']['input']>;
  clusterId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duplicateOfId?: InputMaybe<Scalars['UUID']['input']>;
  projectId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  sentiment?: InputMaybe<Scalars['String']['input']>;
  shippedAt?: InputMaybe<Scalars['Datetime']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  statusTemplateId?: InputMaybe<Scalars['UUID']['input']>;
  statusUpdatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
};

export type PostMaxAggregateFilter = {
  number?: InputMaybe<IntFilter>;
};

export type PostMaxAggregates = {
  __typename?: 'PostMaxAggregates';
  /** Maximum of number across the matching connection */
  number?: Maybe<Scalars['Int']['output']>;
};

export type PostMinAggregateFilter = {
  number?: InputMaybe<IntFilter>;
};

export type PostMinAggregates = {
  __typename?: 'PostMinAggregates';
  /** Minimum of number across the matching connection */
  number?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `Post`. */
export enum PostOrderBy {
  AttachmentsAverageFileSizeAsc = 'ATTACHMENTS_AVERAGE_FILE_SIZE_ASC',
  AttachmentsAverageFileSizeDesc = 'ATTACHMENTS_AVERAGE_FILE_SIZE_DESC',
  AttachmentsAverageHeightAsc = 'ATTACHMENTS_AVERAGE_HEIGHT_ASC',
  AttachmentsAverageHeightDesc = 'ATTACHMENTS_AVERAGE_HEIGHT_DESC',
  AttachmentsAverageWidthAsc = 'ATTACHMENTS_AVERAGE_WIDTH_ASC',
  AttachmentsAverageWidthDesc = 'ATTACHMENTS_AVERAGE_WIDTH_DESC',
  AttachmentsCountAsc = 'ATTACHMENTS_COUNT_ASC',
  AttachmentsCountDesc = 'ATTACHMENTS_COUNT_DESC',
  AttachmentsDistinctCountCreatedAtAsc = 'ATTACHMENTS_DISTINCT_COUNT_CREATED_AT_ASC',
  AttachmentsDistinctCountCreatedAtDesc = 'ATTACHMENTS_DISTINCT_COUNT_CREATED_AT_DESC',
  AttachmentsDistinctCountFileSizeAsc = 'ATTACHMENTS_DISTINCT_COUNT_FILE_SIZE_ASC',
  AttachmentsDistinctCountFileSizeDesc = 'ATTACHMENTS_DISTINCT_COUNT_FILE_SIZE_DESC',
  AttachmentsDistinctCountHeightAsc = 'ATTACHMENTS_DISTINCT_COUNT_HEIGHT_ASC',
  AttachmentsDistinctCountHeightDesc = 'ATTACHMENTS_DISTINCT_COUNT_HEIGHT_DESC',
  AttachmentsDistinctCountKindAsc = 'ATTACHMENTS_DISTINCT_COUNT_KIND_ASC',
  AttachmentsDistinctCountKindDesc = 'ATTACHMENTS_DISTINCT_COUNT_KIND_DESC',
  AttachmentsDistinctCountMimeTypeAsc = 'ATTACHMENTS_DISTINCT_COUNT_MIME_TYPE_ASC',
  AttachmentsDistinctCountMimeTypeDesc = 'ATTACHMENTS_DISTINCT_COUNT_MIME_TYPE_DESC',
  AttachmentsDistinctCountPostIdAsc = 'ATTACHMENTS_DISTINCT_COUNT_POST_ID_ASC',
  AttachmentsDistinctCountPostIdDesc = 'ATTACHMENTS_DISTINCT_COUNT_POST_ID_DESC',
  AttachmentsDistinctCountRowIdAsc = 'ATTACHMENTS_DISTINCT_COUNT_ROW_ID_ASC',
  AttachmentsDistinctCountRowIdDesc = 'ATTACHMENTS_DISTINCT_COUNT_ROW_ID_DESC',
  AttachmentsDistinctCountStorageKeyAsc = 'ATTACHMENTS_DISTINCT_COUNT_STORAGE_KEY_ASC',
  AttachmentsDistinctCountStorageKeyDesc = 'ATTACHMENTS_DISTINCT_COUNT_STORAGE_KEY_DESC',
  AttachmentsDistinctCountUrlAsc = 'ATTACHMENTS_DISTINCT_COUNT_URL_ASC',
  AttachmentsDistinctCountUrlDesc = 'ATTACHMENTS_DISTINCT_COUNT_URL_DESC',
  AttachmentsDistinctCountUserIdAsc = 'ATTACHMENTS_DISTINCT_COUNT_USER_ID_ASC',
  AttachmentsDistinctCountUserIdDesc = 'ATTACHMENTS_DISTINCT_COUNT_USER_ID_DESC',
  AttachmentsDistinctCountWidthAsc = 'ATTACHMENTS_DISTINCT_COUNT_WIDTH_ASC',
  AttachmentsDistinctCountWidthDesc = 'ATTACHMENTS_DISTINCT_COUNT_WIDTH_DESC',
  AttachmentsMaxFileSizeAsc = 'ATTACHMENTS_MAX_FILE_SIZE_ASC',
  AttachmentsMaxFileSizeDesc = 'ATTACHMENTS_MAX_FILE_SIZE_DESC',
  AttachmentsMaxHeightAsc = 'ATTACHMENTS_MAX_HEIGHT_ASC',
  AttachmentsMaxHeightDesc = 'ATTACHMENTS_MAX_HEIGHT_DESC',
  AttachmentsMaxWidthAsc = 'ATTACHMENTS_MAX_WIDTH_ASC',
  AttachmentsMaxWidthDesc = 'ATTACHMENTS_MAX_WIDTH_DESC',
  AttachmentsMinFileSizeAsc = 'ATTACHMENTS_MIN_FILE_SIZE_ASC',
  AttachmentsMinFileSizeDesc = 'ATTACHMENTS_MIN_FILE_SIZE_DESC',
  AttachmentsMinHeightAsc = 'ATTACHMENTS_MIN_HEIGHT_ASC',
  AttachmentsMinHeightDesc = 'ATTACHMENTS_MIN_HEIGHT_DESC',
  AttachmentsMinWidthAsc = 'ATTACHMENTS_MIN_WIDTH_ASC',
  AttachmentsMinWidthDesc = 'ATTACHMENTS_MIN_WIDTH_DESC',
  AttachmentsStddevPopulationFileSizeAsc = 'ATTACHMENTS_STDDEV_POPULATION_FILE_SIZE_ASC',
  AttachmentsStddevPopulationFileSizeDesc = 'ATTACHMENTS_STDDEV_POPULATION_FILE_SIZE_DESC',
  AttachmentsStddevPopulationHeightAsc = 'ATTACHMENTS_STDDEV_POPULATION_HEIGHT_ASC',
  AttachmentsStddevPopulationHeightDesc = 'ATTACHMENTS_STDDEV_POPULATION_HEIGHT_DESC',
  AttachmentsStddevPopulationWidthAsc = 'ATTACHMENTS_STDDEV_POPULATION_WIDTH_ASC',
  AttachmentsStddevPopulationWidthDesc = 'ATTACHMENTS_STDDEV_POPULATION_WIDTH_DESC',
  AttachmentsStddevSampleFileSizeAsc = 'ATTACHMENTS_STDDEV_SAMPLE_FILE_SIZE_ASC',
  AttachmentsStddevSampleFileSizeDesc = 'ATTACHMENTS_STDDEV_SAMPLE_FILE_SIZE_DESC',
  AttachmentsStddevSampleHeightAsc = 'ATTACHMENTS_STDDEV_SAMPLE_HEIGHT_ASC',
  AttachmentsStddevSampleHeightDesc = 'ATTACHMENTS_STDDEV_SAMPLE_HEIGHT_DESC',
  AttachmentsStddevSampleWidthAsc = 'ATTACHMENTS_STDDEV_SAMPLE_WIDTH_ASC',
  AttachmentsStddevSampleWidthDesc = 'ATTACHMENTS_STDDEV_SAMPLE_WIDTH_DESC',
  AttachmentsSumFileSizeAsc = 'ATTACHMENTS_SUM_FILE_SIZE_ASC',
  AttachmentsSumFileSizeDesc = 'ATTACHMENTS_SUM_FILE_SIZE_DESC',
  AttachmentsSumHeightAsc = 'ATTACHMENTS_SUM_HEIGHT_ASC',
  AttachmentsSumHeightDesc = 'ATTACHMENTS_SUM_HEIGHT_DESC',
  AttachmentsSumWidthAsc = 'ATTACHMENTS_SUM_WIDTH_ASC',
  AttachmentsSumWidthDesc = 'ATTACHMENTS_SUM_WIDTH_DESC',
  AttachmentsVariancePopulationFileSizeAsc = 'ATTACHMENTS_VARIANCE_POPULATION_FILE_SIZE_ASC',
  AttachmentsVariancePopulationFileSizeDesc = 'ATTACHMENTS_VARIANCE_POPULATION_FILE_SIZE_DESC',
  AttachmentsVariancePopulationHeightAsc = 'ATTACHMENTS_VARIANCE_POPULATION_HEIGHT_ASC',
  AttachmentsVariancePopulationHeightDesc = 'ATTACHMENTS_VARIANCE_POPULATION_HEIGHT_DESC',
  AttachmentsVariancePopulationWidthAsc = 'ATTACHMENTS_VARIANCE_POPULATION_WIDTH_ASC',
  AttachmentsVariancePopulationWidthDesc = 'ATTACHMENTS_VARIANCE_POPULATION_WIDTH_DESC',
  AttachmentsVarianceSampleFileSizeAsc = 'ATTACHMENTS_VARIANCE_SAMPLE_FILE_SIZE_ASC',
  AttachmentsVarianceSampleFileSizeDesc = 'ATTACHMENTS_VARIANCE_SAMPLE_FILE_SIZE_DESC',
  AttachmentsVarianceSampleHeightAsc = 'ATTACHMENTS_VARIANCE_SAMPLE_HEIGHT_ASC',
  AttachmentsVarianceSampleHeightDesc = 'ATTACHMENTS_VARIANCE_SAMPLE_HEIGHT_DESC',
  AttachmentsVarianceSampleWidthAsc = 'ATTACHMENTS_VARIANCE_SAMPLE_WIDTH_ASC',
  AttachmentsVarianceSampleWidthDesc = 'ATTACHMENTS_VARIANCE_SAMPLE_WIDTH_DESC',
  ClusterIdAsc = 'CLUSTER_ID_ASC',
  ClusterIdDesc = 'CLUSTER_ID_DESC',
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
  DuplicateOfIdAsc = 'DUPLICATE_OF_ID_ASC',
  DuplicateOfIdDesc = 'DUPLICATE_OF_ID_DESC',
  Natural = 'NATURAL',
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
  PostsByDuplicateOfIdAverageNumberAsc = 'POSTS_BY_DUPLICATE_OF_ID_AVERAGE_NUMBER_ASC',
  PostsByDuplicateOfIdAverageNumberDesc = 'POSTS_BY_DUPLICATE_OF_ID_AVERAGE_NUMBER_DESC',
  PostsByDuplicateOfIdCountAsc = 'POSTS_BY_DUPLICATE_OF_ID_COUNT_ASC',
  PostsByDuplicateOfIdCountDesc = 'POSTS_BY_DUPLICATE_OF_ID_COUNT_DESC',
  PostsByDuplicateOfIdDistinctCountAiTagsAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_AI_TAGS_ASC',
  PostsByDuplicateOfIdDistinctCountAiTagsDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_AI_TAGS_DESC',
  PostsByDuplicateOfIdDistinctCountClusterIdAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_CLUSTER_ID_ASC',
  PostsByDuplicateOfIdDistinctCountClusterIdDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_CLUSTER_ID_DESC',
  PostsByDuplicateOfIdDistinctCountCreatedAtAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  PostsByDuplicateOfIdDistinctCountCreatedAtDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  PostsByDuplicateOfIdDistinctCountDescriptionAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_DESCRIPTION_ASC',
  PostsByDuplicateOfIdDistinctCountDescriptionDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_DESCRIPTION_DESC',
  PostsByDuplicateOfIdDistinctCountDuplicateOfIdAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_DUPLICATE_OF_ID_ASC',
  PostsByDuplicateOfIdDistinctCountDuplicateOfIdDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_DUPLICATE_OF_ID_DESC',
  PostsByDuplicateOfIdDistinctCountNumberAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_NUMBER_ASC',
  PostsByDuplicateOfIdDistinctCountNumberDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_NUMBER_DESC',
  PostsByDuplicateOfIdDistinctCountProjectIdAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_PROJECT_ID_ASC',
  PostsByDuplicateOfIdDistinctCountProjectIdDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_PROJECT_ID_DESC',
  PostsByDuplicateOfIdDistinctCountRowIdAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_ROW_ID_ASC',
  PostsByDuplicateOfIdDistinctCountRowIdDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_ROW_ID_DESC',
  PostsByDuplicateOfIdDistinctCountSentimentAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_SENTIMENT_ASC',
  PostsByDuplicateOfIdDistinctCountSentimentDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_SENTIMENT_DESC',
  PostsByDuplicateOfIdDistinctCountShippedAtAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_SHIPPED_AT_ASC',
  PostsByDuplicateOfIdDistinctCountShippedAtDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_SHIPPED_AT_DESC',
  PostsByDuplicateOfIdDistinctCountSourceAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_SOURCE_ASC',
  PostsByDuplicateOfIdDistinctCountSourceDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_SOURCE_DESC',
  PostsByDuplicateOfIdDistinctCountStatusTemplateIdAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_STATUS_TEMPLATE_ID_ASC',
  PostsByDuplicateOfIdDistinctCountStatusTemplateIdDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_STATUS_TEMPLATE_ID_DESC',
  PostsByDuplicateOfIdDistinctCountStatusUpdatedAtAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_STATUS_UPDATED_AT_ASC',
  PostsByDuplicateOfIdDistinctCountStatusUpdatedAtDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_STATUS_UPDATED_AT_DESC',
  PostsByDuplicateOfIdDistinctCountTitleAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_TITLE_ASC',
  PostsByDuplicateOfIdDistinctCountTitleDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_TITLE_DESC',
  PostsByDuplicateOfIdDistinctCountUpdatedAtAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_UPDATED_AT_ASC',
  PostsByDuplicateOfIdDistinctCountUpdatedAtDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_UPDATED_AT_DESC',
  PostsByDuplicateOfIdDistinctCountUserIdAsc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_USER_ID_ASC',
  PostsByDuplicateOfIdDistinctCountUserIdDesc = 'POSTS_BY_DUPLICATE_OF_ID_DISTINCT_COUNT_USER_ID_DESC',
  PostsByDuplicateOfIdMaxNumberAsc = 'POSTS_BY_DUPLICATE_OF_ID_MAX_NUMBER_ASC',
  PostsByDuplicateOfIdMaxNumberDesc = 'POSTS_BY_DUPLICATE_OF_ID_MAX_NUMBER_DESC',
  PostsByDuplicateOfIdMinNumberAsc = 'POSTS_BY_DUPLICATE_OF_ID_MIN_NUMBER_ASC',
  PostsByDuplicateOfIdMinNumberDesc = 'POSTS_BY_DUPLICATE_OF_ID_MIN_NUMBER_DESC',
  PostsByDuplicateOfIdStddevPopulationNumberAsc = 'POSTS_BY_DUPLICATE_OF_ID_STDDEV_POPULATION_NUMBER_ASC',
  PostsByDuplicateOfIdStddevPopulationNumberDesc = 'POSTS_BY_DUPLICATE_OF_ID_STDDEV_POPULATION_NUMBER_DESC',
  PostsByDuplicateOfIdStddevSampleNumberAsc = 'POSTS_BY_DUPLICATE_OF_ID_STDDEV_SAMPLE_NUMBER_ASC',
  PostsByDuplicateOfIdStddevSampleNumberDesc = 'POSTS_BY_DUPLICATE_OF_ID_STDDEV_SAMPLE_NUMBER_DESC',
  PostsByDuplicateOfIdSumNumberAsc = 'POSTS_BY_DUPLICATE_OF_ID_SUM_NUMBER_ASC',
  PostsByDuplicateOfIdSumNumberDesc = 'POSTS_BY_DUPLICATE_OF_ID_SUM_NUMBER_DESC',
  PostsByDuplicateOfIdVariancePopulationNumberAsc = 'POSTS_BY_DUPLICATE_OF_ID_VARIANCE_POPULATION_NUMBER_ASC',
  PostsByDuplicateOfIdVariancePopulationNumberDesc = 'POSTS_BY_DUPLICATE_OF_ID_VARIANCE_POPULATION_NUMBER_DESC',
  PostsByDuplicateOfIdVarianceSampleNumberAsc = 'POSTS_BY_DUPLICATE_OF_ID_VARIANCE_SAMPLE_NUMBER_ASC',
  PostsByDuplicateOfIdVarianceSampleNumberDesc = 'POSTS_BY_DUPLICATE_OF_ID_VARIANCE_SAMPLE_NUMBER_DESC',
  PostReferencesByTargetPostIdCountAsc = 'POST_REFERENCES_BY_TARGET_POST_ID_COUNT_ASC',
  PostReferencesByTargetPostIdCountDesc = 'POST_REFERENCES_BY_TARGET_POST_ID_COUNT_DESC',
  PostReferencesByTargetPostIdDistinctCountCreatedAtAsc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  PostReferencesByTargetPostIdDistinctCountCreatedAtDesc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  PostReferencesByTargetPostIdDistinctCountFiredAtAsc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_FIRED_AT_ASC',
  PostReferencesByTargetPostIdDistinctCountFiredAtDesc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_FIRED_AT_DESC',
  PostReferencesByTargetPostIdDistinctCountKeywordAsc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_KEYWORD_ASC',
  PostReferencesByTargetPostIdDistinctCountKeywordDesc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_KEYWORD_DESC',
  PostReferencesByTargetPostIdDistinctCountOrganizationIdAsc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  PostReferencesByTargetPostIdDistinctCountOrganizationIdDesc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  PostReferencesByTargetPostIdDistinctCountRefKindAsc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_REF_KIND_ASC',
  PostReferencesByTargetPostIdDistinctCountRefKindDesc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_REF_KIND_DESC',
  PostReferencesByTargetPostIdDistinctCountRowIdAsc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_ROW_ID_ASC',
  PostReferencesByTargetPostIdDistinctCountRowIdDesc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_ROW_ID_DESC',
  PostReferencesByTargetPostIdDistinctCountSourceIdAsc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_SOURCE_ID_ASC',
  PostReferencesByTargetPostIdDistinctCountSourceIdDesc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_SOURCE_ID_DESC',
  PostReferencesByTargetPostIdDistinctCountSourceTypeAsc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_SOURCE_TYPE_ASC',
  PostReferencesByTargetPostIdDistinctCountSourceTypeDesc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_SOURCE_TYPE_DESC',
  PostReferencesByTargetPostIdDistinctCountTargetPostIdAsc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_TARGET_POST_ID_ASC',
  PostReferencesByTargetPostIdDistinctCountTargetPostIdDesc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_TARGET_POST_ID_DESC',
  PostReferencesByTargetPostIdDistinctCountUpdatedAtAsc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_UPDATED_AT_ASC',
  PostReferencesByTargetPostIdDistinctCountUpdatedAtDesc = 'POST_REFERENCES_BY_TARGET_POST_ID_DISTINCT_COUNT_UPDATED_AT_DESC',
  PostStatusChangesCountAsc = 'POST_STATUS_CHANGES_COUNT_ASC',
  PostStatusChangesCountDesc = 'POST_STATUS_CHANGES_COUNT_DESC',
  PostStatusChangesDistinctCountChangedByIdAsc = 'POST_STATUS_CHANGES_DISTINCT_COUNT_CHANGED_BY_ID_ASC',
  PostStatusChangesDistinctCountChangedByIdDesc = 'POST_STATUS_CHANGES_DISTINCT_COUNT_CHANGED_BY_ID_DESC',
  PostStatusChangesDistinctCountCreatedAtAsc = 'POST_STATUS_CHANGES_DISTINCT_COUNT_CREATED_AT_ASC',
  PostStatusChangesDistinctCountCreatedAtDesc = 'POST_STATUS_CHANGES_DISTINCT_COUNT_CREATED_AT_DESC',
  PostStatusChangesDistinctCountNoteAsc = 'POST_STATUS_CHANGES_DISTINCT_COUNT_NOTE_ASC',
  PostStatusChangesDistinctCountNoteDesc = 'POST_STATUS_CHANGES_DISTINCT_COUNT_NOTE_DESC',
  PostStatusChangesDistinctCountPostIdAsc = 'POST_STATUS_CHANGES_DISTINCT_COUNT_POST_ID_ASC',
  PostStatusChangesDistinctCountPostIdDesc = 'POST_STATUS_CHANGES_DISTINCT_COUNT_POST_ID_DESC',
  PostStatusChangesDistinctCountRowIdAsc = 'POST_STATUS_CHANGES_DISTINCT_COUNT_ROW_ID_ASC',
  PostStatusChangesDistinctCountRowIdDesc = 'POST_STATUS_CHANGES_DISTINCT_COUNT_ROW_ID_DESC',
  PostStatusChangesDistinctCountToStatusTemplateIdAsc = 'POST_STATUS_CHANGES_DISTINCT_COUNT_TO_STATUS_TEMPLATE_ID_ASC',
  PostStatusChangesDistinctCountToStatusTemplateIdDesc = 'POST_STATUS_CHANGES_DISTINCT_COUNT_TO_STATUS_TEMPLATE_ID_DESC',
  PostTagsCountAsc = 'POST_TAGS_COUNT_ASC',
  PostTagsCountDesc = 'POST_TAGS_COUNT_DESC',
  PostTagsDistinctCountCreatedAtAsc = 'POST_TAGS_DISTINCT_COUNT_CREATED_AT_ASC',
  PostTagsDistinctCountCreatedAtDesc = 'POST_TAGS_DISTINCT_COUNT_CREATED_AT_DESC',
  PostTagsDistinctCountPostIdAsc = 'POST_TAGS_DISTINCT_COUNT_POST_ID_ASC',
  PostTagsDistinctCountPostIdDesc = 'POST_TAGS_DISTINCT_COUNT_POST_ID_DESC',
  PostTagsDistinctCountRowIdAsc = 'POST_TAGS_DISTINCT_COUNT_ROW_ID_ASC',
  PostTagsDistinctCountRowIdDesc = 'POST_TAGS_DISTINCT_COUNT_ROW_ID_DESC',
  PostTagsDistinctCountTagIdAsc = 'POST_TAGS_DISTINCT_COUNT_TAG_ID_ASC',
  PostTagsDistinctCountTagIdDesc = 'POST_TAGS_DISTINCT_COUNT_TAG_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  ReactionsCountAsc = 'REACTIONS_COUNT_ASC',
  ReactionsCountDesc = 'REACTIONS_COUNT_DESC',
  ReactionsDistinctCountCommentIdAsc = 'REACTIONS_DISTINCT_COUNT_COMMENT_ID_ASC',
  ReactionsDistinctCountCommentIdDesc = 'REACTIONS_DISTINCT_COUNT_COMMENT_ID_DESC',
  ReactionsDistinctCountCreatedAtAsc = 'REACTIONS_DISTINCT_COUNT_CREATED_AT_ASC',
  ReactionsDistinctCountCreatedAtDesc = 'REACTIONS_DISTINCT_COUNT_CREATED_AT_DESC',
  ReactionsDistinctCountEmojiAsc = 'REACTIONS_DISTINCT_COUNT_EMOJI_ASC',
  ReactionsDistinctCountEmojiDesc = 'REACTIONS_DISTINCT_COUNT_EMOJI_DESC',
  ReactionsDistinctCountPostIdAsc = 'REACTIONS_DISTINCT_COUNT_POST_ID_ASC',
  ReactionsDistinctCountPostIdDesc = 'REACTIONS_DISTINCT_COUNT_POST_ID_DESC',
  ReactionsDistinctCountRowIdAsc = 'REACTIONS_DISTINCT_COUNT_ROW_ID_ASC',
  ReactionsDistinctCountRowIdDesc = 'REACTIONS_DISTINCT_COUNT_ROW_ID_DESC',
  ReactionsDistinctCountUserIdAsc = 'REACTIONS_DISTINCT_COUNT_USER_ID_ASC',
  ReactionsDistinctCountUserIdDesc = 'REACTIONS_DISTINCT_COUNT_USER_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SentimentAsc = 'SENTIMENT_ASC',
  SentimentDesc = 'SENTIMENT_DESC',
  ShippedAtAsc = 'SHIPPED_AT_ASC',
  ShippedAtDesc = 'SHIPPED_AT_DESC',
  SignalsCountAsc = 'SIGNALS_COUNT_ASC',
  SignalsCountDesc = 'SIGNALS_COUNT_DESC',
  SignalsDistinctCountAiTagsAsc = 'SIGNALS_DISTINCT_COUNT_AI_TAGS_ASC',
  SignalsDistinctCountAiTagsDesc = 'SIGNALS_DISTINCT_COUNT_AI_TAGS_DESC',
  SignalsDistinctCountClusterIdAsc = 'SIGNALS_DISTINCT_COUNT_CLUSTER_ID_ASC',
  SignalsDistinctCountClusterIdDesc = 'SIGNALS_DISTINCT_COUNT_CLUSTER_ID_DESC',
  SignalsDistinctCountCreatedAtAsc = 'SIGNALS_DISTINCT_COUNT_CREATED_AT_ASC',
  SignalsDistinctCountCreatedAtDesc = 'SIGNALS_DISTINCT_COUNT_CREATED_AT_DESC',
  SignalsDistinctCountOrganizationIdAsc = 'SIGNALS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  SignalsDistinctCountOrganizationIdDesc = 'SIGNALS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  SignalsDistinctCountPostIdAsc = 'SIGNALS_DISTINCT_COUNT_POST_ID_ASC',
  SignalsDistinctCountPostIdDesc = 'SIGNALS_DISTINCT_COUNT_POST_ID_DESC',
  SignalsDistinctCountProjectIdAsc = 'SIGNALS_DISTINCT_COUNT_PROJECT_ID_ASC',
  SignalsDistinctCountProjectIdDesc = 'SIGNALS_DISTINCT_COUNT_PROJECT_ID_DESC',
  SignalsDistinctCountRawContentAsc = 'SIGNALS_DISTINCT_COUNT_RAW_CONTENT_ASC',
  SignalsDistinctCountRawContentDesc = 'SIGNALS_DISTINCT_COUNT_RAW_CONTENT_DESC',
  SignalsDistinctCountRowIdAsc = 'SIGNALS_DISTINCT_COUNT_ROW_ID_ASC',
  SignalsDistinctCountRowIdDesc = 'SIGNALS_DISTINCT_COUNT_ROW_ID_DESC',
  SignalsDistinctCountSentimentAsc = 'SIGNALS_DISTINCT_COUNT_SENTIMENT_ASC',
  SignalsDistinctCountSentimentDesc = 'SIGNALS_DISTINCT_COUNT_SENTIMENT_DESC',
  SignalsDistinctCountSourceAsc = 'SIGNALS_DISTINCT_COUNT_SOURCE_ASC',
  SignalsDistinctCountSourceDesc = 'SIGNALS_DISTINCT_COUNT_SOURCE_DESC',
  SignalsDistinctCountSourceMetadataAsc = 'SIGNALS_DISTINCT_COUNT_SOURCE_METADATA_ASC',
  SignalsDistinctCountSourceMetadataDesc = 'SIGNALS_DISTINCT_COUNT_SOURCE_METADATA_DESC',
  SignalsDistinctCountStatusAsc = 'SIGNALS_DISTINCT_COUNT_STATUS_ASC',
  SignalsDistinctCountStatusDesc = 'SIGNALS_DISTINCT_COUNT_STATUS_DESC',
  SignalsDistinctCountTypeAsc = 'SIGNALS_DISTINCT_COUNT_TYPE_ASC',
  SignalsDistinctCountTypeDesc = 'SIGNALS_DISTINCT_COUNT_TYPE_DESC',
  SignalsDistinctCountUpdatedAtAsc = 'SIGNALS_DISTINCT_COUNT_UPDATED_AT_ASC',
  SignalsDistinctCountUpdatedAtDesc = 'SIGNALS_DISTINCT_COUNT_UPDATED_AT_DESC',
  SignalsDistinctCountUserIdAsc = 'SIGNALS_DISTINCT_COUNT_USER_ID_ASC',
  SignalsDistinctCountUserIdDesc = 'SIGNALS_DISTINCT_COUNT_USER_ID_DESC',
  SourceAsc = 'SOURCE_ASC',
  SourceDesc = 'SOURCE_DESC',
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
  VotesAverageWeightAsc = 'VOTES_AVERAGE_WEIGHT_ASC',
  VotesAverageWeightDesc = 'VOTES_AVERAGE_WEIGHT_DESC',
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
  VotesDistinctCountVoteTypeDesc = 'VOTES_DISTINCT_COUNT_VOTE_TYPE_DESC',
  VotesDistinctCountWeightAsc = 'VOTES_DISTINCT_COUNT_WEIGHT_ASC',
  VotesDistinctCountWeightDesc = 'VOTES_DISTINCT_COUNT_WEIGHT_DESC',
  VotesMaxWeightAsc = 'VOTES_MAX_WEIGHT_ASC',
  VotesMaxWeightDesc = 'VOTES_MAX_WEIGHT_DESC',
  VotesMinWeightAsc = 'VOTES_MIN_WEIGHT_ASC',
  VotesMinWeightDesc = 'VOTES_MIN_WEIGHT_DESC',
  VotesStddevPopulationWeightAsc = 'VOTES_STDDEV_POPULATION_WEIGHT_ASC',
  VotesStddevPopulationWeightDesc = 'VOTES_STDDEV_POPULATION_WEIGHT_DESC',
  VotesStddevSampleWeightAsc = 'VOTES_STDDEV_SAMPLE_WEIGHT_ASC',
  VotesStddevSampleWeightDesc = 'VOTES_STDDEV_SAMPLE_WEIGHT_DESC',
  VotesSumWeightAsc = 'VOTES_SUM_WEIGHT_ASC',
  VotesSumWeightDesc = 'VOTES_SUM_WEIGHT_DESC',
  VotesVariancePopulationWeightAsc = 'VOTES_VARIANCE_POPULATION_WEIGHT_ASC',
  VotesVariancePopulationWeightDesc = 'VOTES_VARIANCE_POPULATION_WEIGHT_DESC',
  VotesVarianceSampleWeightAsc = 'VOTES_VARIANCE_SAMPLE_WEIGHT_ASC',
  VotesVarianceSampleWeightDesc = 'VOTES_VARIANCE_SAMPLE_WEIGHT_DESC'
}

/** Represents an update to a `Post`. Fields that are set will be updated. */
export type PostPatch = {
  aiTags?: InputMaybe<Scalars['JSON']['input']>;
  clusterId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duplicateOfId?: InputMaybe<Scalars['UUID']['input']>;
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  sentiment?: InputMaybe<Scalars['String']['input']>;
  shippedAt?: InputMaybe<Scalars['Datetime']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  statusTemplateId?: InputMaybe<Scalars['UUID']['input']>;
  statusUpdatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type PostReference = {
  __typename?: 'PostReference';
  createdAt: Scalars['Datetime']['output'];
  firedAt?: Maybe<Scalars['Datetime']['output']>;
  keyword?: Maybe<Scalars['String']['output']>;
  organizationId: Scalars['String']['output'];
  refKind: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  sourceId: Scalars['UUID']['output'];
  sourceType: Scalars['String']['output'];
  /** Reads a single `Post` that is related to this `PostReference`. */
  targetPost?: Maybe<Post>;
  targetPostId: Scalars['UUID']['output'];
  updatedAt: Scalars['Datetime']['output'];
};

export type PostReferenceAggregates = {
  __typename?: 'PostReferenceAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<PostReferenceDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `PostReference` object types. */
export type PostReferenceAggregatesFilter = {
  /** Distinct count aggregate over matching `PostReference` objects. */
  distinctCount?: InputMaybe<PostReferenceDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `PostReference` object to be included within the aggregate. */
  filter?: InputMaybe<PostReferenceFilter>;
};

/**
 * A condition to be used against `PostReference` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PostReferenceCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `firedAt` field. */
  firedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `keyword` field. */
  keyword?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `refKind` field. */
  refKind?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `sourceId` field. */
  sourceId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `sourceType` field. */
  sourceType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `targetPostId` field. */
  targetPostId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `PostReference` values. */
export type PostReferenceConnection = {
  __typename?: 'PostReferenceConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<PostReferenceAggregates>;
  /** A list of edges which contains the `PostReference` and cursor to aid in pagination. */
  edges: Array<Maybe<PostReferenceEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<PostReferenceAggregates>>;
  /** A list of `PostReference` objects. */
  nodes: Array<Maybe<PostReference>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PostReference` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `PostReference` values. */
export type PostReferenceConnectionGroupedAggregatesArgs = {
  groupBy: Array<PostReferenceGroupBy>;
  having?: InputMaybe<PostReferenceHavingInput>;
};

export type PostReferenceDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  firedAt?: InputMaybe<BigIntFilter>;
  keyword?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  refKind?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  sourceId?: InputMaybe<BigIntFilter>;
  sourceType?: InputMaybe<BigIntFilter>;
  targetPostId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
};

export type PostReferenceDistinctCountAggregates = {
  __typename?: 'PostReferenceDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of firedAt across the matching connection */
  firedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of keyword across the matching connection */
  keyword?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of refKind across the matching connection */
  refKind?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of sourceId across the matching connection */
  sourceId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of sourceType across the matching connection */
  sourceType?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of targetPostId across the matching connection */
  targetPostId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `PostReference` edge in the connection. */
export type PostReferenceEdge = {
  __typename?: 'PostReferenceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PostReference` at the end of the edge. */
  node?: Maybe<PostReference>;
};

/** A filter to be used against `PostReference` object types. All fields are combined with a logical ‘and.’ */
export type PostReferenceFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PostReferenceFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `firedAt` field. */
  firedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `keyword` field. */
  keyword?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PostReferenceFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PostReferenceFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `refKind` field. */
  refKind?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `sourceId` field. */
  sourceId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `sourceType` field. */
  sourceType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `targetPost` relation. */
  targetPost?: InputMaybe<PostFilter>;
  /** Filter by the object’s `targetPostId` field. */
  targetPostId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `PostReference` for usage during aggregation. */
export enum PostReferenceGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  FiredAt = 'FIRED_AT',
  FiredAtTruncatedToDay = 'FIRED_AT_TRUNCATED_TO_DAY',
  FiredAtTruncatedToHour = 'FIRED_AT_TRUNCATED_TO_HOUR',
  Keyword = 'KEYWORD',
  OrganizationId = 'ORGANIZATION_ID',
  RefKind = 'REF_KIND',
  SourceId = 'SOURCE_ID',
  SourceType = 'SOURCE_TYPE',
  TargetPostId = 'TARGET_POST_ID',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type PostReferenceHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  firedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostReferenceHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  firedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `PostReference` aggregates. */
export type PostReferenceHavingInput = {
  AND?: InputMaybe<Array<PostReferenceHavingInput>>;
  OR?: InputMaybe<Array<PostReferenceHavingInput>>;
  average?: InputMaybe<PostReferenceHavingAverageInput>;
  distinctCount?: InputMaybe<PostReferenceHavingDistinctCountInput>;
  max?: InputMaybe<PostReferenceHavingMaxInput>;
  min?: InputMaybe<PostReferenceHavingMinInput>;
  stddevPopulation?: InputMaybe<PostReferenceHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<PostReferenceHavingStddevSampleInput>;
  sum?: InputMaybe<PostReferenceHavingSumInput>;
  variancePopulation?: InputMaybe<PostReferenceHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<PostReferenceHavingVarianceSampleInput>;
};

export type PostReferenceHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  firedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostReferenceHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  firedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostReferenceHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  firedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostReferenceHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  firedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostReferenceHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  firedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostReferenceHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  firedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostReferenceHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  firedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `PostReference` */
export type PostReferenceInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  firedAt?: InputMaybe<Scalars['Datetime']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['String']['input'];
  refKind: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  sourceId: Scalars['UUID']['input'];
  sourceType: Scalars['String']['input'];
  targetPostId: Scalars['UUID']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `PostReference`. */
export enum PostReferenceOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  FiredAtAsc = 'FIRED_AT_ASC',
  FiredAtDesc = 'FIRED_AT_DESC',
  KeywordAsc = 'KEYWORD_ASC',
  KeywordDesc = 'KEYWORD_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RefKindAsc = 'REF_KIND_ASC',
  RefKindDesc = 'REF_KIND_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SourceIdAsc = 'SOURCE_ID_ASC',
  SourceIdDesc = 'SOURCE_ID_DESC',
  SourceTypeAsc = 'SOURCE_TYPE_ASC',
  SourceTypeDesc = 'SOURCE_TYPE_DESC',
  TargetPostIdAsc = 'TARGET_POST_ID_ASC',
  TargetPostIdDesc = 'TARGET_POST_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `PostReference`. Fields that are set will be updated. */
export type PostReferencePatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  firedAt?: InputMaybe<Scalars['Datetime']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  refKind?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  sourceId?: InputMaybe<Scalars['UUID']['input']>;
  sourceType?: InputMaybe<Scalars['String']['input']>;
  targetPostId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type PostStatusChange = {
  __typename?: 'PostStatusChange';
  /** Reads a single `User` that is related to this `PostStatusChange`. */
  changedBy?: Maybe<User>;
  changedById?: Maybe<Scalars['UUID']['output']>;
  createdAt: Scalars['Datetime']['output'];
  note?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Post` that is related to this `PostStatusChange`. */
  post?: Maybe<Post>;
  postId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `StatusTemplate` that is related to this `PostStatusChange`. */
  toStatusTemplate?: Maybe<StatusTemplate>;
  toStatusTemplateId?: Maybe<Scalars['UUID']['output']>;
};

export type PostStatusChangeAggregates = {
  __typename?: 'PostStatusChangeAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<PostStatusChangeDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `PostStatusChange` object types. */
export type PostStatusChangeAggregatesFilter = {
  /** Distinct count aggregate over matching `PostStatusChange` objects. */
  distinctCount?: InputMaybe<PostStatusChangeDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `PostStatusChange` object to be included within the aggregate. */
  filter?: InputMaybe<PostStatusChangeFilter>;
};

/**
 * A condition to be used against `PostStatusChange` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PostStatusChangeCondition = {
  /** Checks for equality with the object’s `changedById` field. */
  changedById?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `note` field. */
  note?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `postId` field. */
  postId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `toStatusTemplateId` field. */
  toStatusTemplateId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `PostStatusChange` values. */
export type PostStatusChangeConnection = {
  __typename?: 'PostStatusChangeConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<PostStatusChangeAggregates>;
  /** A list of edges which contains the `PostStatusChange` and cursor to aid in pagination. */
  edges: Array<Maybe<PostStatusChangeEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<PostStatusChangeAggregates>>;
  /** A list of `PostStatusChange` objects. */
  nodes: Array<Maybe<PostStatusChange>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PostStatusChange` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `PostStatusChange` values. */
export type PostStatusChangeConnectionGroupedAggregatesArgs = {
  groupBy: Array<PostStatusChangeGroupBy>;
  having?: InputMaybe<PostStatusChangeHavingInput>;
};

export type PostStatusChangeDistinctCountAggregateFilter = {
  changedById?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  note?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  toStatusTemplateId?: InputMaybe<BigIntFilter>;
};

export type PostStatusChangeDistinctCountAggregates = {
  __typename?: 'PostStatusChangeDistinctCountAggregates';
  /** Distinct count of changedById across the matching connection */
  changedById?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of note across the matching connection */
  note?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of postId across the matching connection */
  postId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of toStatusTemplateId across the matching connection */
  toStatusTemplateId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `PostStatusChange` edge in the connection. */
export type PostStatusChangeEdge = {
  __typename?: 'PostStatusChangeEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PostStatusChange` at the end of the edge. */
  node?: Maybe<PostStatusChange>;
};

/** A filter to be used against `PostStatusChange` object types. All fields are combined with a logical ‘and.’ */
export type PostStatusChangeFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PostStatusChangeFilter>>;
  /** Filter by the object’s `changedBy` relation. */
  changedBy?: InputMaybe<UserFilter>;
  /** A related `changedBy` exists. */
  changedByExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `changedById` field. */
  changedById?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PostStatusChangeFilter>;
  /** Filter by the object’s `note` field. */
  note?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PostStatusChangeFilter>>;
  /** Filter by the object’s `post` relation. */
  post?: InputMaybe<PostFilter>;
  /** Filter by the object’s `postId` field. */
  postId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `toStatusTemplate` relation. */
  toStatusTemplate?: InputMaybe<StatusTemplateFilter>;
  /** A related `toStatusTemplate` exists. */
  toStatusTemplateExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `toStatusTemplateId` field. */
  toStatusTemplateId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `PostStatusChange` for usage during aggregation. */
export enum PostStatusChangeGroupBy {
  ChangedById = 'CHANGED_BY_ID',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Note = 'NOTE',
  PostId = 'POST_ID',
  ToStatusTemplateId = 'TO_STATUS_TEMPLATE_ID'
}

export type PostStatusChangeHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusChangeHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `PostStatusChange` aggregates. */
export type PostStatusChangeHavingInput = {
  AND?: InputMaybe<Array<PostStatusChangeHavingInput>>;
  OR?: InputMaybe<Array<PostStatusChangeHavingInput>>;
  average?: InputMaybe<PostStatusChangeHavingAverageInput>;
  distinctCount?: InputMaybe<PostStatusChangeHavingDistinctCountInput>;
  max?: InputMaybe<PostStatusChangeHavingMaxInput>;
  min?: InputMaybe<PostStatusChangeHavingMinInput>;
  stddevPopulation?: InputMaybe<PostStatusChangeHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<PostStatusChangeHavingStddevSampleInput>;
  sum?: InputMaybe<PostStatusChangeHavingSumInput>;
  variancePopulation?: InputMaybe<PostStatusChangeHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<PostStatusChangeHavingVarianceSampleInput>;
};

export type PostStatusChangeHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusChangeHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusChangeHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusChangeHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusChangeHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusChangeHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostStatusChangeHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `PostStatusChange`. */
export enum PostStatusChangeOrderBy {
  ChangedByIdAsc = 'CHANGED_BY_ID_ASC',
  ChangedByIdDesc = 'CHANGED_BY_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  NoteAsc = 'NOTE_ASC',
  NoteDesc = 'NOTE_DESC',
  PostIdAsc = 'POST_ID_ASC',
  PostIdDesc = 'POST_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  ToStatusTemplateIdAsc = 'TO_STATUS_TEMPLATE_ID_ASC',
  ToStatusTemplateIdDesc = 'TO_STATUS_TEMPLATE_ID_DESC'
}

export type PostStddevPopulationAggregateFilter = {
  number?: InputMaybe<BigFloatFilter>;
};

export type PostStddevPopulationAggregates = {
  __typename?: 'PostStddevPopulationAggregates';
  /** Population standard deviation of number across the matching connection */
  number?: Maybe<Scalars['BigFloat']['output']>;
};

export type PostStddevSampleAggregateFilter = {
  number?: InputMaybe<BigFloatFilter>;
};

export type PostStddevSampleAggregates = {
  __typename?: 'PostStddevSampleAggregates';
  /** Sample standard deviation of number across the matching connection */
  number?: Maybe<Scalars['BigFloat']['output']>;
};

export type PostSumAggregateFilter = {
  number?: InputMaybe<BigIntFilter>;
};

export type PostSumAggregates = {
  __typename?: 'PostSumAggregates';
  /** Sum of number across the matching connection */
  number: Scalars['BigInt']['output'];
};

export type PostTag = {
  __typename?: 'PostTag';
  createdAt: Scalars['Datetime']['output'];
  /** Reads a single `Post` that is related to this `PostTag`. */
  post?: Maybe<Post>;
  postId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `Tag` that is related to this `PostTag`. */
  tag?: Maybe<Tag>;
  tagId: Scalars['UUID']['output'];
};

export type PostTagAggregates = {
  __typename?: 'PostTagAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<PostTagDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `PostTag` object types. */
export type PostTagAggregatesFilter = {
  /** Distinct count aggregate over matching `PostTag` objects. */
  distinctCount?: InputMaybe<PostTagDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `PostTag` object to be included within the aggregate. */
  filter?: InputMaybe<PostTagFilter>;
};

/** A condition to be used against `PostTag` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PostTagCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `postId` field. */
  postId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `tagId` field. */
  tagId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `PostTag` values. */
export type PostTagConnection = {
  __typename?: 'PostTagConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<PostTagAggregates>;
  /** A list of edges which contains the `PostTag` and cursor to aid in pagination. */
  edges: Array<Maybe<PostTagEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<PostTagAggregates>>;
  /** A list of `PostTag` objects. */
  nodes: Array<Maybe<PostTag>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PostTag` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `PostTag` values. */
export type PostTagConnectionGroupedAggregatesArgs = {
  groupBy: Array<PostTagGroupBy>;
  having?: InputMaybe<PostTagHavingInput>;
};

export type PostTagDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  tagId?: InputMaybe<BigIntFilter>;
};

export type PostTagDistinctCountAggregates = {
  __typename?: 'PostTagDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of postId across the matching connection */
  postId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tagId across the matching connection */
  tagId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `PostTag` edge in the connection. */
export type PostTagEdge = {
  __typename?: 'PostTagEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PostTag` at the end of the edge. */
  node?: Maybe<PostTag>;
};

/** A filter to be used against `PostTag` object types. All fields are combined with a logical ‘and.’ */
export type PostTagFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PostTagFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PostTagFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PostTagFilter>>;
  /** Filter by the object’s `post` relation. */
  post?: InputMaybe<PostFilter>;
  /** Filter by the object’s `postId` field. */
  postId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `tag` relation. */
  tag?: InputMaybe<TagFilter>;
  /** Filter by the object’s `tagId` field. */
  tagId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `PostTag` for usage during aggregation. */
export enum PostTagGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  PostId = 'POST_ID',
  TagId = 'TAG_ID'
}

export type PostTagHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostTagHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `PostTag` aggregates. */
export type PostTagHavingInput = {
  AND?: InputMaybe<Array<PostTagHavingInput>>;
  OR?: InputMaybe<Array<PostTagHavingInput>>;
  average?: InputMaybe<PostTagHavingAverageInput>;
  distinctCount?: InputMaybe<PostTagHavingDistinctCountInput>;
  max?: InputMaybe<PostTagHavingMaxInput>;
  min?: InputMaybe<PostTagHavingMinInput>;
  stddevPopulation?: InputMaybe<PostTagHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<PostTagHavingStddevSampleInput>;
  sum?: InputMaybe<PostTagHavingSumInput>;
  variancePopulation?: InputMaybe<PostTagHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<PostTagHavingVarianceSampleInput>;
};

export type PostTagHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostTagHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostTagHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostTagHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostTagHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostTagHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostTagHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `PostTag` */
export type PostTagInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  postId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  tagId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `PostTag`. */
export enum PostTagOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  PostIdAsc = 'POST_ID_ASC',
  PostIdDesc = 'POST_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TagIdAsc = 'TAG_ID_ASC',
  TagIdDesc = 'TAG_ID_DESC'
}

/** Represents an update to a `PostTag`. Fields that are set will be updated. */
export type PostTagPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  postId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  tagId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A filter to be used against many `Attachment` object types. All fields are combined with a logical ‘and.’ */
export type PostToManyAttachmentFilter = {
  /** Aggregates across related `Attachment` match the filter criteria. */
  aggregates?: InputMaybe<AttachmentAggregatesFilter>;
  /** Every related `Attachment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AttachmentFilter>;
  /** No related `Attachment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AttachmentFilter>;
  /** Some related `Attachment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AttachmentFilter>;
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

/** A filter to be used against many `Post` object types. All fields are combined with a logical ‘and.’ */
export type PostToManyPostFilter = {
  /** Aggregates across related `Post` match the filter criteria. */
  aggregates?: InputMaybe<PostAggregatesFilter>;
  /** Every related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostFilter>;
  /** No related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostFilter>;
  /** Some related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostFilter>;
};

/** A filter to be used against many `PostReference` object types. All fields are combined with a logical ‘and.’ */
export type PostToManyPostReferenceFilter = {
  /** Aggregates across related `PostReference` match the filter criteria. */
  aggregates?: InputMaybe<PostReferenceAggregatesFilter>;
  /** Every related `PostReference` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostReferenceFilter>;
  /** No related `PostReference` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostReferenceFilter>;
  /** Some related `PostReference` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostReferenceFilter>;
};

/** A filter to be used against many `PostStatusChange` object types. All fields are combined with a logical ‘and.’ */
export type PostToManyPostStatusChangeFilter = {
  /** Aggregates across related `PostStatusChange` match the filter criteria. */
  aggregates?: InputMaybe<PostStatusChangeAggregatesFilter>;
  /** Every related `PostStatusChange` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostStatusChangeFilter>;
  /** No related `PostStatusChange` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostStatusChangeFilter>;
  /** Some related `PostStatusChange` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostStatusChangeFilter>;
};

/** A filter to be used against many `PostTag` object types. All fields are combined with a logical ‘and.’ */
export type PostToManyPostTagFilter = {
  /** Aggregates across related `PostTag` match the filter criteria. */
  aggregates?: InputMaybe<PostTagAggregatesFilter>;
  /** Every related `PostTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostTagFilter>;
  /** No related `PostTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostTagFilter>;
  /** Some related `PostTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostTagFilter>;
};

/** A filter to be used against many `Reaction` object types. All fields are combined with a logical ‘and.’ */
export type PostToManyReactionFilter = {
  /** Aggregates across related `Reaction` match the filter criteria. */
  aggregates?: InputMaybe<ReactionAggregatesFilter>;
  /** Every related `Reaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ReactionFilter>;
  /** No related `Reaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ReactionFilter>;
  /** Some related `Reaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ReactionFilter>;
};

/** A filter to be used against many `Signal` object types. All fields are combined with a logical ‘and.’ */
export type PostToManySignalFilter = {
  /** Aggregates across related `Signal` match the filter criteria. */
  aggregates?: InputMaybe<SignalAggregatesFilter>;
  /** Every related `Signal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<SignalFilter>;
  /** No related `Signal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<SignalFilter>;
  /** Some related `Signal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<SignalFilter>;
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

export type PostVariancePopulationAggregateFilter = {
  number?: InputMaybe<BigFloatFilter>;
};

export type PostVariancePopulationAggregates = {
  __typename?: 'PostVariancePopulationAggregates';
  /** Population variance of number across the matching connection */
  number?: Maybe<Scalars['BigFloat']['output']>;
};

export type PostVarianceSampleAggregateFilter = {
  number?: InputMaybe<BigFloatFilter>;
};

export type PostVarianceSampleAggregates = {
  __typename?: 'PostVarianceSampleAggregates';
  /** Sample variance of number across the matching connection */
  number?: Maybe<Scalars['BigFloat']['output']>;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  inboundEmailKey: Scalars['String']['output'];
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nextPostNumber: Scalars['Int']['output'];
  organizationId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostConnection;
  prefix?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `ProjectLink`. */
  projectLinks: ProjectLinkConnection;
  /** Reads and enables pagination through a set of `ProjectStatusConfig`. */
  projectStatusConfigs: ProjectStatusConfigConnection;
  rowId: Scalars['UUID']['output'];
  showChangelog: Scalars['Boolean']['output'];
  showRoadmap: Scalars['Boolean']['output'];
  /** Reads and enables pagination through a set of `SignalCluster`. */
  signalClusters: SignalClusterConnection;
  /** Reads and enables pagination through a set of `Signal`. */
  signals: SignalConnection;
  slug: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Tag`. */
  tags: TagConnection;
  updatedAt: Scalars['Datetime']['output'];
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


export type ProjectProjectLinksArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectLinkCondition>;
  filter?: InputMaybe<ProjectLinkFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectLinkOrderBy>>;
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


export type ProjectSignalClustersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SignalClusterCondition>;
  filter?: InputMaybe<SignalClusterFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SignalClusterOrderBy>>;
};


export type ProjectSignalsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SignalCondition>;
  filter?: InputMaybe<SignalFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SignalOrderBy>>;
};


export type ProjectTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TagCondition>;
  filter?: InputMaybe<TagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TagOrderBy>>;
};

export type ProjectAggregates = {
  __typename?: 'ProjectAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<ProjectAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<ProjectDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<ProjectMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<ProjectMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<ProjectStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<ProjectStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<ProjectSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<ProjectVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<ProjectVarianceSampleAggregates>;
};

export type ProjectAverageAggregates = {
  __typename?: 'ProjectAverageAggregates';
  /** Mean average of nextPostNumber across the matching connection */
  nextPostNumber?: Maybe<Scalars['BigFloat']['output']>;
};

/** A condition to be used against `Project` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProjectCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `image` field. */
  image?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `inboundEmailKey` field. */
  inboundEmailKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `isPublic` field. */
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `nextPostNumber` field. */
  nextPostNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `prefix` field. */
  prefix?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `showChangelog` field. */
  showChangelog?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `showRoadmap` field. */
  showRoadmap?: InputMaybe<Scalars['Boolean']['input']>;
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

export type ProjectDistinctCountAggregates = {
  __typename?: 'ProjectDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of image across the matching connection */
  image?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of inboundEmailKey across the matching connection */
  inboundEmailKey?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isPublic across the matching connection */
  isPublic?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of nextPostNumber across the matching connection */
  nextPostNumber?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of prefix across the matching connection */
  prefix?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of showChangelog across the matching connection */
  showChangelog?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of showRoadmap across the matching connection */
  showRoadmap?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `inboundEmailKey` field. */
  inboundEmailKey?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isPublic` field. */
  isPublic?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Filter by the object’s `nextPostNumber` field. */
  nextPostNumber?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ProjectFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProjectFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `posts` relation. */
  posts?: InputMaybe<ProjectToManyPostFilter>;
  /** Some related `posts` exist. */
  postsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `prefix` field. */
  prefix?: InputMaybe<StringFilter>;
  /** Filter by the object’s `projectLinks` relation. */
  projectLinks?: InputMaybe<ProjectToManyProjectLinkFilter>;
  /** Some related `projectLinks` exist. */
  projectLinksExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `projectStatusConfigs` relation. */
  projectStatusConfigs?: InputMaybe<ProjectToManyProjectStatusConfigFilter>;
  /** Some related `projectStatusConfigs` exist. */
  projectStatusConfigsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `showChangelog` field. */
  showChangelog?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `showRoadmap` field. */
  showRoadmap?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `signalClusters` relation. */
  signalClusters?: InputMaybe<ProjectToManySignalClusterFilter>;
  /** Some related `signalClusters` exist. */
  signalClustersExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `signals` relation. */
  signals?: InputMaybe<ProjectToManySignalFilter>;
  /** Some related `signals` exist. */
  signalsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tags` relation. */
  tags?: InputMaybe<ProjectToManyTagFilter>;
  /** Some related `tags` exist. */
  tagsExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  IsPublic = 'IS_PUBLIC',
  Name = 'NAME',
  NextPostNumber = 'NEXT_POST_NUMBER',
  OrganizationId = 'ORGANIZATION_ID',
  Prefix = 'PREFIX',
  ShowChangelog = 'SHOW_CHANGELOG',
  ShowRoadmap = 'SHOW_ROADMAP',
  Slug = 'SLUG',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type ProjectHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  nextPostNumber?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  nextPostNumber?: InputMaybe<HavingIntFilter>;
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
  nextPostNumber?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  nextPostNumber?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  nextPostNumber?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  nextPostNumber?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  nextPostNumber?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  nextPostNumber?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  nextPostNumber?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Project` */
export type ProjectInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  nextPostNumber?: InputMaybe<Scalars['Int']['input']>;
  organizationId: Scalars['UUID']['input'];
  prefix?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  showChangelog?: InputMaybe<Scalars['Boolean']['input']>;
  showRoadmap?: InputMaybe<Scalars['Boolean']['input']>;
  slug: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ProjectLink = {
  __typename?: 'ProjectLink';
  createdAt: Scalars['Datetime']['output'];
  order: Scalars['Int']['output'];
  /** Reads a single `Project` that is related to this `ProjectLink`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Datetime']['output'];
  url: Scalars['String']['output'];
};

export type ProjectLinkAggregates = {
  __typename?: 'ProjectLinkAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<ProjectLinkAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<ProjectLinkDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<ProjectLinkMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<ProjectLinkMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<ProjectLinkStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<ProjectLinkStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<ProjectLinkSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<ProjectLinkVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<ProjectLinkVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `ProjectLink` object types. */
export type ProjectLinkAggregatesFilter = {
  /** Mean average aggregate over matching `ProjectLink` objects. */
  average?: InputMaybe<ProjectLinkAverageAggregateFilter>;
  /** Distinct count aggregate over matching `ProjectLink` objects. */
  distinctCount?: InputMaybe<ProjectLinkDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `ProjectLink` object to be included within the aggregate. */
  filter?: InputMaybe<ProjectLinkFilter>;
  /** Maximum aggregate over matching `ProjectLink` objects. */
  max?: InputMaybe<ProjectLinkMaxAggregateFilter>;
  /** Minimum aggregate over matching `ProjectLink` objects. */
  min?: InputMaybe<ProjectLinkMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `ProjectLink` objects. */
  stddevPopulation?: InputMaybe<ProjectLinkStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `ProjectLink` objects. */
  stddevSample?: InputMaybe<ProjectLinkStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `ProjectLink` objects. */
  sum?: InputMaybe<ProjectLinkSumAggregateFilter>;
  /** Population variance aggregate over matching `ProjectLink` objects. */
  variancePopulation?: InputMaybe<ProjectLinkVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `ProjectLink` objects. */
  varianceSample?: InputMaybe<ProjectLinkVarianceSampleAggregateFilter>;
};

export type ProjectLinkAverageAggregateFilter = {
  order?: InputMaybe<BigFloatFilter>;
};

export type ProjectLinkAverageAggregates = {
  __typename?: 'ProjectLinkAverageAggregates';
  /** Mean average of order across the matching connection */
  order?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `ProjectLink` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ProjectLinkCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `order` field. */
  order?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `title` field. */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `ProjectLink` values. */
export type ProjectLinkConnection = {
  __typename?: 'ProjectLinkConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<ProjectLinkAggregates>;
  /** A list of edges which contains the `ProjectLink` and cursor to aid in pagination. */
  edges: Array<Maybe<ProjectLinkEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<ProjectLinkAggregates>>;
  /** A list of `ProjectLink` objects. */
  nodes: Array<Maybe<ProjectLink>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ProjectLink` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `ProjectLink` values. */
export type ProjectLinkConnectionGroupedAggregatesArgs = {
  groupBy: Array<ProjectLinkGroupBy>;
  having?: InputMaybe<ProjectLinkHavingInput>;
};

export type ProjectLinkDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  order?: InputMaybe<BigIntFilter>;
  projectId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  title?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  url?: InputMaybe<BigIntFilter>;
};

export type ProjectLinkDistinctCountAggregates = {
  __typename?: 'ProjectLinkDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of order across the matching connection */
  order?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of title across the matching connection */
  title?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of url across the matching connection */
  url?: Maybe<Scalars['BigInt']['output']>;
};

/** A `ProjectLink` edge in the connection. */
export type ProjectLinkEdge = {
  __typename?: 'ProjectLinkEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ProjectLink` at the end of the edge. */
  node?: Maybe<ProjectLink>;
};

/** A filter to be used against `ProjectLink` object types. All fields are combined with a logical ‘and.’ */
export type ProjectLinkFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProjectLinkFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ProjectLinkFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProjectLinkFilter>>;
  /** Filter by the object’s `order` field. */
  order?: InputMaybe<IntFilter>;
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
  /** Filter by the object’s `url` field. */
  url?: InputMaybe<StringFilter>;
};

/** Grouping methods for `ProjectLink` for usage during aggregation. */
export enum ProjectLinkGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Order = 'ORDER',
  ProjectId = 'PROJECT_ID',
  Title = 'TITLE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  Url = 'URL'
}

export type ProjectLinkHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  order?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectLinkHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  order?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `ProjectLink` aggregates. */
export type ProjectLinkHavingInput = {
  AND?: InputMaybe<Array<ProjectLinkHavingInput>>;
  OR?: InputMaybe<Array<ProjectLinkHavingInput>>;
  average?: InputMaybe<ProjectLinkHavingAverageInput>;
  distinctCount?: InputMaybe<ProjectLinkHavingDistinctCountInput>;
  max?: InputMaybe<ProjectLinkHavingMaxInput>;
  min?: InputMaybe<ProjectLinkHavingMinInput>;
  stddevPopulation?: InputMaybe<ProjectLinkHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<ProjectLinkHavingStddevSampleInput>;
  sum?: InputMaybe<ProjectLinkHavingSumInput>;
  variancePopulation?: InputMaybe<ProjectLinkHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<ProjectLinkHavingVarianceSampleInput>;
};

export type ProjectLinkHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  order?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectLinkHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  order?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectLinkHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  order?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectLinkHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  order?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectLinkHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  order?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectLinkHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  order?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ProjectLinkHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  order?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `ProjectLink` */
export type ProjectLinkInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  projectId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  url: Scalars['String']['input'];
};

export type ProjectLinkMaxAggregateFilter = {
  order?: InputMaybe<IntFilter>;
};

export type ProjectLinkMaxAggregates = {
  __typename?: 'ProjectLinkMaxAggregates';
  /** Maximum of order across the matching connection */
  order?: Maybe<Scalars['Int']['output']>;
};

export type ProjectLinkMinAggregateFilter = {
  order?: InputMaybe<IntFilter>;
};

export type ProjectLinkMinAggregates = {
  __typename?: 'ProjectLinkMinAggregates';
  /** Minimum of order across the matching connection */
  order?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `ProjectLink`. */
export enum ProjectLinkOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  OrderAsc = 'ORDER_ASC',
  OrderDesc = 'ORDER_DESC',
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
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC'
}

/** Represents an update to a `ProjectLink`. Fields that are set will be updated. */
export type ProjectLinkPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectLinkStddevPopulationAggregateFilter = {
  order?: InputMaybe<BigFloatFilter>;
};

export type ProjectLinkStddevPopulationAggregates = {
  __typename?: 'ProjectLinkStddevPopulationAggregates';
  /** Population standard deviation of order across the matching connection */
  order?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectLinkStddevSampleAggregateFilter = {
  order?: InputMaybe<BigFloatFilter>;
};

export type ProjectLinkStddevSampleAggregates = {
  __typename?: 'ProjectLinkStddevSampleAggregates';
  /** Sample standard deviation of order across the matching connection */
  order?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectLinkSumAggregateFilter = {
  order?: InputMaybe<BigIntFilter>;
};

export type ProjectLinkSumAggregates = {
  __typename?: 'ProjectLinkSumAggregates';
  /** Sum of order across the matching connection */
  order: Scalars['BigInt']['output'];
};

export type ProjectLinkVariancePopulationAggregateFilter = {
  order?: InputMaybe<BigFloatFilter>;
};

export type ProjectLinkVariancePopulationAggregates = {
  __typename?: 'ProjectLinkVariancePopulationAggregates';
  /** Population variance of order across the matching connection */
  order?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectLinkVarianceSampleAggregateFilter = {
  order?: InputMaybe<BigFloatFilter>;
};

export type ProjectLinkVarianceSampleAggregates = {
  __typename?: 'ProjectLinkVarianceSampleAggregates';
  /** Sample variance of order across the matching connection */
  order?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectMaxAggregates = {
  __typename?: 'ProjectMaxAggregates';
  /** Maximum of nextPostNumber across the matching connection */
  nextPostNumber?: Maybe<Scalars['Int']['output']>;
};

export type ProjectMinAggregates = {
  __typename?: 'ProjectMinAggregates';
  /** Minimum of nextPostNumber across the matching connection */
  nextPostNumber?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `Project`. */
export enum ProjectOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  ImageAsc = 'IMAGE_ASC',
  ImageDesc = 'IMAGE_DESC',
  InboundEmailKeyAsc = 'INBOUND_EMAIL_KEY_ASC',
  InboundEmailKeyDesc = 'INBOUND_EMAIL_KEY_DESC',
  IsPublicAsc = 'IS_PUBLIC_ASC',
  IsPublicDesc = 'IS_PUBLIC_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  NextPostNumberAsc = 'NEXT_POST_NUMBER_ASC',
  NextPostNumberDesc = 'NEXT_POST_NUMBER_DESC',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PostsAverageNumberAsc = 'POSTS_AVERAGE_NUMBER_ASC',
  PostsAverageNumberDesc = 'POSTS_AVERAGE_NUMBER_DESC',
  PostsCountAsc = 'POSTS_COUNT_ASC',
  PostsCountDesc = 'POSTS_COUNT_DESC',
  PostsDistinctCountAiTagsAsc = 'POSTS_DISTINCT_COUNT_AI_TAGS_ASC',
  PostsDistinctCountAiTagsDesc = 'POSTS_DISTINCT_COUNT_AI_TAGS_DESC',
  PostsDistinctCountClusterIdAsc = 'POSTS_DISTINCT_COUNT_CLUSTER_ID_ASC',
  PostsDistinctCountClusterIdDesc = 'POSTS_DISTINCT_COUNT_CLUSTER_ID_DESC',
  PostsDistinctCountCreatedAtAsc = 'POSTS_DISTINCT_COUNT_CREATED_AT_ASC',
  PostsDistinctCountCreatedAtDesc = 'POSTS_DISTINCT_COUNT_CREATED_AT_DESC',
  PostsDistinctCountDescriptionAsc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_ASC',
  PostsDistinctCountDescriptionDesc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_DESC',
  PostsDistinctCountDuplicateOfIdAsc = 'POSTS_DISTINCT_COUNT_DUPLICATE_OF_ID_ASC',
  PostsDistinctCountDuplicateOfIdDesc = 'POSTS_DISTINCT_COUNT_DUPLICATE_OF_ID_DESC',
  PostsDistinctCountNumberAsc = 'POSTS_DISTINCT_COUNT_NUMBER_ASC',
  PostsDistinctCountNumberDesc = 'POSTS_DISTINCT_COUNT_NUMBER_DESC',
  PostsDistinctCountProjectIdAsc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_ASC',
  PostsDistinctCountProjectIdDesc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_DESC',
  PostsDistinctCountRowIdAsc = 'POSTS_DISTINCT_COUNT_ROW_ID_ASC',
  PostsDistinctCountRowIdDesc = 'POSTS_DISTINCT_COUNT_ROW_ID_DESC',
  PostsDistinctCountSentimentAsc = 'POSTS_DISTINCT_COUNT_SENTIMENT_ASC',
  PostsDistinctCountSentimentDesc = 'POSTS_DISTINCT_COUNT_SENTIMENT_DESC',
  PostsDistinctCountShippedAtAsc = 'POSTS_DISTINCT_COUNT_SHIPPED_AT_ASC',
  PostsDistinctCountShippedAtDesc = 'POSTS_DISTINCT_COUNT_SHIPPED_AT_DESC',
  PostsDistinctCountSourceAsc = 'POSTS_DISTINCT_COUNT_SOURCE_ASC',
  PostsDistinctCountSourceDesc = 'POSTS_DISTINCT_COUNT_SOURCE_DESC',
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
  PostsMaxNumberAsc = 'POSTS_MAX_NUMBER_ASC',
  PostsMaxNumberDesc = 'POSTS_MAX_NUMBER_DESC',
  PostsMinNumberAsc = 'POSTS_MIN_NUMBER_ASC',
  PostsMinNumberDesc = 'POSTS_MIN_NUMBER_DESC',
  PostsStddevPopulationNumberAsc = 'POSTS_STDDEV_POPULATION_NUMBER_ASC',
  PostsStddevPopulationNumberDesc = 'POSTS_STDDEV_POPULATION_NUMBER_DESC',
  PostsStddevSampleNumberAsc = 'POSTS_STDDEV_SAMPLE_NUMBER_ASC',
  PostsStddevSampleNumberDesc = 'POSTS_STDDEV_SAMPLE_NUMBER_DESC',
  PostsSumNumberAsc = 'POSTS_SUM_NUMBER_ASC',
  PostsSumNumberDesc = 'POSTS_SUM_NUMBER_DESC',
  PostsVariancePopulationNumberAsc = 'POSTS_VARIANCE_POPULATION_NUMBER_ASC',
  PostsVariancePopulationNumberDesc = 'POSTS_VARIANCE_POPULATION_NUMBER_DESC',
  PostsVarianceSampleNumberAsc = 'POSTS_VARIANCE_SAMPLE_NUMBER_ASC',
  PostsVarianceSampleNumberDesc = 'POSTS_VARIANCE_SAMPLE_NUMBER_DESC',
  PrefixAsc = 'PREFIX_ASC',
  PrefixDesc = 'PREFIX_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectLinksAverageOrderAsc = 'PROJECT_LINKS_AVERAGE_ORDER_ASC',
  ProjectLinksAverageOrderDesc = 'PROJECT_LINKS_AVERAGE_ORDER_DESC',
  ProjectLinksCountAsc = 'PROJECT_LINKS_COUNT_ASC',
  ProjectLinksCountDesc = 'PROJECT_LINKS_COUNT_DESC',
  ProjectLinksDistinctCountCreatedAtAsc = 'PROJECT_LINKS_DISTINCT_COUNT_CREATED_AT_ASC',
  ProjectLinksDistinctCountCreatedAtDesc = 'PROJECT_LINKS_DISTINCT_COUNT_CREATED_AT_DESC',
  ProjectLinksDistinctCountOrderAsc = 'PROJECT_LINKS_DISTINCT_COUNT_ORDER_ASC',
  ProjectLinksDistinctCountOrderDesc = 'PROJECT_LINKS_DISTINCT_COUNT_ORDER_DESC',
  ProjectLinksDistinctCountProjectIdAsc = 'PROJECT_LINKS_DISTINCT_COUNT_PROJECT_ID_ASC',
  ProjectLinksDistinctCountProjectIdDesc = 'PROJECT_LINKS_DISTINCT_COUNT_PROJECT_ID_DESC',
  ProjectLinksDistinctCountRowIdAsc = 'PROJECT_LINKS_DISTINCT_COUNT_ROW_ID_ASC',
  ProjectLinksDistinctCountRowIdDesc = 'PROJECT_LINKS_DISTINCT_COUNT_ROW_ID_DESC',
  ProjectLinksDistinctCountTitleAsc = 'PROJECT_LINKS_DISTINCT_COUNT_TITLE_ASC',
  ProjectLinksDistinctCountTitleDesc = 'PROJECT_LINKS_DISTINCT_COUNT_TITLE_DESC',
  ProjectLinksDistinctCountUpdatedAtAsc = 'PROJECT_LINKS_DISTINCT_COUNT_UPDATED_AT_ASC',
  ProjectLinksDistinctCountUpdatedAtDesc = 'PROJECT_LINKS_DISTINCT_COUNT_UPDATED_AT_DESC',
  ProjectLinksDistinctCountUrlAsc = 'PROJECT_LINKS_DISTINCT_COUNT_URL_ASC',
  ProjectLinksDistinctCountUrlDesc = 'PROJECT_LINKS_DISTINCT_COUNT_URL_DESC',
  ProjectLinksMaxOrderAsc = 'PROJECT_LINKS_MAX_ORDER_ASC',
  ProjectLinksMaxOrderDesc = 'PROJECT_LINKS_MAX_ORDER_DESC',
  ProjectLinksMinOrderAsc = 'PROJECT_LINKS_MIN_ORDER_ASC',
  ProjectLinksMinOrderDesc = 'PROJECT_LINKS_MIN_ORDER_DESC',
  ProjectLinksStddevPopulationOrderAsc = 'PROJECT_LINKS_STDDEV_POPULATION_ORDER_ASC',
  ProjectLinksStddevPopulationOrderDesc = 'PROJECT_LINKS_STDDEV_POPULATION_ORDER_DESC',
  ProjectLinksStddevSampleOrderAsc = 'PROJECT_LINKS_STDDEV_SAMPLE_ORDER_ASC',
  ProjectLinksStddevSampleOrderDesc = 'PROJECT_LINKS_STDDEV_SAMPLE_ORDER_DESC',
  ProjectLinksSumOrderAsc = 'PROJECT_LINKS_SUM_ORDER_ASC',
  ProjectLinksSumOrderDesc = 'PROJECT_LINKS_SUM_ORDER_DESC',
  ProjectLinksVariancePopulationOrderAsc = 'PROJECT_LINKS_VARIANCE_POPULATION_ORDER_ASC',
  ProjectLinksVariancePopulationOrderDesc = 'PROJECT_LINKS_VARIANCE_POPULATION_ORDER_DESC',
  ProjectLinksVarianceSampleOrderAsc = 'PROJECT_LINKS_VARIANCE_SAMPLE_ORDER_ASC',
  ProjectLinksVarianceSampleOrderDesc = 'PROJECT_LINKS_VARIANCE_SAMPLE_ORDER_DESC',
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
  ShowChangelogAsc = 'SHOW_CHANGELOG_ASC',
  ShowChangelogDesc = 'SHOW_CHANGELOG_DESC',
  ShowRoadmapAsc = 'SHOW_ROADMAP_ASC',
  ShowRoadmapDesc = 'SHOW_ROADMAP_DESC',
  SignalsCountAsc = 'SIGNALS_COUNT_ASC',
  SignalsCountDesc = 'SIGNALS_COUNT_DESC',
  SignalsDistinctCountAiTagsAsc = 'SIGNALS_DISTINCT_COUNT_AI_TAGS_ASC',
  SignalsDistinctCountAiTagsDesc = 'SIGNALS_DISTINCT_COUNT_AI_TAGS_DESC',
  SignalsDistinctCountClusterIdAsc = 'SIGNALS_DISTINCT_COUNT_CLUSTER_ID_ASC',
  SignalsDistinctCountClusterIdDesc = 'SIGNALS_DISTINCT_COUNT_CLUSTER_ID_DESC',
  SignalsDistinctCountCreatedAtAsc = 'SIGNALS_DISTINCT_COUNT_CREATED_AT_ASC',
  SignalsDistinctCountCreatedAtDesc = 'SIGNALS_DISTINCT_COUNT_CREATED_AT_DESC',
  SignalsDistinctCountOrganizationIdAsc = 'SIGNALS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  SignalsDistinctCountOrganizationIdDesc = 'SIGNALS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  SignalsDistinctCountPostIdAsc = 'SIGNALS_DISTINCT_COUNT_POST_ID_ASC',
  SignalsDistinctCountPostIdDesc = 'SIGNALS_DISTINCT_COUNT_POST_ID_DESC',
  SignalsDistinctCountProjectIdAsc = 'SIGNALS_DISTINCT_COUNT_PROJECT_ID_ASC',
  SignalsDistinctCountProjectIdDesc = 'SIGNALS_DISTINCT_COUNT_PROJECT_ID_DESC',
  SignalsDistinctCountRawContentAsc = 'SIGNALS_DISTINCT_COUNT_RAW_CONTENT_ASC',
  SignalsDistinctCountRawContentDesc = 'SIGNALS_DISTINCT_COUNT_RAW_CONTENT_DESC',
  SignalsDistinctCountRowIdAsc = 'SIGNALS_DISTINCT_COUNT_ROW_ID_ASC',
  SignalsDistinctCountRowIdDesc = 'SIGNALS_DISTINCT_COUNT_ROW_ID_DESC',
  SignalsDistinctCountSentimentAsc = 'SIGNALS_DISTINCT_COUNT_SENTIMENT_ASC',
  SignalsDistinctCountSentimentDesc = 'SIGNALS_DISTINCT_COUNT_SENTIMENT_DESC',
  SignalsDistinctCountSourceAsc = 'SIGNALS_DISTINCT_COUNT_SOURCE_ASC',
  SignalsDistinctCountSourceDesc = 'SIGNALS_DISTINCT_COUNT_SOURCE_DESC',
  SignalsDistinctCountSourceMetadataAsc = 'SIGNALS_DISTINCT_COUNT_SOURCE_METADATA_ASC',
  SignalsDistinctCountSourceMetadataDesc = 'SIGNALS_DISTINCT_COUNT_SOURCE_METADATA_DESC',
  SignalsDistinctCountStatusAsc = 'SIGNALS_DISTINCT_COUNT_STATUS_ASC',
  SignalsDistinctCountStatusDesc = 'SIGNALS_DISTINCT_COUNT_STATUS_DESC',
  SignalsDistinctCountTypeAsc = 'SIGNALS_DISTINCT_COUNT_TYPE_ASC',
  SignalsDistinctCountTypeDesc = 'SIGNALS_DISTINCT_COUNT_TYPE_DESC',
  SignalsDistinctCountUpdatedAtAsc = 'SIGNALS_DISTINCT_COUNT_UPDATED_AT_ASC',
  SignalsDistinctCountUpdatedAtDesc = 'SIGNALS_DISTINCT_COUNT_UPDATED_AT_DESC',
  SignalsDistinctCountUserIdAsc = 'SIGNALS_DISTINCT_COUNT_USER_ID_ASC',
  SignalsDistinctCountUserIdDesc = 'SIGNALS_DISTINCT_COUNT_USER_ID_DESC',
  SignalClustersAverageMemberCountAsc = 'SIGNAL_CLUSTERS_AVERAGE_MEMBER_COUNT_ASC',
  SignalClustersAverageMemberCountDesc = 'SIGNAL_CLUSTERS_AVERAGE_MEMBER_COUNT_DESC',
  SignalClustersCountAsc = 'SIGNAL_CLUSTERS_COUNT_ASC',
  SignalClustersCountDesc = 'SIGNAL_CLUSTERS_COUNT_DESC',
  SignalClustersDistinctCountCreatedAtAsc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_CREATED_AT_ASC',
  SignalClustersDistinctCountCreatedAtDesc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_CREATED_AT_DESC',
  SignalClustersDistinctCountLabelAsc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_LABEL_ASC',
  SignalClustersDistinctCountLabelDesc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_LABEL_DESC',
  SignalClustersDistinctCountMemberCountAsc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_MEMBER_COUNT_ASC',
  SignalClustersDistinctCountMemberCountDesc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_MEMBER_COUNT_DESC',
  SignalClustersDistinctCountProjectIdAsc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_PROJECT_ID_ASC',
  SignalClustersDistinctCountProjectIdDesc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_PROJECT_ID_DESC',
  SignalClustersDistinctCountRowIdAsc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_ROW_ID_ASC',
  SignalClustersDistinctCountRowIdDesc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_ROW_ID_DESC',
  SignalClustersDistinctCountSummaryAsc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_SUMMARY_ASC',
  SignalClustersDistinctCountSummaryDesc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_SUMMARY_DESC',
  SignalClustersDistinctCountUpdatedAtAsc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_UPDATED_AT_ASC',
  SignalClustersDistinctCountUpdatedAtDesc = 'SIGNAL_CLUSTERS_DISTINCT_COUNT_UPDATED_AT_DESC',
  SignalClustersMaxMemberCountAsc = 'SIGNAL_CLUSTERS_MAX_MEMBER_COUNT_ASC',
  SignalClustersMaxMemberCountDesc = 'SIGNAL_CLUSTERS_MAX_MEMBER_COUNT_DESC',
  SignalClustersMinMemberCountAsc = 'SIGNAL_CLUSTERS_MIN_MEMBER_COUNT_ASC',
  SignalClustersMinMemberCountDesc = 'SIGNAL_CLUSTERS_MIN_MEMBER_COUNT_DESC',
  SignalClustersStddevPopulationMemberCountAsc = 'SIGNAL_CLUSTERS_STDDEV_POPULATION_MEMBER_COUNT_ASC',
  SignalClustersStddevPopulationMemberCountDesc = 'SIGNAL_CLUSTERS_STDDEV_POPULATION_MEMBER_COUNT_DESC',
  SignalClustersStddevSampleMemberCountAsc = 'SIGNAL_CLUSTERS_STDDEV_SAMPLE_MEMBER_COUNT_ASC',
  SignalClustersStddevSampleMemberCountDesc = 'SIGNAL_CLUSTERS_STDDEV_SAMPLE_MEMBER_COUNT_DESC',
  SignalClustersSumMemberCountAsc = 'SIGNAL_CLUSTERS_SUM_MEMBER_COUNT_ASC',
  SignalClustersSumMemberCountDesc = 'SIGNAL_CLUSTERS_SUM_MEMBER_COUNT_DESC',
  SignalClustersVariancePopulationMemberCountAsc = 'SIGNAL_CLUSTERS_VARIANCE_POPULATION_MEMBER_COUNT_ASC',
  SignalClustersVariancePopulationMemberCountDesc = 'SIGNAL_CLUSTERS_VARIANCE_POPULATION_MEMBER_COUNT_DESC',
  SignalClustersVarianceSampleMemberCountAsc = 'SIGNAL_CLUSTERS_VARIANCE_SAMPLE_MEMBER_COUNT_ASC',
  SignalClustersVarianceSampleMemberCountDesc = 'SIGNAL_CLUSTERS_VARIANCE_SAMPLE_MEMBER_COUNT_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  TagsCountAsc = 'TAGS_COUNT_ASC',
  TagsCountDesc = 'TAGS_COUNT_DESC',
  TagsDistinctCountColorAsc = 'TAGS_DISTINCT_COUNT_COLOR_ASC',
  TagsDistinctCountColorDesc = 'TAGS_DISTINCT_COUNT_COLOR_DESC',
  TagsDistinctCountCreatedAtAsc = 'TAGS_DISTINCT_COUNT_CREATED_AT_ASC',
  TagsDistinctCountCreatedAtDesc = 'TAGS_DISTINCT_COUNT_CREATED_AT_DESC',
  TagsDistinctCountNameAsc = 'TAGS_DISTINCT_COUNT_NAME_ASC',
  TagsDistinctCountNameDesc = 'TAGS_DISTINCT_COUNT_NAME_DESC',
  TagsDistinctCountProjectIdAsc = 'TAGS_DISTINCT_COUNT_PROJECT_ID_ASC',
  TagsDistinctCountProjectIdDesc = 'TAGS_DISTINCT_COUNT_PROJECT_ID_DESC',
  TagsDistinctCountRowIdAsc = 'TAGS_DISTINCT_COUNT_ROW_ID_ASC',
  TagsDistinctCountRowIdDesc = 'TAGS_DISTINCT_COUNT_ROW_ID_DESC',
  TagsDistinctCountUpdatedAtAsc = 'TAGS_DISTINCT_COUNT_UPDATED_AT_ASC',
  TagsDistinctCountUpdatedAtDesc = 'TAGS_DISTINCT_COUNT_UPDATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `Project`. Fields that are set will be updated. */
export type ProjectPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nextPostNumber?: InputMaybe<Scalars['Int']['input']>;
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  prefix?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  showChangelog?: InputMaybe<Scalars['Boolean']['input']>;
  showRoadmap?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ProjectStatusConfig = {
  __typename?: 'ProjectStatusConfig';
  createdAt: Scalars['Datetime']['output'];
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

export type ProjectStddevPopulationAggregates = {
  __typename?: 'ProjectStddevPopulationAggregates';
  /** Population standard deviation of nextPostNumber across the matching connection */
  nextPostNumber?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectStddevSampleAggregates = {
  __typename?: 'ProjectStddevSampleAggregates';
  /** Sample standard deviation of nextPostNumber across the matching connection */
  nextPostNumber?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectSumAggregates = {
  __typename?: 'ProjectSumAggregates';
  /** Sum of nextPostNumber across the matching connection */
  nextPostNumber: Scalars['BigInt']['output'];
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

/** A filter to be used against many `ProjectLink` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManyProjectLinkFilter = {
  /** Aggregates across related `ProjectLink` match the filter criteria. */
  aggregates?: InputMaybe<ProjectLinkAggregatesFilter>;
  /** Every related `ProjectLink` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ProjectLinkFilter>;
  /** No related `ProjectLink` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ProjectLinkFilter>;
  /** Some related `ProjectLink` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ProjectLinkFilter>;
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

/** A filter to be used against many `SignalCluster` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManySignalClusterFilter = {
  /** Aggregates across related `SignalCluster` match the filter criteria. */
  aggregates?: InputMaybe<SignalClusterAggregatesFilter>;
  /** Every related `SignalCluster` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<SignalClusterFilter>;
  /** No related `SignalCluster` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<SignalClusterFilter>;
  /** Some related `SignalCluster` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<SignalClusterFilter>;
};

/** A filter to be used against many `Signal` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManySignalFilter = {
  /** Aggregates across related `Signal` match the filter criteria. */
  aggregates?: InputMaybe<SignalAggregatesFilter>;
  /** Every related `Signal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<SignalFilter>;
  /** No related `Signal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<SignalFilter>;
  /** Some related `Signal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<SignalFilter>;
};

/** A filter to be used against many `Tag` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManyTagFilter = {
  /** Aggregates across related `Tag` match the filter criteria. */
  aggregates?: InputMaybe<TagAggregatesFilter>;
  /** Every related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TagFilter>;
  /** No related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TagFilter>;
  /** Some related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TagFilter>;
};

export type ProjectVariancePopulationAggregates = {
  __typename?: 'ProjectVariancePopulationAggregates';
  /** Population variance of nextPostNumber across the matching connection */
  nextPostNumber?: Maybe<Scalars['BigFloat']['output']>;
};

export type ProjectVarianceSampleAggregates = {
  __typename?: 'ProjectVarianceSampleAggregates';
  /** Sample variance of nextPostNumber across the matching connection */
  nextPostNumber?: Maybe<Scalars['BigFloat']['output']>;
};

export type PromoteSignalToPostInput = {
  signalId: Scalars['UUID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PromoteSignalToPostPayload = {
  __typename?: 'PromoteSignalToPostPayload';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  projectId: Scalars['UUID']['output'];
  source?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Get a single `Attachment`. */
  attachment?: Maybe<Attachment>;
  /** Reads and enables pagination through a set of `Attachment`. */
  attachments?: Maybe<AttachmentConnection>;
  /** Get a single `Comment`. */
  comment?: Maybe<Comment>;
  /** Reads and enables pagination through a set of `Comment`. */
  comments?: Maybe<CommentConnection>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** The current user's email notification settings (defaults applied). */
  myNotificationPreference?: Maybe<NotificationPreference>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /**
   * Returns the currently authenticated user (observer).
   * Returns null if not authenticated.
   */
  observer?: Maybe<Observer>;
  /** Get a single `Post`. */
  post?: Maybe<Post>;
  /** Get a single `Post`. */
  postByProjectIdAndNumber?: Maybe<Post>;
  /** Get a single `PostReference`. */
  postReference?: Maybe<PostReference>;
  /** Get a single `PostReference`. */
  postReferenceBySourceTypeAndSourceIdAndTargetPostIdAndKeyword?: Maybe<PostReference>;
  /** Reads and enables pagination through a set of `PostReference`. */
  postReferences?: Maybe<PostReferenceConnection>;
  /** Get a single `PostStatusChange`. */
  postStatusChange?: Maybe<PostStatusChange>;
  /** Reads and enables pagination through a set of `PostStatusChange`. */
  postStatusChanges?: Maybe<PostStatusChangeConnection>;
  /** Get a single `PostTag`. */
  postTag?: Maybe<PostTag>;
  /** Get a single `PostTag`. */
  postTagByPostIdAndTagId?: Maybe<PostTag>;
  /** Reads and enables pagination through a set of `PostTag`. */
  postTags?: Maybe<PostTagConnection>;
  /** Reads and enables pagination through a set of `Post`. */
  posts?: Maybe<PostConnection>;
  /** Get a single `Project`. */
  project?: Maybe<Project>;
  /** Get a single `Project`. */
  projectByInboundEmailKey?: Maybe<Project>;
  /** Get a single `Project`. */
  projectBySlugAndOrganizationId?: Maybe<Project>;
  /** Get a single `ProjectLink`. */
  projectLink?: Maybe<ProjectLink>;
  /** Reads and enables pagination through a set of `ProjectLink`. */
  projectLinks?: Maybe<ProjectLinkConnection>;
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
  /** Get a single `Reaction`. */
  reaction?: Maybe<Reaction>;
  /** Get a single `Reaction`. */
  reactionByCommentIdAndUserIdAndEmoji?: Maybe<Reaction>;
  /** Get a single `Reaction`. */
  reactionByPostIdAndUserIdAndEmoji?: Maybe<Reaction>;
  /** Reads and enables pagination through a set of `Reaction`. */
  reactions?: Maybe<ReactionConnection>;
  /** Get a single `Signal`. */
  signal?: Maybe<Signal>;
  /** Get a single `SignalCluster`. */
  signalCluster?: Maybe<SignalCluster>;
  /** Reads and enables pagination through a set of `SignalCluster`. */
  signalClusters?: Maybe<SignalClusterConnection>;
  /** Reads and enables pagination through a set of `Signal`. */
  signals?: Maybe<SignalConnection>;
  /** Posts similar to a draft, to surface possible duplicates at submit time. */
  similarPosts: Array<SimilarPost>;
  /** Get a single `StatusTemplate`. */
  statusTemplate?: Maybe<StatusTemplate>;
  /** Get a single `StatusTemplate`. */
  statusTemplateByOrganizationIdAndName?: Maybe<StatusTemplate>;
  /** Reads and enables pagination through a set of `StatusTemplate`. */
  statusTemplates?: Maybe<StatusTemplateConnection>;
  /** Get a single `Tag`. */
  tag?: Maybe<Tag>;
  /** Get a single `Tag`. */
  tagByProjectIdAndName?: Maybe<Tag>;
  /** Reads and enables pagination through a set of `Tag`. */
  tags?: Maybe<TagConnection>;
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
  /** Get a single `WardenSyncQueue`. */
  wardenSyncQueue?: Maybe<WardenSyncQueue>;
  /** Reads and enables pagination through a set of `WardenSyncQueue`. */
  wardenSyncQueues?: Maybe<WardenSyncQueueConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAttachmentArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAttachmentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AttachmentCondition>;
  filter?: InputMaybe<AttachmentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AttachmentOrderBy>>;
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
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostByProjectIdAndNumberArgs = {
  number: Scalars['Int']['input'];
  projectId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostReferenceArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostReferenceBySourceTypeAndSourceIdAndTargetPostIdAndKeywordArgs = {
  keyword: Scalars['String']['input'];
  sourceId: Scalars['UUID']['input'];
  sourceType: Scalars['String']['input'];
  targetPostId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostReferencesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostReferenceCondition>;
  filter?: InputMaybe<PostReferenceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostReferenceOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPostStatusChangeArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostStatusChangesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostStatusChangeCondition>;
  filter?: InputMaybe<PostStatusChangeFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostStatusChangeOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPostTagArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostTagByPostIdAndTagIdArgs = {
  postId: Scalars['UUID']['input'];
  tagId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostTagCondition>;
  filter?: InputMaybe<PostTagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostTagOrderBy>>;
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
export type QueryProjectByInboundEmailKeyArgs = {
  inboundEmailKey: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectBySlugAndOrganizationIdArgs = {
  organizationId: Scalars['UUID']['input'];
  slug: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectLinkArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectLinksArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ProjectLinkCondition>;
  filter?: InputMaybe<ProjectLinkFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectLinkOrderBy>>;
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
export type QueryReactionArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReactionByCommentIdAndUserIdAndEmojiArgs = {
  commentId: Scalars['UUID']['input'];
  emoji: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReactionByPostIdAndUserIdAndEmojiArgs = {
  emoji: Scalars['String']['input'];
  postId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReactionCondition>;
  filter?: InputMaybe<ReactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReactionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySignalArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySignalClusterArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySignalClustersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SignalClusterCondition>;
  filter?: InputMaybe<SignalClusterFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SignalClusterOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySignalsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SignalCondition>;
  filter?: InputMaybe<SignalFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SignalOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySimilarPostsArgs = {
  content: Scalars['String']['input'];
  projectId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStatusTemplateArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryStatusTemplateByOrganizationIdAndNameArgs = {
  name: Scalars['String']['input'];
  organizationId: Scalars['UUID']['input'];
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
export type QueryTagArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTagByProjectIdAndNameArgs = {
  name: Scalars['String']['input'];
  projectId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TagCondition>;
  filter?: InputMaybe<TagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TagOrderBy>>;
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
export type QueryWardenSyncQueueArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWardenSyncQueuesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WardenSyncQueueCondition>;
  filter?: InputMaybe<WardenSyncQueueFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WardenSyncQueueOrderBy>>;
};

export type Reaction = {
  __typename?: 'Reaction';
  /** Reads a single `Comment` that is related to this `Reaction`. */
  comment?: Maybe<Comment>;
  commentId?: Maybe<Scalars['UUID']['output']>;
  createdAt: Scalars['Datetime']['output'];
  emoji: Scalars['String']['output'];
  /** Reads a single `Post` that is related to this `Reaction`. */
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['UUID']['output']>;
  rowId: Scalars['UUID']['output'];
  /** Reads a single `User` that is related to this `Reaction`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};

export type ReactionAggregates = {
  __typename?: 'ReactionAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<ReactionDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Reaction` object types. */
export type ReactionAggregatesFilter = {
  /** Distinct count aggregate over matching `Reaction` objects. */
  distinctCount?: InputMaybe<ReactionDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Reaction` object to be included within the aggregate. */
  filter?: InputMaybe<ReactionFilter>;
};

/**
 * A condition to be used against `Reaction` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ReactionCondition = {
  /** Checks for equality with the object’s `commentId` field. */
  commentId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `emoji` field. */
  emoji?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `postId` field. */
  postId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Reaction` values. */
export type ReactionConnection = {
  __typename?: 'ReactionConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<ReactionAggregates>;
  /** A list of edges which contains the `Reaction` and cursor to aid in pagination. */
  edges: Array<Maybe<ReactionEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<ReactionAggregates>>;
  /** A list of `Reaction` objects. */
  nodes: Array<Maybe<Reaction>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Reaction` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Reaction` values. */
export type ReactionConnectionGroupedAggregatesArgs = {
  groupBy: Array<ReactionGroupBy>;
  having?: InputMaybe<ReactionHavingInput>;
};

export type ReactionDistinctCountAggregateFilter = {
  commentId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  emoji?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
};

export type ReactionDistinctCountAggregates = {
  __typename?: 'ReactionDistinctCountAggregates';
  /** Distinct count of commentId across the matching connection */
  commentId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of emoji across the matching connection */
  emoji?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of postId across the matching connection */
  postId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of userId across the matching connection */
  userId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Reaction` edge in the connection. */
export type ReactionEdge = {
  __typename?: 'ReactionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Reaction` at the end of the edge. */
  node?: Maybe<Reaction>;
};

/** A filter to be used against `Reaction` object types. All fields are combined with a logical ‘and.’ */
export type ReactionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ReactionFilter>>;
  /** Filter by the object’s `comment` relation. */
  comment?: InputMaybe<CommentFilter>;
  /** A related `comment` exists. */
  commentExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `commentId` field. */
  commentId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `emoji` field. */
  emoji?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ReactionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ReactionFilter>>;
  /** Filter by the object’s `post` relation. */
  post?: InputMaybe<PostFilter>;
  /** A related `post` exists. */
  postExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `postId` field. */
  postId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Reaction` for usage during aggregation. */
export enum ReactionGroupBy {
  CommentId = 'COMMENT_ID',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Emoji = 'EMOJI',
  PostId = 'POST_ID',
  UserId = 'USER_ID'
}

export type ReactionHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ReactionHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Reaction` aggregates. */
export type ReactionHavingInput = {
  AND?: InputMaybe<Array<ReactionHavingInput>>;
  OR?: InputMaybe<Array<ReactionHavingInput>>;
  average?: InputMaybe<ReactionHavingAverageInput>;
  distinctCount?: InputMaybe<ReactionHavingDistinctCountInput>;
  max?: InputMaybe<ReactionHavingMaxInput>;
  min?: InputMaybe<ReactionHavingMinInput>;
  stddevPopulation?: InputMaybe<ReactionHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<ReactionHavingStddevSampleInput>;
  sum?: InputMaybe<ReactionHavingSumInput>;
  variancePopulation?: InputMaybe<ReactionHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<ReactionHavingVarianceSampleInput>;
};

export type ReactionHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ReactionHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ReactionHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ReactionHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ReactionHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ReactionHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ReactionHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Reaction` */
export type ReactionInput = {
  commentId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  emoji: Scalars['String']['input'];
  postId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  userId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Reaction`. */
export enum ReactionOrderBy {
  CommentIdAsc = 'COMMENT_ID_ASC',
  CommentIdDesc = 'COMMENT_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmojiAsc = 'EMOJI_ASC',
  EmojiDesc = 'EMOJI_DESC',
  Natural = 'NATURAL',
  PostIdAsc = 'POST_ID_ASC',
  PostIdDesc = 'POST_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `Reaction`. Fields that are set will be updated. */
export type ReactionPatch = {
  commentId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  emoji?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type SetNotificationPreferenceInput = {
  postUpdates: Scalars['Boolean']['input'];
};

export type Signal = {
  __typename?: 'Signal';
  aiTags?: Maybe<Scalars['JSON']['output']>;
  /** Reads a single `SignalCluster` that is related to this `Signal`. */
  cluster?: Maybe<SignalCluster>;
  clusterId?: Maybe<Scalars['UUID']['output']>;
  createdAt: Scalars['Datetime']['output'];
  organizationId: Scalars['String']['output'];
  /** Reads a single `Post` that is related to this `Signal`. */
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `Project` that is related to this `Signal`. */
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['UUID']['output']>;
  rawContent: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  sentiment?: Maybe<Scalars['String']['output']>;
  source: Scalars['String']['output'];
  sourceMetadata?: Maybe<Scalars['JSON']['output']>;
  status: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `Signal`. */
  user?: Maybe<User>;
  userId?: Maybe<Scalars['UUID']['output']>;
};

export type SignalAggregates = {
  __typename?: 'SignalAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<SignalDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Signal` object types. */
export type SignalAggregatesFilter = {
  /** Distinct count aggregate over matching `Signal` objects. */
  distinctCount?: InputMaybe<SignalDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Signal` object to be included within the aggregate. */
  filter?: InputMaybe<SignalFilter>;
};

export type SignalCluster = {
  __typename?: 'SignalCluster';
  createdAt: Scalars['Datetime']['output'];
  label?: Maybe<Scalars['String']['output']>;
  memberCount: Scalars['Int']['output'];
  /** Reads and enables pagination through a set of `Post`. */
  postsByClusterId: PostConnection;
  /** Reads a single `Project` that is related to this `SignalCluster`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Signal`. */
  signalsByClusterId: SignalConnection;
  summary?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Datetime']['output'];
};


export type SignalClusterPostsByClusterIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostCondition>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type SignalClusterSignalsByClusterIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SignalCondition>;
  filter?: InputMaybe<SignalFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SignalOrderBy>>;
};

export type SignalClusterAggregates = {
  __typename?: 'SignalClusterAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<SignalClusterAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<SignalClusterDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<SignalClusterMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<SignalClusterMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<SignalClusterStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<SignalClusterStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<SignalClusterSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<SignalClusterVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<SignalClusterVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `SignalCluster` object types. */
export type SignalClusterAggregatesFilter = {
  /** Mean average aggregate over matching `SignalCluster` objects. */
  average?: InputMaybe<SignalClusterAverageAggregateFilter>;
  /** Distinct count aggregate over matching `SignalCluster` objects. */
  distinctCount?: InputMaybe<SignalClusterDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `SignalCluster` object to be included within the aggregate. */
  filter?: InputMaybe<SignalClusterFilter>;
  /** Maximum aggregate over matching `SignalCluster` objects. */
  max?: InputMaybe<SignalClusterMaxAggregateFilter>;
  /** Minimum aggregate over matching `SignalCluster` objects. */
  min?: InputMaybe<SignalClusterMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `SignalCluster` objects. */
  stddevPopulation?: InputMaybe<SignalClusterStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `SignalCluster` objects. */
  stddevSample?: InputMaybe<SignalClusterStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `SignalCluster` objects. */
  sum?: InputMaybe<SignalClusterSumAggregateFilter>;
  /** Population variance aggregate over matching `SignalCluster` objects. */
  variancePopulation?: InputMaybe<SignalClusterVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `SignalCluster` objects. */
  varianceSample?: InputMaybe<SignalClusterVarianceSampleAggregateFilter>;
};

export type SignalClusterAverageAggregateFilter = {
  memberCount?: InputMaybe<BigFloatFilter>;
};

export type SignalClusterAverageAggregates = {
  __typename?: 'SignalClusterAverageAggregates';
  /** Mean average of memberCount across the matching connection */
  memberCount?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `SignalCluster` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SignalClusterCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `label` field. */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `memberCount` field. */
  memberCount?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `summary` field. */
  summary?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `SignalCluster` values. */
export type SignalClusterConnection = {
  __typename?: 'SignalClusterConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<SignalClusterAggregates>;
  /** A list of edges which contains the `SignalCluster` and cursor to aid in pagination. */
  edges: Array<Maybe<SignalClusterEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<SignalClusterAggregates>>;
  /** A list of `SignalCluster` objects. */
  nodes: Array<Maybe<SignalCluster>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SignalCluster` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `SignalCluster` values. */
export type SignalClusterConnectionGroupedAggregatesArgs = {
  groupBy: Array<SignalClusterGroupBy>;
  having?: InputMaybe<SignalClusterHavingInput>;
};

export type SignalClusterDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  label?: InputMaybe<BigIntFilter>;
  memberCount?: InputMaybe<BigIntFilter>;
  projectId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  summary?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
};

export type SignalClusterDistinctCountAggregates = {
  __typename?: 'SignalClusterDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of label across the matching connection */
  label?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of memberCount across the matching connection */
  memberCount?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of summary across the matching connection */
  summary?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `SignalCluster` edge in the connection. */
export type SignalClusterEdge = {
  __typename?: 'SignalClusterEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SignalCluster` at the end of the edge. */
  node?: Maybe<SignalCluster>;
};

/** A filter to be used against `SignalCluster` object types. All fields are combined with a logical ‘and.’ */
export type SignalClusterFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SignalClusterFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `label` field. */
  label?: InputMaybe<StringFilter>;
  /** Filter by the object’s `memberCount` field. */
  memberCount?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SignalClusterFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SignalClusterFilter>>;
  /** Filter by the object’s `postsByClusterId` relation. */
  postsByClusterId?: InputMaybe<SignalClusterToManyPostFilter>;
  /** Some related `postsByClusterId` exist. */
  postsByClusterIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `signalsByClusterId` relation. */
  signalsByClusterId?: InputMaybe<SignalClusterToManySignalFilter>;
  /** Some related `signalsByClusterId` exist. */
  signalsByClusterIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `summary` field. */
  summary?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `SignalCluster` for usage during aggregation. */
export enum SignalClusterGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Label = 'LABEL',
  MemberCount = 'MEMBER_COUNT',
  ProjectId = 'PROJECT_ID',
  Summary = 'SUMMARY',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type SignalClusterHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  memberCount?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalClusterHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  memberCount?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `SignalCluster` aggregates. */
export type SignalClusterHavingInput = {
  AND?: InputMaybe<Array<SignalClusterHavingInput>>;
  OR?: InputMaybe<Array<SignalClusterHavingInput>>;
  average?: InputMaybe<SignalClusterHavingAverageInput>;
  distinctCount?: InputMaybe<SignalClusterHavingDistinctCountInput>;
  max?: InputMaybe<SignalClusterHavingMaxInput>;
  min?: InputMaybe<SignalClusterHavingMinInput>;
  stddevPopulation?: InputMaybe<SignalClusterHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<SignalClusterHavingStddevSampleInput>;
  sum?: InputMaybe<SignalClusterHavingSumInput>;
  variancePopulation?: InputMaybe<SignalClusterHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<SignalClusterHavingVarianceSampleInput>;
};

export type SignalClusterHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  memberCount?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalClusterHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  memberCount?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalClusterHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  memberCount?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalClusterHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  memberCount?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalClusterHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  memberCount?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalClusterHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  memberCount?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalClusterHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  memberCount?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `SignalCluster` */
export type SignalClusterInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  memberCount?: InputMaybe<Scalars['Int']['input']>;
  projectId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type SignalClusterMaxAggregateFilter = {
  memberCount?: InputMaybe<IntFilter>;
};

export type SignalClusterMaxAggregates = {
  __typename?: 'SignalClusterMaxAggregates';
  /** Maximum of memberCount across the matching connection */
  memberCount?: Maybe<Scalars['Int']['output']>;
};

export type SignalClusterMinAggregateFilter = {
  memberCount?: InputMaybe<IntFilter>;
};

export type SignalClusterMinAggregates = {
  __typename?: 'SignalClusterMinAggregates';
  /** Minimum of memberCount across the matching connection */
  memberCount?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `SignalCluster`. */
export enum SignalClusterOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  LabelAsc = 'LABEL_ASC',
  LabelDesc = 'LABEL_DESC',
  MemberCountAsc = 'MEMBER_COUNT_ASC',
  MemberCountDesc = 'MEMBER_COUNT_DESC',
  Natural = 'NATURAL',
  PostsByClusterIdAverageNumberAsc = 'POSTS_BY_CLUSTER_ID_AVERAGE_NUMBER_ASC',
  PostsByClusterIdAverageNumberDesc = 'POSTS_BY_CLUSTER_ID_AVERAGE_NUMBER_DESC',
  PostsByClusterIdCountAsc = 'POSTS_BY_CLUSTER_ID_COUNT_ASC',
  PostsByClusterIdCountDesc = 'POSTS_BY_CLUSTER_ID_COUNT_DESC',
  PostsByClusterIdDistinctCountAiTagsAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_AI_TAGS_ASC',
  PostsByClusterIdDistinctCountAiTagsDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_AI_TAGS_DESC',
  PostsByClusterIdDistinctCountClusterIdAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_CLUSTER_ID_ASC',
  PostsByClusterIdDistinctCountClusterIdDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_CLUSTER_ID_DESC',
  PostsByClusterIdDistinctCountCreatedAtAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  PostsByClusterIdDistinctCountCreatedAtDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  PostsByClusterIdDistinctCountDescriptionAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_DESCRIPTION_ASC',
  PostsByClusterIdDistinctCountDescriptionDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_DESCRIPTION_DESC',
  PostsByClusterIdDistinctCountDuplicateOfIdAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_DUPLICATE_OF_ID_ASC',
  PostsByClusterIdDistinctCountDuplicateOfIdDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_DUPLICATE_OF_ID_DESC',
  PostsByClusterIdDistinctCountNumberAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_NUMBER_ASC',
  PostsByClusterIdDistinctCountNumberDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_NUMBER_DESC',
  PostsByClusterIdDistinctCountProjectIdAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_PROJECT_ID_ASC',
  PostsByClusterIdDistinctCountProjectIdDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_PROJECT_ID_DESC',
  PostsByClusterIdDistinctCountRowIdAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_ROW_ID_ASC',
  PostsByClusterIdDistinctCountRowIdDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_ROW_ID_DESC',
  PostsByClusterIdDistinctCountSentimentAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_SENTIMENT_ASC',
  PostsByClusterIdDistinctCountSentimentDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_SENTIMENT_DESC',
  PostsByClusterIdDistinctCountShippedAtAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_SHIPPED_AT_ASC',
  PostsByClusterIdDistinctCountShippedAtDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_SHIPPED_AT_DESC',
  PostsByClusterIdDistinctCountSourceAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_SOURCE_ASC',
  PostsByClusterIdDistinctCountSourceDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_SOURCE_DESC',
  PostsByClusterIdDistinctCountStatusTemplateIdAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_STATUS_TEMPLATE_ID_ASC',
  PostsByClusterIdDistinctCountStatusTemplateIdDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_STATUS_TEMPLATE_ID_DESC',
  PostsByClusterIdDistinctCountStatusUpdatedAtAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_STATUS_UPDATED_AT_ASC',
  PostsByClusterIdDistinctCountStatusUpdatedAtDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_STATUS_UPDATED_AT_DESC',
  PostsByClusterIdDistinctCountTitleAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_TITLE_ASC',
  PostsByClusterIdDistinctCountTitleDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_TITLE_DESC',
  PostsByClusterIdDistinctCountUpdatedAtAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_UPDATED_AT_ASC',
  PostsByClusterIdDistinctCountUpdatedAtDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_UPDATED_AT_DESC',
  PostsByClusterIdDistinctCountUserIdAsc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_USER_ID_ASC',
  PostsByClusterIdDistinctCountUserIdDesc = 'POSTS_BY_CLUSTER_ID_DISTINCT_COUNT_USER_ID_DESC',
  PostsByClusterIdMaxNumberAsc = 'POSTS_BY_CLUSTER_ID_MAX_NUMBER_ASC',
  PostsByClusterIdMaxNumberDesc = 'POSTS_BY_CLUSTER_ID_MAX_NUMBER_DESC',
  PostsByClusterIdMinNumberAsc = 'POSTS_BY_CLUSTER_ID_MIN_NUMBER_ASC',
  PostsByClusterIdMinNumberDesc = 'POSTS_BY_CLUSTER_ID_MIN_NUMBER_DESC',
  PostsByClusterIdStddevPopulationNumberAsc = 'POSTS_BY_CLUSTER_ID_STDDEV_POPULATION_NUMBER_ASC',
  PostsByClusterIdStddevPopulationNumberDesc = 'POSTS_BY_CLUSTER_ID_STDDEV_POPULATION_NUMBER_DESC',
  PostsByClusterIdStddevSampleNumberAsc = 'POSTS_BY_CLUSTER_ID_STDDEV_SAMPLE_NUMBER_ASC',
  PostsByClusterIdStddevSampleNumberDesc = 'POSTS_BY_CLUSTER_ID_STDDEV_SAMPLE_NUMBER_DESC',
  PostsByClusterIdSumNumberAsc = 'POSTS_BY_CLUSTER_ID_SUM_NUMBER_ASC',
  PostsByClusterIdSumNumberDesc = 'POSTS_BY_CLUSTER_ID_SUM_NUMBER_DESC',
  PostsByClusterIdVariancePopulationNumberAsc = 'POSTS_BY_CLUSTER_ID_VARIANCE_POPULATION_NUMBER_ASC',
  PostsByClusterIdVariancePopulationNumberDesc = 'POSTS_BY_CLUSTER_ID_VARIANCE_POPULATION_NUMBER_DESC',
  PostsByClusterIdVarianceSampleNumberAsc = 'POSTS_BY_CLUSTER_ID_VARIANCE_SAMPLE_NUMBER_ASC',
  PostsByClusterIdVarianceSampleNumberDesc = 'POSTS_BY_CLUSTER_ID_VARIANCE_SAMPLE_NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SignalsByClusterIdCountAsc = 'SIGNALS_BY_CLUSTER_ID_COUNT_ASC',
  SignalsByClusterIdCountDesc = 'SIGNALS_BY_CLUSTER_ID_COUNT_DESC',
  SignalsByClusterIdDistinctCountAiTagsAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_AI_TAGS_ASC',
  SignalsByClusterIdDistinctCountAiTagsDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_AI_TAGS_DESC',
  SignalsByClusterIdDistinctCountClusterIdAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_CLUSTER_ID_ASC',
  SignalsByClusterIdDistinctCountClusterIdDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_CLUSTER_ID_DESC',
  SignalsByClusterIdDistinctCountCreatedAtAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  SignalsByClusterIdDistinctCountCreatedAtDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  SignalsByClusterIdDistinctCountOrganizationIdAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  SignalsByClusterIdDistinctCountOrganizationIdDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  SignalsByClusterIdDistinctCountPostIdAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_POST_ID_ASC',
  SignalsByClusterIdDistinctCountPostIdDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_POST_ID_DESC',
  SignalsByClusterIdDistinctCountProjectIdAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_PROJECT_ID_ASC',
  SignalsByClusterIdDistinctCountProjectIdDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_PROJECT_ID_DESC',
  SignalsByClusterIdDistinctCountRawContentAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_RAW_CONTENT_ASC',
  SignalsByClusterIdDistinctCountRawContentDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_RAW_CONTENT_DESC',
  SignalsByClusterIdDistinctCountRowIdAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_ROW_ID_ASC',
  SignalsByClusterIdDistinctCountRowIdDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_ROW_ID_DESC',
  SignalsByClusterIdDistinctCountSentimentAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_SENTIMENT_ASC',
  SignalsByClusterIdDistinctCountSentimentDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_SENTIMENT_DESC',
  SignalsByClusterIdDistinctCountSourceAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_SOURCE_ASC',
  SignalsByClusterIdDistinctCountSourceDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_SOURCE_DESC',
  SignalsByClusterIdDistinctCountSourceMetadataAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_SOURCE_METADATA_ASC',
  SignalsByClusterIdDistinctCountSourceMetadataDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_SOURCE_METADATA_DESC',
  SignalsByClusterIdDistinctCountStatusAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_STATUS_ASC',
  SignalsByClusterIdDistinctCountStatusDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_STATUS_DESC',
  SignalsByClusterIdDistinctCountTypeAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_TYPE_ASC',
  SignalsByClusterIdDistinctCountTypeDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_TYPE_DESC',
  SignalsByClusterIdDistinctCountUpdatedAtAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_UPDATED_AT_ASC',
  SignalsByClusterIdDistinctCountUpdatedAtDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_UPDATED_AT_DESC',
  SignalsByClusterIdDistinctCountUserIdAsc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_USER_ID_ASC',
  SignalsByClusterIdDistinctCountUserIdDesc = 'SIGNALS_BY_CLUSTER_ID_DISTINCT_COUNT_USER_ID_DESC',
  SummaryAsc = 'SUMMARY_ASC',
  SummaryDesc = 'SUMMARY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `SignalCluster`. Fields that are set will be updated. */
export type SignalClusterPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  memberCount?: InputMaybe<Scalars['Int']['input']>;
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type SignalClusterStddevPopulationAggregateFilter = {
  memberCount?: InputMaybe<BigFloatFilter>;
};

export type SignalClusterStddevPopulationAggregates = {
  __typename?: 'SignalClusterStddevPopulationAggregates';
  /** Population standard deviation of memberCount across the matching connection */
  memberCount?: Maybe<Scalars['BigFloat']['output']>;
};

export type SignalClusterStddevSampleAggregateFilter = {
  memberCount?: InputMaybe<BigFloatFilter>;
};

export type SignalClusterStddevSampleAggregates = {
  __typename?: 'SignalClusterStddevSampleAggregates';
  /** Sample standard deviation of memberCount across the matching connection */
  memberCount?: Maybe<Scalars['BigFloat']['output']>;
};

export type SignalClusterSumAggregateFilter = {
  memberCount?: InputMaybe<BigIntFilter>;
};

export type SignalClusterSumAggregates = {
  __typename?: 'SignalClusterSumAggregates';
  /** Sum of memberCount across the matching connection */
  memberCount: Scalars['BigInt']['output'];
};

/** A filter to be used against many `Post` object types. All fields are combined with a logical ‘and.’ */
export type SignalClusterToManyPostFilter = {
  /** Aggregates across related `Post` match the filter criteria. */
  aggregates?: InputMaybe<PostAggregatesFilter>;
  /** Every related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostFilter>;
  /** No related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostFilter>;
  /** Some related `Post` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostFilter>;
};

/** A filter to be used against many `Signal` object types. All fields are combined with a logical ‘and.’ */
export type SignalClusterToManySignalFilter = {
  /** Aggregates across related `Signal` match the filter criteria. */
  aggregates?: InputMaybe<SignalAggregatesFilter>;
  /** Every related `Signal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<SignalFilter>;
  /** No related `Signal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<SignalFilter>;
  /** Some related `Signal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<SignalFilter>;
};

export type SignalClusterVariancePopulationAggregateFilter = {
  memberCount?: InputMaybe<BigFloatFilter>;
};

export type SignalClusterVariancePopulationAggregates = {
  __typename?: 'SignalClusterVariancePopulationAggregates';
  /** Population variance of memberCount across the matching connection */
  memberCount?: Maybe<Scalars['BigFloat']['output']>;
};

export type SignalClusterVarianceSampleAggregateFilter = {
  memberCount?: InputMaybe<BigFloatFilter>;
};

export type SignalClusterVarianceSampleAggregates = {
  __typename?: 'SignalClusterVarianceSampleAggregates';
  /** Sample variance of memberCount across the matching connection */
  memberCount?: Maybe<Scalars['BigFloat']['output']>;
};

/** A condition to be used against `Signal` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SignalCondition = {
  /** Checks for equality with the object’s `clusterId` field. */
  clusterId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `postId` field. */
  postId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rawContent` field. */
  rawContent?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `sentiment` field. */
  sentiment?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `source` field. */
  source?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Signal` values. */
export type SignalConnection = {
  __typename?: 'SignalConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<SignalAggregates>;
  /** A list of edges which contains the `Signal` and cursor to aid in pagination. */
  edges: Array<Maybe<SignalEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<SignalAggregates>>;
  /** A list of `Signal` objects. */
  nodes: Array<Maybe<Signal>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Signal` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Signal` values. */
export type SignalConnectionGroupedAggregatesArgs = {
  groupBy: Array<SignalGroupBy>;
  having?: InputMaybe<SignalHavingInput>;
};

export type SignalDistinctCountAggregateFilter = {
  aiTags?: InputMaybe<BigIntFilter>;
  clusterId?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  projectId?: InputMaybe<BigIntFilter>;
  rawContent?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  sentiment?: InputMaybe<BigIntFilter>;
  source?: InputMaybe<BigIntFilter>;
  sourceMetadata?: InputMaybe<BigIntFilter>;
  status?: InputMaybe<BigIntFilter>;
  type?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
};

export type SignalDistinctCountAggregates = {
  __typename?: 'SignalDistinctCountAggregates';
  /** Distinct count of aiTags across the matching connection */
  aiTags?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of clusterId across the matching connection */
  clusterId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of postId across the matching connection */
  postId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rawContent across the matching connection */
  rawContent?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of sentiment across the matching connection */
  sentiment?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of source across the matching connection */
  source?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of sourceMetadata across the matching connection */
  sourceMetadata?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of status across the matching connection */
  status?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of userId across the matching connection */
  userId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Signal` edge in the connection. */
export type SignalEdge = {
  __typename?: 'SignalEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Signal` at the end of the edge. */
  node?: Maybe<Signal>;
};

/** A filter to be used against `Signal` object types. All fields are combined with a logical ‘and.’ */
export type SignalFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SignalFilter>>;
  /** Filter by the object’s `cluster` relation. */
  cluster?: InputMaybe<SignalClusterFilter>;
  /** A related `cluster` exists. */
  clusterExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `clusterId` field. */
  clusterId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SignalFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SignalFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `post` relation. */
  post?: InputMaybe<PostFilter>;
  /** A related `post` exists. */
  postExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `postId` field. */
  postId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** A related `project` exists. */
  projectExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rawContent` field. */
  rawContent?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `sentiment` field. */
  sentiment?: InputMaybe<StringFilter>;
  /** Filter by the object’s `source` field. */
  source?: InputMaybe<StringFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** A related `user` exists. */
  userExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Signal` for usage during aggregation. */
export enum SignalGroupBy {
  AiTags = 'AI_TAGS',
  ClusterId = 'CLUSTER_ID',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  OrganizationId = 'ORGANIZATION_ID',
  PostId = 'POST_ID',
  ProjectId = 'PROJECT_ID',
  RawContent = 'RAW_CONTENT',
  Sentiment = 'SENTIMENT',
  Source = 'SOURCE',
  SourceMetadata = 'SOURCE_METADATA',
  Status = 'STATUS',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  UserId = 'USER_ID'
}

export type SignalHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Signal` aggregates. */
export type SignalHavingInput = {
  AND?: InputMaybe<Array<SignalHavingInput>>;
  OR?: InputMaybe<Array<SignalHavingInput>>;
  average?: InputMaybe<SignalHavingAverageInput>;
  distinctCount?: InputMaybe<SignalHavingDistinctCountInput>;
  max?: InputMaybe<SignalHavingMaxInput>;
  min?: InputMaybe<SignalHavingMinInput>;
  stddevPopulation?: InputMaybe<SignalHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<SignalHavingStddevSampleInput>;
  sum?: InputMaybe<SignalHavingSumInput>;
  variancePopulation?: InputMaybe<SignalHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<SignalHavingVarianceSampleInput>;
};

export type SignalHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SignalHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `Signal`. */
export enum SignalOrderBy {
  ClusterIdAsc = 'CLUSTER_ID_ASC',
  ClusterIdDesc = 'CLUSTER_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PostIdAsc = 'POST_ID_ASC',
  PostIdDesc = 'POST_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  RawContentAsc = 'RAW_CONTENT_ASC',
  RawContentDesc = 'RAW_CONTENT_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SentimentAsc = 'SENTIMENT_ASC',
  SentimentDesc = 'SENTIMENT_DESC',
  SourceAsc = 'SOURCE_ASC',
  SourceDesc = 'SOURCE_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

export type SimilarPost = {
  __typename?: 'SimilarPost';
  id: Scalars['UUID']['output'];
  number?: Maybe<Scalars['Int']['output']>;
  score: Scalars['Float']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type StatusTemplate = {
  __typename?: 'StatusTemplate';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  keywordRole?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  organizationId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `PostStatusChange`. */
  postStatusChangesByToStatusTemplateId: PostStatusChangeConnection;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostConnection;
  /** Reads and enables pagination through a set of `ProjectStatusConfig`. */
  projectStatusConfigs: ProjectStatusConfigConnection;
  rowId: Scalars['UUID']['output'];
  showOnRoadmap?: Maybe<Scalars['Boolean']['output']>;
  sortOrder?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Datetime']['output'];
};


export type StatusTemplatePostStatusChangesByToStatusTemplateIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostStatusChangeCondition>;
  filter?: InputMaybe<PostStatusChangeFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostStatusChangeOrderBy>>;
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
  /** Checks for equality with the object’s `keywordRole` field. */
  keywordRole?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `showOnRoadmap` field. */
  showOnRoadmap?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `sortOrder` field. */
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
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
  /** Distinct count of keywordRole across the matching connection */
  keywordRole?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of showOnRoadmap across the matching connection */
  showOnRoadmap?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `keywordRole` field. */
  keywordRole?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<StatusTemplateFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<StatusTemplateFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `postStatusChangesByToStatusTemplateId` relation. */
  postStatusChangesByToStatusTemplateId?: InputMaybe<StatusTemplateToManyPostStatusChangeFilter>;
  /** Some related `postStatusChangesByToStatusTemplateId` exist. */
  postStatusChangesByToStatusTemplateIdExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  /** Filter by the object’s `showOnRoadmap` field. */
  showOnRoadmap?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `sortOrder` field. */
  sortOrder?: InputMaybe<IntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `StatusTemplate` for usage during aggregation. */
export enum StatusTemplateGroupBy {
  Color = 'COLOR',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  DisplayName = 'DISPLAY_NAME',
  KeywordRole = 'KEYWORD_ROLE',
  Name = 'NAME',
  OrganizationId = 'ORGANIZATION_ID',
  ShowOnRoadmap = 'SHOW_ON_ROADMAP',
  SortOrder = 'SORT_ORDER',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
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
  keywordRole?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  showOnRoadmap?: InputMaybe<Scalars['Boolean']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type StatusTemplateMaxAggregates = {
  __typename?: 'StatusTemplateMaxAggregates';
  /** Maximum of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['Int']['output']>;
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
  KeywordRoleAsc = 'KEYWORD_ROLE_ASC',
  KeywordRoleDesc = 'KEYWORD_ROLE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PostsAverageNumberAsc = 'POSTS_AVERAGE_NUMBER_ASC',
  PostsAverageNumberDesc = 'POSTS_AVERAGE_NUMBER_DESC',
  PostsCountAsc = 'POSTS_COUNT_ASC',
  PostsCountDesc = 'POSTS_COUNT_DESC',
  PostsDistinctCountAiTagsAsc = 'POSTS_DISTINCT_COUNT_AI_TAGS_ASC',
  PostsDistinctCountAiTagsDesc = 'POSTS_DISTINCT_COUNT_AI_TAGS_DESC',
  PostsDistinctCountClusterIdAsc = 'POSTS_DISTINCT_COUNT_CLUSTER_ID_ASC',
  PostsDistinctCountClusterIdDesc = 'POSTS_DISTINCT_COUNT_CLUSTER_ID_DESC',
  PostsDistinctCountCreatedAtAsc = 'POSTS_DISTINCT_COUNT_CREATED_AT_ASC',
  PostsDistinctCountCreatedAtDesc = 'POSTS_DISTINCT_COUNT_CREATED_AT_DESC',
  PostsDistinctCountDescriptionAsc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_ASC',
  PostsDistinctCountDescriptionDesc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_DESC',
  PostsDistinctCountDuplicateOfIdAsc = 'POSTS_DISTINCT_COUNT_DUPLICATE_OF_ID_ASC',
  PostsDistinctCountDuplicateOfIdDesc = 'POSTS_DISTINCT_COUNT_DUPLICATE_OF_ID_DESC',
  PostsDistinctCountNumberAsc = 'POSTS_DISTINCT_COUNT_NUMBER_ASC',
  PostsDistinctCountNumberDesc = 'POSTS_DISTINCT_COUNT_NUMBER_DESC',
  PostsDistinctCountProjectIdAsc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_ASC',
  PostsDistinctCountProjectIdDesc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_DESC',
  PostsDistinctCountRowIdAsc = 'POSTS_DISTINCT_COUNT_ROW_ID_ASC',
  PostsDistinctCountRowIdDesc = 'POSTS_DISTINCT_COUNT_ROW_ID_DESC',
  PostsDistinctCountSentimentAsc = 'POSTS_DISTINCT_COUNT_SENTIMENT_ASC',
  PostsDistinctCountSentimentDesc = 'POSTS_DISTINCT_COUNT_SENTIMENT_DESC',
  PostsDistinctCountShippedAtAsc = 'POSTS_DISTINCT_COUNT_SHIPPED_AT_ASC',
  PostsDistinctCountShippedAtDesc = 'POSTS_DISTINCT_COUNT_SHIPPED_AT_DESC',
  PostsDistinctCountSourceAsc = 'POSTS_DISTINCT_COUNT_SOURCE_ASC',
  PostsDistinctCountSourceDesc = 'POSTS_DISTINCT_COUNT_SOURCE_DESC',
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
  PostsMaxNumberAsc = 'POSTS_MAX_NUMBER_ASC',
  PostsMaxNumberDesc = 'POSTS_MAX_NUMBER_DESC',
  PostsMinNumberAsc = 'POSTS_MIN_NUMBER_ASC',
  PostsMinNumberDesc = 'POSTS_MIN_NUMBER_DESC',
  PostsStddevPopulationNumberAsc = 'POSTS_STDDEV_POPULATION_NUMBER_ASC',
  PostsStddevPopulationNumberDesc = 'POSTS_STDDEV_POPULATION_NUMBER_DESC',
  PostsStddevSampleNumberAsc = 'POSTS_STDDEV_SAMPLE_NUMBER_ASC',
  PostsStddevSampleNumberDesc = 'POSTS_STDDEV_SAMPLE_NUMBER_DESC',
  PostsSumNumberAsc = 'POSTS_SUM_NUMBER_ASC',
  PostsSumNumberDesc = 'POSTS_SUM_NUMBER_DESC',
  PostsVariancePopulationNumberAsc = 'POSTS_VARIANCE_POPULATION_NUMBER_ASC',
  PostsVariancePopulationNumberDesc = 'POSTS_VARIANCE_POPULATION_NUMBER_DESC',
  PostsVarianceSampleNumberAsc = 'POSTS_VARIANCE_SAMPLE_NUMBER_ASC',
  PostsVarianceSampleNumberDesc = 'POSTS_VARIANCE_SAMPLE_NUMBER_DESC',
  PostStatusChangesByToStatusTemplateIdCountAsc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_COUNT_ASC',
  PostStatusChangesByToStatusTemplateIdCountDesc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_COUNT_DESC',
  PostStatusChangesByToStatusTemplateIdDistinctCountChangedByIdAsc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_DISTINCT_COUNT_CHANGED_BY_ID_ASC',
  PostStatusChangesByToStatusTemplateIdDistinctCountChangedByIdDesc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_DISTINCT_COUNT_CHANGED_BY_ID_DESC',
  PostStatusChangesByToStatusTemplateIdDistinctCountCreatedAtAsc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  PostStatusChangesByToStatusTemplateIdDistinctCountCreatedAtDesc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  PostStatusChangesByToStatusTemplateIdDistinctCountNoteAsc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_DISTINCT_COUNT_NOTE_ASC',
  PostStatusChangesByToStatusTemplateIdDistinctCountNoteDesc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_DISTINCT_COUNT_NOTE_DESC',
  PostStatusChangesByToStatusTemplateIdDistinctCountPostIdAsc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_DISTINCT_COUNT_POST_ID_ASC',
  PostStatusChangesByToStatusTemplateIdDistinctCountPostIdDesc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_DISTINCT_COUNT_POST_ID_DESC',
  PostStatusChangesByToStatusTemplateIdDistinctCountRowIdAsc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_DISTINCT_COUNT_ROW_ID_ASC',
  PostStatusChangesByToStatusTemplateIdDistinctCountRowIdDesc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_DISTINCT_COUNT_ROW_ID_DESC',
  PostStatusChangesByToStatusTemplateIdDistinctCountToStatusTemplateIdAsc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_DISTINCT_COUNT_TO_STATUS_TEMPLATE_ID_ASC',
  PostStatusChangesByToStatusTemplateIdDistinctCountToStatusTemplateIdDesc = 'POST_STATUS_CHANGES_BY_TO_STATUS_TEMPLATE_ID_DISTINCT_COUNT_TO_STATUS_TEMPLATE_ID_DESC',
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
  ShowOnRoadmapAsc = 'SHOW_ON_ROADMAP_ASC',
  ShowOnRoadmapDesc = 'SHOW_ON_ROADMAP_DESC',
  SortOrderAsc = 'SORT_ORDER_ASC',
  SortOrderDesc = 'SORT_ORDER_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `StatusTemplate`. Fields that are set will be updated. */
export type StatusTemplatePatch = {
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  keywordRole?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  showOnRoadmap?: InputMaybe<Scalars['Boolean']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type StatusTemplateStddevPopulationAggregates = {
  __typename?: 'StatusTemplateStddevPopulationAggregates';
  /** Population standard deviation of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
};

export type StatusTemplateStddevSampleAggregates = {
  __typename?: 'StatusTemplateStddevSampleAggregates';
  /** Sample standard deviation of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
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

/** A filter to be used against many `PostStatusChange` object types. All fields are combined with a logical ‘and.’ */
export type StatusTemplateToManyPostStatusChangeFilter = {
  /** Aggregates across related `PostStatusChange` match the filter criteria. */
  aggregates?: InputMaybe<PostStatusChangeAggregatesFilter>;
  /** Every related `PostStatusChange` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostStatusChangeFilter>;
  /** No related `PostStatusChange` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostStatusChangeFilter>;
  /** Some related `PostStatusChange` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostStatusChangeFilter>;
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

export type StatusTemplateVariancePopulationAggregates = {
  __typename?: 'StatusTemplateVariancePopulationAggregates';
  /** Population variance of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigFloat']['output']>;
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

export type Tag = {
  __typename?: 'Tag';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Datetime']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `PostTag`. */
  postTags: PostTagConnection;
  /** Reads a single `Project` that is related to this `Tag`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt: Scalars['Datetime']['output'];
};


export type TagPostTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostTagCondition>;
  filter?: InputMaybe<PostTagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostTagOrderBy>>;
};

export type TagAggregates = {
  __typename?: 'TagAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<TagDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Tag` object types. */
export type TagAggregatesFilter = {
  /** Distinct count aggregate over matching `Tag` objects. */
  distinctCount?: InputMaybe<TagDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Tag` object to be included within the aggregate. */
  filter?: InputMaybe<TagFilter>;
};

/** A condition to be used against `Tag` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TagCondition = {
  /** Checks for equality with the object’s `color` field. */
  color?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `Tag` values. */
export type TagConnection = {
  __typename?: 'TagConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<TagAggregates>;
  /** A list of edges which contains the `Tag` and cursor to aid in pagination. */
  edges: Array<Maybe<TagEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<TagAggregates>>;
  /** A list of `Tag` objects. */
  nodes: Array<Maybe<Tag>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tag` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Tag` values. */
export type TagConnectionGroupedAggregatesArgs = {
  groupBy: Array<TagGroupBy>;
  having?: InputMaybe<TagHavingInput>;
};

export type TagDistinctCountAggregateFilter = {
  color?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<BigIntFilter>;
  projectId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
};

export type TagDistinctCountAggregates = {
  __typename?: 'TagDistinctCountAggregates';
  /** Distinct count of color across the matching connection */
  color?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Tag` edge in the connection. */
export type TagEdge = {
  __typename?: 'TagEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Tag` at the end of the edge. */
  node?: Maybe<Tag>;
};

/** A filter to be used against `Tag` object types. All fields are combined with a logical ‘and.’ */
export type TagFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TagFilter>>;
  /** Filter by the object’s `color` field. */
  color?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TagFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TagFilter>>;
  /** Filter by the object’s `postTags` relation. */
  postTags?: InputMaybe<TagToManyPostTagFilter>;
  /** Some related `postTags` exist. */
  postTagsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `Tag` for usage during aggregation. */
export enum TagGroupBy {
  Color = 'COLOR',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Name = 'NAME',
  ProjectId = 'PROJECT_ID',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type TagHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type TagHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Tag` aggregates. */
export type TagHavingInput = {
  AND?: InputMaybe<Array<TagHavingInput>>;
  OR?: InputMaybe<Array<TagHavingInput>>;
  average?: InputMaybe<TagHavingAverageInput>;
  distinctCount?: InputMaybe<TagHavingDistinctCountInput>;
  max?: InputMaybe<TagHavingMaxInput>;
  min?: InputMaybe<TagHavingMinInput>;
  stddevPopulation?: InputMaybe<TagHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<TagHavingStddevSampleInput>;
  sum?: InputMaybe<TagHavingSumInput>;
  variancePopulation?: InputMaybe<TagHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<TagHavingVarianceSampleInput>;
};

export type TagHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type TagHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type TagHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type TagHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type TagHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type TagHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type TagHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Tag` */
export type TagInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Tag`. */
export enum TagOrderBy {
  ColorAsc = 'COLOR_ASC',
  ColorDesc = 'COLOR_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PostTagsCountAsc = 'POST_TAGS_COUNT_ASC',
  PostTagsCountDesc = 'POST_TAGS_COUNT_DESC',
  PostTagsDistinctCountCreatedAtAsc = 'POST_TAGS_DISTINCT_COUNT_CREATED_AT_ASC',
  PostTagsDistinctCountCreatedAtDesc = 'POST_TAGS_DISTINCT_COUNT_CREATED_AT_DESC',
  PostTagsDistinctCountPostIdAsc = 'POST_TAGS_DISTINCT_COUNT_POST_ID_ASC',
  PostTagsDistinctCountPostIdDesc = 'POST_TAGS_DISTINCT_COUNT_POST_ID_DESC',
  PostTagsDistinctCountRowIdAsc = 'POST_TAGS_DISTINCT_COUNT_ROW_ID_ASC',
  PostTagsDistinctCountRowIdDesc = 'POST_TAGS_DISTINCT_COUNT_ROW_ID_DESC',
  PostTagsDistinctCountTagIdAsc = 'POST_TAGS_DISTINCT_COUNT_TAG_ID_ASC',
  PostTagsDistinctCountTagIdDesc = 'POST_TAGS_DISTINCT_COUNT_TAG_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `Tag`. Fields that are set will be updated. */
export type TagPatch = {
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against many `PostTag` object types. All fields are combined with a logical ‘and.’ */
export type TagToManyPostTagFilter = {
  /** Aggregates across related `PostTag` match the filter criteria. */
  aggregates?: InputMaybe<PostTagAggregatesFilter>;
  /** Every related `PostTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostTagFilter>;
  /** No related `PostTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostTagFilter>;
  /** Some related `PostTag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostTagFilter>;
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

/** All input for the `updateAttachment` mutation. */
export type UpdateAttachmentInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Attachment` being updated. */
  patch: AttachmentPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Attachment` mutation. */
export type UpdateAttachmentPayload = {
  __typename?: 'UpdateAttachmentPayload';
  /** The `Attachment` that was updated by this mutation. */
  attachment?: Maybe<Attachment>;
  /** An edge for our `Attachment`. May be used by Relay 1. */
  attachmentEdge?: Maybe<AttachmentEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Attachment` mutation. */
export type UpdateAttachmentPayloadAttachmentEdgeArgs = {
  orderBy?: Array<AttachmentOrderBy>;
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

/** All input for the `updatePostReference` mutation. */
export type UpdatePostReferenceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `PostReference` being updated. */
  patch: PostReferencePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `PostReference` mutation. */
export type UpdatePostReferencePayload = {
  __typename?: 'UpdatePostReferencePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `PostReference` that was updated by this mutation. */
  postReference?: Maybe<PostReference>;
  /** An edge for our `PostReference`. May be used by Relay 1. */
  postReferenceEdge?: Maybe<PostReferenceEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PostReference` mutation. */
export type UpdatePostReferencePayloadPostReferenceEdgeArgs = {
  orderBy?: Array<PostReferenceOrderBy>;
};

/** All input for the `updatePostTag` mutation. */
export type UpdatePostTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `PostTag` being updated. */
  patch: PostTagPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `PostTag` mutation. */
export type UpdatePostTagPayload = {
  __typename?: 'UpdatePostTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `PostTag` that was updated by this mutation. */
  postTag?: Maybe<PostTag>;
  /** An edge for our `PostTag`. May be used by Relay 1. */
  postTagEdge?: Maybe<PostTagEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PostTag` mutation. */
export type UpdatePostTagPayloadPostTagEdgeArgs = {
  orderBy?: Array<PostTagOrderBy>;
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

/** All input for the `updateProjectLink` mutation. */
export type UpdateProjectLinkInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `ProjectLink` being updated. */
  patch: ProjectLinkPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `ProjectLink` mutation. */
export type UpdateProjectLinkPayload = {
  __typename?: 'UpdateProjectLinkPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ProjectLink` that was updated by this mutation. */
  projectLink?: Maybe<ProjectLink>;
  /** An edge for our `ProjectLink`. May be used by Relay 1. */
  projectLinkEdge?: Maybe<ProjectLinkEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `ProjectLink` mutation. */
export type UpdateProjectLinkPayloadProjectLinkEdgeArgs = {
  orderBy?: Array<ProjectLinkOrderBy>;
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

/** All input for the `updateReaction` mutation. */
export type UpdateReactionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Reaction` being updated. */
  patch: ReactionPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Reaction` mutation. */
export type UpdateReactionPayload = {
  __typename?: 'UpdateReactionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Reaction` that was updated by this mutation. */
  reaction?: Maybe<Reaction>;
  /** An edge for our `Reaction`. May be used by Relay 1. */
  reactionEdge?: Maybe<ReactionEdge>;
};


/** The output of our update `Reaction` mutation. */
export type UpdateReactionPayloadReactionEdgeArgs = {
  orderBy?: Array<ReactionOrderBy>;
};

/** All input for the `updateSignalCluster` mutation. */
export type UpdateSignalClusterInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `SignalCluster` being updated. */
  patch: SignalClusterPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `SignalCluster` mutation. */
export type UpdateSignalClusterPayload = {
  __typename?: 'UpdateSignalClusterPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SignalCluster` that was updated by this mutation. */
  signalCluster?: Maybe<SignalCluster>;
  /** An edge for our `SignalCluster`. May be used by Relay 1. */
  signalClusterEdge?: Maybe<SignalClusterEdge>;
};


/** The output of our update `SignalCluster` mutation. */
export type UpdateSignalClusterPayloadSignalClusterEdgeArgs = {
  orderBy?: Array<SignalClusterOrderBy>;
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

/** All input for the `updateTag` mutation. */
export type UpdateTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Tag` being updated. */
  patch: TagPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Tag` mutation. */
export type UpdateTagPayload = {
  __typename?: 'UpdateTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Tag` that was updated by this mutation. */
  tag?: Maybe<Tag>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagEdge>;
};


/** The output of our update `Tag` mutation. */
export type UpdateTagPayloadTagEdgeArgs = {
  orderBy?: Array<TagOrderBy>;
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

/** All input for the `updateWardenSyncQueue` mutation. */
export type UpdateWardenSyncQueueInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `WardenSyncQueue` being updated. */
  patch: WardenSyncQueuePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `WardenSyncQueue` mutation. */
export type UpdateWardenSyncQueuePayload = {
  __typename?: 'UpdateWardenSyncQueuePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WardenSyncQueue` that was updated by this mutation. */
  wardenSyncQueue?: Maybe<WardenSyncQueue>;
  /** An edge for our `WardenSyncQueue`. May be used by Relay 1. */
  wardenSyncQueueEdge?: Maybe<WardenSyncQueueEdge>;
};


/** The output of our update `WardenSyncQueue` mutation. */
export type UpdateWardenSyncQueuePayloadWardenSyncQueueEdgeArgs = {
  orderBy?: Array<WardenSyncQueueOrderBy>;
};

export type User = {
  __typename?: 'User';
  /** Reads and enables pagination through a set of `Attachment`. */
  attachments: AttachmentConnection;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Comment`. */
  comments: CommentConnection;
  createdAt: Scalars['Datetime']['output'];
  email: Scalars['String']['output'];
  identityProviderId: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `PostStatusChange`. */
  postStatusChangesByChangedById: PostStatusChangeConnection;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostConnection;
  /** Reads and enables pagination through a set of `Reaction`. */
  reactions: ReactionConnection;
  rowId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Signal`. */
  signals: SignalConnection;
  updatedAt: Scalars['Datetime']['output'];
  username?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `Vote`. */
  votes: VoteConnection;
};


export type UserAttachmentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AttachmentCondition>;
  filter?: InputMaybe<AttachmentFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AttachmentOrderBy>>;
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


export type UserPostStatusChangesByChangedByIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PostStatusChangeCondition>;
  filter?: InputMaybe<PostStatusChangeFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostStatusChangeOrderBy>>;
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


export type UserReactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ReactionCondition>;
  filter?: InputMaybe<ReactionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ReactionOrderBy>>;
};


export type UserSignalsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SignalCondition>;
  filter?: InputMaybe<SignalFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SignalOrderBy>>;
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
  /** Checks for equality with the object’s `avatarUrl` field. */
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `identityProviderId` field. */
  identityProviderId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
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
  /** Distinct count of avatarUrl across the matching connection */
  avatarUrl?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of email across the matching connection */
  email?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of identityProviderId across the matching connection */
  identityProviderId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `attachments` relation. */
  attachments?: InputMaybe<UserToManyAttachmentFilter>;
  /** Some related `attachments` exist. */
  attachmentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `avatarUrl` field. */
  avatarUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `comments` relation. */
  comments?: InputMaybe<UserToManyCommentFilter>;
  /** Some related `comments` exist. */
  commentsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `identityProviderId` field. */
  identityProviderId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `postStatusChangesByChangedById` relation. */
  postStatusChangesByChangedById?: InputMaybe<UserToManyPostStatusChangeFilter>;
  /** Some related `postStatusChangesByChangedById` exist. */
  postStatusChangesByChangedByIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `posts` relation. */
  posts?: InputMaybe<UserToManyPostFilter>;
  /** Some related `posts` exist. */
  postsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `reactions` relation. */
  reactions?: InputMaybe<UserToManyReactionFilter>;
  /** Some related `reactions` exist. */
  reactionsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `signals` relation. */
  signals?: InputMaybe<UserToManySignalFilter>;
  /** Some related `signals` exist. */
  signalsExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  AvatarUrl = 'AVATAR_URL',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Name = 'NAME',
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
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email: Scalars['String']['input'];
  identityProviderId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `User`. */
export enum UserOrderBy {
  AttachmentsAverageFileSizeAsc = 'ATTACHMENTS_AVERAGE_FILE_SIZE_ASC',
  AttachmentsAverageFileSizeDesc = 'ATTACHMENTS_AVERAGE_FILE_SIZE_DESC',
  AttachmentsAverageHeightAsc = 'ATTACHMENTS_AVERAGE_HEIGHT_ASC',
  AttachmentsAverageHeightDesc = 'ATTACHMENTS_AVERAGE_HEIGHT_DESC',
  AttachmentsAverageWidthAsc = 'ATTACHMENTS_AVERAGE_WIDTH_ASC',
  AttachmentsAverageWidthDesc = 'ATTACHMENTS_AVERAGE_WIDTH_DESC',
  AttachmentsCountAsc = 'ATTACHMENTS_COUNT_ASC',
  AttachmentsCountDesc = 'ATTACHMENTS_COUNT_DESC',
  AttachmentsDistinctCountCreatedAtAsc = 'ATTACHMENTS_DISTINCT_COUNT_CREATED_AT_ASC',
  AttachmentsDistinctCountCreatedAtDesc = 'ATTACHMENTS_DISTINCT_COUNT_CREATED_AT_DESC',
  AttachmentsDistinctCountFileSizeAsc = 'ATTACHMENTS_DISTINCT_COUNT_FILE_SIZE_ASC',
  AttachmentsDistinctCountFileSizeDesc = 'ATTACHMENTS_DISTINCT_COUNT_FILE_SIZE_DESC',
  AttachmentsDistinctCountHeightAsc = 'ATTACHMENTS_DISTINCT_COUNT_HEIGHT_ASC',
  AttachmentsDistinctCountHeightDesc = 'ATTACHMENTS_DISTINCT_COUNT_HEIGHT_DESC',
  AttachmentsDistinctCountKindAsc = 'ATTACHMENTS_DISTINCT_COUNT_KIND_ASC',
  AttachmentsDistinctCountKindDesc = 'ATTACHMENTS_DISTINCT_COUNT_KIND_DESC',
  AttachmentsDistinctCountMimeTypeAsc = 'ATTACHMENTS_DISTINCT_COUNT_MIME_TYPE_ASC',
  AttachmentsDistinctCountMimeTypeDesc = 'ATTACHMENTS_DISTINCT_COUNT_MIME_TYPE_DESC',
  AttachmentsDistinctCountPostIdAsc = 'ATTACHMENTS_DISTINCT_COUNT_POST_ID_ASC',
  AttachmentsDistinctCountPostIdDesc = 'ATTACHMENTS_DISTINCT_COUNT_POST_ID_DESC',
  AttachmentsDistinctCountRowIdAsc = 'ATTACHMENTS_DISTINCT_COUNT_ROW_ID_ASC',
  AttachmentsDistinctCountRowIdDesc = 'ATTACHMENTS_DISTINCT_COUNT_ROW_ID_DESC',
  AttachmentsDistinctCountStorageKeyAsc = 'ATTACHMENTS_DISTINCT_COUNT_STORAGE_KEY_ASC',
  AttachmentsDistinctCountStorageKeyDesc = 'ATTACHMENTS_DISTINCT_COUNT_STORAGE_KEY_DESC',
  AttachmentsDistinctCountUrlAsc = 'ATTACHMENTS_DISTINCT_COUNT_URL_ASC',
  AttachmentsDistinctCountUrlDesc = 'ATTACHMENTS_DISTINCT_COUNT_URL_DESC',
  AttachmentsDistinctCountUserIdAsc = 'ATTACHMENTS_DISTINCT_COUNT_USER_ID_ASC',
  AttachmentsDistinctCountUserIdDesc = 'ATTACHMENTS_DISTINCT_COUNT_USER_ID_DESC',
  AttachmentsDistinctCountWidthAsc = 'ATTACHMENTS_DISTINCT_COUNT_WIDTH_ASC',
  AttachmentsDistinctCountWidthDesc = 'ATTACHMENTS_DISTINCT_COUNT_WIDTH_DESC',
  AttachmentsMaxFileSizeAsc = 'ATTACHMENTS_MAX_FILE_SIZE_ASC',
  AttachmentsMaxFileSizeDesc = 'ATTACHMENTS_MAX_FILE_SIZE_DESC',
  AttachmentsMaxHeightAsc = 'ATTACHMENTS_MAX_HEIGHT_ASC',
  AttachmentsMaxHeightDesc = 'ATTACHMENTS_MAX_HEIGHT_DESC',
  AttachmentsMaxWidthAsc = 'ATTACHMENTS_MAX_WIDTH_ASC',
  AttachmentsMaxWidthDesc = 'ATTACHMENTS_MAX_WIDTH_DESC',
  AttachmentsMinFileSizeAsc = 'ATTACHMENTS_MIN_FILE_SIZE_ASC',
  AttachmentsMinFileSizeDesc = 'ATTACHMENTS_MIN_FILE_SIZE_DESC',
  AttachmentsMinHeightAsc = 'ATTACHMENTS_MIN_HEIGHT_ASC',
  AttachmentsMinHeightDesc = 'ATTACHMENTS_MIN_HEIGHT_DESC',
  AttachmentsMinWidthAsc = 'ATTACHMENTS_MIN_WIDTH_ASC',
  AttachmentsMinWidthDesc = 'ATTACHMENTS_MIN_WIDTH_DESC',
  AttachmentsStddevPopulationFileSizeAsc = 'ATTACHMENTS_STDDEV_POPULATION_FILE_SIZE_ASC',
  AttachmentsStddevPopulationFileSizeDesc = 'ATTACHMENTS_STDDEV_POPULATION_FILE_SIZE_DESC',
  AttachmentsStddevPopulationHeightAsc = 'ATTACHMENTS_STDDEV_POPULATION_HEIGHT_ASC',
  AttachmentsStddevPopulationHeightDesc = 'ATTACHMENTS_STDDEV_POPULATION_HEIGHT_DESC',
  AttachmentsStddevPopulationWidthAsc = 'ATTACHMENTS_STDDEV_POPULATION_WIDTH_ASC',
  AttachmentsStddevPopulationWidthDesc = 'ATTACHMENTS_STDDEV_POPULATION_WIDTH_DESC',
  AttachmentsStddevSampleFileSizeAsc = 'ATTACHMENTS_STDDEV_SAMPLE_FILE_SIZE_ASC',
  AttachmentsStddevSampleFileSizeDesc = 'ATTACHMENTS_STDDEV_SAMPLE_FILE_SIZE_DESC',
  AttachmentsStddevSampleHeightAsc = 'ATTACHMENTS_STDDEV_SAMPLE_HEIGHT_ASC',
  AttachmentsStddevSampleHeightDesc = 'ATTACHMENTS_STDDEV_SAMPLE_HEIGHT_DESC',
  AttachmentsStddevSampleWidthAsc = 'ATTACHMENTS_STDDEV_SAMPLE_WIDTH_ASC',
  AttachmentsStddevSampleWidthDesc = 'ATTACHMENTS_STDDEV_SAMPLE_WIDTH_DESC',
  AttachmentsSumFileSizeAsc = 'ATTACHMENTS_SUM_FILE_SIZE_ASC',
  AttachmentsSumFileSizeDesc = 'ATTACHMENTS_SUM_FILE_SIZE_DESC',
  AttachmentsSumHeightAsc = 'ATTACHMENTS_SUM_HEIGHT_ASC',
  AttachmentsSumHeightDesc = 'ATTACHMENTS_SUM_HEIGHT_DESC',
  AttachmentsSumWidthAsc = 'ATTACHMENTS_SUM_WIDTH_ASC',
  AttachmentsSumWidthDesc = 'ATTACHMENTS_SUM_WIDTH_DESC',
  AttachmentsVariancePopulationFileSizeAsc = 'ATTACHMENTS_VARIANCE_POPULATION_FILE_SIZE_ASC',
  AttachmentsVariancePopulationFileSizeDesc = 'ATTACHMENTS_VARIANCE_POPULATION_FILE_SIZE_DESC',
  AttachmentsVariancePopulationHeightAsc = 'ATTACHMENTS_VARIANCE_POPULATION_HEIGHT_ASC',
  AttachmentsVariancePopulationHeightDesc = 'ATTACHMENTS_VARIANCE_POPULATION_HEIGHT_DESC',
  AttachmentsVariancePopulationWidthAsc = 'ATTACHMENTS_VARIANCE_POPULATION_WIDTH_ASC',
  AttachmentsVariancePopulationWidthDesc = 'ATTACHMENTS_VARIANCE_POPULATION_WIDTH_DESC',
  AttachmentsVarianceSampleFileSizeAsc = 'ATTACHMENTS_VARIANCE_SAMPLE_FILE_SIZE_ASC',
  AttachmentsVarianceSampleFileSizeDesc = 'ATTACHMENTS_VARIANCE_SAMPLE_FILE_SIZE_DESC',
  AttachmentsVarianceSampleHeightAsc = 'ATTACHMENTS_VARIANCE_SAMPLE_HEIGHT_ASC',
  AttachmentsVarianceSampleHeightDesc = 'ATTACHMENTS_VARIANCE_SAMPLE_HEIGHT_DESC',
  AttachmentsVarianceSampleWidthAsc = 'ATTACHMENTS_VARIANCE_SAMPLE_WIDTH_ASC',
  AttachmentsVarianceSampleWidthDesc = 'ATTACHMENTS_VARIANCE_SAMPLE_WIDTH_DESC',
  AvatarUrlAsc = 'AVATAR_URL_ASC',
  AvatarUrlDesc = 'AVATAR_URL_DESC',
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
  IdentityProviderIdAsc = 'IDENTITY_PROVIDER_ID_ASC',
  IdentityProviderIdDesc = 'IDENTITY_PROVIDER_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PostsAverageNumberAsc = 'POSTS_AVERAGE_NUMBER_ASC',
  PostsAverageNumberDesc = 'POSTS_AVERAGE_NUMBER_DESC',
  PostsCountAsc = 'POSTS_COUNT_ASC',
  PostsCountDesc = 'POSTS_COUNT_DESC',
  PostsDistinctCountAiTagsAsc = 'POSTS_DISTINCT_COUNT_AI_TAGS_ASC',
  PostsDistinctCountAiTagsDesc = 'POSTS_DISTINCT_COUNT_AI_TAGS_DESC',
  PostsDistinctCountClusterIdAsc = 'POSTS_DISTINCT_COUNT_CLUSTER_ID_ASC',
  PostsDistinctCountClusterIdDesc = 'POSTS_DISTINCT_COUNT_CLUSTER_ID_DESC',
  PostsDistinctCountCreatedAtAsc = 'POSTS_DISTINCT_COUNT_CREATED_AT_ASC',
  PostsDistinctCountCreatedAtDesc = 'POSTS_DISTINCT_COUNT_CREATED_AT_DESC',
  PostsDistinctCountDescriptionAsc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_ASC',
  PostsDistinctCountDescriptionDesc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_DESC',
  PostsDistinctCountDuplicateOfIdAsc = 'POSTS_DISTINCT_COUNT_DUPLICATE_OF_ID_ASC',
  PostsDistinctCountDuplicateOfIdDesc = 'POSTS_DISTINCT_COUNT_DUPLICATE_OF_ID_DESC',
  PostsDistinctCountNumberAsc = 'POSTS_DISTINCT_COUNT_NUMBER_ASC',
  PostsDistinctCountNumberDesc = 'POSTS_DISTINCT_COUNT_NUMBER_DESC',
  PostsDistinctCountProjectIdAsc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_ASC',
  PostsDistinctCountProjectIdDesc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_DESC',
  PostsDistinctCountRowIdAsc = 'POSTS_DISTINCT_COUNT_ROW_ID_ASC',
  PostsDistinctCountRowIdDesc = 'POSTS_DISTINCT_COUNT_ROW_ID_DESC',
  PostsDistinctCountSentimentAsc = 'POSTS_DISTINCT_COUNT_SENTIMENT_ASC',
  PostsDistinctCountSentimentDesc = 'POSTS_DISTINCT_COUNT_SENTIMENT_DESC',
  PostsDistinctCountShippedAtAsc = 'POSTS_DISTINCT_COUNT_SHIPPED_AT_ASC',
  PostsDistinctCountShippedAtDesc = 'POSTS_DISTINCT_COUNT_SHIPPED_AT_DESC',
  PostsDistinctCountSourceAsc = 'POSTS_DISTINCT_COUNT_SOURCE_ASC',
  PostsDistinctCountSourceDesc = 'POSTS_DISTINCT_COUNT_SOURCE_DESC',
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
  PostsMaxNumberAsc = 'POSTS_MAX_NUMBER_ASC',
  PostsMaxNumberDesc = 'POSTS_MAX_NUMBER_DESC',
  PostsMinNumberAsc = 'POSTS_MIN_NUMBER_ASC',
  PostsMinNumberDesc = 'POSTS_MIN_NUMBER_DESC',
  PostsStddevPopulationNumberAsc = 'POSTS_STDDEV_POPULATION_NUMBER_ASC',
  PostsStddevPopulationNumberDesc = 'POSTS_STDDEV_POPULATION_NUMBER_DESC',
  PostsStddevSampleNumberAsc = 'POSTS_STDDEV_SAMPLE_NUMBER_ASC',
  PostsStddevSampleNumberDesc = 'POSTS_STDDEV_SAMPLE_NUMBER_DESC',
  PostsSumNumberAsc = 'POSTS_SUM_NUMBER_ASC',
  PostsSumNumberDesc = 'POSTS_SUM_NUMBER_DESC',
  PostsVariancePopulationNumberAsc = 'POSTS_VARIANCE_POPULATION_NUMBER_ASC',
  PostsVariancePopulationNumberDesc = 'POSTS_VARIANCE_POPULATION_NUMBER_DESC',
  PostsVarianceSampleNumberAsc = 'POSTS_VARIANCE_SAMPLE_NUMBER_ASC',
  PostsVarianceSampleNumberDesc = 'POSTS_VARIANCE_SAMPLE_NUMBER_DESC',
  PostStatusChangesByChangedByIdCountAsc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_COUNT_ASC',
  PostStatusChangesByChangedByIdCountDesc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_COUNT_DESC',
  PostStatusChangesByChangedByIdDistinctCountChangedByIdAsc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_DISTINCT_COUNT_CHANGED_BY_ID_ASC',
  PostStatusChangesByChangedByIdDistinctCountChangedByIdDesc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_DISTINCT_COUNT_CHANGED_BY_ID_DESC',
  PostStatusChangesByChangedByIdDistinctCountCreatedAtAsc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  PostStatusChangesByChangedByIdDistinctCountCreatedAtDesc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  PostStatusChangesByChangedByIdDistinctCountNoteAsc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_DISTINCT_COUNT_NOTE_ASC',
  PostStatusChangesByChangedByIdDistinctCountNoteDesc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_DISTINCT_COUNT_NOTE_DESC',
  PostStatusChangesByChangedByIdDistinctCountPostIdAsc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_DISTINCT_COUNT_POST_ID_ASC',
  PostStatusChangesByChangedByIdDistinctCountPostIdDesc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_DISTINCT_COUNT_POST_ID_DESC',
  PostStatusChangesByChangedByIdDistinctCountRowIdAsc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_DISTINCT_COUNT_ROW_ID_ASC',
  PostStatusChangesByChangedByIdDistinctCountRowIdDesc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_DISTINCT_COUNT_ROW_ID_DESC',
  PostStatusChangesByChangedByIdDistinctCountToStatusTemplateIdAsc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_DISTINCT_COUNT_TO_STATUS_TEMPLATE_ID_ASC',
  PostStatusChangesByChangedByIdDistinctCountToStatusTemplateIdDesc = 'POST_STATUS_CHANGES_BY_CHANGED_BY_ID_DISTINCT_COUNT_TO_STATUS_TEMPLATE_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReactionsCountAsc = 'REACTIONS_COUNT_ASC',
  ReactionsCountDesc = 'REACTIONS_COUNT_DESC',
  ReactionsDistinctCountCommentIdAsc = 'REACTIONS_DISTINCT_COUNT_COMMENT_ID_ASC',
  ReactionsDistinctCountCommentIdDesc = 'REACTIONS_DISTINCT_COUNT_COMMENT_ID_DESC',
  ReactionsDistinctCountCreatedAtAsc = 'REACTIONS_DISTINCT_COUNT_CREATED_AT_ASC',
  ReactionsDistinctCountCreatedAtDesc = 'REACTIONS_DISTINCT_COUNT_CREATED_AT_DESC',
  ReactionsDistinctCountEmojiAsc = 'REACTIONS_DISTINCT_COUNT_EMOJI_ASC',
  ReactionsDistinctCountEmojiDesc = 'REACTIONS_DISTINCT_COUNT_EMOJI_DESC',
  ReactionsDistinctCountPostIdAsc = 'REACTIONS_DISTINCT_COUNT_POST_ID_ASC',
  ReactionsDistinctCountPostIdDesc = 'REACTIONS_DISTINCT_COUNT_POST_ID_DESC',
  ReactionsDistinctCountRowIdAsc = 'REACTIONS_DISTINCT_COUNT_ROW_ID_ASC',
  ReactionsDistinctCountRowIdDesc = 'REACTIONS_DISTINCT_COUNT_ROW_ID_DESC',
  ReactionsDistinctCountUserIdAsc = 'REACTIONS_DISTINCT_COUNT_USER_ID_ASC',
  ReactionsDistinctCountUserIdDesc = 'REACTIONS_DISTINCT_COUNT_USER_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SignalsCountAsc = 'SIGNALS_COUNT_ASC',
  SignalsCountDesc = 'SIGNALS_COUNT_DESC',
  SignalsDistinctCountAiTagsAsc = 'SIGNALS_DISTINCT_COUNT_AI_TAGS_ASC',
  SignalsDistinctCountAiTagsDesc = 'SIGNALS_DISTINCT_COUNT_AI_TAGS_DESC',
  SignalsDistinctCountClusterIdAsc = 'SIGNALS_DISTINCT_COUNT_CLUSTER_ID_ASC',
  SignalsDistinctCountClusterIdDesc = 'SIGNALS_DISTINCT_COUNT_CLUSTER_ID_DESC',
  SignalsDistinctCountCreatedAtAsc = 'SIGNALS_DISTINCT_COUNT_CREATED_AT_ASC',
  SignalsDistinctCountCreatedAtDesc = 'SIGNALS_DISTINCT_COUNT_CREATED_AT_DESC',
  SignalsDistinctCountOrganizationIdAsc = 'SIGNALS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  SignalsDistinctCountOrganizationIdDesc = 'SIGNALS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  SignalsDistinctCountPostIdAsc = 'SIGNALS_DISTINCT_COUNT_POST_ID_ASC',
  SignalsDistinctCountPostIdDesc = 'SIGNALS_DISTINCT_COUNT_POST_ID_DESC',
  SignalsDistinctCountProjectIdAsc = 'SIGNALS_DISTINCT_COUNT_PROJECT_ID_ASC',
  SignalsDistinctCountProjectIdDesc = 'SIGNALS_DISTINCT_COUNT_PROJECT_ID_DESC',
  SignalsDistinctCountRawContentAsc = 'SIGNALS_DISTINCT_COUNT_RAW_CONTENT_ASC',
  SignalsDistinctCountRawContentDesc = 'SIGNALS_DISTINCT_COUNT_RAW_CONTENT_DESC',
  SignalsDistinctCountRowIdAsc = 'SIGNALS_DISTINCT_COUNT_ROW_ID_ASC',
  SignalsDistinctCountRowIdDesc = 'SIGNALS_DISTINCT_COUNT_ROW_ID_DESC',
  SignalsDistinctCountSentimentAsc = 'SIGNALS_DISTINCT_COUNT_SENTIMENT_ASC',
  SignalsDistinctCountSentimentDesc = 'SIGNALS_DISTINCT_COUNT_SENTIMENT_DESC',
  SignalsDistinctCountSourceAsc = 'SIGNALS_DISTINCT_COUNT_SOURCE_ASC',
  SignalsDistinctCountSourceDesc = 'SIGNALS_DISTINCT_COUNT_SOURCE_DESC',
  SignalsDistinctCountSourceMetadataAsc = 'SIGNALS_DISTINCT_COUNT_SOURCE_METADATA_ASC',
  SignalsDistinctCountSourceMetadataDesc = 'SIGNALS_DISTINCT_COUNT_SOURCE_METADATA_DESC',
  SignalsDistinctCountStatusAsc = 'SIGNALS_DISTINCT_COUNT_STATUS_ASC',
  SignalsDistinctCountStatusDesc = 'SIGNALS_DISTINCT_COUNT_STATUS_DESC',
  SignalsDistinctCountTypeAsc = 'SIGNALS_DISTINCT_COUNT_TYPE_ASC',
  SignalsDistinctCountTypeDesc = 'SIGNALS_DISTINCT_COUNT_TYPE_DESC',
  SignalsDistinctCountUpdatedAtAsc = 'SIGNALS_DISTINCT_COUNT_UPDATED_AT_ASC',
  SignalsDistinctCountUpdatedAtDesc = 'SIGNALS_DISTINCT_COUNT_UPDATED_AT_DESC',
  SignalsDistinctCountUserIdAsc = 'SIGNALS_DISTINCT_COUNT_USER_ID_ASC',
  SignalsDistinctCountUserIdDesc = 'SIGNALS_DISTINCT_COUNT_USER_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  VotesAverageWeightAsc = 'VOTES_AVERAGE_WEIGHT_ASC',
  VotesAverageWeightDesc = 'VOTES_AVERAGE_WEIGHT_DESC',
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
  VotesDistinctCountVoteTypeDesc = 'VOTES_DISTINCT_COUNT_VOTE_TYPE_DESC',
  VotesDistinctCountWeightAsc = 'VOTES_DISTINCT_COUNT_WEIGHT_ASC',
  VotesDistinctCountWeightDesc = 'VOTES_DISTINCT_COUNT_WEIGHT_DESC',
  VotesMaxWeightAsc = 'VOTES_MAX_WEIGHT_ASC',
  VotesMaxWeightDesc = 'VOTES_MAX_WEIGHT_DESC',
  VotesMinWeightAsc = 'VOTES_MIN_WEIGHT_ASC',
  VotesMinWeightDesc = 'VOTES_MIN_WEIGHT_DESC',
  VotesStddevPopulationWeightAsc = 'VOTES_STDDEV_POPULATION_WEIGHT_ASC',
  VotesStddevPopulationWeightDesc = 'VOTES_STDDEV_POPULATION_WEIGHT_DESC',
  VotesStddevSampleWeightAsc = 'VOTES_STDDEV_SAMPLE_WEIGHT_ASC',
  VotesStddevSampleWeightDesc = 'VOTES_STDDEV_SAMPLE_WEIGHT_DESC',
  VotesSumWeightAsc = 'VOTES_SUM_WEIGHT_ASC',
  VotesSumWeightDesc = 'VOTES_SUM_WEIGHT_DESC',
  VotesVariancePopulationWeightAsc = 'VOTES_VARIANCE_POPULATION_WEIGHT_ASC',
  VotesVariancePopulationWeightDesc = 'VOTES_VARIANCE_POPULATION_WEIGHT_DESC',
  VotesVarianceSampleWeightAsc = 'VOTES_VARIANCE_SAMPLE_WEIGHT_ASC',
  VotesVarianceSampleWeightDesc = 'VOTES_VARIANCE_SAMPLE_WEIGHT_DESC'
}

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  identityProviderId?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against many `Attachment` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyAttachmentFilter = {
  /** Aggregates across related `Attachment` match the filter criteria. */
  aggregates?: InputMaybe<AttachmentAggregatesFilter>;
  /** Every related `Attachment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AttachmentFilter>;
  /** No related `Attachment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AttachmentFilter>;
  /** Some related `Attachment` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AttachmentFilter>;
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

/** A filter to be used against many `PostStatusChange` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyPostStatusChangeFilter = {
  /** Aggregates across related `PostStatusChange` match the filter criteria. */
  aggregates?: InputMaybe<PostStatusChangeAggregatesFilter>;
  /** Every related `PostStatusChange` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PostStatusChangeFilter>;
  /** No related `PostStatusChange` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PostStatusChangeFilter>;
  /** Some related `PostStatusChange` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PostStatusChangeFilter>;
};

/** A filter to be used against many `Reaction` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyReactionFilter = {
  /** Aggregates across related `Reaction` match the filter criteria. */
  aggregates?: InputMaybe<ReactionAggregatesFilter>;
  /** Every related `Reaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ReactionFilter>;
  /** No related `Reaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ReactionFilter>;
  /** Some related `Reaction` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ReactionFilter>;
};

/** A filter to be used against many `Signal` object types. All fields are combined with a logical ‘and.’ */
export type UserToManySignalFilter = {
  /** Aggregates across related `Signal` match the filter criteria. */
  aggregates?: InputMaybe<SignalAggregatesFilter>;
  /** Every related `Signal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<SignalFilter>;
  /** No related `Signal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<SignalFilter>;
  /** Some related `Signal` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<SignalFilter>;
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
  createdAt: Scalars['Datetime']['output'];
  /** Reads a single `Post` that is related to this `Vote`. */
  post?: Maybe<Post>;
  postId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `Vote`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
  voteType: VoteType;
  weight: Scalars['Int']['output'];
};

export type VoteAggregates = {
  __typename?: 'VoteAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<VoteAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<VoteDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<VoteMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<VoteMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<VoteStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<VoteStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<VoteSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<VoteVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<VoteVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `Vote` object types. */
export type VoteAggregatesFilter = {
  /** Mean average aggregate over matching `Vote` objects. */
  average?: InputMaybe<VoteAverageAggregateFilter>;
  /** Distinct count aggregate over matching `Vote` objects. */
  distinctCount?: InputMaybe<VoteDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Vote` object to be included within the aggregate. */
  filter?: InputMaybe<VoteFilter>;
  /** Maximum aggregate over matching `Vote` objects. */
  max?: InputMaybe<VoteMaxAggregateFilter>;
  /** Minimum aggregate over matching `Vote` objects. */
  min?: InputMaybe<VoteMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `Vote` objects. */
  stddevPopulation?: InputMaybe<VoteStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `Vote` objects. */
  stddevSample?: InputMaybe<VoteStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `Vote` objects. */
  sum?: InputMaybe<VoteSumAggregateFilter>;
  /** Population variance aggregate over matching `Vote` objects. */
  variancePopulation?: InputMaybe<VoteVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `Vote` objects. */
  varianceSample?: InputMaybe<VoteVarianceSampleAggregateFilter>;
};

export type VoteAverageAggregateFilter = {
  weight?: InputMaybe<BigFloatFilter>;
};

export type VoteAverageAggregates = {
  __typename?: 'VoteAverageAggregates';
  /** Mean average of weight across the matching connection */
  weight?: Maybe<Scalars['BigFloat']['output']>;
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
  /** Checks for equality with the object’s `weight` field. */
  weight?: InputMaybe<Scalars['Int']['input']>;
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
  weight?: InputMaybe<BigIntFilter>;
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
  /** Distinct count of weight across the matching connection */
  weight?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `weight` field. */
  weight?: InputMaybe<IntFilter>;
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
  VoteType = 'VOTE_TYPE',
  Weight = 'WEIGHT'
}

export type VoteHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  weight?: InputMaybe<HavingIntFilter>;
};

export type VoteHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  weight?: InputMaybe<HavingIntFilter>;
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
  weight?: InputMaybe<HavingIntFilter>;
};

export type VoteHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  weight?: InputMaybe<HavingIntFilter>;
};

export type VoteHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  weight?: InputMaybe<HavingIntFilter>;
};

export type VoteHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  weight?: InputMaybe<HavingIntFilter>;
};

export type VoteHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  weight?: InputMaybe<HavingIntFilter>;
};

export type VoteHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  weight?: InputMaybe<HavingIntFilter>;
};

export type VoteHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  weight?: InputMaybe<HavingIntFilter>;
};

/** An input for mutations affecting `Vote` */
export type VoteInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  postId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
  voteType: VoteType;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type VoteMaxAggregateFilter = {
  weight?: InputMaybe<IntFilter>;
};

export type VoteMaxAggregates = {
  __typename?: 'VoteMaxAggregates';
  /** Maximum of weight across the matching connection */
  weight?: Maybe<Scalars['Int']['output']>;
};

export type VoteMinAggregateFilter = {
  weight?: InputMaybe<IntFilter>;
};

export type VoteMinAggregates = {
  __typename?: 'VoteMinAggregates';
  /** Minimum of weight across the matching connection */
  weight?: Maybe<Scalars['Int']['output']>;
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
  UserIdDesc = 'USER_ID_DESC',
  WeightAsc = 'WEIGHT_ASC',
  WeightDesc = 'WEIGHT_DESC'
}

/** Represents an update to a `Vote`. Fields that are set will be updated. */
export type VotePatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  postId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  voteType?: InputMaybe<VoteType>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type VoteStddevPopulationAggregateFilter = {
  weight?: InputMaybe<BigFloatFilter>;
};

export type VoteStddevPopulationAggregates = {
  __typename?: 'VoteStddevPopulationAggregates';
  /** Population standard deviation of weight across the matching connection */
  weight?: Maybe<Scalars['BigFloat']['output']>;
};

export type VoteStddevSampleAggregateFilter = {
  weight?: InputMaybe<BigFloatFilter>;
};

export type VoteStddevSampleAggregates = {
  __typename?: 'VoteStddevSampleAggregates';
  /** Sample standard deviation of weight across the matching connection */
  weight?: Maybe<Scalars['BigFloat']['output']>;
};

export type VoteSumAggregateFilter = {
  weight?: InputMaybe<BigIntFilter>;
};

export type VoteSumAggregates = {
  __typename?: 'VoteSumAggregates';
  /** Sum of weight across the matching connection */
  weight: Scalars['BigInt']['output'];
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

export type VoteVariancePopulationAggregateFilter = {
  weight?: InputMaybe<BigFloatFilter>;
};

export type VoteVariancePopulationAggregates = {
  __typename?: 'VoteVariancePopulationAggregates';
  /** Population variance of weight across the matching connection */
  weight?: Maybe<Scalars['BigFloat']['output']>;
};

export type VoteVarianceSampleAggregateFilter = {
  weight?: InputMaybe<BigFloatFilter>;
};

export type VoteVarianceSampleAggregates = {
  __typename?: 'VoteVarianceSampleAggregates';
  /** Sample variance of weight across the matching connection */
  weight?: Maybe<Scalars['BigFloat']['output']>;
};

export type WardenSyncQueue = {
  __typename?: 'WardenSyncQueue';
  attempts: Scalars['Int']['output'];
  createdAt: Scalars['Datetime']['output'];
  lastError?: Maybe<Scalars['String']['output']>;
  maxAttempts: Scalars['Int']['output'];
  nextRetryAt: Scalars['Datetime']['output'];
  operation: Scalars['String']['output'];
  payload: Scalars['JSON']['output'];
  rowId: Scalars['UUID']['output'];
};

export type WardenSyncQueueAggregates = {
  __typename?: 'WardenSyncQueueAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<WardenSyncQueueAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<WardenSyncQueueDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<WardenSyncQueueMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<WardenSyncQueueMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<WardenSyncQueueStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<WardenSyncQueueStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<WardenSyncQueueSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<WardenSyncQueueVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<WardenSyncQueueVarianceSampleAggregates>;
};

export type WardenSyncQueueAverageAggregates = {
  __typename?: 'WardenSyncQueueAverageAggregates';
  /** Mean average of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `WardenSyncQueue` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type WardenSyncQueueCondition = {
  /** Checks for equality with the object’s `attempts` field. */
  attempts?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `lastError` field. */
  lastError?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `maxAttempts` field. */
  maxAttempts?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `nextRetryAt` field. */
  nextRetryAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `operation` field. */
  operation?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `WardenSyncQueue` values. */
export type WardenSyncQueueConnection = {
  __typename?: 'WardenSyncQueueConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<WardenSyncQueueAggregates>;
  /** A list of edges which contains the `WardenSyncQueue` and cursor to aid in pagination. */
  edges: Array<Maybe<WardenSyncQueueEdge>>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<WardenSyncQueueAggregates>>;
  /** A list of `WardenSyncQueue` objects. */
  nodes: Array<Maybe<WardenSyncQueue>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WardenSyncQueue` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `WardenSyncQueue` values. */
export type WardenSyncQueueConnectionGroupedAggregatesArgs = {
  groupBy: Array<WardenSyncQueueGroupBy>;
  having?: InputMaybe<WardenSyncQueueHavingInput>;
};

export type WardenSyncQueueDistinctCountAggregates = {
  __typename?: 'WardenSyncQueueDistinctCountAggregates';
  /** Distinct count of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of lastError across the matching connection */
  lastError?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of nextRetryAt across the matching connection */
  nextRetryAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of operation across the matching connection */
  operation?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of payload across the matching connection */
  payload?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `WardenSyncQueue` edge in the connection. */
export type WardenSyncQueueEdge = {
  __typename?: 'WardenSyncQueueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WardenSyncQueue` at the end of the edge. */
  node?: Maybe<WardenSyncQueue>;
};

/** A filter to be used against `WardenSyncQueue` object types. All fields are combined with a logical ‘and.’ */
export type WardenSyncQueueFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WardenSyncQueueFilter>>;
  /** Filter by the object’s `attempts` field. */
  attempts?: InputMaybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `lastError` field. */
  lastError?: InputMaybe<StringFilter>;
  /** Filter by the object’s `maxAttempts` field. */
  maxAttempts?: InputMaybe<IntFilter>;
  /** Filter by the object’s `nextRetryAt` field. */
  nextRetryAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<WardenSyncQueueFilter>;
  /** Filter by the object’s `operation` field. */
  operation?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<WardenSyncQueueFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `WardenSyncQueue` for usage during aggregation. */
export enum WardenSyncQueueGroupBy {
  Attempts = 'ATTEMPTS',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  LastError = 'LAST_ERROR',
  MaxAttempts = 'MAX_ATTEMPTS',
  NextRetryAt = 'NEXT_RETRY_AT',
  NextRetryAtTruncatedToDay = 'NEXT_RETRY_AT_TRUNCATED_TO_DAY',
  NextRetryAtTruncatedToHour = 'NEXT_RETRY_AT_TRUNCATED_TO_HOUR',
  Operation = 'OPERATION',
  Payload = 'PAYLOAD'
}

export type WardenSyncQueueHavingAverageInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingDistinctCountInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `WardenSyncQueue` aggregates. */
export type WardenSyncQueueHavingInput = {
  AND?: InputMaybe<Array<WardenSyncQueueHavingInput>>;
  OR?: InputMaybe<Array<WardenSyncQueueHavingInput>>;
  average?: InputMaybe<WardenSyncQueueHavingAverageInput>;
  distinctCount?: InputMaybe<WardenSyncQueueHavingDistinctCountInput>;
  max?: InputMaybe<WardenSyncQueueHavingMaxInput>;
  min?: InputMaybe<WardenSyncQueueHavingMinInput>;
  stddevPopulation?: InputMaybe<WardenSyncQueueHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<WardenSyncQueueHavingStddevSampleInput>;
  sum?: InputMaybe<WardenSyncQueueHavingSumInput>;
  variancePopulation?: InputMaybe<WardenSyncQueueHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<WardenSyncQueueHavingVarianceSampleInput>;
};

export type WardenSyncQueueHavingMaxInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingMinInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingStddevPopulationInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingStddevSampleInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingSumInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingVariancePopulationInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingVarianceSampleInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `WardenSyncQueue` */
export type WardenSyncQueueInput = {
  attempts?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  lastError?: InputMaybe<Scalars['String']['input']>;
  maxAttempts?: InputMaybe<Scalars['Int']['input']>;
  nextRetryAt?: InputMaybe<Scalars['Datetime']['input']>;
  operation: Scalars['String']['input'];
  payload: Scalars['JSON']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

export type WardenSyncQueueMaxAggregates = {
  __typename?: 'WardenSyncQueueMaxAggregates';
  /** Maximum of attempts across the matching connection */
  attempts?: Maybe<Scalars['Int']['output']>;
  /** Maximum of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['Int']['output']>;
};

export type WardenSyncQueueMinAggregates = {
  __typename?: 'WardenSyncQueueMinAggregates';
  /** Minimum of attempts across the matching connection */
  attempts?: Maybe<Scalars['Int']['output']>;
  /** Minimum of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `WardenSyncQueue`. */
export enum WardenSyncQueueOrderBy {
  AttemptsAsc = 'ATTEMPTS_ASC',
  AttemptsDesc = 'ATTEMPTS_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  LastErrorAsc = 'LAST_ERROR_ASC',
  LastErrorDesc = 'LAST_ERROR_DESC',
  MaxAttemptsAsc = 'MAX_ATTEMPTS_ASC',
  MaxAttemptsDesc = 'MAX_ATTEMPTS_DESC',
  Natural = 'NATURAL',
  NextRetryAtAsc = 'NEXT_RETRY_AT_ASC',
  NextRetryAtDesc = 'NEXT_RETRY_AT_DESC',
  OperationAsc = 'OPERATION_ASC',
  OperationDesc = 'OPERATION_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `WardenSyncQueue`. Fields that are set will be updated. */
export type WardenSyncQueuePatch = {
  attempts?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  lastError?: InputMaybe<Scalars['String']['input']>;
  maxAttempts?: InputMaybe<Scalars['Int']['input']>;
  nextRetryAt?: InputMaybe<Scalars['Datetime']['input']>;
  operation?: InputMaybe<Scalars['String']['input']>;
  payload?: InputMaybe<Scalars['JSON']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

export type WardenSyncQueueStddevPopulationAggregates = {
  __typename?: 'WardenSyncQueueStddevPopulationAggregates';
  /** Population standard deviation of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['BigFloat']['output']>;
};

export type WardenSyncQueueStddevSampleAggregates = {
  __typename?: 'WardenSyncQueueStddevSampleAggregates';
  /** Sample standard deviation of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['BigFloat']['output']>;
};

export type WardenSyncQueueSumAggregates = {
  __typename?: 'WardenSyncQueueSumAggregates';
  /** Sum of attempts across the matching connection */
  attempts: Scalars['BigInt']['output'];
  /** Sum of maxAttempts across the matching connection */
  maxAttempts: Scalars['BigInt']['output'];
};

export type WardenSyncQueueVariancePopulationAggregates = {
  __typename?: 'WardenSyncQueueVariancePopulationAggregates';
  /** Population variance of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['BigFloat']['output']>;
};

export type WardenSyncQueueVarianceSampleAggregates = {
  __typename?: 'WardenSyncQueueVarianceSampleAggregates';
  /** Sample variance of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['BigFloat']['output']>;
};

export type AttachmentFragment = { __typename?: 'Attachment', rowId: string, url: string, mimeType: string, kind: string, width?: number | null, height?: number | null, fileSize?: number | null };

export type CommentFragment = { __typename?: 'Comment', rowId: string, message?: string | null, createdAt: Date, user?: { __typename?: 'User', rowId: string, username?: string | null, avatarUrl?: string | null } | null, childComments: { __typename?: 'CommentConnection', totalCount: number } };

export type FeedbackFragment = { __typename?: 'Post', rowId: string, number?: number | null, title?: string | null, description?: string | null, statusUpdatedAt: Date, createdAt: Date, updatedAt: Date, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, prefix?: string | null, organizationId: string } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, attachments: { __typename?: 'AttachmentConnection', nodes: Array<{ __typename?: 'Attachment', rowId: string, url: string, mimeType: string, kind: string, width?: number | null, height?: number | null, fileSize?: number | null } | null> }, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'VoteConnection', totalCount: number }, userUpvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, downvotes: { __typename?: 'VoteConnection', totalCount: number }, userDownvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, postTags: { __typename?: 'PostTagConnection', nodes: Array<{ __typename?: 'PostTag', tag?: { __typename?: 'Tag', rowId: string } | null } | null> } };

export type ProjectFragment = { __typename?: 'Project', rowId: string, name: string, description?: string | null, image?: string | null, slug: string, prefix?: string | null, organizationId: string, nextPostNumber: number, isPublic: boolean, showRoadmap: boolean, showChangelog: boolean, projectLinks: { __typename?: 'ProjectLinkConnection', nodes: Array<{ __typename?: 'ProjectLink', rowId: string, projectId: string, url: string, title?: string | null, order: number } | null> }, posts: { __typename?: 'PostConnection', aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null }, userPosts: { __typename?: 'PostConnection', nodes: Array<{ __typename?: 'Post', rowId: string } | null> } };

export type ReplyFragment = { __typename?: 'Comment', rowId: string, parentId?: string | null, message?: string | null, createdAt: Date, user?: { __typename?: 'User', rowId: string, username?: string | null, avatarUrl?: string | null } | null };

export type UserFragment = { __typename?: 'User', rowId: string, identityProviderId: string, username?: string | null, name: string, email: string, avatarUrl?: string | null };

export type CreateAttachmentMutationVariables = Exact<{
  input: CreateAttachmentInput;
}>;


export type CreateAttachmentMutation = { __typename?: 'Mutation', createAttachment?: { __typename?: 'CreateAttachmentPayload', attachment?: { __typename?: 'Attachment', rowId: string, url: string, mimeType: string, kind: string, width?: number | null, height?: number | null, fileSize?: number | null } | null } | null };

export type DeleteAttachmentMutationVariables = Exact<{
  input: DeleteAttachmentInput;
}>;


export type DeleteAttachmentMutation = { __typename?: 'Mutation', deleteAttachment?: { __typename?: 'DeleteAttachmentPayload', clientMutationId?: string | null } | null };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'CreateCommentPayload', clientMutationId?: string | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: { __typename?: 'DeleteCommentPayload', clientMutationId?: string | null } | null };

export type ChangePostStatusMutationVariables = Exact<{
  postId: Scalars['UUID']['input'];
  statusTemplateId?: InputMaybe<Scalars['UUID']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
}>;


export type ChangePostStatusMutation = { __typename?: 'Mutation', changePostStatus?: { __typename?: 'ChangePostStatusPayload', id: string, statusTemplateId?: string | null } | null };

export type CreateFeedbackMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'CreatePostPayload', post?: { __typename?: 'Post', rowId: string } | null } | null };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['UUID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'DeletePostPayload', clientMutationId?: string | null } | null };

export type DeletePostStatusChangeMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeletePostStatusChangeMutation = { __typename?: 'Mutation', deletePostStatusChange?: { __typename?: 'DeletePostStatusChangePayload', id: string } | null };

export type UpdatePostMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: PostPatch;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'UpdatePostPayload', clientMutationId?: string | null } | null };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'CreateProjectPayload', project?: { __typename?: 'Project', rowId: string, slug: string, organizationId: string } | null } | null };

export type DeleteProjectMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: { __typename?: 'DeleteProjectPayload', project?: { __typename?: 'Project', rowId: string } | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  patch: ProjectPatch;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'UpdateProjectPayload', project?: { __typename?: 'Project', slug: string } | null } | null };

export type CreateProjectLinkMutationVariables = Exact<{
  input: CreateProjectLinkInput;
}>;


export type CreateProjectLinkMutation = { __typename?: 'Mutation', createProjectLink?: { __typename?: 'CreateProjectLinkPayload', clientMutationId?: string | null } | null };

export type DeleteProjectLinkMutationVariables = Exact<{
  linkId: Scalars['UUID']['input'];
}>;


export type DeleteProjectLinkMutation = { __typename?: 'Mutation', deleteProjectLink?: { __typename?: 'DeleteProjectLinkPayload', clientMutationId?: string | null } | null };

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


export type UpdateStatusTemplateMutation = { __typename?: 'Mutation', updateStatusTemplate?: { __typename?: 'UpdateStatusTemplatePayload', clientMutationId?: string | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, color?: string | null, description?: string | null, sortOrder?: number | null, showOnRoadmap?: boolean | null } | null } | null };

export type CreateUserMutationVariables = Exact<{
  identityProviderId: Scalars['UUID']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreateUserPayload', user?: { __typename?: 'User', rowId: string } | null } | null };

export type SetNotificationPreferenceMutationVariables = Exact<{
  postUpdates: Scalars['Boolean']['input'];
}>;


export type SetNotificationPreferenceMutation = { __typename?: 'Mutation', setNotificationPreference?: { __typename?: 'NotificationPreference', postUpdates: boolean } | null };

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

export type CommentsQueryVariables = Exact<{
  feedbackId: Scalars['UUID']['input'];
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments?: { __typename?: 'CommentConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'CommentEdge', node?: { __typename?: 'Comment', rowId: string, message?: string | null, createdAt: Date, user?: { __typename?: 'User', rowId: string, username?: string | null, avatarUrl?: string | null } | null, childComments: { __typename?: 'CommentConnection', totalCount: number } } | null } | null> } | null };

export type FeedbackByIdQueryVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  userId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type FeedbackByIdQuery = { __typename?: 'Query', post?: { __typename?: 'Post', rowId: string, number?: number | null, title?: string | null, description?: string | null, statusUpdatedAt: Date, createdAt: Date, updatedAt: Date, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, prefix?: string | null, organizationId: string } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, attachments: { __typename?: 'AttachmentConnection', nodes: Array<{ __typename?: 'Attachment', rowId: string, url: string, mimeType: string, kind: string, width?: number | null, height?: number | null, fileSize?: number | null } | null> }, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'VoteConnection', totalCount: number }, userUpvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, downvotes: { __typename?: 'VoteConnection', totalCount: number }, userDownvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, postTags: { __typename?: 'PostTagConnection', nodes: Array<{ __typename?: 'PostTag', tag?: { __typename?: 'Tag', rowId: string } | null } | null> } } | null };

export type FeedbackByNumberQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
  number: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type FeedbackByNumberQuery = { __typename?: 'Query', postByProjectIdAndNumber?: { __typename?: 'Post', rowId: string, number?: number | null, title?: string | null, description?: string | null, statusUpdatedAt: Date, createdAt: Date, updatedAt: Date, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, prefix?: string | null, organizationId: string } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, attachments: { __typename?: 'AttachmentConnection', nodes: Array<{ __typename?: 'Attachment', rowId: string, url: string, mimeType: string, kind: string, width?: number | null, height?: number | null, fileSize?: number | null } | null> }, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'VoteConnection', totalCount: number }, userUpvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, downvotes: { __typename?: 'VoteConnection', totalCount: number }, userDownvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, postTags: { __typename?: 'PostTagConnection', nodes: Array<{ __typename?: 'PostTag', tag?: { __typename?: 'Tag', rowId: string } | null } | null> } } | null };

export type MyNotificationPreferenceQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNotificationPreferenceQuery = { __typename?: 'Query', myNotificationPreference?: { __typename?: 'NotificationPreference', postUpdates: boolean } | null };

export type ObserverQueryVariables = Exact<{ [key: string]: never; }>;


export type ObserverQuery = { __typename?: 'Query', observer?: { __typename?: 'Observer', rowId: string, identityProviderId: string, username?: string | null, name: string, email: string } | null };

export type PostReferencesQueryVariables = Exact<{
  targetPostId: Scalars['UUID']['input'];
}>;


export type PostReferencesQuery = { __typename?: 'Query', postReferences?: { __typename?: 'PostReferenceConnection', nodes: Array<{ __typename?: 'PostReference', rowId: string, sourceId: string, sourceType: string, refKind: string, keyword?: string | null } | null> } | null };

export type PostsQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
  after?: InputMaybe<Scalars['Cursor']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  excludedStatuses?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  tagFilter?: InputMaybe<PostToManyPostTagFilter>;
}>;


export type PostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean }, nodes: Array<{ __typename?: 'Post', rowId: string, number?: number | null, title?: string | null, description?: string | null, statusUpdatedAt: Date, createdAt: Date, updatedAt: Date, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, prefix?: string | null, organizationId: string } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, attachments: { __typename?: 'AttachmentConnection', nodes: Array<{ __typename?: 'Attachment', rowId: string, url: string, mimeType: string, kind: string, width?: number | null, height?: number | null, fileSize?: number | null } | null> }, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'VoteConnection', totalCount: number }, userUpvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, downvotes: { __typename?: 'VoteConnection', totalCount: number }, userDownvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, postTags: { __typename?: 'PostTagConnection', nodes: Array<{ __typename?: 'PostTag', tag?: { __typename?: 'Tag', rowId: string } | null } | null> } } | null> } | null };

export type PostsByRowIdsQueryVariables = Exact<{
  rowIds?: InputMaybe<Array<Scalars['UUID']['input']> | Scalars['UUID']['input']>;
}>;


export type PostsByRowIdsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', nodes: Array<{ __typename?: 'Post', rowId: string, number?: number | null, title?: string | null } | null> } | null };

export type ProjectQueryVariables = Exact<{
  projectSlug: Scalars['String']['input'];
  organizationId: Scalars['UUID']['input'];
  userId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type ProjectQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', nodes: Array<{ __typename?: 'Project', rowId: string, name: string, description?: string | null, image?: string | null, slug: string, prefix?: string | null, organizationId: string, nextPostNumber: number, isPublic: boolean, showRoadmap: boolean, showChangelog: boolean, projectLinks: { __typename?: 'ProjectLinkConnection', nodes: Array<{ __typename?: 'ProjectLink', rowId: string, projectId: string, url: string, title?: string | null, order: number } | null> }, posts: { __typename?: 'PostConnection', aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null }, userPosts: { __typename?: 'PostConnection', nodes: Array<{ __typename?: 'Post', rowId: string } | null> } } | null> } | null };

export type ProjectBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  organizationId: Scalars['UUID']['input'];
}>;


export type ProjectBySlugQuery = { __typename?: 'Query', projectBySlugAndOrganizationId?: { __typename?: 'Project', rowId: string, name: string } | null };

export type ProjectMetricsQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
}>;


export type ProjectMetricsQuery = { __typename?: 'Query', project?: { __typename?: 'Project', createdAt: Date, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null, upvotes?: { __typename?: 'VoteConnection', totalCount: number } | null, downvotes?: { __typename?: 'VoteConnection', totalCount: number } | null };

export type ProjectStatusesQueryVariables = Exact<{
  organizationId: Scalars['UUID']['input'];
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ProjectStatusesQuery = { __typename?: 'Query', statusTemplates?: { __typename?: 'StatusTemplateConnection', nodes: Array<{ __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null, sortOrder?: number | null, showOnRoadmap?: boolean | null } | null> } | null, projectStatusConfigs?: { __typename?: 'ProjectStatusConfigConnection', nodes: Array<{ __typename?: 'ProjectStatusConfig', rowId: string, projectId: string, statusTemplateId: string, customColor?: string | null, customDescription?: string | null, isEnabled?: boolean | null, isDefault?: boolean | null, sortOrder?: number | null } | null> } | null };

export type ProjectsQueryVariables = Exact<{
  pageSize: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  organizationId: Scalars['UUID']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', totalCount: number, nodes: Array<{ __typename?: 'Project', rowId: string, name: string, description?: string | null, image?: string | null, slug: string, organizationId: string, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null> } | null };

export type RecentFeedbackQueryVariables = Exact<{
  organizationIds?: InputMaybe<Array<Scalars['UUID']['input']> | Scalars['UUID']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type RecentFeedbackQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'PostEdge', node?: { __typename?: 'Post', rowId: string, number?: number | null, createdAt: Date, title?: string | null, description?: string | null, project?: { __typename?: 'Project', name: string, slug: string, organizationId: string } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, displayName: string, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null } | null } | null> } | null };

export type RepliesQueryVariables = Exact<{
  commentId: Scalars['UUID']['input'];
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type RepliesQuery = { __typename?: 'Query', comments?: { __typename?: 'CommentConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'CommentEdge', node?: { __typename?: 'Comment', rowId: string, parentId?: string | null, message?: string | null, createdAt: Date, user?: { __typename?: 'User', rowId: string, username?: string | null, avatarUrl?: string | null } | null } | null } | null> } | null };

export type StatusBreakdownQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
}>;


export type StatusBreakdownQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', groupedAggregates?: Array<{ __typename?: 'PostAggregates', keys?: Array<string | null> | null, distinctCount?: { __typename?: 'PostDistinctCountAggregates', rowId?: string | null } | null }> | null } | null };

export type UserQueryVariables = Exact<{
  identityProviderId: Scalars['UUID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', userByIdentityProviderId?: { __typename?: 'User', rowId: string, identityProviderId: string, username?: string | null, name: string, email: string, avatarUrl?: string | null } | null };

export type UserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserByEmailQuery = { __typename?: 'Query', userByEmail?: { __typename?: 'User', rowId: string, identityProviderId: string, username?: string | null, name: string, email: string } | null };

export type WorkspaceQueryVariables = Exact<{
  organizationId: Scalars['UUID']['input'];
}>;


export type WorkspaceQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', totalCount: number, nodes: Array<{ __typename?: 'Project', rowId: string, name: string, description?: string | null, slug: string, organizationId: string, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null> } | null };

export type WorkspaceMetricsQueryVariables = Exact<{
  organizationId: Scalars['UUID']['input'];
}>;


export type WorkspaceMetricsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', totalCount: number } | null, posts?: { __typename?: 'PostConnection', totalCount: number } | null };


export const CommentFragmentDoc = `
    fragment Comment on Comment {
  rowId
  message
  user {
    rowId
    username
    avatarUrl
  }
  createdAt
  childComments {
    totalCount
  }
}
    `;
export const AttachmentFragmentDoc = `
    fragment Attachment on Attachment {
  rowId
  url
  mimeType
  kind
  width
  height
  fileSize
}
    `;
export const FeedbackFragmentDoc = `
    fragment Feedback on Post {
  rowId
  number
  title
  description
  statusUpdatedAt
  createdAt
  updatedAt
  project {
    rowId
    name
    slug
    prefix
    organizationId
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
  attachments {
    nodes {
      ...Attachment
    }
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
  postTags {
    nodes {
      tag {
        rowId
      }
    }
  }
}
    ${AttachmentFragmentDoc}`;
export const ProjectFragmentDoc = `
    fragment Project on Project {
  rowId
  name
  description
  image
  slug
  prefix
  organizationId
  nextPostNumber
  isPublic
  showRoadmap
  showChangelog
  projectLinks(orderBy: ORDER_ASC) {
    nodes {
      rowId
      projectId
      url
      title
      order
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
    avatarUrl
  }
  createdAt
}
    `;
export const UserFragmentDoc = `
    fragment User on User {
  rowId
  identityProviderId
  username
  name
  email
  avatarUrl
}
    `;
export const CreateAttachmentDocument = `
    mutation CreateAttachment($input: CreateAttachmentInput!) {
  createAttachment(input: $input) {
    attachment {
      ...Attachment
    }
  }
}
    ${AttachmentFragmentDoc}`;

export const useCreateAttachmentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateAttachmentMutation, TError, CreateAttachmentMutationVariables, TContext>) => {
    
    return useMutation<CreateAttachmentMutation, TError, CreateAttachmentMutationVariables, TContext>(
      {
    mutationKey: ['CreateAttachment'],
    mutationFn: (variables?: CreateAttachmentMutationVariables) => graphqlFetch<CreateAttachmentMutation, CreateAttachmentMutationVariables>(CreateAttachmentDocument, variables)(),
    ...options
  }
    )};

useCreateAttachmentMutation.getKey = () => ['CreateAttachment'];


useCreateAttachmentMutation.fetcher = (variables: CreateAttachmentMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateAttachmentMutation, CreateAttachmentMutationVariables>(CreateAttachmentDocument, variables, options);

export const DeleteAttachmentDocument = `
    mutation DeleteAttachment($input: DeleteAttachmentInput!) {
  deleteAttachment(input: $input) {
    clientMutationId
  }
}
    `;

export const useDeleteAttachmentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteAttachmentMutation, TError, DeleteAttachmentMutationVariables, TContext>) => {
    
    return useMutation<DeleteAttachmentMutation, TError, DeleteAttachmentMutationVariables, TContext>(
      {
    mutationKey: ['DeleteAttachment'],
    mutationFn: (variables?: DeleteAttachmentMutationVariables) => graphqlFetch<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>(DeleteAttachmentDocument, variables)(),
    ...options
  }
    )};

useDeleteAttachmentMutation.getKey = () => ['DeleteAttachment'];


useDeleteAttachmentMutation.fetcher = (variables: DeleteAttachmentMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>(DeleteAttachmentDocument, variables, options);

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

export const ChangePostStatusDocument = `
    mutation ChangePostStatus($postId: UUID!, $statusTemplateId: UUID, $note: String) {
  changePostStatus(
    input: {postId: $postId, statusTemplateId: $statusTemplateId, note: $note}
  ) {
    id
    statusTemplateId
  }
}
    `;

export const useChangePostStatusMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ChangePostStatusMutation, TError, ChangePostStatusMutationVariables, TContext>) => {
    
    return useMutation<ChangePostStatusMutation, TError, ChangePostStatusMutationVariables, TContext>(
      {
    mutationKey: ['ChangePostStatus'],
    mutationFn: (variables?: ChangePostStatusMutationVariables) => graphqlFetch<ChangePostStatusMutation, ChangePostStatusMutationVariables>(ChangePostStatusDocument, variables)(),
    ...options
  }
    )};

useChangePostStatusMutation.getKey = () => ['ChangePostStatus'];


useChangePostStatusMutation.fetcher = (variables: ChangePostStatusMutationVariables, options?: RequestInit['headers']) => graphqlFetch<ChangePostStatusMutation, ChangePostStatusMutationVariables>(ChangePostStatusDocument, variables, options);

export const CreateFeedbackDocument = `
    mutation CreateFeedback($input: CreatePostInput!) {
  createPost(input: $input) {
    post {
      rowId
    }
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

export const DeletePostStatusChangeDocument = `
    mutation DeletePostStatusChange($rowId: UUID!) {
  deletePostStatusChange(input: {rowId: $rowId}) {
    id
  }
}
    `;

export const useDeletePostStatusChangeMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeletePostStatusChangeMutation, TError, DeletePostStatusChangeMutationVariables, TContext>) => {
    
    return useMutation<DeletePostStatusChangeMutation, TError, DeletePostStatusChangeMutationVariables, TContext>(
      {
    mutationKey: ['DeletePostStatusChange'],
    mutationFn: (variables?: DeletePostStatusChangeMutationVariables) => graphqlFetch<DeletePostStatusChangeMutation, DeletePostStatusChangeMutationVariables>(DeletePostStatusChangeDocument, variables)(),
    ...options
  }
    )};

useDeletePostStatusChangeMutation.getKey = () => ['DeletePostStatusChange'];


useDeletePostStatusChangeMutation.fetcher = (variables: DeletePostStatusChangeMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeletePostStatusChangeMutation, DeletePostStatusChangeMutationVariables>(DeletePostStatusChangeDocument, variables, options);

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
      organizationId
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

export const CreateProjectLinkDocument = `
    mutation CreateProjectLink($input: CreateProjectLinkInput!) {
  createProjectLink(input: $input) {
    clientMutationId
  }
}
    `;

export const useCreateProjectLinkMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateProjectLinkMutation, TError, CreateProjectLinkMutationVariables, TContext>) => {
    
    return useMutation<CreateProjectLinkMutation, TError, CreateProjectLinkMutationVariables, TContext>(
      {
    mutationKey: ['CreateProjectLink'],
    mutationFn: (variables?: CreateProjectLinkMutationVariables) => graphqlFetch<CreateProjectLinkMutation, CreateProjectLinkMutationVariables>(CreateProjectLinkDocument, variables)(),
    ...options
  }
    )};

useCreateProjectLinkMutation.getKey = () => ['CreateProjectLink'];


useCreateProjectLinkMutation.fetcher = (variables: CreateProjectLinkMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateProjectLinkMutation, CreateProjectLinkMutationVariables>(CreateProjectLinkDocument, variables, options);

export const DeleteProjectLinkDocument = `
    mutation DeleteProjectLink($linkId: UUID!) {
  deleteProjectLink(input: {rowId: $linkId}) {
    clientMutationId
  }
}
    `;

export const useDeleteProjectLinkMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteProjectLinkMutation, TError, DeleteProjectLinkMutationVariables, TContext>) => {
    
    return useMutation<DeleteProjectLinkMutation, TError, DeleteProjectLinkMutationVariables, TContext>(
      {
    mutationKey: ['DeleteProjectLink'],
    mutationFn: (variables?: DeleteProjectLinkMutationVariables) => graphqlFetch<DeleteProjectLinkMutation, DeleteProjectLinkMutationVariables>(DeleteProjectLinkDocument, variables)(),
    ...options
  }
    )};

useDeleteProjectLinkMutation.getKey = () => ['DeleteProjectLink'];


useDeleteProjectLinkMutation.fetcher = (variables: DeleteProjectLinkMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteProjectLinkMutation, DeleteProjectLinkMutationVariables>(DeleteProjectLinkDocument, variables, options);

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
      showOnRoadmap
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
    mutation CreateUser($identityProviderId: UUID!, $username: String, $name: String!, $email: String!) {
  createUser(
    input: {user: {identityProviderId: $identityProviderId, username: $username, name: $name, email: $email}}
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

export const SetNotificationPreferenceDocument = `
    mutation SetNotificationPreference($postUpdates: Boolean!) {
  setNotificationPreference(input: {postUpdates: $postUpdates}) {
    postUpdates
  }
}
    `;

export const useSetNotificationPreferenceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SetNotificationPreferenceMutation, TError, SetNotificationPreferenceMutationVariables, TContext>) => {
    
    return useMutation<SetNotificationPreferenceMutation, TError, SetNotificationPreferenceMutationVariables, TContext>(
      {
    mutationKey: ['SetNotificationPreference'],
    mutationFn: (variables?: SetNotificationPreferenceMutationVariables) => graphqlFetch<SetNotificationPreferenceMutation, SetNotificationPreferenceMutationVariables>(SetNotificationPreferenceDocument, variables)(),
    ...options
  }
    )};

useSetNotificationPreferenceMutation.getKey = () => ['SetNotificationPreference'];


useSetNotificationPreferenceMutation.fetcher = (variables: SetNotificationPreferenceMutationVariables, options?: RequestInit['headers']) => graphqlFetch<SetNotificationPreferenceMutation, SetNotificationPreferenceMutationVariables>(SetNotificationPreferenceDocument, variables, options);

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

export const FeedbackByNumberDocument = `
    query FeedbackByNumber($projectId: UUID!, $number: Int!, $userId: UUID) {
  postByProjectIdAndNumber(projectId: $projectId, number: $number) {
    ...Feedback
  }
}
    ${FeedbackFragmentDoc}`;

export const useFeedbackByNumberQuery = <
      TData = FeedbackByNumberQuery,
      TError = unknown
    >(
      variables: FeedbackByNumberQueryVariables,
      options?: Omit<UseQueryOptions<FeedbackByNumberQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FeedbackByNumberQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FeedbackByNumberQuery, TError, TData>(
      {
    queryKey: ['FeedbackByNumber', variables],
    queryFn: graphqlFetch<FeedbackByNumberQuery, FeedbackByNumberQueryVariables>(FeedbackByNumberDocument, variables),
    ...options
  }
    )};

useFeedbackByNumberQuery.getKey = (variables: FeedbackByNumberQueryVariables) => ['FeedbackByNumber', variables];

export const useInfiniteFeedbackByNumberQuery = <
      TData = InfiniteData<FeedbackByNumberQuery>,
      TError = unknown
    >(
      variables: FeedbackByNumberQueryVariables,
      options: Omit<UseInfiniteQueryOptions<FeedbackByNumberQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<FeedbackByNumberQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<FeedbackByNumberQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['FeedbackByNumber.infinite', variables],
      queryFn: (metaData) => graphqlFetch<FeedbackByNumberQuery, FeedbackByNumberQueryVariables>(FeedbackByNumberDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteFeedbackByNumberQuery.getKey = (variables: FeedbackByNumberQueryVariables) => ['FeedbackByNumber.infinite', variables];


useFeedbackByNumberQuery.fetcher = (variables: FeedbackByNumberQueryVariables, options?: RequestInit['headers']) => graphqlFetch<FeedbackByNumberQuery, FeedbackByNumberQueryVariables>(FeedbackByNumberDocument, variables, options);

export const MyNotificationPreferenceDocument = `
    query MyNotificationPreference {
  myNotificationPreference {
    postUpdates
  }
}
    `;

export const useMyNotificationPreferenceQuery = <
      TData = MyNotificationPreferenceQuery,
      TError = unknown
    >(
      variables?: MyNotificationPreferenceQueryVariables,
      options?: Omit<UseQueryOptions<MyNotificationPreferenceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MyNotificationPreferenceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MyNotificationPreferenceQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['MyNotificationPreference'] : ['MyNotificationPreference', variables],
    queryFn: graphqlFetch<MyNotificationPreferenceQuery, MyNotificationPreferenceQueryVariables>(MyNotificationPreferenceDocument, variables),
    ...options
  }
    )};

useMyNotificationPreferenceQuery.getKey = (variables?: MyNotificationPreferenceQueryVariables) => variables === undefined ? ['MyNotificationPreference'] : ['MyNotificationPreference', variables];

export const useInfiniteMyNotificationPreferenceQuery = <
      TData = InfiniteData<MyNotificationPreferenceQuery>,
      TError = unknown
    >(
      variables: MyNotificationPreferenceQueryVariables,
      options: Omit<UseInfiniteQueryOptions<MyNotificationPreferenceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<MyNotificationPreferenceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<MyNotificationPreferenceQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['MyNotificationPreference.infinite'] : ['MyNotificationPreference.infinite', variables],
      queryFn: (metaData) => graphqlFetch<MyNotificationPreferenceQuery, MyNotificationPreferenceQueryVariables>(MyNotificationPreferenceDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteMyNotificationPreferenceQuery.getKey = (variables?: MyNotificationPreferenceQueryVariables) => variables === undefined ? ['MyNotificationPreference.infinite'] : ['MyNotificationPreference.infinite', variables];


useMyNotificationPreferenceQuery.fetcher = (variables?: MyNotificationPreferenceQueryVariables, options?: RequestInit['headers']) => graphqlFetch<MyNotificationPreferenceQuery, MyNotificationPreferenceQueryVariables>(MyNotificationPreferenceDocument, variables, options);

export const ObserverDocument = `
    query Observer {
  observer {
    rowId
    identityProviderId
    username
    name
    email
  }
}
    `;

export const useObserverQuery = <
      TData = ObserverQuery,
      TError = unknown
    >(
      variables?: ObserverQueryVariables,
      options?: Omit<UseQueryOptions<ObserverQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ObserverQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ObserverQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Observer'] : ['Observer', variables],
    queryFn: graphqlFetch<ObserverQuery, ObserverQueryVariables>(ObserverDocument, variables),
    ...options
  }
    )};

useObserverQuery.getKey = (variables?: ObserverQueryVariables) => variables === undefined ? ['Observer'] : ['Observer', variables];

export const useInfiniteObserverQuery = <
      TData = InfiniteData<ObserverQuery>,
      TError = unknown
    >(
      variables: ObserverQueryVariables,
      options: Omit<UseInfiniteQueryOptions<ObserverQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<ObserverQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<ObserverQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['Observer.infinite'] : ['Observer.infinite', variables],
      queryFn: (metaData) => graphqlFetch<ObserverQuery, ObserverQueryVariables>(ObserverDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteObserverQuery.getKey = (variables?: ObserverQueryVariables) => variables === undefined ? ['Observer.infinite'] : ['Observer.infinite', variables];


useObserverQuery.fetcher = (variables?: ObserverQueryVariables, options?: RequestInit['headers']) => graphqlFetch<ObserverQuery, ObserverQueryVariables>(ObserverDocument, variables, options);

export const PostReferencesDocument = `
    query PostReferences($targetPostId: UUID!) {
  postReferences(
    condition: {targetPostId: $targetPostId, sourceType: "post"}
    orderBy: [CREATED_AT_DESC]
  ) {
    nodes {
      rowId
      sourceId
      sourceType
      refKind
      keyword
    }
  }
}
    `;

export const usePostReferencesQuery = <
      TData = PostReferencesQuery,
      TError = unknown
    >(
      variables: PostReferencesQueryVariables,
      options?: Omit<UseQueryOptions<PostReferencesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PostReferencesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PostReferencesQuery, TError, TData>(
      {
    queryKey: ['PostReferences', variables],
    queryFn: graphqlFetch<PostReferencesQuery, PostReferencesQueryVariables>(PostReferencesDocument, variables),
    ...options
  }
    )};

usePostReferencesQuery.getKey = (variables: PostReferencesQueryVariables) => ['PostReferences', variables];

export const useInfinitePostReferencesQuery = <
      TData = InfiniteData<PostReferencesQuery>,
      TError = unknown
    >(
      variables: PostReferencesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<PostReferencesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<PostReferencesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<PostReferencesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['PostReferences.infinite', variables],
      queryFn: (metaData) => graphqlFetch<PostReferencesQuery, PostReferencesQueryVariables>(PostReferencesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfinitePostReferencesQuery.getKey = (variables: PostReferencesQueryVariables) => ['PostReferences.infinite', variables];


usePostReferencesQuery.fetcher = (variables: PostReferencesQueryVariables, options?: RequestInit['headers']) => graphqlFetch<PostReferencesQuery, PostReferencesQueryVariables>(PostReferencesDocument, variables, options);

export const PostsDocument = `
    query Posts($projectId: UUID!, $after: Cursor, $pageSize: Int = 10, $orderBy: [PostOrderBy!] = CREATED_AT_DESC, $excludedStatuses: [String!], $search: String, $userId: UUID, $tagFilter: PostToManyPostTagFilter) {
  posts(
    after: $after
    first: $pageSize
    orderBy: $orderBy
    filter: {projectId: {equalTo: $projectId}, title: {includesInsensitive: $search}, or: [{statusTemplate: {displayName: {notIn: $excludedStatuses}}}, {statusTemplateId: {isNull: true}}], postTags: $tagFilter}
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

export const PostsByRowIdsDocument = `
    query PostsByRowIds($rowIds: [UUID!]) {
  posts(filter: {rowId: {in: $rowIds}}, first: 50, orderBy: [NUMBER_DESC]) {
    nodes {
      rowId
      number
      title
    }
  }
}
    `;

export const usePostsByRowIdsQuery = <
      TData = PostsByRowIdsQuery,
      TError = unknown
    >(
      variables?: PostsByRowIdsQueryVariables,
      options?: Omit<UseQueryOptions<PostsByRowIdsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PostsByRowIdsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PostsByRowIdsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['PostsByRowIds'] : ['PostsByRowIds', variables],
    queryFn: graphqlFetch<PostsByRowIdsQuery, PostsByRowIdsQueryVariables>(PostsByRowIdsDocument, variables),
    ...options
  }
    )};

usePostsByRowIdsQuery.getKey = (variables?: PostsByRowIdsQueryVariables) => variables === undefined ? ['PostsByRowIds'] : ['PostsByRowIds', variables];

export const useInfinitePostsByRowIdsQuery = <
      TData = InfiniteData<PostsByRowIdsQuery>,
      TError = unknown
    >(
      variables: PostsByRowIdsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<PostsByRowIdsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<PostsByRowIdsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<PostsByRowIdsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['PostsByRowIds.infinite'] : ['PostsByRowIds.infinite', variables],
      queryFn: (metaData) => graphqlFetch<PostsByRowIdsQuery, PostsByRowIdsQueryVariables>(PostsByRowIdsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfinitePostsByRowIdsQuery.getKey = (variables?: PostsByRowIdsQueryVariables) => variables === undefined ? ['PostsByRowIds.infinite'] : ['PostsByRowIds.infinite', variables];


usePostsByRowIdsQuery.fetcher = (variables?: PostsByRowIdsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<PostsByRowIdsQuery, PostsByRowIdsQueryVariables>(PostsByRowIdsDocument, variables, options);

export const ProjectDocument = `
    query Project($projectSlug: String!, $organizationId: UUID!, $userId: UUID) {
  projects(
    first: 1
    condition: {slug: $projectSlug, organizationId: $organizationId}
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
    query ProjectStatuses($organizationId: UUID!, $isEnabled: Boolean) {
  statusTemplates(
    condition: {organizationId: $organizationId}
    orderBy: [SORT_ORDER_ASC, CREATED_AT_ASC]
  ) {
    nodes {
      rowId
      name
      displayName
      description
      color
      sortOrder
      showOnRoadmap
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
    query Projects($pageSize: Int!, $offset: Int!, $organizationId: UUID!, $search: String) {
  projects(
    orderBy: POSTS_COUNT_DESC
    first: $pageSize
    offset: $offset
    filter: {name: {includesInsensitive: $search}, organizationId: {equalTo: $organizationId}}
  ) {
    totalCount
    nodes {
      rowId
      name
      description
      image
      slug
      organizationId
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
    query RecentFeedback($organizationIds: [UUID!], $after: Cursor) {
  posts(
    first: 10
    after: $after
    orderBy: CREATED_AT_DESC
    filter: {project: {organizationId: {in: $organizationIds}}}
  ) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        rowId
        number
        createdAt
        title
        description
        project {
          name
          slug
          organizationId
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
      variables?: RecentFeedbackQueryVariables,
      options?: Omit<UseQueryOptions<RecentFeedbackQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RecentFeedbackQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RecentFeedbackQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['RecentFeedback'] : ['RecentFeedback', variables],
    queryFn: graphqlFetch<RecentFeedbackQuery, RecentFeedbackQueryVariables>(RecentFeedbackDocument, variables),
    ...options
  }
    )};

useRecentFeedbackQuery.getKey = (variables?: RecentFeedbackQueryVariables) => variables === undefined ? ['RecentFeedback'] : ['RecentFeedback', variables];

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
      queryKey: optionsQueryKey ?? variables === undefined ? ['RecentFeedback.infinite'] : ['RecentFeedback.infinite', variables],
      queryFn: (metaData) => graphqlFetch<RecentFeedbackQuery, RecentFeedbackQueryVariables>(RecentFeedbackDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteRecentFeedbackQuery.getKey = (variables?: RecentFeedbackQueryVariables) => variables === undefined ? ['RecentFeedback.infinite'] : ['RecentFeedback.infinite', variables];


useRecentFeedbackQuery.fetcher = (variables?: RecentFeedbackQueryVariables, options?: RequestInit['headers']) => graphqlFetch<RecentFeedbackQuery, RecentFeedbackQueryVariables>(RecentFeedbackDocument, variables, options);

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
    name
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

export const WorkspaceDocument = `
    query Workspace($organizationId: UUID!) {
  projects(
    condition: {organizationId: $organizationId}
    first: 6
    orderBy: POSTS_COUNT_DESC
  ) {
    totalCount
    nodes {
      rowId
      name
      description
      slug
      organizationId
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
    query WorkspaceMetrics($organizationId: UUID!) {
  projects(condition: {organizationId: $organizationId}) {
    totalCount
  }
  posts(filter: {project: {organizationId: {equalTo: $organizationId}}}) {
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
