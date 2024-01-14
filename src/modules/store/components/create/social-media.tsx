import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { StoreFormRoute } from "./route";
import { SocialMediaPlatformSchema } from "./validation";
import { ApTextInput } from "../../../../components";
import { PlusCircleFilled } from "@ant-design/icons";

interface IProps {
  index: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export const SocialMediaDetail: React.FC<IProps> = ({
  onNext,
  onPrevious,
  index,
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
    <div className="-ml-8 w-full">
      <PlusCircleFilled />
      <div className="flex flex-col gap-3 w-72 md:w-full">
        <ApTextInput
          label="Profile URL"
          name={`socialMedia[${index}].link`}
          type="text"
          placeHolder="Enter Profile link"
        />
        <ApTextInput
          label="Profile Name"
          name={`socialMedia[${index}].name`}
          type="text"
          placeHolder="Enter Profile name"
        />
      </div>

      <StoreFormRoute onNext={handleNext} onPrevious={onPrevious} />
    </div>
  );
};
