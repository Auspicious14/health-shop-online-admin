import React, { useState } from "react";
import { ApFileInput, Files } from "../../../../components";
import { StoreFormRoute } from "./route";

interface IProps {
  idImage?: any;
  storeLogo?: any;
  handleSelectIdImage: (val: any) => void;
  handleSelectStoreLogo: (val: any) => void;
  onPrevious: () => void;
  onNext: () => void;
}
export const StoreIdentity: React.FC<IProps> = ({
  storeLogo,
  idImage,
  handleSelectIdImage,
  handleSelectStoreLogo,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-gray-800">
          Business Documents
        </h1>
        <p className="text-sm py-1"> Upload business documents</p>
        <Files
          // className="w-full md:w-3/4"
          fileList={idImage}
          handleChange={(res: any) => handleSelectIdImage(res)}
        />
      </div>

      <div className="space-y-4 w-full md:w-auto">
        <h1 className="text-lg font-semibold text-gray-800">Store Branding</h1>
        <p className="text-sm py-1"> Upload store logo</p>
        <Files
          fileList={storeLogo}
          handleChange={(res: any) => handleSelectStoreLogo(res)}
        />
      </div>

      <StoreFormRoute onNext={onNext} onPrevious={onPrevious} />
    </div>
  );
};
