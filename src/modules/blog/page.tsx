import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Space, Table, Input, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ApModal, SideNav } from "../../components";
import { useBlogState } from "./context";
import { IBlog } from "./model";
import { CreateBlog } from "./detail";
const Search = Input;
const { Text } = Typography;
export const BlogPage = () => {
  const { getBlogs, loading, deleteBlog, blogs } = useBlogState();
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    getBlogs();
  }, []);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns: ColumnsType<IBlog> = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
      // className: "w-20 h-8",
      // responsive: ["md"],
      render: (_, { description }) => (
        <Space size="middle">
          <Text>{description.substring(0, 70)}</Text>
        </Space>
      ),
    },

    {
      title: "",
      key: "action",
      render: (_, { _id }) => (
        <Space size="middle">
          <DeleteFilled onClick={() => deleteBlog(_id)} />
        </Space>
      ),
    },
    {
      title: "",
      key: "edit",
      render: (_, blog) => (
        <Space size="middle">
          <EditFilled onClick={() => setModal({ show: true, data: blog })} />
        </Space>
      ),
    },
  ];

  const handleSearch = (e: any) => {
    console.log(e.target.value);
    getBlogs(e.target.value);
  };

  console.log(modal.data);
  return (
    <div className="flex w-full gap-4">
      <div className="w-[20%] h-screen border ">
        <div className="pb-8">
          <Link href={"/"}>Logo</Link>
        </div>
        <SideNav />
      </div>
      <div className="w-[80%] mx-4">
        <div className="flex justify-between items-center shadow-sm p-4 ">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <span>keep track of vendor</span>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-blue-600 items-center flex"
            onClick={() => setModal({ show: true, data: null })}
          >
            Add Blog
          </Button>
        </div>
        <div className="shadow-sm p-4 flex items-center justify-between">
          <h1 className=" font-bold">All Orders</h1>
          <Search
            className="w-60"
            placeholder="Search product"
            onChange={handleSearch}
          />
        </div>
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={blogs}
            rowKey={(p) => p._id}
          />
        </div>
      </div>

      <ApModal
        title="Add new blog"
        show={modal.show}
        onDimiss={() => setModal({ show: false })}
      >
        <CreateBlog
          blog={modal.data}
          onUpdate={() => setModal({ show: false })}
        />
      </ApModal>
    </div>
  );
};
