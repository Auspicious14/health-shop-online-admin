import React from "react";
import jwt from "jsonwebtoken";
import { StoreLayout } from "../../modules/store/layout";
import { OrderPage } from "../../modules/order/page";
import { OrderContextProvider } from "../../modules/order/context";
import { StoreLayoutV2 } from "../../modules/store/layout/layout";

const tokenSecret: any = process.env.JWT_SECRET;

interface IProps {
  store: { id: string; isAdmin: boolean };
}
const Category: React.FC<IProps> = ({ store }) => {
  return (
    <StoreLayoutV2 userId={store.id}>
      <OrderContextProvider>
        <OrderPage storeId={store.id} />
      </OrderContextProvider>
    </StoreLayoutV2>
  );
};

export default Category;

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  const cookie = req?.cookies?.token;
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
