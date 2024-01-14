import { Button, Space } from "antd";
import React from "react";
import { ApTextInput } from "../../../../components";
import { StoreFormRoute } from "./route";

interface IProps {
  onPrevious: () => void;
  onNext: () => void;
}
export const StorePayment: React.FC<IProps> = ({ onNext, onPrevious }) => {
  return (
    <div>
      <Space className="w-full ">
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Bank Name"
          name="bankName"
          type="text"
          placeHolder="Kuda MFB"
        />
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Account Name"
          name="bankAccountName"
          type="text"
          placeHolder="Your Account Name"
        />
      </Space>
      <Space>
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Account Number"
          name="bankAccountNumber"
          type="text"
          placeHolder="098********"
        />
      </Space>

      <StoreFormRoute onPrevious={onPrevious} />
    </div>
  );
};
