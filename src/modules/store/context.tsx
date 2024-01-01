import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiReqHandler } from "../../components";
import { IStore } from "./model";

interface IStoreState {
  loading: boolean;
  product: IStore;
  stores: IStore[];
  getStores: (query?: any) => Promise<void>;
  getOneStore: (storeId: string) => Promise<void>;
  createStore: (payload: IStore) => Promise<void>;
  updateStore: (payload: IStore, storeId: string) => Promise<void>;
  deleteStore: (storeId: string) => Promise<void>;
}

const StoreContext = React.createContext<IStoreState>({
  loading: false,
  product: {} as any,
  stores: [],
  getStores() {
    return null as any;
  },
  getOneStore(storeId) {
    return null as any;
  },
  createStore(payload) {
    return null as any;
  },
  updateStore(payload, storeId) {
    return null as any;
  },
  deleteStore(storeId) {
    return null as any;
  },
});

export const useStoreState = () => {
  const context = React.useContext(StoreContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const StoreContextProvider: React.FC<IProps> = ({ children }) => {
  const [product, setProduct] = useState<IStore>() as any;
  const [stores, setStores] = useState<IStore[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getStores = async (query?: any) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/stores`,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data?.data;
      setStores(data);
    } catch (error: any) {
      toast.error(error);
    }
  };

  const getOneStore = async (id: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store/${id}`,
        method: "GET",
      });
      setLoading(false);
      if (res.res?.status !== 200) {
        toast.error("Error");
      }
      const data = await res.res?.data?.data;
      setStores(data);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const createStore = async (payload: IStore) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store`,
        method: "POST",
        payload,
      });
      setLoading(false);
      if (res.res?.status !== 200) {
        toast.error("Error");
      }
      const data = await res.res?.data?.data;
      toast.success("Product created successfully");
      setStores([...stores, data]);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const updateStore = async (payload: IStore, storeId: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store/${storeId}`,
        method: "PUT",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.res?.data.data;
      toast.success("Product updated successfully");
      if (res.res?.status !== 200) {
        toast.error("Error");
      }
      setStores(
        stores.map((p: IStore, i: number) => (p._id == data._id ? data : p))
      );

      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const deleteStore = async (storeId: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store/${storeId}`,
        method: "DELETE",
      });
      setLoading(false);
      const data = await res.res?.data;

      if (data) {
        toast.success(data.message);
        setStores(stores.filter((p: any) => p?._id !== storeId));
      }
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        loading,
        stores,
        product,
        getStores,
        getOneStore,
        createStore,
        updateStore,
        deleteStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
