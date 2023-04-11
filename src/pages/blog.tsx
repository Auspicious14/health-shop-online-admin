import React from "react";
import { BlogContextProvider } from "../modules/blog/context";
import { BlogPage } from "../modules/blog/page";

const Blog = () => {
  return (
    <div>
      <BlogContextProvider>
        <BlogPage />
      </BlogContextProvider>
    </div>
  );
};

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  if (!req?.cookies.user_id) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  // console.log(id);
  return {
    props: {},
  };
};
export default Blog;
