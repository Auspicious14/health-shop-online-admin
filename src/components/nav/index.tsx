import React, { Fragment, useEffect, useState } from "react";
import { FaBlog } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { BsCartCheck } from "react-icons/bs";
import {
  Divider,
  Input,
  Menu,
  MenuProps,
  Layout,
  Tooltip,
  Avatar,
  Button,
} from "antd";
import Link from "next/link";
import {
  EyeInvisibleFilled,
  MailOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useProfileState } from "../../modules/profile/context";
import { deleteCookie, getCookie } from "../../helper";
import { useRouter } from "next/router";
import { ApModal } from "../modal";
import { useSignUpState } from "../../modules/auth/signup/context";
import { toast } from "react-toastify";
const { Sider, Footer } = Layout;
export const SideNav = () => {
  const { profile, loading, getProfile } = useProfileState();
  const [modal, setModal] = useState<{ show: boolean }>({ show: false });

  type MenuItem = Required<MenuProps>["items"][number];
  const router = useRouter();
  const id = JSON.parse(getCookie("user_id"));
  useEffect(() => {
    if (id) getProfile(id?.id);
  }, []);
  function getItem(
    label?: React.ReactNode,
    key?: React.Key,
    icon?: React.ReactNode,
    type?: "group"
  ): MenuItem {
    return {
      label,
      key,
      icon,
      type,
    } as MenuItem;
  }
  const items: MenuProps["items"] = [
    getItem(
      "Logo",
      "sub0",
      <>
        <Link className="relative" href={"/"}>
          {/* <RxDashboard /> */}
        </Link>
      </>
    ),
    getItem(
      "",
      "sub02",
      <>
        <Divider />
      </>
    ),
    getItem(
      "Dashboard",
      "sub1",
      <Link href={"/"}>
        <MenuFoldOutlined />
      </Link>
    ),
    getItem(
      "Order",
      "sub2",
      <Link href={"/order"}>
        <BsCartCheck />
      </Link>
    ),
    getItem(
      "Product",
      "sub3",
      <Link href={"/product"}>
        <MailOutlined />
      </Link>
    ),
    getItem(
      "Category",
      "sub103",
      <Link href={"/category"}>
        <MailOutlined />
      </Link>
    ),
  ];
  const handleSignOut = () => {
    const userId = getCookie("user_id");
    console.log(userId);
    if (getCookie("user_id")) {
      deleteCookie("user_id", -1);
      router.push("/auth/login");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <>
        <Menu
          onClick={() => {}}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
          className="h-[100vh] fixed"
        />

        <Footer
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
            <Button
              onClick={() => setModal({ show: true })}
              className="bg-blue-700 text-white text-center mb-6 w-[80%]"
              color="white"
            >
              Invite link
            </Button>
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
          </div>
        </Footer>
      </>

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
