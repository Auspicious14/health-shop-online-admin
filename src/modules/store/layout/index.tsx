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
  className?: string;
}

export const StoreLayout: React.FC<IProps> = ({
  userId,
  children,
  className,
}) => {
  const { StoreMenuItem } = NavItems();
  return (
    <>
      <ConfigProvider>
        <Layout hasSider>
          <Sider
            className="w-[20%] lg:w-[15%] md:w-[25%] sm:w-[30%] xs:w-[40%] bg-gray-800 z-0"
            breakpoint="md"
            collapsedWidth="0"
          >
            <NavBarComponent navItem={StoreMenuItem} userId={userId} />
          </Sider>

          <Layout>
            <Content>
              <div className="flex min-h-screen z-[500]">
                <div className="hidden lg:block lg:w-[10%] 3xl:w-[18%]" />
                <div
                  className={`w-full lg:w-[90%] 3xl:w-[82%] bg-white flex flex-col p-4 ${className}`}
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
