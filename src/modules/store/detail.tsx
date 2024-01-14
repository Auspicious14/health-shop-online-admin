import React from "react";
import { IStore } from "./model";
import { Card, Space } from "antd";
import { ApImage, SideNav } from "../../components";

interface IProps {
  store: IStore;
}
export const StoreDetailPage: React.FC<IProps> = ({ store }) => {
  return (
    <div className="flex w-full gap-4">
      <div className="w-[20%] h-screen border ">
        <SideNav store />
      </div>
      <div className="w-[80%]">
        <div className="w-full bg-green-500">
          <ApImage
            alt="store image"
            width={500}
            src={
              store?.images?.length > 0
                ? store?.images[0]?.uri
                : "https://images.pexels.com/photos/1727684/pexels-photo-1727684.jpeg?auto=compress&cs=tinysrgb&w=300"
            }
            className="object-cover w-full"
          />
        </div>
        <div className="p-4">
          <div className="w-full gap-12 flex justify-between">
            <div className="w-1/2 ">
              <p>First Name</p>
              <div className="p-2 border rounded-md">{store?.firstName}</div>
            </div>
            <div className="w-1/2 ">
              <p>Last Name</p>
              <div className="p-2 border rounded-md">{store?.lastName}</div>
            </div>
          </div>
          <div className="w-full gap-12 flex justify-between my-6">
            <div className="w-1/2 ">
              <p>Store Name</p>
              <div className="p-2 border rounded-md">{store?.storeName}</div>
            </div>
            <div className="w-1/2 ">
              <p>Store Email</p>
              <div className="p-2 border rounded-md">{store?.email}</div>
            </div>
          </div>
          <div className="w-full gap-12 flex justify-between my-6">
            <div className="w-1/2 ">
              <p>Store Phone Number</p>
              <div className="p-2 border rounded-md">{store?.phoneNumber}</div>
            </div>
            <div className="w-1/2 ">
              <p>Store WhatsApp Number</p>
              <div className="p-2 border rounded-md">
                {store?.whatsAppNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
