import React from "react";
import { ISignIn } from "./model";

interface ISignInState {
  handleSignUp: (user: any) => Promise<void>;
}

const SignInContext = React.createContext<ISignInState>({
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
  const handleSignUp = async (user: ISignIn) => {
    console.log(JSON.stringify(user));
    try {
      const res = await fetch("http://localhost:2000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SignInContext.Provider value={{ handleSignUp }}>
      {children}
    </SignInContext.Provider>
  );
};
