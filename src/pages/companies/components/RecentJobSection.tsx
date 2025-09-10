import { JobsWithPagination, MatchOperator } from "@/_app/gql-types/graphql";
import { GET_JOB_ALL_COMPANY } from "@/pages/jobs/utils/query.gql";
import { useQuery } from "@apollo/client";
import { Title } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import RecentJobCard from "./RecentJobCard";

const RecentJobSection: React.FC<{ companyId: string }> = ({ companyId }) => {
  const { data: companyJob } = useQuery<{ jobs__public: JobsWithPagination }>(
    GET_JOB_ALL_COMPANY,
    {
      variables: {
        input: {
          limit: 5,
          filters: [
            {
              key: "company",
              operator: MatchOperator.Eq,
              value: companyId,
            },
          ],
        },
      },
    }
  );

  // const { data: bookMarkedJobs, refetch } = useQuery<{
  // 	me: User;
  // }>(BOOK__MARKED__JOBS);

  // const [addToBookMark] = useMutation(ADD__JOB__TO__BOOK__MARK, {
  // 	onCompleted() {
  // 		showNotification({
  // 			message: 'Job has been added to save list.',
  // 			color: 'teal',
  // 		});
  // 		refetch();
  // 	},
  // });

  // const [removeToBookMark] = useMutation(REMOVE__JOB__TO__BOOK__MARK, {
  // 	onCompleted() {
  // 		showNotification({
  // 			message: 'Job has been removed from save list.',
  // 			color: 'teal',
  // 		});
  // 		refetch();
  // 	},
  // });

  return (
    <div className="my-10 md:w-9/12">
      <div className="flex justify-between wrapper">
        <Title className="dark:text-white text-[26px] leading-8">
          Recent Jobs
        </Title>

        <Link
          className="flex items-center gap-1 outline-button"
          to={`/jobs?companyId=${companyId}`}
        >
          <span>View All Jobs</span>
          <IconChevronRight size={18} />
        </Link>
      </div>

      <div className="flex flex-col gap-6 p-5 my-10 bg-gray-100 rounded dark:bg-night-600">
        {companyJob?.jobs__public.nodes?.map((job) => (
          <RecentJobCard job={job} />
        ))}
      </div>
    </div>
  );
};

export default RecentJobSection;
