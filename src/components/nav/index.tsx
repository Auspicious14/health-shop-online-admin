import React, { Fragment, useState } from "react";

import { Divider, Input, Menu, MenuProps, Layout } from "antd";
import Link from "next/link";
import { MenuFoldOutlined } from "@ant-design/icons";
const { Sider, Footer } = Layout;
export const SideNav = () => {
  const [open, setOpen] = useState(false);
  type MenuItem = Required<MenuProps>["items"][number];

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
          style={{ background: "none" }}
          className="w-[19%] fixed z-50 bottom-0 border border-t"
        >
          <Link href={"/profile"}>Profile</Link>
        </Footer>
      </>
    </Layout>
  );
};
