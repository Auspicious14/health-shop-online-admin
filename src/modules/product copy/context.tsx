import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiReqHandler } from "../../components";
import { getCookie } from "../../helper";
import { IProfile } from "./model";

interface IProfileState {
  loading: boolean;
  profile: IProfile;
  getProfile: (id?: string) => Promise<void>;
  updateProfile: (payload: IProfile, id: string) => Promise<void>;
}

const ProfileContext = React.createContext<IProfileState>({
  loading: false,
  profile: {} as any,
  getProfile() {
    return null as any;
  },

  updateProfile(payload, profileId) {
    return null as any;
  },
});

export const useProfileState = () => {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const ProfileContextProvider: React.FC<IProps> = ({ children }) => {
  const [profile, setProfile] = useState<IProfile>() as any;
  const [loading, setLoading] = useState<boolean>(false);

  const getProfile = async (id?: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/user/${id}`,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data.user;
      setProfile(data);
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (payload: IProfile, id: string) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/update/${id}}`,
        method: "POST",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.res?.data.data;
      if (res.res?.status !== 200) {
        toast.error("Error");
      }
      setProfile(data);

      return data;
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        loading,
        profile,
        getProfile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
