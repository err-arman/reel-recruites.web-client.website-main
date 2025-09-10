import EmptyState from "@/_app/common/components/EmptyState";
import { ApplicationWithPagination } from "@/_app/gql-types/graphql";
import { useQuery } from "@apollo/client";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import CompanyProfileCard from "./components/CompanyProfileCard";
import { MY_APPLICANTS_QUERY } from "./utils/query.gql";

const ApplicationPage = () => {
  const { data: myApplicantsData } = useQuery<{
    myAppliedApplications: ApplicationWithPagination;
  }>(MY_APPLICANTS_QUERY);

  return (
    <div className="py-2">
      {myApplicantsData?.myAppliedApplications?.nodes?.length === 0 && (
        <EmptyState
          label="You didn't apply to any job yet"
          Actions={
            <Button component={Link} to={"/jobs"}>
              Apply Now
            </Button>
          }
        />
      )}

      <div className="w-full lg:w-6/12">
        {myApplicantsData?.myAppliedApplications?.nodes?.map(
          (myCompanyData, idx) => (
            <CompanyProfileCard
              idx={idx}
              key={idx}
              myCompanyData={myCompanyData!}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;
