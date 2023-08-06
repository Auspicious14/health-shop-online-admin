import React from "react";
import { CategoryPage } from "../modules/category/page";
import { CategoryContextProvider } from "../modules/category/context";

const Category = () => {
  return (
    <CategoryContextProvider>
      <CategoryPage />
    </CategoryContextProvider>
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
