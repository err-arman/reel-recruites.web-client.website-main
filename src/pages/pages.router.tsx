import BaseLayout from "@/_app/common/layouts/base-layout/BaseLayout";
import { RouteObject } from "react-router-dom";
import OAuthCallback from "./(auth)/oauth-callback";
import CategoriesPage from "./categories/categories.page";
import CompanyProfilePage from "./companies/company-profile.page";
import HomePage from "./home/home.page";
import RecordingPage from "./interview-recording/recording.page";
import JobSeekerProfile from "./job-seeker-profile/job-seeker-profile.page";
import JobDetailsPage from "./jobs/job-details.page";
import { jobRouter } from "./jobs/jobs.router";
import ProfileFeedPage from "./profile-feed/profile-feed.page";
import PromotionalVideosPage from "./promotional-videos/promotional-videos.page";
import InterviewOnBoarding from "./submit-video-interview/components/InterviewOnBoarding";
import VideoInterviewProcess from "./submit-video-interview/components/VideoInterviewProcess";
import TestPage from "./test.page";
import { RouterGuard } from "@/_app/guards/RouterGuard";
import CallbackPage from "./(auth)/callback/callback.page";

export const publicRouter: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/promotional-videos",
        element: <PromotionalVideosPage />,
      },
      {
        path: "/:companyId",
        element: <CompanyProfilePage />,
      },
      {
        path: "/:companyId/jobs/:id",
        element: <JobDetailsPage />,
      },
      {
        path: "/profile/:userId",
        element: <JobSeekerProfile />,
      },
      {
        path: "/profile/:userId/feed",
        element: <ProfileFeedPage />,
      },
      {
        path: "/jobs",
        children: jobRouter,
      },
      {
        path: "/callback",
        element: <CallbackPage />,
      },
      {
        path: "/interview-recording",
        element: <RouterGuard />,
        children: [
          {
            path: "",
            element: <RecordingPage />,
          },
        ],
      },
      {
        path: "/submit-video-interview",
        element: <RouterGuard />,
        children: [
          {
            path: "",
            element: <VideoInterviewProcess />,
          },
        ],
      },
      {
        path: "/interview-onboard",
        element: <RouterGuard />,
        children: [
          {
            path: "",
            element: <InterviewOnBoarding />,
          },
        ],
      },
      {
        path: "/test",
        element: <TestPage />,
      },
      {
        path: "/oauth/:provider/callback",
        element: <OAuthCallback />,
      },
    ],
  },
];
