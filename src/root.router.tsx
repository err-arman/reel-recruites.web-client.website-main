import React, { useEffect } from "react";
import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import { RouterGuard } from "./_app/guards/RouterGuard";
import { dashboardRouter } from "./dashboard/dashboard.router";
import { authRouter } from "./pages/(auth)/auth.router";
import NotFoundPage from "./pages/note-found.page";
import { publicRouter } from "./pages/pages.router";

const AppPageWrapper: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <Outlet />;
};

export const rootRouter = createBrowserRouter([
  {
    path: "",
    element: <AppPageWrapper />,
    children: [
      {
        path: "/",
        children: publicRouter,
      },
      {
        path: "/auth",
        children: authRouter,
      },
      {
        path: "/dashboard",
        element: <RouterGuard />,
        children: dashboardRouter,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
