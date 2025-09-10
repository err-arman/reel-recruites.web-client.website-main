import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Paper, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Forgot__Password__Mutation } from "../utils/query.auth";

const ForgetPasswordPage = () => {
  // handle forget password form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
  }>({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().email().required().label("Email"),
      })
    ),
  });

  // forget password mutation
  const [sendRequest, { loading: sending__request }] = useMutation(
    Forgot__Password__Mutation,
    {
      onCompleted: () => {
        showNotification({
          title: "Email has been sent to your email!",
          color: "teal",
          icon: <IconCheck />,
          message: "Please check your email inbox.",
        });
      },
      onError: () => {
        showNotification({
          title: "Failed to send email to you email!",
          message: "Please try again later.",
          color: "red",
          icon: <IconX />,
        });
      },
    }
  );

  const handleOnSubmitForm = ({ email }: { email: string }) => {
    sendRequest({
      variables: {
        input: {
          email,
          clientUrl: import.meta.env.VITE_APP_URL,
        },
      },
    });
  };

  return (
    // <div className='mx-auto my-20 md:w-4/12'>
    <Paper withBorder p={"sm"}>
      <form
        onSubmit={handleSubmit(handleOnSubmitForm)}
        className="flex flex-col gap-2"
      >
        <Input.Wrapper
          label="Email"
          error={<ErrorMessage errors={errors} name="email" />}
        >
          <Input {...register("email")} />
        </Input.Wrapper>

        <Button loading={sending__request} type="submit">
          Continue
        </Button>

        <Text>
          Back to <Link to={"/auth/signin"}>Login</Link>
        </Text>
      </form>
    </Paper>
    // </div>
  );
};

export default ForgetPasswordPage;
