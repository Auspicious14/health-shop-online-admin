import React from "react";
import { ProfileContextProvider } from "../modules/profile/context";
import { ProfilePage } from "../modules/profile/page";

const Profile = () => {
  return (
    <div>
      <ProfileContextProvider>
        <ProfilePage />
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
