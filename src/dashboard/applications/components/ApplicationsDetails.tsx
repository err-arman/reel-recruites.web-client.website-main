import {
  ApplicationWithPagination,
  MatchOperator,
} from "@/_app/gql-types/graphql";
import { useQuery } from "@apollo/client";
import { Image, Paper, Text, Title } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { MY_APPLICANTS_QUERY } from "../utils/query.gql";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import ApplicationVideo from "./ApplicationVideo";

const ApplicationsDetails = () => {
  const { id } = useParams();

  const { data: applicationDetailsData } = useQuery<{
    myAppliedApplications: ApplicationWithPagination;
  }>(MY_APPLICANTS_QUERY, {
    variables: {
      input: {
        filters: [
          {
            key: "_id",
            operator: MatchOperator.Eq,
            value: id,
          },
        ],
      },
    },
  });

  const applicationsData =
    applicationDetailsData?.myAppliedApplications?.nodes?.[0];

  return (
    <div className="flex gap-6">
      <div className="flex flex-col w-4/12 gap-4 ">
        <div className="flex flex-col gap-2">
          <Title>{applicationsData?.job?.title}</Title>
          <Text>{applicationsData?.company?.name}</Text>
        </div>
        <div>
          <Paper shadow="md" className="flex flex-col gap-2 mt-5">
            <Image
              h={200}
              w={200}
              src={getFileUrl(applicationsData?.company?.logo!)}
              alt="category-image"
            />
            <div className="flex flex-col gap-2 p-4">
              <Text className="text-2xl">
                {applicationsData?.company?.name}
              </Text>
              <Text>{applicationsData?.company?.shortDescription}</Text>

              <Link
                className="text-black no-underline dark:text-white"
                to={`/${applicationsData?.company?._id}`}
              >
                Company Profile
              </Link>
            </div>
          </Paper>
        </div>
      </div>
      <div>
        {applicationsData?.answers?.map((answer) => (
          <ApplicationVideo answer={answer} />
        ))}
      </div>
    </div>
  );
};

export default ApplicationsDetails;
