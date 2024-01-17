import React from "react";
import { ProfileContextProvider } from "../modules/profile/context";
import { ProfilePage } from "../modules/profile/page";
import { ResetPasswordContextProvider } from "../modules/auth/resetPassword/context";
import { MainLayout } from "../modules/layout";

const Profile = () => {
  return (
    <div>
      <ProfileContextProvider>
        <ResetPasswordContextProvider>
          <MainLayout>
            <ProfilePage />
          </MainLayout>
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
  const parse = JSON.parse(req?.cookies.user_id);
  if (!parse.isAdmin) {
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
