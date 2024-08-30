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

const { Footer, Sider } = Layout;
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

interface IProps {
  userId: string;
  navItem: any;
  center?: React.ReactNode;
}
export const NavBarComponent: React.FC<IProps> = ({
  userId,
  navItem,
  center,
}) => {
  const { profile, getProfile } = useProfileState();
  const { AdminMenuItem } = NavItems();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });
  const router = useRouter();

  useEffect(() => {
    if (userId) getProfile(userId);
  }, []);

  const handleSignOut = () => {
    if (userId) {
      deleteCookie("token", -1);
      router.push("/auth/login");
    }
  };

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          onClick={() => {}}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={navItem}
          className="h-[100vh] fixed"
        />
      </Sider>
      {center && <ActionButtons />}
      <Menu
        style={{
          display: "flex",
          alignItems: "center",
          background: "none",
          padding: "1rem",
        }}
        className="w-[19%] fixed z-50 bottom-0 border border-t"
      >
        <div className="">
          {!routePaths.includes(router.asPath) && (
            <Button
              onClick={() => setModal({ show: true })}
              className="bg-blue-700 text-white text-center mb-6 w-[80%]"
              color="white"
            >
              Invite link
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
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
              <div>
                <p>
                  {profile?.firstName} {profile?.lastName}
                </p>
                <p className="w-[70%]">{profile?.email}</p>
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
              className="bg-blue-700 text-white text-center mt-6 w-[80%]"
              color="white"
            >
              Go Back
            </Button>
          )}
        </div>
      </Menu>

      <ApModal
        show={modal.show}
        onDimiss={() => setModal({ show: false })}
        containerClassName="w-1/2"
        title="Invite Link"
      >
        <InviteLink />
      </ApModal>
    </Layout>
  );
};
