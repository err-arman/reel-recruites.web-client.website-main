import { Loader, MantineProvider } from "@mantine/core";
import "@mantine/dropzone/styles.css";

import { gql, useQuery } from "@apollo/client";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { mantineTheme } from "./_app/config/mantine-theme";
import { User } from "./_app/gql-types/graphql";
import { userAtom } from "./_app/store/user.store";
import { rootRouter } from "./root.router";

const ME_QUERY = gql`
  query Me_QUERY {
    me {
      _id
      email
      name
      roles
      avatar {
        path
        provider
      }
      likedJobs {
        _id
      }
    }
  }
`;

const RootApp: React.FC = () => {
  const [_, setUser] = useAtom(userAtom);

  const [userLoaded, setUserLoaded] = useState(false);
  const { loading } = useQuery<{ me: User }>(ME_QUERY, {
    onCompleted(data) {
      setUser(data.me);
      setUserLoaded(true);
    },
  });

  return (
    <MantineProvider
      classNamesPrefix="graphland-dev"
      theme={mantineTheme}
      defaultColorScheme="dark"
    >
      <Notifications position="bottom-left" />
      <ModalsProvider>
        {loading && !userLoaded ? (
          <div className="grid h-screen place-content-center">
            <Loader color="gray" size={50} />
          </div>
        ) : (
          <RouterProvider router={rootRouter} />
        )}
      </ModalsProvider>
    </MantineProvider>
  );
};

export default RootApp;
