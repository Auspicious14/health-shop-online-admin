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

  console.log(collapsed, "collapsed");
  return (
    <>
      <ConfigProvider>
        <Layout hasSider>
          <Sider
            className={`transition-transform ${
              collapsed ? "-translate-x-full" : "translate-x-0"
            } w-[80%] md:w-[25%] lg:w-[20%] xl:w-[15%] 2xl:w-[12%]`}
            breakpoint="lg"
            collapsedWidth="0"
          >
            <NavBarComponent navItem={AdminMenuItem} userId={userId} />
          </Sider>
          <Layout>
            <Content className="p-4">
              <div className="flex min-h-screen">
                {collapsed && (
                  <Button
                    icon={<MenuOutlined size={30} />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="fixed top-4 left-0 z-50 bg-red-400"
                  />
                )}
                <div
                  className={`flex-1 bg-white ${
                    collapsed ? "ml-0" : "ml-[20%]"
                  } p-4`}
                >
                  {children}
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
};
