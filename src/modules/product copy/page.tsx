import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Space, Table, Input, Tag, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ApModal, SideNav } from "../../components";
import CreateProduct from "../../pages/createProduct";
import { ProductListItem } from "./components/listitem";
import { useProfileState } from "./context";
import { IProfile } from "./model";
import { UpdateProfile } from "./detail";
const Search = Input;

export const ProfilePage = () => {
  const { getProfile, profile } = useProfileState();
  const [show, setShow] = useState<{
    show: boolean;
    data?: any;
    type?: "update" | "password";
  }>({
    show: false,
  });

  return (
    <div className="flex w-full gap-4">
      <div className="w-[20%] h-screen border ">
        <SideNav />
      </div>
      <div className="w-[80%] mx-4">
        <div className="shadow-sm p-4 ">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
          </div>
          <div className="flex gap-4">
            <p onClick={() => setShow({ show: true, type: "update" })}>
              Personal Info
            </p>
            <p>Password</p>
          </div>
          <Card>
            <p>Personal Info</p>
            <p>Update your Personal Information here</p>
          </Card>
        </div>

        {show.show && show.type === "update" && <UpdateProfile />}
      </div>
    </div>
  );
};
