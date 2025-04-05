import { useEffect, useState } from "react";
import { Sidebar } from "../../../components/nav/sidebar";
import { MenuFoldOutlined, MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { NavItems } from "../../../components";

interface IProps {
  children: React.ReactNode;
  userId: string;
  className?: string;
}
export const StoreLayoutV2: React.FC<IProps> = ({
  userId,
  children,
  className,
}) => {
  const { StoreMenuItem } = NavItems();
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
        navItem={StoreMenuItem}
        center={false}
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
        }`}
      >
        <div className="p-4 md:p-6 lg:p-0 min-h-screen">{children}</div>
      </main>
    </div>
  );
};
