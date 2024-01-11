import React from "react";
import { IStore } from "./model";
import { Card, Space } from "antd";

interface IProps {
  store: IStore;
}
export const StoreDetail: React.FC<IProps> = ({ store }) => {
  return (
    <div>
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
          <div className="p-2 border rounded-md">{store?.whatsAppNumber}</div>
        </div>
      </div>
    </div>
  );
};
