import { ConfigProvider, Layout } from "antd";
import React from "react";
import { NavItems } from "../components";
import { NavBarComponent } from "../components/nav/nav";

interface IProps {
  userId: string;
  children: React.ReactNode;
}
const { Sider, Content } = Layout;
export const MainLayout: React.FC<IProps> = ({ userId, children }) => {
  const { AdminMenuItem } = NavItems();

  return (
    <>
      <ConfigProvider>
        <Layout hasSider>
          <Sider className="w-[20%]">
            <NavBarComponent navItem={AdminMenuItem} userId={userId} />
          </Sider>
          <Layout>
            <Content>
              <div className="flex min-h-screen">
                <div className="w-[10%] 3xl:w-[18%] cus-md2:hidden" />
                <div className="w-[90%] 3xl:w-[82%] bg-white cus-md2:w-full flex flex-col p-[25px]">
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
