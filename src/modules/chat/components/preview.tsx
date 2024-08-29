import React, { useState } from "react";
import { IFile } from "../model";
import { ApImage } from "../../../components";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/outline";

interface IProps {
  images: IFile[];
}
export const ImagePreviewComponent: React.FC<IProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageModal = (uri: string) => {
    setSelectedImage(uri);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-4 p-4 bg-blue-600 rounded-lg">
        {images?.map((img, i) => (
          <div
            key={i}
            className="cursor-pointer"
            onClick={() => openImageModal(img?.uri)}
          >
            <Image
              src={img?.uri}
              alt={img?.name}
              width={100}
              height={100}
              className="object-cover rounded-lg hover:opacity-80 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
          <div className="relative p-4 max-w-4xl w-full">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={closeModal}
            >
              <XCircleIcon className="h-8 w-8" />
            </button>
            <Image
              src={selectedImage}
              alt="Selected image preview"
              layout="responsive"
              width={1000}
              height={600}
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
