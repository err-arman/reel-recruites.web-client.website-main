import { ApolloError } from "@apollo/client";
import { showNotification } from "@mantine/notifications";

interface INotification {
  successTitle: string;
  successMessage?: string;

  errorTitle?: string;
  errorMessage?: string;

  onSuccess?: any;
  onFailed?: any;
}

export const Notify = ({
  successTitle,
  successMessage,
  errorTitle,
  errorMessage,
  onSuccess,
  onFailed,
}: INotification) => {
  return {
    onCompleted: (res: any) => {
      onSuccess?.(res);
      showNotification({
        title: successTitle,
        color: "teal",
        message: successMessage,
      });
    },
    onError: (err: ApolloError) => {
      onFailed?.(err);
      showNotification({
        title: errorTitle || err.message,
        color: "red",
        message: errorMessage || err.message,
      });
    },
  };
};
