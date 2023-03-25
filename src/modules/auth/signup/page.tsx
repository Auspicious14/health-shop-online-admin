import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { ApTextInput } from "../../../components";
import { useSignUpState } from "./context";
import { ISignUp } from "./model";

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
    res.then((res) => {
      console.log(res);
      router.push("/auth/login");
    });
  };
  return (
    <div>
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
              className="w-full p-4 mb-2 bg-stone-50 border-none"
              label="First Name"
              name="firstName"
              type="text"
              placeHolder="First Name"
            />
            <ApTextInput
              className="w-full p-4 mb-2 bg-stone-50 border-none"
              label="Last Name"
              name="lastName"
              type="text"
              placeHolder="Last Name"
            />
            <ApTextInput
              className="w-full p-4 mb-2 bg-stone-50 border-none"
              label="Email"
              name="email"
              type="email"
              placeHolder="Username"
            />

            <ApTextInput
              className="w-full p-4 mb-2 bg-stone-50 border-none"
              label="Password"
              name="password"
              type="password"
              placeHolder="*******"
            />
            <button
              type="submit"
              className="text-center w-full font-semibold bg-cyan-600 border rounded-md text-base p-2 py-3 text-white  my-2 "
            >
              sign up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
