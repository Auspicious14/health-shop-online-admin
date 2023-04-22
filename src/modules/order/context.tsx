import React, { useState } from "react";
import { IOrder } from "./model";
import { apiReqHandler } from "../../components";
import { toast } from "react-toastify";

interface IOrderState {
  loading: boolean;
  order: IOrder;
  orders: IOrder[];
  createOrder: (payload: IOrder) => Promise<void>;
  updateOrderItem: (payload: any, orderId: string) => Promise<void>;
  deleteOrderItem: (orderId: string) => Promise<void>;
  getAllOrders: () => Promise<void>;
}

const OrderContext = React.createContext<IOrderState>({
  loading: false,
  order: {} as any,
  orders: [],
  getAllOrders() {
    return null as any;
  },
  createOrder(payload) {
    return null as any;
  },
  updateOrderItem(payload, cartId) {
    return null as any;
  },
  deleteOrderItem(orderId) {
    return null as any;
  },
});

export const useOrderState = () => {
  const context = React.useContext(OrderContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const OrderContextProvider: React.FC<IProps> = ({ children }) => {
  const [order, setOrder] = useState<IOrder>() as any;
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/orders`,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data;
      if (data) {
        setOrders(data.data);
        console.log(data);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async (payload: IOrder) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await fetch(`http://localhost:2000/order}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.json();
      setOrders([...data, orders]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrderItem = async (orderId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:2000/product/:${orderId}}`, {
        method: "DELETE",
      });
      setLoading(false);
      const data = await res.json();
      setOrders(data.filter((del: IOrder, i: number) => del._id !== orderId));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderItem = async (payload: IOrder, orderId: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/order/${orderId}`,
        method: "PUT",
        payload: JSON.stringify(payload),
      });

      setLoading(false);
      const data = await res.res?.data;
      if (data.data) {
        setOrders(orders?.map((ord) => (ord?._id == data?._id ? data : ord)));
        console.log(data);
        toast.success("Order Updated");
      }
      return data;
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        loading,
        order,
        orders,
        getAllOrders,
        createOrder,
        updateOrderItem,
        deleteOrderItem,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
