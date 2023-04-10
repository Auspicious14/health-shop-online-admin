import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Radio, Select } from "antd";
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
import { useBlogState } from "./context";
import { IBlog, IBlogImage } from "./model";
import * as Yup from "yup";
import { getCookie } from "../../helper";
import { toast } from "react-toastify";

const FormSchema = Yup.object().shape({
  // name: Yup.string().required("blog name is required"),
  // description: Yup.string().required("Description is required"),
  // price: Yup.string().required("blog price is required"),
  // // price: Yup.string().required("Color is required"),
  // categories: Yup.string().required("category is required"),
});
interface IProps {
  blog: IBlog;
  onDissmiss?: () => void;
  onUpdate?: (blog: IBlog) => void;
}

export const CreateBlog: React.FC<IProps> = ({ blog, onUpdate }) => {
  const { createBlog, loading, updateBlog } = useBlogState();
  const router = useRouter();
  const formRef = useRef<FormikProps<any>>();
  const [files, setFiles] = useState<IBlogImage[]>([]);

  useEffect(() => {
    if (blog?.images && !!blog.images.length) {
      setFiles(
        blog.images.map((i: any, index: number) => ({
          uri: i.uri,
          name: i.name,
          type: i.type,
        }))
      );
    }
  }, [blog]);

  const handleBlogImage = (res: any) => {
    setFiles([
      ...files,
      {
        uri: res[0].uri,
        name: res[0].file.name,
        type: res[0].file.type,
      },
    ]);
  };
  const handleBlog = async (values: any) => {
    const id = getCookie("user_id");
    if (blog?._id) {
      updateBlog({ ...values, id }, blog._id).then((res: any) => {
        console.log(res, "updateeeeeee");
        if (res && onUpdate) onUpdate(res);
      });
    } else {
      createBlog({
        ...values,
        images: files,
        id,
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
            title: blog?.title || "",
            description: blog?.description || "",
          }}
          onSubmit={handleBlog}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="w-full flex justify-between">
                <div className="w-full">
                  <Card className="m-3 ">
                    <ApTextInput
                      name="title"
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
                      className="relative h-48 w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  </Card>
                </div>
                <div className="m-3 w-full">
                  <Card className="m-3 w-full">
                    <ApFileInput
                      accept={"image/*"}
                      onSelected={(res: any) => {
                        if (res) {
                          handleBlogImage(res);
                        }
                      }}
                    />
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
