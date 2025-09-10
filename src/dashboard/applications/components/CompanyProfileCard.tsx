import { Application } from "@/_app/gql-types/graphql";
import { getFileUrl } from "@/_app/utils/getFileUrl";
import { Image, Paper, Text, Title } from "@mantine/core";
import clsx from "clsx";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface Prop {
  // category?: JobCategory;
  myCompanyData: Application;
  idx: number;
}

const CompanyProfileCard: React.FC<Prop> = ({ myCompanyData, idx }) => {
  return (
    <Paper
      p={"lg"}
      shadow="md"
      className={clsx("md:flex gap-4  justify-center", {
        "mt-2": idx !== 0,
      })}
    >
      <Image
        h={100}
        w={100}
        src={getFileUrl(myCompanyData?.company?.logo!)}
        alt="category-image"
      />
      <div className="flex flex-col flex-1 mt-2 text-left ">
        <Link
          to={`${myCompanyData?.company?.uid}/jobs/${myCompanyData?.job?._id}`}
        >
          <Title className="text-xl font-title dark:text-white">
            {myCompanyData?.job?.title}
          </Title>
        </Link>

        <Text className="font-title dark:text-white ">
          <Text>Applied on</Text>
          {dayjs(myCompanyData?.applicant?.createdAt).format("MMMM D, YYYY")}
        </Text>
        <Text className="font-title dark:text-white">
          <Text>Expected salary</Text>
          {myCompanyData?.expectedSalary}
        </Text>
        <div className="mt-4">
          <Link
            className="block outline-button"
            to={`/dashboard/applications/${myCompanyData._id}`}
          >
            View Application
          </Link>
        </div>
      </div>
    </Paper>
  );
};

export default CompanyProfileCard;
