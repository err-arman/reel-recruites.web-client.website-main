import EmptyState from "@/_app/common/components/EmptyState";
import JobCardHorizontalSkeleton from "@/_app/common/components/JobCardHorizontalSkeleton";
import JobCardVertical from "@/_app/common/components/JobCardVertical";
import JobCardVerticalSkeleton from "@/_app/common/components/JobCardVerticalSkeleton";
import {
  Company,
  JobCategoryWithPagination,
  Job_Location_Type,
  Job_Role_Type,
  JobsWithPagination,
  MatchOperator,
} from "@/_app/gql-types/graphql";
import useQueryParams from "@/_app/hooks/use-query-state";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  Button,
  Flex,
  NumberInput,
  Pagination,
  Popover,
  Select,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { COMPANY_DETAILS_FOR_COMPANY_JOBS_PAGE } from "../companies/utils/query.gql";
import { GET_ALL_JOBS, JOB_CATEGORIES } from "./utils/query.gql";

const day = dayjs();

const createFilterOperator = (key: string) => {
  switch (key) {
    case "jobLocationType":
    case "jobRoleType":
    case "jobPostedWithin":
    case "categories":
      return MatchOperator.Eq;
    case "salaryRangeMin":
      return MatchOperator.Gte;
    case "salaryRangeMax":
      return MatchOperator.Lte;
    default:
      return MatchOperator.Eq;
  }
};

const createJobPostedWithinFilter = (value: string) => {
  switch (value) {
    case "1":
      return {
        key: "createdAt",
        operator: MatchOperator.Gte,
        value: day.subtract(24, "hours").toISOString(),
      };
    case "2":
      return {
        key: "createdAt",
        operator: MatchOperator.Gte,
        value: day.subtract(7, "days").toISOString(),
      };
    case "3":
      return {
        key: "createdAt",
        operator: MatchOperator.Gte,
        value: day.subtract(30, "days").toISOString(),
      };
    case "4":
      return {
        key: "createdAt",
        operator: MatchOperator.Gte,
        value: day.subtract(60, "days").toISOString(),
      };
    case "5":
      return {
        key: "createdAt",
        operator: MatchOperator.Gte,
        value: day.subtract(90, "days").toISOString(),
      };
    case "6":
      return {
        key: "createdAt",
        operator: MatchOperator.Gte,
        value: day.subtract(180, "days").toISOString(),
      };
    default:
      return undefined;
  }
};

const JobsPage = () => {
  const [queryString, setQueryString] = useQueryParams({
    page: "1",
    limit: "12",
    jobLocationType: "",
    jobRoleType: "",
    salaryRangeMin: "",
    salaryRangeMax: "",
    categories: "",
    jobPostedWithin: "",
  });
  const [params] = useSearchParams();

  // company details API
  const [fetchCompanyDetails, { data: companyDetails }] = useLazyQuery<{
    company: Company;
  }>(COMPANY_DETAILS_FOR_COMPANY_JOBS_PAGE);

  // Create job filters
  const createJobFilters = (queryString: any) => {
    const filters = [];

    for (const key in queryString) {
      if (key === "page" || key === "limit") continue;
      if (key === "jobPostedWithin") {
        const timeFilter = createJobPostedWithinFilter(queryString[key]);
        if (timeFilter) filters.push(timeFilter);
      } else {
        if (queryString[key]) {
          filters.push({
            key,
            operator: createFilterOperator(key),
            value: queryString[key],
          });
        }
      }
    }

    return filters;
  };

  // API variables
  const variables = {
    input: {
      limit: parseInt(queryString.limit),
      page: parseInt(queryString.page),
      filterOperator: "and",
      filters: createJobFilters(queryString),
    },
  };

  // API variables with company filter
  const variablesWithCompanyFilter = {
    input: {
      limit: parseInt(queryString.limit),
      page: parseInt(queryString.page),
      filters: [
        {
          key: "company",
          operator: MatchOperator.Eq,
          value: params.get("companyId"),
        },
      ],
    },
  };

  // jobs API call here
  const { data, loading } = useQuery<{
    jobs__public: JobsWithPagination;
  }>(GET_ALL_JOBS, {
    variables: params.get("companyId") ? variablesWithCompanyFilter : variables,
  });

  const { data: jobCagegoriesData } = useQuery<{
    jobCategories: JobCategoryWithPagination;
  }>(JOB_CATEGORIES);

  useEffect(() => {
    if (params.get("companyId")) {
      fetchCompanyDetails({
        variables: {
          where: {
            key: "_id",
            operator: MatchOperator.Eq,
            value: params.get("companyId"),
          },
        },
      });
    }
  }, [params.get("companyId")]);

  return (
    <div>
      {/* Hero */}
      <div className="wrapper">
        <div className="my-20 text-center">
          <Title className="text-[56px] dark:text-white mb-3">
            {companyDetails?.company?.name
              ? `Jobs From ${companyDetails?.company?.name}`
              : "Find the Right Job. Faster."}
          </Title>
          <Text className=" dark:text-link">
            {companyDetails?.company?.tagLine
              ? companyDetails?.company?.tagLine
              : "Whether you're starting out or leveling up — choose your category, and let your video do the talking."}
          </Text>

          <Space h={5} />

          {companyDetails?.company?._id ? (
            <Link
              className="font-semibold"
              to={`/${companyDetails?.company?._id}`}
            >
              Company profile
            </Link>
          ) : null}
        </div>
      </div>

      <div className="dark:bg-[#0E141B] bg-gray-50 rounded-md ">
        <div className="wrapper ">
          {/* Filters */}
          {!params.get("companyId") && (
            <div className="grid grid-cols-1 gap-4 pb-10 md:grid-cols-5 pt-14">
              <Select
                className="shadow"
                placeholder="Job Location Type"
                data={[
                  { value: Job_Location_Type.Remote, label: "Remote" },
                  { value: Job_Location_Type.OnSite, label: "On Site" },
                  { value: Job_Location_Type.Hybrid, label: "Hybrid" },
                ]}
                clearable
                value={queryString?.jobLocationType}
                onChange={(value) => {
                  setQueryString({ jobLocationType: value ?? "" });
                }}
                size="md"
              />
              <Select
                className="shadow"
                placeholder="Job Role"
                data={[
                  { value: Job_Role_Type.Internship, label: "Internship" },
                  { value: Job_Role_Type.PartTime, label: "Part Time" },
                  { value: Job_Role_Type.EntryLevel, label: "Entry Level" },
                  { value: Job_Role_Type.Associate, label: "Associate" },
                  {
                    value: Job_Role_Type.MidSeniorLevel,
                    label: "Mid Senior Level",
                  },
                  { value: Job_Role_Type.MidLevel, label: "Mid Level" },
                  { value: Job_Role_Type.SeniorLevel, label: "Senior Level" },
                  { value: Job_Role_Type.Director, label: "Director" },
                  { value: Job_Role_Type.Executive, label: "Executive" },
                ]}
                clearable
                size="md"
                value={queryString?.jobRoleType}
                onChange={(value) => {
                  setQueryString({ jobRoleType: value ?? "" });
                }}
              />
              <Select
                className="shadow"
                placeholder="Job Category"
                data={jobCagegoriesData?.jobCategories.nodes?.map(
                  (category) => ({
                    value: category._id,
                    label: category.name,
                  })
                )}
                value={queryString?.categories}
                onChange={(value) => {
                  setQueryString({ categories: value ?? "" });
                }}
                clearable
                searchable
                size="md"
              />

              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Button
                    size="md"
                    variant="subtle"
                    rightSection={<IconSelector size={18} />}
                    className="font-normal dark:text-[#696969] text-[#B8B8B8] bg-white border border-gray-300 shadow dark:border-[#424242] dark:bg-[#2E2E2E]"
                    styles={{ inner: { justifyContent: "space-between" } }}
                  >
                    {queryString?.salaryRangeMin
                      ? `Min: ${queryString?.salaryRangeMin} BDT`
                      : "Salary Range"}
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Flex direction={"column"} gap={"lg"}>
                    <NumberInput
                      label="Min Salary"
                      value={queryString?.salaryRangeMin}
                      onChange={(value) => {
                        setQueryString({
                          salaryRangeMin: value.toString() ?? "",
                        });
                      }}
                      size="sm"
                    />

                    <NumberInput
                      label="Max Salary"
                      value={queryString?.salaryRangeMax}
                      onChange={(value) => {
                        setQueryString({
                          salaryRangeMax: value.toString() ?? "",
                        });
                      }}
                      size="sm"
                    />
                  </Flex>
                </Popover.Dropdown>
              </Popover>
              <Select
                className="shadow"
                placeholder="Job post date"
                data={[
                  { value: "1", label: "Last 24 hours" },
                  { value: "2", label: "Last 7 days" },
                  { value: "3", label: "Last 30 days" },
                  { value: "4", label: "Last 60 days" },
                  { value: "5", label: "Last 90 days" },
                  { value: "6", label: "Last 180 days" },
                ]}
                value={queryString?.jobPostedWithin}
                onChange={(value) => {
                  setQueryString({ jobPostedWithin: value ?? "" });
                }}
                clearable
                size="md"
              />
            </div>
          )}

          <section className="grid md:grid-cols-3 grid-cols-1 rounded gap-[30px] pb-10">
            {loading && (
              <>
                <JobCardHorizontalSkeleton />
                <JobCardHorizontalSkeleton />
                <JobCardHorizontalSkeleton />
                <JobCardHorizontalSkeleton />
                <JobCardHorizontalSkeleton />
                <JobCardHorizontalSkeleton />
                <JobCardHorizontalSkeleton />
              </>
            )}

            {data?.jobs__public.nodes?.map((job) => (
              <JobCardVertical job={job} />
            ))}
          </section>

          {/*----------------------------------------------------------------------
                Recommended Job section
           ----------------------------------------------------------------------*/}
          {loading && (
            <>
              <JobCardVerticalSkeleton />
            </>
          )}

          {!loading && !Boolean(data?.jobs__public?.nodes?.length) && (
            <>
              <EmptyState label={"No jobs found."} />
              <Space h={30} />
            </>
          )}

          {data?.jobs__public?.meta?.hasNextPage && (
            <Pagination
              className="pb-10 my-20"
              value={parseInt(queryString.page)}
              onChange={(page) => setQueryString({ page: page.toString() })}
              total={data?.jobs__public.meta?.totalPages ?? 10}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
