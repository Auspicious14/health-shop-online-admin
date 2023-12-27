import React from "react";
import { SignUpContextProvider } from "../../../modules/auth/signup/context";
import { SignUpPage } from "../../../modules/auth/signup/page";

const GenerateInviteLink = () => {
  return (
    <>
      <SignUpContextProvider>
        <SignUpPage />
      </SignUpContextProvider>
    </>
  );
};

export default GenerateInviteLink;
