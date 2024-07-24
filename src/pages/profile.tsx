import React from "react";
import { ProfileContextProvider } from "../modules/profile/context";
import { ProfilePage } from "../modules/profile/page";
import { ResetPasswordContextProvider } from "../modules/auth/resetPassword/context";
import { MainLayout } from "../modules/layout";
import jwt from "jsonwebtoken";

const tokenSecret: any = process.env.JWT_SECRET;

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
  const cookie = req.cookies.token;
  if (!cookie) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  const token: any = jwt.verify(cookie, tokenSecret);

  if (!token?.isAdmin) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default Profile;
