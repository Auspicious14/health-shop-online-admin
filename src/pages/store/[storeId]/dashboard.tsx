import React from "react";
import { StoreDashboardPage } from "../../../modules/store/components/dashboard";
import { AdminStoreLayout } from "../../../modules/store/layout/admin";

const Store = () => {
  return (
    <>
      <AdminStoreLayout>
        <StoreDashboardPage />
      </AdminStoreLayout>
    </>
  );
};
export default Store;
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
  if (!parse?.isAdmin) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  return {
    props: {},
  };
};
