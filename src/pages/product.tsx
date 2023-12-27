import React from "react";
import { getCookie } from "../helper";
import { ProductContextProvider } from "../modules/product/context";
import { ProductPage } from "../modules/product/page";
import { CategoryContextProvider } from "../modules/category/context";

const Product = () => {
  return (
    <ProductContextProvider>
      <CategoryContextProvider>
        <ProductPage />
      </CategoryContextProvider>
    </ProductContextProvider>
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
