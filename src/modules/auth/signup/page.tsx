import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { ApBackgroundImage, ApTextInput } from "../../../components";
import { useSignUpState } from "./context";
import Section from "../../../../public/images/Section.png";
import { Button } from "antd";

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Name is required"),
  email: Yup.string().required("email is required").email(),
  password: Yup.string().required("password is required").min(6),
});

export const SignUpPage = () => {
  const { handleSignUp, loading } = useSignUpState();
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    const res = handleSignUp(values);
    res.then((rs: any) => {
      if (rs.user) router.push("/auth/login");
    });
  };
  return (
    <div className="flex flex-col justify-center lg:flex-row lg:justify-between min-h-screen">
      <div className="lg:w-1/2 w-full p-6 lg:ml-32 lg:mt-16 flex flex-col justify-center items-center lg:block">
        <div className=" mx-4 text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Sign Up
          </h2>
          <p className="text-[#475467] my-2">We're pleased to have you!</p>
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className=" Form card px-4 ">
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                label="First Name"
                name="firstName"
                type="text"
                placeHolder="First Name"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                label="Last Name"
                name="lastName"
                type="text"
                placeHolder="Last Name"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                label="Email"
                name="email"
                type="email"
                placeHolder="Username"
              />

              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                Sign up
              </Button>

              <div className="flex justify-center items-center">
                <span>Already have an account?</span>
                <Button type="link" href={"/auth/login"}>
                  Log in
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="relative lg:w-1/2 w-full h-64 lg:h-auto hidden lg:block font-sans">
        <div
          className="absolute inset-0 bg-cover bg-center flex items-center justify-center text-center p-8"
          style={{
            backgroundImage: "url('/images/vendify-login.webp')",
          }}
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <p className="text-white text-2xl lg:text-5xl relative z-10">
            “Our platform has transformed the way we connect with customers and
            manage multiple stores, making shopping seamless and efficient.”
          </p>
        </div>
      </div>
    </div>
  );
};
