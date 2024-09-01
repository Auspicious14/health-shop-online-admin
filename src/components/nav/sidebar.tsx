import Link from "next/link";
import React from "react";
import { NavItems } from "./items";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { ApImage } from "../image";
import Logo from "../../../public/images/vendify logo white.jpg";

interface IProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const Sidebar: React.FC<IProps> = ({ isOpen, toggleSidebar }) => {
  const { StoreMenuItem } = NavItems();

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
        <div className="ml-4 space-y-2">
          {item.children.map((child: any) => (
            <MenuItem
              key={child.key}
              item={child}
              toggleSidebar={toggleSidebar}
            />
          ))}
        </div>
      </div>
    ) : (
      <Link
        href={item.key}
        className="block px-4 py-2 text-base hover:bg-gray-700 rounded"
        onClick={toggleSidebar} // Close sidebar on link click
      >
        {item.label}
      </Link>
    );
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 md:w-64 z-40`}
      style={{ zIndex: 40 }}
    >
      <ApImage src={Logo} alt="logo" className="object-cover" />
      <Button
        type="text"
        icon={<CloseOutlined size={30} />}
        onClick={toggleSidebar}
        className={`absolute top-2 right-4 text-2xl md:hidden`}
      ></Button>
      <nav className=" px-4">
        {StoreMenuItem.map((item, i) => (
          <MenuItem key={i} item={item} toggleSidebar={toggleSidebar} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
