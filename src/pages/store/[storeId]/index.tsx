import React from "react";
import { StoreDetailPage } from "../../../modules/store/detail";
import { IStore } from "../../../modules/store/model";
import { apiReqHandler } from "../../../components";
import { AdminStoreLayout } from "../../../modules/store/layout/admin";

interface IProps {
  store: IStore;
}
const StoreDetail: React.FC<IProps> = ({ store }) => {
  return (
    <AdminStoreLayout>
      <StoreDetailPage store={store} />
    </AdminStoreLayout>
  );
};

export default StoreDetail;

export const getServerSideProps = async ({ query }: { query: any }) => {
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
