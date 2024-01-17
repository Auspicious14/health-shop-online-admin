import { Button, Card, UploadProps } from "antd";
import { Field, Form, Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { ApSelectInput, ApTextInput, Files } from "../../components";
import { useProductState } from "./context";
import { IProduct } from "./model";
import * as Yup from "yup";
import { getCookie } from "../../helper";
import { useCategorystate } from "../category/context";
import { ICategory } from "../category/model";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.string().required("Product price is required"),
  quantity: Yup.string().required("Quantity is required"),
  color: Yup.string().required("Color is required"),
  brand: Yup.string().required("Brand is required"),
  size: Yup.object().required("Size is required"),
  categories: Yup.array().required("Category is required"),
  availability: Yup.string().required("Choose  availability options"),
});
interface IProps {
  product: IProduct;
  onDissmiss?: () => void;
  onUpdate?: () => void;
  storeId: string;
}

const CreateProductPage: React.FC<IProps> = ({
  product,
  onUpdate,
  storeId,
}) => {
  const { createProduct, loading, updateProduct } = useProductState();
  const { categories, getCategories } = useCategorystate();
  const formRef = useRef<FormikProps<any>>();
  const [files, setFiles] = useState(null) as any;

  useEffect(() => {
    getCategories();
    if (product?.images && !!product.images.length) {
      setFiles(
        product.images.map((i: any, index: number) => ({
          thumbUrl: i.uri,
          name: i.name,
          type: i.type,
          uid: i._id,
          preview: i.uri,
        }))
      );
    }
  }, [product]);

  console.log(categories, "categoriess");

  const handleProductImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => {
    setFiles(newFileList);
  };
  const handleProduct = async (values: any) => {
    const user = JSON.parse(getCookie("user_id"));
    const { id } = user;
    if (product?._id) {
      updateProduct(
        {
          ...values,
          id,
          images: files.map((f: any) => ({
            uri: f?.uri || f?.thumbUrl,
            type: f?.type,
            name: f?.name,
          })),

          categories: values.categories.map((c: any) => c.value),
          size: values?.size.value,
          // instock: product?.instock || instock,
        },
        product._id,
        storeId
      ).then((res: any) => {
        if (res && onUpdate) onUpdate();
      });
    } else {
      createProduct(
        {
          ...values,

          images: files?.map((f: any) => ({
            uri: f?.thumbUrl,
            type: f?.type,
            name: f?.name,
          })),
          id,
          categories: values.categories.map((c: any) => c.value),
          size: values.size.value,
        },
        storeId
      ).then((res: any) => {
        if (res && onUpdate) onUpdate();
      });
    }
  };
  console.log(
    product?.categories?.map((c) => ({
      value: c,
      label: c,
    }))
  );
  return (
    <div>
      <div className="w-full mx-4">
        <Formik
          innerRef={formRef as any}
          validationSchema={FormSchema}
          initialValues={{
            name: product?.name || "",
            categories: product?.categories
              ? product?.categories?.map((c) => ({
                  value: c,
                  label: c,
                }))
              : [{ value: "", label: "" }],
            quantity: product?.quantity || "",
            description: product?.description || "",
            price: product?.price || "",
            color: product?.color || "",
            size: product?.size.value
              ? product?.size.value
              : { label: "lg", value: "lg" },
            brand: product?.brand || "",
            // soldout: product?.soldout || "",
            availability: product?.availability || "",
          }}
          onSubmit={handleProduct}
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
                    <ApSelectInput
                      isMulti
                      name={"categories"}
                      options={categories?.map((c) => ({
                        label: c.name,
                        value: c.name,
                      }))}
                      addOnChange={(val: any) => {
                        console.log(val);
                      }}
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
                    <ApSelectInput
                      name="size"
                      options={[
                        { label: "sm", value: "sm" },
                        { label: "base", value: "base" },
                        { label: "lg", value: "lg" },
                        { label: "xl", value: "xl" },
                      ]}
                      addOnChange={(val: any) => {
                        console.log(val);
                      }}
                      className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  </Card>
                  <Card className="mx-3 ">
                    <ApTextInput
                      name="quantity"
                      type="text"
                      placeHolder="3"
                      label="Quantity"
                      className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  </Card>
                </div>
                <div className=" w-full">
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
                    <h1>Pictures</h1>
                    <Files
                      fileList={files}
                      handleChange={(res: any) => handleProductImage(res)}
                    />
                  </Card>
                  <Card className="m-3 w-full">
                    <h1>Availability</h1>
                    <div className="flex my-4 gap-4">
                      <div className="flex gap-2 items-center">
                        <Field
                          type="radio"
                          value="instock"
                          name="availability"
                          className=" text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        Instock
                      </div>
                      <div className="flex gap-2 items-center">
                        <Field
                          type="radio"
                          value="soldout"
                          name="availability"
                          className=" text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        Soldout
                      </div>
                      <div className="flex gap-2 items-center">
                        <Field
                          type="radio"
                          value="soon"
                          name="availability"
                          className=" text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        Soon
                      </div>
                    </div>
                  </Card>
                  <Button
                    htmlType="submit"
                    type="primary"
                    className="m-3 bg-blue-600 text-white"
                    loading={loading}
                  >
                    {product?._id ? "Save Changes" : "Add Product"}
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
