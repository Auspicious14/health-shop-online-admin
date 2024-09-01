import { Button, ConfigProvider, Layout } from "antd";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { NavBarComponent } from "../../../components/nav/nav";
import { NavItems } from "../../../components";
import { MenuOutlined } from "@ant-design/icons";

const Sider = dynamic(
  async () => {
    const a = await import("antd/es/layout/Sider");
    return a;
  },
  {
    ssr: false,
  }
);

const Content = dynamic(
  async () => {
    const a = await import("antd/es/layout/layout");
    return a.Content;
  },
  { ssr: false }
);
const Header = dynamic(
  async () => {
    const a = await import("antd/es/layout/layout");
    return a.Header;
  },
  { ssr: false }
);

interface IProps {
  userId: string;
  children: React.ReactNode;
  className?: string;
}

export const StoreLayout: React.FC<IProps> = ({
  userId,
  children,
  className,
}) => {
  const { StoreMenuItem } = NavItems();
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as needed
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ConfigProvider>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            // className={`transition-transform fixed top-0 bg-gray-800 z-50 ${
            //   collapsed ? "-translate-x-full" : "translate-x-0"
            // }`}
            // width={collapsed ? 0 : "70%"} // Adjust width as needed
            // style={{
            //   height: "100vh",
            //   overflow: "auto", // Ensure the content can scroll if necessary
            //   transition: "transform 0.3s ease-in-out",
            // }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <NavBarComponent
              navItem={StoreMenuItem}
              userId={userId}
              collapsed={collapsed}
            />
          </Sider>

          <Layout style={{ width: "100%" }}>
            <Header>
              {isMobile && (
                <Button
                  type="text"
                  icon={<MenuOutlined size={30} />}
                  onClick={() => setCollapsed(!collapsed)}
                  className="fixed top-4 left-4 z-50"
                />
              )}
            </Header>
            <Content>
              {/* <div
                className={`flex min-h-screen ${
                  isMobile ? "flex-col" : "flex-row"
                }`}
              >
                <div className={`flex-1 p-4 ${className}`}>{children}</div>
              </div> */}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};
