import { getGqlErrorMessage } from "@/_app/utils/gql-errors";
import { gql, useMutation } from "@apollo/client";
import { LoadingOverlay } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const OAUTH_LOGIN = gql`
  mutation OauthLogin($input: OAuthLoginInput!) {
    oauthLogin(input: $input) {
      accessToken
      roles
    }
  }
`;

const OAuthCallback = () => {
  const params = useParams<{ provider: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const [oauthLoginMutation] = useMutation(OAUTH_LOGIN, {
    onCompleted(data) {
      if (
        data.oauthLogin.roles.includes("ADMIN") ||
        data.oauthLogin.roles.includes("RECRUITER")
      ) {
        window.location.href = `https://portal.reel-recruits.com/direct-login?access-token=${data?.getTokenByFirebaseIdToken?.accessToken}`;
        return;
      }
      localStorage.setItem("accessToken", data.oauthLogin.accessToken);

      // check if there is any redirect url
      const url = new URL(window.location.href);
      const redirect = url.searchParams.get("redirect");
      console.log(redirect);

      // if there is any redirect url then redirect to that url
      if (redirect) {
        window.location.href = redirect;
      } else {
        window.location.href = "/";
      }
    },
    onError(error) {
      navigate("/auth/signup");
      showNotification({
        title: getGqlErrorMessage(error),
        message: "",
        color: "red",
      });
    },
  });

  useEffect(() => {
    const _state = JSON.parse(state!);
    const role = _state?.role;
    const isCreateAccount = _state?.isCreateAccount || false;
    oauthLoginMutation({
      variables: {
        input: {
          code,
          provider: params.provider,
          redirect_uri: `${
            import.meta.env.VITE_APP_URL
          }/oauth/linkedin/callback`,
          isCreateAccount,
          role,
        },
      },
    });

    console.log({
      input: {
        code,
        provider: params.provider,
        redirect_uri: `${import.meta.env.VITE_APP_URL}/oauth/linkedin/callback`,
        isCreateAccount,
        role,
      },
    });
  }, [searchParams]);

  return (
    <div>
      <LoadingOverlay
        visible={true}
        overlayProps={{ radius: "sm", blur: 100 }}
      />
    </div>
  );
};

export default OAuthCallback;
