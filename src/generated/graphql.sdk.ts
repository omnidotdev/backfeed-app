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

/** All input for the create `Signal` mutation. */
export type CreateSignalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Signal` to be created by this mutation. */
  signal: SignalInput;
};

/** The output of our create `Signal` mutation. */
export type CreateSignalPayload = {
  __typename?: 'CreateSignalPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Signal` that was created by this mutation. */
  signal?: Maybe<Signal>;
  /** An edge for our `Signal`. May be used by Relay 1. */
  signalEdge?: Maybe<SignalEdge>;
};


/** The output of our create `Signal` mutation. */
export type CreateSignalPayloadSignalEdgeArgs = {
  orderBy?: Array<SignalOrderBy>;
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

/** All input for the `deleteSignal` mutation. */
export type DeleteSignalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Signal` mutation. */
export type DeleteSignalPayload = {
  __typename?: 'DeleteSignalPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Signal` that was deleted by this mutation. */
  signal?: Maybe<Signal>;
  /** An edge for our `Signal`. May be used by Relay 1. */
  signalEdge?: Maybe<SignalEdge>;
};


/** The output of our delete `Signal` mutation. */
export type DeleteSignalPayloadSignalEdgeArgs = {
  orderBy?: Array<SignalOrderBy>;
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
  /** Creates a single `Attachment`. */
  createAttachment?: Maybe<CreateAttachmentPayload>;
  /** Creates a single `Comment`. */
  createComment?: Maybe<CreateCommentPayload>;
  /** Creates a single `Post`. */
  createPost?: Maybe<CreatePostPayload>;
  /** Creates a single `Project`. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a single `ProjectLink`. */
  createProjectLink?: Maybe<CreateProjectLinkPayload>;
  /** Creates a single `ProjectStatusConfig`. */
  createProjectStatusConfig?: Maybe<CreateProjectStatusConfigPayload>;
  /** Creates a single `Signal`. */
  createSignal?: Maybe<CreateSignalPayload>;
  /** Creates a single `StatusTemplate`. */
  createStatusTemplate?: Maybe<CreateStatusTemplatePayload>;
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
  /** Deletes a single `Project` using a unique key. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `ProjectLink` using a unique key. */
  deleteProjectLink?: Maybe<DeleteProjectLinkPayload>;
  /** Deletes a single `ProjectStatusConfig` using a unique key. */
  deleteProjectStatusConfig?: Maybe<DeleteProjectStatusConfigPayload>;
  /** Deletes a single `Signal` using a unique key. */
  deleteSignal?: Maybe<DeleteSignalPayload>;
  /** Deletes a single `StatusTemplate` using a unique key. */
  deleteStatusTemplate?: Maybe<DeleteStatusTemplatePayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `Vote` using a unique key. */
  deleteVote?: Maybe<DeleteVotePayload>;
  /** Deletes a single `WardenSyncQueue` using a unique key. */
  deleteWardenSyncQueue?: Maybe<DeleteWardenSyncQueuePayload>;
  /** Updates a single `Attachment` using a unique key and a patch. */
  updateAttachment?: Maybe<UpdateAttachmentPayload>;
  /** Updates a single `Comment` using a unique key and a patch. */
  updateComment?: Maybe<UpdateCommentPayload>;
  /** Updates a single `Post` using a unique key and a patch. */
  updatePost?: Maybe<UpdatePostPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a single `ProjectLink` using a unique key and a patch. */
  updateProjectLink?: Maybe<UpdateProjectLinkPayload>;
  /** Updates a single `ProjectStatusConfig` using a unique key and a patch. */
  updateProjectStatusConfig?: Maybe<UpdateProjectStatusConfigPayload>;
  /** Updates a single `Signal` using a unique key and a patch. */
  updateSignal?: Maybe<UpdateSignalPayload>;
  /** Updates a single `StatusTemplate` using a unique key and a patch. */
  updateStatusTemplate?: Maybe<UpdateStatusTemplatePayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `Vote` using a unique key and a patch. */
  updateVote?: Maybe<UpdateVotePayload>;
  /** Updates a single `WardenSyncQueue` using a unique key and a patch. */
  updateWardenSyncQueue?: Maybe<UpdateWardenSyncQueuePayload>;
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
export type MutationCreateSignalArgs = {
  input: CreateSignalInput;
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
export type MutationDeleteSignalArgs = {
  input: DeleteSignalInput;
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
export type MutationDeleteWardenSyncQueueArgs = {
  input: DeleteWardenSyncQueueInput;
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
export type MutationUpdateSignalArgs = {
  input: UpdateSignalInput;
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
export type MutationUpdateWardenSyncQueueArgs = {
  input: UpdateWardenSyncQueueInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
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
  /** Reads and enables pagination through a set of `Attachment`. */
  attachments: AttachmentConnection;
  /** Reads and enables pagination through a set of `Comment`. */
  comments: CommentConnection;
  createdAt: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  number: Scalars['Int']['output'];
  /** Reads a single `Project` that is related to this `Post`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
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
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `number` field. */
  number?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
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
  createdAt?: InputMaybe<BigIntFilter>;
  description?: InputMaybe<BigIntFilter>;
  number?: InputMaybe<BigIntFilter>;
  projectId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  source?: InputMaybe<BigIntFilter>;
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
  /** Distinct count of number across the matching connection */
  number?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of projectId across the matching connection */
  projectId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `number` field. */
  number?: InputMaybe<IntFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PostFilter>>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
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
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  Number = 'NUMBER',
  ProjectId = 'PROJECT_ID',
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
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
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
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PostHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  number?: InputMaybe<HavingIntFilter>;
  statusUpdatedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Post` */
export type PostInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
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
  NumberAsc = 'NUMBER_ASC',
  NumberDesc = 'NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SignalsCountAsc = 'SIGNALS_COUNT_ASC',
  SignalsCountDesc = 'SIGNALS_COUNT_DESC',
  SignalsDistinctCountAiTagsAsc = 'SIGNALS_DISTINCT_COUNT_AI_TAGS_ASC',
  SignalsDistinctCountAiTagsDesc = 'SIGNALS_DISTINCT_COUNT_AI_TAGS_DESC',
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
  source?: InputMaybe<Scalars['String']['input']>;
  statusTemplateId?: InputMaybe<Scalars['UUID']['input']>;
  statusUpdatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

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
  /** Reads and enables pagination through a set of `Signal`. */
  signals: SignalConnection;
  slug: Scalars['String']['output'];
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
  /** Filter by the object’s `signals` relation. */
  signals?: InputMaybe<ProjectToManySignalFilter>;
  /** Some related `signals` exist. */
  signalsExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  IsPublic = 'IS_PUBLIC',
  Name = 'NAME',
  NextPostNumber = 'NEXT_POST_NUMBER',
  OrganizationId = 'ORGANIZATION_ID',
  Prefix = 'PREFIX',
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
  PostsDistinctCountCreatedAtAsc = 'POSTS_DISTINCT_COUNT_CREATED_AT_ASC',
  PostsDistinctCountCreatedAtDesc = 'POSTS_DISTINCT_COUNT_CREATED_AT_DESC',
  PostsDistinctCountDescriptionAsc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_ASC',
  PostsDistinctCountDescriptionDesc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_DESC',
  PostsDistinctCountNumberAsc = 'POSTS_DISTINCT_COUNT_NUMBER_ASC',
  PostsDistinctCountNumberDesc = 'POSTS_DISTINCT_COUNT_NUMBER_DESC',
  PostsDistinctCountProjectIdAsc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_ASC',
  PostsDistinctCountProjectIdDesc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_DESC',
  PostsDistinctCountRowIdAsc = 'POSTS_DISTINCT_COUNT_ROW_ID_ASC',
  PostsDistinctCountRowIdDesc = 'POSTS_DISTINCT_COUNT_ROW_ID_DESC',
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
  SignalsCountAsc = 'SIGNALS_COUNT_ASC',
  SignalsCountDesc = 'SIGNALS_COUNT_DESC',
  SignalsDistinctCountAiTagsAsc = 'SIGNALS_DISTINCT_COUNT_AI_TAGS_ASC',
  SignalsDistinctCountAiTagsDesc = 'SIGNALS_DISTINCT_COUNT_AI_TAGS_DESC',
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
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nextPostNumber?: InputMaybe<Scalars['Int']['input']>;
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  prefix?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
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
  /** Reads and enables pagination through a set of `Post`. */
  posts?: Maybe<PostConnection>;
  /** Get a single `Project`. */
  project?: Maybe<Project>;
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
  /** Get a single `Signal`. */
  signal?: Maybe<Signal>;
  /** Reads and enables pagination through a set of `Signal`. */
  signals?: Maybe<SignalConnection>;
  /** Get a single `StatusTemplate`. */
  statusTemplate?: Maybe<StatusTemplate>;
  /** Get a single `StatusTemplate`. */
  statusTemplateByOrganizationIdAndName?: Maybe<StatusTemplate>;
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
export type QuerySignalArgs = {
  rowId: Scalars['UUID']['input'];
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

export type Signal = {
  __typename?: 'Signal';
  aiTags?: Maybe<Scalars['JSON']['output']>;
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

/** A condition to be used against `Signal` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SignalCondition = {
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

/** An input for mutations affecting `Signal` */
export type SignalInput = {
  aiTags?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  organizationId: Scalars['String']['input'];
  postId?: InputMaybe<Scalars['UUID']['input']>;
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  rawContent: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  sentiment?: InputMaybe<Scalars['String']['input']>;
  source: Scalars['String']['input'];
  sourceMetadata?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** Methods to use when ordering `Signal`. */
export enum SignalOrderBy {
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

/** Represents an update to a `Signal`. Fields that are set will be updated. */
export type SignalPatch = {
  aiTags?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['UUID']['input']>;
  projectId?: InputMaybe<Scalars['UUID']['input']>;
  rawContent?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  sentiment?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  sourceMetadata?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type StatusTemplate = {
  __typename?: 'StatusTemplate';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostConnection;
  /** Reads and enables pagination through a set of `ProjectStatusConfig`. */
  projectStatusConfigs: ProjectStatusConfigConnection;
  rowId: Scalars['UUID']['output'];
  sortOrder?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['Datetime']['output'];
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
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
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
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<StatusTemplateFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<StatusTemplateFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
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
  OrganizationId = 'ORGANIZATION_ID',
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
  name: Scalars['String']['input'];
  organizationId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
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
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PostsAverageNumberAsc = 'POSTS_AVERAGE_NUMBER_ASC',
  PostsAverageNumberDesc = 'POSTS_AVERAGE_NUMBER_DESC',
  PostsCountAsc = 'POSTS_COUNT_ASC',
  PostsCountDesc = 'POSTS_COUNT_DESC',
  PostsDistinctCountCreatedAtAsc = 'POSTS_DISTINCT_COUNT_CREATED_AT_ASC',
  PostsDistinctCountCreatedAtDesc = 'POSTS_DISTINCT_COUNT_CREATED_AT_DESC',
  PostsDistinctCountDescriptionAsc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_ASC',
  PostsDistinctCountDescriptionDesc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_DESC',
  PostsDistinctCountNumberAsc = 'POSTS_DISTINCT_COUNT_NUMBER_ASC',
  PostsDistinctCountNumberDesc = 'POSTS_DISTINCT_COUNT_NUMBER_DESC',
  PostsDistinctCountProjectIdAsc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_ASC',
  PostsDistinctCountProjectIdDesc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_DESC',
  PostsDistinctCountRowIdAsc = 'POSTS_DISTINCT_COUNT_ROW_ID_ASC',
  PostsDistinctCountRowIdDesc = 'POSTS_DISTINCT_COUNT_ROW_ID_DESC',
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
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `StatusTemplate`. Fields that are set will be updated. */
export type StatusTemplatePatch = {
  color?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
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

/** All input for the `updateSignal` mutation. */
export type UpdateSignalInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Signal` being updated. */
  patch: SignalPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Signal` mutation. */
export type UpdateSignalPayload = {
  __typename?: 'UpdateSignalPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Signal` that was updated by this mutation. */
  signal?: Maybe<Signal>;
  /** An edge for our `Signal`. May be used by Relay 1. */
  signalEdge?: Maybe<SignalEdge>;
};


/** The output of our update `Signal` mutation. */
export type UpdateSignalPayloadSignalEdgeArgs = {
  orderBy?: Array<SignalOrderBy>;
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
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostConnection;
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
  /** Filter by the object’s `posts` relation. */
  posts?: InputMaybe<UserToManyPostFilter>;
  /** Some related `posts` exist. */
  postsExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  PostsDistinctCountCreatedAtAsc = 'POSTS_DISTINCT_COUNT_CREATED_AT_ASC',
  PostsDistinctCountCreatedAtDesc = 'POSTS_DISTINCT_COUNT_CREATED_AT_DESC',
  PostsDistinctCountDescriptionAsc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_ASC',
  PostsDistinctCountDescriptionDesc = 'POSTS_DISTINCT_COUNT_DESCRIPTION_DESC',
  PostsDistinctCountNumberAsc = 'POSTS_DISTINCT_COUNT_NUMBER_ASC',
  PostsDistinctCountNumberDesc = 'POSTS_DISTINCT_COUNT_NUMBER_DESC',
  PostsDistinctCountProjectIdAsc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_ASC',
  PostsDistinctCountProjectIdDesc = 'POSTS_DISTINCT_COUNT_PROJECT_ID_DESC',
  PostsDistinctCountRowIdAsc = 'POSTS_DISTINCT_COUNT_ROW_ID_ASC',
  PostsDistinctCountRowIdDesc = 'POSTS_DISTINCT_COUNT_ROW_ID_DESC',
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
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SignalsCountAsc = 'SIGNALS_COUNT_ASC',
  SignalsCountDesc = 'SIGNALS_COUNT_DESC',
  SignalsDistinctCountAiTagsAsc = 'SIGNALS_DISTINCT_COUNT_AI_TAGS_ASC',
  SignalsDistinctCountAiTagsDesc = 'SIGNALS_DISTINCT_COUNT_AI_TAGS_DESC',
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

export type FeedbackFragment = { __typename?: 'Post', rowId: string, number: number, title?: string | null, description?: string | null, statusUpdatedAt: Date, createdAt: Date, updatedAt: Date, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, prefix?: string | null, organizationId: string } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, attachments: { __typename?: 'AttachmentConnection', nodes: Array<{ __typename?: 'Attachment', rowId: string, url: string, mimeType: string, kind: string, width?: number | null, height?: number | null, fileSize?: number | null } | null> }, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'VoteConnection', totalCount: number }, userUpvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, downvotes: { __typename?: 'VoteConnection', totalCount: number }, userDownvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> } };

export type ProjectFragment = { __typename?: 'Project', rowId: string, name: string, description?: string | null, slug: string, prefix?: string | null, organizationId: string, nextPostNumber: number, isPublic: boolean, projectLinks: { __typename?: 'ProjectLinkConnection', nodes: Array<{ __typename?: 'ProjectLink', rowId: string, projectId: string, url: string, title?: string | null, order: number } | null> }, posts: { __typename?: 'PostConnection', aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null }, userPosts: { __typename?: 'PostConnection', nodes: Array<{ __typename?: 'Post', rowId: string } | null> } };

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

export type CreateFeedbackMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'CreatePostPayload', post?: { __typename?: 'Post', rowId: string } | null } | null };

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


export type UpdateStatusTemplateMutation = { __typename?: 'Mutation', updateStatusTemplate?: { __typename?: 'UpdateStatusTemplatePayload', clientMutationId?: string | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, color?: string | null, description?: string | null, sortOrder?: number | null } | null } | null };

export type CreateUserMutationVariables = Exact<{
  identityProviderId: Scalars['UUID']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
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


export type FeedbackByIdQuery = { __typename?: 'Query', post?: { __typename?: 'Post', rowId: string, number: number, title?: string | null, description?: string | null, statusUpdatedAt: Date, createdAt: Date, updatedAt: Date, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, prefix?: string | null, organizationId: string } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, attachments: { __typename?: 'AttachmentConnection', nodes: Array<{ __typename?: 'Attachment', rowId: string, url: string, mimeType: string, kind: string, width?: number | null, height?: number | null, fileSize?: number | null } | null> }, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'VoteConnection', totalCount: number }, userUpvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, downvotes: { __typename?: 'VoteConnection', totalCount: number }, userDownvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> } } | null };

export type FeedbackByNumberQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
  number: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type FeedbackByNumberQuery = { __typename?: 'Query', postByProjectIdAndNumber?: { __typename?: 'Post', rowId: string, number: number, title?: string | null, description?: string | null, statusUpdatedAt: Date, createdAt: Date, updatedAt: Date, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, prefix?: string | null, organizationId: string } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, attachments: { __typename?: 'AttachmentConnection', nodes: Array<{ __typename?: 'Attachment', rowId: string, url: string, mimeType: string, kind: string, width?: number | null, height?: number | null, fileSize?: number | null } | null> }, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'VoteConnection', totalCount: number }, userUpvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, downvotes: { __typename?: 'VoteConnection', totalCount: number }, userDownvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> } } | null };

export type ObserverQueryVariables = Exact<{ [key: string]: never; }>;


export type ObserverQuery = { __typename?: 'Query', observer?: { __typename?: 'Observer', rowId: string, identityProviderId: string, username?: string | null, name: string, email: string } | null };

export type PostsQueryVariables = Exact<{
  projectId: Scalars['UUID']['input'];
  after?: InputMaybe<Scalars['Cursor']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy> | PostOrderBy>;
  excludedStatuses?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean }, nodes: Array<{ __typename?: 'Post', rowId: string, number: number, title?: string | null, description?: string | null, statusUpdatedAt: Date, createdAt: Date, updatedAt: Date, project?: { __typename?: 'Project', rowId: string, name: string, slug: string, prefix?: string | null, organizationId: string } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null, attachments: { __typename?: 'AttachmentConnection', nodes: Array<{ __typename?: 'Attachment', rowId: string, url: string, mimeType: string, kind: string, width?: number | null, height?: number | null, fileSize?: number | null } | null> }, comments: { __typename?: 'CommentConnection', totalCount: number }, commentsWithReplies: { __typename?: 'CommentConnection', totalCount: number }, upvotes: { __typename?: 'VoteConnection', totalCount: number }, userUpvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> }, downvotes: { __typename?: 'VoteConnection', totalCount: number }, userDownvotes: { __typename?: 'VoteConnection', nodes: Array<{ __typename?: 'Vote', rowId: string } | null> } } | null> } | null };

export type ProjectQueryVariables = Exact<{
  projectSlug: Scalars['String']['input'];
  organizationId: Scalars['UUID']['input'];
  userId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type ProjectQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', nodes: Array<{ __typename?: 'Project', rowId: string, name: string, description?: string | null, slug: string, prefix?: string | null, organizationId: string, nextPostNumber: number, isPublic: boolean, projectLinks: { __typename?: 'ProjectLinkConnection', nodes: Array<{ __typename?: 'ProjectLink', rowId: string, projectId: string, url: string, title?: string | null, order: number } | null> }, posts: { __typename?: 'PostConnection', aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null }, userPosts: { __typename?: 'PostConnection', nodes: Array<{ __typename?: 'Post', rowId: string } | null> } } | null> } | null };

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


export type ProjectStatusesQuery = { __typename?: 'Query', statusTemplates?: { __typename?: 'StatusTemplateConnection', nodes: Array<{ __typename?: 'StatusTemplate', rowId: string, name: string, displayName: string, description?: string | null, color?: string | null, sortOrder?: number | null } | null> } | null, projectStatusConfigs?: { __typename?: 'ProjectStatusConfigConnection', nodes: Array<{ __typename?: 'ProjectStatusConfig', rowId: string, projectId: string, statusTemplateId: string, customColor?: string | null, customDescription?: string | null, isEnabled?: boolean | null, isDefault?: boolean | null, sortOrder?: number | null } | null> } | null };

export type ProjectsQueryVariables = Exact<{
  pageSize: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  organizationId: Scalars['UUID']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', totalCount: number, nodes: Array<{ __typename?: 'Project', rowId: string, name: string, description?: string | null, slug: string, organizationId: string, posts: { __typename?: 'PostConnection', totalCount: number, aggregates?: { __typename?: 'PostAggregates', distinctCount?: { __typename?: 'PostDistinctCountAggregates', userId?: string | null } | null } | null } } | null> } | null };

export type RecentFeedbackQueryVariables = Exact<{
  organizationIds?: InputMaybe<Array<Scalars['UUID']['input']> | Scalars['UUID']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type RecentFeedbackQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'PostEdge', node?: { __typename?: 'Post', rowId: string, number: number, createdAt: Date, title?: string | null, description?: string | null, project?: { __typename?: 'Project', name: string, slug: string, organizationId: string } | null, statusTemplate?: { __typename?: 'StatusTemplate', rowId: string, displayName: string, color?: string | null } | null, user?: { __typename?: 'User', rowId: string, username?: string | null } | null } | null } | null> } | null };

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

export const CommentFragmentDoc = gql`
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
export const AttachmentFragmentDoc = gql`
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
export const FeedbackFragmentDoc = gql`
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
}
    ${AttachmentFragmentDoc}`;
export const ProjectFragmentDoc = gql`
    fragment Project on Project {
  rowId
  name
  description
  slug
  prefix
  organizationId
  nextPostNumber
  isPublic
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
export const ReplyFragmentDoc = gql`
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
export const UserFragmentDoc = gql`
    fragment User on User {
  rowId
  identityProviderId
  username
  name
  email
  avatarUrl
}
    `;
export const CreateAttachmentDocument = gql`
    mutation CreateAttachment($input: CreateAttachmentInput!) {
  createAttachment(input: $input) {
    attachment {
      ...Attachment
    }
  }
}
    ${AttachmentFragmentDoc}`;
export const DeleteAttachmentDocument = gql`
    mutation DeleteAttachment($input: DeleteAttachmentInput!) {
  deleteAttachment(input: $input) {
    clientMutationId
  }
}
    `;
export const CreateCommentDocument = gql`
    mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    clientMutationId
  }
}
    `;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($rowId: UUID!) {
  deleteComment(input: {rowId: $rowId}) {
    clientMutationId
  }
}
    `;
export const CreateFeedbackDocument = gql`
    mutation CreateFeedback($input: CreatePostInput!) {
  createPost(input: $input) {
    post {
      rowId
    }
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
export const UpdatePostDocument = gql`
    mutation UpdatePost($rowId: UUID!, $patch: PostPatch!) {
  updatePost(input: {rowId: $rowId, patch: $patch}) {
    clientMutationId
  }
}
    `;
export const CreateProjectDocument = gql`
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
export const DeleteProjectDocument = gql`
    mutation DeleteProject($rowId: UUID!) {
  deleteProject(input: {rowId: $rowId}) {
    project {
      rowId
    }
  }
}
    `;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($rowId: UUID!, $patch: ProjectPatch!) {
  updateProject(input: {rowId: $rowId, patch: $patch}) {
    project {
      slug
    }
  }
}
    `;
export const CreateProjectLinkDocument = gql`
    mutation CreateProjectLink($input: CreateProjectLinkInput!) {
  createProjectLink(input: $input) {
    clientMutationId
  }
}
    `;
export const DeleteProjectLinkDocument = gql`
    mutation DeleteProjectLink($linkId: UUID!) {
  deleteProjectLink(input: {rowId: $linkId}) {
    clientMutationId
  }
}
    `;
export const CreateProjectStatusConfigDocument = gql`
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
export const DeleteProjectStatusConfigDocument = gql`
    mutation DeleteProjectStatusConfig($rowId: UUID!) {
  deleteProjectStatusConfig(input: {rowId: $rowId}) {
    clientMutationId
  }
}
    `;
export const UpdateProjectStatusConfigDocument = gql`
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
export const CreateStatusTemplateDocument = gql`
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
export const DeleteStatusTemplateDocument = gql`
    mutation DeleteStatusTemplate($rowId: UUID!) {
  deleteStatusTemplate(input: {rowId: $rowId}) {
    clientMutationId
  }
}
    `;
export const UpdateStatusTemplateDocument = gql`
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
export const CreateUserDocument = gql`
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
export const CreateVoteDocument = gql`
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
export const DeleteVoteDocument = gql`
    mutation DeleteVote($rowId: UUID!) {
  deleteVote(input: {rowId: $rowId}) {
    clientMutationId
  }
}
    `;
export const UpdateVoteDocument = gql`
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
export const CommentsDocument = gql`
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
export const FeedbackByIdDocument = gql`
    query FeedbackById($rowId: UUID!, $userId: UUID) {
  post(rowId: $rowId) {
    ...Feedback
  }
}
    ${FeedbackFragmentDoc}`;
export const FeedbackByNumberDocument = gql`
    query FeedbackByNumber($projectId: UUID!, $number: Int!, $userId: UUID) {
  postByProjectIdAndNumber(projectId: $projectId, number: $number) {
    ...Feedback
  }
}
    ${FeedbackFragmentDoc}`;
export const ObserverDocument = gql`
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
export const PostsDocument = gql`
    query Posts($projectId: UUID!, $after: Cursor, $pageSize: Int = 10, $orderBy: [PostOrderBy!] = CREATED_AT_DESC, $excludedStatuses: [String!], $search: String, $userId: UUID) {
  posts(
    after: $after
    first: $pageSize
    orderBy: $orderBy
    filter: {projectId: {equalTo: $projectId}, title: {includesInsensitive: $search}, or: [{statusTemplate: {displayName: {notIn: $excludedStatuses}}}, {statusTemplateId: {isNull: true}}]}
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
export const ProjectDocument = gql`
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
export const ProjectBySlugDocument = gql`
    query ProjectBySlug($slug: String!, $organizationId: UUID!) {
  projectBySlugAndOrganizationId(slug: $slug, organizationId: $organizationId) {
    rowId
    name
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
export const ProjectStatusesDocument = gql`
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
export const ProjectsDocument = gql`
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
export const RecentFeedbackDocument = gql`
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
export const RepliesDocument = gql`
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
export const StatusBreakdownDocument = gql`
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
export const UserDocument = gql`
    query User($identityProviderId: UUID!) {
  userByIdentityProviderId(identityProviderId: $identityProviderId) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const UserByEmailDocument = gql`
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
export const WorkspaceDocument = gql`
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
export const WorkspaceMetricsDocument = gql`
    query WorkspaceMetrics($organizationId: UUID!) {
  projects(condition: {organizationId: $organizationId}) {
    totalCount
  }
  posts(filter: {project: {organizationId: {equalTo: $organizationId}}}) {
    totalCount
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateAttachment(variables: CreateAttachmentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateAttachmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAttachmentMutation>({ document: CreateAttachmentDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateAttachment', 'mutation', variables);
    },
    DeleteAttachment(variables: DeleteAttachmentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteAttachmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteAttachmentMutation>({ document: DeleteAttachmentDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteAttachment', 'mutation', variables);
    },
    CreateComment(variables: CreateCommentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCommentMutation>({ document: CreateCommentDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateComment', 'mutation', variables);
    },
    DeleteComment(variables: DeleteCommentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteCommentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCommentMutation>({ document: DeleteCommentDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteComment', 'mutation', variables);
    },
    CreateFeedback(variables: CreateFeedbackMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateFeedbackMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateFeedbackMutation>({ document: CreateFeedbackDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateFeedback', 'mutation', variables);
    },
    DeletePost(variables: DeletePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeletePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePostMutation>({ document: DeletePostDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeletePost', 'mutation', variables);
    },
    UpdatePost(variables: UpdatePostMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdatePostMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePostMutation>({ document: UpdatePostDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdatePost', 'mutation', variables);
    },
    CreateProject(variables: CreateProjectMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateProjectMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateProjectMutation>({ document: CreateProjectDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateProject', 'mutation', variables);
    },
    DeleteProject(variables: DeleteProjectMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteProjectMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteProjectMutation>({ document: DeleteProjectDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteProject', 'mutation', variables);
    },
    UpdateProject(variables: UpdateProjectMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateProjectMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProjectMutation>({ document: UpdateProjectDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateProject', 'mutation', variables);
    },
    CreateProjectLink(variables: CreateProjectLinkMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateProjectLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateProjectLinkMutation>({ document: CreateProjectLinkDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateProjectLink', 'mutation', variables);
    },
    DeleteProjectLink(variables: DeleteProjectLinkMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteProjectLinkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteProjectLinkMutation>({ document: DeleteProjectLinkDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteProjectLink', 'mutation', variables);
    },
    CreateProjectStatusConfig(variables: CreateProjectStatusConfigMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateProjectStatusConfigMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateProjectStatusConfigMutation>({ document: CreateProjectStatusConfigDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateProjectStatusConfig', 'mutation', variables);
    },
    DeleteProjectStatusConfig(variables: DeleteProjectStatusConfigMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteProjectStatusConfigMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteProjectStatusConfigMutation>({ document: DeleteProjectStatusConfigDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteProjectStatusConfig', 'mutation', variables);
    },
    UpdateProjectStatusConfig(variables: UpdateProjectStatusConfigMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateProjectStatusConfigMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProjectStatusConfigMutation>({ document: UpdateProjectStatusConfigDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateProjectStatusConfig', 'mutation', variables);
    },
    CreateStatusTemplate(variables: CreateStatusTemplateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateStatusTemplateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateStatusTemplateMutation>({ document: CreateStatusTemplateDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateStatusTemplate', 'mutation', variables);
    },
    DeleteStatusTemplate(variables: DeleteStatusTemplateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteStatusTemplateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteStatusTemplateMutation>({ document: DeleteStatusTemplateDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteStatusTemplate', 'mutation', variables);
    },
    UpdateStatusTemplate(variables: UpdateStatusTemplateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateStatusTemplateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateStatusTemplateMutation>({ document: UpdateStatusTemplateDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateStatusTemplate', 'mutation', variables);
    },
    CreateUser(variables: CreateUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>({ document: CreateUserDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateUser', 'mutation', variables);
    },
    CreateVote(variables: CreateVoteMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateVoteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateVoteMutation>({ document: CreateVoteDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateVote', 'mutation', variables);
    },
    DeleteVote(variables: DeleteVoteMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteVoteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteVoteMutation>({ document: DeleteVoteDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteVote', 'mutation', variables);
    },
    UpdateVote(variables: UpdateVoteMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateVoteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateVoteMutation>({ document: UpdateVoteDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateVote', 'mutation', variables);
    },
    Comments(variables: CommentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CommentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CommentsQuery>({ document: CommentsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Comments', 'query', variables);
    },
    FeedbackById(variables: FeedbackByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FeedbackByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FeedbackByIdQuery>({ document: FeedbackByIdDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'FeedbackById', 'query', variables);
    },
    FeedbackByNumber(variables: FeedbackByNumberQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<FeedbackByNumberQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FeedbackByNumberQuery>({ document: FeedbackByNumberDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'FeedbackByNumber', 'query', variables);
    },
    Observer(variables?: ObserverQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ObserverQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ObserverQuery>({ document: ObserverDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Observer', 'query', variables);
    },
    Posts(variables: PostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostsQuery>({ document: PostsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Posts', 'query', variables);
    },
    Project(variables: ProjectQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ProjectQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectQuery>({ document: ProjectDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Project', 'query', variables);
    },
    ProjectBySlug(variables: ProjectBySlugQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ProjectBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectBySlugQuery>({ document: ProjectBySlugDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ProjectBySlug', 'query', variables);
    },
    ProjectMetrics(variables: ProjectMetricsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ProjectMetricsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectMetricsQuery>({ document: ProjectMetricsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ProjectMetrics', 'query', variables);
    },
    ProjectStatuses(variables: ProjectStatusesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ProjectStatusesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectStatusesQuery>({ document: ProjectStatusesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ProjectStatuses', 'query', variables);
    },
    Projects(variables: ProjectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ProjectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectsQuery>({ document: ProjectsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Projects', 'query', variables);
    },
    RecentFeedback(variables?: RecentFeedbackQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RecentFeedbackQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RecentFeedbackQuery>({ document: RecentFeedbackDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RecentFeedback', 'query', variables);
    },
    Replies(variables: RepliesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RepliesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RepliesQuery>({ document: RepliesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Replies', 'query', variables);
    },
    StatusBreakdown(variables: StatusBreakdownQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<StatusBreakdownQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StatusBreakdownQuery>({ document: StatusBreakdownDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'StatusBreakdown', 'query', variables);
    },
    User(variables: UserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserQuery>({ document: UserDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'User', 'query', variables);
    },
    userByEmail(variables: UserByEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UserByEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserByEmailQuery>({ document: UserByEmailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'userByEmail', 'query', variables);
    },
    Workspace(variables: WorkspaceQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<WorkspaceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WorkspaceQuery>({ document: WorkspaceDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Workspace', 'query', variables);
    },
    WorkspaceMetrics(variables: WorkspaceMetricsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<WorkspaceMetricsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WorkspaceMetricsQuery>({ document: WorkspaceMetricsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'WorkspaceMetrics', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;