import React from "react";
// import { AiOutlineClose } from "react-icons/ai";
import { ApImage } from "../../../components";
import { IProductImage } from "../model";

interface Image {
  img: IProductImage;
  deleteImage: () => void;
}

export const ProductImg: React.FC<Image> = ({ img, deleteImage }) => {
  return (
    <div>
      <div className="w-40 h-32">
        <ApImage src={img.uri} alt="" className="w-full h-full object-cover" />
      </div>
      <button
        onClick={deleteImage}
        className="bg-sky-600 relative left-32 bottom-36 p-1  rounded-full"
      >
        Delete
      </button>
    </div>
  );
};
