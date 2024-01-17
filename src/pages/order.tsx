import React from "react";
import { OrderContextProvider } from "../modules/order/context";
import { OrderPage } from "../modules/order/page";
import { MainLayout } from "../modules/layout";

const Order = () => {
  return (
    <MainLayout>
      <OrderContextProvider>
        <OrderPage />
      </OrderContextProvider>
    </MainLayout>
  );
};

export default Order;
export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  const parse = JSON.parse(req?.cookies.user_id);
  if (!parse.isAdmin) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  // console.log(id);
  return {
    props: {},
  };
};
