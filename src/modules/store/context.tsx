import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiReqHandler } from "../../components";
import { IStore } from "./model";

interface IStoreState {
  loading: boolean;
  product: IStore;
  stores: IStore[];
  getStores: (query?: any) => Promise<void>;
  getOneStore: (storeId: string) => Promise<any>;
  createStore: (payload: IStore) => Promise<any>;
  updateStore: (payload: IStore, storeId: string) => Promise<any>;
  deleteStore: (storeId: string) => Promise<any>;
  rejectStore: (
    storeId: string,
    email: string,
    remark: string
  ) => Promise<void>;
  acceptStore: (storeId: string) => Promise<any>;
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
  async acceptStore(storeId) {
    return null;
  },
  async rejectStore(storeId, email, remark) {
    return;
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
      return data;
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
      toast.success("Store created successfully");
      setStores([...stores, data]);
      // resetLink()
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const updateStore = async (payload: IStore, id: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store/${id}`,
        method: "PUT",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.res?.data.data;
      if (res.res?.status !== 200) {
        toast.error("Error");
      } else {
        toast.success("Store updated successfully");
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
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store/delete/${storeId}`,
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

  const acceptStore = async (id: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store/accept`,
        method: "POST",
        payload: JSON.stringify({ id: id }),
      });
      setLoading(false);
      const data = await res?.res?.data;

      if (data) {
        toast.success(data.message);
      }
      setStores(
        stores.map((p: IStore, i: number) =>
          p._id == data.data._id ? data.data : p
        )
      );
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const rejectStore = async (id: string, email: string, remark: string) => {
    const payload = { id, email, remark };
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/store/reject`,
        method: "POST",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res?.res?.data;
      if (data) {
        toast.success(data.message);
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  const resetLink = async (code: string) => {
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/delete/invite/${code}`,
        method: "DELETE",
      });
      setLoading(false);
      const data = await res?.res?.data;
      if (data) {
        toast.success(data.message);
      }
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
        acceptStore,
        rejectStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
