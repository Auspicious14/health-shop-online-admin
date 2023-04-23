import { Button, Card, Space } from "antd";
import { Form, Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { ApTextInput } from "../../components";
import * as Yup from "yup";
import { getCookie } from "../../helper";
import { toast } from "react-toastify";
import { useProfileState } from "./context";
import { IProfile } from "./model";

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string().required("Password is required").min(6),
});

interface IProps {
  profile: IProfile;
}
export const UpdateProfile: React.FC<IProps> = ({ profile }) => {
  const { loading, updateProfile } = useProfileState();
  const formRef = useRef<FormikProps<any>>();

  // useEffect(() => {
  //   getProfile(getCookie("user_id"));
  // }, []);
  const handleSubmit = (values: any) => {
    console.log(values);
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
                <div className="border-b my-2">
                  <p className="font-bold">Personal Info</p>
                  <p>Update your Personal Information here</p>
                </div>
                <div className="w-full flex items-start my-8 border-b gap-48">
                  <p>Name</p>
                  <div className="w-full flex gap-8 items-start">
                    <div className="w-[40%]">
                      <ApTextInput
                        className="relative w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        label=""
                        name="firstName"
                        type="text"
                        placeHolder="First Name"
                      />
                    </div>
                    <div className="w-[40%]">
                      <ApTextInput
                        className="relative  w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        label=""
                        name="lastName"
                        type="text"
                        placeHolder="Last Name"
                      />
                    </div>
                  </div>
                </div>
                <div className=" flex items-start my-8 border-b gap-48">
                  <p>Email</p>
                  <div className="w-[40%]">
                    <ApTextInput
                      className="relative block w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-blue-500 sm:text-sm sm:leading-6"
                      label=""
                      name="email"
                      type="email"
                      placeHolder="email"
                    />
                  </div>
                </div>
                <div className="w-full flex items-start my-8 border-b gap-48">
                  <p>Pasword</p>
                  <div className="w-[40%]">
                    <ApTextInput
                      className="relative block w-full rounded-md border-0 py-1.5 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-blue-500 sm:text-sm sm:leading-6"
                      label=""
                      name="password"
                      type="password"
                      placeHolder="*******"
                    />
                  </div>
                </div>

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
