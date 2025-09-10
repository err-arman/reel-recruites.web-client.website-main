/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type ApplicantAdditionalInfo = {
  __typename?: 'ApplicantAdditionalInfo';
  github?: Maybe<Scalars['String']['output']>;
  linkedin?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  workField?: Maybe<Scalars['String']['output']>;
  yearsOfExperience?: Maybe<Scalars['Int']['output']>;
};

export type ApplicantAdditionalInfoInput = {
  github?: InputMaybe<Scalars['String']['input']>;
  linkedin?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  workField?: InputMaybe<Scalars['String']['input']>;
  yearsOfExperience?: InputMaybe<Scalars['Int']['input']>;
};

export type Application = {
  __typename?: 'Application';
  _id: Scalars['ID']['output'];
  answers?: Maybe<Array<ApplicationAnswer>>;
  applicant?: Maybe<User>;
  applicantAdditionalInfo?: Maybe<ApplicantAdditionalInfo>;
  company?: Maybe<Company>;
  createdAt: Scalars['DateTime']['output'];
  cv?: Maybe<ServerFileReference>;
  expectedSalary?: Maybe<Scalars['Float']['output']>;
  isApplicantInvited?: Maybe<Scalars['Boolean']['output']>;
  job?: Maybe<Job>;
  note?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ApplicationStatus>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ApplicationAnswer = {
  __typename?: 'ApplicationAnswer';
  answerVideo?: Maybe<ServerFileReference>;
  body?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ApplicationAnswerInput = {
  answerVideo?: InputMaybe<ServerFileInput>;
  body?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum ApplicationStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type ApplicationWithPagination = {
  __typename?: 'ApplicationWithPagination';
  meta?: Maybe<PagniationMeta>;
  nodes?: Maybe<Array<Application>>;
};

export type CommonFindDocumentDto = {
  and?: InputMaybe<Array<CommonFindDocumentDto>>;
  key?: InputMaybe<Scalars['String']['input']>;
  operator?: InputMaybe<MatchOperator>;
  or?: InputMaybe<Array<CommonFindDocumentDto>>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CommonMutationResponse = {
  __typename?: 'CommonMutationResponse';
  _id: Scalars['ID']['output'];
};

export type CommonPaginationDto = {
  filterOperator?: InputMaybe<Where_Operator>;
  filters?: InputMaybe<Array<CommonFindDocumentDto>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortType>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type Company = {
  __typename?: 'Company';
  _id: Scalars['ID']['output'];
  companySize?: Maybe<Scalars['String']['output']>;
  cover?: Maybe<ServerFileReference>;
  createdAt: Scalars['DateTime']['output'];
  location?: Maybe<LocationReference>;
  logo?: Maybe<ServerFileReference>;
  longDescription?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<User>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  socialLinks?: Maybe<CompanySocialLinks>;
  tagLine?: Maybe<Scalars['String']['output']>;
  uid?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type CompanyRecruiter = {
  __typename?: 'CompanyRecruiter';
  _id: Scalars['ID']['output'];
  company: Company;
  createdAt: Scalars['DateTime']['output'];
  recruiter: User;
  status?: Maybe<CompanyRecruiterStatus>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum CompanyRecruiterStatus {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type CompanyRecruiterWithPagination = {
  __typename?: 'CompanyRecruiterWithPagination';
  meta?: Maybe<PagniationMeta>;
  nodes?: Maybe<Array<CompanyRecruiter>>;
};

export type CompanySocialLinkInput = {
  facebook?: InputMaybe<Scalars['String']['input']>;
  github?: InputMaybe<Scalars['String']['input']>;
  linkedin?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  youtube?: InputMaybe<Scalars['String']['input']>;
};

export type CompanySocialLinks = {
  __typename?: 'CompanySocialLinks';
  facebook?: Maybe<Scalars['String']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  linkedin?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export type CompanyWithPagination = {
  __typename?: 'CompanyWithPagination';
  meta?: Maybe<PagniationMeta>;
  nodes?: Maybe<Array<Company>>;
};

export type CompleteProfileInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  ref: Scalars['String']['input'];
  refId: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type CreateApplicationInput = {
  answers?: InputMaybe<Array<ApplicationAnswerInput>>;
  applicantAdditionalInfo?: InputMaybe<ApplicantAdditionalInfoInput>;
  companyId?: InputMaybe<Scalars['String']['input']>;
  cv?: InputMaybe<ServerFileInput>;
  expectedSalary?: InputMaybe<Scalars['Float']['input']>;
  isApplicantInvited?: InputMaybe<Scalars['Boolean']['input']>;
  jobId: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCompanyInput = {
  companySize?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<ServerFileInput>;
  location?: InputMaybe<LocationReferenceInput>;
  logo?: InputMaybe<ServerFileInput>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  socialLinks?: InputMaybe<CompanySocialLinkInput>;
  tagLine?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCompanyRecruiterInput = {
  companyId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateJobCategoryInput = {
  isFeatured: Scalars['Boolean']['input'];
  logo?: InputMaybe<ServerFileInput>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  shortDescription?: InputMaybe<Scalars['String']['input']>;
};

export type CreateJobInput = {
  categoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  companyId: Scalars['ID']['input'];
  isApproved?: InputMaybe<Scalars['Boolean']['input']>;
  isSkipVideoInterview?: InputMaybe<Scalars['Boolean']['input']>;
  jobLocationType?: InputMaybe<Job_Location_Type>;
  jobRoleType?: InputMaybe<Job_Role_Type>;
  lastDayOfApplication?: InputMaybe<Scalars['DateTime']['input']>;
  longDescription: Scalars['String']['input'];
  publishStatus?: InputMaybe<Job_Publish_Status>;
  questions: Array<JobQuestionInput>;
  salaryRangeMax: Scalars['Int']['input'];
  salaryRangeMin: Scalars['Int']['input'];
  shortDescription: Scalars['String']['input'];
  thumbnail: ServerFileInput;
  title: Scalars['String']['input'];
  video?: InputMaybe<ServerFileInput>;
};

export type CreatePostInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  medias?: InputMaybe<Array<PostMediaInput>>;
};

export type CreatePromotionalVideoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
  video?: InputMaybe<ServerFileInput>;
};

export type CreateUserInput = {
  avatar?: InputMaybe<ServerFileInput>;
  cover?: InputMaybe<ServerFileInput>;
  designation?: InputMaybe<Scalars['String']['input']>;
  educations?: InputMaybe<Array<EducationInput>>;
  email?: InputMaybe<Scalars['String']['input']>;
  experiences?: InputMaybe<Array<ExperiencesInput>>;
  isPending?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  overview?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<UserRole>>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  tagLine?: InputMaybe<Scalars['String']['input']>;
};

export type EducationInput = {
  degree?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  grade?: InputMaybe<Scalars['Float']['input']>;
  logo?: InputMaybe<ServerFileInput>;
  school?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  subjectOfStudy?: InputMaybe<Scalars['String']['input']>;
};

export type Experience = {
  __typename?: 'Experience';
  companyLocation?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  isCurrentlyWorking?: Maybe<Scalars['Boolean']['output']>;
  locationType?: Maybe<Job_Location_Type>;
  logo?: Maybe<ServerFileReference>;
  roleType?: Maybe<Job_Role_Type>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ExperiencesInput = {
  companyLocation?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  isCurrentlyWorking?: InputMaybe<Scalars['Boolean']['input']>;
  locationType?: InputMaybe<Job_Location_Type>;
  roleType?: InputMaybe<Job_Role_Type>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FirebaseTokenAuth = {
  captchaToken?: InputMaybe<Scalars['String']['input']>;
  firebaseToken?: InputMaybe<Scalars['String']['input']>;
  isCreateAccount: Scalars['Boolean']['input'];
  role?: User__Role;
};

export type ForgotPasswordInput = {
  clientUrl: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type InviteCompanyRecruiterInput = {
  companyId: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export enum Job_Location_Type {
  Hybrid = 'HYBRID',
  OnSite = 'ON_SITE',
  Remote = 'REMOTE'
}

export enum Job_Publish_Status {
  Drafted = 'DRAFTED',
  Published = 'PUBLISHED'
}

export enum Job_Role_Type {
  Associate = 'ASSOCIATE',
  Director = 'DIRECTOR',
  EntryLevel = 'ENTRY_LEVEL',
  Executive = 'EXECUTIVE',
  Internship = 'INTERNSHIP',
  MidLevel = 'MID_LEVEL',
  MidSeniorLevel = 'MID_SENIOR_LEVEL',
  PartTime = 'PART_TIME',
  SeniorLevel = 'SENIOR_LEVEL'
}

export type Job = {
  __typename?: 'Job';
  _id: Scalars['ID']['output'];
  applicants?: Maybe<Array<User>>;
  categories?: Maybe<Array<JobCategory>>;
  company?: Maybe<Company>;
  createdAt: Scalars['DateTime']['output'];
  isApproved: Scalars['Boolean']['output'];
  isSkipVideoInterview: Scalars['Boolean']['output'];
  jobLocationType?: Maybe<Job_Location_Type>;
  jobRoleType?: Maybe<Job_Role_Type>;
  lastDayOfApplication?: Maybe<Scalars['DateTime']['output']>;
  longDescription?: Maybe<Scalars['String']['output']>;
  postedBy?: Maybe<User>;
  publishStatus: Job_Publish_Status;
  questions?: Maybe<Array<JobQuestion>>;
  salaryRangeMax: Scalars['Int']['output'];
  salaryRangeMin: Scalars['Int']['output'];
  shortDescription?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<ServerFileReference>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  video?: Maybe<ServerFileReference>;
};

export type JobCategory = {
  __typename?: 'JobCategory';
  _id: Scalars['ID']['output'];
  isFeatured: Scalars['Boolean']['output'];
  logo?: Maybe<ServerFileReference>;
  longDescription?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  shortDescription?: Maybe<Scalars['String']['output']>;
};

export type JobCategoryWithPagination = {
  __typename?: 'JobCategoryWithPagination';
  meta?: Maybe<PagniationMeta>;
  nodes?: Maybe<Array<JobCategory>>;
};

export type JobQuestion = {
  __typename?: 'JobQuestion';
  body?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type JobQuestionInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type JobsWithPagination = {
  __typename?: 'JobsWithPagination';
  meta?: Maybe<PagniationMeta>;
  nodes?: Maybe<Array<Job>>;
};

export type KickCompanyRecruiterInput = {
  companyId: Scalars['String']['input'];
  recruiterId: Scalars['String']['input'];
};

export type LocationReference = {
  __typename?: 'LocationReference';
  address?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
};

export type LocationReferenceInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
};

export type LoginInput = {
  captchaToken?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponseDto = {
  __typename?: 'LoginResponseDto';
  accessToken: Scalars['String']['output'];
  roles: Array<Scalars['String']['output']>;
};

export enum MatchOperator {
  And = 'and',
  Contains = 'contains',
  Eq = 'eq',
  Exists = 'exists',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  Lt = 'lt',
  Lte = 'lte',
  Ne = 'ne',
  Nin = 'nin',
  Or = 'or'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Allowed Roles: [JOB_SEEKER] */
  applyToJob: CommonMutationResponse;
  /** Allowed Roles: ['ADMIN', 'RECRUITER'] */
  changeApplicationStatus: Scalars['Boolean']['output'];
  completeProfile: LoginResponseDto;
  /** Allowed Roles: [RECRUITER] */
  createCompany: CommonMutationResponse;
  /**
   * Create company recruiter by admin.
   *  Allowed Roles: [ADMIN]
   */
  createCompanyRecruiter: CommonMutationResponse;
  /** Allowed Roles: [RECRUITER] */
  createJob: CommonMutationResponse;
  /** Allowed Roles: [RECRUITER] */
  createJobCategory: CommonMutationResponse;
  createPost: CommonMutationResponse;
  createPromotionalVideo: CommonMutationResponse;
  /** Allowed Roles: [ADMIN] */
  createUser: CommonMutationResponse;
  forgotPassword: Scalars['Boolean']['output'];
  getTokenByFirebaseIdToken: LoginResponseDto;
  /** Allowed Roles: [RECRUITER] */
  inviteApplicantForInterview: Scalars['Boolean']['output'];
  /**
   * Invite/re-invite user as recruiter to company.
   *  Allowed Roles: [ADMIN,RECRUITER]
   */
  inviteCompanyRecruiter: Scalars['Boolean']['output'];
  inviteRecruiter: Scalars['Boolean']['output'];
  /** Allowed roles: [ADMIN,RECRUITER] */
  kickRecruiterFromCompany: Scalars['Boolean']['output'];
  likeJob: Scalars['Boolean']['output'];
  login: LoginResponseDto;
  oauthLogin: LoginResponseDto;
  register: Scalars['Boolean']['output'];
  removeJob: Scalars['Boolean']['output'];
  removeJobCategory: Scalars['Boolean']['output'];
  removePost: Scalars['Boolean']['output'];
  removePromotionalVideo: Scalars['Boolean']['output'];
  /** Allowed Roles: [ADMIN] */
  removeUser: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  /** Allowed Roles: [JOB_SEEKER] */
  submitVideoOnlyInterview: Scalars['Boolean']['output'];
  unlikeJob: Scalars['Boolean']['output'];
  updateCompany: Scalars['Boolean']['output'];
  updateJob: Scalars['Boolean']['output'];
  updateJobCategory: Scalars['Boolean']['output'];
  updateMe: Scalars['Boolean']['output'];
  updateMyPassword: Scalars['Boolean']['output'];
  updatePost: Post;
  /** Allowed Roles: [ADMIN] */
  updatePromotionalVideo: Scalars['Boolean']['output'];
  /** Allowed Roles: [ADMIN] */
  updateUser: Scalars['Boolean']['output'];
  updateUserPasswordByAdmin: Scalars['Boolean']['output'];
};


export type MutationApplyToJobArgs = {
  input: CreateApplicationInput;
};


export type MutationChangeApplicationStatusArgs = {
  applicationId: Scalars['String']['input'];
  status: ApplicationStatus;
};


export type MutationCompleteProfileArgs = {
  input: CompleteProfileInput;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateCompanyRecruiterArgs = {
  input: CreateCompanyRecruiterInput;
};


export type MutationCreateJobArgs = {
  input: CreateJobInput;
};


export type MutationCreateJobCategoryArgs = {
  input: CreateJobCategoryInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreatePromotionalVideoArgs = {
  input: CreatePromotionalVideoInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationGetTokenByFirebaseIdTokenArgs = {
  input: FirebaseTokenAuth;
};


export type MutationInviteApplicantForInterviewArgs = {
  applicantId: Scalars['String']['input'];
  applicationId: Scalars['String']['input'];
  companyId: Scalars['String']['input'];
  jobId: Scalars['String']['input'];
};


export type MutationInviteCompanyRecruiterArgs = {
  input: InviteCompanyRecruiterInput;
};


export type MutationInviteRecruiterArgs = {
  input: UpdateCompanyInput;
  where: CommonFindDocumentDto;
};


export type MutationKickRecruiterFromCompanyArgs = {
  input: KickCompanyRecruiterInput;
};


export type MutationLikeJobArgs = {
  jobId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationOauthLoginArgs = {
  input: OAuthLoginInput;
};


export type MutationRegisterArgs = {
  input: SignUpInput;
};


export type MutationRemoveJobArgs = {
  where: CommonFindDocumentDto;
};


export type MutationRemoveJobCategoryArgs = {
  where: CommonFindDocumentDto;
};


export type MutationRemovePostArgs = {
  where: CommonFindDocumentDto;
};


export type MutationRemovePromotionalVideoArgs = {
  where: CommonFindDocumentDto;
};


export type MutationRemoveUserArgs = {
  where: CommonFindDocumentDto;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSubmitVideoOnlyInterviewArgs = {
  input: SubmitVideoInterviewApplicationInput;
};


export type MutationUnlikeJobArgs = {
  jobId: Scalars['String']['input'];
};


export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
  where: CommonFindDocumentDto;
};


export type MutationUpdateJobArgs = {
  input: UpdateJobInput;
  where: CommonFindDocumentDto;
};


export type MutationUpdateJobCategoryArgs = {
  input: UpdateJobCategoryInput;
  where: CommonFindDocumentDto;
};


export type MutationUpdateMeArgs = {
  body: UpdateMeInput;
};


export type MutationUpdateMyPasswordArgs = {
  body: UpdateMyPasswordInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
  where: CommonFindDocumentDto;
};


export type MutationUpdatePromotionalVideoArgs = {
  input: UpdatePromotionalVideoInput;
  where: CommonFindDocumentDto;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  where: CommonFindDocumentDto;
};


export type MutationUpdateUserPasswordByAdminArgs = {
  body: UpdateMyPasswordInput;
  where: CommonFindDocumentDto;
};

export type OAuthLoginInput = {
  code: Scalars['String']['input'];
  isCreateAccount: Scalars['Boolean']['input'];
  provider: Scalars['String']['input'];
  redirect_uri: Scalars['String']['input'];
  role?: User__Role;
};

export type PagniationMeta = {
  __typename?: 'PagniationMeta';
  currentPage: Scalars['Float']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  totalCount: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID']['output'];
  body?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  medias?: Maybe<Array<PostMedia>>;
  postedBy?: Maybe<User>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PostMedia = {
  __typename?: 'PostMedia';
  media?: Maybe<ServerFileReference>;
  type?: Maybe<PostMediaType>;
};

export type PostMediaInput = {
  media?: InputMaybe<ServerFileInput>;
  type?: InputMaybe<PostMediaType>;
};

export enum PostMediaType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type PostWithPagination = {
  __typename?: 'PostWithPagination';
  meta?: Maybe<PagniationMeta>;
  nodes?: Maybe<Array<Post>>;
};

export type PromotionalVideo = {
  __typename?: 'PromotionalVideo';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  isPublished: Scalars['Boolean']['output'];
  postedBy?: Maybe<User>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  video?: Maybe<ServerFileReference>;
};

export type PromotionalVideosWithPagination = {
  __typename?: 'PromotionalVideosWithPagination';
  meta?: Maybe<PagniationMeta>;
  nodes?: Maybe<Array<PromotionalVideo>>;
};

export type Query = {
  __typename?: 'Query';
  application: Application;
  /** Allowed Roles: [ADMIN] */
  applications__admin: ApplicationWithPagination;
  /** Allowed Roles: [RECRUITER] */
  applications__recruiter: ApplicationWithPagination;
  companies: CompanyWithPagination;
  company: Company;
  companyRecruiters: CompanyRecruiterWithPagination;
  job: Job;
  jobCategories: JobCategoryWithPagination;
  jobCategory: JobCategory;
  /**
   *
   *     This is just for admin user to see all job posts
   *
   *     Allowed Roles: [ADMIN]
   */
  jobs__admin: JobsWithPagination;
  /**
   *
   *     This is for public job query. here will only approved and published jobs will be shown
   */
  jobs__public: JobsWithPagination;
  /**
   *
   *     Apni jei job gular company er owner or recruiter seguli dekhte paben ekhane
   *
   *     Allowed Roles: [RECRUITER]
   */
  jobs__recruiter: JobsWithPagination;
  me?: Maybe<User>;
  myAppliedApplications: ApplicationWithPagination;
  myCompanies: CompanyWithPagination;
  posts: PostWithPagination;
  promotionalVideo: PromotionalVideo;
  /** Allowed Roles: [ADMIN] */
  promotionalVideos: PromotionalVideosWithPagination;
  /** Public promotional videos */
  promotionalVideos__public: PromotionalVideosWithPagination;
  user: User;
  users: UserWithPagination;
};


export type QueryApplicationArgs = {
  where: CommonFindDocumentDto;
};


export type QueryApplications__AdminArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryApplications__RecruiterArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryCompaniesArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryCompanyArgs = {
  where: CommonFindDocumentDto;
};


export type QueryCompanyRecruitersArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryJobArgs = {
  where: CommonFindDocumentDto;
};


export type QueryJobCategoriesArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryJobCategoryArgs = {
  where: CommonFindDocumentDto;
};


export type QueryJobs__AdminArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryJobs__PublicArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryJobs__RecruiterArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryMyAppliedApplicationsArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryMyCompaniesArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryPostsArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryPromotionalVideoArgs = {
  where: CommonFindDocumentDto;
};


export type QueryPromotionalVideosArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryPromotionalVideos__PublicArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};


export type QueryUserArgs = {
  where: CommonFindDocumentDto;
};


export type QueryUsersArgs = {
  input?: InputMaybe<CommonPaginationDto>;
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ServerFileInput = {
  fullUrl?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<ServerFileProvider>;
};

export enum ServerFileProvider {
  CloudflareR2 = 'CLOUDFLARE_R2',
  Cloudinary = 'CLOUDINARY',
  Local = 'LOCAL',
  Direct = 'direct'
}

export type ServerFileReference = {
  __typename?: 'ServerFileReference';
  path?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<ServerFileProvider>;
};

export type SignUpInput = {
  captchaToken?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: User__Role;
};

export enum SortType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SubmitVideoInterviewApplicationInput = {
  answers?: InputMaybe<Array<ApplicationAnswerInput>>;
  applicantId: Scalars['String']['input'];
  applicationId: Scalars['String']['input'];
  companyId: Scalars['String']['input'];
  jobId: Scalars['String']['input'];
};

export type UpdateCompanyInput = {
  companySize?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<ServerFileInput>;
  location?: InputMaybe<LocationReferenceInput>;
  logo?: InputMaybe<ServerFileInput>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  socialLinks?: InputMaybe<CompanySocialLinkInput>;
  tagLine?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateJobCategoryInput = {
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  logo?: InputMaybe<ServerFileInput>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateJobInput = {
  categoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  companyId?: InputMaybe<Scalars['ID']['input']>;
  isApproved?: InputMaybe<Scalars['Boolean']['input']>;
  isSkipVideoInterview?: InputMaybe<Scalars['Boolean']['input']>;
  jobLocationType?: InputMaybe<Job_Location_Type>;
  jobRoleType?: InputMaybe<Job_Role_Type>;
  lastDayOfApplication?: InputMaybe<Scalars['DateTime']['input']>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  publishStatus?: InputMaybe<Job_Publish_Status>;
  questions?: InputMaybe<Array<JobQuestionInput>>;
  salaryRangeMax?: InputMaybe<Scalars['Int']['input']>;
  salaryRangeMin?: InputMaybe<Scalars['Int']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<ServerFileInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<ServerFileInput>;
};

export type UpdateMeInput = {
  avatar?: InputMaybe<ServerFileInput>;
  cover?: InputMaybe<ServerFileInput>;
  designation?: InputMaybe<Scalars['String']['input']>;
  educations?: InputMaybe<Array<EducationInput>>;
  email?: InputMaybe<Scalars['String']['input']>;
  experiences?: InputMaybe<Array<ExperiencesInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  overview?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  tagLine?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyPasswordInput = {
  password: Scalars['String']['input'];
};

export type UpdatePostInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  medias?: InputMaybe<Array<PostMediaInput>>;
};

export type UpdatePromotionalVideoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<ServerFileInput>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<ServerFileInput>;
  cover?: InputMaybe<ServerFileInput>;
  designation?: InputMaybe<Scalars['String']['input']>;
  educations?: InputMaybe<Array<EducationInput>>;
  email?: InputMaybe<Scalars['String']['input']>;
  experiences?: InputMaybe<Array<ExperiencesInput>>;
  isPending?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  overview?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<UserRole>>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  tagLine?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  avatar?: Maybe<ServerFileReference>;
  cover?: Maybe<ServerFileReference>;
  createdAt: Scalars['DateTime']['output'];
  designation?: Maybe<Scalars['String']['output']>;
  educations?: Maybe<Array<UserEducation>>;
  email?: Maybe<Scalars['String']['output']>;
  experiences?: Maybe<Array<Experience>>;
  isPending?: Maybe<Scalars['Boolean']['output']>;
  likedJobs?: Maybe<Array<Job>>;
  name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<UserRole>>;
  skills?: Maybe<Array<Scalars['String']['output']>>;
  tagLine?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserEducation = {
  __typename?: 'UserEducation';
  degree?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  grade?: Maybe<Scalars['Float']['output']>;
  logo?: Maybe<ServerFileReference>;
  school?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  subjectOfStudy?: Maybe<Scalars['String']['output']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  JobSeeker = 'JOB_SEEKER',
  Recruiter = 'RECRUITER'
}

export type UserWithPagination = {
  __typename?: 'UserWithPagination';
  meta?: Maybe<PagniationMeta>;
  nodes?: Maybe<Array<User>>;
};

export enum User__Role {
  JobSeeker = 'JOB_SEEKER',
  Recruiter = 'RECRUITER'
}

export enum Where_Operator {
  And = 'and',
  Or = 'or'
}

export type Me_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type Me_QueryQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id?: string | null, email?: string | null, name?: string | null, roles?: Array<UserRole> | null, avatar?: { __typename?: 'ServerFileReference', path?: string | null, provider?: ServerFileProvider | null } | null, likedJobs?: Array<{ __typename?: 'Job', _id: string }> | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id?: string | null, email?: string | null, name?: string | null, roles?: Array<UserRole> | null, phoneNumber?: string | null, avatar?: { __typename?: 'ServerFileReference', path?: string | null, provider?: ServerFileProvider | null } | null } | null };

export type OauthLoginMutationVariables = Exact<{
  input: OAuthLoginInput;
}>;


export type OauthLoginMutation = { __typename?: 'Mutation', oauthLogin: { __typename?: 'LoginResponseDto', accessToken: string, roles: Array<string> } };

export type CompanyQueryVariables = Exact<{
  where: CommonFindDocumentDto;
}>;


export type CompanyQuery = { __typename?: 'Query', company: { __typename?: 'Company', _id: string, companySize?: string | null, longDescription?: string | null, name?: string | null, shortDescription?: string | null, website?: string | null, logo?: { __typename?: 'ServerFileReference', path?: string | null, provider?: ServerFileProvider | null } | null, cover?: { __typename?: 'ServerFileReference', path?: string | null, provider?: ServerFileProvider | null } | null, socialLinks?: { __typename?: 'CompanySocialLinks', facebook?: string | null, github?: string | null, linkedin?: string | null, youtube?: string | null, twitter?: string | null } | null } };


export const Me_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me_QUERY"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedJobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<Me_QueryQuery, Me_QueryQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const OauthLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OauthLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OAuthLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oauthLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]} as unknown as DocumentNode<OauthLoginMutation, OauthLoginMutationVariables>;
export const CompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Company"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommonFindDocumentDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"companySize"}},{"kind":"Field","name":{"kind":"Name","value":"logo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}},{"kind":"Field","name":{"kind":"Name","value":"longDescription"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"socialLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"linkedin"}},{"kind":"Field","name":{"kind":"Name","value":"youtube"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}}]}},{"kind":"Field","name":{"kind":"Name","value":"website"}}]}}]}}]} as unknown as DocumentNode<CompanyQuery, CompanyQueryVariables>;