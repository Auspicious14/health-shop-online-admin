import React from "react";
import { StoreDashboardPage } from "../../modules/store/components/dashboard";
import jwt from "jsonwebtoken";
import { StoreLayout } from "../../modules/store/layout";

const tokenSecret: any = process.env.JWT_SECRET;
interface IProps {
  store: { id: string; isAdmin: boolean };
}
const Store: React.FC<IProps> = ({ store }) => {
  return (
    <StoreLayout userId={store.id}>
      <StoreDashboardPage />
    </StoreLayout>
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
  if (!token) {
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
