import { Button, Card } from "antd";
import { Form, Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { ApTextInput } from "../../components";
import * as Yup from "yup";
import { getCookie } from "../../helper";
import { toast } from "react-toastify";
import { useProfileState } from "./context";

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required("first name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("email is required").email(),
  password: Yup.string().required("password is required").min(6),
});

export const UpdateProfile = () => {
  const { profile, loading, updateProfile, getProfile } = useProfileState();
  const formRef = useRef<FormikProps<any>>();

  useEffect(() => {
    getProfile(getCookie("user_id"));
  }, []);
  const handleSubmit = (values: any) => {
    const id = getCookie("user_id");
    updateProfile(values, id).then((res: any) => {
      if (res) toast.success("Profile Updated");
    });
  };

  console.log(profile, "profileeeee");
  return (
    <div>
      <div className="w-full mx-4">
        <Formik
          innerRef={formRef as any}
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
