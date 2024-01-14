import { Button, Space } from "antd";
import React from "react";
import { ApTextInput } from "../../../../components";
import { StoreFormRoute } from "./route";

interface IProps {
  onPrevious: () => void;
  onNext: () => void;
}
export const StoreBusinessInfo: React.FC<IProps> = ({ onNext, onPrevious }) => {
  return (
    <div>
      <Space>
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Store Name"
          name="storeName"
          type="text"
          placeHolder="Store Name"
        />
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Business Reg No"
          name="businessNumber"
          type="text"
          placeHolder="089192929"
        />
      </Space>
      <Space>
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
      </Space>
      <Space>
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Store Address"
          name="storeAddress"
          type="text"
          placeHolder="No 4. John Doe street"
        />
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Store Type"
          name="storeType"
          type="text"
          placeHolder="No 4. John Doe street"
        />
      </Space>
      <ApTextInput
        className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
        label="Business Policy / Terms and Condition"
        name="policy"
        type="textarea"
        placeHolder=""
      />
      <StoreFormRoute onNext={onNext} onPrevious={onPrevious} />
    </div>
  );
};
