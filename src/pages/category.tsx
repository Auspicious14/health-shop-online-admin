import React from "react";
import { CategoryPage } from "../modules/category/page";
import { CategoryContextProvider } from "../modules/category/context";
import { MainLayout } from "../modules/layout";

const Category = () => {
  return (
    <MainLayout>
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
  const parse = JSON.parse(req?.cookies.user_id);
  if (!parse.isAdmin) {
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
