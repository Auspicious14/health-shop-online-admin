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
    <div>
      <div>
        <h1 className="font-bold">Upload Business Documents (CAC)</h1>
        <Files
          fileList={idImage}
          handleChange={(res: any) => handleSelectIdImage(res)}
        />
      </div>

      <div className="mt-8">
        <h1 className="font-bold">Upload Store Logo(s)</h1>
        <Files
          fileList={storeLogo}
          handleChange={(res: any) => handleSelectStoreLogo(res)}
        />
      </div>

      <StoreFormRoute onNext={onNext} onPrevious={onPrevious} />
    </div>
  );
};
