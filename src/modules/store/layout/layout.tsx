import { useState } from "react";
import Sidebar from "../../../components/nav/sidebar";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface IProps {
  children: React.ReactNode;
  userId: string;
}
export const StoreLayoutV2: React.FC<IProps> = ({ userId, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        userId={userId}
      />

      <div
        className={`fixed inset-0 bg-black opacity-50 transition-opacity ${
          isSidebarOpen ? "block" : "hidden"
        } z-30`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`flex-1 p-4 transition-all duration-300 ease-in-out overflow-y-auto md:ml-[250px]`} // Adjust margin based on sidebar width
      >
        <Button
          type="text"
          icon={<MenuFoldOutlined size={30} />}
          onClick={toggleSidebar}
          className={`text-2xl text-gray-800 md:hidden ${
            isSidebarOpen ? "hidden" : "block"
          }`}
        />

        <div>{children}</div>
      </div>
    </div>
  );
};
