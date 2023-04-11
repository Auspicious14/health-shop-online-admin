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
  createProduct: (payload: IProduct) => Promise<void>;
  updateProduct: (payload: IProduct, productId: string) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
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

  const getProducts = async (query?: any) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/products`,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data;
      setProducts(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOneProduct = async (productId: string) => {
    setLoading(true);
    console.log(JSON.stringify(productId));
    try {
      const res = await fetch(`http://localhost:2000/product/:${productId}`, {
        method: "GET",
      });
      setLoading(false);
      const data = await res.json();
      setProduct(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (payload: IProduct) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/product`,
        method: "POST",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      if (res.res?.status !== 200) {
        toast.error("Error");
      }
      const data = await res.res?.data.data;
      toast.success("Product created successfully");
      setProducts([...data, products]);
      return data;
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  const updateProduct = async (payload: IProduct, productId: string) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/product/${productId}`,
        method: "PUT",
        payload: JSON.stringify(payload),
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
      console.log(error);
      toast.error(error);
    }
  };

  const deleteProduct = async (productId: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/product/${productId}`,
        {
          method: "DELETE",
        }
      );
      setLoading(false);
      const data = await res.json();

      if (data) {
        toast.success(data.message);
      }
      setProducts(data);
      console.log(data);
    } catch (error: any) {
      console.log(error);
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
