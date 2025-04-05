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
  storeId?: string;
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

  const handleProductImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => {
    setFiles(newFileList);
  };
  const handleProduct = async (values: any) => {
    if (product?._id) {
      updateProduct(
        {
          ...values,
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
          categories: values.categories.map((c: any) => c.value),
          size: values.size.value,
        },
        storeId
      ).then((res: any) => {
        if (res && onUpdate) onUpdate();
      });
    }
  };

  return (
    <div className="w-full px-4">
      <Formik
        innerRef={formRef as any}
        validationSchema={FormSchema}
        initialValues={{
          name: product?.name || "",
          categories: product?.categories
            ? product?.categories?.map((c) => ({
                value: c.name,
                label: c.name,
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
          availability: product?.availability || "",
        }}
        onSubmit={handleProduct}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <Card className="m-3">
                  <ApTextInput
                    name="name"
                    type="text"
                    placeHolder="Nike Air Max"
                    label="Name"
                    className="block w-full rounded-md py-1.5 px-2 border ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  <ApTextInput
                    name="description"
                    type="textarea"
                    placeHolder="Nike Air Max"
                    label="Description"
                    className="block w-full rounded-md py-1.5 px-2 border ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </Card>
                <Card className="m-3">
                  <div>Categories</div>
                  <ApSelectInput
                    isMulti
                    name="categories"
                    options={categories?.map((c) => ({
                      label: c.name,
                      value: c.name,
                    }))}
                  />
                  <ApTextInput
                    name="brand"
                    type="text"
                    placeHolder="Nike"
                    label="Brand"
                    className="block w-full rounded-md py-1.5 px-2 border ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  <ApTextInput
                    name="color"
                    type="text"
                    placeHolder="Red"
                    label="Color"
                    className="block w-full rounded-md py-1.5 px-2 border ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                  />
                </Card>
                <Card className="m-3">
                  <ApTextInput
                    name="quantity"
                    type="text"
                    placeHolder="3"
                    label="Quantity"
                    className="block w-full rounded-md py-1.5 px-2 border ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </Card>
              </div>
              <div className="w-full">
                <Card className="m-3">
                  <ApTextInput
                    name="price"
                    type="number"
                    placeHolder="9000"
                    label="Price"
                    className="block w-full rounded-md py-1.5 px-2 border ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </Card>
                <Card className="m-3">
                  <h1>Pictures</h1>
                  <Files
                    fileList={files}
                    handleChange={(res: any) => handleProductImage(res)}
                  />
                </Card>
                <Card className="m-3">
                  <h1>Availability</h1>
                  <div className="flex my-4 gap-4">
                    <div className="flex gap-2 items-center">
                      <Field
                        type="radio"
                        value="instock"
                        name="availability"
                        className="text-blue-600"
                      />
                      Instock
                    </div>
                    <div className="flex gap-2 items-center">
                      <Field
                        type="radio"
                        value="soldout"
                        name="availability"
                        className="text-blue-600"
                      />
                      Soldout
                    </div>
                    <div className="flex gap-2 items-center">
                      <Field
                        type="radio"
                        value="soon"
                        name="availability"
                        className="text-blue-600"
                      />
                      Soon
                    </div>
                  </div>
                </Card>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="m-3 w-full bg-blue-600 text-white"
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
  );
};

export default CreateProductPage;
