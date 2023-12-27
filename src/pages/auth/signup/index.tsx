import React from "react";
import { SignUpContextProvider } from "../../../modules/auth/signup/context";
import { SignUpPage } from "../../../modules/auth/signup/page";

const SignUp = () => {
  return (
    <SignUpContextProvider>
      <SignUpPage />
    </SignUpContextProvider>
  );
};

export default SignUp;

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  // if (!req?.cookies.user_id) {
  //   return {
  //     redirect: {
  //       destination: "/auth/login",
  //       permenant: false,
  //     },
  //   };
  // }
  // const
  return {
    props: {},
  };
};
