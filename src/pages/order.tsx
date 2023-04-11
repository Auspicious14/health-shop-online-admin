import React from "react";
import { OrderContextProvider } from "../modules/order/context";
import { OrderPage } from "../modules/order/page";

const Order = () => {
  return (
    <div>
      <OrderContextProvider>
        <OrderPage />
      </OrderContextProvider>
    </div>
  );
};

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  if (!req?.cookies.user_id) {
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
export default Order;
