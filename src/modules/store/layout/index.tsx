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
  children: React.ReactNode;
}
export const StoreLayout: React.FC<IProps> = ({ children }) => {
  const { StoreMenuItem } = NavItems();
  return (
    <>
      <ConfigProvider>
        <Sider>
          <NavBarComponent navItem={StoreMenuItem} />
        </Sider>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </ConfigProvider>
    </>
  );
};
