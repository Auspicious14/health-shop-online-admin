import React from "react";
import { getCookie } from "../helper";
import { ProductContextProvider } from "../modules/product/context";
import { ProductPage } from "../modules/product/page";

const Product = () => {
  return (
    <ProductContextProvider>
      <ProductPage />
    </ProductContextProvider>
  );
};

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  console.log(req.cookies, "requesttttt");
  if (!req?.cookies("user_id")) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  // console.log(id);
};
export default Product;
