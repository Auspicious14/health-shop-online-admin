import React from "react";
import { ProfileContextProvider } from "../modules/profile/context";
import { ProfilePage } from "../modules/profile/page";
import { ResetPasswordContextProvider } from "../modules/auth/resetPassword/context";

const Profile = () => {
  return (
    <div>
      <ProfileContextProvider>
        <ResetPasswordContextProvider>
          <ProfilePage />
        </ResetPasswordContextProvider>
      </ProfileContextProvider>
    </div>
  );
};
export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  if (!req?.cookies.user_id) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  // console.log(id);
  return {
    props: {},
  };
};
export default Profile;
