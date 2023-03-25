import React, { useState } from "react";
import { ISignUp } from "./model";

interface ISignUpState {
  loading: boolean;
  handleSignUp: (user: any) => Promise<void>;
}

const SignUpContext = React.createContext<ISignUpState>({
  loading: false,
  handleSignUp(user) {
    return null as any;
  },
});

export const useSignUpState = () => {
  const context = React.useContext(SignUpContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const SignUpContextProvider: React.FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (user: ISignUp) => {
    setLoading(true);
    console.log(JSON.stringify(user));
    try {
      const res = await fetch("http://localhost:2000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      setLoading(false);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SignUpContext.Provider value={{ handleSignUp, loading }}>
      {children}
    </SignUpContext.Provider>
  );
};
