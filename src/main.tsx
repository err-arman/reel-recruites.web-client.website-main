import { ApolloProvider } from "@apollo/client";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import RootApp from "./RootApp.tsx";
import { apolloClient } from "./_app/clients/apollo.client.ts";
import "./styles/app.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <RootApp />
    </ApolloProvider>
  </React.StrictMode>
);
