import { EyeInvisibleFilled, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Tooltip, Avatar } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { ApModal } from "../modal";
import { NavItems } from "./items";
import { toast } from "react-toastify";
import { useSignUpState } from "../../modules/auth/signup/context";
import { deleteCookie } from "../../helper";
import { useRouter } from "next/router";
import { useProfileState } from "../../modules/profile/context";
import { routePaths } from "./path";

interface IActionProps {
  admin?: boolean;
  storeAdmin?: boolean;
}

export const ActionButtons: React.FC<IActionProps> = ({
  admin,
  storeAdmin,
}) => {
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });

  return <>{admin && <InviteLink />}</>;
};

const InviteLink = () => {
  const { generateInviteLink } = useSignUpState();
  const [link, setLink] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/store/register/${link}`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Copied"));
  };

  useEffect(() => {
    generateInviteLink().then((res: any) => {
      setLink(res?.data?.inviteCode);
    });
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold">Copy the invite link below</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center my-2 mt-6">
        <div className="w-full sm:w-[70%] p-2 bg-gray-100 border rounded-md flex justify-between items-center">
          {show ? inviteLink : "********************"}
          <EyeInvisibleFilled
            className="text-gray-500 cursor-pointer"
            onClick={() => setShow(!show)}
          />
        </div>
        <Button
          className="bg-blue-700 text-white mt-4 sm:mt-0 sm:ml-2"
          onClick={handleCopy}
        >
          Copy
        </Button>
      </div>
    </>
  );
};

interface IProps {
  userId: string;
  navItem: any;
  center?: React.ReactNode;
  collapsed?: boolean;
}

export const NavBarComponent: React.FC<IProps> = ({
  userId,
  navItem,
  center,
  collapsed,
}) => {
  const { profile, getProfile } = useProfileState();
  const { AdminMenuItem } = NavItems();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });
  const router = useRouter();

  useEffect(() => {
    if (userId) getProfile(userId);
  }, [userId]);

  const handleSignOut = () => {
    if (userId) {
      deleteCookie("token", -1);
      router.push("/auth/login");
    }
  };

  return (
    <div className="bg-white h-full">
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
        items={navItem}
      />
      {center && <ActionButtons admin />}
      <div className="fixed bottom-28 right-0 left-4 flex justify-center items-center">
        <Menu mode="inline" theme="light">
          <div className="flex flex-col items-center gap-4">
            {routePaths.includes(router.asPath) && (
              <Button
                onClick={() => setModal({ show: true })}
                className="bg-blue-700 text-white w-full mb-6"
              >
                Invite Link
              </Button>
            )}
            <Link href={"/profile"}>
              <div className="flex gap-4 items-center">
                <Tooltip title={profile?.firstName} placement="top">
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    style={{
                      backgroundColor: "#87d068",
                      width: "30px",
                      height: "30px",
                    }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
                <div>
                  <p>
                    {profile?.firstName} {profile?.lastName}
                  </p>
                  <p>{profile?.email}</p>
                </div>
              </div>
            </Link>
            <Tooltip title="Logout" placement="top">
              <FiLogOut
                onClick={handleSignOut}
                className="cursor-pointer"
                size={20}
              />
            </Tooltip>
            {!routePaths.includes(router.asPath) && (
              <Button
                onClick={() => router.push("/")}
                className="bg-blue-700 text-white w-full mt-6"
              >
                Go Back
              </Button>
            )}
          </div>
        </Menu>
      </div>

      <ApModal
        show={modal.show}
        onDimiss={() => setModal({ show: false })}
        containerClassName="w-full sm:w-1/2"
        title="Invite Link"
      >
        <InviteLink />
      </ApModal>
    </div>
  );
};
