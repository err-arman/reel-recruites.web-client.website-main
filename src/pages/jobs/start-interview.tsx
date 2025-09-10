import AppButton from "@/_app/common/components/AppButton";
import { $exitVideoPermission } from "@/_app/common/rxjs-controllers/rxjs-subjects";
import {
  Job,
  JobCategoryWithPagination,
  JobQuestion,
  MatchOperator,
  ServerFileReference,
} from "@/_app/gql-types/graphql";
import { FOLDER__NAME } from "@/_app/models/FolderName";
import { userAtom } from "@/_app/store/user.store";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Input,
  LoadingOverlay,
  Select,
  Skeleton,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { IconArrowLeft } from "@tabler/icons-react";
import axios from "axios";
import confetti from "canvas-confetti";
import { useAtomValue } from "jotai";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import { APPLY_TO_JOB_MUTATION, GET_APPLY_QUESTIONS, JOB_CATEGORIES } from "./utils/query.gql";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

const StartInterview = () => {
  const { id } = useParams<{ id: string }>();
  const currentUser = useAtomValue(userAtom);

  // forms
  const [phoneNumber, setPhoneNumber] = useState("");
  const [uploadedCV, setUploadedCV] = useState<ServerFileReference | null>(
    null
  );
  const [isCvUploading, setIsCvUploading] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [expectedSalary, setExpectedSalary] = useState<string>("");
  const [yearsOfExperience, setYearsOfExperience] = useState<string>("");

  const [questions, setQuestions] = useState<JobQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);
  const [isSkipVideoInterview, setSkipVideoInterview] = useState(false);
  const [isLastQuestionSubmitted, setIsLastQuestionSubmitted] = useState(false);

  // player related
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoBlob, setCurrentVideoBlob] = useState<Blob | null>(null);
  const [answersBlob, setAnswersBlob] = useState<Blob[] | null>(null);

  // video states
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoStopped, setIsVideoStopped] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    return () => {
      $exitVideoPermission.next(true);
    };
  }, [currentUser]);

  const [fetchQuestions, { loading, data: jobQueryData }] = useLazyQuery<{
    job: Job;
  }>(GET_APPLY_QUESTIONS, {
    variables: {
      where: {
        key: "_id",
        operator: MatchOperator.Eq,
        value: id,
      },
    },
  });

  const { data: categoriesData, loading: categoriesLoading } = useQuery<{
    jobCategories: JobCategoryWithPagination;
  }>(JOB_CATEGORIES, {
    variables: {
      input: {
        limit: -1,
      },
    },
  });

  const [applyToJob] = useMutation(APPLY_TO_JOB_MUTATION, {
    onCompleted() {
      setIsInterviewFinished(true);
      setIsLastQuestionSubmitted(false);
      setSubmitting(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    },
    onError(error) {
      setSubmitting(false);
      setIsInterviewFinished(false);
      showNotification({
        title: error.message,
        message: "",
        color: "red",
      });
    },
  });

  const startVideo = () => {
    // Skip video setup if video interview is disabled
    if (isSkipVideoInterview) {
      return;
    }

    // Get access to the camera!
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            // mute the video
            videoRef.current.muted = true;

            $exitVideoPermission.subscribe((exit) => {
              if (exit) {
                stream.getTracks().forEach((track) => {
                  track.stop();
                });
              }
            });
          }
        });
    }
  };

  const recordVideo = () => {
    if (videoRef.current) {
      setIsRecording(true);
      const stream = videoRef.current.srcObject as MediaStream;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9",
      });
      mediaRecorderRef.current.start();

      const recordedChunks: BlobPart[] = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks, {
          type: "video/webm",
        });
        setCurrentVideoBlob(blob);
        const url = URL.createObjectURL(blob);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = url;
        }
      };
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();

      // stop the video
      if (videoRef.current) {
        videoRef.current.pause();
        // unmute the video
        videoRef.current.muted = false;
        // set uploaded url to the video
      }

      setIsRecording(false);
      setIsVideoStopped(true);
    }
  };

  useEffect(() => {
    setPhoneNumber(currentUser?.phoneNumber as string);
  }, [currentUser]);

  // start video
  useEffect(() => {
    fetchQuestions()
      .then((res) => {
        setQuestions(res.data?.job.questions ?? []);
        setSkipVideoInterview(res?.data?.job?.isSkipVideoInterview!);

        // Only start video if video interview is not skipped
        if (!res?.data?.job?.isSkipVideoInterview) {
          startVideo();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    videoRef.current?.addEventListener("pause", () => {
      if (videoRef.current) {
        setIsPlaying(false);
      }
    });

    // remove video source when component unmounts
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  function handleRetake(): void {
    setIsVideoStopped(false);
    setIsPlaying(false);
    setCurrentVideoBlob(null);
    if (!isSkipVideoInterview) {
      startVideo();
    }
    setTimer(300);
  }

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);
    setIsVideoStopped(false);
    setIsPlaying(false);
    setTimer(300);
    setAnswersBlob((prev) => {
      if (prev === null) {
        return [currentVideoBlob as Blob];
      } else {
        return [...prev, currentVideoBlob as Blob];
      }
    });

    if (!isSkipVideoInterview) {
      startVideo();
    }
  };

  const finishInterview = (_form: React.FormEvent<HTMLFormElement>) => {
    _form.preventDefault();

    if (uploadedCV === null) {
      alert("Please upload your CV");
      return;
    }

    if (selectedSector === null) {
      alert("Please select a sector");
      return;
    }

    if (expectedSalary === "" || parseFloat(expectedSalary) <= 0) {
      alert("Please enter a valid expected salary");
      return;
    }

    if (yearsOfExperience === "" || parseFloat(yearsOfExperience) < 0) {
      alert("Please enter valid years of experience");
      return;
    }

    if (!isSkipVideoInterview) {
      if (currentVideoBlob === null) return;
      setSubmitting(true);
      const fd = new FormData();
      fd.append("folder", FOLDER__NAME.VIDEO__INTERVIEW);
      [...(answersBlob ?? []), currentVideoBlob]?.forEach((blob) => {
        fd.append("files", blob as Blob);
      });
      axios
        .post((import.meta.env.VITE_STORAGE_VIDEO_API + "s") as string, fd)
        .then((res) => {
          applyToJob({
            variables: {
              input: {
                jobId: jobQueryData?.job?._id,
                companyId: jobQueryData?.job?.company?._id,
                answers: questions.map((q, idx) => ({
                  answerVideo: {
                    provider: res.data?.responses?.[idx]?.provider,
                    path: res.data?.responses?.[idx]?.path,
                  },
                  title: q?.title,
                  body: q?.body,
                })),
                note: null,
                expectedSalary: parseFloat(expectedSalary),
                cv: uploadedCV,
                applicantAdditionalInfo: {
                  // github: "https://github.com/graphland-dev",
                  // linkedin: "",
                  phoneNumber: phoneNumber,
                  workField: categoriesData?.jobCategories?.nodes?.find(
                    category => category._id === selectedSector
                  )?.name,
                  yearsOfExperience: parseInt(yearsOfExperience),
                },
              },
            },
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      setSubmitting(true);
      applyToJob({
        variables: {
          input: {
            jobId: jobQueryData?.job?._id,
            companyId: jobQueryData?.job?.company?._id,
            // answers: questions.map((q, idx) => ({
            // 	answerVideo: {
            // 		provider: res.data?.responses?.[idx]?.provider,
            // 		path: res.data?.responses?.[idx]?.path,
            // 	},
            // 	title: q?.title,
            // 	body: q?.body,
            // })),
            note: null,
            expectedSalary: parseFloat(expectedSalary),
            cv: uploadedCV,
            applicantAdditionalInfo: {
              // github: "https://github.com/graphland-dev",
              // linkedin: "",
              phoneNumber: phoneNumber,
              workField: categoriesData?.jobCategories?.nodes?.find(
                category => category._id === selectedSector
              )?.name,
              yearsOfExperience: parseInt(yearsOfExperience),
            },
          },
        },
      });
    }
  };

  const submitLastInterview = () => {
    setIsLastQuestionSubmitted(true);
  };

  const [timer, setTimer] = useState(300);

  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      if (timer === 0) {
        stopRecording();
      } else {
        interval = setInterval(() => {
          // Increment the timer every second
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        // Cleanup the interval on unmount
        return () => clearInterval(interval);
      }
    }
    return () => clearInterval(interval);
  }, [isRecording, timer]);

  const formattedTime = formatTime(timer);

  // Render: when finish
  if (isInterviewFinished) {
    return (
      <div className="grid h-screen wrapper place-content-center">
        <Title className="text-center" order={1} mt={"lg"}>
          Interview Finished!
        </Title>
        <Title className="text-center" order={3} mt={"lg"}>
          Thank you for your time!
        </Title>
        <Text className="text-center" mt={"lg"}>
          We will get back to you soon.
        </Text>

        <Button
          component={Link}
          to={"/"}
          leftSection={<IconArrowLeft />}
          my={"lg"}
        >
          Back to home
        </Button>
      </div>
    );
  }

  // Render: when last question submitted
  // if (isLastQuestionSubmitted || isSkipVideoInterview) {
  // 	return (

  // 	);
  // }

  return (
    <div className="wrapper">
      <div className="my-10">
        {loading ? (
          <div className="items-center gap-5 lg:flex">
            <div className="w-full">
              <Skeleton height={35} className="w-full" />
              <Skeleton height={25} my={"lg"} className="w-full" />
              <Skeleton height={25} my={"lg"} className="w-full" />
              <Skeleton height={25} my={"lg"} className="w-full" />
              <Skeleton height={25} my={"lg"} className="w-full" />
            </div>

            <div className="w-full">
              <Skeleton height={250} my={"lg"} className="w-full" />
            </div>
          </div>
        ) : (
          <>
            {Boolean(isLastQuestionSubmitted || isSkipVideoInterview) ? (
              <div className="grid py-10 overflow-hidden wrapper place-content-center">
                <p className="text-3xl">Please upload your cv.</p>

                <Space h={"sm"} />

                <Text>
                  Please upload your cv and cover letter to submit your
                  interview.
                </Text>

                <Space h={"sm"} />

                <form
                  action="#"
                  onSubmit={finishInterview}
                  method="post"
                  className="flex flex-col gap-4"
                >
                  <Input.Wrapper
                    label="Contact number"
                    className="w-full"
                    withAsterisk
                  >
                    <Input
                      placeholder="Your contact number"
                      className="w-full"
                      min={11}
                      max={11}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Input.Wrapper>

                  <Select
                    label="Sector"
                    placeholder="Select your preferred sector"
                    className="w-full"
                    withAsterisk
                    required
                    value={selectedSector}
                    onChange={setSelectedSector}
                    data={categoriesData?.jobCategories?.nodes?.map((category) => ({
                      value: category._id,
                      label: category.name,
                    })) || []}
                    disabled={categoriesLoading}
                    searchable
                  />

                  <Input.Wrapper
                    label="Expected Salary (per month)"
                    className="w-full"
                    withAsterisk
                  >
                    <Input
                      placeholder="Enter your expected monthly salary"
                      className="w-full"
                      type="number"
                      min="0"
                      required
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                    />
                  </Input.Wrapper>

                  <Input.Wrapper
                    label="Years of Experience"
                    className="w-full"
                    withAsterisk
                  >
                    <Input
                      placeholder="Enter your years of experience"
                      className="w-full"
                      type="number"
                      min="0"
                      max="50"
                      step="0.5"
                      required
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                    />
                  </Input.Wrapper>

                  <Input.Wrapper
                    label="Upload CV"
                    className="w-full"
                    withAsterisk
                  >
                    <div className="flex flex-col items-end gap-2">
                      <Dropzone
                        loading={isCvUploading}
                        onDrop={(files) => {
                          const fd = new FormData();
                          files.forEach((file) => fd.append("files", file));
                          fd.append("folder", FOLDER__NAME.INTERVIEW_RESUMES);
                          // test
                          setIsCvUploading(true);
                          axios
                            .post(`${import.meta.env.VITE_API}/storage/raw`, fd)
                            .then((res) => {
                              setUploadedCV({
                                path: res.data.responses[0].path,
                                provider: res.data.responses[0].provider,
                              } as ServerFileReference);
                              setIsCvUploading(false);
                            });
                        }}
                        onReject={(files) =>
                          console.log("rejected files", files)
                        }
                        maxSize={5 * 1024 ** 2}
                        accept={PDF_MIME_TYPE}
                        className="w-full"
                      >
                        {!uploadedCV ? (
                          <div className="flex flex-col items-center gap-2">
                            <svg
                              height={45}
                              width={45}
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 303.188 303.188"
                              xmlSpace="preserve"
                              fill="#000000"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g>
                                  {" "}
                                  <polygon
                                    style={{ fill: "#E8E8E8" }}
                                    points="219.821,0 32.842,0 32.842,303.188 270.346,303.188 270.346,50.525 "
                                  />{" "}
                                  <path
                                    style={{ fill: "#FB3449" }}
                                    d="M230.013,149.935c-3.643-6.493-16.231-8.533-22.006-9.451c-4.552-0.724-9.199-0.94-13.803-0.936 c-3.615-0.024-7.177,0.154-10.693,0.354c-1.296,0.087-2.579,0.199-3.861,0.31c-1.314-1.36-2.584-2.765-3.813-4.202 c-7.82-9.257-14.134-19.755-19.279-30.664c1.366-5.271,2.459-10.772,3.119-16.485c1.205-10.427,1.619-22.31-2.288-32.251 c-1.349-3.431-4.946-7.608-9.096-5.528c-4.771,2.392-6.113,9.169-6.502,13.973c-0.313,3.883-0.094,7.776,0.558,11.594 c0.664,3.844,1.733,7.494,2.897,11.139c1.086,3.342,2.283,6.658,3.588,9.943c-0.828,2.586-1.707,5.127-2.63,7.603 c-2.152,5.643-4.479,11.004-6.717,16.161c-1.18,2.557-2.335,5.06-3.465,7.507c-3.576,7.855-7.458,15.566-11.815,23.02 c-10.163,3.585-19.283,7.741-26.857,12.625c-4.063,2.625-7.652,5.476-10.641,8.603c-2.822,2.952-5.69,6.783-5.941,11.024 c-0.141,2.394,0.807,4.717,2.768,6.137c2.697,2.015,6.271,1.881,9.4,1.225c10.25-2.15,18.121-10.961,24.824-18.387 c4.617-5.115,9.872-11.61,15.369-19.465c0.012-0.018,0.024-0.036,0.037-0.054c9.428-2.923,19.689-5.391,30.579-7.205 c4.975-0.825,10.082-1.5,15.291-1.974c3.663,3.431,7.621,6.555,11.939,9.164c3.363,2.069,6.94,3.816,10.684,5.119 c3.786,1.237,7.595,2.247,11.528,2.886c1.986,0.284,4.017,0.413,6.092,0.335c4.631-0.175,11.278-1.951,11.714-7.57 C231.127,152.765,230.756,151.257,230.013,149.935z M119.144,160.245c-2.169,3.36-4.261,6.382-6.232,9.041 c-4.827,6.568-10.34,14.369-18.322,17.286c-1.516,0.554-3.512,1.126-5.616,1.002c-1.874-0.11-3.722-0.937-3.637-3.065 c0.042-1.114,0.587-2.535,1.423-3.931c0.915-1.531,2.048-2.935,3.275-4.226c2.629-2.762,5.953-5.439,9.777-7.918 c5.865-3.805,12.867-7.23,20.672-10.286C120.035,158.858,119.587,159.564,119.144,160.245z M146.366,75.985 c-0.602-3.514-0.693-7.077-0.323-10.503c0.184-1.713,0.533-3.385,1.038-4.952c0.428-1.33,1.352-4.576,2.826-4.993 c2.43-0.688,3.177,4.529,3.452,6.005c1.566,8.396,0.186,17.733-1.693,25.969c-0.299,1.31-0.632,2.599-0.973,3.883 c-0.582-1.601-1.137-3.207-1.648-4.821C147.945,83.048,146.939,79.482,146.366,75.985z M163.049,142.265 c-9.13,1.48-17.815,3.419-25.979,5.708c0.983-0.275,5.475-8.788,6.477-10.555c4.721-8.315,8.583-17.042,11.358-26.197 c4.9,9.691,10.847,18.962,18.153,27.214c0.673,0.749,1.357,1.489,2.053,2.22C171.017,141.096,166.988,141.633,163.049,142.265z M224.793,153.959c-0.334,1.805-4.189,2.837-5.988,3.121c-5.316,0.836-10.94,0.167-16.028-1.542 c-3.491-1.172-6.858-2.768-10.057-4.688c-3.18-1.921-6.155-4.181-8.936-6.673c3.429-0.206,6.9-0.341,10.388-0.275 c3.488,0.035,7.003,0.211,10.475,0.664c6.511,0.726,13.807,2.961,18.932,7.186C224.588,152.585,224.91,153.321,224.793,153.959z"
                                  />{" "}
                                  <polygon
                                    style={{ fill: "#FB3449" }}
                                    points="227.64,25.263 32.842,25.263 32.842,0 219.821,0 "
                                  />{" "}
                                  <g>
                                    {" "}
                                    <path
                                      style={{ fill: "#A4A9AD" }}
                                      d="M126.841,241.152c0,5.361-1.58,9.501-4.742,12.421c-3.162,2.921-7.652,4.381-13.472,4.381h-3.643 v15.917H92.022v-47.979h16.606c6.06,0,10.611,1.324,13.652,3.971C125.321,232.51,126.841,236.273,126.841,241.152z M104.985,247.387h2.363c1.947,0,3.495-0.546,4.644-1.641c1.149-1.094,1.723-2.604,1.723-4.529c0-3.238-1.794-4.857-5.382-4.857 h-3.348C104.985,236.36,104.985,247.387,104.985,247.387z"
                                    />{" "}
                                    <path
                                      style={{ fill: "#A4A9AD" }}
                                      d="M175.215,248.864c0,8.007-2.205,14.177-6.613,18.509s-10.606,6.498-18.591,6.498h-15.523v-47.979 h16.606c7.701,0,13.646,1.969,17.836,5.907C173.119,235.737,175.215,241.426,175.215,248.864z M161.76,249.324 c0-4.398-0.87-7.657-2.609-9.78c-1.739-2.122-4.381-3.183-7.926-3.183h-3.773v26.877h2.888c3.939,0,6.826-1.143,8.664-3.43 C160.841,257.523,161.76,254.028,161.76,249.324z"
                                    />{" "}
                                    <path
                                      style={{ fill: "#A4A9AD" }}
                                      d="M196.579,273.871h-12.766v-47.979h28.355v10.403h-15.589v9.156h14.374v10.403h-14.374 L196.579,273.871L196.579,273.871z"
                                    />{" "}
                                  </g>{" "}
                                  <polygon
                                    style={{ fill: "#D1D3D3" }}
                                    points="219.821,50.525 270.346,50.525 219.821,0 "
                                  />{" "}
                                </g>{" "}
                              </g>
                            </svg>
                            <p>Upload your CV</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <Check />
                            <p>CV uploaded. You can re upload to change it.</p>
                          </div>
                        )}
                      </Dropzone>

                      <AppButton
                        loading={submitting}
                        className="flex gap-4 w-max"
                        type="submit"
                      >
                        Submit your interview
                      </AppButton>
                    </div>
                  </Input.Wrapper>
                </form>
              </div>
            ) : (
              <div className="wrapper">
                <LoadingOverlay
                  visible={submitting}
                  opacity={100}
                  loaderProps={{ color: "blue", type: "bars" }}
                  overlayProps={{
                    backgroundOpacity: 0.8,
                    blur: 100,
                    children: (
                      <>
                        <Title className="text-center" order={2} mt={"lg"}>
                          We are submitting your interview recordings...
                        </Title>
                        <Text className="text-center" mt={"lg"}>
                          This may take a few minutes. Please do not close this
                          page.
                        </Text>
                      </>
                    ),
                  }}
                />
                <div className="grid gap-5 my-10 md:grid-cols-2 md:my-28">
                  <div className="px-10">
                    <Title className="font-title" order={2}>
                      {questions[questionIndex]?.title}
                    </Title>

                    <Space h={"sm"} />
                    <Text fs={"22px"}>{questions[questionIndex]?.body}</Text>

                    <Text fw={"bold"} my={"md"}>
                      How to make a good audio recording
                    </Text>
                    <div className="prose dark:prose-invert">
                      <ul>
                        <li>Find a calm and quiet place.</li>
                        <li>
                          Use headphones or turn down the audio volume to avoid
                          ear-splitting feedback.
                        </li>
                        <li>
                          When you are ready, click on the "Start Recording"
                          button to start recording. You can stop recording 5
                          seconds after it started.
                        </li>
                        <li>
                          You will have up to 3 minutes to finish your answer.
                          Before you submit your recording, you can listen and
                          re-record it.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="relative">
                    <video
                      ref={videoRef}
                      className="overflow-hidden rounded-md"
                    ></video>
                    <div className="absolute top-0 text-black">
                      <div className="w-[110px] h-[60px] flex items-center px-4 m-4 gap-2 bg-gray-300 rounded-md">
                        <p className="w-4 h-4 bg-red-500 rounded-full"></p>
                        <p className="text-xl">{formattedTime}</p>
                      </div>
                    </div>
                    <div className="flex justify-between my-4">
                      {Boolean(currentVideoBlob) &&
                      isVideoStopped &&
                      questionIndex < questions?.length - 1 ? (
                        <AppButton onClick={handleNextQuestion}>
                          Next Question
                        </AppButton>
                      ) : questionIndex == questions.length - 1 &&
                        Boolean(currentVideoBlob) &&
                        isVideoStopped ? (
                        <AppButton onClick={submitLastInterview}>
                          Finish Interview
                        </AppButton>
                      ) : null}

                      {!isVideoStopped && (
                        <AppButton
                          size={"md"}
                          leftSection={
                            !isRecording ? (
                              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            ) : (
                              <div className="w-3 h-3 bg-red-500"></div>
                            )
                          }
                          onClick={isRecording ? stopRecording : recordVideo}
                        >
                          {isRecording ? "Stop Recording" : "Start Recording"}
                        </AppButton>
                      )}

                      {isVideoStopped && (
                        <div className="flex gap-2">
                          <AppButton
                            size={"md"}
                            leftSection={
                              isPlaying ? (
                                <FaPause size={15} />
                              ) : (
                                <FaPlay size={15} />
                              )
                            }
                            onClick={() => {
                              if (videoRef.current) {
                                setIsPlaying(!isPlaying);
                                // check if the video is paused
                                if (videoRef.current.paused) {
                                  videoRef.current.play();
                                } else {
                                  videoRef.current.pause();
                                }
                              }
                            }}
                          >
                            {!isPlaying ? "Play" : "Pause"}
                          </AppButton>
                          <AppButton
                            size={"md"}
                            leftSection={<TbReload size={15} />}
                            onClick={handleRetake}
                          >
                            Retake
                          </AppButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
