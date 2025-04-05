// ts-ignore
import React, { useEffect, useState } from "react";
import { NavItems } from "../../../components";
import { Sidebar } from "../../../components/nav/sidebar";
import { MenuOutlined } from "@ant-design/icons";

interface IProps {
  userId: string;
  children: React.ReactNode;
}

export const AdminStoreLayout: React.FC<IProps> = ({ userId, children }) => {
  const { AdminStoreMenuItem } = NavItems();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex min-h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userId={userId}
        navItem={AdminStoreMenuItem}
        center={true}
      />

      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 bg-white rounded shadow-lg md:hidden"
        >
          <MenuOutlined className="text-lg" />
        </button>
      )}

      <main
        className={`flex-1 transition-all duration-300 ${
          !isMobile ? "ml-64" : ""
        } overflow-x-hidden`}  // Add horizontal overflow control
      >
        <div className="p-4 md:p-6 w-full max-w-[100vw]">
          {children}
        </div>
      </main>
    </div>
  );
};
