import { Space, Button } from "antd";
import React from "react";

interface IProps {
  onPrevious?: () => void;
  onNext?: () => void;
}
export const StoreFormRoute: React.FC<IProps> = ({ onNext, onPrevious }) => {
  return (
    <Space className="flex justify-between">
      {onPrevious && (
        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={onPrevious}
          className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Back
        </Button>
      )}
      {onNext && (
        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={onNext}
          className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Next
        </Button>
      )}
    </Space>
  );
};
