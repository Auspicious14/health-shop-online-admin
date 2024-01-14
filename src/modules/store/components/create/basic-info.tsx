import { Button, Space } from "antd";
import React from "react";
import { ApTextInput } from "../../../../components";
import { StoreFormRoute } from "./route";

interface IProps {
  onPrevious: () => void;
  onNext: () => void;
}
export const StoreBasicInfo: React.FC<IProps> = ({ onNext, onPrevious }) => {
  return (
    <div>
      <Space className="w-full ">
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
      <Space>
        <ApTextInput
          className="relative block w-1/3 rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Password"
          name="password"
          type="password"
          placeHolder="*******"
        />
        <ApTextInput
          className="relative block w-1/3 rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeHolder="*******"
        />
      </Space>

      <StoreFormRoute onNext={onNext} />
    </div>
  );
};
