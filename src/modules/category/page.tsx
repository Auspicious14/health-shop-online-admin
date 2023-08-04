import { Popconfirm, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { ICategory } from "./model";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import { useCategorystate } from "./context";
const { Text } = Typography;
export const CategoryPage = () => {
  const [modal, setModal] = useState<{
    show: boolean;
    data?: any;
    type?: "Add Category" | "Update Category";
  }>({
    show: false,
  });
  const { getCategories, categories, loading, deleteCategory } =
    useCategorystate();
  useEffect(() => {
    getCategories();
  }, []);
  const columns: ColumnsType<ICategory> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
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
  return (
    <div>
      <div>
        <Table
          // rowSelection={rowSelection}
          columns={columns}
          dataSource={categories}
          rowKey={(p) => p._id}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 350 }}
        />
      </div>
    </div>
  );
};
