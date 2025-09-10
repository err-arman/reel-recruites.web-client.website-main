import { $exitVideoPermission } from "@/_app/common/rxjs-controllers/rxjs-subjects";
import { Loader } from "@mantine/core";
import { useColorScheme, useOs } from "@mantine/hooks";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { TbCameraQuestion } from "react-icons/tb";

interface IProps {
  onVideoRrady: () => void;
}
export const OnBoardingVideoPreview: React.FC<IProps> = ({ onVideoRrady }) => {
  const computedColorScheme = useColorScheme();
  const os = useOs();
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    startVideo();

    return () => {
      $exitVideoPermission.next(true);
    };
  }, []);

  const startVideo = () => {
    setLoading(true);
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
          videoRef.current!.play();
          videoRef.current!.muted = true;
          setHasError(false);
          setLoading(false);
          onVideoRrady();

          $exitVideoPermission.subscribe((exit) => {
            if (exit) {
              stream.getTracks().forEach((track) => {
                track.stop();
              });
            }
          });
        })
        .catch((err) => {
          setHasError(true);
          setLoading(false);

          // check if the error is due to user not allowing camera access
          // if so, show a message to the user
          if (err.name === "NotAllowedError") {
            setErrorMsg("You need to allow camera access for this site.");
          }

          // check if the error is due to user not having a camera
          // if so, show a message to the user
          if (err.name === "NotFoundError") {
            setErrorMsg("You need to have a camera to access this site.");
          }
        });
    }
  };

  return (
    <>
      {os == "ios" && (
        <div className="flex items-center justify-center h-20 text-center bg-red-50">
          <p className="text-xl text-red-500">
            {"Iphone is not supported. Try desktop to apply"}
          </p>
        </div>
      )}

      {!hasError && os != "ios" && (
        <video ref={videoRef} className="overflow-hidden rounded-md"></video>
      )}

      {hasError && os != "ios" ? (
        <div className="flex flex-col items-center h-48 text-center bg-red-100 rounded-md place-content-center">
          <TbCameraQuestion size={30} color="red" />
          <p className="text-red-500">
            {errorMsg || "Something went wrong. Please try again later."}
          </p>
        </div>
      ) : loading ? (
        <div
          className={clsx(
            "h-48 my-10 text-center grid place-content-center rounded-md",
            {
              "bg-slate-700": computedColorScheme === "dark",
              "bg-gray-100": computedColorScheme === "light",
            }
          )}
        >
          <Loader />
        </div>
      ) : null}
    </>
  );
};
