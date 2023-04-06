import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Select } from "antd";
import { Form, Formik, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  ApCheckbox,
  ApFileInput,
  ApTextInput,
  SideNav,
} from "../../components";
import { useProductState } from "./context";
import { ICategory, IProduct, IProductImage } from "./model";
import * as Yup from "yup";
import { getCookie } from "../../helper";
import { toast } from "react-toastify";

const FormSchema = Yup.object().shape({
  // name: Yup.string().required("Product name is required"),
  // description: Yup.string().required("Description is required"),
  // price: Yup.string().required("Product price is required"),
  // // price: Yup.string().required("Color is required"),
  // categories: Yup.string().required("category is required"),
});
interface IProps {
  product?: IProduct;
  onDissmiss?: () => void;
  onUpdate?: (product: IProduct) => void;
}

const CreateProductPage: React.FC<IProps> = ({ product, onUpdate }) => {
  const { createProduct, loading } = useProductState();
  const router = useRouter();
  const formRef = useRef<FormikProps<any>>();
  const [qty, setQty] = useState<number>();
  const [files, setFiles] = useState<IProductImage[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    if (product?.images && !!product.images.length) {
      setFiles(
        product.images.map((i: any, index: number) => ({
          uri: i.uri,
          name: i.name,
          type: i.type,
        }))
      );
    }
  }, [product]);

  const handleProductImage = (res: any) => {
    console.log(res);
    setFiles([
      ...files,
      {
        uri: res[0].file.uri,
        name: res[0].file.name,
        type: res[0].file.type,
      },
    ]);
  };
  console.log(files, "before send images");
  const handleCreateProduct = async (values: any) => {
    console.log(values);
    const id = getCookie("user_id");
    if (!id) {
      router.push("/auth/login");
      toast.success("Please log in");
    }
    const res = createProduct({
      ...values,
      images: files,
      id,
      categories: values.categories.map((c: any) => c.value),
      size: values.size.value,
    });
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
      <div className="w-full mx-4">
        <div className="flex justify-end items-center shadow-sm p-4 ">
          {/* <div>
            <h1 className="text-3xl font-bold">Add new product</h1>
          </div> */}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-blue-600 items-center flex"
          >
            Publish now
          </Button>
        </div>
        <Formik
          innerRef={formRef as any}
          validationSchema={FormSchema}
          initialValues={{
            name: product?.name || "",
            categories: [{ label: "", value: "" }],
            quantity: qty || 1,
            description: product?.description || "",
            price: product?.price || "",
            color: product?.color || "",
            size: product?.size || { label: "", value: "" },
            brand: product?.brand || "",
            // rating: product?.rating || NaN
          }}
          onSubmit={handleCreateProduct}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="w-full flex justify-between">
                <div className="w-full">
                  <Card className="m-3 ">
                    <ApTextInput
                      name="name"
                      type="text"
                      placeHolder="Nike Air MAx"
                      label="Name"
                      className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                    <ApTextInput
                      name="description"
                      type="textarea"
                      placeHolder="Nike Air MAx"
                      label="Description"
                      className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  </Card>
                  <Card className="m-3">
                    <div>Categories</div>
                    <Select
                      mode="multiple"
                      allowClear
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                      ]}
                      className="my-4 relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                    <ApTextInput
                      name="brand"
                      type="text"
                      placeHolder="nike"
                      label="Brand"
                      className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                    <ApTextInput
                      name="color"
                      type="text"
                      placeHolder="red"
                      label="Color"
                      className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                    <div>Size</div>
                    <Select
                      allowClear
                      options={[
                        { value: "sm", label: "sm" },
                        { value: "base", label: "base" },
                        { value: "xl", label: "xl" },
                      ]}
                      className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  </Card>
                  <Card className="m-3 ">
                    <ApTextInput
                      name="quantity"
                      type="number"
                      placeHolder="3"
                      label="Quantity"
                      className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  </Card>
                </div>
                <div className="m-3 w-full">
                  <Card className="m-3 ">
                    <ApTextInput
                      name="price"
                      type="number"
                      placeHolder="9000"
                      label="Price"
                      className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  </Card>
                  <Card className="m-3 w-full">
                    <ApFileInput
                      accept={"image/*"}
                      onSelected={(res: any) => {
                        handleProductImage(res);
                      }}
                    />
                  </Card>
                  {/* <Card className="m-3 w-full">
                    <h1>Availability</h1>
                    <div className="flex gap-4">
                      <ApCheckbox
                        name="vvv"
                        label="Soldout"
                        labelClassName="text-sm"
                      />
                      <ApCheckbox
                        name="vvv1"
                        label="In stock"
                        labelClassName="text-sm"
                      />
                      <ApCheckbox
                        name="vvv2"
                        label="Soldout"
                        labelClassName="text-sm"
                      />
                    </div>
                  </Card> */}
                  <Button
                    htmlType="submit"
                    type="primary"
                    className="m-3 bg-blue-600 text-white"
                  >
                    create
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProductPage;
