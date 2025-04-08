import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Input,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { ICategory } from "./model";
import {
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useCategorystate } from "./context";
import { ApModal } from "../../components";
import { CategoryDetail } from "./detail";
const { Text } = Typography;
const Search = Input;

export const CategoryPage = () => {
  const [modal, setModal] = useState<{
    show: boolean;
    data?: any;
    type?: "Add Category" | "Update Category";
  }>({
    show: false,
  });
  const [search, setSearch] = useState<string>("");
  const { getCategories, categories, loading, deleteCategory } =
    useCategorystate();

  useEffect(() => {
    getCategories();
  }, []);

  const columns: ColumnsType<ICategory> = [
    {
      title: "Image",
      key: "images",
      render: (_, { images }) => (
        <Space className="w-20 h-20">
          <Image
            preview={false}
            src={images?.[0]?.uri}
            alt={images?.[0]?.uri}
            className="w-full h-full object-cover"
          />
        </Space>
      ),
    },

    {
      title: "Name",
      key: "name",
      render: (_, { name }) => <Text className="capitalize">{name}</Text>,
    },
    {
      title: "",
      key: "action",
      render: (_, category) => (
        <Space className="flex gap-8 items-center">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteCategory(category?._id)}
            okButtonProps={{
              style: { background: "rgb(37 99 235)" },
            }}
          >
            <DeleteOutlined />
          </Popconfirm>
          <Space>
            <EditFilled
              onClick={() =>
                setModal({
                  show: true,
                  data: category,
                  type: "Update Category",
                })
              }
            />
          </Space>
        </Space>
      ),
    },
  ];
  const filteredCategories = categories?.filter((p) =>
    p?.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div className="max-w-[100vw] overflow-x-hidden px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 py-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Categories</h1>
          <span className="text-sm sm:text-base">
            Keep track of product categories
          </span>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-blue-600 w-full sm:w-auto flex items-center text-xs sm:text-base"
          onClick={() =>
            setModal({ show: true, data: null, type: "Add Category" })
          }
        >
          <span className="hidden sm:inline">Add Category</span>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-4">
        <h1 className="font-bold hidden md:block text-lg sm:text-xl">
          All Categories
        </h1>
        <Search
          className="w-full sm:w-60 text-xs sm:text-base"
          placeholder="Search categories"
          prefix={<SearchOutlined className="!text-gray-300" />}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        />
      </div>

      <Table
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredCategories}
        rowKey={(p) => p._id}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 350 }}
        loading={loading}
      />

      <ApModal
        title={modal.type}
        show={modal.show}
        onDimiss={() => setModal({ show: false })}
        containerClassName="w-[30%] bg-red-400"
      >
        <CategoryDetail
          category={modal.data}
          onUpdate={() => setModal({ show: false })}
        />
      </ApModal>
    </div>
  );
};
