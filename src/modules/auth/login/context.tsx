import React, { useState } from "react";
import { apiReqHandler } from "../../../components";
import { setCookie } from "../../../helper";
import { ISignIn } from "./model";

interface ISignInState {
  loading: boolean;
  handleSignUp: (user: any) => Promise<void>;
}

const SignInContext = React.createContext<ISignInState>({
  loading: false,
  handleSignUp(user) {
    return null as any;
  },
});

export const useSignInState = () => {
  const context = React.useContext(SignInContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const SignInContextProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (user: ISignIn) => {
    setLoading(true);
    console.log(JSON.stringify(user));
    try {
      const response = await apiReqHandler({
        endPoint: `http://${process.env.NEXT_PUBLIC_API_ROUTE}/auth/login`,
        method: "POST",
        payload: JSON.stringify(user),
      });
      setLoading(false);
      const data = await response.res?.data;
      console.log(data);
      setCookie("user_id", data?.user?._id, 3);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SignInContext.Provider value={{ handleSignUp, loading }}>
      {children}
    </SignInContext.Provider>
  );
};
