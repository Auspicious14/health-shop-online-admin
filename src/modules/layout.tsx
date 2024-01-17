import { ConfigProvider, Layout } from "antd";
import React from "react";
import { NavItems } from "../components";
import { NavBarComponent } from "../components/nav/nav";

interface IProps {
  children: React.ReactNode;
}
const { Sider, Content } = Layout;
export const MainLayout: React.FC<IProps> = ({ children }) => {
  const { AdminMenuItem } = NavItems();

  return (
    <>
      <ConfigProvider>
        <Sider>
          <NavBarComponent navItem={AdminMenuItem} />
        </Sider>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </ConfigProvider>
    </>
  );
};
