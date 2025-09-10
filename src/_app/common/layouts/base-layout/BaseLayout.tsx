import React from "react";
import AppHeader from "./componants/Header/AppHeader";
import AppFooter from "./componants/Footer/AppFooter";
import { Outlet } from "react-router-dom";

const BaseLayout: React.FC = () => {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <AppFooter />
    </>
  );
};

export default BaseLayout;
