import AppButton from "@/_app/common/components/AppButton";
import { $exitVideoPermission } from "@/_app/common/rxjs-controllers/rxjs-subjects";
import { Job, JobQuestion, MatchOperator } from "@/_app/gql-types/graphql";
import { FOLDER__NAME } from "@/_app/models/FolderName";
import { userAtom } from "@/_app/store/user.store";
import { GET_APPLY_QUESTIONS } from "@/pages/jobs/utils/query.gql";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  LoadingOverlay,
  Skeleton,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconArrowLeft } from "@tabler/icons-react";
import axios from "axios";
import confetti from "canvas-confetti";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { Link, useSearchParams } from "react-router-dom";
import { Submit_Video_Interview_Mutation } from "../utils/gql-query/query";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

const VideoInterviewProcess = () => {
  // const { id } = useParams<{ id: string }>();
  const currentUser = useAtomValue(userAtom);

  const [questions, setQuestions] = useState<JobQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);

  // player related
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoBlob, setCurrentVideoBlob] = useState<Blob | null>(null);
  const [answersBlob, setAnswersBlob] = useState<Blob[] | null>(null);

  // video states
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoStopped, setIsVideoStopped] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [params] = useSearchParams();
  const applicationId = params.get("applicationId");
  const companyId = params.get("companyId");
  const jobId = params.get("jobId");

  useEffect(() => {
    return () => {
      $exitVideoPermission.next(true);
    };
  }, [currentUser]);

  const [fetchQuestions, { loading }] = useLazyQuery<{
    job: Job;
  }>(GET_APPLY_QUESTIONS, {
    variables: {
      where: {
        key: "_id",
        operator: MatchOperator.Eq,
        value: jobId,
      },
    },
  });

  const [applyToJob] = useMutation(Submit_Video_Interview_Mutation, {
    onCompleted() {
      setIsInterviewFinished(true);

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

  // start video
  useEffect(() => {
    startVideo();
    fetchQuestions()
      .then((res) => {
        setQuestions(res.data?.job.questions ?? []);
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
    startVideo();
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

    startVideo();
  };

  const finishInterview = () => {
    // _form.preventDefault();
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
              answers: questions.map((q, idx) => ({
                answerVideo: {
                  provider: res.data?.responses?.[idx]?.provider,
                  path: res.data?.responses?.[idx]?.path,
                },
                title: q?.title,
                body: q?.body,
              })),
              applicantId: currentUser?._id,
              applicationId,
              companyId,
              jobId,
            },
          },
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
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
              <div className="grid gap-5 my-4 md:grid-cols-2 md:my-28">
                <div className="md:px-10">
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

                <div className="relative order-first md:order-none">
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
                      <AppButton
                        loading={submitting}
                        disabled={submitting}
                        onClick={() => finishInterview()}
                      >
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
          </>
        )}
      </div>
    </div>
  );
};

export default VideoInterviewProcess;
