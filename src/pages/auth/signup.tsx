import React from "react";
import { SignUpContextProvider } from "../../modules/auth/signup/context";
import { SignUpPage } from "../../modules/auth/signup/page";

const SignUp = () => {
  return (
    <SignUpContextProvider>
      <SignUpPage />
    </SignUpContextProvider>
  );
};

export default SignUp;
