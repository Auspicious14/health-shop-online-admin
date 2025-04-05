import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NavItems } from "./items";
import { Avatar, Button, Tooltip } from "antd";
import {
  CloseOutlined,
  EyeInvisibleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { ApImage } from "../image";
import Logo from "../../../public/images/vendify logo white.jpg";
import router, { useRouter } from "next/router";
import { deleteCookie } from "../../helper";
import { useProfileState } from "../../modules/profile/context";
import { toast } from "react-toastify";
import { useSignUpState } from "../../modules/auth/signup/context";
import { FiLogOut } from "react-icons/fi";
import { routePaths } from "./path";
import { ApModal } from "../modal";

interface IProps {
  isOpen: boolean;
  center?: boolean;
  toggleSidebar: () => void;
  userId: string;
  navItem: any;
}

export const Sidebar: React.FC<IProps> = ({
  isOpen,
  toggleSidebar,
  userId,
  navItem,
  center,
}) => {
  const { profile, getProfile } = useProfileState();
  const router = useRouter();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });

  useEffect(() => {
    if (userId) getProfile(userId);
  }, [userId]);

  const handleSignOut = () => {
    deleteCookie("token", -1);
    router.push("/auth/login");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      <div
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <ApImage
            src={Logo}
            alt="logo"
            width={"200"}
            height={"200"}
            className="h-1/2"
          />
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <CloseOutlined className="text-xl" />
          </button>
        </div>

        <nav className="p-2 space-y-1">
          {navItem.map((item: any, index: number) => (
            <Link
              key={index}
              href={item.key}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded transition-colors"
              onClick={toggleSidebar}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {center && <ActionButtons admin />}

        <div className="absolute bottom-0 w-full p-4 border-t bg-white">
          <div className="flex items-center gap-3">
            <Avatar
              src={"https://via.placeholder.com/32"}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {profile?.firstName} {profile?.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
            </div>
            <FiLogOut
              onClick={handleSignOut}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              size={18}
            />
          </div>
        </div>
      </div>
    </>
  );
};

interface IActionProps {
  admin?: boolean;
  storeAdmin?: boolean;
}
export const ActionButtons: React.FC<IActionProps> = ({ admin }) => {
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });

  return (
    <div className="px-4 py-2">
      <Button
        className="bg-blue-700 text-white w-full"
        onClick={() => setModal({ show: true })}
      >
        Generate Invite Link
      </Button>

      <ApModal
        show={modal.show}
        onDimiss={() => setModal({ show: false })}
        title="Invite Link"
      >
        <InviteLink />
      </ApModal>
    </div>
  );
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
