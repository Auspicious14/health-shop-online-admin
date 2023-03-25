import React from "react";
import { ProductContextProvider } from "../modules/product/context";
import CreateProductPage from "../modules/product/detail";

const CreateProduct = () => {
  return (
    <ProductContextProvider>
      <CreateProductPage
        product={undefined}
        onDissmiss={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </ProductContextProvider>
  );
};

export default CreateProduct;
