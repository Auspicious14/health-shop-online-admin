import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiReqHandler } from "../../components";
import { ICategory } from "./model";

interface ICategoryState {
  loading: boolean;
  categories: ICategory[];
  getCategories: (query?: any) => Promise<void>;
  createCategory: (payload: ICategory) => Promise<any>;
  updateCategory: (payload: ICategory, id: string) => Promise<any>;
  deleteCategory: (categoriesId: string) => Promise<void>;
}

const CategoryContext = React.createContext<ICategoryState>({
  loading: false,
  categories: [],
  getCategories() {
    return null as any;
  },
  createCategory(payload) {
    return null as any;
  },
  updateCategory(payload, id) {
    return null as any;
  },
  deleteCategory(categoriesId) {
    return null as any;
  },
});

export const useCategorystate = () => {
  const context = React.useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const CategoryContextProvider: React.FC<IProps> = ({ children }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCategories = async (query?: any) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/category`,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data.data;
      setCategories(data);
      return data;
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  const createCategory = async (payload: ICategory) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/category`,
        method: "POST",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      if (res.res?.status !== 200) {
        toast.error("Error");
      }
      const data = await res.res?.data.data;
      toast.success("category created successfully");
      setCategories([...categories, data]);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const updateCategory = async (payload: ICategory, id: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/category/${id}`,
        method: "PUT",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.res?.data.data;
      toast.success("category updated successfully");
      if (res.res?.status !== 200) {
        toast.error("Error");
      }
      setCategories(
        categories.map((p: ICategory) => (p._id == data._id ? data : p))
      );

      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  const deleteCategory = async (id: string) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/category/${id}`,
        method: "DELETE",
      });
      setLoading(false);
      const data = await res.res?.data;

      if (data) {
        toast.success(data.message);
        setCategories(categories?.filter((c) => c?._id !== id));
      }
      return data;
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        loading,
        categories,
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
