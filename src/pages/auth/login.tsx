import React from "react";
import { getCookie } from "../../helper";
import { SignInContextProvider } from "../../modules/auth/login/context";
import { SignInPage } from "../../modules/auth/login/page";

const Login = () => {
  return (
    <SignInContextProvider>
      <SignInPage />
    </SignInContextProvider>
  );
};

export async function getServerSideProps() {
  const userId = getCookie("user_id");
  if (!userId) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default Login;
