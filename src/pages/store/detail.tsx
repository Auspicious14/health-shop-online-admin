import React from "react";

import jwt from "jsonwebtoken";
import { apiReqHandler } from "../../components";
import { StoreDetailPage } from "../../modules/store/detail";
import { StoreLayout } from "../../modules/store/layout";
import { IStore } from "../../modules/store/model";

const tokenSecret: any = process.env.JWT_SECRET;

interface IProps {
  user: { id: string; isAdmin: boolean };
  store: IStore;
}
const StoreDetail: React.FC<IProps> = ({ user, store }) => {
  return (
    <StoreLayout userId={user.id}>
      <StoreDetailPage store={store} />
    </StoreLayout>
  );
};

export default StoreDetail;

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
  const data = await apiReqHandler({
    endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store/${token.id}`,
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
