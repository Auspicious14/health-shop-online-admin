import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { StoreFormRoute } from "./route";
import { SocialMediaPlatformSchema } from "./validation";
import { ApTextInput } from "../../../../components";
import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Space } from "antd";

interface IProps {
  index: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onRemove: (index: number) => void;
  add: React.ReactNode;
}

export const SocialMediaDetail: React.FC<IProps> = ({
  onNext,
  onPrevious,
  index,
  onRemove,
  add,
}) => {
  const { values, submitForm, setErrors, setFieldValue } = useFormikContext();

  // useEffect(() => {
  //   setErrors({});
  //   console.log(
  //     platforms.find((p) => p.label === title)?.value,
  //     "...platforms.find(p=>p.label === title)?.value"
  //   );
  //   setFieldValue(
  //     `socialMediaPlatforms[${index}].platform`,
  //     platforms.find((p) => p.label === title)?.value
  //   );
  // }, []);

  const handleNext = async () => {
    SocialMediaPlatformSchema.validate(values, { abortEarly: true })
      .then(() => {
        if (onNext) onNext();
        setErrors({});
      })
      .catch(() => {
        submitForm();
      });
  };

  return (
    <div className="lg:-ml-8 lg:px-12 w-full">
      <Space className="justify-between w-full mb-4">
        {add && add}
        <MinusCircleFilled
          onClick={() => onRemove(index)}
          className={"text-blue-400 text-2xl cursor-pointer "}
        />
      </Space>
      <div className="flex flex-col gap-3 md:w-full">
        <ApTextInput
          // className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all"
          label="Platform"
          name={`socialMedia[${index}].platform`}
          type="text"
          placeHolder="Enter Profile link"
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
        />
        <ApTextInput
          label="Profile URL"
          name={`socialMedia[${index}].profileLink`}
          type="text"
          placeHolder="Enter Profile link"
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
        />
        <ApTextInput
          label="Profile Name"
          name={`socialMedia[${index}].profileName`}
          type="text"
          placeHolder="Enter Profile name"
          className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
        />
      </div>

      {onNext && <StoreFormRoute onNext={handleNext} onPrevious={onPrevious} />}
    </div>
  );
};

interface ISocialMediaProps {
  socialMediaForm: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export const SocialMedia: React.FC<ISocialMediaProps> = ({
  socialMediaForm,
  onAdd,
  onRemove,
  onNext,
  onPrevious,
}) => {
  return (
    <>
      {socialMediaForm?.map((s, index) => (
        <SocialMediaDetail
          key={index}
          index={index}
          onNext={onNext}
          onPrevious={onPrevious}
          onRemove={() => onRemove(index)}
          add={
            <PlusCircleFilled
              onClick={onAdd}
              className={"text-blue-400 text-2xl cursor-pointer"}
            />
          }
        />
      ))}
    </>
  );
};
