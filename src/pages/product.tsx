import React from "react";
import { ProductPage } from "../modules/product/page";
import { MainLayout } from "../modules/layout";
import jwt from "jsonwebtoken";

const tokenSecret: any = process.env.JWT_SECRET;
interface IProps {
  user: { id: string; isAdmin: boolean };
}

const Product: React.FC<IProps> = ({ user }) => {
  return (
    <MainLayout userId={user.id}>
      <ProductPage />
    </MainLayout>
  );
};

export default Product;
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

  if (!token?.isAdmin) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }

  return {
    props: {
      user: token,
    },
  };
};
