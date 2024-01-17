import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Space, Table, Typography } from "antd";
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
import { filter } from "@chakra-ui/react";
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
          <img
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
  console.log(filteredCategories);
  return (
    <>
      <div>
        <div className="flex justify-between items-center shadow-sm p-4 ">
          <div>
            <h1 className="text-3xl font-bold">Categories</h1>
            <span>Keep track of product categories</span>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-blue-600 items-center flex"
            onClick={() =>
              setModal({ show: true, data: null, type: "Add Category" })
            }
          >
            Add Category
          </Button>
        </div>
        <div className="shadow-sm p-4 flex items-center justify-between">
          <h1 className=" font-bold">All Categories</h1>
          <Search
            className="w-60"
            placeholder="Search categories"
            prefix={<SearchOutlined className="text-gray-300" />}
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
      </div>
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
    </>
  );
};
