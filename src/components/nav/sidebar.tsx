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
import router from "next/router";
import { deleteCookie } from "../../helper";
import { useProfileState } from "../../modules/profile/context";
import { toast } from "react-toastify";
import { useSignUpState } from "../../modules/auth/signup/context";
import { FiLogOut } from "react-icons/fi";

interface IProps {
  isOpen: boolean;
  center?: boolean;
  toggleSidebar: () => void;
  userId: string;
}
const Sidebar: React.FC<IProps> = ({
  userId,
  isOpen,
  toggleSidebar,
  center,
}) => {
  const { StoreMenuItem } = NavItems();
  const { profile, getProfile } = useProfileState();

  useEffect(() => {
    if (userId) getProfile(userId);
  }, []);

  const handleSignOut = () => {
    if (userId) {
      deleteCookie("token", -1);
      router.push("/auth/login");
    }
  };

  const MenuItem = ({
    item,
    toggleSidebar,
  }: {
    item: any;
    toggleSidebar: () => void;
  }) => {
    return item.children ? (
      <div className="group">
        <button className="w-full text-left px-4 py-2 text-base hover:bg-gray-700 rounded">
          {item.label}
        </button>
      </div>
    ) : (
      <div>
        <div className="flex gap-4 items-center px-4 py-4 text-base hover:bg-gray-700 hover:text-white rounded">
          <>{item.icon}</>
          <Link href={item.key} onClick={toggleSidebar}>
            {item.label}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`fixed overflow-hidden z-[1000] top-0 left-0 h-full w-[250px] bg-white transition-transform transform ${
        isOpen ? "translate-x-0 ease-in" : "-translate-x-full ease-out"
      } md:translate-x-0 md:w-64`}
    >
      <ApImage src={Logo} alt="logo" className="object-cover" />
      <Button
        type="text"
        icon={<CloseOutlined size={30} />}
        onClick={toggleSidebar}
        className={`absolute top-2 right-4 text-2xl md:hidden`}
      ></Button>

      <nav className="px-4">
        {StoreMenuItem.map((item, i) => (
          <MenuItem key={i} item={item} toggleSidebar={toggleSidebar} />
        ))}
      </nav>

      {center && <ActionButtons />}

      <div className="fixed bottom-2 px-4">
        <Link href={"/store/profile"}>
          <div className="flex gap-4 items-center">
            <Tooltip title={profile?.firstName} placement="top">
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                style={{
                  backgroundColor: "#87d068",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
                icon={<UserOutlined />}
              />
            </Tooltip>
            <div>
              <p className="w-[60%]">{profile?.email}</p>
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
      </div>
    </div>
  );
};

export default Sidebar;

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
      .then((res) => toast.success("Copied"));
  };

  useEffect(() => {
    generateInviteLink().then((res: any) => {
      setLink(res?.data?.inviteCode);
    });
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold">Copy the invite link below</h1>
      <div className="flex justify-between items-center my-2 mt-6">
        <div className="w-[70%] p-2 bg-gray-100 border rounded-md flex justify-between items-center">
          {show == true ? inviteLink : "********************"}
          <EyeInvisibleFilled
            className="text-gray-500"
            onClick={() => setShow(!show)}
          />
        </div>
        <Button
          className="bg-blue-700 text-white text-center "
          onClick={handleCopy}
        >
          Copy
        </Button>
      </div>
    </>
  );
};
