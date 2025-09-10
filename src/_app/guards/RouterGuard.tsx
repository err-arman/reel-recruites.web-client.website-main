import { gql, useQuery } from "@apollo/client";
import { Loader } from "@mantine/core";
import { useAtom } from "jotai";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { User } from "../gql-types/graphql";
import { userAtom } from "../store/user.store";

const ME_QUERY = gql`
  query Me {
    me {
      _id
      email
      name
      roles
      phoneNumber
      avatar {
        path
        provider
      }
    }
  }
`;

export const RouterGuard = () => {
  // get current page url
  const location = useLocation();
  const [_, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const { loading } = useQuery<{ me: User }>(ME_QUERY, {
    onCompleted(data) {
      setUser(data.me);
    },
    onError() {
      navigate(`/auth/signin?redirect=${location.pathname}`);
    },
  });

  if (loading)
    return (
      <div className="grid h-screen place-content-center">
        <Loader color="gray" size={50} />
      </div>
    );

  return <Outlet />;
};
