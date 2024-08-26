import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiReqHandler } from "../../components";
import { IChat, IChatPayload, IUserMessageStore } from "./model";

interface IChatState {
  loading: boolean;
  messages: IChat[];
  users: IUserMessageStore[];
  setMessages: (category: IChat[]) => void;
  getMessages: (query?: any) => Promise<void>;
  sendMessage: (payload: IChatPayload) => Promise<any>;
  getUsersWhoMessageStore: (storeId: string) => Promise<any>;
  getMessagesBetweenUserAndStore: () => Promise<any>;
}

const ChatContext = React.createContext<IChatState>({
  loading: false,
  messages: [],
  users: [],
  setMessages(category) {},
  getMessages() {
    return null as any;
  },
  sendMessage(payload) {
    return null as any;
  },
  getUsersWhoMessageStore() {
    return null as any;
  },
  getMessagesBetweenUserAndStore() {
    return null as any;
  },
});

export const useChatState = () => {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const ChatContextProvider: React.FC<IProps> = ({ children }) => {
  const [messages, setMessages] = useState<IChat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUserMessageStore[]>([]);

  const getMessages = async (query?: any) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/chat`,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data;
      setMessages(data.data);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const sendMessage = async (payload: IChatPayload) => {
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/chat`,
        method: "POST",
        payload,
      });
      setLoading(false);
      const data = await res.res?.data;
      console.log(data, "data");
      // setMessages(data.data);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const getUsersWhoMessageStore = async (storeId: string) => {
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store-users-chat?storeId=${storeId}`,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data;
      console.log(data?.data);
      setUsers(data?.data);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };
  const getMessagesBetweenUserAndStore = async () => {
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store-user-messages`,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data;
      console.log(data);
      // setUsers(data.data);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        loading,
        messages,
        users,
        getMessages,
        setMessages,
        sendMessage,
        getUsersWhoMessageStore,
        getMessagesBetweenUserAndStore,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
