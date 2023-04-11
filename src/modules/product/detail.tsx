import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Radio, Select, UploadProps } from "antd";
import { Form, Formik, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import {
  ApCheckbox,
  ApFileInput,
  ApTextInput,
  Files,
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
  product: IProduct;
  onDissmiss?: () => void;
  onUpdate?: (product: IProduct) => void;
}

const CreateProductPage: React.FC<IProps> = ({ product, onUpdate }) => {
  const { createProduct, loading, updateProduct } = useProductState();
  const router = useRouter();
  const formRef = useRef<FormikProps<any>>();
  const [qty, setQty] = useState<number>();
  const [files, setFiles] = useState<IProductImage[]>([]) as any;
  const [categories, setCategories] = useState<string[]>([]);
  const [size, setSize] = useState<string>("");
  const [instock, setInstock] = useState<string>("");

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

  const handleProductImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => {
    console.log(newFileList);
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
            uri: f?.thumbUrl,
            type: f?.type,
            name: f?.name,
          })),
          categories,
          size,
          instock,
        },
        product._id
      ).then((res: any) => {
        console.log(res, "updateeeeeee");
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
        categories,
        size,
        instock,
      }).then((res: any) => {
        console.log(res, "responseeeeeee");
        if (res && onUpdate) onUpdate(res);
      });
    }
  };

  return (
    <div>
      <div className="w-full mx-4">
        <Formik
          innerRef={formRef as any}
          validationSchema={FormSchema}
          initialValues={{
            name: product?.name || "",
            categories: product?.categories || categories,
            quantity: product?.quantity || "",
            description: product?.description || "",
            price: product?.price || "",
            color: product?.color || "",
            size: product?.size || size,
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
                    <Select
                      mode="multiple"
                      onChange={(value: string[]) => setCategories(value)}
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
                      onChange={(value: string) => setSize(value)}
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
                    {/* <ApFileInput
                      accept={"image/*"}
                      onSelected={(res: any) => {
                        if (res) {
                          handleProductImage(res);
                        }
                      }}
                    /> */}
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
