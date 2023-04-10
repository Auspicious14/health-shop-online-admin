import React, { Fragment, useEffect, useState } from "react";

import { Divider, Input, Menu, MenuProps, Layout, Tooltip, Avatar } from "antd";
import Link from "next/link";
import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons";
import { useProfileState } from "../../modules/product copy/context";
import { getCookie } from "../../helper";
const { Sider, Footer } = Layout;
export const SideNav = () => {
  const { profile, loading, getProfile } = useProfileState();
  type MenuItem = Required<MenuProps>["items"][number];

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
        <Link className="relative" href={"/"}></Link>
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
    getItem("Order", "sub2", <Link href={"/order"}></Link>),
    getItem("Product", "sub3", <Link href={"/product"}></Link>),
    getItem("Blog", "sub4", <Link href={"/blog"}></Link>),
  ];
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
          style={{ background: "none", padding: "1rem" }}
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
        </Footer>
      </>
    </Layout>
  );
};
