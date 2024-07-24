import React from "react";
import { BlogContextProvider } from "../modules/blog/context";
import { BlogPage } from "../modules/blog/page";
import jwt from "jsonwebtoken";

const tokenSecret: any = process.env.JWT_SECRET;

const Blog = () => {
  return (
    <div>
      <BlogContextProvider>
        <BlogPage />
      </BlogContextProvider>
    </div>
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
    props: {},
  };
};
