import { Button, Card, Space } from "antd";
import { Form, Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { ApTextInput } from "../../components";
import * as Yup from "yup";
import { getCookie } from "../../helper";
import { toast } from "react-toastify";
import { useProfileState } from "./context";
import { IProfile } from "./model";
import { useResetPasswordState } from "../auth/resetPassword/context";

const FormSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required").min(6),
  newPassword: Yup.string().required("New Password is required").min(6),
  confirmNewPassword: Yup.string()
    .required("confirm New Password is required")
    .min(6)
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

export const UpdatePassword = () => {
  const { handleUpdatePassword, loading } = useResetPasswordState();
  const formRef = useRef<FormikProps<any>>();

  const handleSubmit = (values: any) => {
    console.log(values);
    const { confirmNewPassword, ...otherValues } = values;
    const id = getCookie("user_id");
    handleUpdatePassword({ ...otherValues, id }).then((res: any) => {});
  };

  return (
    <div>
      <div className="w-full mx-4">
        <Formik
          innerRef={formRef as any}
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className=" Form card px-4 ">
              <Card>
                <div className="border-b my-2">
                  <p className="font-bold">Password</p>
                  <p>
                    Please enter your current password to change your password
                  </p>
                </div>

                <ApTextInput
                  className="relative block w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-blue-500 sm:text-sm sm:leading-6"
                  label="Old Password"
                  name="oldPassword"
                  type="password"
                  placeHolder="*******"
                />
                <ApTextInput
                  className="relative block w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-blue-500 sm:text-sm sm:leading-6"
                  label="New Password"
                  name="newPassword"
                  type="password"
                  placeHolder="*******"
                />
                <ApTextInput
                  className="relative block w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-blue-500 sm:text-sm sm:leading-6"
                  label="Confirm New Password"
                  name="confirmNewPassword"
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
