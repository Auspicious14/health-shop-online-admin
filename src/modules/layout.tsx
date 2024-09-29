import { Button, ConfigProvider, Layout } from "antd";
import React, { useState } from "react";
import { NavItems } from "../components";
import { NavBarComponent } from "../components/nav/nav";
import { MenuOutlined } from "@ant-design/icons";

interface IProps {
  userId: string;
  children: React.ReactNode;
}
const { Sider, Content } = Layout;
export const MainLayout: React.FC<IProps> = ({ userId, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { AdminMenuItem } = NavItems();

  return (
    <ConfigProvider>
      <Layout hasSider>
        <Sider
          className={`transition-all ${
            collapsed ? "-translate-x-full" : "translate-x-0"
          } w-full sm:w-[25%] lg:w-[20%]`}
          breakpoint="lg"
          collapsedWidth="4"
          onCollapse={setCollapsed}
          collapsed={collapsed}
        >
          <NavBarComponent navItem={AdminMenuItem} userId={userId} />
        </Sider>
        <Layout>
          <Content className="w-full bg-white md:w-full min-h-screen">
            <div className="flex min-h-screen relative">
              {
                <Button
                  icon={<MenuOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  className="md:hidden fixed top-2 left-2 z-50"
                />
              }
              <div className={`flex-1 p-4 ${collapsed ? "ml-0" : ""}`}>
                {children}
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
