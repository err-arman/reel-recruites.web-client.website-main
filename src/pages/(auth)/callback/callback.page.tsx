import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { Center, Loader, Text, Paper, Title } from "@mantine/core";
import { SSO_LOGIN_MUTATION } from "./utils/query.gql";
import { initiateSSoLogin } from "@/_app/utils/sso-auth";

const CallbackPage = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [ssoLoginMutation] = useMutation(SSO_LOGIN_MUTATION, {
    onCompleted(data) {
      // if (
      //   data.ssoLogin.roles.includes("ADMIN") ||
      //   data.ssoLogin.roles.includes("RECRUITER")
      // ) {
      //   window.location.href = `${import.meta.env.VITE_APP_URL}/direct-login?access-token=${data?.ssoLogin?.accessToken}`;
      //   return;
      // }
      
      localStorage.setItem("accessToken", data.ssoLogin.accessToken);
      
      // Check if there is any redirect url
      const url = new URL(window.location.href);
      const redirect = url.searchParams.get("redirect");
      
      // If there is any redirect url then redirect to that url
      if (redirect) {
        window.location.href = redirect;
      } else {
        window.location.href = "/";
      }
    },
    onError(error) {
      setIsProcessing(false);
      setError("Authentication failed. Please try again.");
      showNotification({
        title: "Authentication Failed",
        message: error.message || "An error occurred during authentication",
        color: "red",
      });
    },
  });

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract token from URL
        const params = new URLSearchParams(location.search);
        const token = params.get("auth_token");

        if (!token) {
          setIsProcessing(false);
          setError("No authentication token received");
          return;
        }

        // Process the token by sending it to your backend
        // The backend will:
        // 1. Validate the token with the SSO server
        // 2. Check if the user exists in the database
        // 3. If not, create a new user with role ADMIN and random password
        // 4. Return an access token for the user
        await ssoLoginMutation({
          variables: {
            input: {
              ssoToken: token,
            },
          },
        });
      } catch (err) {
        setIsProcessing(false);
        setError("Authentication failed. Please try again.");
        console.error("SSO callback error:", err);
      }
    };

    handleCallback();
  }, [location, ssoLoginMutation]);

  if (isProcessing) {
    return (
      <Center style={{ height: "100vh" }}>
        <div className="flex flex-col items-center">
          <Loader size="xl" color="yellow" />
          <Text mt="md">Authenticating, please wait...</Text>
        </div>
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ height: "100vh" }}>
        <Paper shadow="md" p="xl" radius="md" withBorder style={{ maxWidth: 500 }}>
          <Title order={3} ta="center" mb="md" className="text-red-500">
            Authentication Error
          </Title>
          <Text ta="center">{error}</Text>
          <Center mt="xl">
            <button 
              onClick={() => initiateSSoLogin()}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              Back to Login
            </button>
          </Center>
        </Paper>
      </Center>
    );
  }

  return null;
};

export default CallbackPage;
