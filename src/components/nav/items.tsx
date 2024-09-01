import React, { Fragment, useEffect, useState } from "react";
import { FaStore, FaStoreAlt } from "react-icons/fa";
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
    getItem(
      "Logo",
      "sub0",
      <>
        <Link className="relative" href={"/"}>
          {/* <RxDashboard /> */}
          <ApImage src={Logo} alt="logo" />
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
      "category",
      <Link href={"/category"}>
        <MailOutlined />
      </Link>
    ),
    getItem(
      "Store",
      "store",
      <Link href={"/stores"}>
        <FaStoreAlt />
      </Link>
    ),
  ];
  const StoreMenuItem: MenuProps["items"] = [
    getItem(
      "Dashboard",
      "/store",
      <Link href={"/store"}>
        <MenuFoldOutlined />
      </Link>
    ),
    getItem(
      "Detail",
      "/store/detail",
      <>
        <Link className="relative" href={"/store/detail"}>
          <FaStore />
        </Link>
      </>
    ),
    getItem(
      "Order",
      "/store/orders",
      <Link href={"/store/orders"}>
        <BsCartCheck />
      </Link>
    ),
    getItem(
      "Product",
      "/store/products",
      <Link href={"/store/products"}>
        <ProductOutlined />
      </Link>
    ),
    getItem(
      "Chat Room",
      "/store/chats",
      <Link href={"/store/chats"}>
        <MailOutlined />
      </Link>
    ),
  ];
  const AdminStoreMenuItem: MenuProps["items"] = [
    getItem(
      "Logo",
      "sub0",
      <>
        <Link className="relative" href={"/"}>
          {/* <RxDashboard /> */}
          <ApImage src={Logo} alt="logo" />
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
      <Link href={`/store/${router?.query?.storeId}/dashboard`}>
        <MenuFoldOutlined />
      </Link>
    ),
    getItem(
      "Detail",
      "su1",
      <Link href={`/store/${router?.query?.storeId}`}>
        <FaStore />
      </Link>
    ),
    getItem(
      "Order",
      "sub2",
      <Link href={`/store/${router?.query?.storeId}/orders`}>
        <BsCartCheck />
      </Link>
    ),
    getItem(
      "Product",
      "sub3",
      <Link href={`/store/${router?.query?.storeId}/products`}>
        <ProductOutlined />
      </Link>
    ),
    getItem(
      "Chat Room",
      "sub3",
      <Link href={`/store/${router?.query?.storeId}/chats`}>
        <MailOutlined />
      </Link>
    ),
  ];

  return {
    AdminStoreMenuItem,
    AdminMenuItem,
    StoreMenuItem,
  };
};
