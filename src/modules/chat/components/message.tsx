import Image from "next/image";
import React from "react";
import { IChat } from "../model";
import chatImg from "../../../../public/images/unsplash_MU70DTGr7d0.png";
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
        message?.align === "right" ? "flex-row-reverse" : ""
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
          message?.align === "right" ? "bg-blue-500 text-white" : "bg-blue-300"
        }`}
      >
        <p className="text-base leading-5">{message.message}</p>
        <small className="block text-xs mt-2 text-right">
          {`${hours}:${minutes} ${hours <= 11 ? "am" : "pm"}`}
        </small>
      </div>
    </div>
  );
};
