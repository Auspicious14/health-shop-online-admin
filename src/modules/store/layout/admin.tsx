// ts-ignore
import React from "react";
import dynamic from "next/dynamic";
import { ConfigProvider, Layout } from "antd";
import { NavBarComponent } from "../../../components/nav/nav";
import { NavItems } from "../../../components";
// const Sider = require("antd/lib/locale/fr_FR");
// const Content = require("antd/lib/locale/fr_FR");
const { Sider, Content } = Layout;

interface IProps {
  userId: string;
  children: React.ReactNode;
}

export const AdminStoreLayout: React.FC<IProps> = ({ userId, children }) => {
  const { AdminStoreMenuItem } = NavItems();
  return (
    <>
      <ConfigProvider>
        <Layout hasSider>
          <Sider className="w-[20%]">
            <NavBarComponent navItem={AdminStoreMenuItem} userId={userId} />
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
