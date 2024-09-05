import { Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { UpdateProfile } from "./detail";
import { useProfileState } from "./context";
import { getCookie } from "../../helper";
import { UpdatePassword } from "./password";

export const ProfilePage = () => {
  const { profile, loading, updateProfile, getProfile } = useProfileState();
  const [show, setShow] = useState<{
    show: boolean;
    data?: any;
    type?: "update" | "password";
  }>({
    show: true,
    type: "update",
  });

  useEffect(() => {
    getProfile(getCookie("user_id"));
  }, []);

  return (
    <>
      <div>
        <div className="p-4">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
          </div>
          <div className="flex gap-4 mt-8 mb-2">
            <p
              className={
                show.show === true && show.type === "update"
                  ? " border-b-black border-b cursor-pointer"
                  : "cursor-pointer"
              }
              onClick={() => setShow({ show: true, type: "update" })}
            >
              Personal Info
            </p>
            <p
              className={
                show.show === true && show.type === "password"
                  ? " border-b border-b-black cursor-pointer"
                  : "cursor-pointer"
              }
              onClick={() => setShow({ show: true, type: "password" })}
            >
              Password
            </p>
          </div>
          {/* <div className="border-b">
            <p>Personal Info</p>
            <p>Update your Personal Information here</p>
          </div> */}
        </div>

        {show.show && show.type === "update" && (
          <UpdateProfile profile={profile} />
        )}
        {show.show && show.type === "password" && <UpdatePassword />}
      </div>
    </>
  );
};
