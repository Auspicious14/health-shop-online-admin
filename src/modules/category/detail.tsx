import { Button, Card, UploadProps } from "antd";
import { Field, Form, Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { ApSelectInput, ApTextInput, Files } from "../../components";
import { useCategorystate } from "./context";
import * as Yup from "yup";
import { getCookie } from "../../helper";
import { ICategory } from "./model";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
});
interface IProps {
  category: ICategory;
  onUpdate?: () => void;
}

export const CategoryDetail: React.FC<IProps> = ({ category, onUpdate }) => {
  const { createCategory, loading, updateCategory } = useCategorystate();
  const formRef = useRef<FormikProps<any>>();
  const [files, setFiles] = useState(null) as any;

  useEffect(() => {
    if (category?.images && !!category.images.length) {
      setFiles(
        category.images.map((i: any, index: number) => ({
          uri: i.uri,
          name: i.name,
          type: i.type,
          uid: i._id,
          preview: i.uri,
        }))
      );
    }
    console.log(category?.images);
  }, [category]);

  const handleProductImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => {
    console.log(newFileList, "newFIleListt");
    setFiles(newFileList);
  };
  const handleSubmit = async (values: any) => {
    console.log(values);
    const id = getCookie("user_id");
    if (category?._id) {
      updateCategory(
        {
          ...values,
          id,
          images: files.map((f: any) => ({
            uri: f?.uri || f?.thumbUrl,
            type: f?.type,
            name: f?.name,
          })),
        },
        category._id
      ).then((res: any) => {
        if (res && onUpdate) onUpdate();
      });
    } else {
      createCategory({
        ...values,
        images: files?.map((f: any) => ({
          uri: f?.thumbUrl,
          type: f?.type,
          name: f?.name,
        })),
        id,
      }).then((res: any) => {
        console.log(res);
        if (res && onUpdate) onUpdate();
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
            name: category?.name || "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="w-full ">
                <div className="w-full">
                  <Card className="m-3 ">
                    <ApTextInput
                      name="name"
                      type="text"
                      placeHolder="Nike Air MAx"
                      label="Name"
                      className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  </Card>
                </div>
                <div className=" w-full">
                  <Card className="m-3 w-full">
                    <h1>Pictures</h1>
                    <Files
                      fileList={files}
                      handleChange={(res: any) => handleProductImage(res)}
                    />
                  </Card>

                  <Button
                    htmlType="submit"
                    type="primary"
                    className="m-3 bg-blue-600 text-white"
                    loading={loading}
                  >
                    {category?._id ? "Save Changes" : "Add Category"}
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
