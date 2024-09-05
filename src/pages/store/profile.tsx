import React from "react";
import jwt from "jsonwebtoken";
import { StoreLayoutV2 } from "../../modules/store/layout/layout";
import { ResetPasswordContextProvider } from "../../modules/auth/resetPassword/context";
import { ProfileContextProvider } from "../../modules/profile/context";
import { ProfilePage } from "../../modules/profile/page";

const tokenSecret: any = process.env.JWT_SECRET;
interface IProps {
  user: { id: string; isAdmin: boolean };
}

const Profile: React.FC<IProps> = ({ user }) => {
  return (
    <ProfileContextProvider>
      <ResetPasswordContextProvider>
        <StoreLayoutV2 userId={user.id}>
          <ProfilePage />
        </StoreLayoutV2>
      </ResetPasswordContextProvider>
    </ProfileContextProvider>
  );
};
export default Profile;

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

  if (token?.isAdmin) {
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
