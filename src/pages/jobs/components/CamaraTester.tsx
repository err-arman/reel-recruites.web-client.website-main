"use client";

import { Button, Text, Title } from "@mantine/core";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Video,
  VideoOff,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CamaraTester() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isCameraWorking, setIsCameraWorking] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
        setIsCameraWorking(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setIsCameraWorking(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setIsCameraOn(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div>
      <Title order={3} my={"md"} mt={0}>
        Test Your Camera
      </Title>
      <Text>
        Ensure your camera is working correctly before starting the interview.
        Click the button above to test your camera.
      </Text>
      <div className="relative mb-4 overflow-hidden bg-gray-200 rounded-lg aspect-video">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${
            isCameraOn ? "opacity-100" : "opacity-0"
          }`}
        />
        {!isCameraOn && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>
      <Button onClick={isCameraOn ? stopCamera : startCamera}>
        <span className="flex items-center justify-center">
          {isCameraOn ? (
            <>
              <VideoOff className="w-5 h-5 mr-2" />
              Stop Camera
            </>
          ) : (
            <>
              <Video className="w-5 h-5 mr-2" />
              Start Camera Test
            </>
          )}
        </span>
      </Button>
      {isCameraWorking !== null && (
        <div
          className={`mt-4 p-3 rounded-md flex items-center ${
            isCameraWorking
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {isCameraWorking ? (
            <>
              <CheckCircle2 className="flex-shrink-0 w-5 h-5 mr-2" />
              <span>Camera is working properly!</span>
            </>
          ) : (
            <>
              <AlertCircle className="flex-shrink-0 w-5 h-5 mr-2" />
              <span>Camera test failed. Please check your settings.</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
