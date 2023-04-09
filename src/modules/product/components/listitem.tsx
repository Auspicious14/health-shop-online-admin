import React, { useState } from "react";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Space, Table, Input, Tag, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { IProduct } from "../model";

interface DataType {
  key: React.Key;
  productName: string;
  status: string;
  price: number;
  qty: string;
  Status: "instock" | "soldout";
  date: string;
  rating: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "id",
    dataIndex: "key",
  },

  {
    title: "Product Name",
    dataIndex: "productName",
  },
  {
    title: "Rating",
    dataIndex: "rating",
  },
  {
    title: "Qty",
    dataIndex: "qty",
  },

  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (_, { status }) => {
      let color = status === "instock" ? "blue" : "red";
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <DeleteFilled />
      </Space>
    ),
  },
  {
    title: "",
    key: "edit",
    render: (_, record) => (
      <Space size="middle">
        <EditFilled />
      </Space>
    ),
  },
];

interface IProps {
  product: IProduct;
  columns: any;
  data: any;
}
export const ProductListItem: React.FC<IProps> = ({
  product,
  columns,
  data,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  console.log(product);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div>
      {
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      }
    </div>
  );
};
