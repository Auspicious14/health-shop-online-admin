import React from "react";
import { CategoryPage } from "../modules/category/page";
import { CategoryContextProvider } from "../modules/category/context";
import { MainLayout } from "../modules/layout";
import jwt from "jsonwebtoken";

const tokenSecret: any = process.env.JWT_SECRET;
interface IProps {
  user: { id: string; isAdmin: boolean };
}

const Category: React.FC<IProps> = ({ user }) => {
  return (
    <MainLayout userId={user.id}>
      <CategoryContextProvider>
        <CategoryPage />
      </CategoryContextProvider>
    </MainLayout>
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
