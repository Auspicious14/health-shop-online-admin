import React from "react";
import { AdminStoreLayout } from "../../../modules/store/layout/admin";
import { ProductPage } from "../../../modules/product/page";
import { apiReqHandler } from "../../../components";
import { IStore } from "../../../modules/store/model";
import jwt from "jsonwebtoken";

const tokenSecret: any = process.env.JWT_SECRET;
interface IProps {
  store: IStore;
}
const StoreAdminProduct: React.FC<IProps> = ({ store }) => {
  return (
    <AdminStoreLayout>
      <ProductPage storeId={store?._id} />
    </AdminStoreLayout>
  );
};

export default StoreAdminProduct;

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
    },
  };
};
