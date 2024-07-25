import React from "react";
import { BlogContextProvider } from "../modules/blog/context";
import { BlogPage } from "../modules/blog/page";
import jwt from "jsonwebtoken";
import { MainLayout } from "../modules/layout";

const tokenSecret: any = process.env.JWT_SECRET;

interface IProps {
  user: { id: string; isAdmin: boolean };
}

const Blog: React.FC<IProps> = ({ user }) => {
  return (
    <MainLayout userId={user.id}>
      <BlogContextProvider>
        <BlogPage />
      </BlogContextProvider>
    </MainLayout>
  );
};

export default Blog;

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
