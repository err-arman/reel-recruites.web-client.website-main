import { Company, MatchOperator } from "@/_app/gql-types/graphql";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import CompanyButtonSection from "./components/CompanyButtonSection";
import CompanyTabSection from "./components/CompanyTabSection";
import RecentJobSection from "./components/RecentJobSection";
import CompanyButtonSkeleton from "./components/company-skeleton/CompanyButtonSkeleton";
import CompanyProfileSkeleton from "./components/company-skeleton/CompanyProfileSkeleton";
import CompanyTabSectionSkeleton from "./components/company-skeleton/CompanyTabSectionSkeleton";
import RecentJobSkeleton from "./components/company-skeleton/RecentJobSkeleton";
import { GET_COMPANY_QUERY } from "./utils/query.gql";

const CompanyProfilePage = () => {
  const { companyId } = useParams();

  const { data: companyData, loading } = useQuery<{ company: Company }>(
    GET_COMPANY_QUERY,
    {
      variables: {
        where: {
          key: "uid",
          operator: MatchOperator.Eq,
          value: companyId,
        },
      },
    }
  );

  return (
    <div className="wrapper">
      {loading && <CompanyProfileSkeleton />}

      {/* <div className="flex items-center gap-1 ">
        <LeftArrow />
        <Link className="no-underline dark:text-white text-dark" to={"/jobs"}>
          All Jobs
        </Link>
      </div> */}
      {companyData?.company.cover?.path && (
        <img
          className="my-[32px]"
          src={getFileUrl(companyData?.company.cover!)!}
        />
      )}
      {loading && <CompanyButtonSkeleton />}
      <CompanyButtonSection company={companyData?.company} />

      {loading && <CompanyTabSectionSkeleton />}
      <CompanyTabSection company={companyData?.company} />

      {loading && <RecentJobSkeleton />}
      <RecentJobSection companyId={companyData?.company._id ?? ""} />
    </div>
  );
};

export default CompanyProfilePage;
