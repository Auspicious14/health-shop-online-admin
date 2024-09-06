import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Radio, Select, UploadProps } from "antd";
import { Form, Formik, FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ApCheckbox, ApFileInput, ApTextInput, Files } from "../../components";
import { useBlogState } from "./context";
import { IBlog, IBlogImage } from "./model";
import * as Yup from "yup";
import { getCookie } from "../../helper";
import { toast } from "react-toastify";

const FormSchema = Yup.object().shape({
  title: Yup.string().required("blog name is required"),
  description: Yup.string().required("Description is required"),
});
interface IProps {
  storeId: string;
  blog: IBlog;
  onDissmiss?: () => void;
  onUpdate?: (blog: IBlog) => void;
}

export const CreateBlog: React.FC<IProps> = ({ storeId, blog, onUpdate }) => {
  const { createBlog, loading, updateBlog } = useBlogState();
  const formRef = useRef<FormikProps<any>>();
  const [files, setFiles] = useState<IBlogImage[]>([]);

  useEffect(() => {
    if (blog?.images && !!blog.images.length) {
      setFiles(
        blog.images.map((i: any, index: number) => ({
          uri: i.uri,
          name: i.name,
          type: i.type,
          preview: i.uri,
        }))
      );
    }
  }, [blog]);

  const handleBlogImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => {
    setFiles(newFileList);
  };

  const handleBlog = async (values: any) => {
    if (blog?._id) {
      updateBlog(
        {
          ...values,
          storeId,
          images: files.map((f: any) => ({
            uri: f?.thumbUrl,
            type: f?.type,
            name: f?.name,
          })),
        },
        blog._id
      ).then((res: any) => {
        if (res && onUpdate) onUpdate(res);
      });
    } else {
      createBlog({
        ...values,
        images: files.map((f: any) => ({
          uri: f?.thumbUrl,
          type: f?.type,
          name: f?.name,
        })),
        storeId,
      }).then((res: any) => {
        if (res && onUpdate) onUpdate(res);
      });
    }
  };
  return (
    <div>
      <div className="w-full md:mx-4">
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
              <div className="w-full md:flex justify-between">
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
                    {/* <ApFileInput
                      accept={"image/*"}
                      onSelected={(res: any) => {
                        if (res) {
                          handleBlogImage(res);
                        }
                      }}
                    /> */}
                    <h1>Images</h1>
                    <Files
                      fileList={files}
                      handleChange={(res: any) => handleBlogImage(res)}
                    />
                  </Card>

                  <Button
                    htmlType="submit"
                    type="primary"
                    className="m-3 bg-blue-600 text-white"
                  >
                    {blog?._id ? "Save Changes" : "Add Blog"}
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
