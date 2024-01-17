import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import React, { useEffect } from "react";
import * as Yup from "yup";
import {
  ApBackgroundImage,
  ApSelectInput,
  ApTextInput,
} from "../../../components";
import { useSignInState } from "./context";
import { ISignIn } from "./model";
import { Button } from "antd";
import Vector from "../../../../public/images/unsplash_MU70DTGr7d0.png";
import { toast } from "react-toastify";

const FormSchema = Yup.object().shape({
  email: Yup.string().required("email is required").email(),
  password: Yup.string().required("password is required").min(6),
  accountType: Yup.object().shape({
    value: Yup.string().required("Account Type is required"),
  }),
});

export const SignInPage = () => {
  const router = useRouter();
  const { handleSignIn, loading } = useSignInState();
  const handleSubmit = async (values: any) => {
    const res = handleSignIn({
      accountType: values.accountType.value,
      email: values.email,
      password: values.password,
    });

    // If user is not admin and user is not accepted, do not login
    res.then((rs: any) => {
      console.log(rs.user);
      if (rs.user !== undefined) {
        if (rs?.user?.isAdmin === false) {
          router.push("/store");
        }
        router.push("/");
      }
    });
    console.log(values);
  };

  return (
    <div className="flex justify-between">
      <div className="ml-32 mt-24 w-1/4">
        <div className="my-6 mx-4 text-left">
          <h2 className=" text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>
          <p className="text-[#475467] my-2">
            Welcome back! Please enter your details.
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
            accountType: [{ label: "Admin", value: "admin" }] || [
              { label: "Admin", value: "admin" },
            ],
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className=" Form card px-4 ">
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                label="Email"
                name="email"
                type="email"
                placeHolder="Username"
              />

              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                label="Password"
                name="password"
                type="password"
                placeHolder="*******"
              />
              <ApSelectInput
                name="accountType"
                options={[
                  { label: "Admin", value: "Admin" },
                  { label: "Store", value: "storeOwner" },
                  { label: "User", value: "user" },
                ]}
              />
              <div className="flex justify-end text-sm">
                <Button type="link" href={"/auth/forgetpassword"}>
                  Forgot your password?
                </Button>
              </div>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Sign in
              </Button>
              <div className="flex justify-center items-center">
                <span>{"Don't have an account?"}</span>
                <Button type="link" href={"/auth/signup"}>
                  Sign up
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ApBackgroundImage
        src={Vector.src}
        className={"text-white text-5xl text-justify px-8"}
      >
        “We’ve been using Untitled to kick start every new project and can’t
        imagine working without it.”
      </ApBackgroundImage>
    </div>
  );
};
