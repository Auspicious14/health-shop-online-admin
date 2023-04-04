import React, { Fragment, useState } from "react";

import { Input, Menu, MenuProps } from "antd";
import Link from "next/link";
import { MenuFoldOutlined } from "@ant-design/icons";
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
    <Menu
      onClick={() => {}}
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};
