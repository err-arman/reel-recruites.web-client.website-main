import HCaptcha from "@hcaptcha/react-hcaptcha";
import React from "react";

interface IAppCaptcha {
  onVerify: (token: string) => void;
}

const AppCaptcha: React.FC<IAppCaptcha> = ({ onVerify }) => {
  return (
    <HCaptcha
      sitekey={"9b75a67a-27d7-4f15-8bae-ea1f180d3278"}
      onVerify={(captchaSolutionToken) => {
        console.log({ captchaSolutionToken });
        onVerify(captchaSolutionToken);
      }}
    />
  );
};

export default AppCaptcha;
