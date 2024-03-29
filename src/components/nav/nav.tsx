import { EyeInvisibleFilled, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, Tooltip, Avatar } from "antd";
// import { Footer } from "antd/es/layout/layout";
import modal from "antd/es/modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import profile from "../../pages/profile";
import store from "../../pages/store";
import { ApModal } from "../modal";
import { NavItems } from "./items";
import { toast } from "react-toastify";
import { useSignUpState } from "../../modules/auth/signup/context";
import { deleteCookie, getCookie } from "../../helper";
import { useRouter } from "next/router";
import { useProfileState } from "../../modules/profile/context";

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
  navItem: any;
  center?: React.ReactNode;
}
export const NavBarComponent: React.FC<IProps> = ({ navItem, center }) => {
  const { profile, loading, getProfile } = useProfileState();
  const { AdminMenuItem, AdminStoreMenuItem } = NavItems();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });
  const router = useRouter();

  const user = JSON.parse(getCookie("user_id"));
  useEffect(() => {
    if (user) getProfile(user?.id);
  }, []);

  const handleSignOut = () => {
    if (user?.id) {
      deleteCookie("user_id", -1);
      router.push("/auth/login");
    }
  };
  console.log(
    router.asPath == "/" || "/product" || "/stores" || "/category" || "/order"
  );
  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          onClick={() => {}}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={navItem || AdminMenuItem}
          className="h-[100vh] fixed"
        />
      </Sider>
      {center && <ActionButtons />}
      <Menu
        style={{
          display: "flex",
          // justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          padding: "1rem",
        }}
        className="w-[19%] fixed z-50 bottom-0 border border-t"
      >
        <div className="">
          {
            <Button
              onClick={() => setModal({ show: true })}
              className="bg-blue-700 text-white text-center mb-6 w-[80%]"
              color="white"
            >
              Invite link
            </Button>
          }
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
                    // padding: "1rem",
                    display: "inline-block",
                  }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
              <div>
                <div>
                  {profile?.firstName} {profile?.lastName}
                </div>
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
          {router.asPath !== "/" ||
          "/product" ||
          "/stores" ||
          "/category" ||
          "/order" ? (
            <Button
              onClick={() => router.push("/")}
              className="bg-blue-700 text-white text-center mt-6 w-[80%]"
              color="white"
            >
              Go Back
            </Button>
          ) : null}
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
