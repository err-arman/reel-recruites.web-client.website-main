import { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  schema: `${process.env.VITE_API}/graphql`,
  // schema: `http://localhost:4001/graphql`,
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/_app/gql-types/": {
      preset: "client",
    },
  },
};

export default config;
