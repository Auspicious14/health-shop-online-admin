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

export default Blog;
