import React from "react";
import { FaBlog, FaBlogger, FaStore, FaStoreAlt } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { Divider, MenuProps } from "antd";
import Link from "next/link";
import {
  MailOutlined,
  MenuFoldOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { ApImage } from "../image";
import Logo from "../../../public/images/vendify logo white.jpg";

interface IProps {
  store?: boolean;
}

export const NavItems = () => {
  type MenuItem = Required<MenuProps>["items"][number];
  const router = useRouter();

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

  const AdminMenuItem: MenuProps["items"] = [
    // getItem("", "sub02", <Divider />),
    getItem("Dashboard", "/", <MenuFoldOutlined />),
    getItem("Order", "/order", <BsCartCheck />),
    getItem("Product", "/product", <MailOutlined />),
    getItem(
      "Category",
      "/category",
      <Link href={"/category"}>
        <MailOutlined />
      </Link>
    ),
    getItem("Store", "/stores", <FaStoreAlt />),
  ];

  const StoreMenuItem: MenuProps["items"] = [
    getItem("Dashboard", "/store", <MenuFoldOutlined />),
    getItem("Detail", "/store/detail", <FaStore />),
    getItem("Order", "/store/orders", <BsCartCheck />),
    getItem("Product", "/store/products", <ProductOutlined />),
    getItem("Chat Room", "/store/chats", <MailOutlined />),
    getItem("Blog", "/store/blog", <FaBlogger />),
  ];

  const AdminStoreMenuItem: MenuProps["items"] = [
    getItem(
      "Dashboard",
      `/store/${router?.query?.storeId}/dashboard`,
      <MenuFoldOutlined />
    ),
    getItem(
      "Detail",
      `/store/${router?.query?.storeId}`,

      <FaStore />
    ),
    getItem(
      "Order",
      `/store/${router?.query?.storeId}/orders`,

      <BsCartCheck />
    ),
    getItem(
      "Product",
      `/store/${router?.query?.storeId}/products`,
      <ProductOutlined />
    ),
    getItem(
      "Chat Room",
      `/store/${router?.query?.storeId}/chats`,
      <MailOutlined />
    ),
  ];

  return {
    AdminStoreMenuItem,
    AdminMenuItem,
    StoreMenuItem,
  };
};
