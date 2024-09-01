import Image from "next/image";
import React from "react";
import { IChat } from "../model";
import chatImg from "../../../../public/images/user chat image.webp";
import { ApImage } from "../../../components";
interface IProps {
  message: IChat;
}
export const MessageComponent: React.FC<IProps> = ({ message }) => {
  const date = new Date();
  const hours = new Date((message?.createdAt || date) as string).getHours();
  const minutes = new Date((message?.createdAt || date) as string).getMinutes();

  return (
    <div
      className={`flex items-start gap-4 ${
        message?.senderId === message?.storeId ? "flex-row-reverse" : ""
      }`}
    >
      <Image
        src={chatImg}
        width={31}
        height={31}
        alt="user-image"
        className="rounded-full"
      />
      <div
        className={`p-4 rounded-2xl max-w-[70%] ${
          message?.senderId === message?.storeId
            ? "bg-blue-500 text-white"
            : "bg-blue-300"
        }`}
      >
        <div className="grid grid-cols-2 gap-4 justify-center">
          {message?.images?.length > 0 &&
            message?.images?.map((img, i) => (
              <div key={i}>
                <ApImage
                  src={img?.uri}
                  alt={img?.name}
                  className="obect-cover w-full"
                />
              </div>
            ))}
        </div>
        <small className="block text-xs mt-2 text-right">
          {`${hours}:${minutes} ${hours <= 11 ? "am" : "pm"}`}
        </small>
      </div>
    </div>
  );
};
