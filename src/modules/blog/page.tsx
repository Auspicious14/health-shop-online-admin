import {
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Space,
  Table,
  Input,
  Tag,
  Typography,
  Card,
  Popconfirm,
} from "antd";
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
  const [modal, setModal] = useState<{
    show: boolean;
    data?: any;
    type?: "Add Blog" | "Update Blog";
  }>({
    show: false,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [search, setSearch] = useState<string>("");
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
          <Text>{description?.substring(0, 70)}</Text>
        </Space>
      ),
    },

    {
      title: "",
      key: "edit",
      render: (_, blog) => (
        <Space className="flex gap-8 items-center">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteBlog(blog?._id)}
            okButtonProps={{
              style: { background: "rgb(37 99 235)" },
            }}
          >
            <DeleteOutlined />
          </Popconfirm>
          <EditFilled
            onClick={() =>
              setModal({ show: true, data: blog, type: "Update Blog" })
            }
          />
        </Space>
      ),
    },
  ];

  const filtered = blogs?.filter((p) =>
    p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  console.log(modal.data);
  return (
    <div className="flex w-full gap-4">
      <div className="w-[20%] h-screen border bg-red-400">
        {/* <div className="pb-8">
          <Link href={"/"}>Logo</Link>
        </div> */}
        <div>
          <SideNav />
        </div>
      </div>
      <div className="w-[80%] mx-4">
        <div className="flex justify-between items-center shadow-sm p-4 ">
          <div>
            <h1 className="text-3xl font-bold">Blogs</h1>
            <span>Write about products</span>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-blue-600 items-center flex"
            onClick={() =>
              setModal({ show: true, data: null, type: "Add Blog" })
            }
          >
            Add Blog
          </Button>
        </div>
        <div className="shadow-sm p-4 flex items-center justify-between">
          <h1 className=" font-bold">All Blogs</h1>
          <Search
            className="w-60"
            placeholder="Search blog"
            prefix={<SearchOutlined className="text-gray-300" />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filtered}
            rowKey={(p) => p._id}
          />
        </div>
      </div>

      <ApModal
        title={modal.type}
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
