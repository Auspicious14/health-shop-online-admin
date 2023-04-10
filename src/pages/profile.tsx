import React from "react";
import { ProfileContextProvider } from "../modules/product copy/context";
import { ProfilePage } from "../modules/product copy/page";

const Profile = () => {
  return (
    <div>
      <ProfileContextProvider>
        <ProfilePage />
      </ProfileContextProvider>
    </div>
  );
};

export default Profile;
