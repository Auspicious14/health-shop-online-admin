import React from "react";
import { StoreLayout } from "../../modules/store/layout";
import { apiReqHandler } from "../../components";
import jwt from "jsonwebtoken";
import { IStore } from "../../modules/store/model";
import { ChatPage } from "../../modules/chat/page";
import { ChatContextProvider } from "../../modules/chat/context";
import { StoreLayoutV2 } from "../../modules/store/layout/layout";

const tokenSecret: any = process.env.JWT_SECRET;

interface IProps {
  store: { id: string; isAdmin: boolean };
}

const Chat: React.FC<IProps> = ({ store }) => {
  return (
    <StoreLayoutV2 userId={store?.id} className="py-0">
      <ChatContextProvider>
        <ChatPage userId={store?.id} storeId={store?.id} />
      </ChatContextProvider>
    </StoreLayoutV2>
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
      store: token || null,
    },
  };
};
