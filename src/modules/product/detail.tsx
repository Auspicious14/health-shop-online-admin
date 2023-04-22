import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Radio, UploadProps } from "antd";
import { Form, Formik, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ApSelectInput, ApTextInput, Files, SideNav } from "../../components";
import { useProductState } from "./context";
import { ICategory, IProduct, IProductImage } from "./model";
import * as Yup from "yup";
import { getCookie } from "../../helper";
import { toast } from "react-toastify";
import { ProductImg } from "./components/img";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.string().required("Product price is required"),
  // price: Yup.string().required("Color is required"),
  categories: Yup.string().required("category is required"),
});
interface IProps {
  product: IProduct;
  onDissmiss?: () => void;
  onUpdate?: (product: IProduct) => void;
}

const CreateProductPage: React.FC<IProps> = ({ product, onUpdate }) => {
  const { createProduct, loading, updateProduct } = useProductState();
  const router = useRouter();
  const formRef = useRef<FormikProps<any>>();
  const [qty, setQty] = useState<number>();
  const [files, setFiles] = useState(null) as any;
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [size, setSize] = useState<string>("");
  const [instock, setInstock] = useState<string>("");

  useEffect(() => {
    if (product?.images && !!product.images.length) {
      setFiles(
        product.images.map((i: any, index: number) => ({
          uri: i.uri,
          name: i.name,
          type: i.type,
          uid: i._id,
          preview: i.uri,
        }))
      );
    }
    console.log(product?.images);
  }, [product]);

  const handleProductImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => {
    console.log(newFileList, "newFIleListt");
    setFiles(newFileList);
  };
  const handleProduct = async (values: any) => {
    const id = getCookie("user_id");
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
          instock: product?.instock || instock,
        },
        product._id
      ).then((res: any) => {
        if (res && onUpdate) onUpdate(res);
      });
    } else {
      createProduct({
        ...values,
        images: files.map((f: any) => ({
          uri: f?.thumbUrl,
          type: f?.type,
          name: f?.name,
        })),
        id,
        categories: values.categories.map((c: any) => c.value),
        size: values.size.value,
        instock,
      }).then((res: any) => {
        if (res && onUpdate) onUpdate(res);
      });
    }
  };
  console.log(files, "filessss");
  return (
    <div>
      <div className="w-full mx-4">
        <Formik
          innerRef={formRef as any}
          validationSchema={FormSchema}
          initialValues={{
            name: product?.name || "",
            categories: product?.categories
              ? product?.categories.map((c) => ({ value: c, label: c }))
              : [{ value: "jack", label: "jack" }],
            quantity: product?.quantity || "",
            description: product?.description || "",
            price: product?.price || "",
            color: product?.color || "",
            size: product?.size.value
              ? product?.size.value
              : { label: "lg", value: "lg" },
            brand: product?.brand || "",
            // soldout: product?.soldout || "",
            // instock: product?.instock || "",
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
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                      ]}
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
                  <Card className="m-3 ">
                    <ApTextInput
                      name="quantity"
                      type="text"
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
                    <Files
                      fileList={files}
                      handleChange={(res: any) => handleProductImage(res)}
                    />
                  </Card>
                  <Card className="m-3 w-full">
                    <h1>Availability</h1>
                    <div className="flex gap-4">
                      <Radio.Group
                        onChange={(e) => setInstock(e.target.value)}
                        value={instock}
                      >
                        <Radio value={"instock"}>Instock</Radio>
                        <Radio value={"soldout"}>Soldout</Radio>
                      </Radio.Group>
                    </div>
                  </Card>
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
