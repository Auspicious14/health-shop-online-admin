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

export default Order;
