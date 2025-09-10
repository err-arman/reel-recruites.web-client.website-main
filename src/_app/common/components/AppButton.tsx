import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

import React, { PropsWithChildren } from "react";

const AppButtonStyles = cva(
  [
    "text-center rounded-md",
    "dark:text-white text-dark hover:text-white dark:hover:text-night-500",
    "transition-all duration-300",
    "border-2 border-solid",
    "disabled:opacity-40 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        sm: "py-1 px-2 text-sm",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-6 text-lg",
      },
      theme: {
        filled: [
          "text-white dark:text-dark",
          "bg-dark dark:bg-white hover:opacity-90",
        ],
        outlined: [
          "border-solid border-dark dark:border-white",
          "hover:bg-dark dark:hover:bg-white",
        ],
      },
    },

    defaultVariants: {
      size: "md",
      theme: "outlined",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof AppButtonStyles> {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  component?: "button" | "a" | "Link";
}

const AppButton: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  size,
  theme,
  leftSection,
  rightSection,
  loading,
  component,
  ...props
}) => {
  if (component === "button" || component === undefined)
    return (
      <button
        {...props}
        disabled={props.disabled || loading}
        className={clsx(AppButtonStyles({ className, size, theme }), {
          "flex items-center justify-center gap-2": leftSection || rightSection,
        })}
      >
        {loading ? (
          <svg
            className="w-5 h-5 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx={12}
              cy={12}
              r={10}
              stroke="currentColor"
              strokeWidth={4}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}

        {leftSection && !loading ? leftSection : null}
        <p className="p-0 m-0">{props.children}</p>
        {rightSection && !loading ? rightSection : null}
      </button>
    );
};

export default AppButton;
