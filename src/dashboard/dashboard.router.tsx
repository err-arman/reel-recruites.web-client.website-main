import DashboardLayout from "@/_app/common/layouts/dashboard-layout/DashboardLayout";
import { RouteObject } from "react-router-dom";
import ApplicationPage from "./applications/applications.page";
import ApplicationsDetails from "./applications/components/ApplicationsDetails";
import { dashboardLinks } from "./dashboard.navlinks";
import DashboardPage from "./dashboard/dashboard.page";
import ProfileVideosPage from "./profile-videos/profileVideos.page";
import SavedPage from "./saved/saved.page";
import ProfilePage from "./profile/profile.page";

export const dashboardRouter: RouteObject[] = [
  {
    path: "",
    element: <DashboardLayout navlinks={dashboardLinks} path={"dashboard"} />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "applications",
        element: <ApplicationPage />,
      },
      {
        path: "applications/:id",
        element: <ApplicationsDetails />,
      },
      {
        path: "saved",
        element: <SavedPage />,
      },
      {
        path: "profile-videos",
        element: <ProfileVideosPage />,
      },
      {
        path: "profile-settings",
        element: <ProfilePage />,
      },
    ],
  },
];
