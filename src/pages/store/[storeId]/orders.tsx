import React from "react";
import { AdminStoreLayout } from "../../../modules/store/layout/admin";
import { OrderPage } from "../../../modules/order/page";
import { apiReqHandler } from "../../../components";
import { IStore } from "../../../modules/store/model";

interface IProps {
  store: IStore;
}
const StoreAdminOrder: React.FC<IProps> = ({ store }) => {
  return (
    <>
      <AdminStoreLayout>
        <OrderPage storeId={store?._id} />
      </AdminStoreLayout>
    </>
  );
};

export default StoreAdminOrder;

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  const { storeId } = query;
  const data = await apiReqHandler({
    endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store/${storeId}`,
    method: "GET",
  });

  const store = data?.res?.data?.data;
  if (!store) return new Error("No Store found");

  const cookie = req?.cookies?.user_id;
  let parse;
  if (cookie) {
    parse = JSON?.parse(req?.cookies.user_id);
  }

  if (!parse?.isAdmin) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }

  return {
    props: {
      store: store || null,
    },
  };
};
