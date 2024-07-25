import { ConfigProvider, Layout } from "antd";
import dynamic from "next/dynamic";
import React from "react";
import { NavBarComponent } from "../../../components/nav/nav";
import { NavItems } from "../../../components";

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

interface IProps {
  userId: string;
  children: React.ReactNode;
}
export const StoreLayout: React.FC<IProps> = ({ userId, children }) => {
  const { StoreMenuItem } = NavItems();
  return (
    <>
      <ConfigProvider>
        <Layout hasSider>
          <Sider className="w-[20%]">
            <NavBarComponent navItem={StoreMenuItem} userId={userId} />
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
