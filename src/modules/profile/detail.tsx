import { Button, Card, Space } from "antd";
import { Form, Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { ApTextInput } from "../../components";
import * as Yup from "yup";
import { getCookie } from "../../helper";
import { toast } from "react-toastify";
import { useProfileState } from "./context";
import { IProfile, IUpdateProfile } from "./model";

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
  const formRef = useRef<FormikProps<IUpdateProfile>>(null);

  const handleSubmit = (values: any) => {
    console.log(values);
    const id = getCookie("user_id");
    updateProfile(values, id).then((res: any) => {
      if (res) toast.success("Profile Updated");
    });
  };

  return (
    <div>
      <div className="w-full sm:mx-8 lg:mx-auto lg:w-3/4 xl:w-2/3">
        <Formik
          innerRef={formRef}
          initialValues={{
            firstName: profile?.firstName || "",
            lastName: profile?.lastName || "",
            email: profile?.email || "",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className="Form card md:px-4">
              <Card>
                <div className="border-b my-2">
                  <p className="font-bold text-lg sm:text-xl">Personal Info</p>
                  <p className="text-sm sm:text-base">
                    Update your Personal Information here
                  </p>
                </div>

                <div className="w-full flex flex-col sm:flex-row items-start my-8 border-b gap-8 sm:gap-48">
                  <p>Name</p>
                  <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                    <div className="w-full sm:w-[40%]">
                      <ApTextInput
                        className="w-full rounded-md py-1.5 px-2 outline-blue-500 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm"
                        label=""
                        name="firstName"
                        type="text"
                        placeHolder="First Name"
                      />
                    </div>
                    <div className="w-full sm:w-[40%]">
                      <ApTextInput
                        className="w-full rounded-md py-1.5 px-2 outline-blue-500 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm"
                        label=""
                        name="lastName"
                        type="text"
                        placeHolder="Last Name"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row items-start my-8 border-b gap-8 sm:gap-48">
                  <p>Email</p>
                  <div className="w-full sm:w-[40%]">
                    <ApTextInput
                      className="w-full rounded-md py-1.5 px-2 outline-blue-500 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm"
                      label=""
                      name="email"
                      type="email"
                      placeHolder="Email"
                    />
                  </div>
                </div>

                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={loading}
                  className="flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
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
