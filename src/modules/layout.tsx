import React, { useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Sidebar } from "../components/nav/sidebar";
import { NavItems } from "../components";

interface IProps {
  userId: string;
  children: React.ReactNode;
}

export const MainLayout: React.FC<IProps> = ({ userId, children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { AdminMenuItem } = NavItems();

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
        navItem={AdminMenuItem}
        center={true}
        admin
      />

      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-0 left-0 z-40 p-2 bg-white rounded shadow-lg md:hidden"
        >
          <MenuOutlined className="text-lg" />
        </button>
      )}

      <main
        className={`flex-1 transition-all duration-300 ${
          !isMobile ? "ml-64" : ""
        } overflow-x-hidden`} // Added overflow-x-hidden
      >
        <div className="p-4 md:p-6 lg:p-0 min-h-screen w-full max-w-[100vw]">
          {children}
        </div>
      </main>
    </div>
  );
};
