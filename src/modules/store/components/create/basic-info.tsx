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
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ApTextInput
          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all"
          label="First Name"
          name="firstName"
          type="text"
          placeHolder="First Name"
        />
        <ApTextInput
          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all"
          label="Last Name"
          name="lastName"
          type="text"
          placeHolder="Last Name"
        />
      </div>

      <ApTextInput
        className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all"
        label="Email"
        name="email"
        type="email"
        placeHolder="Username"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ApTextInput
          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all"
          label="Password"
          name="password"
          type="password"
          placeHolder="At least 8 characters"
          helperText="Must contain: uppercase, lowercase, number, and special character"
        />
        <ApTextInput
          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeHolder="Re-enter your password"
        />
      </div>

      <StoreFormRoute onNext={handleNext} />
    </div>
  );
};
