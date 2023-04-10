import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiReqHandler } from "../../components";
import { getCookie } from "../../helper";
import { IBlog } from "./model";

interface IBlogState {
  loading: boolean;
  blog: IBlog;
  blogs: IBlog[];
  getBlogs: (query?: any) => Promise<void>;
  getOneblog: (blogId: string) => Promise<void>;
  createBlog: (payload: IBlog) => Promise<void>;
  updateBlog: (payload: IBlog, blogId: string) => Promise<void>;
  deleteBlog: (blogId: string) => Promise<void>;
}

const BlogContext = React.createContext<IBlogState>({
  loading: false,
  blog: {} as any,
  blogs: [],
  getBlogs() {
    return null as any;
  },
  getOneblog(blogId) {
    return null as any;
  },
  createBlog(payload) {
    return null as any;
  },
  updateBlog(payload, blogId) {
    return null as any;
  },
  deleteBlog(blogId) {
    return null as any;
  },
});

export const useBlogState = () => {
  const context = React.useContext(BlogContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}
export const BlogContextProvider: React.FC<IProps> = ({ children }) => {
  const [blog, setBlog] = useState<IBlog>() as any;
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getBlogs = async (query?: any) => {
    setLoading(true);
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/blogs`,
        method: "GET",
      });
      setLoading(false);
      const data = await res.res?.data;
      setBlogs(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOneblog = async (blogId: string) => {
    setLoading(true);
    console.log(JSON.stringify(blogId));
    try {
      const res = await fetch(`http://localhost:2000/blog/:${blogId}`, {
        method: "GET",
      });
      setLoading(false);
      const data = await res.json();
      setBlog(data);
      console.log(data);
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  const createBlog = async (payload: IBlog) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/blog`,
        method: "POST",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      if (res.res?.status !== 200) {
        toast.error("Error");
      }
      const data = await res.res?.data.data;
      setBlogs([...blogs, ...data]);
      console.log(data);
      return data;
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  const updateBlog = async (payload: IBlog, blogId: string) => {
    setLoading(true);
    console.log(JSON.stringify(payload));
    try {
      const res = await apiReqHandler({
        endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/blog/${blogId}`,
        method: "PUT",
        payload: JSON.stringify(payload),
      });
      setLoading(false);
      const data = await res.res?.data.data;
      if (res.res?.status !== 200) {
        toast.error("Error");
      }
      setBlogs(
        blogs.map((p: IBlog, i: number) => (p._id == data._id ? data : p))
      );

      return data;
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  const deleteBlog = async (blogId: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/blog/${blogId}`,
        {
          method: "DELETE",
        }
      );
      setLoading(false);
      const data = await res.json();

      if (data) {
        toast.success(data.message);
      }
      setBlogs(data);
      console.log(data);
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        loading,
        blogs,
        blog,
        getBlogs,
        getOneblog,
        createBlog,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
