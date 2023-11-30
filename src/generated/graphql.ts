// @ts-nocheck
import { useQuery, useInfiniteQuery, useMutation, UseQueryOptions, UseInfiniteQueryOptions, UseMutationOptions } from '@tanstack/react-query';
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
  DateTime: { input: any; output: any; }
};

export enum TransactionIsolationLevel {
  ReadUncommitted = 'ReadUncommitted',
  ReadCommitted = 'ReadCommitted',
  RepeatableRead = 'RepeatableRead',
  Serializable = 'Serializable'
}

export enum UserScalarFieldEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  WalletAddress = 'walletAddress'
}

export enum OrganizationScalarFieldEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Name = 'name',
  Slug = 'slug'
}

export enum ProjectScalarFieldEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Name = 'name',
  Slug = 'slug',
  Image = 'image',
  Description = 'description',
  OrganizationId = 'organizationId'
}

export enum PostScalarFieldEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Title = 'title',
  Description = 'description',
  AuthorId = 'authorId',
  ProjectId = 'projectId'
}

export enum UpvoteScalarFieldEnum {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  PostId = 'postId',
  UserId = 'userId'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum NullsOrder {
  First = 'first',
  Last = 'last'
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  id?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  walletAddress?: InputMaybe<StringFilter>;
  Upvote?: InputMaybe<UpvoteListRelationFilter>;
  Post?: InputMaybe<PostListRelationFilter>;
};

export type UserOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  walletAddress?: InputMaybe<SortOrder>;
  Upvote?: InputMaybe<UpvoteOrderByRelationAggregateInput>;
  Post?: InputMaybe<PostOrderByRelationAggregateInput>;
};

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export type UserOrderByWithAggregationInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  walletAddress?: InputMaybe<SortOrder>;
  _count?: InputMaybe<UserCountOrderByAggregateInput>;
  _max?: InputMaybe<UserMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserMinOrderByAggregateInput>;
};

export type UserScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  walletAddress?: InputMaybe<StringWithAggregatesFilter>;
};

export type OrganizationWhereInput = {
  AND?: InputMaybe<Array<OrganizationWhereInput>>;
  OR?: InputMaybe<Array<OrganizationWhereInput>>;
  NOT?: InputMaybe<Array<OrganizationWhereInput>>;
  id?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  projects?: InputMaybe<ProjectListRelationFilter>;
};

export type OrganizationOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  projects?: InputMaybe<ProjectOrderByRelationAggregateInput>;
};

export type OrganizationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type OrganizationOrderByWithAggregationInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  _count?: InputMaybe<OrganizationCountOrderByAggregateInput>;
  _max?: InputMaybe<OrganizationMaxOrderByAggregateInput>;
  _min?: InputMaybe<OrganizationMinOrderByAggregateInput>;
};

export type OrganizationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<OrganizationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<OrganizationScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<OrganizationScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  slug?: InputMaybe<StringWithAggregatesFilter>;
};

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  id?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  image?: InputMaybe<StringNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  organizationId?: InputMaybe<StringFilter>;
  organization?: InputMaybe<OrganizationWhereInput>;
  posts?: InputMaybe<PostListRelationFilter>;
};

export type ProjectOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
  organization?: InputMaybe<OrganizationOrderByWithRelationInput>;
  posts?: InputMaybe<PostOrderByRelationAggregateInput>;
};

export type ProjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectOrderByWithAggregationInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
  _count?: InputMaybe<ProjectCountOrderByAggregateInput>;
  _max?: InputMaybe<ProjectMaxOrderByAggregateInput>;
  _min?: InputMaybe<ProjectMinOrderByAggregateInput>;
};

export type ProjectScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ProjectScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ProjectScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ProjectScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  slug?: InputMaybe<StringWithAggregatesFilter>;
  image?: InputMaybe<StringNullableWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  organizationId?: InputMaybe<StringWithAggregatesFilter>;
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>;
  OR?: InputMaybe<Array<PostWhereInput>>;
  NOT?: InputMaybe<Array<PostWhereInput>>;
  id?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  authorId?: InputMaybe<StringFilter>;
  projectId?: InputMaybe<StringFilter>;
  author?: InputMaybe<UserWhereInput>;
  project?: InputMaybe<ProjectWhereInput>;
  upvotes?: InputMaybe<UpvoteListRelationFilter>;
};

export type PostOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  authorId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  author?: InputMaybe<UserOrderByWithRelationInput>;
  project?: InputMaybe<ProjectOrderByWithRelationInput>;
  upvotes?: InputMaybe<UpvoteOrderByRelationAggregateInput>;
};

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type PostOrderByWithAggregationInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  authorId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
  _count?: InputMaybe<PostCountOrderByAggregateInput>;
  _max?: InputMaybe<PostMaxOrderByAggregateInput>;
  _min?: InputMaybe<PostMinOrderByAggregateInput>;
};

export type PostScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<PostScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<PostScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<PostScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  title?: InputMaybe<StringWithAggregatesFilter>;
  description?: InputMaybe<StringWithAggregatesFilter>;
  authorId?: InputMaybe<StringWithAggregatesFilter>;
  projectId?: InputMaybe<StringWithAggregatesFilter>;
};

export type UpvoteWhereInput = {
  AND?: InputMaybe<Array<UpvoteWhereInput>>;
  OR?: InputMaybe<Array<UpvoteWhereInput>>;
  NOT?: InputMaybe<Array<UpvoteWhereInput>>;
  id?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  postId?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
  post?: InputMaybe<PostWhereInput>;
  user?: InputMaybe<UserWhereInput>;
};

export type UpvoteOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  post?: InputMaybe<PostOrderByWithRelationInput>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
};

export type UpvoteWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type UpvoteOrderByWithAggregationInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
  _count?: InputMaybe<UpvoteCountOrderByAggregateInput>;
  _max?: InputMaybe<UpvoteMaxOrderByAggregateInput>;
  _min?: InputMaybe<UpvoteMinOrderByAggregateInput>;
};

export type UpvoteScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UpvoteScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UpvoteScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UpvoteScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  postId?: InputMaybe<StringWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type UserCreateInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  walletAddress: Scalars['String']['input'];
  Upvote?: InputMaybe<UpvoteCreateNestedManyWithoutUserInput>;
  Post?: InputMaybe<PostCreateNestedManyWithoutAuthorInput>;
};

export type UserUpdateInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  walletAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  Upvote?: InputMaybe<UpvoteUpdateManyWithoutUserNestedInput>;
  Post?: InputMaybe<PostUpdateManyWithoutAuthorNestedInput>;
};

export type UserCreateManyInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  walletAddress: Scalars['String']['input'];
};

export type UserUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  walletAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type OrganizationCreateInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  projects?: InputMaybe<ProjectCreateNestedManyWithoutOrganizationInput>;
};

export type OrganizationUpdateInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  slug?: InputMaybe<StringFieldUpdateOperationsInput>;
  projects?: InputMaybe<ProjectUpdateManyWithoutOrganizationNestedInput>;
};

export type OrganizationCreateManyInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type OrganizationUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  slug?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type ProjectCreateInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  organization: OrganizationCreateNestedOneWithoutProjectsInput;
  posts?: InputMaybe<PostCreateNestedManyWithoutProjectInput>;
};

export type ProjectUpdateInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  slug?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  organization?: InputMaybe<OrganizationUpdateOneRequiredWithoutProjectsNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutProjectNestedInput>;
};

export type ProjectCreateManyInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['String']['input'];
};

export type ProjectUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  slug?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type PostCreateInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  author: UserCreateNestedOneWithoutPostInput;
  project: ProjectCreateNestedOneWithoutPostsInput;
  upvotes?: InputMaybe<UpvoteCreateNestedManyWithoutPostInput>;
};

export type PostUpdateInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  author?: InputMaybe<UserUpdateOneRequiredWithoutPostNestedInput>;
  project?: InputMaybe<ProjectUpdateOneRequiredWithoutPostsNestedInput>;
  upvotes?: InputMaybe<UpvoteUpdateManyWithoutPostNestedInput>;
};

export type PostCreateManyInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  authorId: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};

export type PostUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UpvoteCreateInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  post: PostCreateNestedOneWithoutUpvotesInput;
  user: UserCreateNestedOneWithoutUpvoteInput;
};

export type UpvoteUpdateInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutUpvotesNestedInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutUpvoteNestedInput>;
};

export type UpvoteCreateManyInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  postId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UpvoteUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StringFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
};

export type UpvoteListRelationFilter = {
  every?: InputMaybe<UpvoteWhereInput>;
  some?: InputMaybe<UpvoteWhereInput>;
  none?: InputMaybe<UpvoteWhereInput>;
};

export type PostListRelationFilter = {
  every?: InputMaybe<PostWhereInput>;
  some?: InputMaybe<PostWhereInput>;
  none?: InputMaybe<PostWhereInput>;
};

export type UpvoteOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PostOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  walletAddress?: InputMaybe<SortOrder>;
};

export type UserMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  walletAddress?: InputMaybe<SortOrder>;
};

export type UserMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  walletAddress?: InputMaybe<SortOrder>;
};

export type StringWithAggregatesFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  _max?: InputMaybe<NestedStringFilter>;
};

export type DateTimeWithAggregatesFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
};

export type ProjectListRelationFilter = {
  every?: InputMaybe<ProjectWhereInput>;
  some?: InputMaybe<ProjectWhereInput>;
  none?: InputMaybe<ProjectWhereInput>;
};

export type ProjectOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type OrganizationCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
};

export type OrganizationMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
};

export type OrganizationMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
};

export type StringNullableFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
};

export type OrganizationRelationFilter = {
  is?: InputMaybe<OrganizationWhereInput>;
  isNot?: InputMaybe<OrganizationWhereInput>;
};

export type ProjectCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
};

export type ProjectMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
};

export type ProjectMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  organizationId?: InputMaybe<SortOrder>;
};

export type StringNullableWithAggregatesFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type ProjectRelationFilter = {
  is?: InputMaybe<ProjectWhereInput>;
  isNot?: InputMaybe<ProjectWhereInput>;
};

export type PostCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  authorId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
};

export type PostMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  authorId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
};

export type PostMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  authorId?: InputMaybe<SortOrder>;
  projectId?: InputMaybe<SortOrder>;
};

export type PostRelationFilter = {
  is?: InputMaybe<PostWhereInput>;
  isNot?: InputMaybe<PostWhereInput>;
};

export type UpvoteCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type UpvoteMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type UpvoteMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export type UpvoteCreateNestedManyWithoutUserInput = {
  create?: InputMaybe<Array<UpvoteCreateWithoutUserInput>>;
  connectOrCreate?: InputMaybe<Array<UpvoteCreateOrConnectWithoutUserInput>>;
  createMany?: InputMaybe<UpvoteCreateManyUserInputEnvelope>;
  connect?: InputMaybe<Array<UpvoteWhereUniqueInput>>;
};

export type PostCreateNestedManyWithoutAuthorInput = {
  create?: InputMaybe<Array<PostCreateWithoutAuthorInput>>;
  connectOrCreate?: InputMaybe<Array<PostCreateOrConnectWithoutAuthorInput>>;
  createMany?: InputMaybe<PostCreateManyAuthorInputEnvelope>;
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpvoteUpdateManyWithoutUserNestedInput = {
  create?: InputMaybe<Array<UpvoteCreateWithoutUserInput>>;
  connectOrCreate?: InputMaybe<Array<UpvoteCreateOrConnectWithoutUserInput>>;
  upsert?: InputMaybe<Array<UpvoteUpsertWithWhereUniqueWithoutUserInput>>;
  createMany?: InputMaybe<UpvoteCreateManyUserInputEnvelope>;
  set?: InputMaybe<Array<UpvoteWhereUniqueInput>>;
  disconnect?: InputMaybe<Array<UpvoteWhereUniqueInput>>;
  delete?: InputMaybe<Array<UpvoteWhereUniqueInput>>;
  connect?: InputMaybe<Array<UpvoteWhereUniqueInput>>;
  update?: InputMaybe<Array<UpvoteUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<UpvoteUpdateManyWithWhereWithoutUserInput>>;
  deleteMany?: InputMaybe<Array<UpvoteScalarWhereInput>>;
};

export type PostUpdateManyWithoutAuthorNestedInput = {
  create?: InputMaybe<Array<PostCreateWithoutAuthorInput>>;
  connectOrCreate?: InputMaybe<Array<PostCreateOrConnectWithoutAuthorInput>>;
  upsert?: InputMaybe<Array<PostUpsertWithWhereUniqueWithoutAuthorInput>>;
  createMany?: InputMaybe<PostCreateManyAuthorInputEnvelope>;
  set?: InputMaybe<Array<PostWhereUniqueInput>>;
  disconnect?: InputMaybe<Array<PostWhereUniqueInput>>;
  delete?: InputMaybe<Array<PostWhereUniqueInput>>;
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  update?: InputMaybe<Array<PostUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: InputMaybe<Array<PostUpdateManyWithWhereWithoutAuthorInput>>;
  deleteMany?: InputMaybe<Array<PostScalarWhereInput>>;
};

export type ProjectCreateNestedManyWithoutOrganizationInput = {
  create?: InputMaybe<Array<ProjectCreateWithoutOrganizationInput>>;
  connectOrCreate?: InputMaybe<Array<ProjectCreateOrConnectWithoutOrganizationInput>>;
  createMany?: InputMaybe<ProjectCreateManyOrganizationInputEnvelope>;
  connect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
};

export type ProjectUpdateManyWithoutOrganizationNestedInput = {
  create?: InputMaybe<Array<ProjectCreateWithoutOrganizationInput>>;
  connectOrCreate?: InputMaybe<Array<ProjectCreateOrConnectWithoutOrganizationInput>>;
  upsert?: InputMaybe<Array<ProjectUpsertWithWhereUniqueWithoutOrganizationInput>>;
  createMany?: InputMaybe<ProjectCreateManyOrganizationInputEnvelope>;
  set?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  disconnect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  delete?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  connect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  update?: InputMaybe<Array<ProjectUpdateWithWhereUniqueWithoutOrganizationInput>>;
  updateMany?: InputMaybe<Array<ProjectUpdateManyWithWhereWithoutOrganizationInput>>;
  deleteMany?: InputMaybe<Array<ProjectScalarWhereInput>>;
};

export type OrganizationCreateNestedOneWithoutProjectsInput = {
  create?: InputMaybe<OrganizationCreateWithoutProjectsInput>;
  connectOrCreate?: InputMaybe<OrganizationCreateOrConnectWithoutProjectsInput>;
  connect?: InputMaybe<OrganizationWhereUniqueInput>;
};

export type PostCreateNestedManyWithoutProjectInput = {
  create?: InputMaybe<Array<PostCreateWithoutProjectInput>>;
  connectOrCreate?: InputMaybe<Array<PostCreateOrConnectWithoutProjectInput>>;
  createMany?: InputMaybe<PostCreateManyProjectInputEnvelope>;
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type OrganizationUpdateOneRequiredWithoutProjectsNestedInput = {
  create?: InputMaybe<OrganizationCreateWithoutProjectsInput>;
  connectOrCreate?: InputMaybe<OrganizationCreateOrConnectWithoutProjectsInput>;
  upsert?: InputMaybe<OrganizationUpsertWithoutProjectsInput>;
  connect?: InputMaybe<OrganizationWhereUniqueInput>;
  update?: InputMaybe<OrganizationUpdateWithoutProjectsInput>;
};

export type PostUpdateManyWithoutProjectNestedInput = {
  create?: InputMaybe<Array<PostCreateWithoutProjectInput>>;
  connectOrCreate?: InputMaybe<Array<PostCreateOrConnectWithoutProjectInput>>;
  upsert?: InputMaybe<Array<PostUpsertWithWhereUniqueWithoutProjectInput>>;
  createMany?: InputMaybe<PostCreateManyProjectInputEnvelope>;
  set?: InputMaybe<Array<PostWhereUniqueInput>>;
  disconnect?: InputMaybe<Array<PostWhereUniqueInput>>;
  delete?: InputMaybe<Array<PostWhereUniqueInput>>;
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  update?: InputMaybe<Array<PostUpdateWithWhereUniqueWithoutProjectInput>>;
  updateMany?: InputMaybe<Array<PostUpdateManyWithWhereWithoutProjectInput>>;
  deleteMany?: InputMaybe<Array<PostScalarWhereInput>>;
};

export type UserCreateNestedOneWithoutPostInput = {
  create?: InputMaybe<UserCreateWithoutPostInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostInput>;
  connect?: InputMaybe<UserWhereUniqueInput>;
};

export type ProjectCreateNestedOneWithoutPostsInput = {
  create?: InputMaybe<ProjectCreateWithoutPostsInput>;
  connectOrCreate?: InputMaybe<ProjectCreateOrConnectWithoutPostsInput>;
  connect?: InputMaybe<ProjectWhereUniqueInput>;
};

export type UpvoteCreateNestedManyWithoutPostInput = {
  create?: InputMaybe<Array<UpvoteCreateWithoutPostInput>>;
  connectOrCreate?: InputMaybe<Array<UpvoteCreateOrConnectWithoutPostInput>>;
  createMany?: InputMaybe<UpvoteCreateManyPostInputEnvelope>;
  connect?: InputMaybe<Array<UpvoteWhereUniqueInput>>;
};

export type UserUpdateOneRequiredWithoutPostNestedInput = {
  create?: InputMaybe<UserCreateWithoutPostInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostInput>;
  upsert?: InputMaybe<UserUpsertWithoutPostInput>;
  connect?: InputMaybe<UserWhereUniqueInput>;
  update?: InputMaybe<UserUpdateWithoutPostInput>;
};

export type ProjectUpdateOneRequiredWithoutPostsNestedInput = {
  create?: InputMaybe<ProjectCreateWithoutPostsInput>;
  connectOrCreate?: InputMaybe<ProjectCreateOrConnectWithoutPostsInput>;
  upsert?: InputMaybe<ProjectUpsertWithoutPostsInput>;
  connect?: InputMaybe<ProjectWhereUniqueInput>;
  update?: InputMaybe<ProjectUpdateWithoutPostsInput>;
};

export type UpvoteUpdateManyWithoutPostNestedInput = {
  create?: InputMaybe<Array<UpvoteCreateWithoutPostInput>>;
  connectOrCreate?: InputMaybe<Array<UpvoteCreateOrConnectWithoutPostInput>>;
  upsert?: InputMaybe<Array<UpvoteUpsertWithWhereUniqueWithoutPostInput>>;
  createMany?: InputMaybe<UpvoteCreateManyPostInputEnvelope>;
  set?: InputMaybe<Array<UpvoteWhereUniqueInput>>;
  disconnect?: InputMaybe<Array<UpvoteWhereUniqueInput>>;
  delete?: InputMaybe<Array<UpvoteWhereUniqueInput>>;
  connect?: InputMaybe<Array<UpvoteWhereUniqueInput>>;
  update?: InputMaybe<Array<UpvoteUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<UpvoteUpdateManyWithWhereWithoutPostInput>>;
  deleteMany?: InputMaybe<Array<UpvoteScalarWhereInput>>;
};

export type PostCreateNestedOneWithoutUpvotesInput = {
  create?: InputMaybe<PostCreateWithoutUpvotesInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutUpvotesInput>;
  connect?: InputMaybe<PostWhereUniqueInput>;
};

export type UserCreateNestedOneWithoutUpvoteInput = {
  create?: InputMaybe<UserCreateWithoutUpvoteInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUpvoteInput>;
  connect?: InputMaybe<UserWhereUniqueInput>;
};

export type PostUpdateOneRequiredWithoutUpvotesNestedInput = {
  create?: InputMaybe<PostCreateWithoutUpvotesInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutUpvotesInput>;
  upsert?: InputMaybe<PostUpsertWithoutUpvotesInput>;
  connect?: InputMaybe<PostWhereUniqueInput>;
  update?: InputMaybe<PostUpdateWithoutUpvotesInput>;
};

export type UserUpdateOneRequiredWithoutUpvoteNestedInput = {
  create?: InputMaybe<UserCreateWithoutUpvoteInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutUpvoteInput>;
  upsert?: InputMaybe<UserUpsertWithoutUpvoteInput>;
  connect?: InputMaybe<UserWhereUniqueInput>;
  update?: InputMaybe<UserUpdateWithoutUpvoteInput>;
};

export type NestedStringFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
};

export type NestedStringWithAggregatesFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  _max?: InputMaybe<NestedStringFilter>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
};

export type NestedDateTimeWithAggregatesFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
};

export type NestedStringNullableFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
};

export type NestedStringNullableWithAggregatesFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  contains?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
};

export type UpvoteCreateWithoutUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  post: PostCreateNestedOneWithoutUpvotesInput;
};

export type UpvoteCreateOrConnectWithoutUserInput = {
  where: UpvoteWhereUniqueInput;
  create: UpvoteCreateWithoutUserInput;
};

export type UpvoteCreateManyUserInputEnvelope = {
  data: Array<UpvoteCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostCreateWithoutAuthorInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  project: ProjectCreateNestedOneWithoutPostsInput;
  upvotes?: InputMaybe<UpvoteCreateNestedManyWithoutPostInput>;
};

export type PostCreateOrConnectWithoutAuthorInput = {
  where: PostWhereUniqueInput;
  create: PostCreateWithoutAuthorInput;
};

export type PostCreateManyAuthorInputEnvelope = {
  data: Array<PostCreateManyAuthorInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpvoteUpsertWithWhereUniqueWithoutUserInput = {
  where: UpvoteWhereUniqueInput;
  update: UpvoteUpdateWithoutUserInput;
  create: UpvoteCreateWithoutUserInput;
};

export type UpvoteUpdateWithWhereUniqueWithoutUserInput = {
  where: UpvoteWhereUniqueInput;
  data: UpvoteUpdateWithoutUserInput;
};

export type UpvoteUpdateManyWithWhereWithoutUserInput = {
  where: UpvoteScalarWhereInput;
  data: UpvoteUpdateManyMutationInput;
};

export type UpvoteScalarWhereInput = {
  AND?: InputMaybe<Array<UpvoteScalarWhereInput>>;
  OR?: InputMaybe<Array<UpvoteScalarWhereInput>>;
  NOT?: InputMaybe<Array<UpvoteScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  postId?: InputMaybe<StringFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput;
  update: PostUpdateWithoutAuthorInput;
  create: PostCreateWithoutAuthorInput;
};

export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput;
  data: PostUpdateWithoutAuthorInput;
};

export type PostUpdateManyWithWhereWithoutAuthorInput = {
  where: PostScalarWhereInput;
  data: PostUpdateManyMutationInput;
};

export type PostScalarWhereInput = {
  AND?: InputMaybe<Array<PostScalarWhereInput>>;
  OR?: InputMaybe<Array<PostScalarWhereInput>>;
  NOT?: InputMaybe<Array<PostScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  authorId?: InputMaybe<StringFilter>;
  projectId?: InputMaybe<StringFilter>;
};

export type ProjectCreateWithoutOrganizationInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<PostCreateNestedManyWithoutProjectInput>;
};

export type ProjectCreateOrConnectWithoutOrganizationInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutOrganizationInput;
};

export type ProjectCreateManyOrganizationInputEnvelope = {
  data: Array<ProjectCreateManyOrganizationInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectUpsertWithWhereUniqueWithoutOrganizationInput = {
  where: ProjectWhereUniqueInput;
  update: ProjectUpdateWithoutOrganizationInput;
  create: ProjectCreateWithoutOrganizationInput;
};

export type ProjectUpdateWithWhereUniqueWithoutOrganizationInput = {
  where: ProjectWhereUniqueInput;
  data: ProjectUpdateWithoutOrganizationInput;
};

export type ProjectUpdateManyWithWhereWithoutOrganizationInput = {
  where: ProjectScalarWhereInput;
  data: ProjectUpdateManyMutationInput;
};

export type ProjectScalarWhereInput = {
  AND?: InputMaybe<Array<ProjectScalarWhereInput>>;
  OR?: InputMaybe<Array<ProjectScalarWhereInput>>;
  NOT?: InputMaybe<Array<ProjectScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  name?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
  image?: InputMaybe<StringNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  organizationId?: InputMaybe<StringFilter>;
};

export type OrganizationCreateWithoutProjectsInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type OrganizationCreateOrConnectWithoutProjectsInput = {
  where: OrganizationWhereUniqueInput;
  create: OrganizationCreateWithoutProjectsInput;
};

export type PostCreateWithoutProjectInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  author: UserCreateNestedOneWithoutPostInput;
  upvotes?: InputMaybe<UpvoteCreateNestedManyWithoutPostInput>;
};

export type PostCreateOrConnectWithoutProjectInput = {
  where: PostWhereUniqueInput;
  create: PostCreateWithoutProjectInput;
};

export type PostCreateManyProjectInputEnvelope = {
  data: Array<PostCreateManyProjectInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrganizationUpsertWithoutProjectsInput = {
  update: OrganizationUpdateWithoutProjectsInput;
  create: OrganizationCreateWithoutProjectsInput;
};

export type OrganizationUpdateWithoutProjectsInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  slug?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PostUpsertWithWhereUniqueWithoutProjectInput = {
  where: PostWhereUniqueInput;
  update: PostUpdateWithoutProjectInput;
  create: PostCreateWithoutProjectInput;
};

export type PostUpdateWithWhereUniqueWithoutProjectInput = {
  where: PostWhereUniqueInput;
  data: PostUpdateWithoutProjectInput;
};

export type PostUpdateManyWithWhereWithoutProjectInput = {
  where: PostScalarWhereInput;
  data: PostUpdateManyMutationInput;
};

export type UserCreateWithoutPostInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  walletAddress: Scalars['String']['input'];
  Upvote?: InputMaybe<UpvoteCreateNestedManyWithoutUserInput>;
};

export type UserCreateOrConnectWithoutPostInput = {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutPostInput;
};

export type ProjectCreateWithoutPostsInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  organization: OrganizationCreateNestedOneWithoutProjectsInput;
};

export type ProjectCreateOrConnectWithoutPostsInput = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateWithoutPostsInput;
};

export type UpvoteCreateWithoutPostInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutUpvoteInput;
};

export type UpvoteCreateOrConnectWithoutPostInput = {
  where: UpvoteWhereUniqueInput;
  create: UpvoteCreateWithoutPostInput;
};

export type UpvoteCreateManyPostInputEnvelope = {
  data: Array<UpvoteCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserUpsertWithoutPostInput = {
  update: UserUpdateWithoutPostInput;
  create: UserCreateWithoutPostInput;
};

export type UserUpdateWithoutPostInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  walletAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  Upvote?: InputMaybe<UpvoteUpdateManyWithoutUserNestedInput>;
};

export type ProjectUpsertWithoutPostsInput = {
  update: ProjectUpdateWithoutPostsInput;
  create: ProjectCreateWithoutPostsInput;
};

export type ProjectUpdateWithoutPostsInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  slug?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  organization?: InputMaybe<OrganizationUpdateOneRequiredWithoutProjectsNestedInput>;
};

export type UpvoteUpsertWithWhereUniqueWithoutPostInput = {
  where: UpvoteWhereUniqueInput;
  update: UpvoteUpdateWithoutPostInput;
  create: UpvoteCreateWithoutPostInput;
};

export type UpvoteUpdateWithWhereUniqueWithoutPostInput = {
  where: UpvoteWhereUniqueInput;
  data: UpvoteUpdateWithoutPostInput;
};

export type UpvoteUpdateManyWithWhereWithoutPostInput = {
  where: UpvoteScalarWhereInput;
  data: UpvoteUpdateManyMutationInput;
};

export type PostCreateWithoutUpvotesInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  author: UserCreateNestedOneWithoutPostInput;
  project: ProjectCreateNestedOneWithoutPostsInput;
};

export type PostCreateOrConnectWithoutUpvotesInput = {
  where: PostWhereUniqueInput;
  create: PostCreateWithoutUpvotesInput;
};

export type UserCreateWithoutUpvoteInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  walletAddress: Scalars['String']['input'];
  Post?: InputMaybe<PostCreateNestedManyWithoutAuthorInput>;
};

export type UserCreateOrConnectWithoutUpvoteInput = {
  where: UserWhereUniqueInput;
  create: UserCreateWithoutUpvoteInput;
};

export type PostUpsertWithoutUpvotesInput = {
  update: PostUpdateWithoutUpvotesInput;
  create: PostCreateWithoutUpvotesInput;
};

export type PostUpdateWithoutUpvotesInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  author?: InputMaybe<UserUpdateOneRequiredWithoutPostNestedInput>;
  project?: InputMaybe<ProjectUpdateOneRequiredWithoutPostsNestedInput>;
};

export type UserUpsertWithoutUpvoteInput = {
  update: UserUpdateWithoutUpvoteInput;
  create: UserCreateWithoutUpvoteInput;
};

export type UserUpdateWithoutUpvoteInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  walletAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  Post?: InputMaybe<PostUpdateManyWithoutAuthorNestedInput>;
};

export type UpvoteCreateManyUserInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  postId: Scalars['String']['input'];
};

export type PostCreateManyAuthorInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};

export type UpvoteUpdateWithoutUserInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutUpvotesNestedInput>;
};

export type PostUpdateWithoutAuthorInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  project?: InputMaybe<ProjectUpdateOneRequiredWithoutPostsNestedInput>;
  upvotes?: InputMaybe<UpvoteUpdateManyWithoutPostNestedInput>;
};

export type ProjectCreateManyOrganizationInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectUpdateWithoutOrganizationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  slug?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUpdateManyWithoutProjectNestedInput>;
};

export type PostCreateManyProjectInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  authorId: Scalars['String']['input'];
};

export type PostUpdateWithoutProjectInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  author?: InputMaybe<UserUpdateOneRequiredWithoutPostNestedInput>;
  upvotes?: InputMaybe<UpvoteUpdateManyWithoutPostNestedInput>;
};

export type UpvoteCreateManyPostInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['String']['input'];
};

export type UpvoteUpdateWithoutPostInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutUpvoteNestedInput>;
};

/** Batch payloads from prisma. */
export type BatchPayload = {
  __typename?: 'BatchPayload';
  /** Prisma Batch Payload */
  count: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  walletAddress: Scalars['String']['output'];
  Upvote: Array<Upvote>;
  Post: Array<Post>;
};


export type UserUpvoteArgs = {
  where?: InputMaybe<UpvoteWhereInput>;
  orderBy?: InputMaybe<Array<UpvoteOrderByWithRelationInput>>;
  cursor?: InputMaybe<UpvoteWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<UpvoteScalarFieldEnum>>;
};


export type UserPostArgs = {
  where?: InputMaybe<PostWhereInput>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput>>;
  cursor?: InputMaybe<PostWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<PostScalarFieldEnum>>;
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  projects: Array<Project>;
};


export type OrganizationProjectsArgs = {
  where?: InputMaybe<ProjectWhereInput>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>;
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  organization: Organization;
  organizationId: Scalars['String']['output'];
  posts: Array<Post>;
};


export type ProjectPostsArgs = {
  where?: InputMaybe<PostWhereInput>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput>>;
  cursor?: InputMaybe<PostWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<PostScalarFieldEnum>>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  description: Scalars['String']['output'];
  authorId: Scalars['String']['output'];
  author: User;
  projectId: Scalars['String']['output'];
  project: Project;
  upvotes: Array<Upvote>;
};


export type PostUpvotesArgs = {
  where?: InputMaybe<UpvoteWhereInput>;
  orderBy?: InputMaybe<Array<UpvoteOrderByWithRelationInput>>;
  cursor?: InputMaybe<UpvoteWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<UpvoteScalarFieldEnum>>;
};

export type Upvote = {
  __typename?: 'Upvote';
  id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  postId: Scalars['String']['output'];
  post: Post;
  userId: Scalars['String']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  findFirstUser?: Maybe<User>;
  findManyUser: Array<User>;
  countUser: Scalars['Int']['output'];
  findUniqueUser?: Maybe<User>;
  findFirstOrganization?: Maybe<Organization>;
  findManyOrganization: Array<Organization>;
  countOrganization: Scalars['Int']['output'];
  findUniqueOrganization?: Maybe<Organization>;
  findFirstProject?: Maybe<Project>;
  findManyProject: Array<Project>;
  countProject: Scalars['Int']['output'];
  findUniqueProject?: Maybe<Project>;
  findFirstPost?: Maybe<Post>;
  findManyPost: Array<Post>;
  countPost: Scalars['Int']['output'];
  findUniquePost?: Maybe<Post>;
  findFirstUpvote?: Maybe<Upvote>;
  findManyUpvote: Array<Upvote>;
  countUpvote: Scalars['Int']['output'];
  findUniqueUpvote?: Maybe<Upvote>;
};


export type QueryFindFirstUserArgs = {
  where?: InputMaybe<UserWhereInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  cursor?: InputMaybe<UserWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
};


export type QueryFindManyUserArgs = {
  where?: InputMaybe<UserWhereInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  cursor?: InputMaybe<UserWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
};


export type QueryCountUserArgs = {
  where?: InputMaybe<UserWhereInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  cursor?: InputMaybe<UserWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
};


export type QueryFindUniqueUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryFindFirstOrganizationArgs = {
  where?: InputMaybe<OrganizationWhereInput>;
  orderBy?: InputMaybe<Array<OrganizationOrderByWithRelationInput>>;
  cursor?: InputMaybe<OrganizationWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<OrganizationScalarFieldEnum>>;
};


export type QueryFindManyOrganizationArgs = {
  where?: InputMaybe<OrganizationWhereInput>;
  orderBy?: InputMaybe<Array<OrganizationOrderByWithRelationInput>>;
  cursor?: InputMaybe<OrganizationWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<OrganizationScalarFieldEnum>>;
};


export type QueryCountOrganizationArgs = {
  where?: InputMaybe<OrganizationWhereInput>;
  orderBy?: InputMaybe<Array<OrganizationOrderByWithRelationInput>>;
  cursor?: InputMaybe<OrganizationWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<OrganizationScalarFieldEnum>>;
};


export type QueryFindUniqueOrganizationArgs = {
  where: OrganizationWhereUniqueInput;
};


export type QueryFindFirstProjectArgs = {
  where?: InputMaybe<ProjectWhereInput>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>;
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>;
};


export type QueryFindManyProjectArgs = {
  where?: InputMaybe<ProjectWhereInput>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>;
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>;
};


export type QueryCountProjectArgs = {
  where?: InputMaybe<ProjectWhereInput>;
  orderBy?: InputMaybe<Array<ProjectOrderByWithRelationInput>>;
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<ProjectScalarFieldEnum>>;
};


export type QueryFindUniqueProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type QueryFindFirstPostArgs = {
  where?: InputMaybe<PostWhereInput>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput>>;
  cursor?: InputMaybe<PostWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<PostScalarFieldEnum>>;
};


export type QueryFindManyPostArgs = {
  where?: InputMaybe<PostWhereInput>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput>>;
  cursor?: InputMaybe<PostWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<PostScalarFieldEnum>>;
};


export type QueryCountPostArgs = {
  where?: InputMaybe<PostWhereInput>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput>>;
  cursor?: InputMaybe<PostWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<PostScalarFieldEnum>>;
};


export type QueryFindUniquePostArgs = {
  where: PostWhereUniqueInput;
};


export type QueryFindFirstUpvoteArgs = {
  where?: InputMaybe<UpvoteWhereInput>;
  orderBy?: InputMaybe<Array<UpvoteOrderByWithRelationInput>>;
  cursor?: InputMaybe<UpvoteWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<UpvoteScalarFieldEnum>>;
};


export type QueryFindManyUpvoteArgs = {
  where?: InputMaybe<UpvoteWhereInput>;
  orderBy?: InputMaybe<Array<UpvoteOrderByWithRelationInput>>;
  cursor?: InputMaybe<UpvoteWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<UpvoteScalarFieldEnum>>;
};


export type QueryCountUpvoteArgs = {
  where?: InputMaybe<UpvoteWhereInput>;
  orderBy?: InputMaybe<Array<UpvoteOrderByWithRelationInput>>;
  cursor?: InputMaybe<UpvoteWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  distinct?: InputMaybe<Array<UpvoteScalarFieldEnum>>;
};


export type QueryFindUniqueUpvoteArgs = {
  where: UpvoteWhereUniqueInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyUser: Array<User>;
  createOneUser: User;
  deleteManyUser?: Maybe<BatchPayload>;
  deleteOneUser?: Maybe<User>;
  updateManyUser: BatchPayload;
  updateOneUser?: Maybe<User>;
  upsertOneUser: User;
  createManyOrganization: Array<Organization>;
  createOneOrganization: Organization;
  deleteManyOrganization?: Maybe<BatchPayload>;
  deleteOneOrganization?: Maybe<Organization>;
  updateManyOrganization: BatchPayload;
  updateOneOrganization?: Maybe<Organization>;
  upsertOneOrganization: Organization;
  createManyProject: Array<Project>;
  createOneProject: Project;
  deleteManyProject?: Maybe<BatchPayload>;
  deleteOneProject?: Maybe<Project>;
  updateManyProject: BatchPayload;
  updateOneProject?: Maybe<Project>;
  upsertOneProject: Project;
  createManyPost: Array<Post>;
  createOnePost: Post;
  deleteManyPost?: Maybe<BatchPayload>;
  deleteOnePost?: Maybe<Post>;
  updateManyPost: BatchPayload;
  updateOnePost?: Maybe<Post>;
  upsertOnePost: Post;
  createManyUpvote: Array<Upvote>;
  createOneUpvote: Upvote;
  deleteManyUpvote?: Maybe<BatchPayload>;
  deleteOneUpvote?: Maybe<Upvote>;
  updateManyUpvote: BatchPayload;
  updateOneUpvote?: Maybe<Upvote>;
  upsertOneUpvote: Upvote;
};


export type MutationCreateManyUserArgs = {
  data: Array<UserCreateInput>;
};


export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteManyUserArgs = {
  where: UserWhereInput;
};


export type MutationDeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationUpdateManyUserArgs = {
  where?: InputMaybe<UserWhereInput>;
  data: UserUpdateManyMutationInput;
};


export type MutationUpdateOneUserArgs = {
  where: UserWhereUniqueInput;
  data: UserUpdateInput;
};


export type MutationUpsertOneUserArgs = {
  where: UserWhereUniqueInput;
  create: UserCreateInput;
  update: UserUpdateInput;
};


export type MutationCreateManyOrganizationArgs = {
  data: Array<OrganizationCreateInput>;
};


export type MutationCreateOneOrganizationArgs = {
  data: OrganizationCreateInput;
};


export type MutationDeleteManyOrganizationArgs = {
  where: OrganizationWhereInput;
};


export type MutationDeleteOneOrganizationArgs = {
  where: OrganizationWhereUniqueInput;
};


export type MutationUpdateManyOrganizationArgs = {
  where?: InputMaybe<OrganizationWhereInput>;
  data: OrganizationUpdateManyMutationInput;
};


export type MutationUpdateOneOrganizationArgs = {
  where: OrganizationWhereUniqueInput;
  data: OrganizationUpdateInput;
};


export type MutationUpsertOneOrganizationArgs = {
  where: OrganizationWhereUniqueInput;
  create: OrganizationCreateInput;
  update: OrganizationUpdateInput;
};


export type MutationCreateManyProjectArgs = {
  data: Array<ProjectCreateInput>;
};


export type MutationCreateOneProjectArgs = {
  data: ProjectCreateInput;
};


export type MutationDeleteManyProjectArgs = {
  where: ProjectWhereInput;
};


export type MutationDeleteOneProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type MutationUpdateManyProjectArgs = {
  where?: InputMaybe<ProjectWhereInput>;
  data: ProjectUpdateManyMutationInput;
};


export type MutationUpdateOneProjectArgs = {
  where: ProjectWhereUniqueInput;
  data: ProjectUpdateInput;
};


export type MutationUpsertOneProjectArgs = {
  where: ProjectWhereUniqueInput;
  create: ProjectCreateInput;
  update: ProjectUpdateInput;
};


export type MutationCreateManyPostArgs = {
  data: Array<PostCreateInput>;
};


export type MutationCreateOnePostArgs = {
  data: PostCreateInput;
};


export type MutationDeleteManyPostArgs = {
  where: PostWhereInput;
};


export type MutationDeleteOnePostArgs = {
  where: PostWhereUniqueInput;
};


export type MutationUpdateManyPostArgs = {
  where?: InputMaybe<PostWhereInput>;
  data: PostUpdateManyMutationInput;
};


export type MutationUpdateOnePostArgs = {
  where: PostWhereUniqueInput;
  data: PostUpdateInput;
};


export type MutationUpsertOnePostArgs = {
  where: PostWhereUniqueInput;
  create: PostCreateInput;
  update: PostUpdateInput;
};


export type MutationCreateManyUpvoteArgs = {
  data: Array<UpvoteCreateInput>;
};


export type MutationCreateOneUpvoteArgs = {
  data: UpvoteCreateInput;
};


export type MutationDeleteManyUpvoteArgs = {
  where: UpvoteWhereInput;
};


export type MutationDeleteOneUpvoteArgs = {
  where: UpvoteWhereUniqueInput;
};


export type MutationUpdateManyUpvoteArgs = {
  where?: InputMaybe<UpvoteWhereInput>;
  data: UpvoteUpdateManyMutationInput;
};


export type MutationUpdateOneUpvoteArgs = {
  where: UpvoteWhereUniqueInput;
  data: UpvoteUpdateInput;
};


export type MutationUpsertOneUpvoteArgs = {
  where: UpvoteWhereUniqueInput;
  create: UpvoteCreateInput;
  update: UpvoteUpdateInput;
};

export type OrganizationQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type OrganizationQuery = { __typename?: 'Query', findUniqueOrganization?: { __typename?: 'Organization', id: string, name: string, slug: string } | null };

export type PostsQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type PostsQuery = { __typename?: 'Query', findManyPost: Array<{ __typename?: 'Post', id: string, createdAt: any, title: string, description: string, author: { __typename?: 'User', walletAddress: string }, upvotes: Array<{ __typename?: 'Upvote', id: string }> }> };

export type ProjectQueryVariables = Exact<{
  organizationId?: InputMaybe<Scalars['String']['input']>;
  projectSlug: Scalars['String']['input'];
}>;


export type ProjectQuery = { __typename?: 'Query', findFirstProject?: { __typename?: 'Project', id: string, name: string, image?: string | null, description?: string | null } | null };

export type ProjectsQueryVariables = Exact<{
  organizationId?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', findManyProject: Array<{ __typename?: 'Project', id: string, name: string, description?: string | null, slug: string }> };

export type CreatePostMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  userAddress: Scalars['String']['input'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createOnePost: { __typename?: 'Post', title: string } };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deleteOnePost?: { __typename?: 'Post', id: string } | null };

export type DeleteUpvoteMutationVariables = Exact<{
  upvoteId: Scalars['String']['input'];
}>;


export type DeleteUpvoteMutation = { __typename?: 'Mutation', deleteOneUpvote?: { __typename?: 'Upvote', id: string } | null };

export type UpvotePostMutationVariables = Exact<{
  id: Scalars['String']['input'];
  postId: Scalars['String']['input'];
  userAddress: Scalars['String']['input'];
}>;


export type UpvotePostMutation = { __typename?: 'Mutation', upsertOneUpvote: { __typename?: 'Upvote', id: string } };



export const OrganizationDocument = `
    query Organization($slug: String!) {
  findUniqueOrganization(where: {slug: $slug}) {
    id
    name
    slug
  }
}
    `;

export const useOrganizationQuery = <
      TData = OrganizationQuery,
      TError = unknown
    >(
      variables: OrganizationQueryVariables,
      options?: UseQueryOptions<OrganizationQuery, TError, TData>
    ) => {
    
    return useQuery<OrganizationQuery, TError, TData>(
      ['Organization', variables],
      useGraphqlClient<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument).bind(null, variables),
      options
    )};

useOrganizationQuery.getKey = (variables: OrganizationQueryVariables) => ['Organization', variables];

export const useInfiniteOrganizationQuery = <
      TData = OrganizationQuery,
      TError = unknown
    >(
      variables: OrganizationQueryVariables,
      options?: UseInfiniteQueryOptions<OrganizationQuery, TError, TData>
    ) => {
    const query = useGraphqlClient<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument)
    return useInfiniteQuery<OrganizationQuery, TError, TData>(
      ['Organization.infinite', variables],
      (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      options
    )};

useInfiniteOrganizationQuery.getKey = (variables: OrganizationQueryVariables) => ['Organization.infinite', variables];

export const PostsDocument = `
    query Posts($projectId: String!) {
  findManyPost(where: {AND: {project: {id: {equals: $projectId}}}}) {
    id
    createdAt
    title
    description
    author {
      walletAddress
    }
    upvotes {
      id
    }
  }
}
    `;

export const usePostsQuery = <
      TData = PostsQuery,
      TError = unknown
    >(
      variables: PostsQueryVariables,
      options?: UseQueryOptions<PostsQuery, TError, TData>
    ) => {
    
    return useQuery<PostsQuery, TError, TData>(
      ['Posts', variables],
      useGraphqlClient<PostsQuery, PostsQueryVariables>(PostsDocument).bind(null, variables),
      options
    )};

usePostsQuery.getKey = (variables: PostsQueryVariables) => ['Posts', variables];

export const useInfinitePostsQuery = <
      TData = PostsQuery,
      TError = unknown
    >(
      variables: PostsQueryVariables,
      options?: UseInfiniteQueryOptions<PostsQuery, TError, TData>
    ) => {
    const query = useGraphqlClient<PostsQuery, PostsQueryVariables>(PostsDocument)
    return useInfiniteQuery<PostsQuery, TError, TData>(
      ['Posts.infinite', variables],
      (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      options
    )};

useInfinitePostsQuery.getKey = (variables: PostsQueryVariables) => ['Posts.infinite', variables];

export const ProjectDocument = `
    query Project($organizationId: String, $projectSlug: String!) {
  findFirstProject(
    where: {AND: {organizationId: {equals: $organizationId}, slug: {equals: $projectSlug}}}
  ) {
    id
    name
    image
    description
  }
}
    `;

export const useProjectQuery = <
      TData = ProjectQuery,
      TError = unknown
    >(
      variables: ProjectQueryVariables,
      options?: UseQueryOptions<ProjectQuery, TError, TData>
    ) => {
    
    return useQuery<ProjectQuery, TError, TData>(
      ['Project', variables],
      useGraphqlClient<ProjectQuery, ProjectQueryVariables>(ProjectDocument).bind(null, variables),
      options
    )};

useProjectQuery.getKey = (variables: ProjectQueryVariables) => ['Project', variables];

export const useInfiniteProjectQuery = <
      TData = ProjectQuery,
      TError = unknown
    >(
      variables: ProjectQueryVariables,
      options?: UseInfiniteQueryOptions<ProjectQuery, TError, TData>
    ) => {
    const query = useGraphqlClient<ProjectQuery, ProjectQueryVariables>(ProjectDocument)
    return useInfiniteQuery<ProjectQuery, TError, TData>(
      ['Project.infinite', variables],
      (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      options
    )};

useInfiniteProjectQuery.getKey = (variables: ProjectQueryVariables) => ['Project.infinite', variables];

export const ProjectsDocument = `
    query Projects($organizationId: String) {
  findManyProject(where: {organizationId: {equals: $organizationId}}) {
    id
    name
    description
    slug
  }
}
    `;

export const useProjectsQuery = <
      TData = ProjectsQuery,
      TError = unknown
    >(
      variables?: ProjectsQueryVariables,
      options?: UseQueryOptions<ProjectsQuery, TError, TData>
    ) => {
    
    return useQuery<ProjectsQuery, TError, TData>(
      variables === undefined ? ['Projects'] : ['Projects', variables],
      useGraphqlClient<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument).bind(null, variables),
      options
    )};

useProjectsQuery.getKey = (variables?: ProjectsQueryVariables) => variables === undefined ? ['Projects'] : ['Projects', variables];

export const useInfiniteProjectsQuery = <
      TData = ProjectsQuery,
      TError = unknown
    >(
      variables?: ProjectsQueryVariables,
      options?: UseInfiniteQueryOptions<ProjectsQuery, TError, TData>
    ) => {
    const query = useGraphqlClient<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument)
    return useInfiniteQuery<ProjectsQuery, TError, TData>(
      variables === undefined ? ['Projects.infinite'] : ['Projects.infinite', variables],
      (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      options
    )};

useInfiniteProjectsQuery.getKey = (variables?: ProjectsQueryVariables) => variables === undefined ? ['Projects.infinite'] : ['Projects.infinite', variables];

export const CreatePostDocument = `
    mutation CreatePost($projectId: String!, $title: String!, $description: String!, $userAddress: String!) {
  createOnePost(
    data: {author: {connectOrCreate: {where: {walletAddress: $userAddress}, create: {walletAddress: $userAddress}}}, project: {connect: {id: $projectId}}, title: $title, description: $description}
  ) {
    title
  }
}
    `;

export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>) => {
    
    return useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      ['CreatePost'],
      useGraphqlClient<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument),
      options
    )};

export const DeletePostDocument = `
    mutation DeletePost($postId: String!) {
  deleteOnePost(where: {id: $postId}) {
    id
  }
}
    `;

export const useDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>) => {
    
    return useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
      ['DeletePost'],
      useGraphqlClient<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument),
      options
    )};

export const DeleteUpvoteDocument = `
    mutation DeleteUpvote($upvoteId: String!) {
  deleteOneUpvote(where: {id: $upvoteId}) {
    id
  }
}
    `;

export const useDeleteUpvoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteUpvoteMutation, TError, DeleteUpvoteMutationVariables, TContext>) => {
    
    return useMutation<DeleteUpvoteMutation, TError, DeleteUpvoteMutationVariables, TContext>(
      ['DeleteUpvote'],
      useGraphqlClient<DeleteUpvoteMutation, DeleteUpvoteMutationVariables>(DeleteUpvoteDocument),
      options
    )};

export const UpvotePostDocument = `
    mutation UpvotePost($id: String!, $postId: String!, $userAddress: String!) {
  upsertOneUpvote(
    where: {id: $id}
    update: {post: {connect: {id: $postId}}, user: {connect: {walletAddress: $userAddress}}}
    create: {post: {connect: {id: $postId}}, user: {connectOrCreate: {where: {walletAddress: $userAddress}, create: {walletAddress: $userAddress}}}}
  ) {
    id
  }
}
    `;

export const useUpvotePostMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpvotePostMutation, TError, UpvotePostMutationVariables, TContext>) => {
    
    return useMutation<UpvotePostMutation, TError, UpvotePostMutationVariables, TContext>(
      ['UpvotePost'],
      useGraphqlClient<UpvotePostMutation, UpvotePostMutationVariables>(UpvotePostDocument),
      options
    )};
