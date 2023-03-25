import React from "react";
import { SignInContextProvider } from "../../modules/auth/login/context";
import { SignInPage } from "../../modules/auth/login/page";

const Login = () => {
  return (
    <SignInContextProvider>
      <SignInPage />
    </SignInContextProvider>
  );
};

export default Login;
