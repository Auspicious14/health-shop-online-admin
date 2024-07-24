import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiReqHandler } from "../../components";
import { IProduct } from "./model";

interface IProductState {
  loading: boolean;
  product: IProduct;
  products: IProduct[];
  getProducts: (query?: any) => Promise<void>;
  getOneProduct: (productId: string) => Promise<void>;
  createProduct: (payload: IProduct, storeId?: string) => Promise<void>;
  updateProduct: (
    payload: IProduct,
    productId: string,
    storeId?: string
  ) => Promise<void>;
  deleteProduct: (productId: string, storeId?: string) => Promise<void>;
}

const ProductContext = React.createContext<IProductState>({
  loading: false,
  product: {} as any,
  products: [],
  getProducts() {
    return null as any;
  },
  getOneProduct(productId) {
    return null as any;
  },
  createProduct(payload) {
    return null as any;
  },
  updateProduct(payload, productId) {
    return null as any;
  },
  deleteProduct(productId) {
    return null as any;
  },
});

export const useProductState = () => {
  const context = React.useContext(ProductContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const ProductContextProvider: React.FC<IProps> = ({ children }) => {
  const [product, setProduct] = useState<IProduct>() as any;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = async (storeId: string, query?: any) => {
    setLoading(true);
    let endPoint;
    if (storeId) {
      endPoint = `${process.env.NEXT_PUBLIC_API_ROUTE}/products?storeId=${storeId}`;
    } else {
      endPoint = `${process.env.NEXT_PUBLIC_API_ROUTE}/products`;
    }
    try {
      const res = await apiReqHandler({
        endPoint,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data?.data;
      setProducts(data);
    } catch (error: any) {
      toast.error(error);
    }
  };

  const getOneProduct = async (id: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/product/${id}`,
        method: "GET",
      });
      setLoading(false);
      if (res.res?.status !== 200) {
        toast.error("Error");
      }
      const data = await res.res?.data?.data;
      setProducts(data);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const createProduct = async (payload: IProduct, storeId?: string) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/product`,
        method: "POST",
        payload: { ...payload, storeId },
      });
      setLoading(false);
      if (res.res?.status !== 200) {
        toast.error("Error");
      }
      const data = await res.res?.data?.data;
      if (data) {
        toast.success("Product created successfully");
        setProducts([...products, data]);
        console.log(data, "dataaa");
      }
      return data;
    } catch (error: any) {
      toast.error(error);
      console.log(error, "eerrr");
    }
  };

  const updateProduct = async (
    payload: IProduct,
    productId: string,
    storeId?: string
  ) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/product/${productId}`,
        method: "PUT",
        payload: JSON.stringify({ ...payload, storeId }),
      });
      setLoading(false);
      const data = await res.res?.data.data;
      toast.success("Product updated successfully");
      if (res.res?.status !== 200) {
        toast.error("Error");
      }
      setProducts(
        products.map((p: IProduct, i: number) => (p._id == data._id ? data : p))
      );

      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const deleteProduct = async (productId: string, storeId?: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/product/${productId}?storeId=${storeId}`,
        method: "DELETE",
      });
      setLoading(false);
      const data = await res.res?.data;

      if (data) {
        toast.success(data.message);
        setProducts(products.filter((p: any) => p?._id !== productId));
      }
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        loading,
        products,
        product,
        getProducts,
        getOneProduct,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
