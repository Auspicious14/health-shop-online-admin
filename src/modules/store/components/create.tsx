import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { ApBackgroundImage, ApTextInput } from "../../../components";
import { useStoreState } from "../context";
import Section from "../../../../public/images/Section.png";
import { Button } from "antd";

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Name is required"),
  storeName: Yup.string().required("Store Name is required"),
  storePhoneNumber: Yup.string().required("Store Phone Number is required"),
  whatsAppNumber: Yup.string().required("WhatsApp Number is required"),
  email: Yup.string().required("email is required").email(),
  password: Yup.string().required("password is required").min(6),
});

export const CreateStorePage = () => {
  const { createStore, loading } = useStoreState();
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    const res = createStore({ accountType: "storeOwner", ...values });
    res.then((rs: any) => {
      if (rs) router.push("/auth/login");
    });
  };
  return (
    <div className="flex justify-between">
      <div className="ml-32 mt-12 w-1/4">
        <h2 className="my-6  text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign up
        </h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            storePhoneNumber: "",
            whatsAppNumber: "",
            storeName: "",
            password: "",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className=" Form card px-4 ">
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="First Name"
                name="firstName"
                type="text"
                placeHolder="First Name"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Last Name"
                name="lastName"
                type="text"
                placeHolder="Last Name"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Store Name"
                name="storeName"
                type="text"
                placeHolder="Store Name"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Store Phone Number"
                name="storePhoneNumber"
                type="number"
                placeHolder="+2347*********"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="WhatsApp Number"
                name="whatsAppNumber"
                type="number"
                placeHolder="+2347*********"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
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
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <ApBackgroundImage src={Section.src} />
      {/* <div className="bg-gray-700  text-left text-gray-100 w-1/2 h-screen">
        <ApImage
          src={Star}
          width={100}
          height={100}
          alt={"star"}
          className="mt-24 mx-12"
        />
        <div className="mx-24 mt-12">
          <span className="text-6xl ">
            Start turning your ideas into reality
          </span>
          <p className="text-[#EAECF0]  mt-12 text-justify">
            Create a free account and get full access to all features for
            30-days. No credit card needed. Get started in 2 minutes.
          </p>
        </div>
        <ApImage
          src={Vector}
          width={300}
          height={300}
          alt={"star"}
          className="relative right-48"
        />
      </div> */}
    </div>
  );
};
