import { Job, MatchOperator } from "@/_app/gql-types/graphql";
import { useQuery } from "@apollo/client";
import { Alert, Space, Text, Title } from "@mantine/core";
import { IconVideo } from "@tabler/icons-react";

import { useOs } from "@mantine/hooks";
import { Link, useParams } from "react-router-dom";
import CamaraTester from "./components/CamaraTester";
import { GET_APPLY_QUESTIONS } from "./utils/query.gql";
import { MdWarning } from "react-icons/md";

const JobOnBoardingPage = () => {
  const { id } = useParams();
  const os = useOs();

  const { data: applyQuestion } = useQuery<{ job: Job }>(GET_APPLY_QUESTIONS, {
    variables: {
      where: {
        key: "_id",
        operator: MatchOperator.Eq,
        value: id,
      },
    },
  });

  if (os == "ios") {
    return (
      <div className="py-8 wrapper">
        <Alert
          icon={<MdWarning size={16} />}
          title="Warning"
          color="red"
          className="mb-4"
        >
          <Text>
            Video interviews are not supported on iOS devices. Please use a
            desktop or Android device to complete your interview.
          </Text>
        </Alert>
      </div>
    );
  }

  return (
    <div className="py-20 wrapper">
      <div className="max-w-[1123px] mx-auto dark:text-white text-center mb-20">
        {applyQuestion?.job?.title && (
          <Title className="text-[56px] leading-[61px] mb-7">
            {applyQuestion?.job?.title}
          </Title>
        )}
        {applyQuestion?.job?.shortDescription && (
          <Text>{applyQuestion?.job?.shortDescription}</Text>
        )}
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {/* <List type="ordered" className="order-last md:order-first">
          {applyQuestion?.job?.questions?.map((q, idx: number) => (
            <ListItem
              key={idx}
              className="dark:bg-[#18232f] px-2 py-3 rounded-sm shadow-lg mb-3"
            >
              <Title order={4}>{q?.title}</Title>
              <Space h={5} />
              <Text size="sm">{q?.body}</Text>
            </ListItem>
          ))}
        </List> */}
        <CamaraTester />

        <div className="px-4 py-3 shadow-md dark:bg-[#18232f] rounded-md">
          <Space h={"sm"} />
          <Text className="text-lg leading-7 job-apply-text">
            Prepare for your video interview by creating a professional and
            distraction-free environment. Find a quiet, well-lit space with a
            tidy backdrop. Test your camera, microphone, and internet connection
            in advance to ensure seamless communication. Dress professionally,
            have your resume and documents ready, and maintain eye contact with
            the camera during the interview. Relax, be yourself, and let your
            qualifications shine through. Best of luck!
          </Text>

          <div className="mt-6 mb-8">
            <Link
              className="no-underline"
              to={`/jobs/${applyQuestion?.job?._id}/interview`}
            >
              <div className=" font-light  flex justify-center items-center gap-1 w-[196px] outline-button">
                <IconVideo />
                <Text>Start interview</Text>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOnBoardingPage;
