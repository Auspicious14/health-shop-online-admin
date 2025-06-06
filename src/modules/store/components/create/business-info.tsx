import { Button, Space } from "antd";
import React from "react";
import { ApTextInput } from "../../../../components";
import { StoreFormRoute } from "./route";
import { StoreBusinessSchema } from "./validation";
import { useFormikContext } from "formik";

interface IProps {
  onPrevious: () => void;
  onNext: () => void;
}
export const StoreBusinessInfo: React.FC<IProps> = ({ onNext, onPrevious }) => {
  const { values, submitForm, setErrors, setFieldValue } = useFormikContext();

  const handleNext = async () => {
    StoreBusinessSchema.validate(values, { abortEarly: true })
      .then(() => {
        if (onNext) onNext();
        setErrors({});
      })
      .catch(() => {
        submitForm();
      });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ApTextInput
          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all"
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
      </div>
      <Space className="w-full grid grid-cols-1 md:grid-cols-2 my-4">
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
      <Space className="w-full grid grid-cols-1 md:grid-cols-2 my-4">
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
          placeHolder=""
        />
      </Space>
      <Space className="w-full grid grid-cols-1 md:grid-cols-2 my-4">
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Store Description"
          name="description"
          type="textarea"
          placeHolder=""
        />
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Business Policy / Terms and Condition"
          name="policy"
          type="textarea"
          placeHolder=""
        />
      </Space>
      <StoreFormRoute
        onNext={handleNext}
        onPrevious={onPrevious}
        // className="mt-8"
      />
    </div>
  );
};
