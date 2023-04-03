import React, { useState } from "react";
import { apiReqHandler } from "../../../components";
import { setCookie } from "../../../helper";

interface IResetPasswordState {
  loading: boolean;
  handleResetPassword: (params: any) => Promise<void>;
}

const ResetPasswordContext = React.createContext<IResetPasswordState>({
  loading: false,
  handleResetPassword(params) {
    return null as any;
  },
});

export const useResetPasswordState = () => {
  const context = React.useContext(ResetPasswordContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const ResetPasswordContextProvider: React.FC<IProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPassword = async (params: any) => {
    setLoading(true);
    console.log(JSON.stringify(params));
    try {
      const response = await apiReqHandler({
        endPoint: `http://${process.env.NEXT_PUBLIC_API_ROUTE}/auth/forget`,
        method: "POST",
        payload: JSON.stringify(params),
      });
      setLoading(false);
      const data = await response.res?.data;
      console.log(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ResetPasswordContext.Provider value={{ handleResetPassword, loading }}>
      {children}
    </ResetPasswordContext.Provider>
  );
};
