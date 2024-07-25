import React from "react";
import { ProfileContextProvider } from "../modules/profile/context";
import { ProfilePage } from "../modules/profile/page";
import { ResetPasswordContextProvider } from "../modules/auth/resetPassword/context";
import { MainLayout } from "../modules/layout";
import jwt from "jsonwebtoken";

const tokenSecret: any = process.env.JWT_SECRET;
interface IProps {
  user: { id: string; isAdmin: boolean };
}

const Profile: React.FC<IProps> = ({ user }) => {
  return (
    <ProfileContextProvider>
      <ResetPasswordContextProvider>
        <MainLayout userId={user.id}>
          <ProfilePage />
        </MainLayout>
      </ResetPasswordContextProvider>
    </ProfileContextProvider>
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
    props: {
      user: token,
    },
  };
};
export default Profile;
