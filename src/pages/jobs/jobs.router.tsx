import { RouteObject } from "react-router-dom";
import InterviewPage from "./start-interview";
import JobDetailsPage from "./job-details.page";
import JobsPage from "./jobs.page";
import JobOnBoardingPage from "./on-boarding.page";
import { RouterGuard } from "@/_app/guards/RouterGuard";

export const jobRouter: RouteObject[] = [
  {
    path: "",
    element: <JobsPage />,
  },
  {
    path: ":id",
    element: <JobDetailsPage />,
  },
  {
    path: ":id/on-boarding",
    element: <RouterGuard />,
    children: [
      {
        path: "",
        element: <JobOnBoardingPage />,
      },
    ],
  },
  {
    path: ":id/interview",
    element: <RouterGuard />,
    children: [
      {
        path: "",
        element: <InterviewPage />,
      },
    ],
  },
];
