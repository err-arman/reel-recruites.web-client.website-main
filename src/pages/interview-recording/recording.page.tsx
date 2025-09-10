import LeftArrow from "@/_app/common/logos/LeftArrow";
import { Image, List, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const RecordingPage = () => {
  return (
    <div className="wrapper ">
      <div className=" my-16">
        <div className="flex items-center gap-1 ">
          <LeftArrow />
          <Link className="no-underline dark:text-white text-dark" to={"/"}>
            All Jobs
          </Link>
        </div>
        <div className="mt-20 flex gap-24">
          <div className="max-w-lg">
            <div className="max-w-[420px]  dark:text-white ">
              <Title className="text-5xl leading-[52px] mb-7">
                Tell us about you
              </Title>
              <Text className="leading-6">
                In 3 minutes or less, please tell us about the usual tasks and
                professional responsibilities from your current or most recent
                job.
              </Text>
            </div>
            <div className="max-w-lg mt-12">
              <Title className="text-2xl dark:text-white mb-5">
                How to make a good audio recording
              </Title>
              <List className="flex flex-col gap-2">
                <List.Item>Find a calm and quiet place.</List.Item>
                <List.Item>
                  Use headphones or turn down the audio volume to avoid
                  ear-splitting feedback.
                </List.Item>
                <List.Item>
                  When you are ready, click on the "Start Recording" button to
                  start recording. You can stop recording 5 seconds after it
                  started.
                </List.Item>
                <List.Item>
                  You will have up to 3 minutes to finish your answer. Before
                  you submit your recording, you can listen and re-record it.
                </List.Item>
              </List>
            </div>
          </div>
          <div>
            <Image
              className="w-[570px] h-[456px]"
              src={"images/recording-profile.png"}
            />
            <div className="md:mt-6 mb-8 flex gap-4">
              <Link className="no-underline " to={""}>
                <div className="border-solid border-gray-200 font-light text-sm md:py-[10px] text-center hover:bg-slate-100 text-white  rounded-md   hover:text-dark flex justify-center items-center gap-3 w-[196px]">
                  <Text className=""> Start Recording</Text>
                </div>
              </Link>
              <Link className="no-underline " to={""}>
                <div className="border-solid border-gray-200 font-light text-sm py-[10px] text-center hover:dark:bg-slate-100 text-white  rounded-md   hover:text-dark flex justify-center items-center gap-3 w-[196px]">
                  <Text className="">Upload video</Text>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      RecordingPage
    </div>
  );
}

export default RecordingPage