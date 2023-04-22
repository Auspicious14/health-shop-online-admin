import { Card, Input } from "antd";
import React, { useState } from "react";
import { SideNav } from "../../components";
import { UpdateProfile } from "./detail";

export const ProfilePage = () => {
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
