import { Button, Space } from "antd";
import React from "react";
import { ApTextInput } from "../../../../components";
import { StoreFormRoute } from "./route";
import { PersonalInfoSchema } from "./validation";
import { useFormikContext } from "formik";

interface IProps {
  onPrevious: () => void;
  onNext: () => void;
}
export const StoreBasicInfo: React.FC<IProps> = ({ onNext, onPrevious }) => {
  const { values, submitForm, setErrors, setFieldValue } = useFormikContext();

  const handleNext = async () => {
    PersonalInfoSchema.validate(values, { abortEarly: true })
      .then(() => {
        if (onNext) onNext();
        setErrors({});
      })
      .catch(() => {
        submitForm();
      });
  };

  return (
    <div>
      <Space className="w-full justify-between">
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
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
      </Space>

      <ApTextInput
        className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
        label="Email"
        name="email"
        type="email"
        placeHolder="Username"
      />
      <Space className="w-full justify-between">
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Password"
          name="password"
          type="password"
          placeHolder="*******"
        />
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeHolder="*******"
        />
      </Space>

      <StoreFormRoute onNext={handleNext} />
    </div>
  );
};
