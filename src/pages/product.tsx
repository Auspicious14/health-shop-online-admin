import React from "react";
import { ProductContextProvider } from "../modules/product/context";
import { ProductPage } from "../modules/product/page";

const Product = () => {
  return (
    <ProductContextProvider>
      <ProductPage />
    </ProductContextProvider>
  );
};

export default Product;
