import React, { PropsWithChildren } from "react";
import { Link, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Text } from "@mantine/core";

const AuthLayout: React.FC<PropsWithChildren> = () => {
  return (
    <>
      <Helmet>
        <style type="text/css">{`
        body {
            background-color: #f8f9fa;
        }
    `}</style>
      </Helmet>
      <div className="flex items-center justify-between">
        <div className="mx-auto md:w-4/12 my-10">
          <div className="mb-6 text-center">
            <Link to={"/"}>
              <Text className="text-4xl font-bold" style={{ color: "#f1bd61" }}>Nearheal Jobs</Text>
            </Link>
          </div>
          <Outlet />
        </div>
        <div className="relative hidden h-screen w-6/12 bg-gray-50 md:flex md:items-center md:justify-center">
          <img 
            src="/images/login-image.svg" 
            alt="Login illustration" 
            className="w-4/5 h-auto"
          />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
