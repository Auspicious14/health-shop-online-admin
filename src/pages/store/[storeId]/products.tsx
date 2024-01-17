import React from "react";
import { AdminStoreLayout } from "../../../modules/store/layout/admin";
import { ProductPage } from "../../../modules/product/page";

const StoreAdminProduct = () => {
  return (
    <AdminStoreLayout>
      <ProductPage />
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
  const cookie = req?.cookies?.user_id;
  let parse;
  if (cookie) {
    parse = JSON?.parse(req?.cookies.user_id);
  }
  if (parse?.isAdmin) {
    return {
      redirect: {
        destination: "/",
        permenant: false,
      },
    };
  }
  return {
    props: {},
  };
};
