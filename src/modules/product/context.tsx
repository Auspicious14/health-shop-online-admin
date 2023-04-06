import React, { useState } from "react";
import { apiReqHandler } from "../../components";
import { IProduct } from "./model";

interface IProductState {
  loading: boolean;
  product: IProduct;
  products: IProduct[];
  getProducts: () => Promise<void>;
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

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:2000/products", {
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
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(payload),
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.res?.data;

      setProducts([...data, products]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (payload: IProduct, productId: string) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await fetch(`http://localhost:2000/product/:${productId}}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.json();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:2000/product/:${productId}}`, {
        method: "DELETE",
      });
      setLoading(false);
      const data = await res.json();
      setProducts(
        data.filter((del: IProduct, i: number) => del.id !== productId)
      );
      console.log(data);
    } catch (error) {
      console.log(error);
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
