import { Form, Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import { ApTextInput } from "../../../components";
import { useSignInState } from "./context";
import { ISignIn } from "./model";

const FormSchema = Yup.object().shape({
  email: Yup.string().required("email is required").email(),
  password: Yup.string().required("password is required").min(6),
});

export const SignInPage = () => {
  const { handleSignUp } = useSignInState();
  const handleSubmit = async (values: ISignIn) => {
    await handleSignUp(values);
  };
  return (
    <div>
      <Formik
        initialValues={{
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
