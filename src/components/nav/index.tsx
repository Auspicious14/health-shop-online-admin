import React, { Fragment, useEffect, useState } from "react";
import { FaBlog } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { BsCartCheck } from "react-icons/bs";
import { Divider, Input, Menu, MenuProps, Layout, Tooltip, Avatar } from "antd";
import Link from "next/link";
import {
  MailOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useProfileState } from "../../modules/profile/context";
import { deleteCookie, getCookie } from "../../helper";
import { useRouter } from "next/router";
const { Sider, Footer } = Layout;
export const SideNav = () => {
  const { profile, loading, getProfile } = useProfileState();
  type MenuItem = Required<MenuProps>["items"][number];
  const router = useRouter();

  useEffect(() => {
    getProfile(getCookie("user_id"));
  }, []);
  function getItem(
    label: React.ReactNode,
    key: React.Key,
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
    getItem(
      "Blog",
      "sub4",
      <Link href={"/blog"}>
        <FaBlog />
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
            justifyContent: "space-between",
            alignItems: "center",
            background: "none",
            padding: "1rem",
          }}
          className="w-[19%] fixed z-50 bottom-0 border border-t"
        >
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
                <span>{profile?.email} </span>
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
        </Footer>
      </>
    </Layout>
  );
};
