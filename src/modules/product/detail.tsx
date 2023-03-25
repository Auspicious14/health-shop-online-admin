import { Button } from "antd";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { ApTextInput } from "../../components";
import { useProductState } from "./context";
import { IProduct } from "./model";

interface IProps {
  product?: IProduct;
  onDissmiss: () => void;
  onUpdate?: (product: IProduct) => void;
}

const CreateProductPage: React.FC<IProps> = ({ product, onUpdate }) => {
  const { createProduct, loading } = useProductState();
  const router = useRouter();
  const formRef = useRef<FormikProps<any>>();
  const [qty, setQty] = useState<number>();

  const handleCreateProduct = async (values: any) => {
    const res = createProduct(values);
    res
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        // if (onUpdate) onUpdate(product);
      });
  };

  return (
    <div>
      <Formik
        innerRef={formRef as any}
        initialValues={{
          name: product?.name || "",
          // categories: product?.categories.map((cat) => cat) || "",
          quantity: qty || 1,
          description: product?.description || "",
          prices: product?.price,
          color: product?.color,
          size: product?.size,
        }}
        onSubmit={handleCreateProduct}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <ApTextInput
              name="name"
              type="text"
              placeHolder="Nike Air MAx"
              label="Name"
            />
            <ApTextInput
              name="description"
              type="textarea"
              placeHolder="Nike Air MAx"
              label="Description"
            />
            <ApTextInput
              name="quantity"
              type="number"
              placeHolder="3"
              label="Quantity"
            />
            <ApTextInput
              name="price"
              type="number"
              placeHolder="9000"
              label="Price"
            />
            <Button htmlType="submit" type="default">
              create
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductPage;
