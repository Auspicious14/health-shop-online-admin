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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ApTextInput
          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all"
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
        <ApTextInput
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
          label="Account Number"
          name="bankAccountNumber"
          type="text"
          placeHolder="098********"
        />
      </div>

      <StoreFormRoute onPrevious={onPrevious} />
    </div>
  );
};
