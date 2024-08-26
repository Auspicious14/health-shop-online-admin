import React from "react";
import jwt from "jsonwebtoken";
import { AdminStoreLayout } from "../../../modules/store/layout/admin";
import { ChatPage } from "../../../modules/chat/page";
import { apiReqHandler } from "../../../components";
import { IStore } from "../../../modules/store/model";
import { ChatContextProvider } from "../../../modules/chat/context";

const tokenSecret: any = process.env.JWT_SECRET;

interface IProps {
  user: { id: string; isAdmin: boolean };
  store: IStore;
}

const Chat: React.FC<IProps> = ({ user, store }) => {
  return (
    <AdminStoreLayout userId={user?.id}>
      <ChatContextProvider>
        <ChatPage userId={store?._id} storeId={store?._id} />
      </ChatContextProvider>
    </AdminStoreLayout>
  );
};

export default Chat;

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  const cookie = req?.cookies.token;
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
  const { storeId } = query;
  const data = await apiReqHandler({
    endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store/${storeId}`,
    method: "GET",
  });

  const store = data?.res?.data?.data;
  if (!store) return new Error("No Store found");

  return {
    props: {
      store: store || null,
      user: token || null,
    },
  };
};
