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
import * as Yup from "yup";
import { getCookie } from "../../helper";
import { toast } from "react-toastify";
import { IProfile } from "./model";
import { useProfileState } from "./context";

const FormSchema = Yup.object().shape({
  // name: Yup.string().required("Product name is required"),
  // description: Yup.string().required("Description is required"),
  // price: Yup.string().required("Product price is required"),
  // // price: Yup.string().required("Color is required"),
  // categories: Yup.string().required("category is required"),
});
interface IProps {
  product?: IProfile;
  onDissmiss?: () => void;
  onUpdate?: (product: IProfile) => void;
}

export const UpdateProfile: React.FC<IProps> = ({ product, onUpdate }) => {
  const { profile, loading, updateProfile, getProfile } = useProfileState();
  const router = useRouter();
  const formRef = useRef<FormikProps<any>>();

  useEffect(() => {
    getProfile(getCookie("user_id"));
  }, []);
  const handleSubmit = (values: any) => {
    console.log(values);
    const id = getCookie("user_id");
    updateProfile(values, id).then((res) => console.log(res));
  };

  console.log(profile, "profileeeee");
  return (
    <div>
      <div className="w-full mx-4">
        <Formik
          initialValues={{
            firstName: profile?.firstName || "",
            lastName: profile?.lastName || "",
            email: profile?.email || "",
            password: "",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className=" Form card px-4 ">
              <Card>
                <Card
                  // className="w-full flex justify-between"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ApTextInput
                    className="relative w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeHolder="First Name"
                  />
                  <ApTextInput
                    className="relative  w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeHolder="Last Name"
                  />
                </Card>
                <ApTextInput
                  className="relative block w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-blue-500 sm:text-sm sm:leading-6"
                  label="Email"
                  name="email"
                  type="email"
                  placeHolder="Username"
                />

                <ApTextInput
                  className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                  label="Password"
                  name="password"
                  type="password"
                  placeHolder="*******"
                />

                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={loading}
                  className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
                >
                  Save
                </Button>
              </Card>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
