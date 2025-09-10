import React, { PropsWithChildren } from "react";
import { Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

const AuthLayout: React.FC<PropsWithChildren> = () => {
  return (
    <>
      <Helmet>
        <style type="text/css">{`
        body {
            background-color: #0A0F13;
        }
    `}</style>
      </Helmet>
      <div className="flex items-center justify-between h-screen m-0 bg-dark">
        <div className="mx-auto md:w-4/12">
          <div className="mb-4 text-center">
            <Link to={"/"}>
              <img src="/images/white-logo.svg" alt="login_logo" />
            </Link>
          </div>
          <Outlet />
        </div>
        <div className="relative hidden w-6/12 h-screen auth-layout-right md:block"></div>
      </div>
    </>
  );
};

export default AuthLayout;
