import React from "react";
import { StoreDashboardPage } from "../../../modules/store/components/dashboard";
import { AdminStoreLayout } from "../../../modules/store/layout/admin";
import jwt from "jsonwebtoken";

const tokenSecret: any = process.env.JWT_SECRET;

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
  return {
    props: {},
  };
};
